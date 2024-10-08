package com.ssafy.stock.domain.service.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@ToString
@RequiredArgsConstructor
@Getter
public class KospiResponse {
    private final String industryCode; // 업종 코드
    private final String industryName; // 업종 이름
    private final String bstpNmixPrpr;  // 업종 지수 현재가
    private final String bstpNmixPrdyVrss; // 업종 지수 전일 대비
    private final String bstpNmixPrdyCtrt; // 업종 지수 전일 대비율

}
