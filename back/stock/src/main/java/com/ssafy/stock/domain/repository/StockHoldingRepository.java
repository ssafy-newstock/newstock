package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.StocksHoldings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockHoldingRepository extends JpaRepository<StocksHoldings, Long> {
    Optional<StocksHoldings> findByMemberIdAndStockId(Long memberId, Long stockId);
}
