package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.scrap.IndustryScrap;
import feign.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface IndustryScrapRepository extends JpaRepository<IndustryScrap, Long> {
    @Query("select i " +
            "from IndustryScrap i " +
            "where i.memberId = :memberId " +
            "and i.createdDate between :startDate and :endDate " +
            "order by i.createdDate desc")
    Page<IndustryScrap> findAllByMemberIdAndCreatedDateBetween(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);
}
