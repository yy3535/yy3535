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
![最大公约数](./img/divisor.jpg)
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
![格雷编码](./img/Gray.jpg)
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
/^(\w+)\1+$/即为对应正则表达式
```js
export default (str)=>{
    var reg=/^(\w+)\1+$/
    return reg.test(str)
}
```


### 正则表达式匹配
```js
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

说明:

s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
示例 1:

输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
示例 2:

输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
示例 3:

输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
示例 4:

输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
示例 5:

输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
```
- 一个字符一个字符对比，对比完一个扔掉一组，然后重复刚才的动作
- 三种情况：无模式，有模式*,有模式.

```js
export default (s,p)=>{
    let isMatch=(s,p)=>{
        // 边界情况，如果s和p都为空，说明处理结束，返回true，否则返回false
        if(p.length<=0){
            return !s.length
        }
        // 判断p模式字符串的第一个字符和s字符串的第一个字符是不是匹配
        let match=false
        if(s.length>0&&(p[0]===s[0]||p[0]==='.')){
            match=true
        }
        // p有模式的
        if(p.length>1&&p[1]==='*'){
            // 第一种情况：s*匹配0个字符
            // 第二种情况：s*匹配1个字符，递归下去，用来表示s*匹配多个s
            return isMatch(s,p.slice(2))||(match && isMatch(s.slice(1),p))
        }else{
            return match && isMatch(s.slice(1),p.slice(1))
        }
    }
    return isMatch(s,p)
}
```

## 排序类
![各类排序](./img/sort1.jpg)
- 时间复杂度
    - 运行的次数(常数：O(1)，线性关系O(n),倍数关系：O(n*2))
- 空间复杂度
    - 占用的内存(常数：o1,线性关系O(n),倍数关系O(n*2))
### 冒泡排序（先把最大值冒出来，再把倒数第二大的冒出来，以此类推
）
- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较
- <img :src="$withBase('/img/bubbleSort.gif')">
```js
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                var temp = arr[j+1];        // 元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
```
### 选择排序（选中最小的值，和第一个交换，再选中第二小的值，和第二个交换，以此类推）
    - 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
    - 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
    - 重复第二步，直到所有元素均排序完毕。
    - <img :src="$withBase('/img/selectionSort.gif')">
```js
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
```
### 922.按奇偶排序
```js
给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。

对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。

你可以返回任何满足上述条件的数组作为答案。

 

示例：

输入：[4,2,5,7]
输出：[4,5,2,7]
解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
 

提示：

2 <= A.length <= 20000
A.length % 2 == 0
0 <= A[i] <= 1000
```
```js
export default (arr)=>{
    // 升序排序
    arr.sort((a,b)=>a-b)
    // 声明一个空数组用来存储奇偶排序后的数组
    let r=[]
    // 记录奇数，偶数位下标
    let odd=1
    let even=0
    // 对数组进行遍历
    arr.forEach(item=>{
        if(item%2===1){
            r[odd]=item
            odd+=2
        }else{
            r[even]=item
            even+=2
        }
    })
    return r
}
```
sort(compareFunction)
- 如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFunction），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。
- 指定了compareFunction，a-b从小到大，b-a从大到小
### 数组中的第K个最大元素
```js
在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
```
```js
export default (arr)=>{
    return arr.sort((a,b)=>b-a)[k-1]
}
```
```js
// 更高性能的办法
export default (arr)=>{
    let len=arr.length
    for(let i=len,;i<len-k;i--){
        for(let j=0;j<i;j++){
            temp=arr[j]
            if(temp>arr[j+1]){
                arr[j]=arr[j+1]
                arr[j+1]=temp
            }
        }
    }
    return arr[len-(k-1)]
}
```
- 一定要吃透基本排序法



### 最大间距
```js
给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。

如果数组元素个数小于 2，则返回 0。

示例 1:

输入: [3,6,9,1]
输出: 3
解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
示例 2:

输入: [10]
输出: 0
解释: 数组元素个数小于 2，因此返回 0。
说明:

你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。
```
```js
export default (arr)=>{
    if(arr.length<2) return 0
    let len=arr.length-1
    let max=0;
    for(let i=len;i>=0;i--){
        for(let j=0;j<i;j++){
            let temp=arr[j]
            if(arr[j]>arr[j+1]){
                arr[j]=arr[j+1]
                arr[j+1]=temp
            }
            if(i<len){
                let space=arr[j+1]-arr[j]
                if(space>max){
                    max=space
                }
            }
        }
    }
    return max
}
```



### 缺失的第一个正数
```js
给定一个未排序的整数数组，找出其中`没有出现的``最小的``正整数`。

示例 1:

输入: [1,2,0]
输出: 3
示例 2:

输入: [3,4,-1,1]
输出: 2
示例 3:

输入: [7,8,9,11,12]
输出: 1
说明:

你的算法的时间复杂度应为O(n)，并且只能使用常数级别的空间。
```

```js
export default (arr)=>{
    // 过滤掉非正整数
    arr=arr.filter(item=>item>0)
    // 正整数数组是不是为空
    if(arr.length){
        // 升序，方便取最小值
        arr.sort((a,b)=>a-b)
        // 第一个元素不为1，返回1
        if(arr[0]!==1){
            return 1
        }else{
            // 从左边开始遍历，只要下一个元素和当前元素差值>1，返回当前元素加1
            for(let i=0,len=arr.length-1;i<len;i++){
                if(arr[i+1]-arr[i]>1){
                    return arr[i]+1
                }
            }
            // 如果是连续正整数，则返回最后一个元素加1
            return arr.pop()+1
        }
    }else{
        return 1
    }
}
```
```js
// 使用选择排序
export default (arr)=>{
    // 过滤掉非正整数
    arr=arr.filter(item=>item>0)
    // 实现选择排序，先拿到最小值，如果第一个元素不是1直接返回1，如果是1，就要比相邻元素差值
    for(let i=0,len=arr.length,min;i<len;i++){
        min=arr[i]
        for(let j=i+1;j<len;j++){
            if(arr[j]<min){
                let c=min
                min=arr[j]
                arr[j]=c
            }
        }
        arr[i]=min
        if(i>0){
            if(arr[i]-arr[i-1]>1){
                return arr[i-1]+1
            }
        }else{
            if(min!==1){
                return 1
            }
        }
    }
    return arr.length?arr.pop()+1:1
}
```
## 基础算法之递归类
### 复原IP地址
```js
给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

示例:

输入: "25525511135"
输出: ["255.255.11.135", "255.255.111.35"]
```
- IP由4部分构成，每部分范围0~255（递归）
```js
export default (str)=>{
    // 保存所有符合条件的ip
    let r=[]
    // 递归函数
    let search=(cur,sub)=>{
        if(cur.length===4&&cur.join('')===str){
            r.push(cur.join('.'))
        }else{
            for(let i=0,len=Math.min(3,sub.length),tmp;i<len;i++){
                tmp=sub.substr(0,i+1)
                if(tmp<256){
                    search(cur.concat([tmp]),sub.substr(i+1))
                }
            }
        }
    }
    search([],str)
    return r
}

```
- 递归的本质
  - 每一个处理过程是相同的
  - 输入输出是相同的
  - 处理次数未知
### 与所有单词相关联的字符串
```js
给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

示例 1：

输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoor" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
示例 2：

输入：
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
输出：[]
```
```js
export default (str,words)=>{
    // 保存结果
    let result=[]
    // 记录数组的长度，做边界条件计算
    let num=words.length
    // 递归函数体
    let range=(r,_arr)=>{
        if(r.length===num){
            result.push(r)
        }else{
            _arr.forEach((item,idx)=>{
                // 当前元素踢出去，留下剩下的
                let tmp=[].concat(_arr)
                tmp.splice(idx,1)
                range(r.concat(item),tmp)
            })
        }
    }
    range([], words)
    // [0,9,-1]
    return result.map(item=>{
        return str.indexOf(item.join(''))
    }).filter(item=>item!==-1).sort()
}
```

## 数据结构之栈
- 栈的概念
  - 线性表，运算受限（仅允许一端的插入和删除）
### 棒球比赛
```js
你现在是棒球比赛记录员。
给定一个字符串列表，每个字符串可以是以下四种类型之一：
1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。

每一轮的操作都是永久性的，可能会对前一轮和后一轮产生影响。
你需要返回你在所有回合中得分的总和。

示例 1:

输入: ["5","2","C","D","+"]
输出: 30
解释: 
第1轮：你可以得到5分。总和是：5。
第2轮：你可以得到2分。总和是：7。
操作1：第2轮的数据无效。总和是：5。
第3轮：你可以得到10分（第2轮的数据已被删除）。总数是：15。
第4轮：你可以得到5 + 10 = 15分。总数是：30。
示例 2:

输入: ["5","-2","4","C","D","9","+","+"]
输出: 27
解释: 
第1轮：你可以得到5分。总和是：5。
第2轮：你可以得到-2分。总数是：3。
第3轮：你可以得到4分。总和是：7。
操作1：第3轮的数据无效。总数是：3。
第4轮：你可以得到-4分（第三轮的数据已被删除）。总和是：-1。
第5轮：你可以得到9分。总数是：8。
第6轮：你可以得到-4 + 9 = 5分。总数是13。
第7轮：你可以得到9 + 5 = 14分。总数是27。
注意：

输入列表的大小将介于1和1000之间。
列表中的每个整数都将介于-30000和30000之间。
```
```js
export default (arr)=>{
    // 用数组来实现堆栈结构，pop,push(从后面添加，从后面删除)
    let result=[]
    // 上一轮的数据
    let pre1
    // 上上轮的数据
    let pre2
    // 对数组进行遍历，遍历的目的是处理得分
    arr,forEach(item=>{
        switch(item){
            case 'C':
                if(result.length){
                    result.pop()
                }
                break
            case 'D':
                pre1=result.pop()
                result.push(pre1,pre1*2)
                break
            case '+':
                pre1=result.pop()
                pre2=result.pop()
                result.push(pre2,pre1,pre1+pre2)
                break
            default:
                result.push(item*1)
                break
        }
    })
    return result.reduce((total,num)=>{total+num})
}
```

### 最大矩形
```js
给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

示例:

输入:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出: 6
```
![最大矩形](./img/biggestRectangle.png)
```js
export default (arr)=>{
    let result=[]
    let reg=/1{2,}/g
    // 把二维数组重新表达，把相邻的1提取处理（起始点+截止点）
    arr=arr.map(item=>{
        let str=item.join('')
        let r=reg.exec(str)
        let rs=[]
        while(r){
            rs.push([r.index,r.index+r[0].length-1])
            r=reg.exec(str)
        }
        return rs
    })
    // 通过递归计算相邻的矩阵
    let maxRect=(arr,result,n=1)=>{
        // 弹出第一行
        let top=arr.pop()
        // 弹出第二行
        let next=arr.pop()
        // 记录第一行的每一个起始点和截止点
        let tt
        // 记录第二行的每一个起始点和截止点
        let nn
        // 记录交叉的起始索引
        let start
        // 记录交叉的截止索引
        let end
        n++
        for(let i=0,il=top.length;i<il;i++){
            tt=tip[i]
            for(let j=0,jl=next.length;i<jl;j++){
                nn=next[j]
                width=Math.min(tt[1],nn[1])-Math.max(tt[0],nn[0])
                if(width>maxWidth){
                    maxWidth=width
                    start=Math.max(tt[0],nn[0])
                    end=Math.min(tt[1],nn[1])
                }
            }
        }
        // 如果没有找到交叉点
        if(start===undefined||end===undefined){
            if(n<3){
                return false
            }else{
                width=top[0][1]-top[0][0]+1
                if(width>1){
                    result.push((n-1)*width)
                }
            }
        }else{
            arr.push([start,end])
            maxRect(arr,result,n++)
        }
    }
    while(arr.length>1){
        maxRect([].concat(arr),result)
        arr.pop()
    }
    // 取最大值
    let max=0
    let item=result.pop()
    while(item){
        if(item>max){
            max=item
        }
        item=result.pop()
    }
    return 0
}
```








## 数据结构之队列
- 特殊的线性表，只允许在表的前端删除，表的后端插入（先进先出）

### 设计循环队列
```js
设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

你的实现应该支持如下操作：

MyCircularQueue(k): 构造器，设置队列长度为 k 。
Front: 从队首获取元素。如果队列为空，返回 -1 。
Rear: 获取队尾元素。如果队列为空，返回 -1 。
enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
isEmpty(): 检查循环队列是否为空。
isFull(): 检查循环队列是否已满。
 
示例：

MyCircularQueue circularQueue = new MycircularQueue(3); // 设置长度为 3

circularQueue.enQueue(1);  // 返回 true

circularQueue.enQueue(2);  // 返回 true

circularQueue.enQueue(3);  // 返回 true

circularQueue.enQueue(4);  // 返回 false，队列已满

circularQueue.Rear();  // 返回 3

circularQueue.isFull();  // 返回 true

circularQueue.deQueue();  // 返回 true

circularQueue.enQueue(4);  // 返回 true

circularQueue.Rear();  // 返回 4

提示：

所有的值都在 0 至 1000 的范围内；
操作数将在 1 至 1000 的范围内；
请不要使用内置的队列库。
```
```js
export default class MyCircularQueue {
    constructor (k) {
        // 保存数据长度为k的数据结构
        this.list=Array(k)
        // 队首的指针
        this.front=0
        // 队尾的指针
        this.rear=0
        // 队列的长度
        this.max=k
    }
    enQueue (num) {
        if(this.isFull()){
            return false
        }else{
            this.list[this.rear]=num
            this.rear=(this.rear+1)%this.max
            return true
        }
    }
    deQueue () {
        let v=this.list[this.front]
        this.list[this.front]=''
        this.front=(this.front+1)%this.max
        return v
    }
    isEmpty () {
        return this.front===this.rear&&!this.list[this.front]
    }
    isFull () {
        return this.front===this.rear&&!!this.list[this.front]
    }
    Front () {
        return this.list[this.front]
    }
    Rear () {
        let rear=this.rear-1

        return this.list[rear<0?this.max-1:rear]
    }
}
```
### 任务调度器
```js
给定一个用字符数组表示的 CPU 需要执行的任务列表。其中包含使用大写的 A - Z 字母表示的26 种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。CPU 在任何一个单位时间内都可以执行一个任务，或者在待命状态。

然而，两个相同种类的任务之间必须有长度为 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。

你需要计算完成所有任务所需要的最短时间。

示例 1：

输入: tasks = ["A","A","A","B","B","B"], n = 2
输出: 8
执行顺序: A -> B -> (待命) -> A -> B -> (待命) -> A -> B.
注：

任务的总个数为 [1, 10000]。
n 的取值范围为 [0, 100]。
```
```js
export default (tasks, n) => {
    let q = ''
    let Q = {}
    tasks.forEach(item => {
        if (Q[item]) {
            Q[item]++
        } else {
            Q[item] = 1
        }
    })
    while (1) {
        let keys = Object.keys(Q)
        if (!keys[0]) {
            break
        }
        // n+1为一组
        let tmp = []
        for (let i = 0; i <= n; i++) {
            let max = 0
            let key
            let pos
            // 从所有的任务中找到未处理数最大的，优先安排
            keys.forEach((item, idx) => {
                if (Q[item] > max) {
                    max = Q[item]
                    key = item
                    pos = idx
                }
            })
            if (key) {
                tmp.push(key)
                keys.splice(pos, 1)
                Q[key]--;
                if (Q[key] < 1) {
                    delete Q[key]
                }
            } else {
                break
            }
        }
        q += tmp.join('').padEnd(n + 1, '-')
    }
    // A--A--A--
    q = q.replace(/-+$/g, '')
    return q.length
}
```

## 数据结构之链表
- 知识点
    - 如何手动地创建一个链表的数据结构(NodeList)
    - 知道链表如何排序(sort)
    - 如何检测链表是否是闭环的
- 概念
  - 链表由一系列结点（元素）组成，结点可以在运行时动态生成。每个结点包括两个部分：`存储数据元素的数据域`和`存储下一个结点地址的指针域`。
- js中没有链表结构
  - 数组可以充当队列，可以充当堆栈，但是不能充当链表
![排序](./img/quicksortOfLinkedLists.png)
### 排序链表
```js
在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。

示例 1:

输入: 4->2->1->3
输出: 1->2->3->4
示例 2:

输入: -1->5->3->4->0
输出: -1->0->3->4->5
```
```js
![链表的快速排序](./img/链表的快速排序.png)
```
```js
// 声明链表的节点

class Node {
    constructor(value) {
        this.val = value;
        this.next = undefined
    }
}

// 声明链表的数据结构

class NodeList {
    constructor(arr) {
        // 声明链表的头部节点
        let head = new Node(arr.shift())
        let next = head
        arr.forEach(item => {
            next.next = new Node(item)
            next = next.next
        })
        return head
    }
}

// 交换两个节点的值
let swap = (p, q) => {
    let val = p.val
    p.val = q.val
    q.val = val
}

// 寻找基准元素的节点
let partion = (begin, end) => {
    let val = begin.val
    let p = begin
    let q = begin.next
    while (q !== end) {
        if (q.val < val) {
            p = p.next
            swap(p, q)
        }
        q = q.next
    }
    // 让基准元素跑到中间去
    swap(p, begin)
    return p
}

export default function sort(begin, end) {
    if (begin !== end) {
        let part = partion(begin, end)
        sort(begin, part)
        sort(part.next, end)
    }
}

export {
    Node,
    NodeList
}
```
```js
// 拿到头指针
let head =new NodeList([4,1,3,2,7,9,10,12,6])
// 对头指针进行排序
sort(head)
let res=[]
let next=head
while(next){
    res.push(next.val)
    next=next.next
}
console.log(res)// [1,2,3,4,6,7,9,10,12]
```
### 环形链表
```js
给定一个链表，判断链表中是否有环。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

示例 1：

输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。

示例 2：

输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。

示例 3：

输入：head = [1], pos = -1
输出：false
解释：链表中没有环。

进阶：

你能用 O(1)（即，常量）内存解决此问题吗？
```
- 环形检测原理
  - 两个指针一个快，一个慢，同时出发。快的和慢的相遇
  - 快的在慢的后面
```js
// 声明链表的节点
class Node {
    constructor(value) {
        this.val = value;
        this.next = undefined
    }
}

// 声明链表的数据结构
class NodeList {
    constructor(arr) {
        // 声明链表的头部节点
        let head = new Node(arr.shift())
        let next = head
        arr.forEach(item => {
            next.next = new Node(item)
            next = next.next
        })
        return head
    }
}

export default function isCircle(head) {
    // 慢指针
    let slow = head
        // 快指针
    let fast = head.next
    while (1) {
        if (!fast || !fast.next) {
            return false
        } else if (fast === slow || fast.next === slow) {
            return true
        } else {
            slow = slow.next
            fast = fast.next.next
        }
    }
}
export {
    Node,
    NodeList
}
```
```js
// 检测
let head=new NodeList([6,1,2,5,7,9])
// 设置环状
head.next.next.next.next.next.next=head.next
console.log(isCircle(head))// true
```
## 数据结构之矩阵
- 二维矩阵


### 螺旋矩阵
```js
给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

示例 1:

输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
示例 2:

输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
```
- 拆解成一步一步的，而且要拆成每一步是相同的
  - 第一圈是第一行全部，第二行到倒数第二行是第一个和最后一个，最后一行全部，接着里面的作为一个新的矩阵，继续重复这个步骤。
```js
export default (arr) => {
    // 处理每一圈的数据遍历过程
    let map = (arr, r = []) => {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (i === 0) {
                r = r.concat(arr[i])
            } else if (i === len - 1) {
                r = r.concat(arr[len - 1].reverse())
            } else {
                r.push(arr[i].pop())
            }
        }
        arr.shift()
        arr.pop()
        for (let i = arr.length - 1; i >= 0; i--) {
            r.push(arr[i].shift())
        }
        if (arr.length) {
            return map(arr, r)
        } else {
            return r
        }
    }
    return map(arr, [])
}
```



### 旋转图像
```js
给定一个 n × n 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

说明：

你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

示例 1:

给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
示例 2:

给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```
- 找到456这个轴，交换后再以753为轴，交换后即可
![旋转图像](./img/rotateImage.png)
```js
export default (arr) => {
    // 获取n的维度
    let vecor = arr.length
        // 垂直翻转
    for (let i = 0, len = vecor / 2; i < len; i++) {
        for (let j = 0, tmp; j < vecor; j++) {
            tmp = arr[i][j]
            arr[i][j] = arr[vecor - i - 1][j]
            arr[vecor - i - 1][j] = tmp
        }
    }
    // 对角线翻转
    for (let i = 0; i < vecor; i++) {
        for (let j = 0, tmp; j < i; j++) {
            tmp = arr[i][j]
            arr[i][j] = arr[j][i]
            arr[j][i] = tmp
        }
    }
    return arr
}
```


## 数据结构之二叉树
- 特性
  - 一个节点只有两个子节点，左节点和右节点
![二叉树](./img/binaryTree.png)
- 实现二叉树结构
```js
// 二叉树的节点
class Node {
    constructor(val) {
        this.val = val
        this.left = this.right = undefined
    }
}

class Tree {
    constructor(data) {
        // 临时存储所有节点，方便寻找父子节点
        let nodeList = []
            // 顶节点
        let root
        for (let i = 0, len = data.length; i < len; i++) {
            let node = new Node(data[i])
            nodeList.push(node)
            if (i > 0) {
                // 计算当前节点属于哪一层
                let n = Math.floor(Math.sqrt(i + 1))
                    // 记录当前层的起始点
                let q = Math.pow(2, n) - 1
                    // 记录上一层的起始点
                p = Math.pow(2, n - 1) - 1
                    // 找到当前节点的父节点
                let parent = nodeList[p + Math.floor((i - q) / 2)]
                    // 将当前节点和上一层的父节点做关联
                if (parent.left) {
                    parent.right = node
                } else {
                    parent.left = node
                }
            }
        }
        root = nodeList.shift()
            // 释放数组
        nodeList.length = 0
        return root
    }
}

export default Tree

export {
    Node
}
```
### 对称二叉树
```js
给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3
```
![对称二叉树](./img/symmetric-binary-tree.png)
- 左定点的左节点等于右定点的右节点，以此类推
```js
// 二叉树的节点
class Node {
    constructor(val) {
        this.val = val
        this.left = this.right = undefined
    }
}

class Tree {
    constructor(data) {
        // 临时存储所有节点，方便寻找父子节点
        let nodeList = []
            // 顶节点
        let root
        for (let i = 0, len = data.length; i < len; i++) {
            let node = new Node(data[i])
            nodeList.push(node)
            if (i > 0) {
                // 计算当前节点属于哪一层
                let n = Math.floor(Math.sqrt(i + 1))
                    // 记录当前层的起始点
                let q = Math.pow(2, n) - 1
                    // 记录上一层的起始点
                p = Math.pow(2, n - 1) - 1
                    // 找到当前节点的父节点
                let parent = nodeList[p + Math.floor((i - q) / 2)]
                    // 将当前节点和上一层的父节点做关联
                if (parent.left) {
                    parent.right = node
                } else {
                    parent.left = node
                }
            }
        }
        root = nodeList.shift()
            // 释放数组
        nodeList.length = 0
        return root
    }
    static isSymmetry(root) {
        if (!root) {
            return true
        }
        let walk = (left, right) => {
            if (!left && !right) {
                return true
            }
            if ((left && !right) || (!left && right) || (left.val !== right.val)) {
                return false
            }
            return walk(left.left, right.right) && walk(left.right, right.left)
        }
        return walk(root.left, root.right)
    }
}

export default Tree

export {
    Node
}
```
```js
let root =new Tree([1,2,2,3,4,4,3])
console.log(Tree.isSymmetry(root))
```
### 验证二叉搜索树
```js
给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
示例 1:

输入:
    2
   / \
  1   3
输出: true
示例 2:

输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。
```
- 所有的子树跳出来，看看是不是左边小右边大。如果所有都满足，那整个树都满足了
```js
// 二叉树的节点
class Node {
    constructor(val) {
        this.val = val
        this.left = this.right = undefined
    }
}

class Tree {
    constructor(data) {
        let root = new Node(data.shift())
            // 遍历所有的数据，逐渐插入到当前这课搜索树中去
        data.forEach(item => {
            this.insert(root, item)
        })
        return root
    }
    insert(node, data) {
        if (node.val > data) {
            if (node.left === undefined) {
                node.left = new Node(data)
            } else {
                this.insert(node.left, data)
            }
        } else {
            if (node.right === undefined) {
                node.right = new Node(data)
            } else {
                this.insert(node.right, data)
            }
        }
    }
    static walk(root) {
        if (!root.left && !root.right) {
            return true
        } else if (((root.left && root.val < root.left.val) || (root.right && root.val > root.right.val))) {
            return false
        } else {
            return Tree.walk(root.left) && Tree.walk(root.right)
        }
    }
}
export default Tree
export {
    Node
}
```
- 二叉搜索树对于排序有很大参考。
    - 做好了排序后，插入和删除非常好操作。
## 数据结构之堆
- 概念
    - 必须是完全二叉树(n-1层必须是满二叉树)
    - 任一结点的值是其子树所有结点的最大值或最小值
    - 堆不是堆栈，堆类似二叉树(有一定特征的二叉树)
- 作用
    - 利用堆做排序和查找
- 堆排序
    - 父节点i
    - 子节点(左)2*i+1
    - 子节点(右)2*i+2
![堆](./img/堆.jpg)
![堆排序](./img/堆排序.jpg)
```js
class Heap {
    constructor(data) {
        this.data = data
    }
    sort() {
            let iArr = thhis.data
            let n = iArr.lenth
            if (n <= 1) {
                return iArr
            } else {
                for (let i = Math.florr(n / 2); i >= 0; i--) {
                    Heap.maxHeapify(iArr, i, n)
                }
                for (let j = 0; j < n; j++) {
                    Heap.swap(iArr, 0, n - 1 - j)
                    Heap.maxHeapify(iArr, 0, n - 1 - j)
                }
                return iArr
            }
        }
        // 交换两个元素
    static swap(arr, a, b) {
            if (a === b) {
                return ''
            }
            let c = arr[a]
            arr[a] = arr[b]
            arr[b] = c
        }
        // 构建最大堆
    static maxHeapify(Arr, i, size) {
        // 左节点（索引）
        let l = i * 2 + 1
            // 右节点
        let r = i * 2 + 2
        let largest = i
            // 父节点i分别和左节点l和右节点r做比较取最大
        if (l <= size && Arr[l] > Arr[largest]) {
            largest = l
        }
        if (r <= size && Arr[r] > Arr[largest]) {
            largest = r
        }
        if (largest != i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }
}
export default Heap
```
### 根据字符出现频率排序
- 用堆排序做这题时间复杂度和空间复杂度是最低的
```js
给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

示例 1:

输入:
"tree"

输出:
"eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
示例 2:

输入:
"cccaaa"

输出:
"cccaaa"

解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
示例 3:

输入:
"Aabb"

输出:
"bbAa"

解释:
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
```

```js
class Heap {
    constructor(str) {
        let map = new Map()
        str.split('').forEach(item => {
            if (map.has(item)) {
                map.set(item, map.get(item) + 1)
            } else {
                map.set(item, 1)
            }
        })
        this.map = map
        this.data = Arr.from(map.values())
    }
    sort() {
        let iArr = this.data
        let n = iArr.lenth
        if (n <= 1) {
            return iArr
        } else {
            for (let i = Math.florr(n / 2); i >= 0; i--) {
                Heap.maxHeapify(iArr, i, n)
            }
            for (let j = 0; j < n; j++) {
                Heap.swap(iArr, 0, n - 1 - j)
                Heap.maxHeapify(iArr, 0, n - 1 - j)
            }
            return iArr
        }
    }
    toString() {
            let arr = this.sort()
            let str = []
            while (arr.length) {
                let top = arr.pop()
                for (let [k, v] of this.map) {
                    if (v === top) {
                        str.push(k.repeat(v))
                        this.map.delete(k)
                        break
                    }
                }
            }
            return str.join('')
        }
        // 交换两个元素
    static swap(arr, a, b) {
            if (a === b) {
                return ''
            }
            let c = arr[a]
            arr[a] = arr[b]
            arr[b] = c
        }
        // 构建最大堆
    static maxHeapify(Arr, i, size) {
        // 左节点（索引）
        let l = i * 2 + 1
            // 右节点
        let r = i * 2 + 2
        let largest = i
            // 父节点i分别和左节点l和右节点r做比较取最大
        if (l <= size && Arr[l] > Arr[largest]) {
            largest = l
        }
        if (r <= size && Arr[r] > Arr[largest]) {
            largest = r
        }
        if (largest != i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }
}
export default Heap
```

### 超级丑数
```js
编写一段程序来查找第 n 个超级丑数。

超级丑数是指其所有质因数都是长度为 k 的质数列表 primes 中的正整数。

示例:

输入: n = 12, primes = [2,7,13,19]
输出: 32 
解释: 给定长度为 4 的质数列表 primes = [2,7,13,19]，前 12 个超级丑数序列为：[1,2,4,7,8,13,14,16,19,26,28,32] 。
说明:

1 是任何给定 primes 的超级丑数。
 给定 primes 中的数字以升序排列。
0 < k ≤ 100, 0 < n ≤ 106, 0 < primes[i] < 1000 。
第 n 个超级丑数确保在 32 位有符整数范围内。
```
- 概念
    - 质数
        - 大于1的自然数中，除了1和他本身没有其他因数
    - 质因数
        - 一个数的约数，并且是质数
    - 丑数
        - 只包含因子2，3，5的正整数，1也是丑数

- 解题思路
    - 求解任意整数的质因数
    - 质因数是否在指定质因数范围内
    - 是否达到指定个数n
```js
// 堆查找
class Heap {
    constructor(arr) {
        this.data = arr
        this.max = arr.length
        this.sort()
    }
    sort() {
        let iArr = this.data
        let n = iArr.lenth
        if (n <= 1) {
            return iArr
        } else {
            for (let i = Math.florr(n / 2); i >= 0; i--) {
                Heap.maxHeapify(iArr, i, n)
            }
            return iArr
        }
    }
    find(val, i = 0) {
            let arr = this.data
            if (val > arr[i] || i > this.max) {
                return false
            } else if (val === arr[i]) {
                return val
            } else {
                return this.find(val, i * 2 + 1 || this.find(val, i * 2 + 2))
            }
        }
        // 交换两个元素
    static swap(arr, a, b) {
            if (a === b) {
                return ''
            }
            let c = arr[a]
            arr[a] = arr[b]
            arr[b] = c
        }
        // 构建最大堆
    static maxHeapify(Arr, i, size) {
        // 左节点（索引）
        let l = i * 2 + 1
            // 右节点
        let r = i * 2 + 2
        let largest = i
            // 父节点i分别和左节点l和右节点r做比较取最大
        if (l <= size && Arr[l] > Arr[largest]) {
            largest = l
        }
        if (r <= size && Arr[r] > Arr[largest]) {
            largest = r
        }
        if (largest != i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }
}
export default Heap
```

```js
class Ugly {
    constructor(n, primes) {
        this.n = n
        this.primes = new Heap(primes)
    }
    getAll() {
            // 超级丑数列表
            let res = [1]
            let i = 2
            let primes = this.primes
            while (res.length < this.n) {
                let arr = Ugly.getPrimes(i)
                let k = 0
                let l = arr.length
                for (; k < l; k++) {
                    if (!primes.find(arr[k])) {
                        break
                    }
                }
                // k===l有两种情况（当前数没有质因数或者所有的质因数都在指定列表中）
                if (k === l) {
                    if (l === 0) {
                        if (primes.find(arr[k])) {
                            res.push(i)
                        }
                    } else {
                        res.push(i)
                    }
                }
                i++
            }
            return res[this.n - 1]
        }
        // 计算指定正整数n的质因数
    static getPrimes(n) {
        let prime = (n) => {
            // 存储所有的质因数
            let arr = []
            for (let i = 2; i < n / 2 + 1; i++) {
                if (n % i === 0 && !prime(i).length) {
                    arr.push(i)
                }
            }
            return arr
        }
        return prime(n)
    }

}
export default Ugly
```

## 进阶算法（思想）
- 贪心算法思想
- 动态规划思想

## 进阶算法之贪心算法
- 概念
    - 通过每一步的最优解来达到整体最优解。但不一定是问题的最优解。
    - 选择的贪心策略必须具备无后效性（某个状态以前的过程不会影响以后的状态，只与当前状态有关）
- 当一个问题特别抽象，特别复杂的时候，又找不到规律，不知道怎么办，可以考虑贪心算法，通过不断优化策略，靠近最优解。
### 买卖股票的最佳时机
```js
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:

输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
示例 2:

输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
示例 3:

输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

- 策略1：从最低点买入，在最高点卖出（追求单词利益）
- 策略2：从低点买入，只要可以赚钱就卖出；不断买卖（追求多次利益，单词利益不够）
- 策略3：从低点买入，到价格高点卖出，不断买卖（在保证单次利益的基础上，实现多次交易）（最贪）

```js
export default (prices) => {
    // 用来保存利润
    let count = 0
    for (let i = 0, len = prices.length; i < len; i++) {
        // 循环i的下一个
        for (let j = i; j < len - 1; j++) {
            if (prices[j + 1] > prices[j]) {
                count += prices[j + 1] - prices[j]
                i = j
            } else {
                i = j
                break
            }
        }
    }
    return count
}
```


### 柠檬水找零
```js
在柠檬水摊上，每一杯柠檬水的售价为 5 美元。

顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。

每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。

注意，一开始你手头没有任何零钱。

如果你能给每位顾客正确找零，返回 true ，否则返回 false 。

示例 1：

输入：[5,5,5,10,20]
输出：true
解释：
前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。
第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。
第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。
由于所有客户都得到了正确的找零，所以我们输出 true。
示例 2：

输入：[5,5,10]
输出：true
示例 3：

输入：[10,10]
输出：false
示例 4：

输入：[5,5,10,10,20]
输出：false
解释：
前 2 位顾客那里，我们按顺序收取 2 张 5 美元的钞票。
对于接下来的 2 位顾客，我们收取一张 10 美元的钞票，然后返还 5 美元。
对于最后一位顾客，我们无法退回 15 美元，因为我们现在只有两张 10 美元的钞票。
由于不是每位顾客都得到了正确的找零，所以答案是 false。
 

提示：

0 <= bills.length <= 10000
bills[i] 不是 5 就是 10 或是 20 
```
- 问题：找零钱
    - 策略1：给钱找零，不区分金额直到找到足够的零钱（追求单词找零）
    - 策略2：给钱找零，优先给金额大的零钱，尽量把零钱放在手里（追求多次找零）(更贪)
```js
export default (arr) => {
    // 钱箱
    let hand = []
        // 是否还有顾客
    while (arr.length) {
        // 取出最前面顾客的钱
        let money = arr.shift()
        if (money === 5) {
            hand.push(money)
        } else {
            // 手里的零钱降序排列
            // 需要的找零
            let change = mone - 5
            for (let i = 0, len = hand.length; i < len; i++) {
                if (hand[i] <= change) {
                    change -= hand[i]
                    hand.splice(i, 1)
                        // 删除了元素，数组的长度发生了变化，要维持刚才的i不变
                    i--
                }
                if (change === 0) {
                    break
                }
            }
            // 没有足够的零钱给顾客
            if (change !== 0) {
                return false
            } else {
                // 顾客的钱收起来
                hand.push(money)
            }
        }
    }
    return true
}
```
- 只需要一个个取值时用while
- 需要比较等更复杂处理的用for
## 进阶算法之动态规划
- 概念
    - 状态转移方程
        - 由最优子结构得到的问题的公式
    - 最优子结构
        - 问题简化为最简单的情况
    - 边界
        - 特殊情况
- 用途
    - 不同路径
    - 最短路径
### 不同路径II
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

![机器人路径](./img/robot_maze.png)

网格中的障碍物和空位置分别用 1 和 0 来表示。

说明：m 和 n 的值均不超过 100。

示例 1:

输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
### 