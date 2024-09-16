package com.ssafy.stock.domain.error.custom;

public class StockHoldingNotFoundException extends RuntimeException {
    public StockHoldingNotFoundException() {
        super("이 주식은 현재 보유하고 있지 않습니다. 보유 목록을 확인해 주세요.");
    }

    public StockHoldingNotFoundException(String message) {
        super(message);
    }
}
