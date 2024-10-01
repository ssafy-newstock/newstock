package com.ssafy.news.domain.entity.dto;

import com.ssafy.news.domain.entity.scrap.StockScrap;
import lombok.Data;

@Data
public class StockScrapDto {
    private String title;
    private Long newsId;
    private String newsType;
    private String content;

    public static StockScrapDto of(final StockScrap stockScrap) {
        StockScrapDto dto = new StockScrapDto();
        dto.content = stockScrap.getContent();
        dto.title = stockScrap.getTitle();
        dto.newsId = stockScrap.getNewsId();
        dto.newsType = stockScrap.getNewsType();
        return dto;
    }
}
