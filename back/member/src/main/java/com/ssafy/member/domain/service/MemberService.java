package com.ssafy.member.domain.service;


import com.ssafy.member.domain.repository.MemberRepository;
import com.ssafy.member.domain.entity.Member;
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
    // TODO : OAuth2Controller과 겹친 부분 utils로 빼기
    public void checkAuthentication(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        // 쿠키가 아예 존재하지 않나 확인
        if (cookies == null) {
            throw new RuntimeException("쿠키가 존재하지 않습니다.");
        }

        // 쿠키 조회
        String refreshToken = getRefreshToken(cookies);
        if (!StringUtils.hasText(refreshToken)) {
            throw new TokenException("Refresh Token이 존재하지 않습니다.");
        }

        // accessToken 조회
        String accessToken = request.getHeader("Authorization");


        // 그리고 access, refresh간 id 불일치 발생하면 처리
        if (!tokenProvider.validateSameTokens(accessToken, refreshToken)) {
            throw new TokenException("Access Token과 Refresh Token 사용자 정보 불일치합니다.");
        }

        Long memberId = tokenProvider.getMemberIdFromToken(refreshToken);
        // 레디스에서 정보 삭제
        tokenService.deleteRefreshToken(memberId.toString());

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
