package com.ssafy.stock.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.socket.client.WebSocketConnectionManager;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class KISWebSocketScheduleConfig {

    private final WebSocketConnectionManager webSocketConnectionManager;


    // 주식 장 시작 전 웹소켓 연결 시도
    @Scheduled(cron = "0 0 9 ? * MON-FRI", zone = "Asia/Seoul")
    public void startWebSocketConnection() {
        log.info("한국투자증권 웹소켓 연결 시작");
        webSocketConnectionManager.start();
    }

    // 주식 장 종료 후 웹소켓 연결 종료
    @Scheduled(cron = "0 32 15 ? * MON-FRI", zone = "Asia/Seoul")
    public void stopWebSocketConnection() {
        log.info("한국투자증권 웹소켓 연결 종료");
        webSocketConnectionManager.stop();
    }
}
