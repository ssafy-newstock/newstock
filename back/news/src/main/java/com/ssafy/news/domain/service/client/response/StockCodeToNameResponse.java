package com.ssafy.news.domain.service.client.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockCodeToNameResponse {
    private String stockCode;
    private String stockName;
}
