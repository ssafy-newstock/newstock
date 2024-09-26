package com.ssafy.stock.global.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stock.domain.entity.Redis.StocksPriceLiveRedis;
import com.ssafy.stock.domain.repository.StocksPriceLiveRedisRepository;
import com.ssafy.stock.domain.service.helper.StockConverter;
import com.ssafy.stock.domain.service.response.StockPricesResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@RequiredArgsConstructor
public class KISSocketHandler extends TextWebSocketHandler {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final StockConverter stockConverter;
    private final StocksPriceLiveRedisRepository stocksPriceLiveRedisRepository;


    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    public static Map<String, List<String>> stockNameMap = Map.of(
            "005930", List.of("삼성전자", "전기전자"),
            "000660", List.of("SK하이닉스", "전기전자"),
            "373220", List.of("LG에너지솔루션", "전기전자"),
            "005380", List.of("현대차", "운수장비"),
            "000270", List.of("기아", "운수장비"),
            "105560", List.of("KB금융", "기타금융"),
            "055550", List.of("신한지주", "기타금융"),
            "035420", List.of("NAVER", "서비스업"),
            "035720", List.of("카카오", "서비스업"),
            "068270", List.of("셀트리온", "의약품")
    );

    /**
     * 국내주식 실시간체결가 웹소켓 통신 요청 메소드
     * @param session
     * @throws Exception
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);

        for (String stockCode : stockNameMap.keySet()) {
            Map<String, Object> request = stockConverter.setKisWebSocketRequest(stockCode);

            ObjectMapper objectMapper = new ObjectMapper();
            String requestJson = objectMapper.writeValueAsString(request);

            session.sendMessage(new TextMessage(requestJson));
            log.info("구독 요청 메시지 전송 (종목 코드: {}): {}", stockCode, requestJson);
            Thread.sleep(500);
        }
    }

    /**
     * 국내주식 실시간체결가 응답 핸들링 메소드
     * @param session
     * @param message
     * @throws Exception
     * @pub("/sub/stock/info/live") 종목 코드, 종목 이름, 주식 현재가, 전일 대비, 전일 대비율 전송
     */
    @Transactional
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String payload = message.getPayload().toString();

        // 파이프(|)로 구분된 값들로 분리
        String[] values = payload.split("\\|");

        if (values.length > 3) {
            String dataSection = values[3];
            String[] subValues = dataSection.split("\\^");

            String stockCode = subValues[0];// 종목 코드
            List<String> stockInfo = stockNameMap.get(stockCode);
            String stockName = stockInfo.get(0);    // 종목 이름
            String stockIndustry = stockInfo.get(1);    // 종목 카테고리
            Long stckPrpr = Long.parseLong(subValues[2]); // 주식 현재가
            Long prdyVrss = Long.parseLong(subValues[4]); // 전일 대비
            Double prdyCtrt = Double.parseDouble(subValues[5]); // 전일 대비율
            Long acmlVol = Long.parseLong(subValues[13]); // 누적 거래량
            Long acmlTrPbmn = Long.parseLong(subValues[14]); // 누적 거래 대금

            Optional<StocksPriceLiveRedis> stocksPriceLiveRedis = stocksPriceLiveRedisRepository.findById(stockCode);
            if (stocksPriceLiveRedis.isPresent()) {
                StocksPriceLiveRedis stock = stocksPriceLiveRedis.get();
                stock.update(stockCode, stockName, stockIndustry, stckPrpr, prdyVrss, prdyCtrt, acmlTrPbmn, acmlVol);
                stocksPriceLiveRedisRepository.save(stock);

            } else {
                stocksPriceLiveRedisRepository.save(new StocksPriceLiveRedis(stockCode, stockName, stockIndustry, stckPrpr, prdyVrss, prdyCtrt, acmlTrPbmn, acmlVol));
            }

            StockPricesResponseDto stockPricesResponseDto = stockConverter.convertToStockPriceResponseDto(stockCode, stockName, stockIndustry, stckPrpr, prdyVrss, prdyCtrt, acmlTrPbmn, acmlVol);
            // log.info("{}", stockPricesResponseDto);
            simpMessageSendingOperations.convertAndSend("/api/sub/stock/info/live", stockPricesResponseDto);
        } else {
            log.info("Top10 응답 payload : {}", payload);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 상태 코드 확인
        int statusCode = status.getCode();

        if (statusCode == CloseStatus.NORMAL.getCode()) {
            log.info("정상적으로 웹소켓 연결이 종료되었습니다.");
        } else if (statusCode == CloseStatus.SESSION_NOT_RELIABLE.getCode()) {
            log.warn("웹소켓 세션이 안정적이지 않아 연결이 종료되었습니다.");
        } else {
            log.error("웹소켓 연결이 비정상적으로 종료되었습니다. 상태 코드: {}, 이유: {}", statusCode, status.getReason());
        }
        // 연결 종료 시 처리
        // sessions.remove(session);
        log.info("한국투자 증권 웹소켓 연결 종료 : {}", status.getReason());
    }
}
