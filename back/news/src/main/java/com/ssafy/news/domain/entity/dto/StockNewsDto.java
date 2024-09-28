package com.ssafy.news.domain.entity.dto;

import com.ssafy.news.domain.entity.StockNews;
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

    public static StockNewsDto of(StockNews entity, List<StockNewsStockCodeDto> stockNewsStockCodes, List<StockKeywordDto> stockKeywords) {
        StockNewsDto dto = new StockNewsDto();
        dto.id = entity.getId();
        dto.article = entity.getArticle();
        dto.description = entity.getDescription();
        dto.media = entity.getMedia();
        dto.newsId = entity.getNewsId();
        dto.sentiment = entity.getSentiment();
        dto.subtitle = entity.getSubtitle();
        dto.thumbnail = entity.getThumbnail();
        dto.title = entity.getTitle();
        dto.uploadDatetime = entity.getUploadDatetime();
        dto.stockNewsStockCodes = stockNewsStockCodes;
        dto.stockKeywords = stockKeywords;
        return dto;
    }
}
