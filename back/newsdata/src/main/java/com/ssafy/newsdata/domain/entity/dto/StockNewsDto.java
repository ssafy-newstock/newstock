package com.ssafy.newsdata.domain.entity.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockNewsDto {
    private String newsId;
    private String article;
    private String description;
    private String media;
    private Integer sentiment;
    private Integer score;
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;
    private String keywords;
    private String stockCodes;
}
