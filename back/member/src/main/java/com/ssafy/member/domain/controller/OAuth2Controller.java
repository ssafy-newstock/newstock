package com.ssafy.member.domain.controller;


import com.ssafy.member.domain.controller.response.LoginResponseDto;
import com.ssafy.member.global.security.token.TokenProvider;
import com.ssafy.member.domain.entity.Member;
import com.ssafy.member.domain.service.MemberService;
import com.ssafy.member.domain.service.OAuth2Service;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.ssafy.member.global.constant.TokenKey.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class OAuth2Controller {

    private final OAuth2Service oAuth2Service;
    private final TokenProvider tokenProvider;
    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<?> exchangeAuthorizationCode(@RequestBody Map<String, String> request, HttpServletResponse response) {
        // accessToken 발급
        String oAuthaccessToken = oAuth2Service.getAccessToken(request);
        // Retrieve user info using access token
        OAuth2User oAuth2User = oAuth2Service.loadUserByAccessToken(oAuthaccessToken, request);

        // Create OAuth2AuthenticationToken
        Authentication authentication = new OAuth2AuthenticationToken(oAuth2User, oAuth2User.getAuthorities(), "authorization");

        // accessToken, refreshToken 발급
        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        // accessToken을 HTTP 헤더에 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", TOKEN_PREFIX + " " + accessToken);

        // refreshToken을 HTTP Only 쿠키로 설정
        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true) // HTTPS에서만 사용 가능하도록 설정
                .path("/") // 쿠키가 유효한 경로 설정
                .sameSite("None")
                .maxAge(7 * 24 * 60 * 60) // 쿠키 만료 시간 설정 (예: 7일)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        // 'properties' 객체에서 'nickname'을 가져오는 과정
        @SuppressWarnings("unchecked")
        Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
        String memberName;
        if (properties == null) {
            memberName = (String) oAuth2User.getAttributes().get("name");
        } else {
            memberName = (String) properties.get("nickname");
        }

        Long memberId = tokenProvider.getMemberId(authentication);
        Member member = memberService.findMember(memberId);


        String memberProviderEmail = member.getProviderEmail();
        String memberProfileImageUrl = member.getProfileImageUrl();


        // LoginResponseDto 생성
        LoginResponseDto loginResponseDto = new LoginResponseDto(
                memberName,
                memberId,
                memberProviderEmail,
                memberProfileImageUrl);

        // 응답 반환
        return ResponseEntity.ok()
                .headers(headers)
                .body(loginResponseDto);
    }

    @GetMapping("/reissue-tokens")
    public ResponseEntity<?> reissueAllToken(HttpServletRequest request, HttpServletResponse response) {
        List<String> tokenList = oAuth2Service.reissueAllTokens(request);

        // 토큰을 리스트에서 추출
        String accessToken = tokenList.get(0);
        String refreshToken = tokenList.get(1);

        // accessToken을 HTTP 헤더에 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", TOKEN_PREFIX + " " + accessToken);

        // refreshToken을 HTTP Only 쿠키로 설정
        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true) // HTTPS에서만 사용 가능하도록 설정
                .path("/") // 쿠키가 유효한 경로 설정
                .sameSite("None")
                .maxAge(7 * 24 * 60 * 60) // 쿠키 만료 시간 설정 (예: 7일)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        // 응답 바디를 위한 객체 생성
        // 응답 반환
        return ResponseEntity.noContent()
                .headers(headers)
                .build();
    }

}