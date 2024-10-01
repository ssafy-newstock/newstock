package com.ssafy.stock.domain.error.custom;

public class StockCandleNotFoundException extends RuntimeException {
    public StockCandleNotFoundException(String message) {
        super(message);
    }
}
