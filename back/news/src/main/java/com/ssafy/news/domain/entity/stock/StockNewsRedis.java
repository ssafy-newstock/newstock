package com.ssafy.news.domain.entity.stock;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "StockNewsRedis")
public class StockNewsRedis {
    @Id
    private String id;

    private Long stockNewsId;
    private Long memberId;

    public StockNewsRedis(Long stockNewsId, Long memberId) {
        this.id = stockNewsId + "|" + memberId;
        this.stockNewsId = stockNewsId;
        this.memberId = memberId;
    }
}
