package com.ssafy.favorite.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteStockNews extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_stock_news_id")
    private Long id;

    private Long memberId;

    private String stockNewsId;

    public static FavoriteStockNews of(Long memberId, String stockNewsId) {
        FavoriteStockNews entity = new FavoriteStockNews();
        entity.stockNewsId = stockNewsId;
        entity.memberId = memberId;
        return entity;
    }

}
