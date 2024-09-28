package com.ssafy.newsscrap.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class NewsScrap extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_scrap_id")
    private Long id;

    @Column(name = "news_scrap_title")
    private String title;

    @Column(name = "news_scrap_content")
    private String content;

    private Long memberId;
    // 뉴스 서버에서 사용하는 뉴스 조회용 ID
    private String newsId;

    private String newsType;
}
