package com.ssafy.newsscrap.domain.repository;

import com.ssafy.newsscrap.domain.entity.FavoriteIndustryNews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteIndustryNewsRepository extends JpaRepository<FavoriteIndustryNews, Long> {
}
