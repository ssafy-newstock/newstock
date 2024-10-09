package com.ssafy.stock.domain.repository.redis;

import com.ssafy.stock.domain.entity.Redis.KospiRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface KospiRedisRepository extends CrudRepository<KospiRedis, String> {
    List<KospiRedis> findAll();
}
