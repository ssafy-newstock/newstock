package com.ssafy.stock.domain.controller;

import com.ssafy.stock.domain.entity.Redis.StockIndustryRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceRedis;
import com.ssafy.stock.domain.service.StockIndustryService;
import com.ssafy.stock.domain.service.StockService;
import com.ssafy.stock.domain.service.response.StockCandleDto;
import com.ssafy.stock.domain.service.response.StockCandleResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
@Slf4j
public class StockController {

    private final ModelMapper modelMapper;
    private final StockService stockService;
    private final StockIndustryService stockIndustryService;

    @GetMapping("/price-list")
    public ResponseEntity<?> getStockPriceList(){
        Iterable<StocksPriceRedis> stocksPriceRedis = stockService.getStocksPriceRedis();
        return ResponseEntity.ok()
                .body(stocksPriceRedis);
    }

    @GetMapping("/price-list/live")
    public ResponseEntity<?> getStockPriceLiveList(){
        Iterable<StocksPriceLiveRedis> stocksPriceLiveRedis = stockService.getStocksPriceLiveRedis();
        return ResponseEntity.ok()
                .body(stocksPriceLiveRedis);
    }

    @GetMapping("/industry-list")
    public ResponseEntity<?> getStockIndustryList(){
        Iterable<StockIndustryRedis> stockIndustryRedisList = stockIndustryService.getStockIndustryRedisList();
        return ResponseEntity.ok()
                .body(stockIndustryRedisList);
    }

    @GetMapping("/{stockCode}")
    public ResponseEntity<?> getStockInfo(@PathVariable String stockCode){
        List<StockCandleDto> stockCandleList = stockService.getStockCandle(stockCode);

        List<StockCandleResponse> response = stockCandleList.stream()
                .map(stockCandleDto -> modelMapper.map(stockCandleDto, StockCandleResponse.class))
                .toList();

        return ResponseEntity.ok()
                .body(response);
    }
}
