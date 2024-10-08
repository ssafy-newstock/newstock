package com.ssafy.stock.domain.repository.redis;

import com.ssafy.stock.domain.entity.Redis.KospiChartRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface KospiChartRedisRepository extends CrudRepository<KospiChartRedis, String> {
    List<KospiChartRedis> findAll();

    List<KospiChartRedis>  findAllById(String industryCode);
}
