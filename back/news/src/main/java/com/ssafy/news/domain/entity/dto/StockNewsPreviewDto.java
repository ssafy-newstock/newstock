package com.ssafy.news.domain.entity.dto;

import com.ssafy.news.domain.entity.stock.StockNews;
import com.ssafy.news.domain.service.client.response.StockCodeToNameResponse;
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
public class StockNewsPreviewDto {
    private Long id;
    private String title;
    private String description;
    private String media;
    private String newsId;
    private String sentiment;
    private String thumbnail;
    private LocalDateTime uploadDatetime;

    private List<StockCodeToNameResponse> stockNewsStockCodes = new ArrayList<>();
    private List<String> stockKeywords = new ArrayList<>();

    public static StockNewsPreviewDto of(StockNews entity, List<StockCodeToNameResponse> stockNewsStockCodes, List<String> stockKeywords) {
        StockNewsPreviewDto dto = new StockNewsPreviewDto();
        dto.id = entity.getId();
        dto.description = entity.getDescription();
        dto.media = entity.getMedia();
        dto.newsId = entity.getNewsId();
        dto.sentiment = entity.getSentiment();
        dto.thumbnail = entity.getThumbnail();
        dto.title = entity.getTitle();
        dto.uploadDatetime = entity.getUploadDatetime();
        dto.stockNewsStockCodes = stockNewsStockCodes;
        dto.stockKeywords = stockKeywords;
        return dto;
    }
}
