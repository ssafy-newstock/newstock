package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.stock.StockKeyword;
import com.ssafy.news.domain.entity.stock.StockNews;
import com.ssafy.news.domain.entity.stock.StockNewsRedis;
import com.ssafy.news.domain.entity.stock.StockNewsStockCode;
import com.ssafy.news.domain.repository.StockKeywordRepository;
import com.ssafy.news.domain.repository.StockNewsCodeRepository;
import com.ssafy.news.domain.repository.StockNewsRedisRepository;
import com.ssafy.news.domain.repository.StockNewsRepository;
import com.ssafy.news.domain.service.client.response.StockNewsResponse;
import com.ssafy.news.domain.service.converter.NewsConverter;
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

import static com.ssafy.news.domain.service.converter.NewsConverter.*;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsContent;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsListContent;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class StockNewsService {
    private final StockNewsRepository stockNewsRepository;
    private final TokenProvider tokenProvider;
    private final StockNewsRedisRepository stockNewsRedisRepository;
    private final NewsSchedulerService newsSchedulerService;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final StockNewsCodeRepository stockNewsCodeRepository;
    private final StockKeywordRepository stockKeywordRepository;
    /**
     * 최근 4개의 주식 뉴스를 조회하는 메소드
     * 특정 주식이 아닌 전체 뉴스 중 4개를 조회함
     *
     * @return
     */
    public List<StockNewsDto> getRecentStockNewsTop4() {
        List<StockNews> top4 = stockNewsRepository.findAllStockNews(PageRequest.of(0, 4)).getContent();

        validateNewsListContent(top4);

        List<StockNewsDto> result = top4.stream()
                .map(stockNews -> {
                    List<String> stringCodes = convertStockCodeToDto(stockNews.getStockNewsStockCodes());
                    return convertStockToPreviewDto(stockNews, stringCodes);

                })
                .collect(Collectors.toList());
        return result;
    }

    /**
     * 주식 코드를 기준으로 최근 뉴스 preview 객체 리스트를 반환해주는 메소드
     * 만약 주식 코드가 없다면 전체 주식 코드를 기준으로 반환
     *
     * @param stockCode
     * @param page
     * @param size
     * @return
     */
    public List<StockNewsDto> getStockNewsPreviews(String stockCode, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size, Sort.by("uploadDatetime").descending());

        List<StockNews> content = null;
        if (stockCode == null || stockCode.isEmpty()) {
            content = stockNewsRepository.findAllStockNews(pageRequest).getContent();
        } else {
            content = stockNewsRepository.findAllByStockCode(stockCode, pageRequest).getContent();
        }

        validateNewsListContent(content);  // 뉴스가 없을 때 예외 처리


        List<StockNewsDto> result = content.stream()
                .map(stockNews -> {
                    Set<StockNewsStockCode> stockNewsStockCodes = stockNews.getStockNewsStockCodes();
                    List<String> stockCodes = convertStockCodeToDto(stockNewsStockCodes);

                    return convertStockToPreviewDto(stockNews, stockCodes);

                })
                .collect(Collectors.toList());
        return result;  // DTO 변환
    }

    /**
     * ID를 기준으로 종목 뉴스 상세 정보를 조회하는 메소드
     *
     * @param id
     * @return
     */
    public StockNewsDto getStockNewsDetail(String id) {
        Optional<StockNews> findNews = stockNewsRepository.findById(id);
        validateNewsContent(findNews);

        StockNews stockNews = findNews.get();
        List<String> keywords = convertKeywordToDto(stockNews.getStockKeywords());
        List<String> stockCodes = convertStockCodeToDto(stockNews.getStockNewsStockCodes());

        return StockNewsDto.of(stockNews, stockCodes, keywords);
    }

    public List<StockNewsDto> getStockNewsInIds(final List<String> scrapInStockNewsIds) {
        List<StockNews> industryNewsByIdIn = stockNewsRepository.findAllByIdIn(scrapInStockNewsIds);

        return industryNewsByIdIn.stream()
                .map(stockNews -> {
                    Set<StockNewsStockCode> entityStockCodes = stockNews.getStockNewsStockCodes();
                    Set<StockKeyword> entityKeywords = stockNews.getStockKeywords();

                    List<String> stockCodes = NewsConverter.convertStockCodeToDto(entityStockCodes);
                    List<String> keywords = NewsConverter.convertKeywordToDto(entityKeywords);

                    return StockNewsDto.of(stockNews, stockCodes, keywords);
                })
                .collect(Collectors.toList());
    }

    /**
     * 종목 뉴스 조회 확인 메소드
     *
     * @param newsId
     * @param token
     */
    @Transactional
    public void checkReadStockNews(String newsId, String token) {
        if (token != null && !token.isEmpty()) {
            Long memberId = tokenProvider.getMemberId(token);

            stockNewsRedisRepository.findById(newsId + "|" + memberId)
                    .ifPresentOrElse(
                            stockNewsRedis -> {
                            },
                            () -> {
                                stockNewsRedisRepository.save(new StockNewsRedis(newsId, memberId));

                                // Member 서버에 회원 포인트 증가 이벤트 요청
                                Map<String, Object> message = new HashMap<>();
                                message.put("memberId", memberId);
                                message.put("stockNewsId", newsId);

                                kafkaTemplate.send("read-stock-news", message);
                            });
        }
    }

    /**
     * 종목 뉴스 조회 기록 삭제 스케줄러
     * 매일 자정
     */
    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void deleteReadStockNews() {
        newsSchedulerService.deleteStockNewsRedis();
    }

    @Transactional
    public void insertStockNews(List<StockNewsResponse> stockNewsDtoList) {
        List<StockNews> list = stockNewsDtoList.stream()
                .map(stockNewsDto -> {
                    StockNews entity = StockNews.of(stockNewsDto);

                    stockNewsRepository.save(entity);

                    List<String> stringStockKeywords = stockNewsDto.getStockKeywords();
                    List<String> stringStockCodes = stockNewsDto.getStockNewsStockCodes();

                    Set<StockNewsStockCode> stockCodes = stringStockCodes.stream()
                            .map(s -> StockNewsStockCode.of(entity, s))
                            .collect(Collectors.toSet());
                    Set<StockKeyword> stockKeywords = stringStockKeywords.stream()
                            .map(s -> StockKeyword.of(entity, s))
                            .collect(Collectors.toSet());

                    stockNewsCodeRepository.saveAll(stockCodes);
                    stockKeywordRepository.saveAll(stockKeywords);

                    entity.injectEntity(stockCodes, stockKeywords);
                    return entity;
                })
                .toList();

        stockNewsRepository.saveAll(list);
    }
}
