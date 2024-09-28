package com.ssafy.news.domain.service.converter;

import com.ssafy.news.domain.entity.IndustryNews;
import com.ssafy.news.domain.entity.StockKeyword;
import com.ssafy.news.domain.entity.StockNews;
import com.ssafy.news.domain.entity.StockNewsStockCode;
import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.dto.StockKeywordDto;
import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.dto.StockNewsStockCodeDto;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

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
            List<StockKeywordDto> stockKeywordDtos = convertKeywordToDto(stockNews.getStockKeywords());
            List<StockNewsStockCodeDto> stockNewsStockCodeDtos = convertStockCodeToDto(stockNews.getStockNewsStockCodes());

            return StockNewsDto.of(stockNews, stockNewsStockCodeDtos, stockKeywordDtos);
        }).collect(Collectors.toList());
    }

    private static List<StockKeywordDto> convertKeywordToDto(List<StockKeyword> content) {
        return content.stream()
                .map(StockKeywordDto::of)
                .toList();
    }

    private static List<StockNewsStockCodeDto> convertStockCodeToDto(List<StockNewsStockCode> content) {
        return content.stream()
                .map(StockNewsStockCodeDto::of)
                .toList();
    }
}
