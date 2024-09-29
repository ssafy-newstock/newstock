package com.ssafy.news.domain.entity.dto;

import com.ssafy.news.domain.entity.stock.StockNewsStockCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StockNewsStockCodeDto {
    private Long id;
    private String stockCode;

    public static StockNewsStockCodeDto of(StockNewsStockCode stockCode) {
        StockNewsStockCodeDto dto = new StockNewsStockCodeDto();
        dto.id = stockCode.getId();
        dto.stockCode = stockCode.getStockCode();
        return dto;
    }
}
