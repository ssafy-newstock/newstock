package com.ssafy.newsscrap.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteNews extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_news_id")
    private Long id;

    private Long memberId;

    private String newsId;

    private String newsType;

    public static FavoriteNews of(Long memberId, String newsId, String newsType) {
        FavoriteNews favoriteNews = new FavoriteNews();
        favoriteNews.newsId = newsId;
        favoriteNews.newsType = newsType;
        favoriteNews.memberId = memberId;
        return favoriteNews;
    }
}
