package com.ssafy.member.domain.controller.response;

import lombok.*;

@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberFindResponse {
    private Long memberId;
    private String memberName;
    private String providerEmail;
}
