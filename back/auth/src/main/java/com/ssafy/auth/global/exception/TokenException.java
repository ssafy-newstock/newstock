package com.ssafy.auth.global.exception;


public class TokenException extends RuntimeException {
    public TokenException(final String message) {
        super(message);
    }
}
