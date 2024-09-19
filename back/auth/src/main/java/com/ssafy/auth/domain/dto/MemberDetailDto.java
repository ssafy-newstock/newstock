package com.ssafy.auth.domain.dto;

import lombok.Getter;

@Getter
public class MemberDetailDto {
    private Long memberId;
    private String memberName;
    private String providerEmail;
    private Long point;

    public MemberDetailDto(final Long memberId, final String memberName, final String providerEmail) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.providerEmail = providerEmail;
        this.point = 0L;
    }
}
