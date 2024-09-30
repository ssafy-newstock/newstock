package com.ssafy.newsscrap.domain.repository;

import com.ssafy.newsscrap.domain.entity.NewsScrap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsScrapRepository extends JpaRepository<NewsScrap, Long> {
}
