package com.ssafy.news.domain.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.service.client.NewsDataClient;
import com.ssafy.news.domain.service.client.response.StockNewsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsHBaseService {
    private final NewsDataClient newsDataClient;
    private final IndustryNewsService industryNewsService;
    private final StockNewsService stockNewsService;
    private final ObjectMapper objectMapper;

//    @PostConstruct
//    public void init() throws SQLException, ClassNotFoundException {
//        getRecentIndustryNews();
//        getRecentStockNews();
//
//    }

    @Scheduled(cron = "0 0 0 1 * *")
    public void getRecentIndustryNews() throws SQLException, ClassNotFoundException {
        Object data = newsDataClient.getRecentIndustryNews().getData();

        if (data instanceof List<?>) {
            List<IndustryNewsDto> industryNewsList = objectMapper.convertValue(
                    data, new TypeReference<List<IndustryNewsDto>>() {
                    });
            industryNewsService.insertIndustryNews(industryNewsList);

        } else {
            // 처리할 수 없는 타입의 경우 예외 처리
            throw new IllegalArgumentException("Unexpected data type");
        }
    }

    @Scheduled(cron = "0 0 0 1 * *")
    public void getRecentStockNews() throws SQLException, ClassNotFoundException {
        Object data = newsDataClient.getRecentStockNews().getData();

        if (data instanceof List<?>) {
            List<StockNewsResponse> stockNewsResponseList = objectMapper.convertValue(
                    data, new TypeReference<List<StockNewsResponse>>() {
                    });
            stockNewsService.insertStockNews(stockNewsResponseList);

        } else {
            // 처리할 수 없는 타입의 경우 예외 처리
            throw new IllegalArgumentException("Unexpected data type");
        }
    }
}
