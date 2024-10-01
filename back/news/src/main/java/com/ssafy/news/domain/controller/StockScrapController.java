package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.controller.response.StockNewsScrapResponse;
import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.dto.StockScrapDto;
import com.ssafy.news.domain.service.StockNewsService;
import com.ssafy.news.domain.service.StockScrapService;
import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news/scrap/stock")
@RequiredArgsConstructor
@Slf4j
public class StockScrapController {
    private final StockScrapService stockScrapService;
    private final StockNewsService stockNewsService;

    @GetMapping("/{scrapId}")
    public CommonResponse<?> getScrap(
            @PathVariable Long scrapId) {
        StockScrapDto scrapDto = stockScrapService.getScrap(scrapId);
        StockNewsDto stockNewsDto = stockNewsService.getStockNewsDetail(scrapDto.getNewsId());

        StockNewsScrapResponse response = new StockNewsScrapResponse(scrapDto, stockNewsDto);

        return CommonResponse.success(response);
    }

    @PostMapping("/write")
    public CommonResponse<?> writeScrap(
            @RequestHeader("authorization") String token,
            @ModelAttribute StockScrapDto requestDto) {

        log.info("scrap: {}", requestDto);
        stockScrapService.writeScrap(token, requestDto);

        return CommonResponse.success("성공");
    }

    @PostMapping("/{scrapId}")
    public CommonResponse<?> editScrap(
            @PathVariable("scrapId") Long scrapId,
            @RequestHeader("authorization") String token,
            @ModelAttribute StockScrapDto requestDto) {
        stockScrapService.editScrap(token, scrapId, requestDto);

        return CommonResponse.success("성공");
    }

    @DeleteMapping("/{scrapId}")
    public CommonResponse<?> deleteScrap(
            @PathVariable("scrapId") Long scrapId,
            @RequestHeader("authorization") String token) {
        stockScrapService.deleteScrap(token, scrapId);

        return CommonResponse.success("성공");
    }
}
