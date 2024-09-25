package com.ssafy.stock.domain.controller;

import com.ssafy.stock.domain.service.request.StockTransactionRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Tag(name = "주식 거래", description = "주식 매수/매도 API")
public interface StockTransactionControllerSwagger {

    @Operation(summary = "주식 매수", description = "사용자는 특정 주식 매수가 가능하다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @PostMapping("/buy")
    ResponseEntity<?> buyStock(@RequestBody StockTransactionRequest stockTransactionRequest,
                                        @RequestHeader("authorization") String token);

    @Operation(summary = "주식 매도", description = "사용자는 특정 주식 매도가 가능하다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json"))
    })
    @PostMapping("/sell")
    ResponseEntity<?> sellStock(@RequestBody StockTransactionRequest stockTransactionRequest,
                                        @RequestHeader("authorization") String token);
}
