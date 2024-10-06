package com.ssafy.stock.domain.service;

import com.ssafy.stock.domain.entity.Redis.*;
import com.ssafy.stock.domain.entity.*;
import com.ssafy.stock.domain.error.custom.*;
import com.ssafy.stock.domain.repository.StockFavoriteRepository;
import com.ssafy.stock.domain.repository.StockHoldingRepository;
import com.ssafy.stock.domain.repository.StockTransactionRepository;
import com.ssafy.stock.domain.repository.StocksRepository;
import com.ssafy.stock.domain.repository.redis.*;
import com.ssafy.stock.domain.service.helper.StockConverter;
import com.ssafy.stock.domain.service.response.*;
import com.ssafy.stock.global.token.KISTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static com.ssafy.stock.global.handler.KISSocketHandler.stockNameMap;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class StockService {

    @Value("${APP_KEY1}")
    private String APP_KEY1;

    @Value("${APP_SECRET1}")
    private String APP_SECRET1;

    @Value("${APP_KEY2}")
    private String APP_KEY2;

    @Value("${APP_SECRET2}")
    private String APP_SECRET2;

    private static final int BATCH_SIZE = 20;

    private final StocksRepository stocksRepository;
    private final StocksRedisRepository stocksRedisRepository;
    private final StocksPriceLiveRedisRepository stocksPriceLiveRedisRepository;
    private final StocksPriceRedisRepository stocksPriceRedisRepository;
    private final StockTransactionRepository stockTransactionRepository;
    private final StockHoldingRepository stockHoldingRepository;
    private final StockFavoriteRepository stockFavoriteRepository;
    private final StocksPriceDailyChartRedisRepository stocksPriceDailyChartRedisRepository;
    private final StocksPriceLiveDailyChartRedisRepository stocksPriceLiveDailyChartRedisRepository;
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final StockConverter stockConverter;
    private final KISTokenService kisTokenService;
    private final StockTransactionService stockTransactionService;

    // 종목 정보 조회 전략 : Redis 캐시메모리 사용
    @Cacheable(cacheNames = "stocksInfo", cacheManager = "cacheManager")
    public List<StocksRedis> getStocksInfo() {
        List<StocksRedis> stocksRedis = stocksRedisRepository.findAll();

        if (stocksRedis.isEmpty()) {
            List<Stocks> stocks = stocksRepository.findAll();

            stocksRedis = stocks.stream()
                    .map(dto -> new StocksRedis(dto.getStockCode(), dto.getStockName(), dto.getStockIndustry()))
                    .collect(Collectors.toList());

            List<StocksRedis> filteredStocks = stocksRedis.stream()
                    .filter(stock -> !stockNameMap.containsKey(stock.getStockCode())) // 상위 10개 종목 코드 제외
                    .collect(Collectors.toList());

            stocksRedisRepository.saveAll(filteredStocks);
        }
        return stocksRedis;
    }

    /**
     * 30초 단위 코스피 958개 정보 갱신
     * 갱신 목록 : 주식 현재가, 전일 대비, 전일 대비율, 누적 거래량, 누적 거래 대금
     */
    @Scheduled(fixedDelay = 10000)
    public void fetchStockPrices() {
        List<StocksRedis> stocksInfo = getStocksInfo();
        List<StocksRedis> stockCodes1 = stocksInfo.subList(0, stocksInfo.size() / 2);
        List<StocksRedis> stockCodes2 = stocksInfo.subList(stocksInfo.size() / 2, stocksInfo.size());

        ExecutorService executor = Executors.newFixedThreadPool(2);
        CompletableFuture<List<StockPricesResponseDto>> future1 = CompletableFuture.supplyAsync(() -> getStockPrices(stockCodes1, "Bearer " + kisTokenService.getAccessToken("token1"), APP_KEY1, APP_SECRET1), executor);
        CompletableFuture<List<StockPricesResponseDto>> future2 = CompletableFuture.supplyAsync(() -> getStockPrices(stockCodes2, "Bearer " + kisTokenService.getAccessToken("token2"), APP_KEY2, APP_SECRET2), executor);

        try {
            List<StockPricesResponseDto> allStockPrices = Stream.of(future1, future2)
                    .map(CompletableFuture::join)  // 비동기 작업을 완료하고 결과를 가져옴
                    .flatMap(List::stream)         // 두 리스트를 하나로 병합
                    .collect(Collectors.toList()); // List로 수집

            List<StocksPriceRedis> stocksPriceRedisList = stockConverter.convertToStocksPriceRedisList(allStockPrices);

            stocksPriceRedisRepository.deleteAll();
            stocksPriceRedisRepository.saveAll(stocksPriceRedisList);

            log.info("스케줄러 : 주식 데이터 갱신 성공");
            simpMessageSendingOperations.convertAndSend("/api/sub/stock/info", allStockPrices);
        } catch (CompletionException e) {
            e.printStackTrace();
        }
    }

    /**
     * 한국투자증권 시세 갱신 메소드
     * @param stocksInfo  종목코드, 종목이름
     * @param accessToken
     * @param appKey
     * @param appSecret
     * @return 코스피 958개의 종목코드, 종목이름, 현재가, 전일 대비, 전일 대비율
     */
    public List<StockPricesResponseDto> getStockPrices(List<StocksRedis> stocksInfo,
                                                        String accessToken,
                                                        String appKey,
                                                        String appSecret) {
        List<StockPricesResponseDto> stockPricesResponseDtos = new ArrayList<>();

        int totalStockCodes = stocksInfo.size();
        int totalBatches = (int) Math.ceil((double) totalStockCodes / BATCH_SIZE);

        for (int batch = 0; batch < totalBatches; batch++) {
            int startIdx = batch * BATCH_SIZE;
            int endIdx = Math.min(startIdx + BATCH_SIZE, totalStockCodes);

            List<StocksRedis> batchStockCodes = stocksInfo.subList(startIdx, endIdx);

            for (StocksRedis stockInfo : batchStockCodes) {
                try {
                    ResponseEntity<StockPricesKisResponseDto> response = stockConverter.exchangeRestTemplate(accessToken, appKey, appSecret, stockInfo);
                    StockPricesKisResponseDto stockApiResponse = response.getBody();
                    if (stockApiResponse != null) {
                        StockPricesOutputKisResponseDto stockOutput = stockApiResponse.getOutput();
                        if (stockOutput != null) {
                            StockPricesResponseDto stockPricesResponseDto = stockConverter.convertToStockPricesResponseDtoByRedis(stockInfo, stockOutput);
                            stockPricesResponseDtos.add(stockPricesResponseDto);
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            waitNextKsiApi();
        }
        return stockPricesResponseDtos;
    }

    /**
     * 한국투자증권 API 요청 대시 메소드
     * 1초에 20회 제한으로 인해 대기 시간 필요
     */
    public static void waitNextKsiApi() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    /**
     * 코스피 가격 정보 조회
     * @return
     */
    public List<StockPricesResponseDto> getStocksPrice() {
        // Redis에서 가격 조회
        List<StocksPriceRedis> stocksPriceRedisList = stocksPriceRedisRepository.findAll();

        // Redis에서 조회된 내용이 없으면 DBMS에서 조회
        if (stocksPriceRedisList.isEmpty()) {
            return stocksRepository.findAllWithStockPrice(STOCKPRICE.OTHER).stream()
                    .map(stockConverter::stockToPriceDto)
                    .toList();
        }

        // Redis에서 찾은 가격 response
        return stocksPriceRedisList.stream()
                .map(stockConverter::stockRedisToPriceDto)
                .toList();
    }

    /**
     * 코스피 상위 10 종목 가격 정보 조회
     * @return
     */
    public List<StockPricesResponseDto> getStocksPriceLive() {
        // Redis에서 가격 조회
        List<StocksPriceLiveRedis> stocksPriceLiveRedisList = stocksPriceLiveRedisRepository.findAll();

        // Redis에서 조회된 내용이 없으면 DBMS에서 조회
        if (stocksPriceLiveRedisList.isEmpty()) {
            return stocksRepository.findAllWithStockPrice(STOCKPRICE.TOP).stream()
                    .map(stockConverter::stockToPriceDto)
                    .toList();
        }

        // Redis에서 찾은 가격 response
        return stocksPriceLiveRedisList.stream()
                .map(stockConverter::stockLiveRedisToPriceDto)
                .toList();
    }

    /**
     * 검색 자동 완성 메소드
     * @param prefix
     * @return
     */
    public List<StocksPriceRedis> autocompleteStockName(String prefix) {
        Iterable<StocksPriceRedis> allStocks = stocksPriceRedisRepository.findAll();
        return StreamSupport.stream(allStocks.spliterator(), false)
                .filter(stock -> stock.getStockName().startsWith(prefix))
                .collect(Collectors.toList());
    }

    /**
     * 주식 상세 페이지 일봉데이터 조회
     * @param stockCode
     * @return
     */
    public List<StockCandleDto> getStockCandle(String stockCode, LocalDate startDate, LocalDate endDate) {
        Stocks stock = stocksRepository.findByStockCodeWithCandlesAndDate(stockCode, startDate, endDate)
                .orElseThrow(() -> new StockCandleNotFoundException(stockCode + " : 해당 주식의 캔들 정보를 찾을 수 없습니다. (기간: " + startDate + " ~ " + endDate + ")"));

        List<StocksCandle> stocksCandles = stock.getStocksCandles();

        return stocksCandles.stream()
                .map(stocksCandle -> new StockCandleDto(stock, stocksCandle))
                .toList();
    }

    /**
     * 주식 상세 페이지 데일리차트 조회
     * @param stockCode
     * @return
     */
    public List<StocksPriceLiveDailyChartRedisDto> getStockDaily(String stockCode) {
        // Top 10
        if(stockNameMap.containsKey(stockCode)){
            // 데일리 차트 데이터
            List<StocksPriceLiveDailyChartRedis> LiveDailyChartRedisList = stocksPriceLiveDailyChartRedisRepository.findAllByStockCode(stockCode);

            // time을 기준으로 오름차순 정렬
            List<StocksPriceLiveDailyChartRedis> sortedLiveDailyChartRedisList = LiveDailyChartRedisList.stream()
                    .sorted(Comparator.comparing(StocksPriceLiveDailyChartRedis::getTime))
                    .toList();

            return sortedLiveDailyChartRedisList.stream()
                    .map(StocksPriceLiveDailyChartRedisDto::new)
                    .toList();    
        } else {
            // 나머지 전종목 데일리 차트 데이터
            List<StocksPriceDailyChartRedis> dailyChartRedisList = stocksPriceDailyChartRedisRepository.findAllByStockCode(stockCode);
            
            // time 기준으로 오름차순 정렬
            List<StocksPriceDailyChartRedis> sortedLiveDailyChartRedisList = dailyChartRedisList.stream()
                    .sorted(Comparator.comparing(StocksPriceDailyChartRedis::getTime))
                    .toList();

            return sortedLiveDailyChartRedisList.stream()
                    .map(StocksPriceLiveDailyChartRedisDto::new)
                    .toList();
        }
    }

    /**
     * 주식 마이페이지 조회 메소드
     * @param memberId
     * @return
     */
    public StockMyPageDto getStockMyPage(Long memberId) {
        List<StockMyPageHoldingDto> stockMyPageHoldingDtoList = getStockMyPageHoldingDtoList(memberId);
        List<StockMyPageTransactionDto> stockMyPageTransactionDtoList = getStockMyPageTransactionDtoList(memberId);
        List<StockFavoriteDto> stockMyPageFavoriteDtoList = getStockMyPageFavoriteDtoList(memberId);

        log.info("{}님이 주식 마이페이지 조회를 했습니다.", memberId);
        return new StockMyPageDto(stockMyPageHoldingDtoList, stockMyPageTransactionDtoList, stockMyPageFavoriteDtoList);
    }

    /**
     * 보유 주식 전체 조회 메소드
     * @param memberId
     * @return
     */
    public List<StockMyPageHoldingDto> getStockMyPageHoldingDtoList(Long memberId) {
        List<StocksHoldings> myStockHoldings = stockHoldingRepository.findAllByMemberIdWithStock(memberId);

        return myStockHoldings.stream()
                .map(myStockHolding -> {
                    return getStockMyPageHoldingDto(myStockHolding);
                }).toList();
    }

    /**
     * 특정 주식 보유 조회
     * @param memberId
     * @param stockCode
     * @return
     */
    public StockMyPageHoldingDto getStockHoldingDtoList(Long memberId, String stockCode) {
        StocksHoldings myStockHolding = stockHoldingRepository.findAllByMemberIdAndStockCodeWithStock(memberId, stockCode).
                orElseThrow(() -> new StockHoldingNotFoundException(stockCode + " : 해당 주식을 보유하고 있지 않습니다."));

        return getStockMyPageHoldingDto(myStockHolding);
    }

    private StockMyPageHoldingDto getStockMyPageHoldingDto(StocksHoldings myStockHolding) {
        Stocks stock = myStockHolding.getStock();

        Long currentPrice = stockTransactionService.getCurrentPrice(stock.getStockCode()); // 현재 주가
        Long buyPrice = myStockHolding.getStockHoldingBuyPrice(); // 구매가
        Long changeAmount = currentPrice - buyPrice; // 등락 가격
        Double changeRate = (buyPrice != 0) ? (double) changeAmount / buyPrice * 100 : 0.0; // 등락률 계산 (0으로 나누기 방지)

        return new StockMyPageHoldingDto(
                stock.getId(),
                stock.getStockCode(),
                stock.getStockName(),
                myStockHolding.getStockHoldingBuyAmount(),
                buyPrice,
                changeAmount,
                changeRate
        );
    }

    /**
     * 주식 거래 내역 전체 조회 메소드
     * @param memberId
     * @return
     */
    public List<StockMyPageTransactionDto> getStockMyPageTransactionDtoList(Long memberId) {
        List<StocksTransactions> myStockTransactions = stockTransactionRepository.findAllByMemberIdWithStock(memberId);

        return myStockTransactions.stream()
                .map(myStockTransaction -> {
                    Stocks stock = myStockTransaction.getStock();

                    return new StockMyPageTransactionDto(
                            stock.getId(),
                            stock.getStockCode(),
                            stock.getStockName(),
                            myStockTransaction.getStockTransactionAmount(),
                            myStockTransaction.getStockTransactionPrice(),
                            myStockTransaction.getStockTransactionPrice() * myStockTransaction.getStockTransactionAmount(),
                            myStockTransaction.getStockTransactionType(),
                            myStockTransaction.getStockTransactionDate());
                }).toList();
    }

    /**
     * 찜한 주식 조회 메소드
     * @param memberId
     * @return
     */
    public List<StockFavoriteDto> getStockMyPageFavoriteDtoList(Long memberId) {
        List<StocksFavorite> myStockFavorites = stockFavoriteRepository.findAllByMemberIdWithStock(memberId);

        return myStockFavorites.stream()
                .map(myStockFavorite -> {
                    Stocks stock = myStockFavorite.getStock();

                    return new StockFavoriteDto(myStockFavorite.getId(),
                            stock.getId(),
                            stock.getStockCode(),
                            stock.getStockName());
                }).toList();
    }

    /**
     * 주식 찜 메소드
     * @param memberId
     * @param stockCode
     * @return
     */
    @Transactional
    public StockFavoriteDto likeStore(Long memberId, String stockCode){
        Stocks stock = stocksRepository.findByStockCode(stockCode)
                .orElseThrow(() -> new StockNotFoundException(stockCode));

        // 이미 찜한 주식인지 확인
        if (stockFavoriteRepository.findByMemberIdAndStockId(memberId, stock.getId()).isPresent()) {
            throw new StockAlreadyFavoriteException();
        }

        StocksFavorite stocksFavorite = stockFavoriteRepository.save(new StocksFavorite(memberId, stock));
        log.info("{}번 회원이 {} 주식을 찜 했습니다.", memberId, stock.getStockName());

        return new StockFavoriteDto(stocksFavorite.getId(),
                stock.getId(),
                stockCode,
                stock.getStockName());
    }

    /**
     * 주식 찜 해제 메소드
     * @param memberId
     * @param stockCode
     */
    @Transactional
    public void unlikeStore(Long memberId, String stockCode){
        Stocks stock = stocksRepository.findByStockCode(stockCode)
                .orElseThrow(() -> new StockNotFoundException(stockCode));

        StocksFavorite stocksFavorite = stockFavoriteRepository.findByMemberIdAndStockId(memberId, stock.getId())
                .orElseThrow(StockFavoriteNotFoundException::new);

        stockFavoriteRepository.delete(stocksFavorite);
        log.info("{}번 회원이 {} 주식을 찜 해제했습니다.", memberId, stock.getStockName());
    }



    public List<MemberChangeRateDto> getStockRank(List<Long> memberIdListRequest){
        return memberIdListRequest.stream()
                .map(memberId -> {
                    List<StocksHoldings> myStockHoldings = stockHoldingRepository.findAllByMemberIdWithStock(memberId);
                    List<StocksTransactions> myStockSellTransaction = stockTransactionRepository.findSellByMemberIdWithStock(memberId);

                    Double holdingChangeRate = getHoldingChangeRate(myStockHoldings);
                    Double transactionChangeRate = getTransactionChangeRate(myStockSellTransaction);

                    return new MemberChangeRateDto(memberId, holdingChangeRate + transactionChangeRate);
                }).toList();
    }

    private Double getTransactionChangeRate(List<StocksTransactions> myStockSellTransaction) {
        // 총 판매 금액
        Long totalSellAmount = myStockSellTransaction.stream()
                .mapToLong(transaction -> transaction.getStockTransactionPrice() * transaction.getStockTransactionAmount())
                .sum();

        if (totalSellAmount == 0) {
            return 0.0; // 판매한 거래가 없을 때 0 처리
        }

        // 가중 평균 수익률 계산
        Double transactionChangeRate = myStockSellTransaction.stream()
                .mapToDouble(transaction -> {
                    Stocks stock = transaction.getStock();
                    Long currentPrice = stockTransactionService.getCurrentPrice(stock.getStockCode()); // 현재 주가
                    Long sellPrice = transaction.getStockTransactionPrice(); // 판매가
                    Long quantity = transaction.getStockTransactionAmount(); // 판매 수량
                    Long changeAmount = (currentPrice - sellPrice) * quantity; // 등락 가격
                    return (double) changeAmount / totalSellAmount * 100; // 가중 수익률
                })
                .sum();

        return transactionChangeRate;

    }

    private Double getHoldingChangeRate(List<StocksHoldings> myStockHoldings) {
        Long totalBuyAmount = myStockHoldings.stream()
                .mapToLong(holding -> holding.getStockHoldingBuyPrice() * holding.getStockHoldingBuyAmount())
                .sum();

        if (totalBuyAmount == 0) {
            return 0.0;
        }

        // 가중 평균 수익률 계산
        Double holdingChangeRate = myStockHoldings.stream()
                .mapToDouble(holding -> {
                    Stocks stock = holding.getStock();
                    Long currentPrice = stockTransactionService.getCurrentPrice(stock.getStockCode()); // 현재 주가
                    Long buyPrice = holding.getStockHoldingBuyPrice(); // 구매가
                    Long quantity = holding.getStockHoldingBuyAmount(); // 보유 수량
                    Long changeAmount = (currentPrice - buyPrice) * quantity; // 등락 가격
                    return (double) changeAmount / totalBuyAmount * 100; // 가중 수익률
                })
                .sum();

        return holdingChangeRate;
    }
}