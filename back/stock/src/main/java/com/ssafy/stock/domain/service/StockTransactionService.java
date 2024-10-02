package com.ssafy.stock.domain.service;

import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import com.ssafy.stock.domain.entity.Redis.StocksPriceRedis;
import com.ssafy.stock.domain.entity.Stocks;
import com.ssafy.stock.domain.entity.StocksHoldings;
import com.ssafy.stock.domain.entity.StocksTransactions;
import com.ssafy.stock.domain.error.custom.MemberIdNotFoundException;
import com.ssafy.stock.domain.error.custom.OverSellLimitException;
import com.ssafy.stock.domain.error.custom.StockHoldingNotFoundException;
import com.ssafy.stock.domain.error.custom.StockNotFoundException;
import com.ssafy.stock.domain.repository.*;
import com.ssafy.stock.domain.repository.redis.StocksPriceLiveRedisRepository;
import com.ssafy.stock.domain.repository.redis.StocksPriceRedisRepository;
import com.ssafy.stock.domain.service.request.MemberPointUpdateRequest;
import com.ssafy.stock.domain.service.request.StockTransactionRequest;
import com.ssafy.stock.domain.service.response.StockTransactionDto;
import com.ssafy.stock.global.common.MemberIdRequest;
import com.ssafy.stock.global.common.MemberIdResponse;
import com.ssafy.stock.global.handler.KISSocketHandler;
import com.ssafy.stock.global.util.AuthFeignClient;
import com.ssafy.stock.global.util.MemberFeignClient;
import feign.FeignException;
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
    private final StocksPriceRedisRepository stocksPriceRedisRepository;
    private final StocksPriceLiveRedisRepository stocksPriceLiveRedisRepository;
    private final StockHoldingRepository stockHoldingRepository;
    private final StockTransactionRepository stockTransactionRepository;
    private final MemberFeignClient memberFeignClient;
    private final AuthFeignClient authFeignClient;


    @Transactional
    public StockTransactionDto buyStock(Long memberId, StockTransactionRequest stockTransactionRequest) {
        Stocks stock = stocksRepository.findByStockCode(stockTransactionRequest.getStockCode())
                .orElseThrow(StockNotFoundException::new);

        Long currentPrice = getCurrentPrice(stockTransactionRequest.getStockCode()); // 현재 가격
        Long buyAmount = stockTransactionRequest.getStockTransactionAmount();   // 구매 수
        Long totalPrice = currentPrice * buyAmount; // 총 가격

        // MemberService 구매 가능 여부 확인(보유 포인트 >= totalPrice) 및 보유 포인트 차감
        try{
            memberFeignClient.updateBuyingPoints(memberId, new MemberPointUpdateRequest(totalPrice));
        } catch (FeignException feignException){
            log.error("주식 구매 중 Member 포인트 차감 진행 중 오류 발생 : {}", feignException.getMessage());
            throw new RuntimeException("주식 구매 중 Member 포인트 차감 진행 중 임시 오류 메세지");
        }


        // 주식 보유(StocksHoldings) 저장
        stockHoldingRepository.findByMemberIdAndStockId(memberId, stock.getId())
                .ifPresentOrElse(
                        // StocksHolding 객체가 존재하는 경우 (해당 주식을 보유하고 있음)
                        existingStockHolding -> {
                            existingStockHolding.update(buyAmount, currentPrice, stockTransactionRequest.getStockTransactionType());
                            log.info("주식 보유 정보 매수 업데이트: Member ID = {}, Stock Code = {}, 구매 수량 = {}, 현재 가격 = {}", memberId, stock.getStockCode(), buyAmount, currentPrice);
                        },
                        // StocksHolding 객체가 존재하지 않는 경우 (해당 주식을 보유하고 있지 않음)
                        () -> {
                            StocksHoldings newStockHolding = new StocksHoldings(memberId, stock, buyAmount, currentPrice);
                            stockHoldingRepository.save(newStockHolding);
                            log.info("새 주식 보유 정보 생성: Member ID = {}, Stock Code = {}, 구매 수량 = {}, 현재 가격 = {}", memberId, stock.getStockCode(), buyAmount, currentPrice);
                        }
                );


        // 주식 매수 거래 내역 저장
        StocksTransactions stocksTransactions = new StocksTransactions(memberId,
                stock,
                buyAmount,
                currentPrice,
                stockTransactionRequest.getStockTransactionType(),
                LocalDateTime.now());
        stockTransactionRepository.save(stocksTransactions);
        log.info("주식 매수 거래 내역 저장: Member ID = {}, Stock Code = {}, 구매 수량 = {}, 현재 가격 = {}", memberId, stock.getStockCode(), buyAmount, currentPrice);

        return StockTransactionDto.of(stocksTransactions, totalPrice);
    }

    @Transactional
    public StockTransactionDto sellStock(Long memberId, StockTransactionRequest stockTransactionRequest) {
        Stocks stock = stocksRepository.findByStockCode(stockTransactionRequest.getStockCode())
                .orElseThrow(StockNotFoundException::new);

        StocksHoldings stockHolding = stockHoldingRepository.findByMemberIdAndStockId(memberId, stock.getId()).
                orElseThrow(StockHoldingNotFoundException::new);


        Long currentPrice = getCurrentPrice(stockTransactionRequest.getStockCode()); // 현재 가격
        Long sellAmount = stockTransactionRequest.getStockTransactionAmount();   // 판매 수
        Long totalPrice = currentPrice * sellAmount; // 총 가격

        validateSellStockAmount(stockTransactionRequest.getStockTransactionAmount(), stockHolding);

        // MemberService 포인트 증가(반환) 로직
        // 이때 돌려줄 포인트는 totalPrice (현재 가격 * 판매 수량)
        try{
            memberFeignClient.updateSellingPoints(memberId, new MemberPointUpdateRequest(totalPrice));
        } catch (FeignException feignException){
            log.error("주식 판매 중 Member 포인트 추가 진행 중 오류 발생 : {}", feignException.getMessage());
            throw new RuntimeException("주식 판매 중 Member 포인트 차감 진행 중 임시 오류 메세지");
        }

        // 보유한 모든 수량 판매
        if(stockHolding.getStockHoldingBuyAmount().equals(stockTransactionRequest.getStockTransactionAmount())){
            stockHoldingRepository.delete(stockHolding);
            log.info("전체 주식 판매: Member ID = {}, Stock Code = {}, 판매 수량 = {}, 현재 가격 = {}", memberId, stock.getStockCode(), sellAmount, currentPrice);
        // 보유한 일부 수량 판매
        } else {
            stockHolding.update(sellAmount, totalPrice, stockTransactionRequest.getStockTransactionType());
            log.info("부분 주식 판매: Member ID = {}, Stock Code = {}, 판매 수량 = {}, 현재 가격 = {}", memberId, stock.getStockCode(), sellAmount, currentPrice);
        }

        // 주식 매도 거래 내역 저장
        StocksTransactions stocksTransactions = new StocksTransactions(memberId,
                stock,
                sellAmount,
                currentPrice,
                stockTransactionRequest.getStockTransactionType(),
                LocalDateTime.now());
        stockTransactionRepository.save(stocksTransactions);
        log.info("주식 매도 거래 내역 저장: Member ID = {}, Stock Code = {}, 판매 수량 = {}, 현재 가격 = {}", memberId, stock.getStockCode(), sellAmount, currentPrice);

        return StockTransactionDto.of(stocksTransactions, totalPrice);
    }

    /**
     * StockCode 를 통해 해당 주식 현재가 조회
     * @param stockCode
     * @return
     */
    public Long getCurrentPrice(String stockCode) {
        Long currentPrice = null;
        // 주식 현재가 Redis 조회
        // TOP10 주식
        if (KISSocketHandler.stockNameMap.containsKey(stockCode)) {
            StocksPriceLiveRedis stocksPriceLiveRedis = stocksPriceLiveRedisRepository.findById(stockCode)
                    .orElseThrow(StockNotFoundException::new);
            currentPrice = stocksPriceLiveRedis.getStckPrpr(); // 현재 가격
        // 나머지 코스피 주식 전체
        } else {
            StocksPriceRedis stocksPriceRedis = stocksPriceRedisRepository.findById(stockCode)
                    .orElseThrow(StockNotFoundException::new);
            currentPrice = stocksPriceRedis.getStckPrpr(); // 현재 가격
        }

        // Redis 조회 실패시 DBMS 조회
        if(currentPrice == null){
            Stocks stock = stocksRepository.findByStockCodeWithStockPrice(stockCode)
                    .orElseThrow(StockNotFoundException::new);
            currentPrice = stock.getStockPrice().getStckPrpr();
        }

        return currentPrice;
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

    /**
     * Member 서비스에게 MemberId 요청 메소드
     * @param token
     * @return
     */
    public Long getMemberId(String token){
        MemberIdResponse body = authFeignClient.getMemberId(new MemberIdRequest(token));
        log.info("body={}", body);
        if (body == null || body.getMemberId() == null) {
            throw new MemberIdNotFoundException();
        }
        return body.getMemberId();
    }

}
