package com.ssafy.stock.domain.entity;

public enum TYPE {
    BUY(0), SELL(1);

    private int value;

    TYPE(int value) {
        this.value = value;
    }
}
