package com.ssafy.stock.domain.entity;

public enum STOCKPRICE {
    TOP(0), OTHER(1);

    private int value;

    STOCKPRICE(int value) {
        this.value = value;
    }
}
