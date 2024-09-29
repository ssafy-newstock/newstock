package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.StockNews;
import com.ssafy.news.domain.entity.StockNewsStockCode;
import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.dto.StockNewsPreviewDto;
import com.ssafy.news.domain.repository.StockNewsRepository;
import com.ssafy.news.domain.service.client.StockClient;
import com.ssafy.news.domain.service.client.response.StockCodeToNameResponse;
import com.ssafy.news.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.news.domain.service.converter.NewsConverter.*;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsContent;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsListContent;

@RequiredArgsConstructor
@Service
@Slf4j
public class StockNewsService {
    private final StockNewsRepository stockNewsRepository;
    private final StockClient stockClient;

    /**
     * 최근 4개의 주식 뉴스를 조회하는 메소드
     * 특정 주식이 아닌 전체 뉴스 중 4개를 조회함
     * @return
     */
    public List<StockNewsPreviewDto> getRecentStockNewsTop4() {
        List<StockNews> top4 = stockNewsRepository.findAllStockNews(PageRequest.of(0, 4)).getContent();

        validateNewsListContent(top4);

        List<StockNewsPreviewDto> result = top4.stream()
                .map(stockNews -> {
                    List<String> stringCodes = convertStockCodeToDto(stockNews.getStockNewsStockCodes());
                    List<StockCodeToNameResponse> response = (List<StockCodeToNameResponse>) stockClient.getStockName(stringCodes).getData();

                    return convertStockToPreviewDto(stockNews, response);

                })
                .collect(Collectors.toList());
        return result;
    }

    /**
     * 주식 코드를 기준으로 최근 뉴스 preview 객체 리스트를 반환해주는 메소드
     * 만약 주식 코드가 없다면 전체 주식 코드를 기준으로 반환
     * @param stockCode
     * @param page
     * @param size
     * @return
     */
    public List<StockNewsPreviewDto> getStockNewsPreviews(String stockCode, int page, int size) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size, Sort.by("uploadDatetime").descending());

        List<StockNews> content = null;
        if (stockCode == null || stockCode.isEmpty()) {
            content = stockNewsRepository.findAllStockNews(pageRequest).getContent();
        } else {
            content = stockNewsRepository.findAllByStockCode(stockCode, pageRequest).getContent();
        }

        validateNewsListContent(content);  // 뉴스가 없을 때 예외 처리


        List<StockNewsPreviewDto> result = content.stream()
                .map(stockNews -> {
                    List<StockNewsStockCode> stockNewsStockCodes = stockNews.getStockNewsStockCodes();
                    List<String> stringCodes = convertStockCodeToDto(stockNewsStockCodes);

                    CommonResponse<?> response = stockClient.getStockName(stringCodes);
                    Object data = response.getData();
                    List<StockCodeToNameResponse> stockCodeToNameResponses = (List<StockCodeToNameResponse>) data;

                    return convertStockToPreviewDto(stockNews, stockCodeToNameResponses);

                })
                .collect(Collectors.toList());
        return result;  // DTO 변환
    }

    /**
     * ID를 기준으로 종목 뉴스 상세 정보를 조회하는 메소드
     * @param id
     * @return
     */
    public StockNewsDto getStockNewsDetail(Long id) {
        Optional<StockNews> findNews = stockNewsRepository.findById(id);
        validateNewsContent(findNews);

        return convertStockToDto(findNews.get());
    }
}
