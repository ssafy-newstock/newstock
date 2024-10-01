package com.ssafy.newsscrap.domain.service.client;

import com.ssafy.newsscrap.domain.service.client.request.MemberIdRequest;
import com.ssafy.newsscrap.domain.service.client.response.MemberIdResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "authClient", url = "http://newstock-stock-auth-service:8000/api/auth")
//@FeignClient(name = "authClient", url = "http://localhost:8000/api/auth")
public interface AuthClient {
    @PostMapping(value = "/token-info", consumes = "application/json", produces = "application/json")
    MemberIdResponse getMemberId(@RequestBody MemberIdRequest memberIdRequest);
}
