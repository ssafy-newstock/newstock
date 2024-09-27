package com.ssafy.news.global.config;


import org.springframework.context.annotation.Bean;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@org.springframework.context.annotation.Configuration
public class HBaseConfig {

    @Bean
    public Connection phoenixConnection() throws SQLException {
        // Phoenix JDBC URL 구성
        String phoenixUrl = "jdbc:phoenix:34.64.230.82:2181,34.64.42.191:2181,34.64.155.83:2181:/hbase-unsecure";


        // Phoenix 연결 생성 및 Bean으로 등록
        return DriverManager.getConnection(phoenixUrl);
    }
}
