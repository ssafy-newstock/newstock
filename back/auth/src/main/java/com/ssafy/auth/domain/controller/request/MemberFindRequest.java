package com.ssafy.auth.domain.controller.request;

import lombok.Getter;

@Getter
public class MemberFindRequest {
    private String memberName;
    private String memberProviderEmail;

    public MemberFindRequest(final String memberName, final String memberProviderEmail) {
        this.memberName = memberName;
        this.memberProviderEmail = memberProviderEmail;
    }
}
