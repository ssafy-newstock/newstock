package com.ssafy.auth.global.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleBusinessException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.internalServerError()
                .body(e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.badRequest()
                .body(e.getMessage());
    }
}