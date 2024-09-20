package com.ssafy.stock.global.util;

import com.ssafy.stock.domain.service.request.MemberPointUpdateRequest;
import com.ssafy.stock.global.common.MemberIdRequest;
import com.ssafy.stock.global.common.MemberIdResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "memberClient", url = "http://newstock-stock-member-service:8001/api/member")
public interface MemberFeignClient {

    @PostMapping("/{memberId}/buy")
    ResponseEntity<?> updateBuyingPoints(@PathVariable("memberId") Long memberId,
                                            @RequestBody MemberPointUpdateRequest pointRequestDto);

    @PostMapping("/{memberId}/sell")
    ResponseEntity<?> updateSellingPoints(@PathVariable("memberId") Long memberId,
                                            @RequestBody MemberPointUpdateRequest pointRequestDto);
}
