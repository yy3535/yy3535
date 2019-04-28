# 01-变量类型和计算知识点

## 变量类型

JS变量最基本的分类就是**值类型**和**引用类型**，两者有何区别呢，可以通过例子看出来。

**值类型：string,boolean,number,undefined**

**引用类型：object(date,RegExp),array,function,null**

以下是值类型的一个例子

```javascript
var a = 100
var b = a
a = 200
console.log(b)
```

以下是引用类型的一个例子

```javascript
var a = {age:20}
var b = a
b.age = 21
console.log(a.age)
```

`typeof`可以知道一个值类型是什么类型，而对于引用类型，它就无能为力了。但是它可以将引用类型区分出`function`，为什么 ———— 因为`function`相对于其他引用类型（如对象、数组）来说，具有非常特殊的意义，JS 中的函数非常重要，接下来的原型、作用域都会深入讲解函数。

JS 中的某些表现，就已经体现了函数的特殊意义，例如：对象和数组，JS中没有内置的（不考虑 JS-WEB-API），而函数却内置了很多，例如 `Object` `Array` `Boolean` `Number` `String` `Function` `Date` `RegExp` `Error`。这些函数 JS 本身就有，要是没有它们，就没法愉快的写 JS 代码了。因为他们是基础数据类型的构造函数（后面会讲解）

**`typeof`可以区分类型有`number` `string` `boolean` `undefined`（值类型） `function` `object`（引用类型）**

```javascript
// 特例
typeof null // object 因为 null 也是引用类型。null 就相当于引用类型中的 undefined
```

那么针对第二个例子，如何将`a`的内容复制给`b`，并且保证`b`的修改不会影响到`a`呢？那就需要**深度复制**，意思就是对`a`的属性进行递归遍历，再依次复制，这块我们会放在后面专门讲解。

## 变量计算（此处为值类型的计算）

> 本节专门讲解值类型的计算，引用类型的计算放在后面作为“JS 算法”统一讲解。

组简单的计算，就是数字的加减乘除、字符串的拼接和替换，这个太简单了，这里不提了。但是 JS 在值类型的运算过程中，特别需要注意和利用**强制类型转换**这一特性，有以下场景：

- **字符串拼接**
- **`==`**
- **逻辑运算（`if` `!` `||` `&&`）**

字符串拼接最常见的错误如下，特别要注意。如何规避呢 ———— 对进行计算的变量通过`typeof`来判断类型 ———— 太麻烦？编码本身就是一个体力活！

- **字符串拼接**

```javascript
var a = 100 + 10   // 110
var b = 100 + '10' // '10010'
```

接下来，`==`也会进行强制类型转换，如

- **`==`**

```javascript
//==
100 == '100'   // true
0 == ''  // true
null == undefined  // true
```

针对`100 == '100'`就是和拼接字符串一样的类型转换，而针对下面两个例子，就是一个逻辑运算上的强制类型转换（马上会讲解）。所以，要求你写 JS 代码时，所有的地方都要使用`===`而不能使用`==`，但是阅读 jquery 源码后我发现一个特例，就是`obj.a == null`，使用很简洁。

最后，逻辑运算中的强制类型转换，先以`if`为例说明

- **逻辑运算（`if` `!` `||` `&&`）**

```javascript
//if语句
var a = true
if (a) {
    // ....
}
var b = 100
if (b) {
    // ....
}
var c = ''
if (c) {
    // ....
}
```

所有经过`if`判断的变量，都会进行逻辑运算的强制类型转换，转换为`true`或者`false`。

- **逻辑运算（`if` `!` `||` `&&`）**

```javascript
//逻辑运算符
console.log(10 && 0)  // 0
console.log('' || 'abc')  // 'abc'
console.log(!window.abc)  // true

// 判断一个变量会被当做 true 还是 false
var a = 100
console.log(!!a)
```

**if(obj.a==null){
	//这里相当于obj.a===null||obj.a===undefined,简写形式
}**

# 答题

### JS中使用`typeof`能得到的哪些类型

针对这个题目，可以通过以下程序进行验证

```javascript
typeof undefined // undefined
typeof 'abc' // string
typeof 123 // number
typeof true // boolean
typeof {}  // object
typeof [] // object
typeof null // object
typeof console.log // function
```

### 何时使用`===` 何时使用`==`

首先你得明白两者的区别。`==`会先试图类型转换，然后再比较，而`===`不会类型转换，直接比较。如下例子：

```javascript
1 == '1' // true
1 === '1' // false
0 == false // true
0 === false // false
null == undefined // true
null === undefined // false
```

根据 jQuery 源码中的写法，只推荐在一个地方用`==`，其他地方都必须用`===`。这个用`==`的地方就是：

```javascript
if (obj.a == null) {  // 这里相当于 obj.a === null || obj.a === undefined ，简写形式
}
```

编程是需要绝对严谨的态度，我们只在这一个地方让它进行类型转换，来简化我们的写法，因为这个场景非常简单和固定。而其他场景下，我们都必须使用`===`，除非有特殊的业务需要。

### JS中有哪些内置函数 —— 数据封装类对象

`Object` `Array` `Boolean` `Number` `String` `Function` `Date` `RegExp` `Error`

对于这种问题，回复时能把基本常用的回答上来就可以，没必要背书把所有的都写上。

### JS变量按照存储方式区分为哪些类型，并描述其特点

- 值类型 `undefined` `string` `number` `boolean`
- 引用类型 `object` `function`

最后补充一点，在 JS 中，所有的引用类型都可以自由设置属性

```javascript
var obj = {}
obj.a = 100

var arr = []
arr.a = 100

function fn() {}
fn.a = 100
```

### 如何理解JSON

这个问题，很容易被一些初学者误答。其实，JSON 是什么？从 JS 角度回答，太简单了，`console.log(JSON)`得到`JSON`只是一个对象，有`parse`和`stringify`两个方法，使用也非常简单

```javascript
JSON.stringify({a:10, b:20})
JOSN.parse('{"a":10,"b":20}')
```

我之所以误答，就是怕初学者把这个问题搞大，因为 json 也是一种数据格式，这一点和 xml 一样。但是在 JS 的面试题中，如果问到这个问题，直接说明`parse`和`stringify`两个方法的用法即可，面试官如果有追问，你再去继续回答。