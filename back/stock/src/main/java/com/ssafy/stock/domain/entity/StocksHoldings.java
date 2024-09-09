package com.ssafy.stock.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "stocks_holdings")
public class StocksHoldings extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "stock_holding_id")
    private Long id;

    @Column(name = "member_id")
    private Long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Stocks stock;

    private Long stockHoldingBuyAmount;

    private Long stockHoldingBuyPrice;
}
