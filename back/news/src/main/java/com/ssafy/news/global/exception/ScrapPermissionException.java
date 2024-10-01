package com.ssafy.news.global.exception;

public class ScrapPermissionException extends RuntimeException {
    public ScrapPermissionException() {
        super("수정할 권한이 없습니다. (멤버 아이디 불일치)");
    }
}
