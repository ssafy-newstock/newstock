package com.ssafy.news.domain.service.client;

import com.ssafy.news.domain.entity.IndustryNewsDto;
import com.ssafy.news.global.util.DateTimeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class HBaseClient {
    private final Connection phoenixConnection;

    public List<IndustryNewsDto> getTop4LatestIndustryNews() throws SQLException {
        String sql = "SELECT article, description, industry, media, newsId, sentiment, subtitle, thumbnail, title, uploadDatetime " +
                "FROM industry_news " +
                "ORDER BY uploadDatetime DESC " +
                "LIMIT 4";

        List<IndustryNewsDto> newsList = new ArrayList<>();
        try (PreparedStatement statement = phoenixConnection.prepareStatement(sql)) {
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                newsList.add(new IndustryNewsDto(
                        rs.getString("article"),
                        rs.getString("description"),
                        rs.getString("industry"),
                        rs.getString("media"),
                        rs.getString("newsId"),
                        rs.getString("sentiment"),
                        rs.getString("subtitle"),
                        rs.getString("thumbnail"),
                        rs.getString("title"),
                        DateTimeUtil.convertStringToLocalDateTime(rs.getString("uploadDatetime")) // LocalDateTime으로 변환
                ));
            }
        }
        return newsList;
    }

    public List<IndustryNewsDto> getIndustryNewsListByType(String mappedType, int pageSize, int offset) throws SQLException {
        String sql = "SELECT article, description, industry, media, newsId, sentiment, subtitle, thumbnail, title, uploadDatetime " +
                "FROM industry_news " +
                "WHERE industry = ? " +
                "ORDER BY uploadDatetime DESC " +
                "LIMIT ? OFFSET ?";

        List<IndustryNewsDto> newsList = new ArrayList<>();

        try (PreparedStatement statement = phoenixConnection.prepareStatement(sql)) {
            statement.setString(1, mappedType);  // Setting the mapped type
            statement.setInt(2, pageSize);       // Setting page size (LIMIT)
            statement.setInt(3, offset);         // Setting offset (OFFSET)

            ResultSet rs = statement.executeQuery();

            while (rs.next()) {
                // IndustryNewsDto 객체를 생성하고 값을 설정한 후 리스트에 추가
                newsList.add(new IndustryNewsDto(
                        rs.getString("article"),
                        rs.getString("description"),
                        rs.getString("industry"),
                        rs.getString("media"),
                        rs.getString("newsId"),
                        rs.getString("sentiment"),
                        rs.getString("subtitle"),
                        rs.getString("thumbnail"),
                        rs.getString("title"),
                        DateTimeUtil.convertStringToLocalDateTime(rs.getString("uploadDatetime")) // LocalDateTime으로 변환
                ));
            }
        }

        return newsList;
    }

}