package com.ssafy.stock.domain.controller;

import com.ssafy.stock.domain.service.response.StockTransactionRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock-transaction")
@Slf4j
public class StockTransactionController {


    @GetMapping("/buy")
    public ResponseEntity<?> buyStock(@RequestBody StockTransactionRequestDto stockTransactionRequestDto) {
        return ResponseEntity.ok()
                .body(null);
    }
}
