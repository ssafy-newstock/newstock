package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import org.springframework.data.repository.CrudRepository;

public interface StocksPriceLiveRedisRepository extends CrudRepository<StocksPriceLiveRedis, String> {
}
