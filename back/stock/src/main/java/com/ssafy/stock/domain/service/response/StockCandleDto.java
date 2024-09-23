package com.ssafy.stock.domain.service.response;

import com.ssafy.stock.domain.entity.Stocks;
import com.ssafy.stock.domain.entity.StocksCandle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockCandleDto { ;
    private Long stockId;
    private String stockCode;
    private Long stockCandleId;
    private LocalDate stockCandleDay;
    private Long stockCandleOpen;
    private Long stockCandleClose;
    private Long stockCandleHigh;
    private Long stockCandleLow;

    public StockCandleDto(Stocks stock, StocksCandle stockCandle) {
        this.stockId = stock.getId();
        this.stockCode = stock.getStockCode();
        this.stockCandleId = stockCandle.getId();
        this.stockCandleDay = stockCandle.getStockCandleDay();
        this.stockCandleOpen = stockCandle.getStockCandleOpen();
        this.stockCandleClose = stockCandle.getStockCandleClose();
        this.stockCandleHigh = stockCandle.getStockCandleHigh();
        this.stockCandleLow = stockCandle.getStockCandleLow();
    }
}
