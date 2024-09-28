package com.ssafy.news.domain.service.converter;

import com.ssafy.news.domain.entity.IndustryNews;
import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
public class NewsConverter {
    // 시황 뉴스 목록을 DTO로 변환하는 메서드 분리
    public static List<IndustryNewsDto> convertIndustryToDtoList(List<IndustryNews> content) {
        return content.stream()
                .map(IndustryNewsDto::of)
                .toList();
    }
}
