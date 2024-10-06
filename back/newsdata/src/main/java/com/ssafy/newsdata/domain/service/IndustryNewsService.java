package com.ssafy.newsdata.domain.service;


import com.ssafy.newsdata.domain.entity.dto.IndustryNewsDto;
import com.ssafy.newsdata.domain.entity.industry.IndustryNewsRedis;
import com.ssafy.newsdata.domain.repository.IndustryNewsRedisRepository;
import com.ssafy.newsdata.domain.repository.IndustryNewsRepository;
import com.ssafy.newsdata.global.util.IdUtil;
import com.ssafy.newsdata.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ssafy.newsdata.domain.service.validator.NewsValidator.validateNewsListContent;

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
    public List<IndustryNewsDto> getRecentIndustryNewsTop4() throws SQLException, ClassNotFoundException {
        List<IndustryNewsDto> content = industryNewsRepository.findAllIndustryNews(IdUtil.generateIdFromDate(LocalDate.now()), 4);
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
    public List<IndustryNewsDto> getIndustryNewsPreviews(String industry, String lastSeenId, int size) throws SQLException, ClassNotFoundException {
        if (lastSeenId.isEmpty()) {
            // 현재 시간을 기준으로 두달 전 기사까지
            LocalDate now = LocalDate.now();
            lastSeenId = IdUtil.generateIdFromDate(now.minusMonths(2));
        }
        // 만약 industry 가 있다면, 특정 산업에 맞는 뉴스 반환
        // 없다면 최신순으로 전체 뉴스 반환
        List<IndustryNewsDto> content = null;
        if (industry == null || industry.isEmpty()) {
            // 현재 시간을 기준으로 두달 전 기사까지
            content = industryNewsRepository.findAllIndustryNews(lastSeenId, size);
        } else {
            content = industryNewsRepository.findIndustryNewsPreviewWithIndustry(industry, lastSeenId, size);
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
    public IndustryNewsDto getIndustryNews(Long id) throws SQLException, ClassNotFoundException {
        IndustryNewsDto findNews = industryNewsRepository.findById(id);

        return findNews;
    }

    public List<IndustryNewsDto> getIndustryNewsInIds(List<String> industryIds) throws SQLException, ClassNotFoundException {
        List<IndustryNewsDto> findAllNews = industryNewsRepository.findAllByIdIn(industryIds);
        return findAllNews;
    }

    /**
     * 시황 뉴스 조회 확인 메소드
     *
     * @param newsId
     * @param token
     */
    @Transactional
    public void checkReadIndustryNews(Long newsId, String token) {
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
}
