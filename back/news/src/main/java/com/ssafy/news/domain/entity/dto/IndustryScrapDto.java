package com.ssafy.news.domain.entity.dto;

import com.ssafy.news.domain.entity.scrap.IndustryScrap;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IndustryScrapDto {
    private String title;
    private Long newsId;
    private String newsType;
    private String content;

    public static IndustryScrapDto of(final IndustryScrap newsScrap) {
        IndustryScrapDto dto = new IndustryScrapDto();
        dto.content = newsScrap.getContent();
        dto.title = newsScrap.getTitle();
        dto.newsId = newsScrap.getNewsId();
        dto.newsType = newsScrap.getNewsType();
        return dto;
    }
}
