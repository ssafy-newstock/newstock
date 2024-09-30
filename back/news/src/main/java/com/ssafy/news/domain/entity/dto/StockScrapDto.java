package com.ssafy.news.domain.entity.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
public class StockScrapDto {
    private String title;
    private Long newsId;
    private String newsType;
    private String content;
}
