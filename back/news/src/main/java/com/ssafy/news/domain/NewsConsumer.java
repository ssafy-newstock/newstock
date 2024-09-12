package com.ssafy.news.domain;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NewsConsumer {

    @KafkaListener(topics = "news_topic", groupId = "news_group")
    public void consumeMessage(String message) {
        System.out.println("Consumed message: " + message);
        // 메시지 처리 로직
    }
}
