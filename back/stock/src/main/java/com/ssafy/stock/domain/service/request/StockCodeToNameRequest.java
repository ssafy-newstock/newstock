package com.ssafy.stock.domain.service.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockCodeToNameRequest {
    private List<String> stockCodeList;
}
