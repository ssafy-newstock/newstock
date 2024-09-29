package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.service.FavoriteIndustryNewsService;
import com.ssafy.news.domain.service.FavoriteStockNewsService;
import com.ssafy.news.global.common.CommonResponse;
import com.ssafy.news.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news/favorite")
@RequiredArgsConstructor
public class FavoriteNewsController {
    private final TokenProvider tokenProvider;
    private final FavoriteIndustryNewsService favoriteIndustryNewsService;
    private final FavoriteStockNewsService favoriteStockNewsService;

    @PostMapping("/industry/{id}")
    public CommonResponse<?> favoriteIndustryNews(
            @RequestHeader("authorization") String token,
            @PathVariable("id") Long newsId) {
        Long memberId = tokenProvider.getMemberId(token);
        favoriteIndustryNewsService.favoriteNews(memberId, newsId);
        return CommonResponse.success("성공");
    }

    @DeleteMapping("/industry/{id}")
    public CommonResponse<?> unFavoriteIndustryNews(
            @RequestHeader("authorization") String token,
            @PathVariable("id") Long newsId) {
        Long memberId = tokenProvider.getMemberId(token);
        favoriteIndustryNewsService.unFavoriteNews(memberId, newsId);
        return CommonResponse.success("성공");
    }

    @PostMapping("/stock/{id}")
    public CommonResponse<?> favoriteStockNews(
            @RequestHeader("authorization") String token,
            @PathVariable("id") Long newsId) {
        Long memberId = tokenProvider.getMemberId(token);
        favoriteStockNewsService.favoriteNews(memberId, newsId);
        return CommonResponse.success("성공");
    }

    @DeleteMapping("/stock/{id}")
    public CommonResponse<?> unFavoriteStockNews(
            @RequestHeader("authorization") String token,
            @PathVariable("id") Long newsId) {
        Long memberId = tokenProvider.getMemberId(token);
        favoriteStockNewsService.unFavoriteNews(memberId, newsId);
        return CommonResponse.success("성공");
    }
}
