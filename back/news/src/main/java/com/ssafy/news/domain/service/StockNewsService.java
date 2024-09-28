package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.StockNews;
import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.dto.StockNewsPreviewDto;
import com.ssafy.news.domain.repository.StockNewsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.ssafy.news.domain.service.converter.NewsConverter.*;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsContent;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsListContent;

@RequiredArgsConstructor
@Service
@Slf4j
public class StockNewsService {
    private final StockNewsRepository stockNewsRepository;

    public List<StockNewsPreviewDto> getRecentStockNewsTop4() {
        List<StockNews> top4 = stockNewsRepository.findAllStockNews(PageRequest.of(0, 4)).getContent();

        validateNewsListContent(top4);
        return convertStockToPreviewDtoList(top4);
    }

    public List<StockNewsPreviewDto> getStockNewsPreviews(String stockCode, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size, Sort.by("uploadDatetime").descending());

        List<StockNews> content = null;
        if (stockCode == null || stockCode.isEmpty()) {
            content = stockNewsRepository.findAllStockNews(pageRequest).getContent();
        } else {
            content = stockNewsRepository.findAllByStockCode(stockCode, pageRequest).getContent();
        }

        validateNewsListContent(content);  // 뉴스가 없을 때 예외 처리
        return convertStockToPreviewDtoList(content);  // DTO 변환
    }

    public StockNewsDto getStockNewsDetail(Long id) {
        Optional<StockNews> findNews = stockNewsRepository.findById(id);
        validateNewsContent(findNews);

        return convertStockToDto(findNews.get());
    }
}
