package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.StocksTransactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockTransactionRepository extends JpaRepository<StocksTransactions, Long> {
    @Query("SELECT st FROM StocksTransactions st " +
            "JOIN FETCH st.stock s " +
            "WHERE st.memberId = :memberId")
    List<StocksTransactions> findAllByMemberIdWithStock(Long memberId);

    @Query("SELECT st FROM StocksTransactions st " +
            "JOIN FETCH st.stock s " +
            "WHERE st.memberId = :memberId " +
            "AND st.stockTransactionType = 'SELL'")
    List<StocksTransactions> findSellByMemberIdWithStock(Long memberId);
}
