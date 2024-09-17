package com.ssafy.stock.domain.service.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockPricesResponseDto {
    private String stockCode;     // 종목 코드
    private String stockName;     // 종목 이름
    private String stockIndustry; // 종목 카테고리
    private Long stckPrpr;      // 주식 현재가
    private Long prdyVrss;      // 전일 대비
    private Double prdyCtrt;      // 전일 대비율
    private Long acmlTrPbmn;    // 누적 거래 대금
    private Long acmlVol;       // 누적 거래량

    @Override
    public String toString() {
        return String.format("StockPricesResponseDto [stockCode=%s, stockName=%s, stockIndustry=%s, stckPrpr=%s, prdyVrss=%s, prdyCtrt=%s, acmlTrPbmn=%s, acmlVol=%s]",
                stockCode, stockName, stockIndustry, stckPrpr, prdyVrss, prdyCtrt, acmlTrPbmn, acmlVol);
    }
}

