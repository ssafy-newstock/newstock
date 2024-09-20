package com.ssafy.member.domain.controller;

import com.ssafy.member.domain.controller.request.MemberJoinRequest;
import com.ssafy.member.domain.controller.request.MemberPointUpdateRequest;
import com.ssafy.member.domain.controller.response.MemberDetailResponse;
import com.ssafy.member.domain.controller.response.MemberExistResponse;
import com.ssafy.member.domain.controller.response.MemberFindResponse;
import com.ssafy.member.domain.controller.response.MemberPointResponse;
import com.ssafy.member.domain.entity.Member;
import com.ssafy.member.domain.entity.dto.MemberDetailDto;
import com.ssafy.member.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final ModelMapper modelMapper;

    @GetMapping("/find-by-info")
    public ResponseEntity<?> findMember(@RequestParam("memberName") String memberName,
                                        @RequestParam("providerEmail") String providerEmail) {
        MemberDetailDto detailDto = memberService.findByNameAndEmail(memberName, providerEmail);
        MemberFindResponse response = modelMapper.map(detailDto, MemberFindResponse.class);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/exist")
    public ResponseEntity<?> existMember(@RequestParam("memberName") String memberName,
                                         @RequestParam("providerEmail") String providerEmail) {
        Optional<Long> existMember = memberService.isExistMember(memberName, providerEmail);
        if (existMember.isPresent()) {
            return ResponseEntity.ok(new MemberExistResponse(true, existMember.get()));
        } else {
            return ResponseEntity.ok(new MemberExistResponse(false, null));
        }
    }

    @PostMapping(value = "/join", produces = "application/json")
    public ResponseEntity<?> joinMember(@RequestBody MemberJoinRequest request) {
        memberService.joinMember(
                request.getMemberName(),
                request.getMemberProvider(),
                request.getMemberProviderEmail(),
                request.getMemberProfileImageUrl());
        MemberDetailDto detailDto = memberService.findByNameAndEmail(request.getMemberName(), request.getMemberProviderEmail());

        log.info("detailDto: {}", detailDto);
        MemberFindResponse response = modelMapper.map(detailDto, MemberFindResponse.class);
        log.info("response: {}", response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("{memberId}/detail")
    public ResponseEntity<?> getDetail(@PathVariable Long memberId) {
        Member member = memberService.findMember(memberId);

        MemberDetailResponse memberDetailResponse = MemberDetailResponse.of(member);

        return ResponseEntity.ok(memberDetailResponse);
    }

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
     *
     * @param memberId 멤버 아이디
     * @param request  MemberPointUpdateRequest
     * @return MemberPointResponse
     */
    @PostMapping("{memberId}/buy")
    public ResponseEntity<?> buyStock(
            @PathVariable Long memberId,
            @RequestBody MemberPointUpdateRequest request) {
        log.info("MemberController.buyStock = {}, {}", memberId, request.toString());
        Member member = memberService.buyStock(memberId, request.getPoint());
        MemberPointResponse response = new MemberPointResponse(memberId, member.getPoint());
        return ResponseEntity
                .ok(response);
    }

    /**
     * 주식이 매도되었을 때, 포인트를 업데이트 하는 API
     *
     * @param memberId 멤버 아이디
     * @param request  MemberPointUpdateRequest
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

