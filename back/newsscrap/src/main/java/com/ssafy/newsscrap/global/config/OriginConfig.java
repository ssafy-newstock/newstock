package com.ssafy.newsscrap.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Configuration
public class OriginConfig implements WebMvcConfigurer {

    private static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,DELETE,TRACE,OPTIONS,PATCH,PUT";

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://newstock.info",
                        "https://newstock.info:8000",
                        "https://newstock.info:8001",
                        "https://newstock.info:8002",
                        "https://newstock.info:8003",
                        "http://localhost:8000",
                        "http://localhost:8001",
                        "http://localhost:8002",
                        "http://localhost:8003",
                        "http://localhost:5173",
                        "http://localhost:3000")
                .allowedMethods(ALLOWED_METHOD_NAMES.split(","))
                .allowedHeaders("*")
                .allowCredentials(true)
                .exposedHeaders(AUTHORIZATION);
    }
}
