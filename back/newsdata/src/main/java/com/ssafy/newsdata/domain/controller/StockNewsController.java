package com.ssafy.newsdata.domain.controller;

import com.ssafy.newsdata.domain.controller.response.StockNewsResponse;
import com.ssafy.newsdata.domain.entity.dto.StockNewsDto;
import com.ssafy.newsdata.domain.service.StockNewsService;
import com.ssafy.newsdata.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/newsdata/stock")
@RequiredArgsConstructor
public class StockNewsController {
    private final StockNewsService stockNewsService;

    /**
     * 종목 뉴스 4개의 최신 뉴스를 조회하는 API
     *
     * @return
     */
    @GetMapping("/top4")
    public CommonResponse<?> getTop4() throws Exception {
        List<StockNewsDto> recentTop4 = stockNewsService.getRecentStockNewsTop4();

        List<StockNewsResponse> responses = stockNewsService.convertResponseBulk(recentTop4);
        // 모델 매퍼가 List 까지 변환해주진 않기에 생략함

        return CommonResponse.success(responses);
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
            @RequestParam(value = "lastSeenId") String lastSeenId,
            @RequestParam(value = "size", defaultValue = "10") int size) throws Exception {
        List<StockNewsDto> stockNews = stockNewsService.getAllStockNews(stockCode, lastSeenId, size);

        List<StockNewsResponse> stockNewsResponses = stockNewsService.convertResponseBulk(stockNews);
        // 모델 매퍼가 List 까지 변환해주진 않기에 생략함

        return CommonResponse.success(stockNewsResponses);
    }

    @GetMapping("/{id}")
    public CommonResponse<?> getStockNews(@PathVariable("id") String id) throws Exception {
        StockNewsDto stockNews = stockNewsService.getStockNewsDetail(id);
        StockNewsResponse response = stockNewsService.convertResponse(stockNews);
        return CommonResponse.success(response);
    }

    @GetMapping("/{id}/read")
    public ResponseEntity<?> checkReadStockNews(@PathVariable("id") String id,
                                                @RequestHeader(value = "authorization", required = false) String token) {
        stockNewsService.checkReadStockNews(id, token);

        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/bulk")
    public CommonResponse<?> getStockNewsInIds(@RequestParam List<String> ids) throws SQLException, ClassNotFoundException {
        List<StockNewsResponse> stockNewsInIds = stockNewsService.getStockNewsInIds(ids);
        return CommonResponse.success(stockNewsInIds);
    }

    @GetMapping("/recent")
    public CommonResponse<?> getRecentStockNews() throws SQLException, ClassNotFoundException {
        List<StockNewsResponse> responses = stockNewsService.getRecentStockNews();
        return CommonResponse.success(responses);
    }
}
