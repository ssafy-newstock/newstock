package com.ssafy.favorite.domain.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.favorite.domain.entity.FavoriteIndustryNews;
import com.ssafy.favorite.domain.repository.FavoriteIndustryNewsRepository;
import com.ssafy.favorite.domain.service.client.response.IndustryNewsDto;
import com.ssafy.favorite.global.exception.AlreadyFavoriteNews;
import com.ssafy.favorite.global.exception.NotExistFavoriteNews;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FavoriteIndustryNewsService {
    private final FavoriteIndustryNewsRepository favoriteIndustryNewsRepository;
    private final IndustryNewsFeignService industryNewsFeignService;
    private final ObjectMapper objectMapper;

    @Transactional
    public void favoriteNews(Long memberId, String industryNewsId) {
        // 이미 관심 목록에 등록한 경우
        if (favoriteIndustryNewsRepository.existsByMemberIdAndIndustryNewsId(memberId, industryNewsId)) {
            throw new AlreadyFavoriteNews();
        }

        IndustryNewsDto industryNews = industryNewsFeignService.getIndustryNews(industryNewsId);

        FavoriteIndustryNews favoriteIndustryNews = FavoriteIndustryNews.of(memberId, industryNews.getId());
        favoriteIndustryNewsRepository.save(favoriteIndustryNews);
    }

    @Transactional
    public void unFavoriteNews(Long memberId, String industryNewsId) {
        // 관심목록에 등록한 적이 없는 경우 (관심 상태가 아닌데 취소하는 경우)
        if (!favoriteIndustryNewsRepository.existsByMemberIdAndIndustryNewsId(memberId, industryNewsId)) {
            throw new NotExistFavoriteNews();
        }

        favoriteIndustryNewsRepository.deleteByMemberIdAndIndustryNewsId(memberId, industryNewsId);
    }

    public List<IndustryNewsDto> getFavoriteIndustryNews(Long memberId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size);

        Page<FavoriteIndustryNews> result = favoriteIndustryNewsRepository.findAllFavoriteNewsByMemberId(memberId, pageRequest);
        List<FavoriteIndustryNews> content = result.getContent();

        List<String> newsIds = content.stream()
                .map(FavoriteIndustryNews::getIndustryNewsId)
                .toList();

        List<IndustryNewsDto> industryNewsInIds = industryNewsFeignService.getIndustryNewsInIds(newsIds);

        return industryNewsInIds;
    }

}
