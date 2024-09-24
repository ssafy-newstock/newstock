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
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.*;

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

    private final Map<String, Boolean> subscribeSuccessMap = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private static final int RECONNECT_INTERVAL = 5;  // 5초 간격으로 재연결 시도

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

            // 구독 성공 여부를 초기화
            subscribeSuccessMap.put(stockCode, false);

            // 5초 후 구독 성공 여부를 확인하고 실패한 종목에 대해 재연결 시도
            scheduler.schedule(() -> {
                if (!subscribeSuccessMap.get(stockCode)) {
                    log.warn("구독 실패, 종목 코드: {} - 재연결 시도", stockCode);
                    try {
                        session.sendMessage(new TextMessage(requestJson));
                        log.info("구독 재요청 전송 (종목 코드: {})", stockCode);
                    } catch (Exception e) {
                        log.error("구독 재시도 실패, 종목 코드: {}", stockCode, e);
                    }
                }
            }, RECONNECT_INTERVAL, TimeUnit.SECONDS);
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

        // payload 길이가 3 이하일 때
        if (values.length <= 3) {
            log.info("Top10 응답 payload : {}", payload);

            // 만약 "SUCCESS"가 없다면 재연결 시도
            if (!payload.contains("SUCCESS")) {
                log.warn("구독 실패 - 재연결 시도");
                sessions.remove(session);
                afterConnectionEstablished(session);  // 재연결
            }
        }
        // payload 길이가 3보다 클 때 (정상적인 데이터 처리)
        else {
            String dataSection = values[3];
            String[] subValues = dataSection.split("\\^");

            String stockCode = subValues[0]; // 종목 코드
            List<String> stockInfo = stockNameMap.get(stockCode);
            String stockName = stockInfo.get(0);    // 종목 이름
            String stockIndustry = stockInfo.get(1);    // 종목 카테고리
            Long stckPrpr = Long.parseLong(subValues[2]); // 주식 현재가
            Long prdyVrss = Long.parseLong(subValues[4]); // 전일 대비
            Double prdyCtrt = Double.parseDouble(subValues[5]); // 전일 대비율
            Long acmlVol = Long.parseLong(subValues[13]); // 누적 거래량
            Long acmlTrPbmn = Long.parseLong(subValues[14]); // 누적 거래 대금

            // Redis에 저장
            Optional<StocksPriceLiveRedis> stocksPriceLiveRedis = stocksPriceLiveRedisRepository.findById(stockCode);
            if (stocksPriceLiveRedis.isPresent()) {
                StocksPriceLiveRedis stock = stocksPriceLiveRedis.get();
                stock.update(stockCode, stockName, stockIndustry, stckPrpr, prdyVrss, prdyCtrt, acmlTrPbmn, acmlVol);
                stocksPriceLiveRedisRepository.save(stock);
            } else {
                stocksPriceLiveRedisRepository.save(new StocksPriceLiveRedis(stockCode, stockName, stockIndustry, stckPrpr, prdyVrss, prdyCtrt, acmlTrPbmn, acmlVol));
            }

            // 성공한 경우 구독 성공 상태 업데이트
            subscribeSuccessMap.put(stockCode, true);

            StockPricesResponseDto stockPricesResponseDto = stockConverter.convertToStockPriceResponseDto(stockCode, stockName, stockIndustry, stckPrpr, prdyVrss, prdyCtrt, acmlTrPbmn, acmlVol);
            // log.info("실시간 체결가 : {}", stockPricesResponseDto);
            simpMessageSendingOperations.convertAndSend("/api/sub/stock/info/live", stockPricesResponseDto);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 연결 종료 시 처리
        sessions.remove(session);
        log.info("한국투자 증권 웹소켓 연결 종료 : {}", status.getReason());
    }
}
