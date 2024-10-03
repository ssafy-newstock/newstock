package com.ssafy.favorite.domain.repository;

import com.ssafy.favorite.domain.entity.FavoriteIndustryNews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FavoriteIndustryNewsRepository extends JpaRepository<FavoriteIndustryNews, Long> {
    boolean existsByMemberIdAndIndustryNewsId(Long memberId, Long industryNewsId);

    void deleteByMemberIdAndIndustryNewsId(Long memberId, Long industryNewsId);

    @Query("select fin " +
            "from FavoriteIndustryNews fin " +
            "where fin.memberId = :memberId " +
            "order by fin.createdDate desc ")
    Page<FavoriteIndustryNews> findAllFavoriteNewsByMemberId(@Param("memberId") Long memberId, Pageable pageable);

}
