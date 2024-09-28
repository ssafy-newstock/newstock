package com.ssafy.news.domain.controller;


import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private final ModelMapper modelMapper;
    @GetMapping("/{newsType}/{newsId}")
    public CommonResponse<?> getOneNews(@PathVariable("newsType") String newsType,
                                        @PathVariable("newsId") String newsId) {
//        IndustryNewsDto industryNewsDto = newsService.selectIndustryNewsOne(newsId, newsType);
//        IndustryNewsFindResponse response = modelMapper.map(industryNewsDto, IndustryNewsFindResponse.class);
//
        return null;
//        return CommonResponse.success(response);
    }
}
