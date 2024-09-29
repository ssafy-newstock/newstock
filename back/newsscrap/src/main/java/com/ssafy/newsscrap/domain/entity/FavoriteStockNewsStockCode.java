package com.ssafy.newsscrap.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteStockNewsStockCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_stock_news_stock_code_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "favorite_stock_news_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private FavoriteStockNews favoriteStockNews;

    private String stockCode;
}