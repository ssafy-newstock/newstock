package com.ssafy.newsscrap.domain.service.client.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StockNewsDto {
    private String id;
    private String article;
    private String description;
    private String media;
    private String newsId;
    private String sentiment;
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;
    private List<String> stockNewsStockCodes = new ArrayList<>();
    private List<String> stockKeywords = new ArrayList<>();

}
