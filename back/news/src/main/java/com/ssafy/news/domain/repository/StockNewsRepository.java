package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.StockNews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StockNewsRepository extends JpaRepository<StockNews, Integer> {
    @Query("select s from StockNews s order by s.uploadDatetime desc")
    List<StockNews> findTop4(Pageable pageable);

    @Query("select s from StockNews s order by s.uploadDatetime desc")
    Page<StockNews> findAllStockPage(Pageable pageable);

    @Query("SELECT sn FROM StockNews sn JOIN sn.stockNewsStockCodes sc WHERE sc.stockCode = :stockCode")
    Page<StockNews> findByStockCode(@Param("stockCode") String stockCode, Pageable pageable);

}
