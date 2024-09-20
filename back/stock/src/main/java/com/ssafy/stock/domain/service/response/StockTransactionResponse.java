package com.ssafy.stock.domain.service.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockTransactionResponse {
    private String stockCode;
    private Long currentPrice; // 체결가
    private Long amount;  // 수량
    private Long totalPrice;  // 총 금액
}
