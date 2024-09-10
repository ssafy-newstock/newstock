package com.ssafy.member.service;

import com.ssafy.member.entity.oauth.Token;
import com.ssafy.member.exception.TokenException;
import com.ssafy.member.repository.TokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class TokenService {

    private final TokenRepository tokenRepository;

    public void deleteRefreshToken(String memberKey) {
        tokenRepository.deleteById(memberKey);
    }

    /*
        refreshToken update
     */
    @Transactional
    public void saveOrUpdate(String memberKey, String refreshToken) {
        Token token = tokenRepository.findById(memberKey)
                .map(existingToken -> existingToken.updateRefreshToken(refreshToken))
                .orElseGet(() -> new Token(memberKey, refreshToken));
        tokenRepository.save(token);
    }

    /*
        memberId를 활용해서 refreshToken 찾는 것
     */
    public Token findByIdOrThrow(String memberKey) {
        return tokenRepository.findById(memberKey)
                .orElseThrow(() -> new TokenException("TOKEN_EXPIRED"));
    }
}
