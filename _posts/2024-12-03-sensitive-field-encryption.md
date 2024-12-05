---
layout: post
title:  敏感字段加密
date:   2024-12-03 07:01:35 +0300
image:  02.jpg
tags:   算法
---

## 题目描述

给定一个由多个命令字组成的命令字符串:

1、字符串长度小于等于127字节，只包含大小写字母，数字下划线和偶数个双引号;

2、命令字之间以一个或多个下划线_进行分割;

3、可以通过两个双引号””来标识包含下划线_的命令字或空命令字(仅包含两个双引号的命令字)，双引号不会在命令字内部出现;

请对指定索引的敏感字段进行加密，替换为******(6个*)并删除命令字前后多余的下划线_。如果无法找到指定索引的命令字，输出字符串错误ERROR。

## 输入描述

输入为两行，第一行为命令字索引K(从0开始)，第二行为命令字符串S。

## 输出描述

输出处理后的命令字符串，如果无法找到指定索引的命令字，输出字符串错误ERROR

## 用例

|     |      |
|-----|------|
| 输入 | 1 <br> password_a12345678_timeout_100 |
| 输出 |password_a12345678_timeout_100|

|     |      |
|-----|------|
| 输入 | 2 <br> aaa_password_"a12_45678"_timeout_100_""_ |
| 输出 |aaa_password_******_timeout_100_""|

## 规则

- 命令字之间由一个或多个下划线 _ 分隔。

- 双引号 "" 用来标识一个包含下划线或空命令字的命令字。双引号内不会包含其他引号。

- 对指定索引的命令字进行加密，将其替换为 ******（6个星号），并删除命令字前后的多余下划线 _。

- 如果指定的索引无法找到对应的命令字，输出 ERROR。

## 解决思路

- 解析命令字：我们首先需要正确地解析输入字符串，识别命令字。如果命令字是由双引号包围的，则将其视为一个命令字。否则，按下划线分隔的部分是命令字。

- 加密处理：根据指定的索引，找到命令字并将其替换为 ******。然后，我们需要确保命令字两边的下划线被删除。

- 错误处理：如果索引超出命令字范围，则输出 ERROR。

## 实现代码

```java
import java.util.*;

public class CommandProcessor {

    public static void main(String[] args) {
        // 读取输入
        Scanner scanner = new Scanner(System.in);
        int k = Integer.parseInt(scanner.nextLine().trim());  // 索引K
        String s = scanner.nextLine().trim();  // 命令字符串S

        // 处理命令字符串
        String result = processCommand(k, s);
        System.out.println(result);
    }

    public static String processCommand(int k, String s) {
        // Step 1: 解析命令字符串
        List<String> commandList = parseCommands(s);
        
        // Step 2: 如果指定的索引超出范围，返回ERROR
        if (k < 0 || k >= commandList.size()) {
            return "ERROR";
        }
        
        // Step 3: 对指定索引的命令字进行加密
        commandList.set(k, "******");
        
        // Step 4: 重建命令字符串并删除前后的多余下划线
        return buildCommandString(commandList);
    }

    // 解析命令字符串，将命令字分隔到一个列表中
    private static List<String> parseCommands(String s) {
        List<String> commands = new ArrayList<>();
        int i = 0;
        int n = s.length();
        
        while (i < n) {
            if (s.charAt(i) == '"') {
                // 双引号包围的命令字
                int j = i + 1;
                while (j < n && s.charAt(j) != '"') {
                    j++;
                }
                // 提取双引号内的命令字
                commands.add(s.substring(i, j + 1));
                i = j + 1;
            } else {
                // 普通命令字，按下划线分隔
                int j = i;
                while (j < n && s.charAt(j) != '_') {
                    j++;
                }
                commands.add(s.substring(i, j));
                i = j;
            }
            
            // 跳过多个下划线
            while (i < n && s.charAt(i) == '_') {
                i++;
            }
        }
        return commands;
    }

    // 重建命令字符串，去掉前后的下划线
    private static String buildCommandString(List<String> commandList) {
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < commandList.size(); i++) {
            if (i > 0) {
                sb.append('_');  // 连接命令字之间的下划线
            }
            sb.append(commandList.get(i));
        }
        
        return sb.toString();
    }
}

```
