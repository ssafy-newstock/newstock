package com.ssafy.auth.global.security.filter;


import com.ssafy.auth.global.constant.TokenKey;
import com.ssafy.auth.global.exception.TokenException;
import com.ssafy.auth.global.security.token.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RequiredArgsConstructor
@Slf4j
@Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String requestURI = request.getRequestURI();

        if (requestURI.startsWith("/api/auth/login") || requestURI.startsWith("/api/auth/token-info")) {
            log.info("auth 스킵, requestURI: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }
        log.info("requestURI: {}", requestURI);

        // 회원 존재 여부 체크와 회원가입은 스킵함
        if (requestURI.startsWith("/api/member/join") || requestURI.startsWith("/api/member/exist")) {
            log.info("회원 존재 여부 체크와 회원가입은 스킵함, requestURI: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }
        String accessToken = resolveToken(request);
        log.info("accessToken: {}", accessToken);
        // 1. 우선 filter을 통해 accessToken에 이상이 없을 경우
        if (tokenProvider.validateAccessToken(accessToken)) {
            log.info("AccessToken is valid!!");
            setAuthentication(accessToken); // 토큰이 유효하므로 인증 정보 설정
        }
        filterChain.doFilter(request, response);
    }

    /*
        인증정보 설정하는 메소드
     */
    private void setAuthentication(String accessToken) {
        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /*
        요청 헤더에서 토큰 추출
     */
    private String resolveToken(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        if (ObjectUtils.isEmpty(token) || !token.startsWith(TokenKey.TOKEN_PREFIX)) {
            throw new TokenException("Access Token이 존재하지 않습니다.");
        }
        return token.substring(TokenKey.TOKEN_PREFIX.length());
    }

}