package com.ssafy.newsdata.global.exception;

public class NewsNotFoundException extends RuntimeException {
    public NewsNotFoundException() {
        super("뉴스가 존재하지 않습니다.");
    }
}
