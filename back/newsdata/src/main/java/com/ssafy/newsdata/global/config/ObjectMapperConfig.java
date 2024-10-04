package com.ssafy.newsdata.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ObjectMapperConfig {

    public static ObjectMapper createObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        // 날짜 형식을 정의하는 포맷터
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // LocalDateTime을 위한 커스텀 Deserializer
        JavaTimeModule module = new JavaTimeModule();
        module.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(formatter));

        // 모듈을 ObjectMapper에 등록
        objectMapper.registerModule(module);

        return objectMapper;
    }
}
