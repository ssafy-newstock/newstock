package com.ssafy.member.domain.entity.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberRankDto {
    private final Long memberId;
    private final String memberName;
    private final Double changeRate;
}
