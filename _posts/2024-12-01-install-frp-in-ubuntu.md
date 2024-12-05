---
layout: post
title:  Ubuntu安装FRP
date:   2024-12-01 17:01:35 +0300
image:  02.jpg
tags:   开发工具
---

## 介绍

FRP（Fast Reverse Proxy）是一个高性能的反向代理应用，通常用于将内网服务暴露到公网。它允许你通过公网IP访问在内网或防火墙后面的服务。FRP的工作原理是，客户端（内网的机器）与服务器（公网的机器）建立一个长期的连接，客户端将本地的服务端口映射到公网服务器上，用户通过公网访问这个端口，从而访问内网的服务。

## 安装

### 下载安装包

```bash
wget https://github.com/fatedier/frp/releases/download/v0.61.0/frp_0.61.0_linux_amd64.tar.gz
```

### 解压安装包

```bash
tar -zxvf frp_0.61.0_linux_amd64.tar.gz
cd frp_0.61.0_linux_amd64
```

### 配置服务端

`frps.ini`是服务器端的配置文件，通常会放在服务器上

```bash
[common]
bind_port = 7000      # 绑定端口
dashboard_port = 7500 # 仪表盘端口
dashboard_user = admin
dashboard_pwd = admin # 仪表盘的用户名和密码
vhost_http_port = 80  # HTTP 请求端口
vhost_https_port = 443 # HTTPS 请求端口
```

### 配置客户端

`frpc.ini`是客户端的配置文件，通常用于配置本地需要暴露到外网的服务

```bash
[common]
server_addr = x.x.x.x  # 服务器的公网IP地址
server_port = 7000     # 服务器的绑定端口（与 `frps.ini` 中的 bind_port 相同）

[http]
type = http            # 使用 http 协议
local_port = 8080      # 本地服务端口
custom_domains = www.example.com # 绑定域名
```

### 启动服务端

```bash
nohup ./frps -c frps.ini &
```

### 启动客户端

```bash
nohup ./frpc -c frpc.ini &
```

## 开机启动

### 创建服务文件

创建服务文件`/etc/systemd/system/frpc.service`

```bash
[Unit]
Description=FRP Client (frpc)
After=network.target

[Service]
Type=simple
ExecStart=/path/to/frpc -c /path/to/frpc.toml
Restart=always
User=<your-username>
WorkingDirectory=/path/to/frpc/directory
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=frpc

[Install]
WantedBy=multi-user.target
```

### 重新加载systemd配置

```bash
sudo  systemctl daemon-reload
```

### 启动服务

```bash
sudo systemctl enable frpc.service
```

### 检查服务状态

```bash
sudo systemctl status frpc.service
```
