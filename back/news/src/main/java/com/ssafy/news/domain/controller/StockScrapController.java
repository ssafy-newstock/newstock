package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.controller.response.StockNewsScrapListResponse;
import com.ssafy.news.domain.controller.response.StockNewsScrapResponse;
import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.dto.StockScrapDto;
import com.ssafy.news.domain.service.StockNewsService;
import com.ssafy.news.domain.service.StockScrapService;
import com.ssafy.news.global.common.CommonResponse;
import com.ssafy.news.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/news/scrap/stock")
@RequiredArgsConstructor
@Slf4j
public class StockScrapController {
    private final StockScrapService stockScrapService;
    private final StockNewsService stockNewsService;
    private final TokenProvider tokenProvider;

    @GetMapping("/{scrapId}")
    public CommonResponse<?> getScrap(
            @PathVariable Long scrapId) {
        StockScrapDto scrapDto = stockScrapService.getScrap(scrapId);
        StockNewsDto stockNewsDto = stockNewsService.getStockNewsDetail(scrapDto.getNewsId());

        StockNewsScrapResponse response = new StockNewsScrapResponse(scrapDto, stockNewsDto);

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

        List<StockScrapDto> myStockScraps = stockScrapService.getMyStockScraps(memberId, page, size, start, end);
        List<Long> scrapInStockNewsIds = stockScrapService.getScrapInStockNewsIn(myStockScraps);

        List<StockNewsDto> stockNewsInIds = stockScrapService.getStockNewsInIds(scrapInStockNewsIds);

        StockNewsScrapListResponse response = new StockNewsScrapListResponse(myStockScraps, stockNewsInIds);

        return CommonResponse.success(response);
    }

    @PostMapping("/write")
    public CommonResponse<?> writeScrap(
            @RequestHeader("authorization") String token,
            @ModelAttribute StockScrapDto requestDto) {
        Long memberId = tokenProvider.getMemberId(token);
        log.info("scrap: {}", requestDto);
        stockScrapService.writeScrap(memberId, requestDto);

        return CommonResponse.success("성공");
    }

    @PostMapping("/{scrapId}")
    public CommonResponse<?> editScrap(
            @PathVariable("scrapId") Long scrapId,
            @RequestHeader("authorization") String token,
            @ModelAttribute StockScrapDto requestDto) {
        Long memberId = tokenProvider.getMemberId(token);
        stockScrapService.editScrap(memberId, scrapId, requestDto);

        return CommonResponse.success("성공");
    }

    @DeleteMapping("/{scrapId}")
    public CommonResponse<?> deleteScrap(
            @PathVariable("scrapId") Long scrapId,
            @RequestHeader("authorization") String token) {
        Long memberId = tokenProvider.getMemberId(token);
        stockScrapService.deleteScrap(memberId, scrapId);

        return CommonResponse.success("성공");
    }
}
