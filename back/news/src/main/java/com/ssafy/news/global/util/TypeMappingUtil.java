package com.ssafy.news.global.util;

import java.util.HashMap;
import java.util.Map;

public class TypeMappingUtil {

    private static final Map<String, String> typeMapping = new HashMap<>();

    static {
        typeMapping.put("finance", "T00001");
        typeMapping.put("industry", "T00002");
        typeMapping.put("employ", "T00003");
        typeMapping.put("autos", "T00004");
        typeMapping.put("stock", "T00005");
        typeMapping.put("estate", "T00006");
        typeMapping.put("consumer", "T00007");
        typeMapping.put("worldeconomy", "T00008");
        typeMapping.put("coin", "T00009");
        typeMapping.put("pension", "T00010");
        typeMapping.put("policy", "T00011");
        typeMapping.put("startup", "T00012");
    }

    // 뉴스 타입을 매핑하는 메서드
    public static String getMappedType(String newsType) {
        return typeMapping.getOrDefault(newsType, "UnknownType");
    }
}
