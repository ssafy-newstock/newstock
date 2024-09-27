package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StocksRepository extends JpaRepository<Stocks, Long> {
    Optional<Stocks> findByStockCode(String stockCode);

    @Query("SELECT s " +
            "FROM Stocks s " +
            "LEFT JOIN FETCH s.stocksCandles " +
            "WHERE s.stockCode = :stockCode")
    Optional<Stocks> findByStockCodeWithCandles(String stockCode);

    @Query("SELECT s " +
            "FROM Stocks s LEFT JOIN FETCH s.stocksCandles c " +
            "WHERE s.stockCode = :stockCode " +
            "AND c.stockCandleDay BETWEEN :startDate AND :endDate")
    Optional<Stocks> findByStockCodeWithCandlesAndDate(String stockCode, LocalDate startDate, LocalDate endDate);


    @Query("SELECT s " +
            "FROM Stocks s LEFT JOIN FETCH s.stocksCandles c " +
            "WHERE s.stockIndustry = :stockIndustry ")
    List<Stocks> findAllByStockIndustryWithCandle(String stockIndustry);

}
