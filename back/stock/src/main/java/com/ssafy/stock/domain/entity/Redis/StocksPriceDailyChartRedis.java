package com.ssafy.stock.domain.entity.Redis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;

@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "StocksPriceLiveDailyChartRedis")
public class StocksPriceDailyChartRedis {
    @Id
    private String id;

    @Indexed
    private String stockCode;     // 종목 코드
    private String stockName;     // 종목 이름
    private String stockIndustry; // 종목 카테고리
    private Long stckPrpr;      // 주식 현재가
    private LocalDateTime time;

    public StocksPriceDailyChartRedis(String stockCode, String stockName, String stockIndustry, Long stckPrpr, LocalDateTime time) {
        this.id = stockCode + "|" + time;
        this.stockCode = stockCode;
        this.stockName = stockName;
        this.stockIndustry = stockIndustry;
        this.stckPrpr = stckPrpr;
        this.time = time.plusHours(9);
    }
}
