package com.ssafy.newsscrap.domain.entity.dto;

import com.ssafy.newsscrap.controller.response.IndustryNewsResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FavoriteNewsDto {
    private Long favoriteNewsId;
    private String newsType;

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

    public static FavoriteNewsDto of(Long favoriteNewsId, IndustryNewsResponse response) {
        FavoriteNewsDto favoriteNewsDto = new FavoriteNewsDto();
        favoriteNewsDto.favoriteNewsId = favoriteNewsId;
        favoriteNewsDto.industry = response.getIndustry();
        favoriteNewsDto.article = response.getArticle();
        favoriteNewsDto.description = response.getDescription();
        favoriteNewsDto.media = response.getMedia();
        favoriteNewsDto.newsId = response.getNewsId();
        favoriteNewsDto.sentiment = response.getSentiment();
        favoriteNewsDto.subtitle = response.getSubtitle();
        favoriteNewsDto.thumbnail = response.getThumbnail();
        favoriteNewsDto.title = response.getTitle();
        favoriteNewsDto.uploadDatetime = response.getUploadDatetime();
        return favoriteNewsDto;
    }
}
