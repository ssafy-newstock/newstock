package com.ssafy.favorite.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteIndustryNews extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_stock_news_id")
    private Long id;

    // 좋아요한 멤버 DB 아이디
    private Long memberId;

    private String industryNewsId;

    public static FavoriteIndustryNews of(Long memberId, String industryNewsId) {
        FavoriteIndustryNews entity = new FavoriteIndustryNews();
        entity.memberId = memberId;
        entity.industryNewsId = industryNewsId;
        return entity;
    }
}
