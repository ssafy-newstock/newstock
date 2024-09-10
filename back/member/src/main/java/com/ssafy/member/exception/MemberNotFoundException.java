package com.ssafy.member.exception;

public class MemberNotFoundException extends RuntimeException {
    public MemberNotFoundException(final String message) {
        super(message);
    }
}
