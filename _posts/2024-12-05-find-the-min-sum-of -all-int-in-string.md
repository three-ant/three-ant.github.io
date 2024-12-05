---
layout: post
title:  求字符串中所有整数的最小和
date:   2024-12-05 07:04:35 +0300
image:  02.jpg
tags:   算法
---

## 题目描述

输入字符串s，输出s中包含所有整数的最小和。

说明:

字符串s，只包含 a-zA-Z±;

合法的整数包括

1)正整数 一个或者多个0-9组成,如 0 2 3 002 102

2)负整数 负号-开头，数字部分由一个或者多个0-9组成,如 -0 -012 -23 -00023

## 输入描述

包含数字的字符串

## 输出描述

所有整数的最小和

## 用例

|     |      |
|-----|------|
| 输入 | bb1234aa|
| 输出 |10|

|     |      |
|-----|------|
| 输入 | bb12-34aa|
| 输出 |-31|
| 说明 |1+2+(-34)=-31|

## 解题思路

提取合法整数：

- 使用正则表达式来提取字符串中的所有整数，包括正整数和负整数。
- 正整数的形式：由一个或多个数字组成，可能带有前导零（例如 012）。
- 负整数的形式：以 - 开头，后面跟着一个或多个数字，也可能带有前导零（例如 -00023）。

计算最小和：

- 提取到整数后，转换为整数类型，并计算它们的和。

## 代码实现

```java
import java.util.*;
import java.util.regex.*;

public class MinimumSumOfIntegers {
    
    public static int getMinimumSum(String s) {
        // 正则表达式：匹配负整数或者正整数
        Pattern pattern = Pattern.compile("-?\\d+");
        Matcher matcher = pattern.matcher(s);
        
        int sum = 0;
        
        // 遍历所有匹配的整数
        while (matcher.find()) {
            // 将匹配到的字符串转换为整数
            int num = Integer.parseInt(matcher.group());
            sum += num;  // 累加到总和
        }
        
        return sum;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 读取输入的字符串
        String s = scanner.nextLine().trim();
        
        // 获取所有整数的最小和
        int result = getMinimumSum(s);
        
        // 输出结果
        System.out.println(result);
        
        scanner.close();
    }
}
```
