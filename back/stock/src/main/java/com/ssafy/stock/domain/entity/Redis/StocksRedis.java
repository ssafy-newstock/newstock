package com.ssafy.stock.domain.entity.Redis;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RequiredArgsConstructor
@RedisHash(value = "StocksRedis")   // TTL : 1 day(86400)
public class StocksRedis {
    @Id
    private final String stockCode;

    private final String stockName;

    private final String stockIndustry;
}
