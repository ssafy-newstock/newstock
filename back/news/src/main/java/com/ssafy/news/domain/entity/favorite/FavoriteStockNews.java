package com.ssafy.news.domain.entity.favorite;

import com.ssafy.news.domain.entity.stock.StockNews;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_news_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private StockNews stockNews;

    public static FavoriteStockNews of(Long memberId, StockNews stockNews) {
        FavoriteStockNews entity = new FavoriteStockNews();
        entity.memberId = memberId;
        entity.stockNews = stockNews;
        return entity;
    }
}
