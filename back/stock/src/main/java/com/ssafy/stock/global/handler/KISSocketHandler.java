package com.ssafy.stock.global.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stock.domain.service.helper.StockConverter;
import com.ssafy.stock.domain.service.response.StockPricesResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@RequiredArgsConstructor
public class KISSocketHandler extends TextWebSocketHandler {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final StockConverter stockConverter;
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private final Map<String, String> stockNameMap = Map.of(
            "005930", "삼성전자",
            "000660", "SK하이닉스",
            "373220", "LG에너지솔루션",
            "005380", "현대차",
            "000270", "기아",
            "105560", "KB금융",
            "055550", "신한지주",
            "035420", "NAVER",
            "035720", "카카오",
            "068270", "셀트리온"
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
        }
    }

    /**
     * 국내주식 실시간체결가 응답 핸들링 메소드
     * @param session
     * @param message
     * @throws Exception
     * @pub("/api/sub/stock/info/live") 종목 코드, 종목 이름, 주식 현재가, 전일 대비, 전일 대비율 전송
     */
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String payload = message.getPayload().toString();

        // 파이프(|)로 구분된 값들로 분리
        String[] values = payload.split("\\|");

        if (values.length > 3) {
            String dataSection = values[3];
            String[] subValues = dataSection.split("\\^");

            String stockCode = subValues[0];// 종목 코드
            String stockName = stockNameMap.get(stockCode); // 종목 이름
            String stckPrpr = subValues[2]; // 주식 현재가
            String prdyVrss = subValues[4]; // 전일 대비
            String prdyCtrt = subValues[5]; // 전일 대비율

            StockPricesResponseDto stockPricesResponseDto = stockConverter.convertToStockPriceResponseDto(stockCode, stockName, stckPrpr, prdyVrss, prdyCtrt);

            simpMessageSendingOperations.convertAndSend("/api/sub/stock/info/live", stockPricesResponseDto);
        } else {
            log.info("{}", payload);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 연결 종료 시 처리
        sessions.remove(session);
        log.info("연결 종료 : {}", status.getReason());
    }
}
