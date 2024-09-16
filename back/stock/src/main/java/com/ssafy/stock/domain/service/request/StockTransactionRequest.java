package com.ssafy.stock.domain.service.request;

import com.ssafy.stock.domain.entity.TYPE;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class StockTransactionRequest {
    private final String StockCode;
    private final Long stockTransactionAmount;
    private final TYPE stockTransactionType;
}
