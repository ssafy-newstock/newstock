package com.ssafy.news.domain.entity.stock;

import com.ssafy.news.domain.service.client.response.StockNewsResponse;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockNews {
    @Id
    @Column(name = "stock_news_id")
    private String id;
    @Lob
    @Column(name = "article", columnDefinition = "LONGTEXT")
    private String article;
    private String description;
    private String media;
    private Integer sentiment;
    @Lob
    @Column(name = "subtitle", columnDefinition = "TEXT")
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;

    @OneToMany(mappedBy = "stockNews")
    private Set<StockNewsStockCode> stockNewsStockCodes;

    @OneToMany(mappedBy = "stockNews")
    private Set<StockKeyword> stockKeywords;

    public static StockNews of(StockNewsResponse stockNewsDto) {
        StockNews entity = new StockNews();
        entity.id = stockNewsDto.getId();
        entity.article = stockNewsDto.getArticle();
        entity.description = stockNewsDto.getDescription();
        entity.media = stockNewsDto.getMedia();
        entity.sentiment = stockNewsDto.getSentiment();
        entity.subtitle = stockNewsDto.getSubtitle();
        entity.thumbnail = stockNewsDto.getThumbnail();
        entity.title = stockNewsDto.getTitle();
        entity.uploadDatetime = stockNewsDto.getUploadDatetime();
        return entity;
    }

    public void injectEntity(final Set<StockNewsStockCode> stockCodes, final Set<StockKeyword> stockKeywords) {
        this.stockKeywords = stockKeywords;
        this.stockNewsStockCodes = stockCodes;
    }
}
