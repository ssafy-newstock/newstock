package com.ssafy.stock.domain.service.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StockMyPageHoldingDto {
    private Long stockId;   // 주식 DB ID
    private String stockCode;   // 주식 코드
    private String stockName;   // 주식 이름
    private Long stockHoldingBuyAmount; // 보유 주식 수량
    private Long stockHoldingBuyPrice;  // 보유 주식 평단가
    private Long stockHoldingChange;    // 보유 주식 등락 가격
    private Double stockHoldingChangeRate;  // 보유 주식 등락률

}
