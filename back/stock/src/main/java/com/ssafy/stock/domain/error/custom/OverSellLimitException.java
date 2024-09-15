package com.ssafy.stock.domain.error.custom;

public class OverSellLimitException extends RuntimeException {
    public OverSellLimitException() {
        super("보유한 주식 수량을 초과하여 매도할 수 없습니다.");
    }

    public OverSellLimitException(String message) {
        super(message);
    }
}
