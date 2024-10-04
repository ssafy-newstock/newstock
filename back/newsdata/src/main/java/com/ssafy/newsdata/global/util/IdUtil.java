package com.ssafy.newsdata.global.util;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class IdUtil  {
    // LocalDate로 입력된 경우 시간은 0000으로 고정
    public static String generateIdFromDate(LocalDate date) {
        // 1. 날짜를 포맷하여 YYYYMMDD 형식으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String datePart = date.format(formatter);

        // 2. 고정된 시간 "0000"과 랜덤한 5자리 숫자 생성
        String timePart = "0000";
        // 3. 세 부분을 결합하여 ID 생성
        return datePart + timePart + "00000";
    }
}