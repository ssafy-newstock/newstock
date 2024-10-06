package com.ssafy.newsdata.domain.repository;


import com.ssafy.newsdata.domain.entity.industry.IndustryNewsRedis;
import org.springframework.data.repository.CrudRepository;

public interface IndustryNewsRedisRepository extends CrudRepository<IndustryNewsRedis, String> {
}
