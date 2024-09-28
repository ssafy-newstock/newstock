package com.ssafy.news.domain.controller.response;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class IndustryNewsResponse {
    private String article;
    private String description;
    private String industry;
    private String media;
    private String newsId;
    private String sentiment;
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;

    public static IndustryNewsResponse of(IndustryNewsDto dto) {
        IndustryNewsResponse response = new IndustryNewsResponse();
        response.article = dto.getArticle();
        response.description = dto.getDescription();
        response.industry = dto.getIndustry();
        response.media = dto.getMedia();
        response.newsId = dto.getNewsId();
        response.sentiment = dto.getSentiment();
        response.subtitle = dto.getSubtitle();
        response.thumbnail = dto.getThumbnail();
        response.title = dto.getTitle();
        response.uploadDatetime = dto.getUploadDatetime();
        return response;
    }
}
