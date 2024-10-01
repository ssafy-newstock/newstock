package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.service.IndustryNewsService;
import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news/industry")
@RequiredArgsConstructor
public class IndustryNewsController {
    private final IndustryNewsService industryNewsService;

    @GetMapping("/top4")
    public CommonResponse<?> getTop4() {
        List<IndustryNewsDto> industryNewsPreviewDtos = industryNewsService.getRecentIndustryNewsTop4();

        return CommonResponse.success(industryNewsPreviewDtos);
    }

    @GetMapping()
    public CommonResponse<?> getIndustryNews(
            @RequestParam(value = "industry", required = false) String industry,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        List<IndustryNewsDto> industryNewsPreviewDtos = industryNewsService.getIndustryNewsPreviews(industry, page, size);

        return CommonResponse.success(industryNewsPreviewDtos);
    }

    @GetMapping("/{id}")
    public CommonResponse<?> getIndustryNewsById(@PathVariable("id") Long id,
                                                    @RequestHeader(value = "authorization",required = false) String token) {
        IndustryNewsDto industryNews = industryNewsService.getIndustryNews(id);
        industryNewsService.checkReadIndustryNews(id, token);

        return CommonResponse.success(industryNews);
    }

    @GetMapping("/bulk")
    public CommonResponse<?> getIndustryNewsInIds(@RequestParam List<Long> ids) {
        List<IndustryNewsDto> industryNewsInIds = industryNewsService.getIndustryNewsInIds(ids);
        return CommonResponse.success(industryNewsInIds);
    }
}
