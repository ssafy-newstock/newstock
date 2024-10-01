package com.ssafy.news.domain.controller.response;

import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.dto.StockScrapDto;
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
