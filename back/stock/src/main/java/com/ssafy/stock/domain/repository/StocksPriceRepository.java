package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.StocksPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StocksPriceRepository extends JpaRepository<StocksPrice, Long> {

}
