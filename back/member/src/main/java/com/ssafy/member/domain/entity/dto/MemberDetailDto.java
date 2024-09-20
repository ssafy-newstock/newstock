package com.ssafy.member.domain.entity.dto;

import com.ssafy.member.domain.entity.Member;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class MemberDetailDto {
    private Long memberId;
    private String memberName;
    private String providerEmail;
    private Long point;

    public static MemberDetailDto of(Member member) {
        MemberDetailDto dto = new MemberDetailDto();
        dto.memberId = member.getId();
        dto.memberName = member.getMemberName();
        dto.providerEmail = member.getProviderEmail();
        dto.point = member.getPoint();
        return dto;
    }
}
