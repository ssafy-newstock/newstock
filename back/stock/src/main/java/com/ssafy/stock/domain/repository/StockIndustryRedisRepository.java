package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.Redis.StockIndustryRedis;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockIndustryRedisRepository extends CrudRepository<StockIndustryRedis, String> {
}
