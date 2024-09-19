# Start with a base image that has Hadoop and Spark installed
FROM openjdk:8-jre

# Set environment variables for HBase
ENV HBASE_VERION=2.5.10
ENV HBASE_HOME=/opt/hbase
ENV PATH=$PATH:$HBASE_HOME/bin

# Install HBase
RUN wget https://dlcdn.apache.org/hbase/$HBASE_VERION/hbase-$HBASE_VERION-bin.tar.gz -P /opt && \
    tar -xzf /opt/hbase-$HBASE_VERION-bin.tar.gz -C /opt && \
    ln -s /opt/hbase-$HBASE_VERION $HBASE_HOME

# Copy HBase configuration files
COPY hbase-site.xml $HBASE_HOME/conf/

# Expose necessary ports
EXPOSE 16000 16010 16020 16030

# Start HBase
CMD ["sh", "-c", "hbase master start && hbase regionserver start && tail -f /opt/hbase/logs/hbase-*.log"]
