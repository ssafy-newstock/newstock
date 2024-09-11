package com.ssafy.stock.domain.service.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class StocksInfoDto {
    private final String stockCode;
    private final String stockName;
}
