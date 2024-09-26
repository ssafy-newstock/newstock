package com.ssafy.news.domain.controller.advice;

import com.ssafy.news.global.common.CommonResponse;
import com.ssafy.news.global.exception.NewsNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class NewsControllerAdvice {
    @ExceptionHandler(NewsNotFoundException.class)
    public ResponseEntity<?> handleNotFound(NewsNotFoundException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(CommonResponse.failure(e.getMessage()), HttpStatus.NOT_FOUND);
    }
}
