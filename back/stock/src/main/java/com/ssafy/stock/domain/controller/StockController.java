package com.ssafy.stock.domain.controller;

import com.ssafy.stock.domain.entity.Redis.StockIndustryRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceRedis;
import com.ssafy.stock.domain.service.StockIndustryService;
import com.ssafy.stock.domain.service.StockService;
import com.ssafy.stock.domain.service.StockTransactionService;
import com.ssafy.stock.domain.service.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.stock.global.common.CommonResponse.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
@Slf4j
public class StockController {

    private final ModelMapper modelMapper;
    private final StockService stockService;
    private final StockIndustryService stockIndustryService;
    private final StockTransactionService stockTransactionService;

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

    @PostMapping("{stockCode}")
    public ResponseEntity<?> likeStore(@RequestHeader("authorization") String token,
                                        @PathVariable String stockCode){
        Long memberId = stockTransactionService.getMemberId(token);
        StockFavoriteDto stockFavoriteDto = stockService.likeStore(memberId, stockCode);

        StockFavoriteResponse response = modelMapper.map(stockFavoriteDto, StockFavoriteResponse.class);

        return ResponseEntity.ok(success(response));
    }

    @DeleteMapping("{stockCode}")
    public ResponseEntity<?> unlikeStore(@RequestHeader("authorization") String token,
                                        @PathVariable String stockCode){
        Long memberId = stockTransactionService.getMemberId(token);
        stockService.unlikeStore(memberId, stockCode);

        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/mypage")
    public ResponseEntity<?> getStockMyPage(@RequestHeader("authorization") String token){
        Long memberId = stockTransactionService.getMemberId(token);
        StockMyPageDto stockMyPage = stockService.getStockMyPage(memberId);

        return ResponseEntity.ok(success(stockMyPage));
    }
}
