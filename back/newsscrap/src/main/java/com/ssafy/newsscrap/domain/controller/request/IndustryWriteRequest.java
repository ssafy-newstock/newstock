package com.ssafy.newsscrap.domain.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndustryWriteRequest {
    private String title;
    private String newsId;
    private String newsType;
    private String content;
}
