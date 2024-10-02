package com.ssafy.member.domain.message;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.member.domain.message.event.StockTransactionFailEvent;
import com.ssafy.member.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberConsumer {
    private final ObjectMapper objectMapper;
    private final MemberService memberService;

    @KafkaListener(topics = "stock-transaction-failed-topic", groupId = "develop")
    public void consumeMessage(Object message) {
        StockTransactionFailEvent event = objectMapper.convertValue(message, StockTransactionFailEvent.class);
        memberService.updateMyPoint(event.getMemberId(), event.getPoint());
    }

    @KafkaListener(topics = "read-industry-news", groupId = "develop")
    private void handleReadIndustryNewsEvent(Map<String, Object> message){
        Long memberId = ((Number) message.get("memberId")).longValue();
        Long newsId = ((Number) message.get("industryNewsId")).longValue();

        log.info(memberId + "번 회원이 시황뉴스 " + newsId + " 번을 읽어 100,000 포인트를 얻었습니다.");
        memberService.increaseMyPoint(memberId, 100000L);
    }

    @KafkaListener(topics = "read-stock-news", groupId = "develop")
    private void handleReadStockNewsEvent(Map<String, Object> message){
        Long memberId = ((Number) message.get("memberId")).longValue();
        Long newsId = ((Number) message.get("stockNewsId")).longValue();

        log.info(memberId + "번 회원이 종목뉴스 " + newsId + " 번을 읽어 100,000 포인트를 얻었습니다.");
        memberService.increaseMyPoint(memberId, 100000L);
    }

}
