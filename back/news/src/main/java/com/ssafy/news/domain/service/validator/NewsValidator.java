package com.ssafy.news.domain.service.validator;


import com.ssafy.news.global.exception.NewsNotFoundException;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
public class NewsValidator {
    // 뉴스가 조회되지 않았을 때 처리하는 메서드
    public static void validateNewsContent(List<?> content) {
        if (content.isEmpty()) {
            log.error("뉴스가 조회되지 않았습니다.");
            throw new NewsNotFoundException();
        }
    }
}
