package com.ssafy.stock.global.common;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Data
public class MemberIdRequest {
    private final String token;
}
