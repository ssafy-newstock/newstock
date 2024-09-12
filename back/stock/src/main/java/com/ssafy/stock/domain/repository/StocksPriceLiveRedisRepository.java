package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.StocksPriceLiveRedis;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StocksPriceLiveRedisRepository extends CrudRepository<StocksPriceLiveRedis, String> {
}
