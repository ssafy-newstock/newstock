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

import java.util.List;

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
        List<Long> memberIdList = memberRepository.findAllId();
        CommonResponse<?> memberChangeRate = stockClient.getMemberChangeRate(memberIdList);

        List<MemberChangeRateDto> responses = (List<MemberChangeRateDto>) memberChangeRate.getData();

        responses.forEach(response -> {
                    Member member = memberRepository.findById( response.getMemberId())
                            .orElseThrow(() -> new MemberNotFoundException( response.getMemberId()));

                    member.updateMemberChangeRate(response.getChangeRate());
                });
    }
}
