package com.ssafy.stock.domain.service.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberPointUpdateRequest {
    private final Long point;
}
