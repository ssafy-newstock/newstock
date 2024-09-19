package com.ssafy.auth.domain.controller.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberExistResponse {
    private boolean exists;
    private Long memberId;

    public MemberExistResponse(final boolean exists, final Long memberId) {
        this.exists = exists;
        this.memberId = memberId;
    }
}
