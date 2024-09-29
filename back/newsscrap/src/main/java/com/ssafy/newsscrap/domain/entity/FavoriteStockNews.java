package com.ssafy.newsscrap.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteStockNews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_stock_news_id")
    private Long id;

    private Long memberId;

    private Long stockNewsId;
    // 부식별키
    private String stockCode;

    // 주식 코드 정도는 페이징 처리를 위해 갖고 있음
    @OneToMany(mappedBy = "favoriteStockNews")
    private List<FavoriteStockNewsStockCode> stockCodes = new ArrayList<>();
    // HBase용
    private String newsId;
}
