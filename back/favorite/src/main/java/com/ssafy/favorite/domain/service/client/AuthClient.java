package com.ssafy.favorite.domain.service.client;

import com.ssafy.favorite.domain.service.client.request.MemberIdRequest;
import com.ssafy.favorite.domain.service.client.response.MemberIdResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "authClient", url = "${auth-client.url}")
public interface AuthClient {
    @PostMapping(value = "/token-info", consumes = "application/json", produces = "application/json")
    MemberIdResponse getMemberId(@RequestBody MemberIdRequest memberIdRequest);
}
