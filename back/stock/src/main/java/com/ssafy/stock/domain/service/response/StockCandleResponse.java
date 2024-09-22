package com.ssafy.stock.domain.service.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockCandleResponse { ;
    private Long stockId;
    private String stockCode;
    private Long stockCandleId;
    private LocalDateTime stockCandleDay;
    private Long stockCandleOpen;
    private Long stockCandleClose;
    private Long stockCandleHigh;
    private Long stockCandleLow;
}
