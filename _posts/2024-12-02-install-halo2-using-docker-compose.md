---
layout: post
title:  利用Docker compose部署halo2
date:   2024-12-02 07:01:35 +0300
image:  02.jpg
tags:   Docker
---

## 介绍

Halo 是一个开源的轻量级博客系统，基于 Java 和 Spring Boot 框架构建，旨在为用户提供一个简单、快速且现代化的博客平台。它注重简洁、易用和高效，支持高度的自定义，适合用于个人博客、技术博客或小型企业的博客系统。

## 部署

### 配置docker-compose.yml

```yml
version: "3"

services:
  halo:
    image: registry.fit2cloud.com/halo/halo:2.20
    container_name: halo
    restart: on-failure:3
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      external_network:
    volumes:
      - ./halo2:/root/.halo2
    ports:
      - "8090:8090"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8090/actuator/health/readiness"]
      interval: 30s
      timeout: 5s
      retries: 5
      start_period: 30s
    environment:
      # JVM 参数，默认为 -Xmx256m -Xms256m，可以根据实际情况做调整，置空表示不添加 JVM 参数
      - JVM_OPTS=-Xmx1G -Xms256m
    command:
      - --spring.r2dbc.url=r2dbc:pool:mysql://mysql:3306/halo
      - --spring.r2dbc.username=root
      # MySQL 的密码，请保证与下方 MYSQL_ROOT_PASSWORD 的变量值一致。
      - --spring.r2dbc.password=yMcg5GZ
      - --spring.sql.init.platform=mysql
      # 外部访问地址，请根据实际需要修改
      - --halo.external-url=https://threeant.cn/

  mysql:
    image: mysql:8.1.0
    container_name: mysql
    restart: on-failure:3
    networks:
      external_network:
    command:
      - --default-authentication-plugin=caching_sha2_password
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_general_ci
      - --explicit_defaults_for_timestamp=true
    volumes:
      - ./mysql:/var/lib/mysql
      - ./mysqlBackup:/data/mysqlBackup
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1", "--silent"]
      interval: 3s
      retries: 5
      start_period: 30s
    environment:
      # 请修改此密码，并对应修改上方 Halo 服务的 SPRING_R2DBC_PASSWORD 变量值
      - MYSQL_ROOT_PASSWORD=yMcg5GZ
      - MYSQL_DATABASE=halo

  nginx:
    image: nginx:latest
    container_name: nginx
    restart: on-failure:3
    networks:
      - external_network
    volumes:
      - ./nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/html:/usr/share/nginx/html
      - ./nginx/logs:/var/log/nginx
      - ./nginx/certs:/etc/nginx/certs  # 放置 SSL 证书
    ports:
      - "80:80"
      - "443:443"
networks:
  external_network:

```

### 启动docker-compose

```bash
docker-compose up -d
```
