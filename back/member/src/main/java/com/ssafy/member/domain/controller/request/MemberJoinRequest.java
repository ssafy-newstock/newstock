package com.ssafy.member.domain.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberJoinRequest {
    private String memberName;
    private String memberProvider;
    private String memberProviderEmail;
    private String memberProfileImageUrl;
}
