package com.ssafy.stock.domain.service.response;

import com.ssafy.stock.domain.entity.TYPE;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StockMyPageTransactionDto {
    private Long stockId;   // 주식 DB ID
    private String stockCode;   // 주식 코드
    private String stockName;   // 주식 이름
    private Long stockTransactionAmount;    // 주식 거래량
    private Long stockTransactionPrice; // 주식 거래 가격
    private Long stockTransactionTotalPrice; // 주식 거래 총 가격
    private TYPE stockTransactionType;  // 주식 거래 타입
    private LocalDateTime stockTransactionDate; // 주식 거래 시간
}
