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
### 计数二进制子串
- 写出所有情况，然后找出规律
```js
function xx(str){
    // 建立数据结构，堆栈，保存数据
    let r = []
    // 给定任意子输入都返回第一个符合条件的子串
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
    // 通过for循环控制程序运行的流程
    for (let i = 0, len = str.length - 1; i < len; i++) {
        let sub = match(str.slice(i))
        if (sub) {
            r.push(sub)
        }
    }
    return r
}
xx('00101')
```
- 知识点
    - slice
    - match
    - repeat
    - push 
    - RegExp

## 基础算法-数组
### 公式运算（电话号码的组合）
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

- 答案都是排序的，所以需要先排序
- 相同数字多出来的要继续处理
- 两组两组的求公约数，两组的结果再和第三组求

### 筛选运算（种花问题）


### 二进制运算（格雷编码）