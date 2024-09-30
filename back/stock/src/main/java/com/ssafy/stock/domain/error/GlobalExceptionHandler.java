package com.ssafy.stock.domain.error;

import com.ssafy.stock.domain.error.custom.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.ssafy.stock.global.common.CommonResponse.failure;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(StockNotFoundException.class)
    public ResponseEntity<?> handleStockNotFoundException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(failure(e.getMessage()));
    }

    @ExceptionHandler(StockHoldingNotFoundException.class)
    public ResponseEntity<?> handleStockHoldingNotFoundException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(failure(e.getMessage()));
    }

    @ExceptionHandler(StockFavoriteNotFoundException.class)
    public ResponseEntity<?> handleFavoriteNotFoundException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(failure(e.getMessage()));
    }

    @ExceptionHandler(StockAlreadyFavoriteException.class)
    public ResponseEntity<?> handleStockAlreadyFavoriteException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.badRequest()
                .body(failure(e.getMessage()));
    }

    @ExceptionHandler(MemberIdNotFoundException.class)
    public ResponseEntity<?> handleMemberIdNotFoundException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(failure(e.getMessage()));
    }

    @ExceptionHandler(OverSellLimitException.class)
    public ResponseEntity<?> handleOverSellLimitException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(failure(e.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleBusinessException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.internalServerError()
                .body(failure(e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(final RuntimeException e) {
        log.warn(e.getMessage());
        return ResponseEntity.badRequest()
                .body(failure(e.getMessage()));
    }

}
