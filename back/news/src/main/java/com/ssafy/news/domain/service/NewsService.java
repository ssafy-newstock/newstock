package com.ssafy.news.domain.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.news.domain.entity.IndustryNewsDto;
import com.ssafy.news.domain.service.client.HBaseClient;
import com.ssafy.news.global.config.ObjectMapperConfig;
import com.ssafy.news.global.util.HashUtil;
import com.ssafy.news.global.util.TypeMappingUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class NewsService {
    private final HBaseClient hBaseClient;
    private final ObjectMapper objectMapper = ObjectMapperConfig.createObjectMapper();

    public IndustryNewsDto selectIndustryNewsOne(String newsId, String newsType) {
        String hashNewsId = HashUtil.hashNewsId(newsId);
        String mappedType = TypeMappingUtil.getMappedType(newsType);
        String rowKey = hashNewsId + mappedType;

        Long timestamp = hBaseClient.getTimestampByKey(rowKey);
        Map<String, String> newsData = hBaseClient.getNewsByKey(mappedType, timestamp, hashNewsId, "cf");

        IndustryNewsDto industryNewsDto = objectMapper.convertValue(newsData, IndustryNewsDto.class);
        return industryNewsDto;

    }


}
