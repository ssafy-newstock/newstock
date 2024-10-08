package com.ssafy.favorite.domain.service.client;

import com.ssafy.favorite.global.common.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "stockNewsClient", url = "${stock-news-client.url}")
public interface StockNewsClient {
    @GetMapping("/{id}")
    CommonResponse<?> getStockNews(@PathVariable("id") String id);

    @GetMapping("/bulk")
    CommonResponse<?> getStockNewsInIds(@RequestParam List<String> ids);
}

