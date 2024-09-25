package com.ssafy.auth.global.config;

import feign.Response;
import feign.codec.ErrorDecoder;

public class FeignErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {
        // 상태 코드와 무관하게 Feign이 응답을 처리하도록 설정
        if (response.status() >= 400 && response.status() <= 499) {
            return new RuntimeException("Client error: " + response.status());
        } else if (response.status() >= 500) {
            return new RuntimeException("Server error: " + response.status());
        } else {
            return new Exception("Generic error: " + response.status());
        }
    }
}

