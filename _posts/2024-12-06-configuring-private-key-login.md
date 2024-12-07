---
layout: post
title:  ubuntu配置私钥登录
date:   2024-12-06 07:07:35 +0300
image:  02.jpg
tags:   DevOps
---

## 在客户端生成密钥对

```bash
ssh-keygen -t rsa -b 4096
```

## 将公钥复制到服务器

```bash
ssh-copy-id user@remote_host
```

## 配置SSH服务端

确保/etc/ssh/sshd_config允许使用公钥登录

```bash
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
## 禁用密码登录
PasswordAuthentication no
```

重启SSH服务

```bash
sudo systemctl restart sshd.service
```
