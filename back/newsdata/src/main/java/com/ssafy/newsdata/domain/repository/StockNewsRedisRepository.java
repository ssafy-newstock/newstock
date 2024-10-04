package com.ssafy.newsdata.domain.repository;

import com.ssafy.newsdata.domain.entity.stock.StockNewsRedis;
import org.springframework.data.repository.CrudRepository;

public interface StockNewsRedisRepository extends CrudRepository<StockNewsRedis, String> {
}
