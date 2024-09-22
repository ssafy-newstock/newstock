package com.ssafy.auth.domain.controller.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailResponse {
    private Long memberId;
    private String memberName;
    private String providerEmail;
    private Long point;
}
