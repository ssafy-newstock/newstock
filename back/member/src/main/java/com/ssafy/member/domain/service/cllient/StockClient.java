package com.ssafy.member.domain.service.cllient;

import com.ssafy.member.global.common.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "stockClient", url = "http://newstock-stock-stock-service:8003/api/stock")
public interface StockClient {
    @GetMapping("/rank")
    CommonResponse<?> getMemberChangeRate(@RequestParam List<Long> memberIdList);
}
