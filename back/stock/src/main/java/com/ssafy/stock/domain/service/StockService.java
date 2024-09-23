package com.ssafy.stock.domain.service;

import com.ssafy.stock.domain.entity.*;
import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceRedis;
import com.ssafy.stock.domain.entity.Redis.StocksRedis;
import com.ssafy.stock.domain.error.custom.StockFavoriteNotFoundException;
import com.ssafy.stock.domain.error.custom.StockNotFoundException;
import com.ssafy.stock.domain.repository.*;
import com.ssafy.stock.domain.repository.redis.StocksPriceRedisRepository;
import com.ssafy.stock.domain.repository.redis.StocksRedisRepository;
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

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.ssafy.stock.global.handler.KISSocketHandler.stockNameMap;

@Slf4j
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
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final StockConverter stockConverter;
    private final KISTokenService kisTokenService;

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
     *
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

    public Iterable<StocksPriceRedis> getStocksPriceRedis() {
        return stocksPriceRedisRepository.findAll();
    }

    public Iterable<StocksPriceLiveRedis> getStocksPriceLiveRedis() {
        return stocksPriceLiveRedisRepository.findAll();
    }


    /**
     * 주식 상세 페이지 조회 시 일봉데이터 조회
     *
     * @param stockCode
     * @return
     */
    public List<StockCandleDto> getStockCandle(String stockCode) {
        Stocks stock = stocksRepository.findByStockCodeWithCandles(stockCode)
                .orElseThrow(() -> new StockNotFoundException());

        List<StocksCandle> stocksCandles = stock.getStocksCandles();

        return stocksCandles.stream()
                .map(stocksCandle -> new StockCandleDto(stock, stocksCandle))
                .toList();
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
     * 보유 주식 조회 메소드
     * @param myStockHoldings
     * @return
     */
    private List<StockMyPageHoldingDto> getStockMyPageHoldingDtoList(Long memberId) {
        List<StocksHoldings> myStockHoldings = stockHoldingRepository.findAllByMemberIdWithStock(memberId);

        return myStockHoldings.stream()
                .map(myStockHolding -> {
                    Stocks stock = myStockHolding.getStock();

                    StocksPriceLiveRedis stocksPriceLiveRedis = stocksPriceLiveRedisRepository.findById(stock.getStockCode())
                            .orElseThrow(StockNotFoundException::new);

                    Long currentPrice = stocksPriceLiveRedis.getStckPrpr(); // 현재 주가
                    Long buyPrice = myStockHolding.getStockHoldingBuyPrice(); // 평단가
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
                }).toList();
    }

    /**
     * 주식 거래 내역 조회 메소드
     * @param myStockTransactions
     * @return
     */
    private List<StockMyPageTransactionDto> getStockMyPageTransactionDtoList(Long memberId) {
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
     * @param myStockFavorites
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
    public StockFavoriteDto likeStore(Long memberId, String stockCode){
        Stocks stock = stocksRepository.findByStockCode(stockCode)
                .orElseThrow(() -> new StockNotFoundException());

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
    public void unlikeStore(Long memberId, String stockCode){
        Stocks stock = stocksRepository.findByStockCode(stockCode)
                .orElseThrow(() -> new StockNotFoundException());

        StocksFavorite stocksFavorite = stockFavoriteRepository.findByMemberIdAndStockId(memberId, stock.getId())
                .orElseThrow(() -> new StockFavoriteNotFoundException());

        stockFavoriteRepository.delete(stocksFavorite);
        log.info("{}번 회원이 {} 주식을 찜 해제했습니다.", memberId, stock.getStockName());
    }

}