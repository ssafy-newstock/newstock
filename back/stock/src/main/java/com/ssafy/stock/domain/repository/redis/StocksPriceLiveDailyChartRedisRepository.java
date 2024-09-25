package com.ssafy.stock.domain.repository.redis;

import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveDailyChartRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StocksPriceLiveDailyChartRedisRepository extends CrudRepository<StocksPriceLiveDailyChartRedis, String> {
    List<StocksPriceLiveDailyChartRedis> findAllByStockCode(String stockCode);
}
