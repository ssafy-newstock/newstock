package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.StockNews;
import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.repository.StockNewsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ssafy.news.domain.service.converter.NewsConverter.convertStockToDtoList;
import static com.ssafy.news.domain.service.validator.NewsValidator.validateNewsContent;

@RequiredArgsConstructor
@Service
@Slf4j
public class StockNewsService {
    private final StockNewsRepository stockNewsRepository;

    public List<StockNewsDto> getRecentStockNewsTop4() {
        List<StockNews> top4 = stockNewsRepository.findTop4(PageRequest.of(0, 4));

        validateNewsContent(top4);
        return convertStockToDtoList(top4);
    }
//
//    public List<IndustryNewsDto> getIndustryNews(String industry, int page, int size) {
////        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("uploadDatetime").descending());
////
////        List<IndustryNews> content = null;
////        if (industry == null || industry.isEmpty()) {
////            content = industryNewsRepository.findAllIndustryPage(pageRequest).getContent();
////        } else {
////            content = industryNewsRepository.findAllByIndustry(industry, pageRequest).getContent();
////        }
////
////        validateNewsContent(content);  // 뉴스가 없을 때 예외 처리
////        return convertToDtoList(content);  // DTO 변환
//    }
}
