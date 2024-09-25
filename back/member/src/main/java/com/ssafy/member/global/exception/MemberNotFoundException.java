package com.ssafy.member.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MemberNotFoundException extends RuntimeException {
    public MemberNotFoundException(Long memberId) {
        super("해당 멤버가 존재하지 않습니다. 현재 조회한 id : " + memberId);
    }


    public MemberNotFoundException(final String name, String email) {
        super("해당 멤버가 존재하지 않습니다. 현재 조회한 이름 : " + name + ", 이메일 : " + email);
    }

    public MemberNotFoundException(final String message) {
        super(message);
    }
}
