package com.ssafy.newsscrap.domain.service.client.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class IndustryNewsDto {
    private Long id;
    private String article;
    private String description;
    private String industry;
    private String media;
//    private String newsId;
    private String sentiment;
    private String subtitle;
    private String thumbnail;
    private String title;
    private LocalDateTime uploadDatetime;

}
