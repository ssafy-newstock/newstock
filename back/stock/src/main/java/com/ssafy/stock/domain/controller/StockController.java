package com.ssafy.stock.domain.controller;

import com.ssafy.stock.domain.entity.StocksPriceRedis;
import com.ssafy.stock.domain.service.StockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
@Slf4j
public class StockController {
    private final StockService stockService;

    @GetMapping("/price-list")
    public ResponseEntity<?> getStockPriceList(){
        Iterable<StocksPriceRedis> stocksPriceRedis = stockService.getStocksPriceRedis();
        return ResponseEntity.ok()
                .body(stocksPriceRedis);
    }
}
