package com.ssafy.newsscrap.domain.controller.advice;

import com.ssafy.newsscrap.global.common.CommonResponse;
import com.ssafy.newsscrap.global.exception.ScrapContentNotEmptyException;
import com.ssafy.newsscrap.global.exception.ScrapNotFoundException;
import com.ssafy.newsscrap.global.exception.ScrapPermissionException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class NewsScrapControllerAdvice {

    @ExceptionHandler(ScrapNotFoundException.class)
    public ResponseEntity<?> handleNotFoundScrap(ScrapNotFoundException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(CommonResponse.failure(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ScrapPermissionException.class)
    public ResponseEntity<?> handleNoPermissionScrap(ScrapPermissionException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(CommonResponse.failure(e.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ScrapContentNotEmptyException.class)
    public ResponseEntity<?> handleScrapEmptyException(ScrapContentNotEmptyException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(CommonResponse.failure(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

}
