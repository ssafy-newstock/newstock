package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.StocksTransactions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockTransactionRepository extends JpaRepository<StocksTransactions, Long> {
    List<StocksTransactions> findAllByMemberId(Long memberId);
}
