package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.StockNews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockNewsRepository extends JpaRepository<StockNews, Integer> {
}
