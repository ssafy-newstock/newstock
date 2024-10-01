package com.ssafy.stock.domain.error.custom;

public class StockNotFoundException extends RuntimeException {
    public StockNotFoundException() {
        super("존재하지 않는 주식 종목입니다.");
    }

    public StockNotFoundException(String stockCode) {
        super(stockCode + " : 존재하지 않는 주식 종목입니다.");
    }

}
