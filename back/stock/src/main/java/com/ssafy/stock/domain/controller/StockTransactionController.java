package com.ssafy.stock.domain.controller;

import com.ssafy.stock.domain.service.StockTransactionService;
import com.ssafy.stock.domain.service.request.StockTransactionRequest;
import com.ssafy.stock.domain.service.response.StockTransactionDto;
import com.ssafy.stock.domain.service.response.StockTransactionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.stock.global.common.CommonResponse.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock-transaction")
@Slf4j
public class StockTransactionController {

    private final ModelMapper modelMapper;
    private final StockTransactionService stockTransactionService;

    @PostMapping("/buy")
    public ResponseEntity<?> buyStock(@RequestBody StockTransactionRequest stockTransactionRequest,
                                        @RequestHeader("authorization") String token) {
        Long memberId = stockTransactionService.getMemberId(token);
        StockTransactionDto stockTransactionDto = stockTransactionService.buyStock(memberId, stockTransactionRequest);

        StockTransactionResponse response = modelMapper.map(stockTransactionDto, StockTransactionResponse.class);
        return ResponseEntity.ok(success(response));
    }

    @PostMapping("/sell")
    public ResponseEntity<?> sellStock(@RequestBody StockTransactionRequest stockTransactionRequest,
                                        @RequestHeader("authorization") String token) {
        Long memberId = stockTransactionService.getMemberId(token);
        StockTransactionDto stockTransactionDto = stockTransactionService.sellStock(memberId, stockTransactionRequest);

        StockTransactionResponse response = modelMapper.map(stockTransactionDto, StockTransactionResponse.class);
        return ResponseEntity.ok(success(response));
    }
}
