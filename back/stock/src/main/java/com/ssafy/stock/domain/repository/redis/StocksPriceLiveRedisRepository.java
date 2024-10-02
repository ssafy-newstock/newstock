package com.ssafy.stock.domain.repository.redis;

import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StocksPriceLiveRedisRepository extends CrudRepository<StocksPriceLiveRedis, String> {
    List<StocksPriceLiveRedis> findAll();
}
