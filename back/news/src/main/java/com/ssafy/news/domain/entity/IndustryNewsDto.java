package com.ssafy.news.domain.entity;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class IndustryNewsDto {
    private String article;
    private String description;
    private String industry;
    private String media;
    private String newsId;
    private String sentiment;
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;
}
