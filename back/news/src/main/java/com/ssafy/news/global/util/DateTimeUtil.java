package com.ssafy.news.global.util;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // 날짜 문자열을 UTC 타임스탬프로 변환하는 메서드
    public static long convertToUtcTimestamp(String datetimeStr) {
        LocalDateTime dateTime = LocalDateTime.parse(datetimeStr, formatter);
        return dateTime.toEpochSecond(ZoneOffset.UTC);
    }
}
