package com.ssafy.newsdata.global.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StringParsingUtils {
    /**
     * 주어진 문자열을 쉼표 기준으로 분리하고, 각 항목을 트리밍하여 리스트로 반환합니다.
     *
     * @param input 쉼표로 구분된 문자열
     * @return 쉼표로 구분된 문자열을 리스트로 변환
     */
    public static List<String> toList(String input) {
        if (input == null || input.isEmpty()) {
            return new ArrayList<>();
        }

        // 문자열을 쉼표 기준으로 나누고, 각 항목을 트리밍하여 리스트로 변환
        return Arrays.asList(input.split("\\s*,\\s*"));
    }
}
