package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.controller.response.IndustryNewsScrapResponse;
import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.dto.IndustryScrapDto;
import com.ssafy.news.domain.service.IndustryNewsService;
import com.ssafy.news.domain.service.IndustryScrapService;
import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news/scrap/industry")
@RequiredArgsConstructor
@Slf4j
public class IndustryScrapController {
    private final IndustryScrapService industryScrapService;
    private final IndustryNewsService industryNewsService;

    @GetMapping("/{scrapId}")
    public CommonResponse<?> getScrap(
            @PathVariable Long scrapId) {
        IndustryScrapDto scrapDto = industryScrapService.getScrap(scrapId);
        IndustryNewsDto industryNews = industryNewsService.getIndustryNews(scrapDto.getNewsId());

        IndustryNewsScrapResponse response = new IndustryNewsScrapResponse(scrapDto, industryNews);

        return CommonResponse.success(response);
    }

    @PostMapping("/write")
    public CommonResponse<?> writeScrap(
            @RequestHeader("authorization") String token,
            @ModelAttribute IndustryScrapDto requestDto) {

        log.info("scrap: {}", requestDto);
        industryScrapService.writeScrap(token, requestDto);

        return CommonResponse.success("성공");
    }

    @PostMapping("/{scrapId}")
    public CommonResponse<?> editScrap(
            @PathVariable("scrapId") Long scrapId,
            @RequestHeader("authorization") String token,
            @ModelAttribute IndustryScrapDto requestDto) {
        industryScrapService.editScrap(token, scrapId, requestDto);

        return CommonResponse.success("성공");
    }

    @DeleteMapping("/{scrapId}")
    public CommonResponse<?> deleteScrap(
            @PathVariable("scrapId") Long scrapId,
            @RequestHeader("authorization") String token) {
        industryScrapService.deleteScrap(token, scrapId);

        return CommonResponse.success("성공");
    }
}
