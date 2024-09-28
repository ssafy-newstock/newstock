package com.ssafy.news.domain.service;


import com.ssafy.news.domain.entity.IndustryNews;
import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.dto.IndustryNewsPreviewDto;
import com.ssafy.news.domain.repository.IndustryNewsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsContent;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsListContent;

@RequiredArgsConstructor
@Service
@Slf4j
public class IndustryNewsService {
    private final IndustryNewsRepository industryNewsRepository;

    /**
     * 최신 뉴스 4가지만을 조회하는 메소드
     *
     * @return 최신 뉴스 4개
     */
    public List<IndustryNewsPreviewDto> getRecentIndustryNewsTop4() {
        List<IndustryNewsPreviewDto> content = industryNewsRepository.findAllIndustryNewsPreview(PageRequest.of(0, 4)).getContent();

        // IndustryNewsPreviewDto 로 반환되기에 valid 이후 바로 반환
        validateNewsListContent(content);
        return content;
    }

    /**
     * 산업군별 뉴스를 조회하는 메소드
     * 만약 산업군이 없으면 최신 산업 뉴스를 조회함
     *
     * @param industry 산업군
     * @param page     페이지
     * @param size     사이즈
     * @return
     */
    public List<IndustryNewsPreviewDto> getIndustryNewsPreviews(String industry, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size, Sort.by("uploadDatetime").descending());

        // 만약 industry 가 있다면, 특정 산업에 맞는 뉴스 반환
        // 없다면 최신순으로 전체 뉴스 반환
        List<IndustryNewsPreviewDto> content = null;
        if (industry == null || industry.isEmpty()) {
            content = industryNewsRepository.findAllIndustryNewsPreview(pageRequest).getContent();
        } else {
            content = industryNewsRepository.findIndustryNewsPreviewWithIndustry(industry, pageRequest).getContent();
        }

        // IndustryNewsPreviewDto 로 반환되기에 valid 이후 바로 반환
        validateNewsListContent(content);
        return content;
    }

    public IndustryNewsDto getIndustryNews(Long id) {
        Optional<IndustryNews> findNews = industryNewsRepository.findById(id);
        validateNewsContent(findNews);
        return IndustryNewsDto.of(findNews.get());
    }

}
