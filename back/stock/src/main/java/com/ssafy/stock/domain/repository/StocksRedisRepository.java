package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.Redis.StocksRedis;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StocksRedisRepository extends CrudRepository<StocksRedis, String> {
    @Override
    List<StocksRedis> findAll();
}
