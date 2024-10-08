package com.ssafy.stock.domain.service.response;

import com.ssafy.stock.domain.entity.Redis.KospiChartiRedis;
import com.ssafy.stock.domain.entity.Redis.KospiRedis;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.List;

@ToString
@RequiredArgsConstructor
@Getter
public class KospiAndChartResponse {
    private final KospiRedis kospi;
    private final List<KospiChartiRedis> kospiChart;
}
