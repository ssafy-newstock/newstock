package com.ssafy.stock.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "stocks_candle")
public class StocksCandle extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "stock_candle_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Stocks stock;

    private LocalDateTime stockCandleDay;

    private Long stockCandleOpen;

    private Long stockCandleClose;

    private Long stockCandleHigh;

    private Long stockCandleLow;
}
