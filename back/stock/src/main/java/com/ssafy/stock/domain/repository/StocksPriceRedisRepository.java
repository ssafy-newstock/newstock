package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.Redis.StocksPriceRedis;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StocksPriceRedisRepository extends CrudRepository<StocksPriceRedis, String> {
}
