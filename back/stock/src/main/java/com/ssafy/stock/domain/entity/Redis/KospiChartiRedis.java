package com.ssafy.stock.domain.entity.Redis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "KospiChartRedis")
public class KospiChartiRedis {
    @Id
    private String industryCode; // 업종 코드
    private String industryName; // 업종 이름
    private String bstpNmixPrpr;  // 업종 지수 현재가
    private LocalDateTime time;

    public KospiChartiRedis(String industryCode, String industryName, String bstpNmixPrpr) {
        this.industryCode = industryCode;
        this.industryName = industryName;
        this.bstpNmixPrpr = bstpNmixPrpr;
        this.time = LocalDateTime.now().plusHours(9);
    }
}