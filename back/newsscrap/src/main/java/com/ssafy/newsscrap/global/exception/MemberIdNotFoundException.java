package com.ssafy.newsscrap.global.exception;

public class MemberIdNotFoundException extends RuntimeException {
    public MemberIdNotFoundException() {
        super("잘못된 형식의 토큰으로 memberId를 찾지 못했습니다.");
    }

    public MemberIdNotFoundException(String message) {
        super(message);
    }
}
