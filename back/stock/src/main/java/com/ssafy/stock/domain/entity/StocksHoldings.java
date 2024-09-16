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

    public StocksHoldings(Long memberId, Stocks stock, Long stockHoldingBuyAmount, Long stockHoldingBuyPrice) {
        this.memberId = memberId;
        this.stock = stock;
        this.stockHoldingBuyAmount = stockHoldingBuyAmount;
        this.stockHoldingBuyPrice = stockHoldingBuyPrice;
    }

    public void update(Long amount, Long price, TYPE updateType){
        if (updateType == TYPE.BUY) {
            // 총 수량
            Long totalAmount = this.stockHoldingBuyAmount + amount;
            // 새로운 평단가 계산: 기존 총액 + 신규 매수 총액 / 총 수량
            this.stockHoldingBuyPrice = ((this.stockHoldingBuyAmount * this.stockHoldingBuyPrice) + price) / totalAmount;
            this.stockHoldingBuyAmount = totalAmount;
        } else if (updateType == TYPE.SELL) {
            // 판매 수량만큼 차감 (평단가는 유지)
            this.stockHoldingBuyAmount -= amount;
        }
    }
}
