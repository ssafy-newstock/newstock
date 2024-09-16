FROM alpine:latest

# Set non-interactive mode for apk
ENV DEBIAN_FRONTEND=noninteractive

# Install packages including bash
RUN apk update && apk add --no-cache \
    tzdata \
    openjdk8-jdk \
    build-base \
    libressl-dev \
    bzip2-dev \
    libffi-dev \
    wget \
    bash && \
    cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    echo "Asia/Seoul" > /etc/timezone

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk

# Clean up
RUN apk del build-base \
    libressl-dev \
    bzip2-dev \
    libffi-dev && \
    rm -rf /var/cache/apk/*
