package com.ssafy.stock.domain.service.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MemberIdListRequest {
    List<Long> memberIdList;
}
