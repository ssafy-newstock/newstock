package com.ssafy.stock.domain.service.response;

import com.ssafy.stock.domain.entity.StocksTransactions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockTransactionDto {
    private String stockCode;
    private Long currentPrice; // 체결가
    private Long amount;  // 수량
    private Long totalPrice;  // 총 금액

    public static StockTransactionDto of (StocksTransactions stocksTransactions, Long totalPrice){
        StockTransactionDto dto = new StockTransactionDto();
        dto.stockCode = stocksTransactions.getStock().getStockCode();
        dto.currentPrice = stocksTransactions.getStockTransactionPrice();
        dto.amount = stocksTransactions.getStockTransactionAmount();
        dto.totalPrice = totalPrice;
        return dto;
    }

}
