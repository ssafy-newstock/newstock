package com.ssafy.newsscrap.global.exception;

public class ScrapContentNotEmptyException extends RuntimeException {
    public ScrapContentNotEmptyException() {
        super("스크랩의 제목과 내용은 비어있을 수 없습니다.");
    }
}
