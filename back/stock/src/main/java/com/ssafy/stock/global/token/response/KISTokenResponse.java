package com.ssafy.stock.global.token.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class KISTokenResponse {

    @JsonProperty("access_token")
    private final String accessToken;

    @JsonProperty("access_token_token_expired")
    private final String accessTokenTokenExpired;

    @JsonProperty("token_type")
    private final String tokenType;

    @JsonProperty("expires_in")
    private final int expiresIn;
}
