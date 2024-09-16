package com.ssafy.member.domain.controller;

import com.ssafy.member.domain.controller.request.MemberPointUpdateRequest;
import com.ssafy.member.domain.controller.response.MemberGetPointResponse;
import com.ssafy.member.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    /**
     * 해당 멤버가 가진 포인트를 확인할 수 있는 컨트롤러
     *
     * @param memberId 멤버 아이디
     * @return 200, MemberGetPointResponse
     */
    @GetMapping("/point/{memberId}")
    public ResponseEntity<?> myPoint(@PathVariable Long memberId) {
        Long myPoint = memberService.getMyPoint(memberId);

        MemberGetPointResponse response = new MemberGetPointResponse(memberId, myPoint);
        return ResponseEntity.ok(response);
    }


    /**
     * 해당 멤버가 가진 포인트를 업데이트 할 수 있는 컨트롤러
     *
     * @param request
     * @return 204, no-content
     */
    @PutMapping("/point/{memberId}")
    public ResponseEntity<?> updateMyPoint(@PathVariable Long memberId, @RequestBody MemberPointUpdateRequest request) {
        memberService.updateMyPoint(memberId, request.getPoint());
        return ResponseEntity
                .noContent()
                .build();
    }


}

