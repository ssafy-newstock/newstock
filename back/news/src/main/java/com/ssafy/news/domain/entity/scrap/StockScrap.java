package com.ssafy.news.domain.entity.scrap;

import com.ssafy.news.domain.entity.dto.StockScrapDto;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class StockScrap extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_news_scrap_id")
    private Long id;

    @Column(name = "stock_news_scrap_title")
    private String title;

    @Column(name = "stock_news_scrap_content")
    private String content;

    private Long memberId;

    // 뉴스 서버에서 사용하는 뉴스 조회용 ID
    private Long newsId;

    private String newsType;

    public static StockScrap of(StockScrapDto dto, Long memberId) {
        StockScrap entity = new StockScrap();
        entity.title = dto.getTitle();
        entity.content = dto.getContent();
        entity.memberId = memberId;
        entity.newsId = dto.getNewsId();
        entity.newsType = dto.getNewsType();
        return entity;
    }

    public void updateContent(final StockScrapDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.newsId = dto.getNewsId();
        this.newsType = dto.getNewsType();
    }
}
