package com.ssafy.newsscrap.domain.controller.response;

import com.ssafy.newsscrap.domain.entity.dto.StockScrapDto;
import com.ssafy.newsscrap.domain.service.client.response.StockNewsDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StockNewsScrapResponse {
    private StockScrapDto stockScrapDto;
    private StockNewsDto stockNewsDto;
}
