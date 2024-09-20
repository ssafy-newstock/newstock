package com.ssafy.stock.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Stocks extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_id")
    private Long id;

    @Column(length = 6)
    private String stockCode;

    private String stockName;

    private String stockMarket;

    private String stockIndustry;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.REMOVE)
    private List<StocksCandle> stocksCandles;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.REMOVE)
    private List<StocksFavorite> stocksFavorites;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.REMOVE)
    private List<StocksTransactions> stocksTransactions;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.REMOVE)
    private List<StocksHoldings> stocksHoldings;
}
