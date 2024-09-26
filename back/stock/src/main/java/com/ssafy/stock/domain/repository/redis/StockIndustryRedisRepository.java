package com.ssafy.stock.domain.repository.redis;

import com.ssafy.stock.domain.entity.Redis.StockIndustryRedis;
import org.springframework.data.repository.CrudRepository;

public interface StockIndustryRedisRepository extends CrudRepository<StockIndustryRedis, String> {
}
