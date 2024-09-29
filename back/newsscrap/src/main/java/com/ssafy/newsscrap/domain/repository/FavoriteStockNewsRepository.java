package com.ssafy.newsscrap.domain.repository;

import com.ssafy.newsscrap.domain.entity.FavoriteStockNews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteStockNewsRepository extends JpaRepository<FavoriteStockNews, Long> {
}
