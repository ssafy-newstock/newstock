package com.ssafy.newsscrap.domain.controller.response;

import com.ssafy.newsscrap.domain.entity.dto.IndustryScrapDto;
import com.ssafy.newsscrap.domain.service.client.response.IndustryNewsDto;
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
