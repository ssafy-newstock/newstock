package com.ssafy.newsscrap.domain.service;

import com.ssafy.newsscrap.controller.response.IndustryNewsResponse;
import com.ssafy.newsscrap.domain.entity.FavoriteNews;
import com.ssafy.newsscrap.domain.entity.dto.FavoriteNewsDto;
import com.ssafy.newsscrap.domain.repository.FavoriteNewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FavoriteNewsService {
    private final FavoriteNewsRepository favoriteNewsRepository;

    /**
     * 회원이 뉴스에 좋아요를 눌렀을 때 이를 저장하는 메소드
     * @param memberId
     * @param newsId
     * @param newsType
     */
    @Transactional
    public void likeNews(Long memberId, String newsId, String newsType) {
        FavoriteNews favoriteNews = FavoriteNews.of(memberId, newsId, newsType);
        favoriteNewsRepository.save(favoriteNews);
    }

    @Transactional
    public void unlikeNews(Long favoriteNewsId) {
        favoriteNewsRepository.deleteById(favoriteNewsId);
    }

    public List<FavoriteNewsDto> getFavoriteNews(Long memberId) {
        List<FavoriteNews> favoriteNewsList = favoriteNewsRepository.findByMemberId(memberId);

        // TODO: 뉴스 서버를 통해 뉴스 정보를 받아오고
        //  이를 FavoriteNewsDto로 변환하는 로직 구현

        List<FavoriteNewsDto> favoriteNewsDtos = favoriteNewsList.stream()
                .map(fn -> FavoriteNewsDto.of(fn.getId(), new IndustryNewsResponse()))
                .toList();

        return favoriteNewsDtos;
    }
}
