package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.industry.IndustryNewsRedis;
import org.springframework.data.repository.CrudRepository;

public interface IndustryNewsRedisRepository extends CrudRepository<IndustryNewsRedis, String> {
}
