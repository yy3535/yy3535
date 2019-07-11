# 前端算法

- leetcode刷题

## 面试算法考点
- 见多识广（每个类型都要能说出一二三来，具体细节不要纠结）
- 反应迅速（快速用js实现出来栈，队列等）
- 就算立马写不出来，至少快速说出思路

## 环境搭建
- 下载源码(.babelrc .eslintrc.js package.json)
- npm instll
- 使用源码
    - master分支：环境搭建原始内容(git checkout master)
    - dev分支：所有源码(git checkout dev)
- 检验代码是否正常 `npm test`

## 基础算法-字符串
### 反转字符串中的单词 III
给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

示例 1:

输入: "Let's take LeetCode contest"
输出: "s'teL ekat edoCteeL tsetnoc" 
注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
- 注意点
    - 让代码更加优雅（不要产生多余的变量）

```js
var reverseWords = function(s) {
    return s.split(' ').map(item=>{
        return item.split('').reverse().join('');
    }).join(' ');
};
```
```js
var reverseWords = function(s) {
    // 体现出split两种用法都清楚
    return s.split(/\s/g).map(item=>{
        return item.split('').reverse().join('');
    }).join(' ');
};
```
```js
var reverseWords = function(s) {
    // 使用match来做（大于一个单词或者'的集合的数组）
    return s.match(/[\w']+/g).map(item=>{
        return item.split('').reverse().join('');
    }).join(' ');
};
```
```js
var reverseWords = function(s) {
    // 重写以上
    if (str.length < 1) return ''
    return str.match(/[\S]+/g).map(item => {
        return item.split('').reverse().join('')
    }).join(' ')
};
```
### 计数二进制子串
```js
给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。

重复出现的子串要计算它们出现的次数。

示例 1 :

输入: "00110011"
输出: 6
解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。

请注意，一些重复出现的子串要计算它们出现的次数。

另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。
示例 2 :

输入: "10101"
输出: 4
解释: 有4个子串：“10”，“01”，“10”，“01”，它们具有相同数量的连续1和0。
注意：

s.length 在1到50,000之间。
s 只包含“0”或“1”字符。
```
- 写出所有情况，然后找出规律
  - 00110011--->0011
  - 0110011 --->01
  - 110011  --->1100
  - 10011   --->10
  - 0011    --->0011
  - 011     --->01
  - 11      --->
  - 1       --->
```js
var countBinarySubstrings=function(str){
    // 建立数据结构，堆栈，保存数据
    let r = []
    // 给一个字符串返回第一个符合条件的子串
    let match = (str) => {
      let j = str.match(/^(0+|1+)/)[0]
      // 与运算1变0，0变1
      let o = (j[0] ^ 1).toString().repeat(j.length)
      // 正则对象中可以使用模板字符串来用变量
      let reg = new RegExp(`^(${j}${o})`)
      if (reg.test(str)) {
          // 返回匹配到的第一个结果
          return RegExp.$1
      } else {
          return ''
      }
    }
    // 依次把最前面的数字去掉
    for (let i = 0, len = str.length - 1; i < len; i++) {
        let sub = match(str.slice(i))
        if (sub) {
            r.push(sub)
        }
    }
    return r
}
countBinarySubstrings('00101')
```
- 知识点
    - slice
    - match
    - repeat
    - push 
    - RegExp

## 基础算法-数组
### 公式运算（电话号码的组合）

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![电话号码组合](./img/17_telephone_keypad.png)

示例:

输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

- 找出规律：只要前两项合并好,替代原来数组，再继续和后面合并
- 写出程序伪代码
```js
export default (str) => {
  // 对输入做处理，如果小于1返回空（LeetCode测试用例）
  if (str.length < 1) return []
  // 建立电话号码键盘映射
  let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  // 如果只给了一个按键，直接把按键内容取出来并按单个字符分组就可以了（LeetCode测试用例）
  if (str.length < 2) return map[str].split('')
  // 把输入字符串按单字符分隔变成数组，234=>[2,3,4]
  let num = str.split('')
  // 保存键盘映射后的字母内容，如 23=>['abc','def']
  let code = []
  num.forEach(item => {
    if (map[item]) {
      code.push(map[item])
    }
  })
  let comb = (arr) => {
    // 临时变量用来保存前两个组合的结果
    let tmp = []
    // 最外层的循环是遍历第一个元素，里层的循环是遍历第二个元素
    for (let i = 0, il = arr[0].length; i < il; i++) {
      for (let j = 0, jl = arr[1].length; j < jl; j++) {
        tmp.push(`${arr[0][i]}${arr[1][j]}`)
      }
    }
    arr.splice(0, 2, tmp)
    if (arr.length > 1) {
      comb(arr)
    } else {
      return tmp
    }
    // 函数体应该返回第一个，最终只剩一个
    return arr[0]
  }
  return comb(code)
}
```

### 归类运算（卡牌分组）
```js
给定一副牌，每张牌上都写着一个整数。

此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：

每组都有 X 张牌。
组内所有的牌上都写着相同的整数。
仅当你可选的 X >= 2 时返回 true。

 

示例 1：

输入：[1,2,3,4,4,3,2,1]
输出：true
解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
示例 2：

输入：[1,1,1,2,2,2,3,3]
输出：false
解释：没有满足要求的分组。
示例 3：

输入：[1]
输出：false
解释：没有满足要求的分组。
示例 4：

输入：[1,1]
输出：true
解释：可行的分组是 [1,1]
示例 5：

输入：[1,1,2,2,2,2]
输出：true
解释：可行的分组是 [1,1]，[2,2]，[2,2]

提示：

1 <= deck.length <= 10000
0 <= deck[i] < 10000
```
- 看题目
    - 答案都是排序的，所以需要先排序
    - 相同数字过多需要拆分，是最大公约数即可
![最大公约数](./img/最大公约数.jpg)
```js
// 
export default (arr)=>{
  // 求最大公约数
  let gcd=(a,b)=>{
    if(b===0){
      return a
    }else{
      return gcd(b,a%b)
    }
  }
  // 分组(单张或者多张)
  let group=str.match(/(\d)\1+|\d/g)
  while(group.length>1){
    let a=group.shift().length
    let b=group.shift().length
    let v=gcd(a,b)
    if(v===1){
      return false
    }else{
      // 结果放进去跟下一个比
      group.unshift('0'.repeat(v))
    }
  }
  return group.length?group[0].length>1:false
}
```

### 筛选运算（种花问题）
```js
假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。

示例 1:

输入: flowerbed = [1,0,0,0,1], n = 1
输出: True
示例 2:

输入: flowerbed = [1,0,0,0,1], n = 2
输出: False
注意:

数组内已种好的花不会违反种植规则。
输入的数组长度范围为 [1, 20000]。
n 是非负整数，且不会超过输入数组的大小。
```
- 技巧：把输入边长
```js
// 场景一
[0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1]
// 场景二
[1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1]
[0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1]
```
- 问题：
  - 边界问题
  - 条件010
  [0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1]
+1 | |
```js
for(let i=0,len=arr.length-1;i<len;i++){
  if(arr[i]===0){
    if(i===0&&arr[1]===0){
      max++
      i+=1
    }else if(arr[i-1]===0&&arr[i+1]===0){
      max++
      i+=1
    }
  }
}
```
```js
export default (arr,n)=>{
  // 计数器
  let max=0
  for(let i=0,len=arr.length-1;i<len;i++){
    if(arr[i]===0){
      if(i===0&&arr[1]===0){
        max++
        i++
      }else if(arr[i-1]===0&&arr[i+1]===0){
        max++
        i++
      }
    }
  }
  return max >= n
}
```
- 总结
  - 学会问题抽象
  - 学会数学建模思想
  - 学会动态输入（多找输入，而不是通过该代码）
### 二进制运算（格雷编码）
```js
格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头。

示例 1:

输入: 2
输出: [0,1,3,2]
解释:
00 - 0
01 - 1
11 - 3
10 - 2

对于给定的 n，其格雷编码序列并不唯一。
例如，[0,2,3,1] 也是一个有效的格雷编码序列。

00 - 0
10 - 2
11 - 3
01 - 1
示例 2:

输入: 0
输出: [0]
解释: 我们定义格雷编码序列必须以 0 开头。
     给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。
     因此，当 n = 0 时，其格雷编码序列为 [0]。
```
![格雷编码](./img/格雷编码.jpg)
```js
export default (n)=>{
  // 递归函数，用来算输入为n的格雷编码序列
  let make=(n)=>{
    if(n===1){
      return ['0','1']
    }else{
      let prev=make(n-1)
      let result=[]
      let max=Math.pow(2,n)-1
      for(let i=0,len=rev.length;i<len;i++){
        result[i]=`0${prev[i]}`
        result[max-i]=`1${prev[i]}`
      }
      return result
    }
  }
  return make(n)
}
```
- 发现规律，动态输入

## 正则表达式
### 重复的子字符串
```js
给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。

示例 1:

输入: "abab"

输出: True

解释: 可由子字符串 "ab" 重复两次构成。
示例 2:

输入: "aba"

输出: False
示例 3:

输入: "abcabcabcabc"

输出: True

解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
```
- 用正则去做
- 


### 正则表达式匹配

