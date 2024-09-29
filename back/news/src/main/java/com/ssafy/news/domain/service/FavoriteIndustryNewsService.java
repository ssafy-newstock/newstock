package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.favorite.FavoriteIndustryNews;
import com.ssafy.news.domain.entity.industry.IndustryNews;
import com.ssafy.news.domain.repository.FavoriteIndustryNewsRepository;
import com.ssafy.news.domain.repository.IndustryNewsRepository;
import com.ssafy.news.global.exception.AlreadyFavoriteNews;
import com.ssafy.news.global.exception.NewsNotFoundException;
import com.ssafy.news.global.exception.NotExistFavoriteNews;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FavoriteIndustryNewsService {
    private final FavoriteIndustryNewsRepository favoriteIndustryNewsRepository;
    private final IndustryNewsRepository industryNewsRepository;

    @Transactional
    public void favoriteNews(Long memberId, Long industryNewsId) {
        // 이미 관심 목록에 등록한 경우
        if (favoriteIndustryNewsRepository.existsByMemberIdAndIndustryNewsId(memberId, industryNewsId)) {
            throw new AlreadyFavoriteNews();
        }

        IndustryNews industryNews = industryNewsRepository.findById(industryNewsId).orElseThrow(NewsNotFoundException::new);

        FavoriteIndustryNews favoriteIndustryNews = FavoriteIndustryNews.of(memberId, industryNews);
        favoriteIndustryNewsRepository.save(favoriteIndustryNews);
    }

    @Transactional
    public void unFavoriteNews(Long memberId, Long industryNewsId) {
        // 관심목록에 등록한 적이 없는 경우 (관심 상태가 아닌데 취소하는 경우)
        if (!favoriteIndustryNewsRepository.existsByMemberIdAndIndustryNewsId(memberId, industryNewsId)) {
            throw new NotExistFavoriteNews();
        }

        favoriteIndustryNewsRepository.deleteByMemberIdAndIndustryNewsId(memberId, industryNewsId);
    }

    public List<IndustryNewsDto> getFavoriteIndustryNews(Long memberId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size);

        // 패치조인으로 industry news까지 같이 가져옴
        Page<FavoriteIndustryNews> result = favoriteIndustryNewsRepository.findAllFavoriteNewsByMemberId(memberId, pageRequest);
        List<FavoriteIndustryNews> content = result.getContent();

        List<IndustryNewsDto> industryNewsDtos = content.stream()
                .map(favoriteIndustryNews -> {
                    IndustryNews industryNews = favoriteIndustryNews.getIndustryNews();
                    return IndustryNewsDto.of(industryNews);
                }).collect(Collectors.toList());

        return industryNewsDtos;
    }

}
