package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.dto.IndustryNewsDto;
import com.ssafy.news.domain.entity.industry.IndustryNews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IndustryNewsRepository extends JpaRepository<IndustryNews, Long> {
    @Query("SELECT ins " +
            "FROM IndustryNews ins " +
            "WHERE ins.industry = :industry " +
            "ORDER BY ins.uploadDatetime DESC")
    Page<IndustryNewsDto> findIndustryNewsPreviewWithIndustry(@Param("industry") String industry, Pageable pageable);


    @Query("SELECT ins " +
            "FROM IndustryNews ins " +
            "ORDER BY ins.uploadDatetime DESC")
    Page<IndustryNewsDto> findAllIndustryNewsPreview(Pageable pageable);

    List<IndustryNews> findAllByIdIn(List<Long> ids);

//    List<IndustryNews>
}
