package com.ssafy.stock.domain.entity.Redis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "StockIndustryRedis")
public class StockIndustryRedis {
    @Id
    private String industryCode; // 업종 코드
    private String industryName; // 업종 이름
    private Long bstpNmixPrpr;  // 업종 지수 현재가
    private Long bstpNmixPrdyVrss; // 업종 지수 전일 대비
    private Double bstpNmixPrdyCtrt; // 업종 지수 전일 대비율
    private Long acmlTrPbmn;    // 거래대금(백만)

    @Override
    public String toString() {
        return String.format(
                "StockSectorDto [업종 코드 =%s, 업종 이름 =%s, 현재 지수=%s, 전일대비=%s, 등락률=%s, 거래대금(백만)=%s]",
                industryCode, industryName, bstpNmixPrpr, bstpNmixPrdyVrss, bstpNmixPrdyCtrt, acmlTrPbmn
        );
    }
}
