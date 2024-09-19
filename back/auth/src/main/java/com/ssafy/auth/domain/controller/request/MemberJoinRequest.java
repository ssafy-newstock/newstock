package com.ssafy.auth.domain.controller.request;

import com.ssafy.auth.domain.dto.OAuthAttributesDto;
import lombok.Getter;

@Getter
public class MemberJoinRequest {
    private String memberName;
    private String memberProvider;
    private String memberProviderEmail;
    private String memberProfileImageUrl;

    public static MemberJoinRequest of(OAuthAttributesDto oAuthAttributesDto) {
        MemberJoinRequest request = new MemberJoinRequest();
        request.memberName = oAuthAttributesDto.getMemberName();
        request.memberProvider = oAuthAttributesDto.getMemberProvider();
        request.memberProviderEmail = oAuthAttributesDto.getMemberProviderEmail();
        request.memberProfileImageUrl = oAuthAttributesDto.getMemberProfileImageUrl();
        return request;
    }
}
