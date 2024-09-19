package com.ssafy.auth.domain.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
@AllArgsConstructor
public class MemberLoginResponse {
    private Long memberId;
    private String memberName;
}
