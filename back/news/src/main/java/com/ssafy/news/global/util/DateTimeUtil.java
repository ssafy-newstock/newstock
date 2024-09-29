package com.ssafy.news.global.util;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/**
 * HBase를 위한 Util 클래스
 */
@Deprecated
public class DateTimeUtil {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // 날짜 문자열을 UTC 타임스탬프로 변환하는 메서드
    public static long convertToUtcTimestamp(String datetimeStr) {
        LocalDateTime dateTime = LocalDateTime.parse(datetimeStr, formatter);
        return dateTime.toEpochSecond(ZoneOffset.UTC);
    }

    // 문자열을 받아 LocalDateTime으로 변환하는 유틸리티 메서드
    public static LocalDateTime convertStringToLocalDateTime(String dateTimeStr) {
        // 문자열을 파싱할 때 사용할 패턴 지정 (데이터 형식에 맞게 수정)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        try {
            // 문자열을 LocalDateTime으로 변환
            return LocalDateTime.parse(dateTimeStr, formatter);
        } catch (DateTimeParseException e) {
            // 변환 실패 시 처리
            System.err.println("날짜 문자열을 LocalDateTime으로 변환하는 데 실패했습니다: " + e.getMessage());
            return null;
        }
    }
}
