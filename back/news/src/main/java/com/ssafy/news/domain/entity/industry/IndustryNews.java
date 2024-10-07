package com.ssafy.news.domain.entity.industry;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IndustryNews {
    @Id
    @Column(name = "industry_news_id")
    private String id;
    @Lob
    @Column(name = "article", columnDefinition = "LONGTEXT")
    private String article;
    private String description;
    private String industry;
    private String media;
    private String sentiment;
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;

    public static IndustryNews of(IndustryNewsDto dto) {
        IndustryNews entity = new IndustryNews();
        entity.id = dto.getId();
        entity.article = dto.getArticle();
        entity.description = dto.getDescription();
        entity.industry = dto.getIndustry();
        entity.media = dto.getMedia();
        entity.sentiment = dto.getSentiment();
        entity.subtitle = dto.getSubtitle();
        entity.thumbnail = dto.getThumbnail();
        entity.title = dto.getTitle();
        return entity;
    }
}
