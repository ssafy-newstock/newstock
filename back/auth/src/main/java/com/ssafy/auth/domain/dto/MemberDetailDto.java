package com.ssafy.auth.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailDto {
    private Long memberId;
    private String memberName;
    private String providerEmail;
}
