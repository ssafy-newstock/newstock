package com.ssafy.stock.domain.service.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class StockIndustryResponse {
    private final String industryCode; // 업종 코드
    private final String industryName; // 업종 이름
    private final String bstpNmixPrpr;  // 업종 지수 현재가
    private final String bstpNmixPrdyVrss; // 업종 지수 전일 대비
    private final String bstpNmixPrdyCtrt; // 업종 지수 전일 대비율
    private final String acmlTrPbmn;    // 거래대금(백만)

    @Override
    public String toString() {
        return String.format(
                "StockSectorDto [업종 코드 =%s, 업종 이름 =%s, 현재 지수=%s, 전일대비=%s, 등락률=%s, 거래대금(백만)=%s]",
                industryCode, industryName, bstpNmixPrpr, bstpNmixPrdyVrss, bstpNmixPrdyCtrt, acmlTrPbmn
        );
    }
}
