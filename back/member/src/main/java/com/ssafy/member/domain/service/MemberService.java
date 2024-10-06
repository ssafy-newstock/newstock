package com.ssafy.member.domain.service;


import com.ssafy.member.domain.controller.response.MemberPointResponse;
import com.ssafy.member.domain.entity.Member;
import com.ssafy.member.domain.entity.dto.MemberDetailDto;
import com.ssafy.member.domain.entity.dto.MemberRankDto;
import com.ssafy.member.domain.repository.MemberRepository;
import com.ssafy.member.global.exception.MemberNotFoundException;
import com.ssafy.member.global.exception.NotEnoughPointsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    /*
        member 찾는 부분 메소드화
     */
    public Member findMember(Long memberId) {
        return memberRepository
                .findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));
    }


    public MemberDetailDto findByNameAndEmail(String name, String email) {
        Member findMember = memberRepository.findByMemberNameAndProviderEmail(name, email)
                .orElseThrow(() -> new MemberNotFoundException(name, email));
        return MemberDetailDto.of(findMember);
    }

    public Optional<Long> isExistMember(String memberName, String providerEmail) {
        return memberRepository.findByMemberNameAndProviderEmail(memberName, providerEmail)
                .map(Member::getId);
    }

    @Transactional
    public MemberDetailDto joinMember(
            String memberName,
            String provider,
            String providerEmail,
            String profileImageUrl) {

        log.info("입력받은 파라미터 = {}, {}, {}, {}", memberName, provider, providerEmail, profileImageUrl);
        Member member = new Member(memberName, provider, providerEmail, profileImageUrl);
        memberRepository.save(member);

        return MemberDetailDto.of(member);
    }

    /**
     * 해당 멤버가 가진 포인트를 반환해주는 메소드
     *
     * @param memberId 멤버 아이디
     * @return 가진 포인트
     */
    public Long getMyPoint(Long memberId) {
        Member member = findMember(memberId);

        return member.getPoint();
    }

    /**
     * 해당 멤버가 가진 포인트를 업데이트하는 메소드
     *
     * @param memberId 멤버 아이디
     * @param point    변경할 포인트 값
     */
    @Transactional
    public void updateMyPoint(Long memberId, Long point) {
        Member member = findMember(memberId);
        member.updateMemberPoint(point);
        simpMessageSendingOperations.convertAndSend("/api/sub/member/info/point/" + memberId, point);
    }

    @Transactional
    public void increaseMyPoint(Long memberId, Long point) {
        Member member = findMember(memberId);
        member.increaseMemberPoint(point);
        MemberPointResponse memberPointResponse = new MemberPointResponse(memberId, point);
        simpMessageSendingOperations.convertAndSend("/api/sub/member/info/point/increase/" + memberId, memberPointResponse);
    }

    /**
     * 주식이 매수되었을 때 포인트를 업데이트하는 메소드
     *
     * @param memberId        멤버 아이디
     * @param orderTotalPrice 총 주문 금액
     * @return member
     */
    @Transactional
    public Member buyStock(Long memberId, Long orderTotalPrice) {
        log.info("MemberService.buyStock parameter = {}, {}", memberId, orderTotalPrice);
        Member member = findMember(memberId);
        Long nowPoint = member.getPoint();

        // 현재 가진 포인트가 주문 금액보다 작은 경우
        if (nowPoint < orderTotalPrice) {
            throw new NotEnoughPointsException(memberId);
        }

        // 주문이 가능한 경우 포인트를 차감함
        long remainPoint = nowPoint - orderTotalPrice;
        member.updateMemberPoint(remainPoint);
        simpMessageSendingOperations.convertAndSend("/api/sub/member/info/point/" + memberId, remainPoint);
        return member;
    }

    /**
     * 주식이 매도되었을 때 포인트를 업데이트하는 메소드
     *
     * @param memberId        멤버 아이디
     * @param orderTotalPrice 총 반환 금액
     * @return member
     */
    @Transactional
    public Member sellStock(Long memberId, Long orderTotalPrice) {
        log.info("MemberService.sellStock parameter = {}, {}", memberId, orderTotalPrice);
        Member member = findMember(memberId);
        Long nowPoint = member.getPoint();

        // 매도가 성공한 경우 포인트를 업데이트 함
        long totalPoint = nowPoint + orderTotalPrice;
        member.updateMemberPoint(totalPoint);
        simpMessageSendingOperations.convertAndSend("/api/sub/member/info/point/" + memberId, totalPoint);
        return member;
    }

    /**
     * 보유 수익률 랭킹 10명
     * @return List<MemberRankDto>
     */
    public List<MemberRankDto> getHoldingRank(){
        List<Member> holdingRankList = memberRepository.getHoldingRank();

        return holdingRankList.stream()
                .map(transactionRank -> {
                    return new MemberRankDto(transactionRank.getId(),
                                                transactionRank.getMemberName(),
                                                transactionRank.getHoldingChangeRate());
                }).toList();
    }

    /**
     * 매매 수익률 랭킹 10명
     * @return List<MemberRankDto>
     */
    public List<MemberRankDto> getTransactionRank(){
        List<Member> transactionRankList = memberRepository.getTransactionRank();

        return transactionRankList.stream()
                .map(transactionRank -> {
                    return new MemberRankDto(transactionRank.getId(),
                            transactionRank.getMemberName(),
                            transactionRank.getHoldingChangeRate());
                }).toList();
    }
}
