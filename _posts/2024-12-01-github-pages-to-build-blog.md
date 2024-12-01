---
layout: post
title:  利用Github搭建个人博客
date:   2024-12-01 20:01:35 +0300
image:  02.jpg
tags:   博客
---
## 介绍

GitHub Pages 是 GitHub 提供的一个静态网站托管服务，允许用户免费托管个人、项目和组织的网站。它为开发者、博客作者、开源项目等提供了一个快速、便捷、免费的方式来发布静态内容，且无需设置服务器或管理复杂的基础设施。

## 搭建

### 安装Ruby和DevKit

从[RubyInstaller](https://rubyinstaller.org/downloads/)下载`Ruby+Devkit 3.3.6-2 (x64)`安装包进行安装。安装完毕后，检查安装是否成功

```bash
ruby -v #查看ruby版本，以确认安装成功
gem -v  #查看gem版本，以确认安装成功
```

### 安装Jekyll

```bash
gem install jekyll
jekyll -v  #查看jekyll版本，以确认安装成功
```

### 下载Jeyll模板

访问[Jekyll Themes](https://jekyllthemes.io/)，选择您喜欢的主题，下载源码包

### 进入项目目录，启动程序

```bash
Jekyll server
```

### 浏览器访问测试

访问 http://localhost:4000/

## 配置GitHub Pages

### 创建github仓库

登录到您的 GitHub 账号，创建一个新的仓库，仓库名称可以是您的 GitHub 用户名，格式为 username.github.io，例如：three-ant.github.io

### 发布

将代码发布到新建的仓库。

## 问题

### 问题1

```bash
E:\workspace\agency-jekyll-theme>jekyll server
D:/Ruby33-x64/lib/ruby/3.3.0/bundler/resolver.rb:354:in `raise_not_found!': Could not find gem 'wdm (>= 0.1.0)' in locally installed gems. (Bundler::GemNotFound)
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/resolver.rb:445:in `block in prepare_dependencies'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/resolver.rb:420:in `each'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/resolver.rb:420:in `map'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/resolver.rb:420:in `prepare_dependencies'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/resolver.rb:63:in `setup_solver'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/resolver.rb:28:in `start'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/definition.rb:633:in `start_resolution'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/definition.rb:306:in `resolve'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/definition.rb:582:in `materialize'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/definition.rb:193:in `specs'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/definition.rb:260:in `specs_for'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler/runtime.rb:18:in `setup'
        from D:/Ruby33-x64/lib/ruby/3.3.0/bundler.rb:164:in `setup'
        from D:/Ruby33-x64/lib/ruby/gems/3.3.0/gems/jekyll-4.3.4/lib/jekyll/plugin_manager.rb:52:in `require_from_bundler'
        from D:/Ruby33-x64/lib/ruby/gems/3.3.0/gems/jekyll-4.3.4/exe/jekyll:11:in `<top (required)>'
        from D:/Ruby33-x64/bin/jekyll:32:in `load'
        from D:/Ruby33-x64/bin/jekyll:32:in `<main>'
```

### 解决1

```bash
gem install wdm
```
