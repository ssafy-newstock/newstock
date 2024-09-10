package com.ssafy.stock.global.token;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stock.global.token.response.KISTokenResponse;
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

    /**
     * 오전 08시 30분 한국투자증권 API key 갱신 스케줄러
     * @throws JsonProcessingException
     */
    @Scheduled(cron = "0 30 8 * * ?")
    public void getToken() throws JsonProcessingException {
        // 갱신할 두 개의 토큰을 각각 요청
        refreshToken(APP_KEY1, APP_SECRET1);
        refreshToken(APP_KEY2, APP_SECRET2);
    }

    /**
     * 주어진 APP_KEY와 APP_SECRET로 토큰을 갱신합니다.
     * @param appKey    API Key
     * @param appSecret API Secret
     * @throws JsonProcessingException
     */
    private void refreshToken(String appKey, String appSecret) throws JsonProcessingException {
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
                    System.out.println("Access Token 발급 성공 (Key: " + appKey + "): " + accessToken);
                } else {
                    System.err.println("응답 본문이 null입니다.");
                }
            } else {
                System.err.println("Access Token 발급 실패 (Key: " + appKey + "): " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.err.println("API 요청 중 오류 발생 (Key: " + appKey + "): " + e.getMessage());
        }
    }
}
