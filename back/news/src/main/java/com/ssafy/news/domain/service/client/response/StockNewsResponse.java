package com.ssafy.news.domain.service.client.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockNewsResponse {
    private String id;
    private String article;
    private String description;
    private String media;
    private Integer sentiment;
    private Integer score;
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;
    private List<String> stockKeywords;
    private List<String> stockNewsStockCodes;

}
