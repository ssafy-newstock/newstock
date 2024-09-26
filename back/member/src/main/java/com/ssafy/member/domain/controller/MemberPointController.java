package com.ssafy.member.domain.controller;

import com.ssafy.member.domain.controller.request.MemberPointRequest;
import com.ssafy.member.domain.entity.Member;
import com.ssafy.member.domain.repository.MemberRepository;
import com.ssafy.member.global.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MemberPointController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final MemberRepository memberRepository;

    @MessageMapping("/api/pub/member/info/point")
    @SendTo("/api/sub/member/info/point")
    public Long sendMemberPoint(MemberPointRequest request) {
        // request에서 memberId로 포인트 조회
        Long memberId = request.getMemberId();
        Long point = findMemberPointById(memberId); // 포인트 조회 로직
        messagingTemplate.convertAndSend("/api/sub/member/info/point", point);

        return point;  // 클라이언트에게 포인트 정보 전송
    }

    private Long findMemberPointById(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));
        return member.getPoint();
    }
}

