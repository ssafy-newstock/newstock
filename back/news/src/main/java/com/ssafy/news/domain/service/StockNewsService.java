package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.stock.StockKeyword;
import com.ssafy.news.domain.entity.stock.StockNews;
import com.ssafy.news.domain.entity.stock.StockNewsStockCode;
import com.ssafy.news.domain.repository.StockNewsRepository;
import com.ssafy.news.domain.service.converter.NewsConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ssafy.news.domain.service.converter.NewsConverter.*;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsContent;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsListContent;

@RequiredArgsConstructor
@Service
@Slf4j
public class StockNewsService {
    private final StockNewsRepository stockNewsRepository;

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
    public StockNewsDto getStockNewsDetail(Long id) {
        Optional<StockNews> findNews = stockNewsRepository.findById(id);
        validateNewsContent(findNews);

        StockNews stockNews = findNews.get();
        List<String> keywords = convertKeywordToDto(stockNews.getStockKeywords());
        List<String> stockCodes = convertStockCodeToDto(stockNews.getStockNewsStockCodes());

        return StockNewsDto.of(stockNews, stockCodes, keywords);
    }

    public List<StockNewsDto> getStockNewsInIds(final List<Long> scrapInStockNewsIds) {
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
}
