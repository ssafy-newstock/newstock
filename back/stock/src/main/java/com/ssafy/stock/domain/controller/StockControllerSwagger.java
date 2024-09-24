package com.ssafy.stock.domain.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "주식", description = "주식 관련 API")
public interface StockControllerSwagger {

    @Operation(summary = "코스피 전체 종목 조회", description = "주식 메인페이지 접속 시 코스피 전체 종목 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/price-list")
    ResponseEntity<?> getStockPriceList();

    @Operation(summary = "코스피 TOP10 종목 조회", description = "주식 메인페이지 접속 시 코스피 TOP10 종목 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/price-list/live")
    ResponseEntity<?> getStockPriceLiveList();

    @Operation(summary = "코스피 종목 카테고리 조회", description = "주식 메인페이지 접속 시 코스피 종목 카테고리 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/industry-list")
    ResponseEntity<?> getStockIndustryList();

    @Operation(summary = "주식 상세페이지 조회(일봉 데이터)", description = "일봉 데이터 조회, 추후에 실시간 데이터 조회까지")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/{stockCode}")
    ResponseEntity<?> getStockInfo(@PathVariable String stockCode);

    @Operation(summary = "찜한 주식 조회", description = "사용자는 찜한 주식을 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/favorite")
    ResponseEntity<?> getLikeStore(@RequestHeader("authorization") String token);

    @Operation(summary = "주식 찜하기", description = "사용자는 특정 주식을 찜 가능")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "등록 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @PostMapping("/favorite/{stockCode}")
    ResponseEntity<?> likeStore(@RequestHeader("authorization") String token,
                                        @PathVariable String stockCode);

    @Operation(summary = "주식 찜 해제하기", description = "사용자는 찜한 주식을 찜 해제 가능")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "삭제 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @DeleteMapping("/favorite/{stockCode}")
    ResponseEntity<?> unlikeStore(@RequestHeader("authorization") String token,
                                            @PathVariable String stockCode);

    @Operation(summary = "주식 마이페이지", description = "주식 마이페이지는 보유 주식, 거래 내역, 찜한 주식 조회가 가능하다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/mypage")
    ResponseEntity<?> getStockMyPage(@RequestHeader("authorization") String token);
}
