package com.ssafy.newsscrap.global.exception;

public class ScrapNotFoundException extends RuntimeException{
    public ScrapNotFoundException() {
        super("해당 스크랩이 존재하지 않습니다.");
    }
}
