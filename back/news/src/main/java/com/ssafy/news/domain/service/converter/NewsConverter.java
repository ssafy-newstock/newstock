package com.ssafy.news.domain.service.converter;

import com.ssafy.news.domain.entity.industry.IndustryNews;
import com.ssafy.news.domain.entity.stock.StockKeyword;
import com.ssafy.news.domain.entity.stock.StockNews;
import com.ssafy.news.domain.entity.stock.StockNewsStockCode;
import com.ssafy.news.domain.entity.dto.*;
import com.ssafy.news.domain.service.client.response.StockCodeToNameResponse;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Slf4j
public class NewsConverter {
    // 시황 뉴스 목록을 DTO로 변환하는 메서드 분리
    public static List<IndustryNewsDto> convertIndustryToDtoList(List<IndustryNews> content) {
        return content.stream()
                .map(IndustryNewsDto::of)
                .toList();
    }

    // 종목 뉴스 목록을 DTO로 변환하는 메서드 분리
    public static List<StockNewsDto> convertStockToDtoList(List<StockNews> content) {
        return content.stream().map(stockNews -> {
            List<String> stockKeywords = convertKeywordToDto(stockNews.getStockKeywords());
            List<String> stockNewsStockCodeDtos = convertStockCodeToDto(stockNews.getStockNewsStockCodes());

            return StockNewsDto.of(stockNews, stockNewsStockCodeDtos, stockKeywords);
        }).collect(toList());
    }

    // 종목 뉴스 목록을 프리뷰 DTO로 변환
    public static StockNewsPreviewDto convertStockToPreviewDto(StockNews content, List<StockCodeToNameResponse> stockNewsStockCodeDtos) {
        List<String> stockKeywords = convertKeywordToDto(content.getStockKeywords());
        return StockNewsPreviewDto.of(content, stockNewsStockCodeDtos, stockKeywords);
    }

    // 종목 뉴스를 DTO 로 변환하는 메소드
    public static StockNewsDto convertStockToDto(StockNews content) {
        List<String> stockKeywords = convertKeywordToDto(content.getStockKeywords());
        List<String> stockNewsStockCodeDtos = convertStockCodeToDto(content.getStockNewsStockCodes());

        return StockNewsDto.of(content, stockNewsStockCodeDtos, stockKeywords);
    }

    public static List<String> convertKeywordToDto(List<StockKeyword> content) {
        return content.stream()
                .map(StockKeyword::getKeyword)
                .collect(Collectors.toList());
    }

    public static List<String> convertStockCodeToDto(List<StockNewsStockCode> content) {
        return content.stream()
                .map(StockNewsStockCode::getStockCode)
                .collect(Collectors.toList());
    }
}
