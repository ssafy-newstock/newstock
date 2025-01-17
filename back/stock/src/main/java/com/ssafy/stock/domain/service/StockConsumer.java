package com.ssafy.stock.domain.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class StockConsumer {

    @KafkaListener(topics = "test_topic", groupId = "develop")
    public void consumeMessage(String message) {
        System.out.println("Consumed message: " + message);
        // 메시지 처리 로직
    }
}
