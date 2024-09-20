package com.ssafy.member.domain.repository;


import com.ssafy.member.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByProviderEmail(String providerEmail);
    Optional<Member> findByMemberNameAndProviderEmail(String memberName, String providerEmail);
    boolean existsByMemberNameAndProviderEmail(String memberName, String providerEmail);
}