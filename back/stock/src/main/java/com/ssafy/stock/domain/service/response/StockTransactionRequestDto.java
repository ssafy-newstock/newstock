package com.ssafy.stock.domain.service.response;

import com.ssafy.stock.domain.entity.TYPE;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class StockTransactionRequestDto {
    private final String StockCode;
    private final Long stockTransactionAmount;
    private final TYPE stockTransactionType;
}
