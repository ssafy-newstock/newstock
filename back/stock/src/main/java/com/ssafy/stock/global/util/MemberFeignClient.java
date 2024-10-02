package com.ssafy.stock.global.util;

import com.ssafy.stock.domain.service.request.MemberPointUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "memberClient", url = "${member-client.url}")
public interface MemberFeignClient {

    @PostMapping(value = "/{memberId}/buy", consumes = "application/json", produces = "application/json")
    ResponseEntity<?> updateBuyingPoints(@PathVariable("memberId") Long memberId,
                                            @RequestBody MemberPointUpdateRequest pointRequestDto);

    @PostMapping(value = "/{memberId}/sell", consumes = "application/json", produces = "application/json")
    ResponseEntity<?> updateSellingPoints(@PathVariable("memberId") Long memberId,
                                            @RequestBody MemberPointUpdateRequest pointRequestDto);
}
