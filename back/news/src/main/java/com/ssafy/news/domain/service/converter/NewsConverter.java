package com.ssafy.news.domain.service.converter;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.industry.IndustryNews;
import com.ssafy.news.domain.entity.stock.StockKeyword;
import com.ssafy.news.domain.entity.stock.StockNews;
import com.ssafy.news.domain.entity.stock.StockNewsStockCode;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
public class NewsConverter {
    // 시황 뉴스 목록을 DTO로 변환하는 메서드 분리
    public static List<IndustryNewsDto> convertIndustryToDtoList(List<IndustryNews> content) {
        return content.stream()
                .map(IndustryNewsDto::of)
                .toList();
    }


    // 종목 뉴스 목록을 프리뷰 DTO로 변환
    public static StockNewsDto convertStockToPreviewDto(StockNews content, List<String> stockCodes) {
        List<String> stockKeywords = convertKeywordToDto(content.getStockKeywords());
        return StockNewsDto.of(content, stockCodes, stockKeywords);
    }


    public static List<String> convertKeywordToDto(Set<StockKeyword> content) {
        return content.stream()
                .map(StockKeyword::getKeyword)
                .collect(Collectors.toList());
    }

    public static List<String> convertStockCodeToDto(Set<StockNewsStockCode> content) {
        return content.stream()
                .map(StockNewsStockCode::getStockCode)
                .collect(Collectors.toList());
    }
}
