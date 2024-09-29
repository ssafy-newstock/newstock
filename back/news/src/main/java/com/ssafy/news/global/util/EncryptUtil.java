package com.ssafy.news.global.util;

import org.apache.commons.codec.binary.Base64;
/**
 * HBase를 위한 Util 클래스
 */
@Deprecated
public class EncryptUtil {
    // Base64 디코딩
    public static String decodeBase64(String encodedValue) {
        byte[] decodedBytes = Base64.decodeBase64(encodedValue);
        return new String(decodedBytes);
    }
}
