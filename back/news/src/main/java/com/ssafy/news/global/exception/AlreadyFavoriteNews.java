package com.ssafy.news.global.exception;

public class AlreadyFavoriteNews extends RuntimeException {
    public AlreadyFavoriteNews() {
        super("이미 관심 목록에 등록한 뉴스입니다");
    }
}
