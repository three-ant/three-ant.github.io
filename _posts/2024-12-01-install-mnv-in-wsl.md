---
layout: post
title:  WSL安装MVN
date:   2024-12-01 15:01:35 +0300
image:  02.jpg
tags:   开发工具
---

## 介绍

NVM（Node Version Manager）是一个用于管理 Node.js 版本的工具，它允许开发者轻松地安装、卸载、切换和管理多个 Node.js 版本。NVM 可以帮助你在同一台机器上运行不同版本的 Node.js，非常适合需要兼容多个版本的项目和开发环境。

## 安装NVM（在WSL上）

### 安装NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```


### 配置NVM安装目录

在`~/.bashrc`配置文件中添加`NVM_DIR`环境变量，

```bash
export NVM_DIR="/mnt/d/nvm"
export NVM_SYMLINK_DIR="/mnt/d/nvm"
```

### 使配置生效

```bash
source ~/.bashrc   # 或者使用 source ~/.zshrc
```

### 查看可用版本

```bash
nvm ls-remote
```


### 安装Node.js

```bash
nvm install 16
```

### 验证安装

```bash
node -v
npm -v
```

### 切换版本

```bash
nvm use 16
```

### 卸载版本

```bash
nvm uninstall 16
```
