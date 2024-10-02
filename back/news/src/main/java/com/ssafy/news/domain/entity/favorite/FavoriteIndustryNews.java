package com.ssafy.news.domain.entity.favorite;

import com.ssafy.news.domain.entity.industry.IndustryNews;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "industry_news_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private IndustryNews industryNews;

    public static FavoriteIndustryNews of(Long memberId, IndustryNews industryNews) {
        FavoriteIndustryNews entity = new FavoriteIndustryNews();
        entity.memberId = memberId;
        entity.industryNews = industryNews;
        return entity;
    }
}
