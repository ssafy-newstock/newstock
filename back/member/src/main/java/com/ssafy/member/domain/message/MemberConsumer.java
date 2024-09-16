package com.ssafy.member.domain.message;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.member.domain.message.event.StockTransactionFailEvent;
import com.ssafy.member.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberConsumer {
    private final ObjectMapper objectMapper;
    private final MemberService memberService;
    @KafkaListener(topics = "stock-transaction-failed-topic", groupId = "develop")
    public void consumeMessage(Object message) {
        StockTransactionFailEvent event = objectMapper.convertValue(message, StockTransactionFailEvent.class);
        memberService.updateMyPoint(event.getMemberId(), event.getPoint());
    }
}
