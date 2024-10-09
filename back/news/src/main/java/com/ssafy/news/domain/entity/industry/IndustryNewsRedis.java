package com.ssafy.news.domain.entity.industry;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "IndustryNewsRedis")
public class IndustryNewsRedis {
    @Id
    private String id;

    private String industryNewsId;
    private Long memberId;

    public IndustryNewsRedis(String industryNewsId, Long memberId) {
        this.id = industryNewsId + "|" + memberId;
        this.industryNewsId = industryNewsId;
        this.memberId = memberId;
    }
}
