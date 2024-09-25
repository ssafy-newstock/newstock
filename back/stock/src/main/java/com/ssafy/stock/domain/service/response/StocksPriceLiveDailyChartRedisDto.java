package com.ssafy.stock.domain.service.response;

import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveDailyChartRedis;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StocksPriceLiveDailyChartRedisDto {
    private String id;
    private String stockCode;     // 종목 코드
    private String stockName;     // 종목 이름
    private String stockIndustry; // 종목 카테고리
    private Long stckPrpr;      // 주식 현재가
    private LocalDateTime time;

    public StocksPriceLiveDailyChartRedisDto(StocksPriceLiveDailyChartRedis stocksPriceLiveDailyChartRedis) {
        this.id = stocksPriceLiveDailyChartRedis.getId();
        this.stockCode = stocksPriceLiveDailyChartRedis.getStockCode();
        this.stockName = stocksPriceLiveDailyChartRedis.getStockName();
        this.stockIndustry = stocksPriceLiveDailyChartRedis.getStockIndustry();
        this.stckPrpr = stocksPriceLiveDailyChartRedis.getStckPrpr();
        this.time = stocksPriceLiveDailyChartRedis.getTime();
    }
}
