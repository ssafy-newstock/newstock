package com.ssafy.stock.domain.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stock.domain.entity.Redis.KospiChartRedis;
import com.ssafy.stock.domain.entity.Redis.KospiRedis;
import com.ssafy.stock.domain.entity.Redis.StockIndustryRedis;
import com.ssafy.stock.domain.repository.redis.KospiChartRedisRepository;
import com.ssafy.stock.domain.repository.redis.KospiRedisRepository;
import com.ssafy.stock.domain.repository.redis.StockIndustryRedisRepository;
import com.ssafy.stock.domain.service.response.KospiAndChartResponse;
import com.ssafy.stock.domain.service.response.KospiResponse;
import com.ssafy.stock.domain.service.response.StockIndustryResponse;
import com.ssafy.stock.global.token.KISTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class StockIndustryService {

    @Value("${KIS_STOCK_INDUSTRY_URL}")
    private String KIS_STOCK_INDUSTRY_URL;

    @Value("${APP_KEY3}")
    private String APP_KEY3;

    @Value("${APP_SECRET3}")
    private String APP_SECRET3;

    // 업종 코드와 이름 매핑
    private final Map<String, String> industryCodeNameMap = Map.ofEntries(
            Map.entry("0005", "음식료품"),
            Map.entry("0006", "섬유·의복"),
            Map.entry("0007", "종이·목재"),
            Map.entry("0008", "화학"),
            Map.entry("0009", "의약품"),
            Map.entry("0010", "비금속광물"),
            Map.entry("0011", "철강·금속"),
            Map.entry("0012", "기계"),
            Map.entry("0013", "전기·전자"),
            Map.entry("0014", "의료정밀"),
            Map.entry("0015", "운수·장비"),
            Map.entry("0016", "유통업"),
            Map.entry("0017", "전기·가스업"),
            Map.entry("0018", "건설업"),
            Map.entry("0019", "운수·창고"),
            Map.entry("0020", "통신업"),
            Map.entry("0021", "금융업"),
            Map.entry("0024", "증권"),
            Map.entry("0025", "보험"),
            Map.entry("0026", "서비스업"),
            Map.entry("0027", "제조업"),
            Map.entry("0001", "KOSPI"),
            Map.entry("2001", "KOSPI 200"),
            Map.entry("2007", "KOSPI 100"),
            Map.entry("2008", "KOSPI 50")
    );

    private List<String> industryCodes = new ArrayList<>(industryCodeNameMap.keySet());
    private String todayDate = LocalDate.now().toString().replace("-", "");
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final StockIndustryRedisRepository stockIndustryRedisRepository;
    private final KospiRedisRepository kospiRedisRepository;
    private final KospiChartRedisRepository kospiChartRedisRepository;
    private final KISTokenService kisTokenService;

    @Scheduled(fixedRate = 600000)   // 10분(600000) 단위 갱신
    public void fetchDailyIndexPrice() {
        RestTemplate restTemplate = new RestTemplate();
        List<String> industryCodes1 = industryCodes.subList(0, industryCodes.size() / 2);
        List<String> industryCodes2 = industryCodes.subList(industryCodes.size() / 2, industryCodes.size());

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("content-type", "application/json; charset=utf-8");
        headers.set("authorization", "Bearer " + kisTokenService.getAccessToken("token3"));
        headers.set("appkey", APP_KEY3);
        headers.set("appsecret", APP_SECRET3);
        headers.set("tr_id", "FHKUP03500100");

        ArrayList<StockIndustryResponse> stockIndustryResponses = new ArrayList<>();
        ArrayList<KospiResponse> kospiResponses = new ArrayList<>();


        fetchIndustryData(restTemplate, headers, industryCodes1, stockIndustryResponses, kospiResponses);
        fetchIndustryData(restTemplate, headers, industryCodes2, stockIndustryResponses, kospiResponses);

        List<StockIndustryRedis> stockIndustryRedisList = stockIndustryResponses.stream()
                .map(stockIndustryResponse -> new StockIndustryRedis(
                        stockIndustryResponse.getIndustryCode(),
                        stockIndustryResponse.getIndustryName(),
                        stockIndustryResponse.getBstpNmixPrpr(),
                        stockIndustryResponse.getBstpNmixPrdyVrss(),
                        stockIndustryResponse.getBstpNmixPrdyCtrt(),
                        stockIndustryResponse.getAcmlTrPbmn()
                )).collect(Collectors.toList());

        stockIndustryRedisRepository.deleteAll();
        stockIndustryRedisRepository.saveAll(stockIndustryRedisList);

        List<KospiRedis> kospiRedisList = kospiResponses.stream()
                .map(kospiResponse -> new KospiRedis(
                        kospiResponse.getIndustryCode(),
                        kospiResponse.getIndustryName(),
                        kospiResponse.getBstpNmixPrpr(),
                        kospiResponse.getBstpNmixPrdyVrss(),
                        kospiResponse.getBstpNmixPrdyCtrt()
                )).toList();

        if(isWithinTradingHours()){
            kospiResponses.forEach(kospiResponse -> {
                KospiChartRedis kospiChartRedis = new KospiChartRedis(
                        kospiResponse.getIndustryCode(),
                        kospiResponse.getIndustryName(),
                        kospiResponse.getBstpNmixPrpr());
                kospiChartRedisRepository.save(kospiChartRedis);
            });
        }

        kospiRedisRepository.deleteAll();
        kospiRedisRepository.saveAll(kospiRedisList);

        log.info("스케줄러 : 종목 카테고리 정보 갱신 성공");
        simpMessageSendingOperations.convertAndSend("/api/sub/stock/industry/info", stockIndustryResponses);
    }

    private void fetchIndustryData(RestTemplate restTemplate, HttpHeaders headers, List<String> industryCodes, ArrayList<StockIndustryResponse> stockIndustryResponses, ArrayList<KospiResponse> kospiResponses) {

        for (String industryCode : industryCodes) {
            // 쿼리 파라미터 설정
            Map<String, String> params = new HashMap<>();
            params.put("fid_cond_mrkt_div_code", "U");
            params.put("fid_input_iscd", industryCode);
            params.put("fid_input_date_1", todayDate);
            params.put("fid_input_date_2", todayDate);
            params.put("fid_period_div_code", "D");

            // 요청 생성
            HttpEntity<String> entity = new HttpEntity<>(headers);

            try {
                // GET 요청
                ResponseEntity<String> response = restTemplate.exchange(
                        KIS_STOCK_INDUSTRY_URL + "?fid_cond_mrkt_div_code={fid_cond_mrkt_div_code}&fid_input_iscd={fid_input_iscd}&fid_input_date_1={fid_input_date_1}&fid_input_date_2={fid_input_date_2}&fid_period_div_code={fid_period_div_code}",
                        HttpMethod.GET,
                        entity,
                        String.class,
                        params
                );

                // 응답 JSON 문자열
                String responseBody = response.getBody();

                // JSON 파싱
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(responseBody);
                JsonNode output1 = rootNode.path("output1");

                // 필요한 값 추출
                String bstpNmixPrpr = output1.path("bstp_nmix_prpr").asText();  // 업종 지수 현재가
                String bstpNmixPrdyVrss = output1.path("bstp_nmix_prdy_vrss").asText(); // 업종 지수 전일 대비
                String bstpNmixPrdyCtrt = output1.path("bstp_nmix_prdy_ctrt").asText(); // 업종 지수 전일 대비율
                String acmlTrPbmn = output1.path("acml_tr_pbmn").asText();  // 오늘 하루 누적 거래 대금

                // 특정 업종 코드에 따라 다른 객체 생성
                if (List.of("0001", "2001", "2007", "2008").contains(industryCode)) {
                    // KospiResponse 생성
                    KospiResponse kospiResponse = new KospiResponse(
                            industryCode,
                            industryCodeNameMap.get(industryCode),  // industryName을 추가
                            bstpNmixPrpr,
                            bstpNmixPrdyVrss,
                            bstpNmixPrdyCtrt
                    );
                    kospiResponses.add(kospiResponse);
                } else {
                    // StockIndustryResponse 생성
                    StockIndustryResponse stockIndustryResponse = new StockIndustryResponse(
                            industryCode,
                            industryCodeNameMap.get(industryCode),  // industryName을 추가
                            bstpNmixPrpr,
                            bstpNmixPrdyVrss,
                            bstpNmixPrdyCtrt,
                            acmlTrPbmn
                    );
                    stockIndustryResponses.add(stockIndustryResponse);
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        waitNextApiRequest();
    }

    /**
     * 1초 대기 메소드
     * 한국투자증권 1초 20회 API 요청 제한 조건을 만족하기 위함
     */
    private static void waitNextApiRequest() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    public Iterable<StockIndustryRedis> getStockIndustryRedisList() {
        return stockIndustryRedisRepository.findAll();
    }

    /**
     * 코스피 지수 정보 조회
     * @return
     */
    public List<KospiAndChartResponse> getKospi() {
        List<KospiRedis> kospiRedisList = kospiRedisRepository.findAll();

        return kospiRedisList.stream()
                .map(kospiRedis -> {
                    List<KospiChartRedis> kospiChartRedisList = kospiChartRedisRepository.findAllByIndustryCode(kospiRedis.getIndustryCode());
                    List<KospiChartRedis> sortKospiChart = kospiChartRedisList.stream().sorted(Comparator.comparing(KospiChartRedis::getTime)).toList();
                    return new KospiAndChartResponse(kospiRedis, sortKospiChart);
                }).toList();
    }

    private boolean isWithinTradingHours() {
        // 아시아/서울 시간대의 현재 시간을 가져옵니다.
        LocalTime now = LocalTime.now(ZoneId.of("Asia/Seoul"));

        // 오전 9시
        LocalTime start = LocalTime.of(9, 0);
        // 오후 3시 30분
        LocalTime end = LocalTime.of(15, 30);

        // 현재 시간이 9시에서 15시 30분 사이인지 확인합니다.
        return now.isAfter(start) && now.isBefore(end);
    }
}
