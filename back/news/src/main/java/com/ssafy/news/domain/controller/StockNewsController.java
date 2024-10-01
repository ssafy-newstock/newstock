package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.service.StockNewsService;
import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news/stock")
@RequiredArgsConstructor
public class StockNewsController {
    private final StockNewsService stockNewsService;

    /**
     * 종목 뉴스 4개의 최신 뉴스를 조회하는 API
     *
     * @return
     */
    @GetMapping("/top4")
    public CommonResponse<?> getTop4() {
        List<StockNewsDto> recentTop4 = stockNewsService.getRecentStockNewsTop4();

        // 모델 매퍼가 List 까지 변환해주진 않기에 생략함

        return CommonResponse.success(recentTop4);
    }

    /**
     * 종목별 최신 뉴스를 조회하는 메소드
     *
     * @param stockCode
     * @param page
     * @param size
     * @return
     */
    @GetMapping("")
    public CommonResponse<?> getStockNewsPreviews(
            @RequestParam(value = "stockCode", required = false) String stockCode,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        List<StockNewsDto> stockNews = stockNewsService.getStockNewsPreviews(stockCode, page, size);

        // 모델 매퍼가 List 까지 변환해주진 않기에 생략함

        return CommonResponse.success(stockNews);
    }

    @GetMapping("/{id}")
    public CommonResponse<?> getStockNews(@PathVariable("id") Long id) {
        StockNewsDto stockNews = stockNewsService.getStockNewsDetail(id);

        // 모델 매퍼가 List 까지 변환해주진 않기에 생략함

        return CommonResponse.success(stockNews);
    }

    @GetMapping("/bulk")
    public CommonResponse<?> getStockNewsInIds(@RequestParam List<Long> ids) {
        List<StockNewsDto> stockNewsInIds = stockNewsService.getStockNewsInIds(ids);
        return CommonResponse.success(stockNewsInIds);
    }
}
