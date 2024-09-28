package com.ssafy.news.domain.controller.response;

import com.ssafy.news.domain.entity.dto.StockKeywordDto;
import com.ssafy.news.domain.entity.dto.StockNewsStockCodeDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class StockNewsResponse {
    private Long id;
    private String article;
    private String description;
    private String media;
    private String newsId;
    private String sentiment;
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;
    private List<StockNewsStockCodeDto> stockNewsStockCodes = new ArrayList<>();
    private List<StockKeywordDto> stockKeywords = new ArrayList<>();
}
