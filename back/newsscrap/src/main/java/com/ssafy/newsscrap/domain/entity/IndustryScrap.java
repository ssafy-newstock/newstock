package com.ssafy.newsscrap.domain.entity;

import com.ssafy.newsscrap.domain.controller.request.IndustryWriteRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IndustryScrap extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "industry_news_scrap_id")
    private Long id;

    @Column(name = "industry_news_scrap_title")
    private String title;

    @Column(name = "industry_news_scrap_content", columnDefinition = "LONGTEXT")
    private String content;

    private Long memberId;

    // 뉴스 서버에서 사용하는 뉴스 조회용 ID
    private String newsId;

    private String newsType;

    public static IndustryScrap of(IndustryWriteRequest dto, Long memberId) {
        IndustryScrap entity = new IndustryScrap();
        entity.title = dto.getTitle();
        entity.content = dto.getContent();
        entity.memberId = memberId;
        entity.newsId = dto.getNewsId();
        entity.newsType = dto.getNewsType();
        return entity;
    }

    public void updateContent(final IndustryWriteRequest dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.newsId = dto.getNewsId();
        this.newsType = dto.getNewsType();
    }
}
