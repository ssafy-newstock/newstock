package com.ssafy.stock.domain.service;

import com.ssafy.stock.domain.entity.Stocks;
import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceRedis;
import com.ssafy.stock.domain.entity.Redis.StocksRedis;
import com.ssafy.stock.domain.repository.StocksPriceLiveRedisRepository;
import com.ssafy.stock.domain.repository.StocksPriceRedisRepository;
import com.ssafy.stock.domain.repository.StocksRedisRepository;
import com.ssafy.stock.domain.repository.StocksRepository;
import com.ssafy.stock.domain.service.helper.StockConverter;
import com.ssafy.stock.domain.service.response.StockPricesKisResponseDto;
import com.ssafy.stock.domain.service.response.StockPricesOutputKisResponseDto;
import com.ssafy.stock.domain.service.response.StockPricesResponseDto;
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
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final StockConverter stockConverter;
    private final KISTokenService kisTokenService;

    // 종목 정보 조회 전략 : Redis 캐시메모리 사용
    @Cacheable(cacheNames = "stocksInfo", cacheManager = "cacheManager")
    public List<StocksRedis> getStocksInfo(){
        List<StocksRedis> stocksRedis = stocksRedisRepository.findAll();

        if(stocksRedis.isEmpty()){
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

        try{
            List<StockPricesResponseDto> allStockPrices = Stream.of(future1, future2)
                    .map(CompletableFuture::join)  // 비동기 작업을 완료하고 결과를 가져옴
                    .flatMap(List::stream)         // 두 리스트를 하나로 병합
                    .collect(Collectors.toList()); // List로 수집

            List<StocksPriceRedis> stocksPriceRedisList = stockConverter.convertToStocksPriceRedisList(allStockPrices);

            stocksPriceRedisRepository.deleteAll();
            stocksPriceRedisRepository.saveAll(stocksPriceRedisList);

            log.info("스케줄러 : 주식 데이터 갱신 성공");
            simpMessageSendingOperations.convertAndSend("/api/stock/sub/stock/info", allStockPrices);
        } catch (CompletionException e){
            e.printStackTrace();
        }
    }

    /**
     * 한국투자증권 시세 갱신 메소드
     * @param stocksInfo 종목코드, 종목이름
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

    public Iterable<StocksPriceRedis> getStocksPriceRedis(){
        return stocksPriceRedisRepository.findAll();
    }

    public Iterable<StocksPriceLiveRedis> getStocksPriceLiveRedis() {
        return stocksPriceLiveRedisRepository.findAll();
    }
}