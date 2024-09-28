package com.ssafy.news.global.util;

import java.math.BigInteger;
/**
 * HBase를 위한 Util 클래스
 */
@Deprecated
public class SaltUtil {

    public static String getSalt(String newsIdHash) {
        // BigInteger를 사용하여 16진수 문자열을 변환
        BigInteger bigInt = new BigInteger(newsIdHash, 16);

        // 10으로 나눈 나머지
        int mod = bigInt.mod(BigInteger.TEN).intValue();

        // 두 자리 숫자로 표현
        return String.format("%02d", mod);
    }
}
