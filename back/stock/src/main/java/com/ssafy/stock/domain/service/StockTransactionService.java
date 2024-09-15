package com.ssafy.stock.domain.service;

import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import com.ssafy.stock.domain.entity.Stocks;
import com.ssafy.stock.domain.entity.StocksHoldings;
import com.ssafy.stock.domain.entity.StocksTransactions;
import com.ssafy.stock.domain.error.custom.OverSellLimitException;
import com.ssafy.stock.domain.error.custom.StockHoldingNotFoundException;
import com.ssafy.stock.domain.error.custom.StockNotFoundException;
import com.ssafy.stock.domain.repository.StockHoldingRepository;
import com.ssafy.stock.domain.repository.StockTransactionRepository;
import com.ssafy.stock.domain.repository.StocksPriceLiveRedisRepository;
import com.ssafy.stock.domain.repository.StocksRepository;
import com.ssafy.stock.domain.service.response.StockTransactionRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class StockTransactionService {

    private final StocksRepository stocksRepository;
    private final StocksPriceLiveRedisRepository stocksPriceLiveRedisRepository;
    private final StockHoldingRepository stockHoldingRepository;
    private final StockTransactionRepository stockTransactionRepository;

    @Transactional
    public void buyStock(Long memberId, StockTransactionRequestDto stockTransactionRequestDto) {
        Stocks stock = stocksRepository.findByStockCode(stockTransactionRequestDto.getStockCode())
                .orElseThrow(StockNotFoundException::new);

        StocksPriceLiveRedis stocksPriceLiveRedis = stocksPriceLiveRedisRepository.findById(stockTransactionRequestDto.getStockCode())
                .orElseThrow(StockNotFoundException::new);

        Long currentPrice = stocksPriceLiveRedis.getStckPrpr();
        Long buyAmount = stockTransactionRequestDto.getStockTransactionAmount();
        Long totalPrice = currentPrice * buyAmount;

        // MemberService 구매 가능 여부 확인(보유 포인트 >= totalPrice) 및 보유 포인트 차감

        // 주식 보유(StocksHoldings) 저장
        stockHoldingRepository.findByMemberIdAndStockId(memberId, stock.getId())
                .ifPresentOrElse(
                        // StocksHolding 객체가 존재하는 경우 (해당 주식을 보유하고 있음)
                        existingStockHolding -> existingStockHolding.update(buyAmount, totalPrice, stockTransactionRequestDto.getStockTransactionType()),
                        () -> {
                            // StocksHolding 객체가 존재하지 않는 경우 (해당 주식을 보유하고 있지 않음)
                            StocksHoldings newStockHolding = new StocksHoldings(memberId, stock, buyAmount, totalPrice);
                            stockHoldingRepository.save(newStockHolding);
                        }
                );

        // 주식 매수 거래 내역 저장
        StocksTransactions stocksTransactions = new StocksTransactions(memberId,
                stock,
                buyAmount,
                currentPrice,
                stockTransactionRequestDto.getStockTransactionType(),
                LocalDateTime.now());
        stockTransactionRepository.save(stocksTransactions);
    }


    @Transactional
    public void sellStock(Long memberId, StockTransactionRequestDto stockTransactionRequestDto) {
        Stocks stock = stocksRepository.findByStockCode(stockTransactionRequestDto.getStockCode())
                .orElseThrow(StockNotFoundException::new);

        StocksHoldings stockHolding = stockHoldingRepository.findByMemberIdAndStockId(memberId, stock.getId()).
                orElseThrow(StockHoldingNotFoundException::new);

        StocksPriceLiveRedis stocksPriceLiveRedis = stocksPriceLiveRedisRepository.findById(stockTransactionRequestDto.getStockCode())
                .orElseThrow(StockNotFoundException::new);

        Long currentPrice = stocksPriceLiveRedis.getStckPrpr();
        Long sellAmount = stockTransactionRequestDto.getStockTransactionAmount();
        Long totalPrice = currentPrice * sellAmount;

        validateSellStockAmount(stockTransactionRequestDto.getStockTransactionAmount(), stockHolding);

        // MemberService 포인트 증가(반환) 로직
        // 이때 돌려줄 포인트는 totalPrice (현재 가격 * 판매 수량)

        // 보유한 모든 수량 판매
        if(stockHolding.getStockHoldingBuyAmount().equals(stockTransactionRequestDto.getStockTransactionAmount())){
            stockHoldingRepository.delete(stockHolding);
        // 보유한 일부 수량 판매
        } else {
            stockHolding.update(sellAmount, totalPrice, stockTransactionRequestDto.getStockTransactionType());
        }

        // 주식 매도 거래 내역 저장
        StocksTransactions stocksTransactions = new StocksTransactions(memberId,
                stock,
                sellAmount,
                currentPrice,
                stockTransactionRequestDto.getStockTransactionType(),
                LocalDateTime.now());
        stockTransactionRepository.save(stocksTransactions);
    }

    /**
     * 보유 주식 수량 검증 메소드
     * @param sellAmount
     * @param stockHolding
     */
    private void validateSellStockAmount(Long sellAmount, StocksHoldings stockHolding) {
        if (stockHolding.getStockHoldingBuyAmount() < sellAmount) {
            throw new OverSellLimitException();
        }
    }

}
