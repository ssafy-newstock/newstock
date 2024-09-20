package com.ssafy.member.domain.controller.response;

import com.ssafy.member.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDetailResponse {
    private Long memberId;
    private String memberName;
    private String providerEmail;
    private Long point;

    public static MemberDetailResponse of(Member member) {
        MemberDetailResponse response = new MemberDetailResponse();
        response.memberId = member.getId();
        response.memberName = member.getMemberName();
        response.providerEmail = member.getProviderEmail();
        response.point = member.getPoint();
        return response;
    }
}
