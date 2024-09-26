package com.ssafy.stock.domain.repository.redis;

import com.ssafy.stock.domain.entity.Redis.StocksRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StocksRedisRepository extends CrudRepository<StocksRedis, String> {
    @Override
    List<StocksRedis> findAll();
}
