---
title: "Windows10下安装Scoop"
date: 2024-11-18
summary: "本篇文章主要介绍如何在Windows10上安装Scoop"
categories: ["软件"]
tags: ["Hugo", "博客"]
---

## 1 安装Scoop

### 1.1启用PowerShell脚本执行权限

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

### 1.2安装Scoop

```powershell
iwr -useb get.scoop.sh | iex
```

## 2.修改Scoop安装路径到D盘

默认情况下，Scoop 会将软件安装在 C:\Users\<YourUsername>\scoop 目录下。如果你希望将 Scoop 安装目录和软件安装目录改为 D 盘

### 2.1创建D盘上Scoop安装目录

```powershell
New-Item -Path D:\scoop -ItemType Directory
```

### 2.2设置环境变量

```powershell
[Environment]::SetEnvironmentVariable('SCOOP', 'D:\scoop', 'User')
[Environment]::SetEnvironmentVariable('SCOOP_HOME', 'D:\scoop', 'User')
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', 'D:\scoop\apps', 'User')
```

## 3.安装软件到D盘

现在，你可以通过 Scoop 安装的软件都会安装到 D 盘的 D:\scoop\apps 目录下。例如，安装 Git：

```powershell
scoop install git

```

这样，Git 将会安装在 D:\scoop\apps\git 目录下。
