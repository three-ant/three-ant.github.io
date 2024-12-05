---
layout: post
title:  求满足条件的最长子串的长度
date:   2024-12-05 07:07:35 +0300
image:  02.jpg
tags:   算法
---

## 题目描述

VLAN是一种对局域网设备进行逻辑划分的技术，为了标识不同的VLAN，引入VLAN ID(1-4094之间的整数)的概念。定义一个VLAN ID的资源池(下称VLAN资源池)，资源池中连续的VLAN用开始VLAN-结束VLAN表示，不连续的用单个整数表示，所有的VLAN用英文逗号连接起来，

现在有一个VLAN资源池，业务需要从资源池中申请一个VLAN，需要你输出从VLAN资源池中移除申请的VLAN后的资源池,

## 输入描述

第一行为字符串格式的VLAN资源池，第二行为业务要申请的VLAN，VLAN的取值范围为[1,4094]之间的整数。

## 输出描述

从输入VLAN资源池中移除申请的VLAN后字符串格式的VLAN资源池，输出要求满足题目描述中的格式，并且按照VLAN从小到大升序输出。

如果申请的VLAN不在原VLAN资源池内，输出原VLAN资源池升序排序后的字符串即可，

## 备注

输入VLAN资源池中VLAN的数量取值范围为[2-4094]间的整数，资源池中VLAN不重复且合法([1,4094]之间的整教)，输入是乱序的。

## 用例：


|     |      |
|-----|------|
| 输入 | 1-5 <br> 2|
| 输出 |1,3-5|
|说明|原VLAN资源池中有VLAN1、2、3、4、5，从资源池中移除2，剩下1、3、4、5，按照描述格式升序后的结果为1，3-5|

|     |      |
|-----|------|
| 输入 | 5，1-3 <br> 10|
| 输出 |1-3，5|
|说明|原VLAN资源池中有VLAN1、2、3、5，申请的VLAN10不在原资源池中，，将原资源池按照描述格式升序后的结果为1-3，5|

## 解决思路：

### 输入格式解析：

- 输入的VLAN资源池是一个字符串，其中包含多个VLAN（整数），可能是连续的，也可能是单独的数字。连续的VLAN以开始VLAN-结束VLAN的格式表示。

- 目标是从资源池中移除一个特定的VLAN。

### 移除指定VLAN：

- 如果申请的VLAN存在于资源池中，我们需要根据给定的格式（即区间或单个VLAN）调整资源池，去掉该VLAN。

- 如果申请的VLAN不在资源池中，则直接输出原资源池。

### 输出格式：

- 结果需要按照VLAN从小到大升序排列。

- 资源池中的VLAN按区间或者单独数字的格式输出。

## 代码实现

```java
import java.util.*;

public class VLANPool {
    
    // 解析VLAN资源池
    public static List<Integer> parseVLANPool(String poolStr) {
        List<Integer> vlanList = new ArrayList<>();
        String[] parts = poolStr.split(",");
        
        for (String part : parts) {
            if (part.contains("-")) {
                // 处理区间
                String[] range = part.split("-");
                int start = Integer.parseInt(range[0]);
                int end = Integer.parseInt(range[1]);
                for (int i = start; i <= end; i++) {
                    vlanList.add(i);
                }
            } else {
                // 处理单个VLAN
                vlanList.add(Integer.parseInt(part));
            }
        }
        Collections.sort(vlanList);
        return vlanList;
    }
    
    // 将VLAN列表转换为字符串格式
    public static String formatVLANPool(List<Integer> vlanList) {
        if (vlanList.isEmpty()) {
            return "";
        }
        
        List<String> result = new ArrayList<>();
        int start = vlanList.get(0);
        int end = vlanList.get(0);
        
        for (int i = 1; i < vlanList.size(); i++) {
            if (vlanList.get(i) == end + 1) {
                // 连续的VLAN，继续扩展
                end = vlanList.get(i);
            } else {
                // 非连续VLAN，结束当前区间并保存
                if (start == end) {
                    result.add(String.valueOf(start));
                } else {
                    result.add(start + "-" + end);
                }
                start = vlanList.get(i);
                end = vlanList.get(i);
            }
        }
        
        // 处理最后一个区间
        if (start == end) {
            result.add(String.valueOf(start));
        } else {
            result.add(start + "-" + end);
        }
        
        return String.join(",", result);
    }
    
    public static String removeVLAN(String poolStr, int vlanToRemove) {
        List<Integer> vlanList = parseVLANPool(poolStr);
        
        // 如果VLAN资源池不包含该VLAN，直接返回原始资源池
        if (!vlanList.contains(vlanToRemove)) {
            return poolStr;
        }
        
        // 移除该VLAN
        vlanList.remove(Integer.valueOf(vlanToRemove));
        
        // 重新格式化资源池
        return formatVLANPool(vlanList);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 第一行是VLAN资源池字符串
        String vlanPool = scanner.nextLine().trim();
        
        // 第二行是业务要申请的VLAN
        int vlanToRemove = Integer.parseInt(scanner.nextLine().trim());
        
        // 计算移除指定VLAN后的资源池
        String result = removeVLAN(vlanPool, vlanToRemove);
        
        // 输出结果
        System.out.println(result);
        
        scanner.close();
    }
}
```
