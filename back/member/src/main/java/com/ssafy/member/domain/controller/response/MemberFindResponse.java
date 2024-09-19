package com.ssafy.member.domain.controller.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
@Setter
public class MemberFindResponse {
    private Long memberId;
    private String memberName;
    private String providerEmail;
}
