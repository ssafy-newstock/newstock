package com.ssafy.member.domain.repository;


import com.ssafy.member.domain.entity.oauth.Token;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TokenRepository extends CrudRepository<Token, String> {

    Optional<Token> findByRefreshToken(String refreshToken);
}