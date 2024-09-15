package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.StocksTransactions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockTransactionRepository extends JpaRepository<StocksTransactions, Long> {

}
