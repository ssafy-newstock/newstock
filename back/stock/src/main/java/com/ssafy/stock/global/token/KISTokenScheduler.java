package com.ssafy.stock.global.token;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stock.global.token.response.KISTokenResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class KISTokenScheduler {

    private final RestTemplate restTemplate;
    private final KISTokenService tokenService;

    @Value("${KIS_TOKEN_URL}")
    private String KIS_TOKEN_URL;

    @Value("${APP_KEY1}")
    private String APP_KEY1;

    @Value("${APP_SECRET1}")
    private String APP_SECRET1;

    @Value("${APP_KEY2}")
    private String APP_KEY2;

    @Value("${APP_SECRET2}")
    private String APP_SECRET2;

    @Value("${APP_KEY3}")
    private String APP_KEY3;

    @Value("${APP_SECRET3}")
    private String APP_SECRET3;

    /**
     * 애플리케이션 시작 시 한국투자증권 accssToken 초기화 작업
     * @throws JsonProcessingException
     */
    @PostConstruct
    public void init() throws JsonProcessingException {
        log.info("애플리케이션 시작 시 토큰 갱신 시작");
        refreshToken("token1", APP_KEY1, APP_SECRET1);
        refreshToken("token2", APP_KEY2, APP_SECRET2);
        refreshToken("token3", APP_KEY3, APP_SECRET3);
    }

    /**
     * 오전 08시 30분 한국투자증권 API key 갱신 스케줄러
     * @throws JsonProcessingException
     */
    @Scheduled(cron = "0 30 8 * * ?")
    public void getToken() throws JsonProcessingException {
        // 갱신할 세 개의 토큰을 각각 요청
        refreshToken("token1", APP_KEY1, APP_SECRET1);
        refreshToken("token2", APP_KEY2, APP_SECRET2);
        refreshToken("token3", APP_KEY3, APP_SECRET3);
    }

    /**
     * 주어진 APP_KEY와 APP_SECRET로 토큰을 갱신합니다.
     * @param tokenName  토큰 이름 (예: "token1", "token2")
     * @param appKey    API Key
     * @param appSecret API Secret
     * @throws JsonProcessingException
     */
    private void refreshToken(String tokenName, String appKey, String appSecret) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("grant_type", "client_credentials");
        body.put("appkey", appKey);
        body.put("appsecret", appSecret);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(body);

        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

        try {
            ResponseEntity<KISTokenResponse> response = restTemplate.exchange(
                    KIS_TOKEN_URL, HttpMethod.POST, request, KISTokenResponse.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                KISTokenResponse tokenResponse = response.getBody();
                if (tokenResponse != null) {
                    String accessToken = tokenResponse.getAccessToken();
                    tokenService.setAccessToken(tokenName, accessToken); // 암호화하여 저장
                    log.info("08:30 스케줄러 : {} 갱신 성공", tokenName);
                } else {
                    log.info("response가 null입니다.");
                }
            } else {
                log.info("AccessToken 갱신 실패");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.info("AccessToken API 요청 오류");
        }
    }
}
