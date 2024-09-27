package com.ssafy.stock.domain.service.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class StockCandleRequestDto {
    private final LocalDate startDate;
    private final LocalDate endDate;
}
