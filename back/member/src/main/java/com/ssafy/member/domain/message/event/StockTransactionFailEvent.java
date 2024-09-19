package com.ssafy.member.domain.message.event;

import lombok.Getter;

@Getter
public class StockTransactionFailEvent {
    private Long memberId;
    private Long point;
}
