package com.ssafy.news.domain.service.client;

import com.ssafy.news.global.common.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.sql.SQLException;

@FeignClient(name = "newsDataClient", url = "${newsdata-client.url}")
public interface NewsDataClient {
    @GetMapping("/industry/recent")
    CommonResponse<?> getRecentIndustryNews() throws SQLException, ClassNotFoundException;

    @GetMapping("/stock/recent")
    CommonResponse<?> getRecentStockNews() throws SQLException, ClassNotFoundException;
}
