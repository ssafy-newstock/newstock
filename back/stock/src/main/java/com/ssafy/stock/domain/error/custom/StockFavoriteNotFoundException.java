package com.ssafy.stock.domain.error.custom;

public class StockFavoriteNotFoundException extends RuntimeException {
    public StockFavoriteNotFoundException() {
        super("해당 주식을 찜하고 있지 않아 찜 해제가 불가능합니다.");
    }

    public StockFavoriteNotFoundException(String message) {
        super(message);
    }
}
