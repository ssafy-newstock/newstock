package com.ssafy.auth.domain.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 토큰으로 부터 회원 ID를 가져오기 위해 요청하는 객체
 * 객체 형태로 매핑해준 이유는 토큰의 보안성을 위해 GET 보다는 POST 가 적합하기 때문
 */

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberIdRequest {
    // JWT 토큰 값 (Bearer 제외)
    private String token;
}
