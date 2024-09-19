package com.ssafy.member.domain.controller.request;

import lombok.Getter;

@Getter
public class MemberJoinRequest {
    private String memberName;
    private String memberProvider;
    private String memberProviderEmail;
    private String memberProfileImageUrl;

}
