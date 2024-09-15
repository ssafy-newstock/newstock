package com.ssafy.member.domain.controller;

import com.ssafy.member.domain.controller.response.MemberVerifyResponse;
import com.ssafy.member.domain.entity.dto.MemberDetailDto;
import com.ssafy.member.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.member.global.common.CommonResponse.success;


@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
    private final ModelMapper modelMapper;
    private final MemberService memberService;

    @GetMapping("/verify")
    public ResponseEntity<?> verify(String token) {
        Long memberIdInToken = memberService.checkAuthentication(token);
        MemberDetailDto memberDetail = memberService.getMemberDetail(memberIdInToken);

        MemberVerifyResponse response = modelMapper.map(memberDetail, MemberVerifyResponse.class);

        return ResponseEntity.ok(success(response));
    }

}

