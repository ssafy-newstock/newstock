package com.ssafy.member.domain.controller.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class MemberLoginResponse {
    private String memberId;
    private String memberName;
}
