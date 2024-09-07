FROM openjdk:17-alpine AS build

# Gradle 설치
RUN apk add --no-cache bash curl && \
    curl -s "https://get.sdkman.io" | bash && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install gradle 7.5.1"

# 작업 디렉터리 설정
WORKDIR /app

# 종속성을 다운로드합니다.
COPY build.gradle settings.gradle /app/
RUN gradle dependencies --no-daemon || true

# 나머지 프로젝트 파일들을 복사합니다.
COPY . .

# Gradle 빌드를 실행하여 애플리케이션을 빌드합니다.
RUN gradle clean build --no-daemon --stacktrace

# 최종 이미지를 설정합니다.
FROM openjdk:17-alpine

# 빌드된 jar 파일을 Docker 이미지에 복사합니다.
COPY --from=build /app/build/libs/test-0.0.1-SNAPSHOT.jar app.jar

# 애플리케이션을 실행합니다.
ENTRYPOINT ["java", "-jar", "/app.jar"]
