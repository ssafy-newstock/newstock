package com.ssafy.favorite.domain.controller;

import com.ssafy.favorite.domain.service.FavoriteStockNewsService;
import com.ssafy.favorite.domain.service.client.response.StockNewsDto;
import com.ssafy.favorite.global.common.CommonResponse;
import com.ssafy.favorite.global.common.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news/favorite/stock")
@RequiredArgsConstructor
public class FavoriteStockNewsController {
    private final TokenProvider tokenProvider;
    private final FavoriteStockNewsService favoriteStockNewsService;

    @PostMapping("/{id}")
    public CommonResponse<?> favoriteStockNews(
            @RequestHeader("authorization") String token,
            @PathVariable("id") String newsId) {
        Long memberId = tokenProvider.getMemberId(token);
        favoriteStockNewsService.favoriteNews(memberId, newsId);
        return CommonResponse.success("성공");
    }

    @DeleteMapping("/{id}")
    public CommonResponse<?> unFavoriteStockNews(
            @RequestHeader("authorization") String token,
            @PathVariable("id") String newsId) {
        Long memberId = tokenProvider.getMemberId(token);
        favoriteStockNewsService.unFavoriteNews(memberId, newsId);
        return CommonResponse.success("성공");
    }

    @GetMapping("")
    public CommonResponse<?> getFavoriteStockNews(
            @RequestHeader("authorization") String token,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Long memberId = tokenProvider.getMemberId(token);

        List<StockNewsDto> favoriteStockNews = favoriteStockNewsService.getFavoriteStockNews(memberId, page, size);
        return CommonResponse.success(favoriteStockNews);
    }
}
