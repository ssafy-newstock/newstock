package com.ssafy.member.domain.service;

import com.ssafy.member.domain.entity.Member;
import com.ssafy.member.domain.entity.dto.MemberChangeRateDto;
import com.ssafy.member.domain.repository.MemberRepository;
import com.ssafy.member.domain.service.cllient.StockClient;
import com.ssafy.member.global.common.CommonResponse;
import com.ssafy.member.global.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberRankScheduler {

    private final MemberRepository memberRepository;
    private final StockClient stockClient;

    @Transactional
    @Scheduled(cron = "0 0 * * * *")
    public void getMemberChangeRate() {
        List<Member> memberList = memberRepository.findAll();

        Map<Long, Member> memberMap = memberList.stream()
                .collect(Collectors.toMap(Member::getId, member -> member));

        List<Long> memberIdList = new ArrayList<>(memberMap.keySet());
        CommonResponse<List<MemberChangeRateDto>> memberChangeRateResponse = stockClient.getMemberChangeRate(memberIdList);
        List<MemberChangeRateDto> responses = memberChangeRateResponse.getData();

        responses.forEach(response -> {
            Member member = memberMap.get(response.getMemberId());

            if (member != null) {
                member.updateMemberChangeRate(response.getChangeRate());
            } else {
                throw new MemberNotFoundException(response.getMemberId());
            }
        });
    }
}
