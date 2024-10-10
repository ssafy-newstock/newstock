### 개발 환경
- JVM - 자바 17
- 웹서버 - NGINX
- WAS - Spring Boot 3.2.9 (내장 톰캣)

### 환경 변수
##### 주식 서비스
`application.properties`
``` properties
spring.application.name=stock  
spring.jpa.show-sql=true  
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.properties.hibernate.format_sql=true;  
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect  

# 실제 데이터베이스 정보
spring.datasource.url=${DB_URL}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver  
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
  
server.port=8003  

# redis 마이크로서비스 이름
spring.data.redis.host=redis-service

spring.data.redis.port=6379  
spring.cache.type=redis  

spring.profiles.include=kis, feign
```

`application-feign.yaml`
``` yaml
# 마이크로 서비스 이름 및 포트 url
auth-client:  
  url: http://newstock-stock-auth-service:8000/api/auth  
  
member-client:  
  url: http://newstock-stock-member-service:8001/api/member
```

**(선택)**
`application-dev.yaml`
``` yaml
auth-client:  
  url: http://localhost:8000/api/auth  
  
member-client:  
  url: http://localhost:8001/api/member
```

`application-kis.properties`
``` properties
KIS_TOKEN_URL=https://openapi.koreainvestment.com:9443/oauth2/tokenP  
KIS_WEBSOCKET_TOKEN_URL=https://openapi.koreainvestment.com:9443/oauth2/Approval  
KIS_STOCK_PRICE_URL=https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price  
KIS_STOCK_INDUSTRY_URL=https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-indexchartprice  

# 한국 투자증권 실 계좌 키
APP_KEY1=${한국투자증권 클라이언트 키}
APP_SECRET1=${한국투자증권 시크릿 키}
  
APP_KEY2=${한국투자증권 클라이언트 키}
APP_SECRET2=${한국투자증권 시크릿 키}
  
APP_KEY3=${한국투자증권 클라이언트 키}
APP_SECRET3=${한국투자증권 시크릿 키}
  
KIS_STOCK_PRICE_TR_ID=FHKST01010100  
  
KIS_ENCRYPTION_KEY=GzKtM7M8hRgRzTR3YEq8BgyBpRxKc/AG
```

___
##### OAuth 서비스

`application.yaml`
``` yaml
spring:  
  profiles:  
    include: oauth, feign  
  datasource:  
    url: ${DB_URL}
    driver-class-name: com.mysql.cj.jdbc.Driver  
    username: ${DB_USERNAME}  
    password: ${DB_PASSWORD}  

  jpa:  
    hibernate:  
      ddl-auto: update  
    properties:  
      hibernate:  
        dialect: org.hibernate.dialect.MySQLDialect  
  data:  
    redis:  
      host: redis-service  
      port: 6379  
  
server:  
  port: 8000  
  
logging:  
  level:  
    com.ssafy.auth.domain.controller.client.MemberClient: DEBUG
```

`application-oauth.yaml`
``` yaml
spring:  
  security:  
    oauth2:  
      client:  
        provider:  
          kakao:  
            authorization-uri: https://kauth.kakao.com/oauth/authorize  
            token-uri: https://kauth.kakao.com/oauth/token  
            user-info-uri: https://kapi.kakao.com/v2/user/me  
            user-name-attribute: id  
        registration:  
          kakao:  
            client-id: ${카카오 클라이언트 아이디} 
            client-secret: ${카카오 클라이언트 시크릿 아이디} 
            client-authentication-method: client_secret_post  
            redirect-uri: ${카카오 리다이렉션 URL} 
            authorization-grant-type: authorization_code  
            client-name: kakao  
            scope: profile_nickname, profile_image, account_email  
          google:  
            client-id: ${구글 클라이언트 아이디} 
            client-secret: ${구글 클라이언트 시크릿 아이디} 
            scope: profile, email  
            redirect-uri: ${구글 리다이렉션 URL} 
  
jwt:  
  key: S/64kn2/rYwU2WsyhOTvlG4pcFiDHNtiMDn3bfEc7hAhhjJkZcFy75ciT5KPu+xlVFJGJ7dgLEeTw0z6BDXP5g==
```

`application-feign.yaml`
``` yaml
member-client:  
  url : http://newstock-stock-member-service:8001/api/member
```

___
##### 멤버 서비스

`application.yaml`
```  yaml
spring:  
  datasource:  
    url: ${DB_URL}
    driver-class-name: com.mysql.cj.jdbc.Driver  
    username: ${DB_USERNAME}  
    password: ${DB_PASSWORD}  
  h2:  
    console:  
      enabled: true  
  jpa:  
    hibernate:  
      ddl-auto: update  
    properties:  
      hibernate:  
        dialect: org.hibernate.dialect.MySQLDialect  
  data:  
    redis:  
      host: redis-service  
      port: 6379  
  kafka:  
    bootstrap-servers: kafka-service:9092  
server:  
  port: 8001
```

**(선택)**
`application-dev.yaml`
``` yaml
spring:  
  kafka:  
    bootstrap-servers: localhost:9092  
  data:  
    redis:  
      host: localhost  
      port: 6379  
  jpa:  
    show-sql: true  
    properties:  
      hibernate:  
        format_sql: true  
  
logging:  
  level:  
    org:  
      hibernate:  
        orm:  
          jdbc:  
            bind:  
              trace
```

___
##### 뉴스 스크랩 서비스

`application.yaml`
```yaml
spring:  
  profiles:  
    include: feign  
  application:  
    name: newsscrap  
  datasource:  
	  # DB 정보
    url: ${DB_URL}
    driver-class-name: com.mysql.cj.jdbc.Driver  
    username: ${DB_USERNAME}  
    password: ${DB_PASSWORD}  
  jpa:  
    hibernate:  
      ddl-auto: update  
    properties:  
      hibernate:  
        dialect: org.hibernate.dialect.MySQLDialect  
server:  
  port: 8004
```

`application-feign.yaml`
```yaml
auth-client:  
  url: http://newstock-stock-auth-service:8000/api/auth  
  
stock-news-client:  
  url: http://newstock-stock-news-service:8002/api/news/stock  
  
industry-news-client:  
  url: http://newstock-stock-news-service:8002/api/news/industry
```

**(선택)**
`application-dev.yaml`
``` yaml
auth-client:  
  url: http://localhost:8000/api/auth  
  
stock-news-client:  
  url: http://localhost:8002/api/news/stock  
  
industry-news-client:  
  url: http://localhost:8002/api/news/industry
```

___
##### 뉴스 데이터 서비스

`application.yaml`
``` yaml
spring:  
  datasource:  
    url: ${아파치 피닉스 URL}
  autoconfigure:  
    exclude:  
      - org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration  
  profiles:  
    include: feign  
  application:  
    name: news  
  kafka:  
    bootstrap-servers: kafka-service:9092  
  data:  
    redis:  
      host: redis-service  
      port: 6379  
  
server:  
  port: 8010  

    
logging:  
  level:  
    com.ssafy.news.domain.service.client.StockClient: DEBUG
```

`application-feign.yaml`
``` yaml
auth-client:  
  url: http://newstock-stock-auth-service:8000/api/auth
```

**(선택)**
`application-dev.yaml`
``` yaml
auth-client:  
  url: http://localhost:8000/api/auth  
  
spring:  
  kafka:  
    bootstrap-servers: localhost:9092  
  data:  
    redis:  
      host: localhost  
      port: 6379
```

___
##### 뉴스 서비스

`application.yaml`
``` yaml
spring:  
  profiles:  
    include: feign  
  application:  
    name: news  
  datasource:  
	url: ${MYSQL_DB_URL}
    driver-class-name: com.mysql.cj.jdbc.Driver  
    username: ${MYSQL_DB_USERNAME}  
    password: ${MYSQL_DB_PASSWORD}  
  jpa:  
    show-sql: true  
    hibernate:  
      ddl-auto: update  
    properties:  
      hibernate:  
        dialect: org.hibernate.dialect.MySQLDialect  
        format_sql: true  
  kafka:  
    bootstrap-servers: kafka-service:9092  
  data:  
    redis:  
      host: redis-service  
      port: 6379  
  
server:  
  port: 8002  
hbase:  
  url: http://j11c207a.p.ssafy.io:9090  
  
  
logging:  
  level:  
    com.ssafy.news.domain.service.client.StockClient: DEBUG  
```

`application-feign.yaml`
``` yaml
auth-client:  
  url: http://newstock-stock-auth-service:8000/api/auth  
  
newsdata-client:  
  url: http://newstock-stock-newsdata-service:8010/api/newsdata
```

**(선택)**
`application-dev.yaml`
``` yaml
auth-client:  
  url: http://localhost:8000/api/auth  
newsdata-client:  
  url: http://localhost:8010/api/newsdata
```

___
##### 뉴스 관심 서비스

`application.yaml`
``` yaml
spring:  
  profiles:  
    include: feign  
  application:  
    name: favorite  
  datasource:  
    url: ${DB_URL}
    driver-class-name: com.mysql.cj.jdbc.Driver  
    username: ${DB_USERNAME}  
    password: ${DB_PASSWORD}  
  jpa:  
    hibernate:  
      ddl-auto: update  
    properties:  
      hibernate:  
        dialect: org.hibernate.dialect.MySQLDialect  
server:  
  port: 8005
```

`application-feign.yaml`
``` yaml
auth-client:  
  url: http://newstock-stock-auth-service:8000/api/auth  
  
stock-news-client:  
  url: http://newstock-stock-news-service:8002/api/news/stock  
  
industry-news-client:  
  url: http://newstock-stock-news-service:8002/api/news/industry
```

**(선택)**
`application-dev.yaml`
``` yaml
auth-client:  
  url: http://localhost:8000/api/auth  
  
stock-news-client:  
  url: http://localhost:8002/api/news/stock  
  
industry-news-client:  
  url: http://localhost:8002/api/news/industry
```

___
##### 뉴스 AI 서비스

``` yaml
- name: MYSQL_DB_HOST  
  value: ${DB_URL}  
- name: MYSQL_DB_PORT  
  value: ${DB_PORT} 
- name: MYSQL_DB_USER  
  value: ${DB_USER}  
- name: MYSQL_DB_PASSWORD  
  value: ${DB_PASSWORD}   
- name: MYSQL_DB_NAME  
  value: ${DB_NAME}  
- name: MYSQL_DB_CHARSET  
  value: "utf8mb4"  
- name: JDBC_URL  
  value: ${DB_FULL_URL}
- name: OPENAI_API_KEY  
  # GPT 액세스 키
  valueFrom:  
    secretKeyRef:  
      name: secret-gpt  
      key: SECRET_KEY  
- name: ELASTIC_API_KEY
  # 엘라스틱 API 키  
  valueFrom:  
    secretKeyRef:  
      name: secret-elastic  
      key: API_KEY  
- name: ELASTIC_CLOUD_ID  
  # 엘라스틱 클라우드 아이디
  valueFrom:  
    secretKeyRef:  
      name: secret-elastic  
      key: CLOUD_ID
```