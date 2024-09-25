package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.StocksCandle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StocksCandleRepository extends JpaRepository<StocksCandle, Long> {
}
