package com.ssafy.auth.global.security.token;


import com.ssafy.auth.domain.dto.CustomOAuth2User;
import com.ssafy.auth.global.exception.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
@Slf4j
public class TokenProvider {

    @Value("${jwt.key}")
    private String key;
    private SecretKey secretKey;
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60L * 24 * 30L; // 30일
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 30L; // 30일
    private static final String KEY_ROLE = "role";
    private final TokenService tokenService;

    @PostConstruct
    private void setSecretKey() {
        secretKey = Keys.hmacShaKeyFor(key.getBytes());
    }

    public String generateAccessToken(Authentication authentication) {
        Long memberId = getMemberId(authentication);
        return generateToken(authentication, ACCESS_TOKEN_EXPIRE_TIME, memberId);
    }

    public String generateRefreshToken(Authentication authentication) {
        Long memberId = getMemberId(authentication);
        String refreshToken = generateToken(authentication, REFRESH_TOKEN_EXPIRE_TIME, memberId);
        tokenService.saveOrUpdate(memberId.toString(), refreshToken);
        return refreshToken;
    }


    public Long getMemberId(Authentication authentication) {
        CustomOAuth2User principal = (CustomOAuth2User) authentication.getPrincipal();
        return principal.getMemberId();
    }

    private String generateToken(Authentication authentication, long expireTime, Long memberId) {
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + expireTime);

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining());

        return Jwts.builder()
                .subject(authentication.getName())
                .claim(KEY_ROLE, authorities)
                .claim("memberId", memberId)
                .issuedAt(now)
                .expiration(expiredDate)
                .signWith(secretKey, Jwts.SIG.HS512)
                .compact();
    }


    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token);
        List<SimpleGrantedAuthority> authorities = getAuthorities(claims);

        CustomOAuth2User principal = new CustomOAuth2User(authorities, claims, "sub", claims.get("memberId", Long.class));
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    private List<SimpleGrantedAuthority> getAuthorities(Claims claims) {
        return Collections.singletonList(new SimpleGrantedAuthority(
                claims.get(KEY_ROLE).toString()));
    }

    public String reissueAccessToken(String memberId) {
        // 만약 memberId가 존재한다면
        if (StringUtils.hasText(memberId)) {
            String refreshToken = tokenService.findByIdOrThrow(memberId).getRefreshToken();

            // 정상적인 refreshToken이다면
            // 만약 이미 만료된 accessToken으로 접근한다고 해도=> refreshToken이 없다면 => refreshToken 생성 안함!
            if (validateRefreshToken(refreshToken)) {
                // 다시 accessToken재발급해줌
                String reissueAccessToken = generateAccessToken(getAuthentication(refreshToken));
                return reissueAccessToken;
            }
        }
        return null;
    }

    public boolean validateRefreshToken(String token) {
        if (!StringUtils.hasText(token)) {
            return false;
        }
        Claims claims = parseClaims(token);
        // 토큰의 만료 여부 확인하는 코드
        return claims.getExpiration().after(new Date());
    }

    /*
        access와 refresh token의 id가 정말 같은지 확인
     */
    public boolean validateSameTokens(String accessToken, String refreshToken) {
        if (!validateAccessToken(accessToken) || !validateRefreshToken(refreshToken)) {
            return false;
        }
        return true;
//        return getMemberIdFromToken(accessToken).equals(getMemberIdFromToken(refreshToken));
//        return getAuthentication(accessToken).getMemberName()
//                .equals(getAuthentication(refreshToken).getMemberName());
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parser().verifyWith(secretKey).build()
                    .parseSignedClaims(token).getPayload();
        } catch (ExpiredJwtException e) {
            throw new TokenException("Access Token이 만료되었습니다.");
        } catch (MalformedJwtException e) {
            throw new TokenException("Access Token 형식이 잘못되었습니다.");
        } catch (SecurityException e) {
            throw new TokenException("Access Token이 손상되었습니다.");
        }
    }

    public Long getMemberIdFromToken(String token) {
        Claims claims = parseClaims(token);
        // memberId 클레임을 Long으로 변환
        return claims.get("memberId", Long.class);
    }

    public boolean validateAccessToken(String token) {
        token = stripBearerPrefix(token);
        if (!StringUtils.hasText(token)) {
            return false;
        }
        Claims claims = parseClaims(token);
        return claims.getExpiration().after(new Date());
    }

    private String stripBearerPrefix(String token) {
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return token;
    }
}