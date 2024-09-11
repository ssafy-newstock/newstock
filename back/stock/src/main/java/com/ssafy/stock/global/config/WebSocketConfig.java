package com.ssafy.stock.global.config;

import com.ssafy.stock.domain.service.helper.StockConverter;
import com.ssafy.stock.global.handler.KISSocketHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.WebSocketConnectionManager;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocket
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final StockConverter stockConverter;

    public WebSocketConfig(@Lazy SimpMessageSendingOperations simpMessageSendingOperations, @Lazy StockConverter stockConverter) {
        this.simpMessageSendingOperations = simpMessageSendingOperations;
        this.stockConverter = stockConverter;
    }

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/api/sub");
        registry.setApplicationDestinationPrefixes("/api/pub");
    }

    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.addEndpoint("/api/websocket")
                .setAllowedOrigins("http://localhost:3000",
                        "http://localhost:5173")
                .withSockJS();
    }

    @Bean
    public WebSocketConnectionManager webSocketConnectionManager() {
        WebSocketClient webSocketClient = new StandardWebSocketClient();
        WebSocketHandler handler = new KISSocketHandler(simpMessageSendingOperations, stockConverter);

        WebSocketConnectionManager manager = new WebSocketConnectionManager(webSocketClient,
                handler,
                "ws://ops.koreainvestment.com:21000");

        manager.setAutoStartup(true);  // 애플리케이션 시작 시 자동으로 웹소켓 연결
        return manager;
    }
}
