package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.stock.StockNewsRedis;
import org.springframework.data.repository.CrudRepository;

public interface StockNewsRedisRepository extends CrudRepository<StockNewsRedis, String> {
}
