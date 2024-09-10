package com.ssafy.stock.domain.service.helper;

import com.ssafy.stock.domain.entity.StocksPriceRedis;
import com.ssafy.stock.domain.entity.StocksRedis;
import com.ssafy.stock.domain.service.response.StockPricesKisResponseDto;
import com.ssafy.stock.domain.service.response.StockPricesOutputKisResponseDto;
import com.ssafy.stock.domain.service.response.StockPricesResponseDto;
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

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class StockConverter {
    @Value("${KIS_STOCK_PRICE_URL}")
    private String KIS_STOCK_PRICE_URL;

    @Value("${KIS_STOCK_PRICE_TR_ID}")
    private String KIS_STOCK_PRICE_TR_ID;

    private final RestTemplate restTemplate;

    public List<StocksPriceRedis> convertToStocksPriceRedisList(List<StockPricesResponseDto> allStockPrices) {
        return allStockPrices.stream()
                .map(dto -> new StocksPriceRedis(
                        dto.getStockCode(),
                        dto.getStockName(),
                        dto.getStckPrpr(),
                        dto.getPrdyVrss(),
                        dto.getPrdyCtrt()
                ))
                .collect(Collectors.toList());
    }

    public StockPricesResponseDto ConvertToStockPricesResponseDto(StocksRedis stockInfo, StockPricesOutputKisResponseDto stockOutput) {
        return new StockPricesResponseDto(stockInfo.getStockCode(),
                stockInfo.getStockName(),
                stockOutput.getStckPrpr(),
                stockOutput.getPrdyVrss(),
                stockOutput.getPrdyCtrt());
    }

    /**
     * 한국투자증권 주식현재가 시세 요청 RestTemplate
     * @param accessToken
     * @param appKey
     * @param appSecret
     * @param stockInfo
     * @return
     */
    public ResponseEntity<StockPricesKisResponseDto> exchangeRestTemplate(String accessToken, String appKey, String appSecret, StocksRedis stockInfo) {
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
    private HttpEntity<Void> getVoidHttpEntity(String accessToken, String appKey, String appSecret) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", accessToken);
        headers.set("appkey", appKey);
        headers.set("appsecret", appSecret);
        headers.set("tr_id", KIS_STOCK_PRICE_TR_ID);
        headers.set("Accept", "application/json; charset=utf-8");
        headers.set("Content-Type", "application/json; charset=utf-8");

        return new HttpEntity<>(headers);
    }
}
