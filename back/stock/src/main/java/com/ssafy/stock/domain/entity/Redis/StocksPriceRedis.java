package com.ssafy.stock.domain.entity.Redis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "StocksPriceRedis")
public class StocksPriceRedis {
    @Id
    private String stockCode;
    private String stockName;
    private String stockIndustry; // 종목 카테고리
    private Long stckPrpr;  // 주식 현재가
    private Long prdyVrss;  // 전일 대비
    private Double prdyCtrt;  // 전일 대비율
    private Long acmlTrPbmn;    // 누적 거래 대금
    private Long acmlVol;       // 누적 거래량
}
