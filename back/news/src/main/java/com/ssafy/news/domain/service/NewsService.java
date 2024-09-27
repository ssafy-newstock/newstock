package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.IndustryNewsDto;
import com.ssafy.news.domain.service.client.HBaseClient;
import com.ssafy.news.global.util.TypeMappingUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NewsService {
    private final HBaseClient hBaseClient;

    public List<IndustryNewsDto> getTop4LatestIndustryNews() throws SQLException {
        return hBaseClient.getTop4LatestIndustryNews();
    }

    /**
     * 시황뉴스 카테고리별 최신순 뉴스 조회
     * @param newsType
     * @param page
     * @return
     * @throws SQLException
     */
    public List<IndustryNewsDto> getIndustryNewsListByType(String newsType, int page) throws SQLException {
        String mappedType = TypeMappingUtil.getMappedType(newsType);
        int pageSize = 10; // 페이지당 10개의 뉴스
        int offset = (page - 1) * pageSize; // 페이지에 따른 건너뛸 데이터 수 계산
        return hBaseClient.getIndustryNewsListByType(mappedType, pageSize, offset);
    }

}
