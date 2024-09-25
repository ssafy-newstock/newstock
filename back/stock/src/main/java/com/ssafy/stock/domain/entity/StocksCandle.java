package com.ssafy.stock.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "stocks_candle", indexes = {
        @Index(name = "idx_stock_id", columnList = "stock_id") // stock_id에 대한 단일 인덱스
})
public class StocksCandle extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_candle_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Stocks stock;

    private LocalDate stockCandleDay;

    private Long stockCandleOpen;

    private Long stockCandleClose;

    private Long stockCandleHigh;

    private Long stockCandleLow;
}
