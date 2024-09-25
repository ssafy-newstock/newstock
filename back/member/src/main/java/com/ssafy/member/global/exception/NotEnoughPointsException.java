package com.ssafy.member.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotEnoughPointsException extends RuntimeException{
    public NotEnoughPointsException(Long memberId) {
        super("해당 멤버의 포인트가 충분하지 않습니다. 현재 조회한 id : " + memberId);
    }

    public NotEnoughPointsException(final String message) {
        super(message);
    }
}
