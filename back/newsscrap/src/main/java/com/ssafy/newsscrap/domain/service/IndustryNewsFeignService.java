package com.ssafy.newsscrap.domain.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.newsscrap.domain.service.client.IndustryNewsClient;
import com.ssafy.newsscrap.domain.service.client.response.IndustryNewsDto;
import com.ssafy.newsscrap.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class IndustryNewsFeignService {
    private final IndustryNewsClient industryNewsClient;
    private final ObjectMapper objectMapper;

    public IndustryNewsDto getIndustryNews(Long newsId) {
        // 주식 서버 호출
        CommonResponse<?> response = industryNewsClient.getIndustryNewsById(newsId);

        return objectMapper.convertValue(response.getData(), IndustryNewsDto.class);
    }

    public List<IndustryNewsDto> getIndustryNewsInIds(final List<Long> scrapInStockNewsIds) {
        CommonResponse<?> response = industryNewsClient.getIndustryNewsInIds(scrapInStockNewsIds);

        // ObjectMapper를 사용해 List<IndustryNewsDto>로 변환
        List<IndustryNewsDto> industryNewsList = objectMapper.convertValue(
                response.getData(), new TypeReference<List<IndustryNewsDto>>() {
                }
        );
        return industryNewsList;
    }
}
