# Gradle 이미지 (ARM 아키텍처 지원) 사용
FROM gradle:7.5.1-jdk17 AS build

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# Gradle 캐시를 활용하기 위해 필요한 파일만 먼저 복사합니다.
COPY build.gradle /app/

# 종속성을 다운로드합니다.
RUN gradle dependencies --no-daemon || true

# 나머지 프로젝트 파일들을 복사합니다.
COPY . .

# Gradle 빌드를 실행하여 애플리케이션을 빌드합니다.
RUN gradle clean build --no-daemon --stacktrace

# 최종 이미지를 설정합니다.
FROM openjdk:17-jdk-slim

# 빌드된 jar 파일을 Docker 이미지에 복사합니다.
COPY --from=build /app/build/libs/auth-0.0.1-SNAPSHOT.jar app.jar

# 애플리케이션을 실행합니다.
ENTRYPOINT ["java", "-jar", "/app.jar"]
