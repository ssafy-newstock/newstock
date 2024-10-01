package com.ssafy.news.domain.controller.response;

import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.dto.StockScrapDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class StockNewsScrapListResponse {
    List<StockScrapDto> scraps;
    List<StockNewsDto> scrapInNews;
}
