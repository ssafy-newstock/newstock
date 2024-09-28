package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.controller.response.IndustryNewsResponse;
import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.service.IndustryNewsService;
import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/news/industry")
@RequiredArgsConstructor
public class IndustryNewsController {
    private final IndustryNewsService industryNewsService;

    @GetMapping("/top4")
    public CommonResponse<?> getTop4() {
        List<IndustryNewsDto> response = industryNewsService.getRecentIndustryNews();


        return CommonResponse.success(response);
    }

    @GetMapping()
    public CommonResponse<?> getIndustryNews(
            @RequestParam(value = "industry", required = false) String industry,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        List<IndustryNewsDto> industryNews = industryNewsService.getIndustryNews(industry, page, size);
        List<IndustryNewsResponse> responses = industryNews.stream()
                .map(IndustryNewsResponse::of)
                .toList();

        return CommonResponse.success(responses);
    }
}
