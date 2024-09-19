#!/bin/bash

docker-compose down

docker build -t language-base ./language-base
docker build -t hadoop-base ./hadoop-base
docker build -t hadoop-spark-base ./hadoop-spark-base

docker build -t hadoop-namenode ./namenode
docker build -t hadoop-datanode ./datanode
docker build -t resourcemanager ./resourcemanager
docker build -t hbase ./hbase
docker build -t yarn-timelineserver ./yarntimelineserver
docker build -t spark-historyserver ./sparkhistoryserver
# docker build -t zeppelin ./hadoop/zeppelin

docker-compose up -d