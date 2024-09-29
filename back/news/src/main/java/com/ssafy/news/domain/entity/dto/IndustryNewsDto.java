package com.ssafy.news.domain.entity.dto;

import com.ssafy.news.domain.entity.industry.IndustryNews;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class IndustryNewsDto {
    private Long industryNewsId;
    private String article;
    private String description;
    private String industry;
    private String media;
//    private String newsId;
    private String sentiment;
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;

    public static IndustryNewsDto of(IndustryNews industryNews) {
        IndustryNewsDto dto = new IndustryNewsDto();
        dto.industryNewsId = industryNews.getId();
        dto.article = industryNews.getArticle();
        dto.description = industryNews.getDescription();
        dto.industry = industryNews.getIndustry();
        dto.media = industryNews.getMedia();
//        dto.newsId = industryNews.getNewsId();
        dto.sentiment = industryNews.getSentiment();
        dto.subtitle = industryNews.getSubtitle();
        dto.thumbnail = industryNews.getThumbnail();
        dto.title = industryNews.getTitle();
        dto.uploadDatetime = industryNews.getUploadDatetime();
        return dto;
    }
}
