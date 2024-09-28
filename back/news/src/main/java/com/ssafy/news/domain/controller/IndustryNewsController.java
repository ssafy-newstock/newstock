package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.controller.response.IndustryNewsPreviewResponse;
import com.ssafy.news.domain.entity.dto.IndustryNewsPreviewDto;
import com.ssafy.news.domain.service.IndustryNewsService;
import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;

    @GetMapping("/top4")
    public CommonResponse<?> getTop4() {
        List<IndustryNewsPreviewDto> industryNewsPreviewDtos = industryNewsService.getRecentIndustryNews();

        // previewDto -> response
        List<IndustryNewsPreviewResponse> responses = industryNewsPreviewDtos.stream()
                .map(dto -> modelMapper.map(dto, IndustryNewsPreviewResponse.class))
                .toList();
        return CommonResponse.success(responses);
    }

    @GetMapping()
    public CommonResponse<?> getIndustryNews(
            @RequestParam(value = "industry", required = false) String industry,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        List<IndustryNewsPreviewDto> industryNewsPreviewDtos = industryNewsService.getIndustryNews(industry, page, size);

        // previewDto -> response
        List<IndustryNewsPreviewResponse> responses = industryNewsPreviewDtos.stream()
                .map(dto -> modelMapper.map(dto, IndustryNewsPreviewResponse.class))
                .toList();
        return CommonResponse.success(responses);
    }
}
