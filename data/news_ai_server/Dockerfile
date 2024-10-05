# 베이스 이미지로 ubuntu20.04
FROM ubuntu:20.04

# Java 환경 변수 설정
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/

# 패키지 설치 및 정리
RUN apt-get update -y \
    && apt-get install -y software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa -y \
    && apt-get install -y openjdk-8-jdk python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /server

# 의존성 파일 복사
COPY requirements.txt .

# 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 및 setup.py 복사
COPY ./app /server/app

# 호스트 등록 스크립트 작성
RUN echo '#!/bin/bash\n' \
    'echo "34.64.230.82 master01" >> /etc/hosts\n' \
    'echo "34.22.71.84 master02" >> /etc/hosts\n' \
    'echo "34.22.71.84 slave01" >> /etc/hosts\n' \
    'echo "34.64.155.83 slave02" >> /etc/hosts\n' \
    'echo "34.64.105.214 slave03" >> /etc/hosts' \
    > /usr/local/bin/add_hosts.sh && \
    chmod +x /usr/local/bin/add_hosts.sh

# 작업 디렉토리 변경
WORKDIR /server/app

# 포트 설정
EXPOSE 8020

# FastAPI 애플리케이션 실행
CMD ["/bin/bash", "-c", "/usr/local/bin/add_hosts.sh && uvicorn main:app --host 0.0.0.0 --port 8020 --reload"]
