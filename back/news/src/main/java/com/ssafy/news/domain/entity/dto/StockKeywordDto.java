package com.ssafy.news.domain.entity.dto;

import com.ssafy.news.domain.entity.stock.StockKeyword;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class StockKeywordDto {
    private Long id;
    private String keyword;

    public static StockKeywordDto of(StockKeyword stockKeyword) {
        StockKeywordDto dto = new StockKeywordDto();
        dto.id = stockKeyword.getId();
        dto.keyword = stockKeyword.getKeyword();
        return dto;
    }
}
