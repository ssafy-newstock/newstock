package com.ssafy.auth.domain.controller.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberExistResponse {
    private boolean exists;
    private Long memberId;
}
