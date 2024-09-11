package com.ssafy.stock.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RequiredArgsConstructor
@RedisHash(value = "StocksPriceRedis")
public class StocksPriceRedis {
    @Id
    private final String stockCode;

    private final String stockName;

    private final String stckPrpr;  // 주식 현재가
    private final String prdyVrss;  // 전일 대비
    private final String prdyCtrt;  // 전일 대비율
}
