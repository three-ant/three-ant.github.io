---
layout: post
title:  IPV4地址转整数
date:   2024-12-05 07:01:35 +0300
image:  02.jpg
tags:   算法
---

## 题目描述

存在一种虚拟IPv4地址，由4小节组成，每节的范围为0~255，以#号间隔，虚拟IPv4地址可以转换为一个32位的整教，例如:

- 128#0#255#255，转换为32位整数的结果为2147549183(0x8000FFFF)

- 1#0#0#0，转换为32位整数的结果为16777216(0x01000000)

现以字符串形式给出一个虚拟IPv4地址，限制第1小节的范围为1~128，即每一节范围分别为(1~128)#(0~255)#(0~255)#(0-255),要求每个IPv4地址只能对应到唯一的整数上。

如果是非法IPv4，返回invalid IP

## 输入描述

输入一行，虚拟IPv4地址格式字符串

## 输出描述

输出一行，按照要求输出整型或者特定字符

## 备注

输入不能确保是合法的IPv4地址，需要对非法IPv4(空串，含有IP地址中不存在的字符，非合法的#分十进制，十进制整数不在合法区间内)进行识别，返回特定错误

## 用例

|     |      |
|-----|------|
| 输入 | 100#101#1#5|
| 输出 |1684340997|

|     |      |
|-----|------|
| 输入 | 1#2#3|
| 输出 |invalid IP|

## 解决思路

### 输入验证： 需要检查输入是否符合虚拟IPv4的格式要求。

- 地址由四个数字部分组成，并以`#`分隔。
- 第一个数字的范围是 1~128，后面三个数字的范围是 0~255。
- 需要确保输入字符串中没有非法字符，比如字母、空格等，且每部分是合法的数字。

### 转换过程：

将IPv4地址的四个数字部分解析为整数，并通过位运算将它们拼接成一个32位的整数。

- 第一个数字左移24位，第二个数字左移16位，第三个数字左移8位，第四个数字直接保留。

### 边界条件： 如果输入不合法（比如格式不对、数字超范围等），返回 invalid IP。

## 代码实现

```java
import java.util.Scanner;

public class VirtualIPv4ToInt {
    
    public static String convertToInt(String ipStr) {
        // 判断是否为空字符串
        if (ipStr == null || ipStr.isEmpty()) {
            return "invalid IP";
        }
        
        // 分割IP地址
        String[] parts = ipStr.split("#");
        
        // 判断分割后部分是否为四段
        if (parts.length != 4) {
            return "invalid IP";
        }
        
        try {
            // 将每一部分转为整数
            int a = Integer.parseInt(parts[0]);
            int b = Integer.parseInt(parts[1]);
            int c = Integer.parseInt(parts[2]);
            int d = Integer.parseInt(parts[3]);
            
            // 判断每一部分是否在合法的范围内
            if (a < 1 || a > 128 || b < 0 || b > 255 || c < 0 || c > 255 || d < 0 || d > 255) {
                return "invalid IP";
            }
            
            // 计算32位整数
            int result = (a << 24) | (b << 16) | (c << 8) | d;
            return String.valueOf(result);
        } catch (NumberFormatException e) {
            // 处理无法转换为整数的情况
            return "invalid IP";
        }
    }

    public static void main(String[] args) {
        // 创建输入扫描器
        Scanner scanner = new Scanner(System.in);
        
        // 读取输入的IPv4地址
        String ipStr = scanner.nextLine().trim();
        
        // 输出结果
        System.out.println(convertToInt(ipStr));
        
        scanner.close();
    }
}
```
