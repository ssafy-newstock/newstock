package com.ssafy.news.domain.service;


import com.ssafy.news.domain.entity.IndustryNews;
import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.repository.IndustryNewsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ssafy.news.domain.service.converter.NewsConverter.convertIndustryToDtoList;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsContent;

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
    public List<IndustryNewsDto> getRecentIndustryNews() {
        List<IndustryNews> top4 = industryNewsRepository.findTop4(PageRequest.of(0, 4));

        validateNewsContent(top4);
        return convertIndustryToDtoList(top4);
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
    public List<IndustryNewsDto> getIndustryNews(String industry, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size, Sort.by("uploadDatetime").descending());

        List<IndustryNews> content = null;
        if (industry == null || industry.isEmpty()) {
            content = industryNewsRepository.findAllIndustryPage(pageRequest).getContent();
        } else {
            content = industryNewsRepository.findAllByIndustry(industry, pageRequest).getContent();
        }

        validateNewsContent(content);  // 뉴스가 없을 때 예외 처리
        return convertIndustryToDtoList(content);  // DTO 변환
    }


}
