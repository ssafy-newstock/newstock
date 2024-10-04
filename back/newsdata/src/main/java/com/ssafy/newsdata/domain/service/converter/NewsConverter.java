package com.ssafy.newsdata.domain.service.converter;

import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.List;

@Slf4j
public class NewsConverter {
    public static List<String> convertStringToList(String content) {
        return Arrays.asList(content.split(",\\s*"));
    }
}
