package com.ssafy.member.domain.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberLoginResponse {
    private String memberId;
    private String memberName;
}
