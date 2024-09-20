package com.ssafy.auth.global.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.auth.global.exception.TokenException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class TokenExceptionFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            filterChain.doFilter(request, response);
        } catch (TokenException e) {
            handleTokenException(response, e);
        }
    }

    private void handleTokenException(HttpServletResponse response, TokenException e) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 상태 코드
        response.setContentType("application/json");
        String jsonResponse = objectMapper.writeValueAsString(e.getMessage());
        response.getWriter().write(jsonResponse);
    }

}