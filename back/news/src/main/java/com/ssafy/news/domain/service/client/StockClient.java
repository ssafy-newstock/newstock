package com.ssafy.news.domain.service.client;

import com.ssafy.news.global.common.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "stock-service", url = "http://newstock-stock-stock-service:8003/api/stock")
//@FeignClient(name = "stock-service", url = "https://newstock.info/api/stock")
//@FeignClient(name = "stock-service", url = "http://localhost:8003/api/stock")
public interface StockClient {
    @GetMapping("/stock-code/name")
    CommonResponse<?> getStockName(@RequestParam List<String> stockCodeList);

}
