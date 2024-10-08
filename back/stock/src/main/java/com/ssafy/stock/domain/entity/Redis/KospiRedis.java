package com.ssafy.stock.domain.entity.Redis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "KospiRedis")
public class KospiRedis {
    @Id
    private String industryCode; // 업종 코드
    private String industryName; // 업종 이름
    private String bstpNmixPrpr;  // 업종 지수 현재가
    private String bstpNmixPrdyVrss; // 업종 지수 전일 대비
    private String bstpNmixPrdyCtrt; // 업종 지수 전일 대비율
}
