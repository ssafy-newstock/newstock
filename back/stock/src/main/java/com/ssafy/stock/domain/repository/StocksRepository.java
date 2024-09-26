package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StocksRepository extends JpaRepository<Stocks, Long> {
    Optional<Stocks> findByStockCode(String stockCode);

    @Query("SELECT s " +
            "FROM Stocks s " +
            "LEFT JOIN FETCH s.stocksCandles " +
            "WHERE s.stockCode = :stockCode")
    Optional<Stocks> findByStockCodeWithCandles(String stockCode);

}
