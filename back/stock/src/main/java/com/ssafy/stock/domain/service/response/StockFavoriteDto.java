package com.ssafy.stock.domain.service.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockFavoriteDto {
    private Long stockFavoriteId;
    private Long stockId;
    private String stockCode;
    private String stockName;
}
