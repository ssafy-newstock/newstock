package com.ssafy.newsdata.domain.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class IndustryNewsDto {
    private Long id;
    private String title;
    private String subtitle;
    private String description;
    private String article;
    private String media;
    private Long sentiment;
    private Long score;
    private String thumbnail;
    private String industry;
    private LocalDateTime uploadDatetime;
}
