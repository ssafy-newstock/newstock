package com.ssafy.stock.domain.repository.redis;

import com.ssafy.stock.domain.entity.Redis.KospiChartiRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface KospiChartRedisRepository extends CrudRepository<KospiChartiRedis, String> {
    List<KospiChartiRedis> findAll();

    List<KospiChartiRedis>  findAllById(String industryCode);
}
