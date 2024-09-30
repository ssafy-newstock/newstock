package com.ssafy.stock.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "stocks_price")
public class StocksPrice extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_price_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Stocks stock;

    private STOCKPRICE stockPriceType;
    private Long stckPrpr;      // 주식 현재가
    private Long prdyVrss;      // 전일 대비
    private Double prdyCtrt;      // 전일 대비율
    private Long acmlTrPbmn;    // 누적 거래 대금
    private Long acmlVol;       // 누적 거래량

    public StocksPrice(Stocks stock, STOCKPRICE stockPriceType, Long stckPrpr, Long prdyVrss, Double prdyCtrt, Long acmlTrPbmn, Long acmlVol) {
        this.stock = stock;
        this.stockPriceType = stockPriceType;
        this.stckPrpr = stckPrpr;
        this.prdyVrss = prdyVrss;
        this.prdyCtrt = prdyCtrt;
        this.acmlTrPbmn = acmlTrPbmn;
        this.acmlVol = acmlVol;
    }

    public void update(Long stckPrpr, Long prdyVrss, Double prdyCtrt, Long acmlTrPbmn, Long acmlVol){
        this.stckPrpr = stckPrpr;
        this.prdyVrss = prdyVrss;
        this.prdyCtrt = prdyCtrt;
        this.acmlTrPbmn = acmlTrPbmn;
        this.acmlVol = acmlVol;
    }
}
