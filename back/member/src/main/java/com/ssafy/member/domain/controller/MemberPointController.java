package com.ssafy.member.domain.controller;

import com.ssafy.member.domain.controller.request.MemberPointRequest;
import com.ssafy.member.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MemberPointController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final MemberService memberService;

    @MessageMapping("/api/pub/member/info/point")
    public void sendMemberPoint(@Payload MemberPointRequest request) {
        // request에서 memberId로 포인트 조회
        Long memberId = request.getMemberId();
        Long point = memberService.getMyPoint(memberId); // 포인트 조회 로직
        simpMessageSendingOperations.convertAndSend("/api/sub/member/info/point/" + memberId, point);
    }

}

