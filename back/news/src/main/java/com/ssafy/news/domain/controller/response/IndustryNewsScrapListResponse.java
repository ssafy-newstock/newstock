package com.ssafy.news.domain.controller.response;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.dto.IndustryScrapDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class IndustryNewsScrapListResponse {
    List<IndustryScrapDto> scraps;
    List<IndustryNewsDto> scrapInNews;
}
