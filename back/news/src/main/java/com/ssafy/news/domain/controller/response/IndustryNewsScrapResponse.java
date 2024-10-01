package com.ssafy.news.domain.controller.response;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.dto.IndustryScrapDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IndustryNewsScrapResponse {
    private IndustryScrapDto industryScrapDto;
    private IndustryNewsDto industryNewsDto;
}
