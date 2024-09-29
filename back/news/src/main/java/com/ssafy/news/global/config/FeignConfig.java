package com.ssafy.news.global.config;

import feign.Logger;
import feign.codec.ErrorDecoder;
import org.springframework.context.annotation.Bean;

public class FeignConfig {
    @Bean
    public ErrorDecoder errorDecoder() {
        return new FeignErrorDecoder();
    }

    @Bean
    public Logger.Level feignLoggerLevel() {
        // Feign 로그 레벨 설정 (FULL, BASIC, HEADERS, NONE)
        return Logger.Level.FULL;
    }
}
