---
layout: post
title:  求满足条件的最长子串的长度
date:   2024-12-07 07:07:35 +0300
image:  02.jpg
tags:   算法
---

## 题目描述

给定一个非空字符串S，其被N'-'分隔成N+1的子串，给定正整数K，要求除第一个子串外，其余的子串每K个字符组成新的子串，并'-'分隔。

对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母;反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母;大小写字母的数量相等时，不做转换。

## 输入描述

输入为两行，第一行为参数K，第二行为字符串S,

## 输出描述

输出转换后的字符串。

## 用例

|||
|---|---|
|输入|3<br> 12abc-abCABc-4aB@|
|输出|12abc-abc-ABC-4aB-@|
|说明|子串为12abc、abCABc、4aB@，第一个子串保留，后面的子串每3个字符一组为abC、ABc、4aB、@，abC中小写字母较多，转换为abc，ABc中大写字母较多，转换为ABC，4aB中大小写字母都为1个，不做转换，@中没有字母，连起来即12abc-abc-ABC-4aB-@|

|||
|---|---|
|输入|12<br>12abc-abCABc-4aB@|
|输出|12abc-abCABc4aB@|
|说明|子串为12abc、abCABc、4aB@，第一个子串保留后面的子串每12个字符一组为abCABc4aB@,这个子串中大小写字母都为4个，不做转换，连起来即12abc-abCABc4aB@|

## 解题思路

### 字符串分割：

- 给定字符串 S 使用 - 进行分割，分割后得到多个子串。
分割后的子串处理：

### 保持第一个子串不变。

- 对于后续每个子串，按照给定的 K 将它分成多个子串，每个新的子串最多包含 K 个字符。

### 字母大小写转换：

- 对每个新组成的子串，计算小写字母和大写字母的数量：
- 如果小写字母多，则将所有大写字母转换为小写字母。
- 如果大写字母多，则将所有小写字母转换为大写字母。
- 如果大小写字母数量相等，则不进行任何转换。
-

## 拼接处理后的子串：

- 最终将所有处理后的子串按 - 拼接起来，得到最终的结果。

## 代码实现

```java
import java.util.*;

public class StringTransformation {
    
    // 方法：处理每个子串并转换大小写
    public static String transformSubstring(String s) {
        int lowercaseCount = 0;
        int uppercaseCount = 0;
        
        // 计算小写字母和大写字母的数量
        for (char c : s.toCharArray()) {
            if (Character.isLowerCase(c)) {
                lowercaseCount++;
            } else if (Character.isUpperCase(c)) {
                uppercaseCount++;
            }
        }
        
        // 根据字母数量决定转换
        if (lowercaseCount > uppercaseCount) {
            // 小写字母多，将大写字母转换为小写
            return s.toLowerCase();
        } else if (uppercaseCount > lowercaseCount) {
            // 大写字母多，将小写字母转换为大写
            return s.toUpperCase();
        } else {
            // 大小写字母相等，不做转换
            return s;
        }
    }

    // 方法：分割并处理字符串
    public static String processString(int K, String S) {
        // 按照'-'分割字符串
        String[] parts = S.split("-");
        
        // 第一个子串保持不变
        StringBuilder result = new StringBuilder(parts[0]);
        
        // 处理剩下的子串
        for (int i = 1; i < parts.length; i++) {
            String subString = parts[i];
            List<String> chunks = new ArrayList<>();
            
            // 将每个子串按K个字符进行分割
            for (int j = 0; j < subString.length(); j += K) {
                int end = Math.min(j + K, subString.length());
                chunks.add(subString.substring(j, end));
            }
            
            // 对每个子串进行转换并拼接
            for (String chunk : chunks) {
                result.append("-");
                result.append(transformSubstring(chunk));
            }
        }
        
        return result.toString();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 读取K值
        int K = Integer.parseInt(scanner.nextLine().trim());
        
        // 读取字符串S
        String S = scanner.nextLine().trim();
        
        // 处理字符串并输出结果
        String result = processString(K, S);
        System.out.println(result);
        
        scanner.close();
    }
}
```
