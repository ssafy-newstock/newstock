package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.controller.response.StockNewsResponse;
import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.service.StockNewsService;
import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/news/stock")
@RequiredArgsConstructor
public class StockNewsController {
    private final StockNewsService stockNewsService;
    private final ModelMapper modelMapper;

    /**
     * 종목 뉴스 4개의 최신 뉴스를 조회하는 API
     * @return
     */
    @GetMapping("/top4")
    public CommonResponse<?> getTop4() {
        List<StockNewsDto> recentTop4 = stockNewsService.getRecentStockNewsTop4();

        List<StockNewsResponse> responses = recentTop4.stream()
                .map(dto -> modelMapper.map(dto, StockNewsResponse.class))
                .toList();

        return CommonResponse.success(responses);
    }
}
