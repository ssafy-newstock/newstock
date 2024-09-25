package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.StocksFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StockFavoriteRepository extends JpaRepository<StocksFavorite, Long> {

    Optional<StocksFavorite> findByMemberIdAndStockId(Long memberId, Long stockId);

    @Query("SELECT sf FROM StocksFavorite sf " +
            "JOIN FETCH sf.stock s " +
            "WHERE sf.memberId = :memberId")
    List<StocksFavorite> findAllByMemberIdWithStock(Long memberId);
}
