package com.ssafy.favorite.global.exception;

public class NotExistFavoriteNews extends RuntimeException {
    public NotExistFavoriteNews() {
        super("관심 목록에 등록한 적이 없는 뉴스입니다.");
    }
}
