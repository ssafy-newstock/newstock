package com.ssafy.news.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private List<StockNewsStockCode> stockNewsStockCodes = new ArrayList<>();

    @OneToMany(mappedBy = "stockNews")
    private List<StockKeyword> stockKeywords = new ArrayList<>();
}
