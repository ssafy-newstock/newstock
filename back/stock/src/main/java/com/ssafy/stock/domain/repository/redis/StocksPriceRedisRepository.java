package com.ssafy.stock.domain.repository.redis;

import com.ssafy.stock.domain.entity.Redis.StocksPriceRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StocksPriceRedisRepository extends CrudRepository<StocksPriceRedis, String> {
    List<StocksPriceRedis> findAll();
}
