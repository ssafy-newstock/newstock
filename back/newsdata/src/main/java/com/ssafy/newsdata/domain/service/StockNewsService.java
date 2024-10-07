package com.ssafy.newsdata.domain.service;


import com.ssafy.newsdata.domain.controller.response.StockNewsResponse;
import com.ssafy.newsdata.domain.entity.dto.StockNewsDto;
import com.ssafy.newsdata.domain.entity.stock.StockNewsRedis;
import com.ssafy.newsdata.domain.repository.StockNewsRedisRepository;
import com.ssafy.newsdata.domain.repository.StockNewsRepository;
import com.ssafy.newsdata.global.util.IdUtil;
import com.ssafy.newsdata.global.util.StringParsingUtils;
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
public class StockNewsService {
    private final StockNewsRepository stockNewsRepository;
    private final TokenProvider tokenProvider;
    private final StockNewsRedisRepository stockNewsRedisRepository;
    private final NewsSchedulerService newsSchedulerService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    /**
     * 최근 4개의 주식 뉴스를 조회하는 메소드
     * 특정 주식이 아닌 전체 뉴스 중 4개를 조회함
     *
     * @return
     */
    public List<StockNewsDto> getRecentStockNewsTop4() throws Exception {
        List<StockNewsDto> top4 = stockNewsRepository.findAllStockNews(IdUtil.generateIdFromDate(LocalDate.now()), 4);

        validateNewsListContent(top4);

        return top4;
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
    public List<StockNewsDto> getAllStockNews(String stockCode, String lastSeenId, int size) throws SQLException, ClassNotFoundException {
        List<StockNewsDto> content = null;
        if (stockCode == null || stockCode.isEmpty()) {
            content = stockNewsRepository.findAllStockNews(lastSeenId, size);
        } else {
            // 현재 시간을 기준으로 두달 전 기사까지
            LocalDate now = LocalDate.now();
            String startDate = IdUtil.generateIdFromDate(now.minusMonths(2));
            String endDate = IdUtil.generateIdFromDate(LocalDate.now());

            content = stockNewsRepository.findAllByStockCode(stockCode, lastSeenId, size, startDate, endDate);
        }

        validateNewsListContent(content);  // 뉴스가 없을 때 예외 처리


        return content;  // DTO 변환
    }

    /**
     * ID를 기준으로 종목 뉴스 상세 정보를 조회하는 메소드
     *
     * @param id
     * @return
     */
    public StockNewsDto getStockNewsDetail(Long id) throws Exception {
        StockNewsDto findNews = stockNewsRepository.findById(id);

        return findNews;
    }

//    public List<StockNewsDto> getStockNewsInIds(final List<Long> scrapInStockNewsIds) {
//        List<StockNews> industryNewsByIdIn = stockNewsRepository.findAllByIdIn(scrapInStockNewsIds);
//
//        return industryNewsByIdIn.stream()
//                .map(stockNews -> {
//                    Set<StockNewsStockCode> entityStockCodes = stockNews.getStockNewsStockCodes();
//                    Set<StockKeyword> entityKeywords = stockNews.getStockKeywords();
//
//                    List<String> stockCodes = NewsConverter.convertStockCodeToList(entityStockCodes);
//                    List<String> keywords = NewsConverter.convertKeywordToList(entityKeywords);
//
//                    return StockNewsDto.of(stockNews, stockCodes, keywords);
//                })
//                .collect(Collectors.toList());
//    }

    /**
     * 종목 뉴스 조회 확인 메소드
     *
     * @param newsId
     * @param token
     */
    @Transactional
    public void checkReadStockNews(Long newsId, String token) {
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

    public List<StockNewsResponse> convertResponseBulk(List<StockNewsDto> newsDtos) {
        List<StockNewsResponse> responses = newsDtos.stream()
                .map(stockNewsDto -> {
                    List<String> stockCodes = StringParsingUtils.toList(stockNewsDto.getStockCodes());
                    List<String> keywords = StringParsingUtils.toList(stockNewsDto.getKeywords());
                    return StockNewsResponse.of(stockNewsDto, stockCodes, keywords);
                })
                .toList();
        return responses;
    }

    public StockNewsResponse convertResponse(StockNewsDto stockNewsDto) {
        List<String> stockCodes = StringParsingUtils.toList(stockNewsDto.getStockCodes());
        List<String> keywords = StringParsingUtils.toList(stockNewsDto.getKeywords());
        return StockNewsResponse.of(stockNewsDto, stockCodes, keywords);
    }

    public List<StockNewsResponse> getStockNewsInIds(final List<String> ids) throws SQLException, ClassNotFoundException {
        List<StockNewsDto> allNews = stockNewsRepository.findAllByIdIn(ids);
        return allNews.stream()
                .map(stockNewsDto -> {
                    List<String> stockCodes = StringParsingUtils.toList(stockNewsDto.getStockCodes());
                    List<String> keywords = StringParsingUtils.toList(stockNewsDto.getKeywords());
                    return StockNewsResponse.of(stockNewsDto, stockCodes, keywords);
                })
                .toList();
    }

    public List<StockNewsResponse> getRecentStockNews() throws SQLException, ClassNotFoundException {
        List<StockNewsDto> content = stockNewsRepository.findAllStockNews(IdUtil.generateIdFromDate(LocalDate.now()), 5000);
        validateNewsListContent(content);

        return content.stream()
                .map(stockNewsDto -> {
                    List<String> stockCodes = StringParsingUtils.toList(stockNewsDto.getStockCodes());
                    List<String> keywords = StringParsingUtils.toList(stockNewsDto.getKeywords());
                    return StockNewsResponse.of(stockNewsDto, stockCodes, keywords);
                })
                .toList();
    }
}
