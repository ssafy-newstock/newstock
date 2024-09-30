package com.ssafy.news.domain.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class IndustryNewsPreviewResponse {
    private Long id;
    private String title;
    private String industry;
    private String description;
    private String media;
    private String sentiment;
    private String newsId;
    private String thumbnail;
    private LocalDateTime uploadDatetime;
}
