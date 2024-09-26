package com.ssafy.news.domain.service.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.news.global.util.DateTimeUtil;
import com.ssafy.news.global.util.SaltUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static com.ssafy.news.global.util.EncryptUtil.decodeBase64;

@Component
@RequiredArgsConstructor
public class HBaseClient {
    private static final String HBASE_URL = "http://j11c207a.p.ssafy.io:9090";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper;

    public Long getTimestampByKey(String rowKey) {
        String url = HBASE_URL + "/industry_news_keys/" + rowKey;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");

        try {
            // API 요청 보내기
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                // JSON 응답 파싱
                JsonNode root = objectMapper.readTree(response.getBody());

                // base64 인코딩된 값 가져오기
                String base64Value = root.path("Row").get(0).path("Cell").get(0).path("$").asText();

                // base64 디코딩
                String datetimeStr = decodeBase64(base64Value);

                // UTC 타임스탬프로 변환
                return DateTimeUtil.convertToUtcTimestamp(datetimeStr);

            } else {
                System.err.println("Error fetching data for row key " + rowKey + ": " + response.getStatusCodeValue() + ", " + response.getBody());
                return null;
            }

        } catch (IOException e) {
            System.err.println("Error parsing the response for row key " + rowKey);
            e.fillInStackTrace();
            return null;
        }
    }

    public Map<String, String> getNewsByKey(String newsType, Long timestamps, String newsIdHash, String columnFamily) {
        try {
            // salt 계산
            String salt = SaltUtil.getSalt(newsIdHash);

            // row key 생성
            String rowKey = salt + newsType + timestamps + newsIdHash;

            // HBase API 호출 URL
            String url = HBASE_URL + "/industry_news/" + rowKey;
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/json");

            // HBase REST API 호출
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            // 응답 성공 시
            if (response.getStatusCode().is2xxSuccessful()) {
                JsonNode data = objectMapper.readTree(response.getBody());
                Map<String, String> result = new HashMap<>();

                // Row 데이터가 있으면 처리
                if (data.has("Row") && data.get("Row").size() > 0) {
                    JsonNode rowData = data.get("Row").get(0);

                    for (JsonNode cell : rowData.get("Cell")) {
                        // 컬럼명 가져오기
                        String column = cell.get("column").asText();
                        String decodedColumn = decodeBase64(column);

                        // 값 가져오기
                        String value = cell.get("$").asText();
                        String decodedValue = decodeBase64(value);

                        // 컬럼 패밀리 제거 후 결과에 추가
                        String cleanColumnName = decodedColumn.replace(columnFamily + ":", "");
                        result.put(cleanColumnName, decodedValue);
                    }
                }
                return result;

            } else {
                System.err.println("Error fetching data for row key: " + response.getStatusCodeValue());
                return null;
            }

        } catch (IOException e) {
            System.err.println("Error parsing response: " + e.getMessage());
            e.fillInStackTrace();
            return null;
        }
    }
}