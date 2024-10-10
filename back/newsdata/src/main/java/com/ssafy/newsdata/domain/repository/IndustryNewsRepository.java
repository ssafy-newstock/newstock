package com.ssafy.newsdata.domain.repository;

import com.ssafy.newsdata.domain.entity.dto.IndustryNewsDto;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class IndustryNewsRepository {
    public IndustryNewsDto findById(String id) throws SQLException, ClassNotFoundException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rst = null;
        IndustryNewsDto industryNewsDto = null;

        try {
            // Phoenix 드라이버 로드
            Class.forName("org.apache.phoenix.jdbc.PhoenixDriver");
            System.out.println("Driver loaded successfully");

            // Phoenix에 연결
            conn = DriverManager.getConnection("jdbc:phoenix:34.64.230.82,34.22.71.84,34.64.42.191:2181:/hbase");
            System.out.println("Connection successful");

            // SQL 쿼리 작성 (id 값 바인딩)
            String query = """
                    SELECT *
                    FROM ph_industry_news pin
                    WHERE pin.news_id = ?""";

            // PreparedStatement 생성 및 id 값 바인딩
            pstmt = conn.prepareStatement(query);
            pstmt.setBigDecimal(1, new BigDecimal(id));

            // 쿼리 실행
            rst = pstmt.executeQuery();

            // ResultSet을 DTO로 매핑
            if (rst.next()) {
                industryNewsDto = mapResultSetToDto(rst); // ResultSet을 StockNewsDto로 변환하는 메서드 호출
            }

        } finally {
            // 자원 해제
            if (rst != null) {
                rst.close();
            }
            if (pstmt != null) {
                pstmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        }

        return industryNewsDto;
    }

    public List<IndustryNewsDto> findAllIndustryNews(
            String lastSeenId, int pageSize) throws SQLException, ClassNotFoundException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rst = null;
        List<IndustryNewsDto> industryNews = new ArrayList<>();

        try {
            // Phoenix 드라이버 로드
            Class.forName("org.apache.phoenix.jdbc.PhoenixDriver");
            System.out.println("Driver loaded successfully");

            // Phoenix에 연결
            conn = DriverManager.getConnection("jdbc:phoenix:34.64.230.82,34.22.71.84,34.64.42.191:2181:/hbase");
            System.out.println("Connection successful");

            // SQL 쿼리 작성 (id 값 바인딩)
            String query = """
                    SELECT *
                    FROM ph_industry_news pin
                    WHERE pin.news_id < ?
                    order by pin.news_id DESC
                    limit ?
                    """;

            // PreparedStatement 생성 및 id 값 바인딩
            pstmt = conn.prepareStatement(query);

            // 파라미터 설정
            pstmt.setLong(1, Long.parseLong(lastSeenId));   // 끝 날짜
            pstmt.setInt(2, pageSize); // 주식 코드


            // 쿼리 실행
            rst = pstmt.executeQuery();

            // ResultSet을 DTO 리스트로 매핑
            while (rst.next()) {
                IndustryNewsDto industryNewsDto = mapResultSetToDto(rst);
                industryNews.add(industryNewsDto);
            }

        } finally {
            // 자원 해제
            if (rst != null) {
                rst.close();
            }
            if (pstmt != null) {
                pstmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        }

        return industryNews;
    }

    public List<IndustryNewsDto> findIndustryNewsPreviewWithIndustry(
            String industry, String lastSeenId, int pageSize) throws SQLException, ClassNotFoundException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rst = null;
        List<IndustryNewsDto> industryNews = new ArrayList<>();

        try {
            // Phoenix 드라이버 로드
            Class.forName("org.apache.phoenix.jdbc.PhoenixDriver");
            System.out.println("Driver loaded successfully");

            // Phoenix에 연결
            conn = DriverManager.getConnection("jdbc:phoenix:34.64.230.82,34.22.71.84,34.64.42.191:2181:/hbase");
            System.out.println("Connection successful");

            // SQL 쿼리 작성 (id 값 바인딩)
            String query = """
                    SELECT *
                    FROM ph_industry_news pin
                    WHERE pin.news_id < ?
                    AND pin.industry = ?
                    order by pin.news_id DESC
                    limit ?
                    """;

            // PreparedStatement 생성 및 id 값 바인딩
            pstmt = conn.prepareStatement(query);

            // 파라미터 설정
            pstmt.setLong(1, Long.parseLong(lastSeenId));
            pstmt.setString(2, industry);
            pstmt.setInt(3, pageSize);


            // 쿼리 실행
            rst = pstmt.executeQuery();

            // ResultSet을 DTO 리스트로 매핑
            while (rst.next()) {
                IndustryNewsDto industryNewsDto = mapResultSetToDto(rst);
                industryNews.add(industryNewsDto);
            }

        } finally {
            // 자원 해제
            if (rst != null) {
                rst.close();
            }
            if (pstmt != null) {
                pstmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        }

        return industryNews;
    }

    public List<IndustryNewsDto> findAllByIdIn(final List<String> ids) throws SQLException, ClassNotFoundException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rst = null;
        List<IndustryNewsDto> industryNewsDtos = new ArrayList<>();

        try {
            // Phoenix 드라이버 로드
            Class.forName("org.apache.phoenix.jdbc.PhoenixDriver");
            System.out.println("Driver loaded successfully");

            // Phoenix에 연결
            conn = DriverManager.getConnection("jdbc:phoenix:34.64.230.82,34.22.71.84,34.64.42.191:2181:/hbase");
            System.out.println("Connection successful");

            // SQL 쿼리 작성
            StringBuilder query = new StringBuilder("SELECT * FROM ph_industry_news pin WHERE pin.news_id IN (");
            String placeholders = ids.stream().map(id -> "?").collect(Collectors.joining(","));
            query.append(placeholders).append(")");

            pstmt = conn.prepareStatement(query.toString());

            // 파라미터 바인딩
            for (int i = 0; i < ids.size(); i++) {
                pstmt.setString(i + 1, ids.get(i));  // 바인딩할 id 값을 설정
            }
            // 쿼리 실행
            rst = pstmt.executeQuery();

            // ResultSet을 DTO 리스트로 매핑
            while (rst.next()) {
                IndustryNewsDto industryNewsDto = mapResultSetToDto(rst);
                industryNewsDtos.add(industryNewsDto);
            }

        } finally {
            // 자원 해제
            if (rst != null) {
                rst.close();
            }
            if (pstmt != null) {
                pstmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        }

        return industryNewsDtos;
    }

    private static IndustryNewsDto mapResultSetToDto(ResultSet rst) throws SQLException {
        IndustryNewsDto industryNewsDto = new IndustryNewsDto();

        industryNewsDto.setId(rst.getString("news_id"));
        industryNewsDto.setArticle(rst.getString("article"));
        industryNewsDto.setDescription(rst.getString("description"));
        industryNewsDto.setMedia(rst.getString("media"));
        industryNewsDto.setSentiment(rst.getLong("sentiment"));
        industryNewsDto.setScore(rst.getLong("score"));
        industryNewsDto.setSubtitle(rst.getString("subtitle"));
        industryNewsDto.setThumbnail(rst.getString("thumbnail"));
        industryNewsDto.setTitle(rst.getString("title"));
        industryNewsDto.setUploadDatetime(rst.getTimestamp("upload_datetime").toLocalDateTime());
        industryNewsDto.setIndustry(rst.getString("industry")); // 테이블에 맞춰 industry 필드 추가

        // 추가적으로 필요한 데이터가 있을 경우 더 매핑 가능
        return industryNewsDto;
    }
}
