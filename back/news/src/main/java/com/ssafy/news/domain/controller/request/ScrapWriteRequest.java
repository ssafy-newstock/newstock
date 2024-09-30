package com.ssafy.news.domain.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ScrapWriteRequest {
    private String title;
    private Long newsId;
    private String newsType;
    private String content;
}
