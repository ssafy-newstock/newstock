package com.ssafy.newsscrap.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteIndustryNews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_stock_news_id")
    private Long id;

    // 좋아요한 멤버 DB 아이디
    private Long memberId;

    // 시황 뉴스 DB 아이디
    private Long industryNewsId;

    // 시황 카테고리
    private String industry;

    // HBase용
    private String newsId;
    private String newsType;

    public static FavoriteIndustryNews of(Long memberId, Long industryNewsId, String industry) {
        FavoriteIndustryNews industryNews = new FavoriteIndustryNews();
        industryNews.memberId = memberId;
        industryNews.industryNewsId = industryNewsId;
        industryNews.industry = industry;
        return industryNews;
    }
}
