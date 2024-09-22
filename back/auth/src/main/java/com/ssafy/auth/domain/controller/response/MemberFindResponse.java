package com.ssafy.auth.domain.controller.response;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberFindResponse {
    private Long memberId;
    private String memberName;
    private String providerEmail;

}
