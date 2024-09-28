package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.IndustryNews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IndustryNewsRepository extends JpaRepository<IndustryNews, Integer> {
    @Query("select i from IndustryNews i order by i.uploadDatetime desc")
    List<IndustryNews> findTop4(Pageable pageable);

    Page<IndustryNews> findAllByIndustry(String industry, Pageable pageable);

    @Query("select i from IndustryNews i order by i.uploadDatetime desc")
    Page<IndustryNews> findAllIndustryPage(Pageable pageable);
}
