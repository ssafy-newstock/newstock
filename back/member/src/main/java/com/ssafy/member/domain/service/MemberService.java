package com.ssafy.member.domain.service;


import com.ssafy.member.domain.entity.Member;
import com.ssafy.member.domain.entity.dto.MemberDetailDto;
import com.ssafy.member.domain.repository.MemberRepository;
import com.ssafy.member.global.exception.MemberNotFoundException;
import com.ssafy.member.global.exception.TokenException;
import com.ssafy.member.global.security.token.TokenProvider;
import com.ssafy.member.global.security.token.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final TokenProvider tokenProvider;
    private final TokenService tokenService;
    private final MemberRepository memberRepository;


    /*
        member 찾는 부분 메소드화
     */
    public Member findMember(Long memberId) {
        return memberRepository
                .findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("멤버가 존재하지 않습니다."));
    }


    /*
        로그아웃 => token redis에서 삭제
     */
    public Long checkAuthentication(String accessToken) {
        if (!StringUtils.hasText(accessToken)) {
            throw new TokenException("Access Token이 존재하지 않습니다.");
        }

        // AccessToken 유효성 검증
        if (!tokenProvider.validateAccessToken(accessToken)) {
            throw new TokenException("유효하지 않은 Access Token입니다.");
        }

        return tokenProvider.getMemberIdFromToken(accessToken);
    }

    public MemberDetailDto getMemberDetail(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() ->
                        new MemberNotFoundException("액세스 토큰 안의 ID를 가진 멤버를 찾을 수 없습니다."));

        return MemberDetailDto.of(member);
    }

    /*
        레디스의 refreshToken, 세션 정보 삭제
     */
    public void deleteToken(HttpServletRequest request, HttpServletResponse response) {

        // refreshToken 쿠키 삭제
        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setMaxAge(0); // 쿠키의 유효 기간을 0으로 설정하여 삭제
        refreshTokenCookie.setPath("/"); // 쿠키가 유효한 경로 설정
        response.addCookie(refreshTokenCookie);

    }

    /*
    쿠키에서 refreshToken 찾아주는 코드
 */
    public String getRefreshToken(Cookie[] cookies) {
        String refreshToken = "";
        for (Cookie cookie : cookies) {
            if ("refreshToken".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
                break;
            }
        }
        return refreshToken;
    }

}
