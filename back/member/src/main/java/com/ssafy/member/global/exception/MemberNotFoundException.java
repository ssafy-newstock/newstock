package com.ssafy.member.global.exception;

public class MemberNotFoundException extends RuntimeException {
    public MemberNotFoundException(Long memberId) {
        super("해당 멤버가 존재하지 않습니다. 현재 조회한 id : " + memberId);
    }

    public MemberNotFoundException(final String message) {
        super(message);
    }
}
