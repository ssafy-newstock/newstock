package com.ssafy.newsdata.domain.controller.advice;


import com.ssafy.newsdata.global.common.CommonResponse;
import com.ssafy.newsdata.global.exception.NewsNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.format.DateTimeParseException;

@RestControllerAdvice
@Slf4j
public class NewsControllerAdvice {
    @ExceptionHandler(NewsNotFoundException.class)
    public ResponseEntity<?> handleNotFound(NewsNotFoundException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(CommonResponse.failure(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<?> handleParseDateException(DateTimeParseException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(CommonResponse.failure("날짜 형식에 맞게 입력해주세요"), HttpStatus.BAD_REQUEST);
    }

}
