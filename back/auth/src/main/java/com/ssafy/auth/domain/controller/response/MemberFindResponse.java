package com.ssafy.auth.domain.controller.response;

import lombok.*;

@Getter
@ToString
@Setter
@NoArgsConstructor
public class MemberFindResponse {
    private Long memberId;
    private String memberName;
    private String providerEmail;

    public MemberFindResponse(final Long memberId, final String memberName, final String providerEmail) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.providerEmail = providerEmail;
    }
}
