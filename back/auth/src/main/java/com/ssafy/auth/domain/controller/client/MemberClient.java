package com.ssafy.auth.domain.controller.client;

import com.ssafy.auth.domain.controller.request.MemberJoinRequest;
import com.ssafy.auth.domain.controller.response.MemberExistResponse;
import com.ssafy.auth.domain.controller.response.MemberFindResponse;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "member-service", url = "${member-client.url}")  // Ingress를 통한 호출
public interface MemberClient {
    /**
     * 회원이 존재하는지 여부를 체크하는 API
     * @param memberName 멤버 이름
     * @param providerEmail 멤버 이메일
     * @return MemberExistResponse (exists, memberId)
     */
    @GetMapping("/exist")
    MemberExistResponse existMember(@RequestParam("memberName") String memberName,
                                    @RequestParam("providerEmail") String providerEmail);

    /**
     * 멤버 서비스에 가입을 요청하는 API
     * @param request MemberJoinRequest (회원 기본 정보)
     * @return 가입된 회원 정보 일부
     */
    @PostMapping(value = "/join", consumes = "application/json", produces = "application/json")
    MemberFindResponse joinMember(@RequestBody MemberJoinRequest request);
}