package com.ssafy.news.domain.entity.stock;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_news_id")
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

    @OneToMany(mappedBy = "stockNews")
    private Set<StockNewsStockCode> stockNewsStockCodes;

    @OneToMany(mappedBy = "stockNews")
    private Set<StockKeyword> stockKeywords;
}
