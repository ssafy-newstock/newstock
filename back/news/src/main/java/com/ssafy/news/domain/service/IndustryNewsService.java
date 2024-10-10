package com.ssafy.news.domain.service;


import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.industry.IndustryNews;
import com.ssafy.news.domain.entity.industry.IndustryNewsRedis;
import com.ssafy.news.domain.repository.IndustryNewsRedisRepository;
import com.ssafy.news.domain.repository.IndustryNewsRepository;
import com.ssafy.news.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsContent;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsListContent;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class IndustryNewsService {
    private final IndustryNewsRepository industryNewsRepository;
    private final IndustryNewsRedisRepository industryNewsRedisRepository;
    private final TokenProvider tokenProvider;
    private final NewsSchedulerService newsSchedulerService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    /**
     * 최신 뉴스 4가지만을 조회하는 메소드
     *
     * @return 최신 뉴스 4개
     */
    public List<IndustryNewsDto> getRecentIndustryNewsTop4() {
        List<IndustryNewsDto> content = industryNewsRepository.findAllIndustryNewsPreview(PageRequest.of(0, 4)).getContent();

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
    public List<IndustryNewsDto> getIndustryNewsPreviews(String industry, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size, Sort.by("uploadDatetime").descending());

        // 만약 industry 가 있다면, 특정 산업에 맞는 뉴스 반환
        // 없다면 최신순으로 전체 뉴스 반환
        List<IndustryNewsDto> content = null;
        if (industry == null || industry.isEmpty()) {
            content = industryNewsRepository.findAllIndustryNewsPreview(pageRequest).getContent();
        } else {
            content = industryNewsRepository.findIndustryNewsPreviewWithIndustry(industry, pageRequest).getContent();
        }

        // IndustryNewsPreviewDto 로 반환되기에 valid 이후 바로 반환
        validateNewsListContent(content);
        return content;
    }

    /**
     * ID를 통해 시황 뉴스의 상세 정보를 조회하는 메소드
     *
     * @param id
     * @return
     */
    public IndustryNewsDto getIndustryNews(String id) {
        Optional<IndustryNews> findNews = industryNewsRepository.findById(id);
        validateNewsContent(findNews);
        return IndustryNewsDto.of(findNews.get());
    }

    public List<IndustryNewsDto> getIndustryNewsInIds(List<String> industryIds) {
        List<IndustryNews> industryNewsByIdIn = industryNewsRepository.findAllByIdIn(industryIds);
        return industryNewsByIdIn.stream()
                .map(IndustryNewsDto::of)
                .collect(Collectors.toList());
    }

    /**
     * 시황 뉴스 조회 확인 메소드
     *
     * @param newsId
     * @param token
     */
    @Transactional
    public void checkReadIndustryNews(String newsId, String token) {
        if (token != null && !token.isEmpty()) {
            Long memberId = tokenProvider.getMemberId(token);

            industryNewsRedisRepository.findById(newsId + "|" + memberId)
                    .ifPresentOrElse(
                            industryNewsRedis -> {
                            },
                            () -> {
                                industryNewsRedisRepository.save(new IndustryNewsRedis(newsId, memberId));

                                // Member 서버에 회원 포인트 증가 이벤트 요청
                                Map<String, Object> message = new HashMap<>();
                                message.put("memberId", memberId);
                                message.put("industryNewsId", newsId);

                                kafkaTemplate.send("read-industry-news", message);
                            });
        }
    }

    /**
     * 시황 뉴스 조회 기록 삭제 스케줄러
     * 매일 자정
     */
    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void deleteReadIndustryNews() {
        newsSchedulerService.deleteIndustryNewsRedis();
    }

    @Transactional
    public void insertIndustryNews(List<IndustryNewsDto> industryNewsList) {
        // 입력 리스트에서 모든 ID 추출
        List<String> ids = industryNewsList.stream()
                .map(IndustryNewsDto::getId)
                .toList();

        List<IndustryNews> existingIndustryNews = industryNewsRepository.findAllByIdIn(ids);

        // 존재하는 뉴스의 ID 목록 추출
        Set<String> existingIds = existingIndustryNews.stream()
                .map(IndustryNews::getId)
                .collect(Collectors.toSet());

        // 기존 데이터에 없는 새로운 뉴스만 필터링
        List<IndustryNews> newIndustryNews = industryNewsList.stream()
                .filter(dto -> !existingIds.contains(dto.getId()))  // 중복 체크
                .map(IndustryNews::of)  // 새로운 데이터 변환
                .toList();

        industryNewsRepository.saveAll(newIndustryNews);
    }
}
