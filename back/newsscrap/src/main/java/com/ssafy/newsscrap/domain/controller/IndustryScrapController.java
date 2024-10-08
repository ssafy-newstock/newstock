package com.ssafy.newsscrap.domain.controller;

import com.ssafy.newsscrap.domain.controller.request.IndustryWriteRequest;
import com.ssafy.newsscrap.domain.controller.response.IndustryNewsScrapListResponse;
import com.ssafy.newsscrap.domain.controller.response.IndustryNewsScrapResponse;
import com.ssafy.newsscrap.domain.entity.dto.IndustryScrapDto;
import com.ssafy.newsscrap.domain.service.IndustryNewsFeignService;
import com.ssafy.newsscrap.domain.service.IndustryScrapService;
import com.ssafy.newsscrap.domain.service.client.response.IndustryNewsDto;
import com.ssafy.newsscrap.global.common.CommonResponse;
import com.ssafy.newsscrap.global.common.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/news/scrap/industry")
@RequiredArgsConstructor
@Slf4j
public class IndustryScrapController {
    private final IndustryScrapService industryScrapService;
    private final IndustryNewsFeignService industryNewsFeignService;
    private final TokenProvider tokenProvider;

    @GetMapping("/{scrapId}")
    public CommonResponse<?> getScrap(
            @PathVariable Long scrapId) {
        IndustryScrapDto scrapDto = industryScrapService.getScrap(scrapId);
        IndustryNewsDto industryNews = industryNewsFeignService.getIndustryNews(scrapDto.getNewsId());

        IndustryNewsScrapResponse response = new IndustryNewsScrapResponse(scrapDto, industryNews);

        return CommonResponse.success(response);
    }

    @GetMapping("")
    public CommonResponse<?> getMyScraps(
            @RequestHeader("authorization") String token,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate) {
        Long memberId = tokenProvider.getMemberId(token);
        log.info("memberId = {}", memberId);
        // 기본값으로 일주일 전 날짜와 오늘 날짜 설정
        LocalDate start = startDate != null ? LocalDate.parse(startDate, DateTimeFormatter.ISO_DATE) : LocalDate.now().minusWeeks(1);
        LocalDate end = endDate != null ? LocalDate.parse(endDate, DateTimeFormatter.ISO_DATE) : LocalDate.now();

        List<IndustryScrapDto> myStockScraps = industryScrapService.getMyIndustryScraps(memberId, page, size, start, end);
        List<String> scrapInStockNewsIds = industryScrapService.getScrapInIndustryNewsIn(myStockScraps);

        List<IndustryNewsDto> industryNews = industryNewsFeignService.getIndustryNewsInIds(scrapInStockNewsIds);

        IndustryNewsScrapListResponse response = new IndustryNewsScrapListResponse(myStockScraps, industryNews);

        return CommonResponse.success(response);
    }

    @PostMapping("/write")
    public CommonResponse<?> writeScrap(
            @RequestHeader("authorization") String token,
            @ModelAttribute IndustryWriteRequest requestDto) {
        Long memberId = tokenProvider.getMemberId(token);
        log.info("scrap: {}", requestDto);
        industryScrapService.writeScrap(memberId, requestDto);

        return CommonResponse.success("성공");
    }

    @PostMapping("/{scrapId}")
    public CommonResponse<?> editScrap(
            @PathVariable("scrapId") Long scrapId,
            @RequestHeader("authorization") String token,
            @ModelAttribute IndustryWriteRequest requestDto) {
        Long memberId = tokenProvider.getMemberId(token);
        industryScrapService.editScrap(memberId, scrapId, requestDto);

        return CommonResponse.success("성공");
    }

    @DeleteMapping("/{scrapId}")
    public CommonResponse<?> deleteScrap(
            @PathVariable("scrapId") Long scrapId,
            @RequestHeader("authorization") String token) {
        Long memberId = tokenProvider.getMemberId(token);
        industryScrapService.deleteScrap(memberId, scrapId);

        return CommonResponse.success("성공");
    }
}
