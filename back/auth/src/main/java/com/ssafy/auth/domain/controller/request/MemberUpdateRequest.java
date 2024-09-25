package com.ssafy.auth.domain.controller.request;

import com.ssafy.auth.domain.dto.OAuthAttributesDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateRequest {
    private String memberName;
    private String memberProvider;
    private String memberProviderEmail;
    private String memberProfileImageUrl;

    public static MemberUpdateRequest of(OAuthAttributesDto oAuthAttributesDto, String provider) {
        MemberUpdateRequest request = new MemberUpdateRequest();
        request.memberName = oAuthAttributesDto.getMemberName();
        request.memberProvider = provider;
        request.memberProviderEmail = oAuthAttributesDto.getMemberProviderEmail();
        request.memberProfileImageUrl = oAuthAttributesDto.getMemberProfileImageUrl();
        return request;
    }
}
