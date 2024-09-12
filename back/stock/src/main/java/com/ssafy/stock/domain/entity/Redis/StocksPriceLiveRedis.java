package com.ssafy.stock.domain.entity.Redis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "StocksPriceLiveRedis")
public class StocksPriceLiveRedis {
    @Id
    private String stockCode;     // 종목 코드
    private String stockName;     // 종목 이름
    private String stockIndustry; // 종목 카테고리
    private String stckPrpr;      // 주식 현재가
    private String prdyVrss;      // 전일 대비
    private String prdyCtrt;      // 전일 대비율
    private String acmlTrPbmn;    // 누적 거래 대금
    private String acmlVol;       // 누적 거래량

    public void update(String stockCode, String stockName, String stockIndustry, String stckPrpr, String prdyVrss, String prdyCtrt, String acmlTrPbmn, String acmlVol) {
        this.stockCode = stockCode;
        this.stockName = stockName;
        this.stockIndustry = stockIndustry;
        this.stckPrpr = stckPrpr;
        this.prdyVrss = prdyVrss;
        this.prdyCtrt = prdyCtrt;
        this.acmlTrPbmn = acmlTrPbmn;
        this.acmlVol = acmlVol;
    }
}
