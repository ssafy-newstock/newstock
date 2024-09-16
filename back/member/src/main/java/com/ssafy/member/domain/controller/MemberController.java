package com.ssafy.member.domain.controller;

import com.ssafy.member.domain.controller.request.MemberPointUpdateRequest;
import com.ssafy.member.domain.controller.response.MemberPointResponse;
import com.ssafy.member.domain.entity.Member;
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
    @GetMapping("{memberId}/point")
    public ResponseEntity<?> myPoint(@PathVariable Long memberId) {
        Long myPoint = memberService.getMyPoint(memberId);

        MemberPointResponse response = new MemberPointResponse(memberId, myPoint);
        return ResponseEntity.ok(response);
    }

    /**
     * 주식을 매수하였을 때 포인트를 업데이트하는 API
     * @param memberId 멤버 아이디
     * @param request MemberPointUpdateRequest
     * @return MemberPointResponse
     */
    @PostMapping("{memberId}/buy")
    public ResponseEntity<?> buyStock(
            @PathVariable Long memberId,
            @RequestBody MemberPointUpdateRequest request) {
        Member member = memberService.buyStock(memberId, request.getPoint());
        MemberPointResponse response = new MemberPointResponse(memberId, member.getPoint());
        return ResponseEntity
                .ok(response);
    }

    /**
     * 주식이 매도되었을 때, 포인트를 업데이트 하는 API
     * @param memberId 멤버 아이디
     * @param request MemberPointUpdateRequest
     * @return MemberPointResponse
     */
    @PostMapping("{memberId}/sell")
    public ResponseEntity<?> sellStock(
            @PathVariable Long memberId,
            @RequestBody MemberPointUpdateRequest request) {
        Member member = memberService.sellStock(memberId, request.getPoint());
        MemberPointResponse response = new MemberPointResponse(memberId, member.getPoint());
        return ResponseEntity
                .ok(response);
    }


}

