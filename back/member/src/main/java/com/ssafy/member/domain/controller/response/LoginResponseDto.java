package com.ssafy.member.domain.controller.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private String memberName; // 멤버 이름
    private Long memberId; // 멤버 id
    private String providerEmail; // OAuth 가입 시 memberProviderEmail
    private String profileImageUrl; // 프로필 이미지 url
}
