package com.ssafy.favorite.domain.service.client;

import com.ssafy.favorite.global.common.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "industryNewsClient", url = "${industry-news-client.url}")
public interface IndustryNewsClient {
    @GetMapping("/{id}")
    CommonResponse<?> getIndustryNewsById(@PathVariable("id") Long id);

    @GetMapping("/bulk")
    CommonResponse<?> getIndustryNewsInIds(@RequestParam List<Long> ids);
}
