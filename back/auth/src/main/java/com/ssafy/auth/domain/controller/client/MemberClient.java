package com.ssafy.auth.domain.controller.client;

import com.ssafy.auth.domain.controller.request.MemberJoinRequest;
import com.ssafy.auth.domain.controller.response.MemberExistResponse;
import com.ssafy.auth.domain.controller.response.MemberFindResponse;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "member-service", url = "http://newstock.info/api/member")  // Ingress를 통한 호출
//@FeignClient(name = "member-service", url = "http://localhost:8001/api/member")
// Ingress를 통한 호출
public interface MemberClient {
    @GetMapping("/exist")
    MemberExistResponse existMember(@RequestParam("memberName") String memberName,
                                    @RequestParam("providerEmail") String providerEmail);
    @PostMapping(value = "/join", consumes = "application/json", produces = "application/json")
    MemberFindResponse joinMember(@RequestBody MemberJoinRequest request);
}