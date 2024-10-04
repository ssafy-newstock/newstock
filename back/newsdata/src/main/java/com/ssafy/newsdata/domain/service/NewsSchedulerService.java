package com.ssafy.newsdata.domain.service;


import com.ssafy.newsdata.domain.repository.IndustryNewsRedisRepository;
import com.ssafy.newsdata.domain.repository.StockNewsRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class NewsSchedulerService {

    private final IndustryNewsRedisRepository industryNewsRedisRepository;
    private final StockNewsRedisRepository stockNewsRedisRepository;

    public void deleteIndustryNewsRedis() {
        industryNewsRedisRepository.deleteAll();
    }

    public void deleteStockNewsRedis() {
        stockNewsRedisRepository.deleteAll();
    }
}
