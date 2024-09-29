package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.favorite.FavoriteStockNews;
import com.ssafy.news.domain.entity.stock.StockKeyword;
import com.ssafy.news.domain.entity.stock.StockNews;
import com.ssafy.news.domain.entity.stock.StockNewsStockCode;
import com.ssafy.news.domain.repository.FavoriteStockNewsRepository;
import com.ssafy.news.domain.repository.StockNewsRepository;
import com.ssafy.news.domain.service.client.response.StockCodeToNameResponse;
import com.ssafy.news.global.exception.AlreadyFavoriteNews;
import com.ssafy.news.global.exception.NewsNotFoundException;
import com.ssafy.news.global.exception.NotExistFavoriteNews;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ssafy.news.domain.service.converter.NewsConverter.convertKeywordToDto;
import static com.ssafy.news.domain.service.converter.NewsConverter.convertStockCodeToDto;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class FavoriteStockNewsService {
    private final FavoriteStockNewsRepository favoriteStockNewsRepository;
    private final StockNewsRepository stockNewsRepository;

    @Transactional
    public void favoriteNews(Long memberId, Long stockNewsId) {
        // 이미 관심 목록에 등록한 경우
        if (favoriteStockNewsRepository.existsByMemberIdAndStockNewsId(memberId, stockNewsId)) {
            throw new AlreadyFavoriteNews();
        }

        StockNews stockNews = stockNewsRepository.findById(stockNewsId).orElseThrow(NewsNotFoundException::new);

        FavoriteStockNews favoriteIndustryNews = FavoriteStockNews.of(memberId, stockNews);
        favoriteStockNewsRepository.save(favoriteIndustryNews);
    }

    @Transactional
    public void unFavoriteNews(Long memberId, Long stockNewsId) {
        // 관심목록에 등록한 적이 없는 경우 (관심 상태가 아닌데 취소하는 경우)
        if (!favoriteStockNewsRepository.existsByMemberIdAndStockNewsId(memberId, stockNewsId)) {
            throw new NotExistFavoriteNews();
        }

        favoriteStockNewsRepository.deleteByMemberIdAndStockNewsId(memberId, stockNewsId);
    }

    public List<StockNewsDto> getFavoriteStockNews(Long memberId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size);

        // 패치조인으로 industry news까지 같이 가져옴
        Page<FavoriteStockNews> result = favoriteStockNewsRepository.findAllFavoriteNewsByMemberId(memberId, pageRequest);
        List<FavoriteStockNews> content = result.getContent();

        List<StockNewsDto> stockNewsDtos = content.stream()
                .map(favoriteStockNews -> {
                    StockNews stockNews = favoriteStockNews.getStockNews();
                    Set<StockNewsStockCode> stockNewsStockCodesEntity = stockNews.getStockNewsStockCodes();
                    Set<StockKeyword> keywordEntity = stockNews.getStockKeywords();

                    List<String> keywords = convertKeywordToDto(keywordEntity);
                    List<String> stockCodes = convertStockCodeToDto(stockNewsStockCodesEntity);

                    return StockNewsDto.of(stockNews, stockCodes, keywords);
                }).collect(Collectors.toList());

        return stockNewsDtos;
    }
}
