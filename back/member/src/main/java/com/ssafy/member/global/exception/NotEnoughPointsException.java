package com.ssafy.member.global.exception;

public class NotEnoughPointsException extends RuntimeException{
    public NotEnoughPointsException(Long memberId) {
        super("해당 멤버의 포인트가 충분하지 않습니다. 현재 조회한 id : " + memberId);
    }

    public NotEnoughPointsException(final String message) {
        super(message);
    }
}
