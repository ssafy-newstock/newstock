package com.ssafy.stock.domain.service.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class StockTransactionResponse {
    private final String stockCode;
    private final Long currentPrice; // 체결가
    private final Long amount;  // 수량
    private final Long totalPrice;  // 총 금액
}
