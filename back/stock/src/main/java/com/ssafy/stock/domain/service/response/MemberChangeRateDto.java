package com.ssafy.stock.domain.service.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberChangeRateDto {
    private Long memberId;
    private Double changeRate;
}
