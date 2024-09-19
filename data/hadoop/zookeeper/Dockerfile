# Base image
FROM openjdk:8-jre

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV ZOOKEEPER_VERSION=3.8.4
ENV ZOOKEEPER_HOME=/opt/zookeeper
ENV PATH=$PATH:$ZOOKEEPER_HOME/bin

# Download and extract ZooKeeper
RUN wget https://downloads.apache.org/zookeeper/stable/apache-zookeeper-${ZOOKEEPER_VERSION}-bin.tar.gz && \
    tar -xzf apache-zookeeper-${ZOOKEEPER_VERSION}-bin.tar.gz && \
    mv apache-zookeeper-${ZOOKEEPER_VERSION}-bin /opt/zookeeper && \
    rm apache-zookeeper-${ZOOKEEPER_VERSION}-bin.tar.gz

# Copy ZooKeeper configuration
COPY zoo.cfg $ZOOKEEPER_HOME/conf/

# Expose ZooKeeper port
EXPOSE 2181

# Start ZooKeeper
CMD ["sh", "-c", "zkServer.sh start-foreground"]