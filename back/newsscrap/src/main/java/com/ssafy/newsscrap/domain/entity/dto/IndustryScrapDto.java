package com.ssafy.newsscrap.domain.entity.dto;

import com.ssafy.newsscrap.domain.entity.IndustryScrap;
import lombok.Data;

@Data
public class IndustryScrapDto {
    private Long id;
    private String title;
    private String newsId;
    private String newsType;
    private String content;

    public static IndustryScrapDto of(final IndustryScrap newsScrap) {
        IndustryScrapDto dto = new IndustryScrapDto();
        dto.id = newsScrap.getId();
        dto.content = newsScrap.getContent();
        dto.title = newsScrap.getTitle();
        dto.newsId = newsScrap.getNewsId();
        dto.newsType = newsScrap.getNewsType();
        return dto;
    }
}
