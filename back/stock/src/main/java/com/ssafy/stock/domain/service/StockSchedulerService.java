package com.ssafy.stock.domain.service;

import com.ssafy.stock.domain.entity.Redis.StocksPriceDailyChartRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveDailyChartRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceRedis;
import com.ssafy.stock.domain.entity.STOCKPRICE;
import com.ssafy.stock.domain.entity.Stocks;
import com.ssafy.stock.domain.entity.StocksPrice;
import com.ssafy.stock.domain.error.custom.StockNotFoundException;
import com.ssafy.stock.domain.repository.redis.StocksPriceDailyChartRedisRepository;
import com.ssafy.stock.domain.repository.redis.StocksPriceLiveRedisRepository;
import com.ssafy.stock.domain.repository.StocksPriceRepository;
import com.ssafy.stock.domain.repository.StocksRepository;
import com.ssafy.stock.domain.repository.redis.StocksPriceLiveDailyChartRedisRepository;
import com.ssafy.stock.domain.repository.redis.StocksPriceRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class StockSchedulerService {

    private final StocksPriceLiveRedisRepository stocksPriceLiveRedisRepository;
    private final StocksPriceRedisRepository stocksPriceRedisRepository;
    private final StocksPriceDailyChartRedisRepository stocksPriceDailyChartRedisRepository;
    private final StocksPriceLiveDailyChartRedisRepository stocksPriceLiveDailyChartRedisRepository;
    private final StocksPriceRepository stocksPriceRepository;
    private final StocksRepository stocksRepository;

    /**
     * TOP10 주식 당일 차트 정보 저장 스케줄러
     * 1분 단위
     */
    @Scheduled(cron = "0 */5 9-16 * * MON-FRI", zone = "Asia/Seoul")
    public void saveStockPriceDailyChart(){
        List<StocksPriceLiveRedis> stocksPriceLiveRedisList = stocksPriceLiveRedisRepository.findAll();
        List<StocksPriceRedis> stocksPriceRedisList = stocksPriceRedisRepository.findAll();

        for (StocksPriceLiveRedis stocksPriceLiveRedis : stocksPriceLiveRedisList) {
            stocksPriceLiveDailyChartRedisRepository.save(new StocksPriceLiveDailyChartRedis(
                    stocksPriceLiveRedis.getStockCode(),
                    stocksPriceLiveRedis.getStockName(),
                    stocksPriceLiveRedis.getStockIndustry(),
                    stocksPriceLiveRedis.getStckPrpr(),
                    LocalDateTime.now()));
        }

        for (StocksPriceRedis stocksPriceRedis : stocksPriceRedisList) {
            stocksPriceDailyChartRedisRepository.save(new StocksPriceDailyChartRedis(
                    stocksPriceRedis.getStockCode(),
                    stocksPriceRedis.getStockName(),
                    stocksPriceRedis.getStockIndustry(),
                    stocksPriceRedis.getStckPrpr(),
                    LocalDateTime.now()));
        }
    }

    /**
     * 장 시작전 전일 데일리 차트 데이터 삭제
     */
    @Scheduled(cron = "0 50 8 * * MON-FRI", zone = "Asia/Seoul")
    public void deleteStockPriceDailyChart(){
        stocksPriceLiveDailyChartRedisRepository.deleteAll();
        stocksPriceRedisRepository.deleteAll();
    }

    /**
     * 장 종료시 현재가를 Redis -> DBMS 에 저장하기
     */
    @Transactional
    @Scheduled(cron = "0 30 15 * * MON-SUN", zone = "Asia/Seoul")
    public void saveStocksPrice() {
        Iterable<StocksPriceRedis> stocksPriceRedis = stocksPriceRedisRepository.findAll();

        for (StocksPriceRedis stockPriceRedis : stocksPriceRedis) {
            Stocks stock = stocksRepository.findByStockCodeWithStockPrice(stockPriceRedis.getStockCode())
                    .orElseThrow(() -> new StockNotFoundException());

            StocksPrice findStockPrice = stock.getStockPrice();

            if(findStockPrice == null){
                stocksPriceRepository.save(new StocksPrice(stock,
                        STOCKPRICE.OTHER,
                        stockPriceRedis.getStckPrpr(),
                        stockPriceRedis.getPrdyVrss(),
                        stockPriceRedis.getPrdyCtrt(),
                        stockPriceRedis.getAcmlTrPbmn(),
                        stockPriceRedis.getAcmlVol()));
            } else {
                findStockPrice.update(stockPriceRedis.getStckPrpr(),
                        stockPriceRedis.getPrdyVrss(),
                        stockPriceRedis.getPrdyCtrt(),
                        stockPriceRedis.getAcmlTrPbmn(),
                        stockPriceRedis.getAcmlVol());
            }
        }

        Iterable<StocksPriceLiveRedis> stocksPriceLiveRedis = stocksPriceLiveRedisRepository.findAll();

        for (StocksPriceLiveRedis stockPriceLiveRedis : stocksPriceLiveRedis) {
            Stocks stock = stocksRepository.findByStockCodeWithStockPrice(stockPriceLiveRedis.getStockCode())
                    .orElseThrow(() -> new StockNotFoundException());

            StocksPrice findStockPrice = stock.getStockPrice();

            if(findStockPrice == null){
                stocksPriceRepository.save(new StocksPrice(stock,
                        STOCKPRICE.TOP,
                        stockPriceLiveRedis.getStckPrpr(),
                        stockPriceLiveRedis.getPrdyVrss(),
                        stockPriceLiveRedis.getPrdyCtrt(),
                        stockPriceLiveRedis.getAcmlTrPbmn(),
                        stockPriceLiveRedis.getAcmlVol()));
            } else {
                findStockPrice.update(stockPriceLiveRedis.getStckPrpr(),
                        stockPriceLiveRedis.getPrdyVrss(),
                        stockPriceLiveRedis.getPrdyCtrt(),
                        stockPriceLiveRedis.getAcmlTrPbmn(),
                        stockPriceLiveRedis.getAcmlVol());
            }
        }
    }

}
