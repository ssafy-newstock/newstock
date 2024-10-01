package com.ssafy.favorite.domain.controller.advice;

import com.ssafy.favorite.global.common.CommonResponse;
import com.ssafy.favorite.global.exception.AlreadyFavoriteNews;
import com.ssafy.favorite.global.exception.NotExistFavoriteNews;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class FavoriteControllerAdvice {
    @ExceptionHandler(AlreadyFavoriteNews.class)
    public ResponseEntity<?> handleAlreadyNews(AlreadyFavoriteNews e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(CommonResponse.failure(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotExistFavoriteNews.class)
    public ResponseEntity<?> handleNotExistFavoriteNews(NotExistFavoriteNews e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(CommonResponse.failure(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
