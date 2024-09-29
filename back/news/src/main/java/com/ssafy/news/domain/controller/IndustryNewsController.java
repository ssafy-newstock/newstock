package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.service.IndustryNewsService;
import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news/industry")
@RequiredArgsConstructor
public class IndustryNewsController {
    private final IndustryNewsService industryNewsService;
    private final ModelMapper modelMapper;

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
    public CommonResponse<?> getIndustryNewsById(@PathVariable("id") Long id) {
        IndustryNewsDto industryNews = industryNewsService.getIndustryNews(id);
        return CommonResponse.success(industryNews);
    }
}
