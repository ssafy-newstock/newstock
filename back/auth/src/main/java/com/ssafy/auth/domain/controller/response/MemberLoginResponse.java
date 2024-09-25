package com.ssafy.auth.domain.controller.response;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberLoginResponse {
    private Long memberId;
    private String memberName;
}
