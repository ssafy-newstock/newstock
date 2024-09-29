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

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.stock.global.common.CommonResponse.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
@Slf4j
public class StockController{

    private final ModelMapper modelMapper;
    private final StockService stockService;
    private final StockIndustryService stockIndustryService;
    private final StockTransactionService stockTransactionService;

    /**
     * 주식 이름 검색
     * @param stockName
     * @return
     */
    @GetMapping("/search")
    public ResponseEntity<?> autocompleteStockName(@RequestParam String stockName) {
        log.info("stockName : {}", stockName);
        List<StocksPriceRedis> suggestions = stockService.autocompleteStockName(stockName);
        return ResponseEntity.ok(suggestions);
    }

    /**
     * 주식 전 종목 정보 조회
     * @return
     */
    @GetMapping("/price-list")
    public ResponseEntity<?> getStockPriceList(){
        Iterable<StocksPriceRedis> stocksPriceRedis = stockService.getStocksPriceRedis();
        return ResponseEntity.ok()
                .body(stocksPriceRedis);
    }

    /**
     * 주식 TOP10 정보 조회
     * @return
     */
    @GetMapping("/price-list/live")
    public ResponseEntity<?> getStockPriceLiveList(){
        Iterable<StocksPriceLiveRedis> stocksPriceLiveRedis = stockService.getStocksPriceLiveRedis();
        return ResponseEntity.ok()
                .body(stocksPriceLiveRedis);
    }

    /**
     * 주식 카테고리 정보 조회
     * @return
     */
    @GetMapping("/industry-list")
    public ResponseEntity<?> getStockIndustryList(){
        Iterable<StockIndustryRedis> stockIndustryRedisList = stockIndustryService.getStockIndustryRedisList();
        return ResponseEntity.ok()
                .body(stockIndustryRedisList);
    }

    /**
     * 주식 상세페이지 일봉 데이터 조회
     * @param stockCode
     * @param stockCandleRequestDto
     * @return
     */
    @GetMapping("/{stockCode}/candle")
    public ResponseEntity<?> getStockCandle(@PathVariable String stockCode,
                                            @RequestParam("startDate") LocalDate startDate,
                                            @RequestParam("endDate") LocalDate endDate){
        List<StockCandleDto> stockCandleList = stockService.getStockCandle(stockCode, startDate, endDate);

        List<StockCandleResponse> response = stockCandleList.stream()
                .map(stockCandleDto -> modelMapper.map(stockCandleDto, StockCandleResponse.class))
                .toList();

        return ResponseEntity.ok()
                .body(response);
    }

    /**
     * 주식 상세페이지 데일리 차트 조회
     * @param stockCode
     * @return
     */
    @GetMapping("/{stockCode}/daily")
    public ResponseEntity<?> getStockDaily(@PathVariable String stockCode){
        List<StocksPriceLiveDailyChartRedisDto> stockDailyList = stockService.getStockDaily(stockCode);

        return ResponseEntity.ok()
                .body(stockDailyList);
    }

    /**
     * 주식 찜 목록 조회
     * @param token
     * @return
     */
    @GetMapping("/favorite")
    public ResponseEntity<?> getLikeStore(@RequestHeader("authorization") String token){
        Long memberId = stockTransactionService.getMemberId(token);
        List<StockFavoriteDto> stockMyPageFavoriteDtoList = stockService.getStockMyPageFavoriteDtoList(memberId);

        List<StockFavoriteResponse> response = stockMyPageFavoriteDtoList.stream()
                .map(stockFavoriteDto -> modelMapper.map(stockFavoriteDto, StockFavoriteResponse.class))
                .toList();
        return ResponseEntity.ok(success(response));
    }

    /**
     * 주식 찜하기
     * @param token
     * @param stockCode
     * @return
     */
    @PostMapping("/favorite/{stockCode}")
    public ResponseEntity<?> likeStore(@RequestHeader("authorization") String token,
                                        @PathVariable String stockCode){
        Long memberId = stockTransactionService.getMemberId(token);
        StockFavoriteDto stockFavoriteDto = stockService.likeStore(memberId, stockCode);

        StockFavoriteResponse response = modelMapper.map(stockFavoriteDto, StockFavoriteResponse.class);

        return ResponseEntity.ok(success(response));
    }

    /**
     * 주식 찜 해제하기
     * @param token
     * @param stockCode
     * @return
     */
    @DeleteMapping("/favorite/{stockCode}")
    public ResponseEntity<?> unlikeStore(@RequestHeader("authorization") String token,
                                        @PathVariable String stockCode){
        Long memberId = stockTransactionService.getMemberId(token);
        stockService.unlikeStore(memberId, stockCode);

        return ResponseEntity.noContent()
                .build();
    }

    /**
     * 주식 마이페이지 조회
     * @param token
     * @return
     */
    @GetMapping("/mypage")
    public ResponseEntity<?> getStockMyPage(@RequestHeader("authorization") String token){
        Long memberId = stockTransactionService.getMemberId(token);
        StockMyPageDto stockMyPage = stockService.getStockMyPage(memberId);

        return ResponseEntity.ok(success(stockMyPage));
    }


    @GetMapping("/stock-code/name")
    public ResponseEntity<?> getStockName(@RequestParam List<String> stockCodeList){
        List<StockCodeToNameResponse> stockNameList = stockService.getStockName(stockCodeList);

        return ResponseEntity.ok(success(stockNameList));
    }
}
