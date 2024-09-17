package com.ssafy.stock.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "stocks_transactions")
public class StocksTransactions extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "stock_transaction_id")
    private Long id;

    @Column(name = "member_id")
    private Long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Stocks stock;

    private Long stockTransactionAmount;

    private Long stockTransactionPrice;

    private TYPE stockTransactionType;

    private LocalDateTime stockTransactionDate;

    public StocksTransactions(Long memberId, Stocks stock, Long stockTransactionAmount, Long stockTransactionPrice, TYPE stockTransactionType, LocalDateTime stockTransactionDate) {
        this.memberId = memberId;
        this.stock = stock;
        this.stockTransactionAmount = stockTransactionAmount;
        this.stockTransactionPrice = stockTransactionPrice;
        this.stockTransactionType = stockTransactionType;
        this.stockTransactionDate = stockTransactionDate;
    }
}
