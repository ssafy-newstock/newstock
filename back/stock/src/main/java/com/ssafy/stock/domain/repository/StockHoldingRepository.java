package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.StocksHoldings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StockHoldingRepository extends JpaRepository<StocksHoldings, Long> {
    Optional<StocksHoldings> findByMemberIdAndStockId(Long memberId, Long stockId);

    @Query("SELECT sh FROM StocksHoldings sh " +
            "JOIN FETCH sh.stock s " +
            "WHERE sh.memberId = :memberId")
    List<StocksHoldings> findAllByMemberIdWithStock(Long memberId);

    @Query("SELECT sh FROM StocksHoldings sh " +
            "JOIN FETCH sh.stock s " +
            "WHERE sh.memberId = :memberId " +
            "AND s.stockCode = :stockCode")
    List<StocksHoldings> findAllByMemberIdAndStockCodeWithStock(Long memberId, String stockCode);
}
