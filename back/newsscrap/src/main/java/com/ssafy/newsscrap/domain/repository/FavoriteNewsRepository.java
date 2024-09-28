package com.ssafy.newsscrap.domain.repository;


import com.ssafy.newsscrap.domain.entity.FavoriteNews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteNewsRepository  extends JpaRepository<FavoriteNews, Long> {
    List<FavoriteNews> findByMemberId(Long newsId);
}
