package com.ssafy.newsdata.domain.repository;

import com.ssafy.newsdata.domain.entity.dto.StockNewsDto;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class StockNewsRepository {
    public StockNewsDto findById(Long id) throws SQLException, ClassNotFoundException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rst = null;
        StockNewsDto stockNewsDto = null;

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
                    FROM ph_stock_news psn
                    WHERE psn.news_id = ?
                    """;

            // PreparedStatement 생성 및 id 값 바인딩
            pstmt = conn.prepareStatement(query);
            pstmt.setLong(1, id);

            // 쿼리 실행
            rst = pstmt.executeQuery();

            // ResultSet을 DTO로 매핑
            if (rst.next()) {
                stockNewsDto = mapResultSetToDto(rst); // ResultSet을 StockNewsDto로 변환하는 메서드 호출
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

        return stockNewsDto;
    }

    public List<StockNewsDto> findAllStockNews(
            String lastSeenId, int pageSize) throws SQLException, ClassNotFoundException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rst = null;
        List<StockNewsDto> stockNewsList = new ArrayList<>();

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
                    FROM ph_stock_news psn
                    WHERE psn.news_id < ?
                    order by psn.news_id DESC
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
                StockNewsDto stockNewsDto = mapResultSetToDto(rst); // ResultSet을 StockNewsDto로 변환하는 메서드 호출
                stockNewsList.add(stockNewsDto);
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

        return stockNewsList;
    }

    public List<StockNewsDto> findAllByStockCode(
            String stockCode, String lastSeenId, int pageSize,
            String startDate, String endDate) throws SQLException, ClassNotFoundException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rst = null;
        List<StockNewsDto> stockNewsList = new ArrayList<>();

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
                    FROM ph_stock_news psn
                    JOIN (
                        SELECT stock_news_id
                        FROM ph_stock_news_stock_code
                        WHERE stock_code = ?
                        AND stock_news_id_stock BETWEEN ? AND ?
                    ) AS subquery ON psn.news_id = subquery.stock_news_id
                    WHERE psn.news_id > ?
                    AND psn.news_id BETWEEN ? AND ?
                    order by subquery.stock_news_id DESC
                    limit ?
                    """;

            // PreparedStatement 생성 및 id 값 바인딩
            pstmt = conn.prepareStatement(query);

            // 파라미터 설정
            pstmt.setString(1, stockCode); // 시작 날짜
            pstmt.setString(2, startDate);
            pstmt.setString(3, endDate);
            pstmt.setLong(4, Long.parseLong(lastSeenId));   // 끝 날짜
            pstmt.setBigDecimal(5, new BigDecimal(startDate));
            pstmt.setBigDecimal(6, new BigDecimal(endDate));
            pstmt.setInt(7, pageSize); // 주식 코드


            // 쿼리 실행
            rst = pstmt.executeQuery();

            // ResultSet을 DTO 리스트로 매핑
            while (rst.next()) {
                StockNewsDto stockNewsDto = mapResultSetToDto(rst); // ResultSet을 StockNewsDto로 변환하는 메서드 호출
                stockNewsList.add(stockNewsDto);
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

        return stockNewsList;
    }

    public List<StockNewsDto> findAllByIdIn(final List<String> ids) throws SQLException, ClassNotFoundException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rst = null;
        List<StockNewsDto> stockNewsList = new ArrayList<>();

        try {
            // Phoenix 드라이버 로드
            Class.forName("org.apache.phoenix.jdbc.PhoenixDriver");
            System.out.println("Driver loaded successfully");

            // Phoenix에 연결
            conn = DriverManager.getConnection("jdbc:phoenix:34.64.230.82,34.22.71.84,34.64.42.191:2181:/hbase");
            System.out.println("Connection successful");

            // SQL 쿼리 작성 (id 값 바인딩)
            String query = "SELECT * " +
                    "FROM ph_stock_news " +
                    "WHERE news_id IN (" + ids.stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(",")) + ")";

            // PreparedStatement 생성 및 id 값 바인딩
            pstmt = conn.prepareStatement(query);

            // 쿼리 실행
            rst = pstmt.executeQuery();

            // ResultSet을 DTO 리스트로 매핑
            while (rst.next()) {
                StockNewsDto stockNewsDto = mapResultSetToDto(rst); // ResultSet을 StockNewsDto로 변환하는 메서드 호출
                stockNewsList.add(stockNewsDto);
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

        return stockNewsList;
    }

    private static StockNewsDto mapResultSetToDto(ResultSet rst) throws SQLException {
        StockNewsDto stockNewsDto = new StockNewsDto();

        stockNewsDto.setNewsId(rst.getLong("news_id"));
        stockNewsDto.setArticle(rst.getString("article"));
        stockNewsDto.setDescription(rst.getString("description"));
        stockNewsDto.setMedia(rst.getString("media"));
        stockNewsDto.setKeywords(rst.getString("keywords"));
        stockNewsDto.setSentiment(rst.getInt("sentiment"));
        stockNewsDto.setScore(rst.getInt("score"));
        stockNewsDto.setSubtitle(rst.getString("subtitle"));
        stockNewsDto.setThumbnail(rst.getString("thumbnail"));
        stockNewsDto.setTitle(rst.getString("title"));
        stockNewsDto.setUploadDatetime(rst.getTimestamp("upload_datetime").toLocalDateTime());
        String content = rst.getString("STOCK_CODES");

        System.out.println(content);
        stockNewsDto.setStockCodes(content);

        // 추가적으로 필요한 데이터가 있을 경우 더 매핑 가능
        return stockNewsDto;
    }


}
