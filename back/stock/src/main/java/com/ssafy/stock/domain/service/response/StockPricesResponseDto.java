package com.ssafy.stock.domain.service.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockPricesResponseDto {
    private String stockCode;
    private String stockName;
    private String stckPrpr;  // 주식 현재가
    private String prdyVrss;  // 전일 대비
    private String prdyCtrt;  // 전일 대비율

    @Override
    public String toString() {
        return String.format("StockPricesResponseDto [stockCode=%s, stockName=%s, stckPrpr=%s, prdyVrss=%s, prdyCtrt=%s]",
                stockCode, stockName, stckPrpr, prdyVrss, prdyCtrt);
    }
}

