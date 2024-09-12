package com.ssafy.member.domain.controller;

import com.ssafy.member.domain.service.MemberProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class MemberController {
    private final MemberProducer memberProducer;

    @GetMapping("/send")
    public String sendMessage(@RequestParam("message") String message) {
        memberProducer.sendMessage(message);
        return "Message sent to Kafka: " + message;
    }
}

