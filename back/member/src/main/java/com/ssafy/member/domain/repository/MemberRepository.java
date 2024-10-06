package com.ssafy.member.domain.repository;


import com.ssafy.member.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByProviderEmail(String providerEmail);
    Optional<Member> findByMemberNameAndProviderEmail(String memberName, String providerEmail);
    boolean existsByMemberNameAndProviderEmail(String memberName, String providerEmail);

    @Query("SELECT m.id " +
            "FROM Member m ")
    List<Long> findAllId();

    @Query("SELECT m " +
            "FROM Member m " +
            "ORDER BY m.changeRate DESC " +
            "LIMIT 10 ")
    List<Member> getTopFiveRank();
}