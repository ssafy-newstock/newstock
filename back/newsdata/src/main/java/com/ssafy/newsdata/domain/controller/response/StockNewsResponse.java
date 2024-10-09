package com.ssafy.newsdata.domain.controller.response;

import com.ssafy.newsdata.domain.entity.dto.StockNewsDto;
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


    public static StockNewsResponse of(final StockNewsDto stockNewsDto, final List<String> keywords, final List<String> stockCodes) {
        StockNewsResponse response = new StockNewsResponse();
        response.id = stockNewsDto.getNewsId();
        response.article = stockNewsDto.getArticle();
        response.description = stockNewsDto.getDescription();
        response.media = stockNewsDto.getMedia();
        response.sentiment = stockNewsDto.getSentiment();
        response.score = stockNewsDto.getScore();
        response.subtitle = stockNewsDto.getSubtitle();
        response.thumbnail = stockNewsDto.getThumbnail();
        response.title = stockNewsDto.getTitle();
        response.uploadDatetime = stockNewsDto.getUploadDatetime();
        response.stockKeywords = keywords;
        response.stockNewsStockCodes = stockCodes;
        return response;
    }
}
