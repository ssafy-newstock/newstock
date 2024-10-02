package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.stock.StockNews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StockNewsRepository extends JpaRepository<StockNews, Long> {
    @Query("select s from StockNews s order by s.uploadDatetime desc")
    Page<StockNews> findAllStockNews(Pageable pageable);

    @Query("SELECT sn " +
            "FROM StockNews sn " +
            "JOIN sn.stockNewsStockCodes sc " +
            "WHERE sc.stockCode = :stockCode " +
            "ORDER BY sn.uploadDatetime DESC")
    Page<StockNews> findAllByStockCode(@Param("stockCode") String stockCode, Pageable pageable);
}
