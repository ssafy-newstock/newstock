package com.ssafy.member.domain.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberChangeRateDto {
    private Long memberId;
    private Double holdingChangeRate;
    private Double transactionChangeRate;
}
