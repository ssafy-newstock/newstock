package com.ssafy.stock.domain.error.custom;

public class StockAlreadyFavoriteException extends RuntimeException {
    public StockAlreadyFavoriteException() {
        super("해당 주식은 이미 찜한 주식입니다.");
    }

    public StockAlreadyFavoriteException(String message) {
        super(message);
    }
}
