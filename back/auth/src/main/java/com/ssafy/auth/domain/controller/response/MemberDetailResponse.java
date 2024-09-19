package com.ssafy.auth.domain.controller.response;


import lombok.Getter;

@Getter
public class MemberDetailResponse {
    private Long memberId;
    private String memberName;
    private String providerEmail;
    private Long point;
}
