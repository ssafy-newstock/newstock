package com.ssafy.newsscrap.domain.repository;

import com.ssafy.newsscrap.domain.entity.StockScrap;
import feign.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface StockScrapRepository extends JpaRepository<StockScrap, Long> {
    @Query("select s " +
            "from StockScrap s " +
            "where s.memberId = :memberId " +
            "and s.createdDate between :startDate and :endDate " +
            "order by s.createdDate desc")
    Page<StockScrap> findAllByMemberIdAndCreatedDateBetween(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);
}
