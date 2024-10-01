package com.ssafy.newsscrap.domain.service.client;

import com.ssafy.newsscrap.global.common.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "industryNewsClient", url = "http://newstock-stock-news-service/api/news/industry")
//@FeignClient(name = "industryNewsClient", url = "http://localhost:8002/api/news/industry")
public interface IndustryNewsClient {
    @GetMapping("/{id}")
    CommonResponse<?> getIndustryNewsById(@PathVariable("id") Long id);

    @GetMapping("/bulk")
    CommonResponse<?> getIndustryNewsInIds(@RequestParam List<Long> ids);
}
