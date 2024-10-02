package com.ssafy.news.domain.repository;

import com.ssafy.news.domain.entity.favorite.FavoriteStockNews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FavoriteStockNewsRepository extends JpaRepository<FavoriteStockNews, Long> {
    boolean existsByMemberIdAndStockNewsId(Long memberId, Long stockNewsId);

    void deleteByMemberIdAndStockNewsId(Long memberId, Long stockNewsId);

    @Query("select fsn " +
            "from FavoriteStockNews fsn " +
            "join fetch fsn.stockNews sn " +
            "join fetch sn.stockKeywords ssk " +
            "join fetch sn.stockNewsStockCodes ssc " +
            "where fsn.memberId = :memberId " +
            "order by fsn.createdDate desc ")
    Page<FavoriteStockNews> findAllFavoriteNewsByMemberId(@Param("memberId") Long memberId, Pageable pageable);

}
