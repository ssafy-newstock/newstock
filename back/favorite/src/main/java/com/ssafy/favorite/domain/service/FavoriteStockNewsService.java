package com.ssafy.favorite.domain.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.favorite.domain.entity.FavoriteStockNews;
import com.ssafy.favorite.domain.repository.FavoriteStockNewsRepository;
import com.ssafy.favorite.domain.service.client.response.StockNewsDto;
import com.ssafy.favorite.global.exception.AlreadyFavoriteNews;
import com.ssafy.favorite.global.exception.NotExistFavoriteNews;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class FavoriteStockNewsService {
    private final FavoriteStockNewsRepository favoriteStockNewsRepository;
    private final StockNewsFeignService stockNewsFeignService;
    private final ObjectMapper objectMapper;

    @Transactional
    public void favoriteNews(Long memberId, String stockNewsId) {
        // 이미 관심 목록에 등록한 경우
        if (favoriteStockNewsRepository.existsByMemberIdAndStockNewsId(memberId, stockNewsId)) {
            throw new AlreadyFavoriteNews();
        }

        StockNewsDto stockNews = stockNewsFeignService.getStockNews(stockNewsId);

        FavoriteStockNews favoriteIndustryNews = FavoriteStockNews.of(memberId, stockNews.getId());
        favoriteStockNewsRepository.save(favoriteIndustryNews);
    }

    @Transactional
    public void unFavoriteNews(Long memberId, String stockNewsId) {
        // 관심목록에 등록한 적이 없는 경우 (관심 상태가 아닌데 취소하는 경우)
        if (!favoriteStockNewsRepository.existsByMemberIdAndStockNewsId(memberId, stockNewsId)) {
            throw new NotExistFavoriteNews();
        }

        favoriteStockNewsRepository.deleteByMemberIdAndStockNewsId(memberId, stockNewsId);
    }

    public List<StockNewsDto> getFavoriteStockNews(Long memberId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size);

        Page<FavoriteStockNews> result = favoriteStockNewsRepository.findAllFavoriteNewsByMemberId(memberId, pageRequest);
        List<FavoriteStockNews> content = result.getContent();

        List<String> newsIds = content.stream()
                .map(FavoriteStockNews::getStockNewsId)
                .toList();

        List<StockNewsDto> stockNewsInIds = stockNewsFeignService.getStockNewsInIds(newsIds);

        return stockNewsInIds;
    }
}
