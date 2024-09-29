package com.ssafy.news.domain.controller;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.service.FavoriteIndustryNewsService;
import com.ssafy.news.domain.service.FavoriteStockNewsService;
import com.ssafy.news.global.common.CommonResponse;
import com.ssafy.news.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/industry/list")
    public CommonResponse<?> getFavoriteIndustryNews(
            @RequestHeader("authorization") String token,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Long memberId = tokenProvider.getMemberId(token);

        List<IndustryNewsDto> favoriteIndustryNews = favoriteIndustryNewsService.getFavoriteIndustryNews(memberId, page, size);
        return CommonResponse.success(favoriteIndustryNews);
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

    @GetMapping("/stock/list")
    public CommonResponse<?> getFavoriteStockNews(
            @RequestHeader("authorization") String token,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Long memberId = tokenProvider.getMemberId(token);

        List<StockNewsDto> favoriteStockNews = favoriteStockNewsService.getFavoriteStockNews(memberId, page, size);
        return CommonResponse.success(favoriteStockNews);
    }
}
