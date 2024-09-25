package com.ssafy.stock.domain.service;

import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveDailyChartRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import com.ssafy.stock.domain.repository.StocksPriceLiveRedisRepository;
import com.ssafy.stock.domain.repository.redis.StocksPriceLiveDailyChartRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class StockSchedulerService {

    private final StocksPriceLiveRedisRepository stocksPriceLiveRedisRepository;
    private final StocksPriceLiveDailyChartRedisRepository stocksPriceLiveDailyChartRedisRepository;

    /**
     * TOP10 주식 당일 차트 정보 저장 스케줄러
     * 1분 단위
     */
    @Scheduled(cron = "0 */5 9-16 * * MON-FRI", zone = "Asia/Seoul")
    public void saveStockPriceLiveDailyChart(){
        Iterable<StocksPriceLiveRedis> stocksPriceLiveRedisList = stocksPriceLiveRedisRepository.findAll();

        for (StocksPriceLiveRedis stocksPriceLiveRedis : stocksPriceLiveRedisList) {
            stocksPriceLiveDailyChartRedisRepository.save(new StocksPriceLiveDailyChartRedis(
                    stocksPriceLiveRedis.getStockCode(),
                    stocksPriceLiveRedis.getStockName(),
                    stocksPriceLiveRedis.getStockIndustry(),
                    stocksPriceLiveRedis.getStckPrpr(),
                    LocalDateTime.now()));
        }
    }

    /**
     * 매일 자정 당일 차트 데이터 삭제
     */
    @Scheduled(cron = "0 0 0 * * MON-FRI", zone = "Asia/Seoul")
    public void deleteStockPriceLiveDailyChart(){
        stocksPriceLiveDailyChartRedisRepository.deleteAll();
    }
}
