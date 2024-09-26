package com.ssafy.stock.domain.service.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StockDetailDto {
    List<StockCandleDto> stockCandleDtoList;
    List<StocksPriceLiveDailyChartRedisDto> stocksPriceLiveDailyChartRedisDtoList;
}
