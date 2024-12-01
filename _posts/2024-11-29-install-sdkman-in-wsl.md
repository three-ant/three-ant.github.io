---
layout: post
title:  WSL安装SDKMAN！
date:   2024-11-29 15:01:35 +0300
image:  02.jpg
tags:   开发工具
---

## 介绍

SDKMAN!（全称 Software Development Kit Manager）是一个开源的命令行工具，专门用于管理开发工具和库（SDKs）。它的主要功能是帮助开发者轻松地安装、切换和管理各种开发环境的版本，例如 JDK、Gradle、Maven、Kotlin、Scala 等

## 安装SDKMAN!（在WSL上）

### 更新系统包列表

```bash
apt update
```

### 安装依赖项

```bash
apt install curl zip unzip
```

### 安装SDKMAN!

```bash
curl -s "https://get.sdkman.io" | bash
```

SDKMAN! 默认会将所有软件安装到`~/.sdkman`目录，这里将SDKMAN!安装的软件存放到`/mnt/d/`（即D盘）。根据需求选择，如不需要可跳过这一步。

```bash
export SDKMAN_DIR="/mnt/d/sdkman" && curl -s "https://get.sdkman.io" | bash
```

### 初始化SDKMAN!

```bash
#source "$HOME/.sdkman/bin/sdkman-init.sh"
source "/mnt/d/sdkman/bin/sdkman-init.sh"
```

将命令添加到shell配置文件中，以便在每次启动shell时自动加载SDKMAN!。

```bash
#echo "source "$HOME/.sdkman/bin/sdkman-init.sh"" >> ~/.bashrc
echo "source "/mnt/d/sdkman/bin/sdkman-init.sh"" >> ~/.bashrc
```

### 验证安装是否成功

```bash
sdk version
```

## 使用SDKMAN!安装工具（以Java为例）

### 安装Java

查看可用的Java版本

```bash
sdk list java
```

安装openjdk17

```bash
sdk install java 17.0.7-open
```

### 切换Java版本

```bash
sdk use jdk 17.0.7-open
```

### 查看已安装的工具

```bash
ls $SDKMAN_DIR/candidates
```

### 卸载工具

```bash
sdk uninstall <tool> <version>
```
