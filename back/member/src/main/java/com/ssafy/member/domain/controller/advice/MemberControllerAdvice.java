package com.ssafy.member.domain.controller.advice;

import com.ssafy.member.domain.controller.MemberController;
import com.ssafy.member.global.common.CommonResponse;
import com.ssafy.member.global.exception.MemberNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackageClasses = MemberController.class)
public class MemberControllerAdvice {

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<CommonResponse<?>> handleMissingParams(MissingServletRequestParameterException ex) {
        log.error(ex.getMessage());

        // CommonResponse로 응답 생성
        CommonResponse<?> response = CommonResponse.failure("파라미터가 누락되었습니다.");

        // 예외를 처리하고 나서 적절한 응답을 반환
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<?> handleMemberNotFoundException(MemberNotFoundException e) {
        log.error(e.getMessage());

        return new ResponseEntity<>(CommonResponse.failure(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleHttpReaderException(HttpMessageNotReadableException e) {
        log.error(e.getMessage());

        return new ResponseEntity<>(
                CommonResponse.failure("request body가 비어있거나 잘못된 값이 들어있습니다."),
                HttpStatus.NOT_FOUND
        );
    }
}
