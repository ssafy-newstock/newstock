package com.ssafy.newsscrap.domain.entity.dto;

import com.ssafy.newsscrap.domain.entity.StockScrap;
import lombok.Data;

@Data
public class StockScrapDto {
    private Long id;
    private String title;
    private String newsId;
    private String newsType;
    private String content;

    public static StockScrapDto of(final StockScrap stockScrap) {
        StockScrapDto dto = new StockScrapDto();
        dto.id = stockScrap.getId();
        dto.content = stockScrap.getContent();
        dto.title = stockScrap.getTitle();
        dto.newsId = stockScrap.getNewsId();
        dto.newsType = stockScrap.getNewsType();
        return dto;
    }
}
