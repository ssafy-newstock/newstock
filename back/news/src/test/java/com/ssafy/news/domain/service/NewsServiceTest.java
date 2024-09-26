package com.ssafy.news.domain.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.news.domain.service.client.HBaseClient;
import com.ssafy.news.domain.entity.IndustryNewsDto;
import com.ssafy.news.global.config.ObjectMapperConfig;
import com.ssafy.news.global.util.HashUtil;
import com.ssafy.news.global.util.TypeMappingUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class NewsServiceTest {
    @Autowired
    private HBaseClient hBaseClient;

    private ObjectMapper objectMapper = ObjectMapperConfig.createObjectMapper();
    @Test
    @DisplayName("시황 뉴스 단건 조회 성공")
    void 시황_뉴스_단건_조회_성공() throws Exception {
        //given
        String newsId = "20240701112610199";
        String newsType = "estate";

        //when
        String hashNewsId = HashUtil.hashNewsId(newsId);
        String mappedType = TypeMappingUtil.getMappedType(newsType);

        String rowKey = hashNewsId + mappedType;
        Long timestamp = hBaseClient.getTimestampByKey(rowKey);
        Map<String, String> newsData = hBaseClient.getNewsByKey(mappedType, timestamp, hashNewsId, "cf");

        IndustryNewsDto industryNewsDto = objectMapper.convertValue(newsData, IndustryNewsDto.class);

        //then
        assertThat(industryNewsDto).isNotNull();
        assertThat(industryNewsDto.getNewsId()).isEqualTo(newsId);
        assertThat(industryNewsDto.getTitle()).isNotEmpty();
        assertThat(industryNewsDto.getArticle()).contains("분양가");
        assertThat(industryNewsDto.getUploadDatetime()).isNotNull();
        assertThat(industryNewsDto.getUploadDatetime().toString()).isEqualTo("2024-07-01T11:26");
    }
    // 시황 뉴스 조회

    // 종목 뉴스 조회

    // 관심 뉴스 조회

    // 종목 뉴스의 주식 현재가 FeignClient 로직 구현

    // 저장한 뉴스 조회

    // 저장한 뉴스 페이징 처리
}