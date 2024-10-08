package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.stock.StockNewsStockCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockNewsCodeRepository extends JpaRepository<StockNewsStockCode, Long> {
}
