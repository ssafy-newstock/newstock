package com.ssafy.newsdata.domain.entity.industry;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "IndustryNewsRedis")
public class IndustryNewsRedis {
    private String id;

    private Long industryNewsId;
    private Long memberId;

    public IndustryNewsRedis(Long industryNewsId, Long memberId) {
        this.id = industryNewsId + "|" + memberId;
        this.industryNewsId = industryNewsId;
        this.memberId = memberId;
    }
}
