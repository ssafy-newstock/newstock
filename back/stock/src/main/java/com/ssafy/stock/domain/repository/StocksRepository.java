package com.ssafy.stock.domain.repository;

import com.ssafy.stock.domain.entity.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StocksRepository extends JpaRepository<Stocks, Long> {
}
