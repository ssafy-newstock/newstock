package com.ssafy.stock.domain.error.custom;

public class StockHoldingNotFoundException extends RuntimeException {
    public StockHoldingNotFoundException() {
        super("해당 주식을 보유하고 있지 않습니다.");
    }

    public StockHoldingNotFoundException(String message) {
        super(message);
    }
}
