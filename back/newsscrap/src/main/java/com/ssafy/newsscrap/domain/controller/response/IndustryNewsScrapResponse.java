package com.ssafy.newsscrap.domain.controller.response;

import com.ssafy.newsscrap.domain.entity.dto.IndustryScrapDto;
import com.ssafy.newsscrap.domain.service.client.response.IndustryNewsDto;
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
