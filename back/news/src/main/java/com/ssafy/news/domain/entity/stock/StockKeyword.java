package com.ssafy.news.domain.entity.stock;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_keyword_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_news_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private StockNews stockNews;
    private String keyword;

    public static StockKeyword of(final StockNews stockNews, final String keyword) {
        StockKeyword entity = new StockKeyword();
        entity.stockNews = stockNews;
        entity.keyword = keyword;
        return entity;
    }
}
