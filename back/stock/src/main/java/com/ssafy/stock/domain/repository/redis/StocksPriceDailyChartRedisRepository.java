package com.ssafy.stock.domain.repository.redis;

import com.ssafy.stock.domain.entity.Redis.StocksPriceDailyChartRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StocksPriceDailyChartRedisRepository extends CrudRepository<StocksPriceDailyChartRedis, String> {
    List<StocksPriceDailyChartRedis> findAllByStockCode(String stockCode);
}
