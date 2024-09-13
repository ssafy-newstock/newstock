package com.ssafy.stock.domain.service.helper;

import com.ssafy.stock.domain.entity.Redis.StocksPriceRedis;
import com.ssafy.stock.domain.entity.Redis.StocksRedis;
import com.ssafy.stock.domain.service.response.StockPricesKisResponseDto;
import com.ssafy.stock.domain.service.response.StockPricesOutputKisResponseDto;
import com.ssafy.stock.domain.service.response.StockPricesResponseDto;
import com.ssafy.stock.global.token.KISTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class StockConverter {
    @Value("${KIS_STOCK_PRICE_URL}")
    private String KIS_STOCK_PRICE_URL;

    @Value("${KIS_STOCK_PRICE_TR_ID}")
    private String KIS_STOCK_PRICE_TR_ID;

    private static final String webSocketKey = "0a676997-8738-4a8a-9d9f-55162614d45c";

    private final RestTemplate restTemplate;
    private final KISTokenService kisTokenService;

    public List<StocksPriceRedis> convertToStocksPriceRedisList(List<StockPricesResponseDto> allStockPrices) {
        return allStockPrices.stream()
                .map(dto -> new StocksPriceRedis(
                        dto.getStockCode(),
                        dto.getStockName(),
                        dto.getStockIndustry(),
                        dto.getStckPrpr(),
                        dto.getPrdyVrss(),
                        dto.getPrdyCtrt(),
                        dto.getAcmlTrPbmn(),
                        dto.getAcmlVol()
                ))
                .collect(Collectors.toList());
    }

    public StockPricesResponseDto convertToStockPricesResponseDtoByRedis(StocksRedis stockInfo,
                                                                         StockPricesOutputKisResponseDto stockOutput) {
        return new StockPricesResponseDto(stockInfo.getStockCode(),
                stockInfo.getStockName(),
                stockInfo.getStockIndustry(),
                stockOutput.getStckPrpr(),
                stockOutput.getPrdyVrss(),
                stockOutput.getPrdyCtrt(),
                stockOutput.getAcmlTrPbmn(),
                stockOutput.getAcmlVol());
    }

    public StockPricesResponseDto convertToStockPriceResponseDto(String stockCode, String stockName, String stockIndustry, String stckPrpr, String prdyVrss, String prdyCtrt, String acmlTrPbmn, String acmlVol) {
        return new StockPricesResponseDto(stockCode,
                stockName,
                stockIndustry,
                stckPrpr,
                prdyVrss,
                prdyCtrt,
                acmlTrPbmn,
                acmlVol);
    }

    /**
     * 한국투자증권 주식현재가 시세 요청 RestTemplate
     * @param accessToken
     * @param appKey
     * @param appSecret
     * @param stockInfo
     * @return
     */
    public ResponseEntity<StockPricesKisResponseDto> exchangeRestTemplate(String accessToken,
                                                                          String appKey,
                                                                          String appSecret,
                                                                          StocksRedis stockInfo) {
        String url = UriComponentsBuilder.fromHttpUrl(KIS_STOCK_PRICE_URL)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockInfo.getStockCode())
                .toUriString();

        HttpEntity<Void> entity = getVoidHttpEntity(accessToken, appKey, appSecret);

        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                StockPricesKisResponseDto.class
        );
    }

    /**
     * 한국투자증권 주식현재가 시세 요청 헤더
     * @param accessToken
     * @param appKey
     * @param appSecret
     * @return
     */
    private HttpEntity<Void> getVoidHttpEntity(String accessToken,
                                               String appKey,
                                               String appSecret) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", accessToken);
        headers.set("appkey", appKey);
        headers.set("appsecret", appSecret);
        headers.set("tr_id", KIS_STOCK_PRICE_TR_ID);
        headers.set("Accept", "application/json; charset=utf-8");
        headers.set("Content-Type", "application/json; charset=utf-8");

        return new HttpEntity<>(headers);
    }

    /**
     * 국내주식 실시간체결가 WebSocket 연결 요청 생성 메서드
     * @param stockCode
     * @return
     */
    public Map<String, Object> setKisWebSocketRequest(String stockCode) {
        HashMap<String, String> header = new HashMap<>();
        header.put("approval_key", kisTokenService.getAccessToken("websocket"));
        header.put("custtype", "P");
        header.put("tr_type", "1");
        header.put("content-type", "utf-8");

        Map<String, Map<String, String>> body = new HashMap<>();
        Map<String, String> input = new HashMap<>();
        input.put("tr_id", "H0STCNT0");
        input.put("tr_key", stockCode); // 종목 코드 설정
        body.put("input", input);

        Map<String, Object> request = new HashMap<>();
        request.put("header", header);
        request.put("body", body);
        return request;
    }
}
