package com.ssafy.favorite.global.common;


import com.ssafy.favorite.domain.service.client.AuthClient;
import com.ssafy.favorite.domain.service.client.request.MemberIdRequest;
import com.ssafy.favorite.domain.service.client.response.MemberIdResponse;
import com.ssafy.favorite.global.exception.MemberIdNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class TokenProvider {
    private final AuthClient authClient;

    public Long getMemberId(String token) {
        MemberIdResponse body = authClient.getMemberId(new MemberIdRequest(token));
        log.info("body={}", body);
        if (body == null || body.getMemberId() == null) {
            throw new MemberIdNotFoundException();
        }
        return body.getMemberId();
    }
}
