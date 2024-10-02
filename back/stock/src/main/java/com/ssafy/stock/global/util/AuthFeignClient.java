package com.ssafy.stock.global.util;

import com.ssafy.stock.global.common.MemberIdRequest;
import com.ssafy.stock.global.common.MemberIdResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "authClient", url = "${auth-client.url}")
public interface AuthFeignClient {
    @PostMapping(value = "/token-info", consumes = "application/json", produces = "application/json")
    MemberIdResponse getMemberId(@RequestBody MemberIdRequest memberIdRequest);
}
