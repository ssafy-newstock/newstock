package com.ssafy.favorite.domain.controller;

import com.ssafy.favorite.domain.service.FavoriteIndustryNewsService;
import com.ssafy.favorite.domain.service.client.response.IndustryNewsDto;
import com.ssafy.favorite.global.common.CommonResponse;
import com.ssafy.favorite.global.common.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news/favorite/industry")
@RequiredArgsConstructor
public class FavoriteIndustryNewsController {
    private final TokenProvider tokenProvider;
    private final FavoriteIndustryNewsService favoriteIndustryNewsService;

    @PostMapping("/{id}")
    public CommonResponse<?> favoriteIndustryNews(
            @RequestHeader("authorization") String token,
            @PathVariable("id") Long newsId) {
        Long memberId = tokenProvider.getMemberId(token);
        favoriteIndustryNewsService.favoriteNews(memberId, newsId);
        return CommonResponse.success("성공");
    }

    @DeleteMapping("/{id}")
    public CommonResponse<?> unFavoriteIndustryNews(
            @RequestHeader("authorization") String token,
            @PathVariable("id") Long newsId) {
        Long memberId = tokenProvider.getMemberId(token);
        favoriteIndustryNewsService.unFavoriteNews(memberId, newsId);
        return CommonResponse.success("성공");
    }

    @GetMapping("")
    public CommonResponse<?> getFavoriteIndustryNews(
            @RequestHeader("authorization") String token,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Long memberId = tokenProvider.getMemberId(token);

        List<IndustryNewsDto> favoriteIndustryNews = favoriteIndustryNewsService.getFavoriteIndustryNews(memberId, page, size);
        return CommonResponse.success(favoriteIndustryNews);
    }
}

