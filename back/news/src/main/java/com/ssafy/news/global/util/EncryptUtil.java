package com.ssafy.news.global.util;

import org.apache.commons.codec.binary.Base64;

public class EncryptUtil {
    // Base64 디코딩
    public static String decodeBase64(String encodedValue) {
        byte[] decodedBytes = Base64.decodeBase64(encodedValue);
        return new String(decodedBytes);
    }
}
