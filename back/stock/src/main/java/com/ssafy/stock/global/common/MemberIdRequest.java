package com.ssafy.stock.global.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberIdRequest {
    private final String token;
}
