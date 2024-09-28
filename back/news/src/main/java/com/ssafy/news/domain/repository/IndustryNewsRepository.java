package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.IndustryNews;
import com.ssafy.news.domain.entity.dto.IndustryNewsPreviewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IndustryNewsRepository extends JpaRepository<IndustryNews, Long> {
    // JPA에서 이런식으로 DTO를 반환하는 건 상당히 안티패턴임
    // 그러나 현재 본문 내용이 굉장히 길기 때문에 프리뷰를 위해 모든 본문을 조회하는 건 성능 문제가 존재
    // 성능 차원에서 이렇게 반환하도록 결정함
    @Query("SELECT new com.ssafy.news.domain.entity.dto.IndustryNewsPreviewDto" +
            "(ins.id, ins.title, ins.industry, ins.description, ins.media, ins.newsId, ins.thumbnail, ins.uploadDatetime) " +
            "FROM IndustryNews ins " +
            "WHERE ins.industry = :industry " +
            "ORDER BY ins.uploadDatetime DESC")
    Page<IndustryNewsPreviewDto> findIndustryNewsPreviewWithIndustry(@Param("industry") String industry, Pageable pageable);


    @Query("SELECT new com.ssafy.news.domain.entity.dto.IndustryNewsPreviewDto" +
            "(ins.id, ins.title, ins.industry, ins.description, ins.media, ins.newsId, ins.thumbnail, ins.uploadDatetime) " +
            "FROM IndustryNews ins " +
            "ORDER BY ins.uploadDatetime DESC")
    Page<IndustryNewsPreviewDto> findAllIndustryNewsPreview(Pageable pageable);
}
