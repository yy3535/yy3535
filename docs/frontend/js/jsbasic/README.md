# JS基础
[[toc]]

## 变量
### 类型
- 值类型：string,boolean,number,undefined

- 引用类型：object(date,RegExp),array,function,null（引用类型可以自由设置属性，除了null）

- `typeof`可以区分类型有`number` `string` `boolean` `undefined`（值类型） `function` `object`（引用类型）

- js内置函数（数据封装类对象）
    - `Object` `Array` `Boolean` `Number` `String` `Function` `Date` `RegExp` `Error`

- `===`和`==`
    - `==`会先试图类型转换，然后再比较，`===`不会类型转换
    - 必须用`===`。
    - 唯一用`==`的地方：obj.a === null || obj.a === undefined ，简写形式obj.a == null
### 显示类型转换
- Number函数
  - **数值**：转换后还是原来的值
  - **字符串**：如果可以被解析为数值，则转换为相应的数值，否则得到NaN.空字符串转为0
  - **布尔值**：true转成1，false转成0
  - **undefined**：转成NaN
  - **null**：转成0
  - **对象**：先调用自身的valueOf，不行再调用自身的toString，再不行就报错
    - Object的valueOf返回对象本身，toString返回"[object Object]"的字符串
    - Array的valueOf返回对象本身，toString返回调用join(',')所返回的字符串。
    - Function的valueOf返回对象本身，toString返回函数中包含的代码转为字符串的值。
- Number等同于一元正号(+)
```js
> +{} //相当于 Number({})
NaN
```
- String函数
  - **数值**：转为相应的字符串
  - **字符串**：转换后还是原来的值
  - **布尔值**：true转成'true'，false转成'false'
  - **undefined**：转成'undefined'
  - **null**：转成'null'
  - **对象**：先调用自身的toString，不行再调用自身的valueOf，再不行就报错
- Boolean函数
  - undefined/null/-0/+0/NaN/''(空字符串)==>false
  - 其他一律为true



### 隐式类型转换
  - 四则运算
    - **+**：只要其中一个是String类型，表达式的值转为String。若无字符串，表达式便转为Number类型
    - **其余**：只要其中一个是Number类型，表达式的值便转为Number。
    - **非法字符**：对于非法字符的情况通常会返回NaN
```js
'1' * 'a'     // => NaN
```
  - 判断语句
    - 转换规则同Boolean的构造函数。
  - Native调用
    - 比如console.log、alert调用自动转为字符串类型
#### 常见题目
```js
[]+[]
// ""
[]+{}
// [object Object]
{}+[]
// [object Object]
// 所有浏览器都认为{}是区块语句，计算+[]，得出0
{}+{}
// [object Object][object Object]
// 谷歌浏览器是正常结果，火狐会把第一个{}当做区块语句，计算+{}，得出NaN
true+true
// 2
1+{a:1}
// 1[object Object]
```
### 二进制和八进制表示法[ES6]
- 用前缀0b（或0B）和0o（或0O）表示。
  ```js
  0b111110111 === 503 // true
  0o767 === 503 // true
  ```
### Number API[ES6,全局方法移到了Number对象上]
- Number.isFinite()
  - 检查一个数值是否为有限的（finite）
- Number.isNaN()
  - 检查一个值是否为NaN
- Number.parseInt()
- Number.parseFloat() 
- Number.isInteger()
  - 判断一个数值是否为整数。
  - 不是数值，返回false
  - 25 和 25.0 被视为同一个值
  - 数据精度的要求较高，不建议使用
- Number.EPSILON
  - 表示一个极小的常量（是 JavaScript 能够表示的最小精度）
- Number.isSafeInteger()
  - 判断一个整数是否落在这个范围之内。
  - Number.MAX_SAFE_INTEGER（范围上限）
  - Number.MIN_SAFE_INTEGER（范围下限）

### Math对象

| 功能            |      API |
| :-------------- | -------: |
| random()        |    [0,1) |
| ceil(x)         | 向上取整 |
| floor(x)        | 向下取整 |
| round(x)        | 四舍五入 |
| abs(x)          |   绝对值 |
| max(x,y,z,...n) | 求最大值 |
| min(x,y,z...n)  | 求最小值 |

- Math.random()
  - 常用于清除浏览器缓存，频繁访问一个链接，就在链接后加一个random()

以下ES6新增：

- Math.trunc() 
  - 去除一个数的小数部分，返回整数部分
  - 非数值，内部Number方法将其先转为数值。
  - 空值和无法截取整数的值，返回NaN
- Math.sign()
  - 判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
  - 参数为正数，返回+1；
  - 参数为负数，返回-1；
  - 参数为 0，返回0；
  - 参数为-0，返回-0;
  - 其他值，返回NaN。
- Math.cbrt()
  - 计算一个数的立方根
  - 内部也是先使用Number方法将其转为数值
- Math.fround() 
  - 返回一个数的32位单精度浮点数形式。
- Math.hypot() 
  - 返回所有参数的平方和的平方根。
- 对数方法
- 双曲函数方法
- 指数运算符（**）
  - 右结合，多个指数运算符连用时，是从最右边开始计算的。
    ```js
    // 相当于 2 ** (3 ** 2)
    2 ** 3 ** 2
    // 512
    ```
#### 获取随机数，要求是长度一致的字符串格式

使用`Math.random()`可获取字符串，但是返回的是一个小于 1 的小数，而且小数点后面长度不同

```javascript
var random = Math.random()
var random = random + '0000000000'  // 后面加上 10 个零
var random = random.slice(0, 10)
console.log(random)
```

### 运算符
- 优先级
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
    - new带参数比new无参数优先级高
- 求余%

### JSON
- JSON是一种数据格式。
- `parse`和`stringify`

## 原型和原型链

### 构造函数
```javascript
function Foo(name, age) {
    this.name = name
    this.age = age
    this.class = 'class-1'
    // return this  // 默认有这一行
}
var f1 = new Foo('zhangsan', 20)
var f2 = new Foo('lisi', 22)
```
- `Foo`是`f`的构造函数,有`name` `age` `class`三个属性
- 带`new`执行时，函数中的`this`就会变成一个空对象，让程序为其属性赋值，然后最终返回。默认带一个`return this`
    ```javascript
    function Foo(name) {
        this.name = name
        this.type = 'foo'
    }
    var foo = new Foo('beijing')
    ```
    - 创建一个新对象
    - `this`指向这个新对象
    - 执行代码，即对`this`赋值
    - 返回`this`

    - 创建一个新对象。它继承自foo.prototype
    - 执行foo构造函数里的代码。执行时相应的参数被传入，同时this会被指定为这个新实例。new foo等同于new foo()，只能用在不传递任何参数的情况
    - 如果构造函数返回了一个对象，那么返回这个对象。否则，返回this
    ```js
    var new2=function(func){
        var o=Object.create(func.prototype);
        var k=func.call(o);
        if(typeof k==='object'){
            return k
        }else{
            return o
        }
    }
    ```
- 其他
    - `var a = {}`是`var a = new Object()`语法糖
    - `var a = []`是`var a = new Array()`语法糖
    - `function Foo(){...}`是`var Foo = new Function(...)`语法糖

- 判断一个函数是否是一个变量的构造函数
    - `instanceof`(原理:一层一层往上，能否对应到`xxx.prototype`)(判断数组和伪数组：实际应用中只需要判断`length`属性是否是数字即可)
    - constructor===构造函数（更准确）

### 原型
#### 显示原型和隐式原型
- 引用类型有一个`__proto__`(隐式原型)属性，属性值是一个普通的对象
- 函数有一个`prototype`（显示原型）属性，属性值是一个普通的对象
- 引用类型的`__proto__`属性值指向它的构造函数的`prototype`属性值


### 原型链
- 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`（即它的构造函数的`prototype`）中寻找
- 如果在`f.__proto__`中没有找到`toString`，那么就继续去`f.__proto__.__proto__`中寻找，因为`f.__proto__`是一个普通的对象。这样一直往上找，是一个链式的结构，叫做“原型链”。直到找到最上层`Object.prototype.__proto__ === null`都没有找到，返回`undefined`。
- 如何判断一个这个属性是不是对象本身的属性呢
    - 使用`hasOwnProperty`，常用在遍历对象的时候

### 原型链继承
- 使用案例
```javascript
// 构造函数
function DomElement(selector) {
    var result = document.querySelectorAll(selector)
    var length = result.length
    var i
    for (i = 0; i < length; i++) {
        this[i] = selectorResult[i]
    }
    this.length = length
}
// 修改原型
DomElement.prototype = {
    constructor: DomElement,
    get: function (index) {
        return this[index]
    },
    forEach: function (fn) {
        var i
        for (i = 0; i < this.length; i++) {
            const elem = this[i]
            const result = fn.call(elem, elem, i)
            if (result === false) {
                break
            }
        }
        return this
    },
    on: function (type, fn) {
        return this.forEach(elem => {
            elem.addEventListener(type, fn, false)
        })
    }
}

// 使用
var $div = new DomElement('div')
$div.on('click', function() {
    console.log('click')
})
```

- 构造函数继承
```js
// 第一种，借助构造函数实现继承(这种无法继承parent原型对象上的方法)
function Parent1(){
    this.name='parent1';
}
Parent1.prototype.say=function(){}
function Child1(){
    Parent1.call(this);// call,apply改变函数执行上下文，即this
    this.type='child1';
}
// 第二种，借助原型链实现继承(这种继承是继承了同一个parent实例，导致修改的也是同一个)
function Parent2(){
    this.name='parent2';
    this.play=[1,2,3]
}
function Child2(){
    this.type='child2';
}
Child2.prototype=new Parent2();
var s1=new Child2();
var s2=new Child2();
s1.play.push(4);
console.log(s1.play,s2.play)// [1,2,3,4],[1,2,3,4]
// 第三种，组合继承方式(组合以上两种，避免了以上两个的问题)(缺点：继承时父级构造函数执行了两遍)
function Parent3(){
    this.name='parent3'
}
function Child3(){
    Parent3.call(this);
    this.type='child3';
}
Child3.prototype=new Parent3();
// 组合继承方式优化1(问题：constructorwei指向Child4)
function Parent4(){
    this.name='parent4'
}
function Child4(){
    Parent4.call(this);
    this.type='child4';
}
Child4.prototype=Parent4.prototype;
var s4=new Child4();
console.log(s4.constructor);// Parent4
// 组合继承方式优化2(最终方案)
function Parent5{
    this.name='parent5'
}
function Child5(){
    Parent5.call(this);
    this.type='child5';
}
Child5.prototype=Object.create(Parent5.prototype);// 隔离父类和子类的原型对象
Child5.prototype.constructor=Child5;// 覆盖自雷的原型对象
```

### zepto（或其他框架） 源码中如何使用原型链
- 重写数组\__proto__，里面要用到原数组属性的直接=Array.prototype.xxx，其余添加它想要添加的方法。

## 作用域和闭包
### 变量提升
- `<script>`中的变量提升：变量定义，函数声明
    - 在一段 JS 脚本（即一个`<script>`标签中）执行之前，会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来。变量先暂时赋值为`undefined`，函数则先声明好可使用。再开始正式执行程序。
- 函数中的变量提升：变量定义，函数声明，this，arguments
    - 一个函数在执行之前，也会创建一个**函数执行上下文**环境，跟**全局上下文**差不多，不过**函数执行上线文**中会多出`this` `arguments`和函数的参数。
### this
- this指向决定于在哪里执行，和在哪里定义无关
    - 全局中this指向window
    - 构造函数中
        - 指向当前实例对象
    - 用于`call` `apply` `bind`
        - 调用时指定this的指向
:::warning 注意
- 对象属性
```js
var a = {
    name: 'A',
    fn: function () {
        console.log(this.name)
    }
}
a.fn()  // this === a
var fn1 = a.fn
fn1()  // this === window
```
- 普通函数
```js
function fn() {
    console.log(this)
}
fn()  // window
```
::: 
:::warning 面试题
```js
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return (function(){
             alert(this.name);
        })();
    },
    getName:function(){
        alert(this.name);
    }
};
object.getNameFunc();  //The Window
object.getName();  //My Object
//函数 getNameFunc 内返回一个闭包，因此 this 指向全局对象，所以 this.name 即为定义在全部作用域下的 name（"The Window"）。
//函数 getName 内并未返回闭包，因此 this 指向当前对象，所以 this.name 即为当前作用域下的 name（"My Object"）。
```
**this看执行的时候，自由变量看定义的时候**
:::
### 作用域
没有块级作用域，只有全局作用域和函数作用域。

- 全局作用域
    - 如果写了很多行 JS 代码，变量定义都没有用函数包括，就全部都在全局作用域中。容易撞车。
- 防止全局作用域污染
    - `(function(){....})()`，jquery等使用匿名函数

### 作用域链
- 自由变量
    - 当前作用域没有定义的变量，叫做自由变量。
- 作用域链
    - 自由变量需要向父级作用域寻找。如果父级也没呢？再一层一层向上寻找，直到找到全局作用域。这种一层一层的关系，就是作用域链。
    - 自由变量按照变量定义时的作用域链

### 闭包
- 作用域内部调用作用域外部变量
    - 函数作为返回值
    ```js
    function F1() {
        var a = 100
        return function () {
            console.log(a)
        }
    }
    var f1 = F1()
    var a = 200
    f1()//100
    ```
    - 函数作为参数传递
    ```js
    function F1() {
        var a = 100
        return function () {
            console.log(a)
        }
    }
    function F2(f1) {
        var a = 200
        console.log(f1())
    }
    var f1 = F1()
    F2(f1)//100
    ```
- 闭包的应用
    - 创造作用域，避免全局污染
    ```js
    function isFirstLoad() {
        var _list = []

        return function (id) {
            if (_list.indexOf(id) >= 0) {
                return false
            } else {
                _list.push(id)
                return true
            }
        }
    }
    // 使用
    var firstLoad = isFirstLoad()
    firstLoad(10) // true
    firstLoad(10) // false
    firstLoad(20) // true
    ```
    - 创建 10 个 a 标签，点击的时候弹出来对应的序号
    ```javascript
    // 错误的写法
    var i, a
    for (i = 0; i < 10; i++) {
        a = document.createElement('a')
        a.innerHTML = i + '<br>'
        a.addEventListener('click', function (e) {
            e.preventDefault()
            alert(i)
        })
        document.body.appendChild(a)
    }
    ```
    ```javascript
    // 正确的写法
    var i
    for (i = 0; i < 10; i++) {
        (function (i) {
            var a = document.createElement('a')
            a.innerHTML = i + '<br>'
            a.addEventListener('click', function (e) {
                e.preventDefault()
                alert(i)
            })
            document.body.appendChild(a)
        })(i)
    }
    ```
    - `DocumentFragment`优化

## 异步

### 什么是异步
异步的场景
- 定时 `setTimeout` `setInverval`
- 网络请求，如 `ajax` `<img>`加载（常用语打点统计）
- 事件绑定

### 异步的实现机制，以及对单线程的理解

### 异步的问题和解决方案
异步遇到的最大的问题
- callback-hell 
- 易读性差，即书写顺序和执行顺序不一致

```javascript
console.log('start')
$.get('./data1.json', function (data1) {
    console.log(data1)
    $.get('./data2.json', function (data2) {
        console.log(data2)
        $.get('./data3.json', function (data3) {
            console.log(data3)
            $.get('./data4.json', function (data4) {
                console.log(data4)
                // ...继续嵌套...
            })
        })
    })
})
console.log('end')
```
- [深入理解 JavaScript 异步系列（1）——基础](http://www.cnblogs.com/wangfupeng1988/p/6513070.html)
- [深入理解 JavaScript 异步系列（2）—— jquery的解决方案](http://www.cnblogs.com/wangfupeng1988/p/6515779.html)
- [深入理解 JavaScript 异步系列（3）—— ES6 中的 Promise](http://www.cnblogs.com/wangfupeng1988/p/6515855.html)
- [深入理解 JavaScript 异步系列（4）—— Generator](http://www.cnblogs.com/wangfupeng1988/p/6532713.html)
- [深入理解 JavaScript 异步系列（5）—— async await](http://www.cnblogs.com/wangfupeng1988/p/6532734.html)

### 同步和异步的区别

同步会阻塞代码执行，而异步不会。`alert`是同步，`setTimeout`是异步

### 关于`setTimeout`的笔试题
```javascript
// 以下代码执行后，打印出来的结果是什么
console.log(1)
setTimeout(function () {
    console.log(2)
}, 0)
console.log(3)
setTimeout(function () {
    console.log(4)
}, 1000)
console.log(5)
```
该题目的答案是`1 3 5 2 4`

### 前端使用异步的场景
- setTimeout setInterval
- 网络请求
- 事件绑定

## 内置对象-正则表达式
### 正则对象
- 正则对象可以匹配变量，pattern 正则表达式的文本，flags(g:全局匹配 i:忽略大小写 m：多行)
- 三种方式
    - 字面量
        - /xyz/i
    - 构造函数（返回一个正则表达式字面量）
        - 参数是字符串(字符串里需要转义`new RegExp("\\w+")`)
            - `var regex = new RegExp('xyz', 'i');` 等价于 `var regex = /xyz/i;`
        - 参数是正则表示式
            - `var regex = new RegExp(/xyz/i);` 等价于 `var regex = /xyz/i;`
        - 参数是正则表示式时第二个参数添加修饰符[ES6]
            - `new RegExp(/abc/ig, 'i')` i覆盖了ig
    - 工厂符号
        - RegExp('xyz' ,i)
- 注意点
    - 正则表达式里有变量
    ```js
    let reg = new RegExp(`^(${j}${o})`)
    ```
### 正则api:
- RegExp.prototype.exec(str)
    - 在一个指定字符串中执行一个搜索匹配。返回一个结果数组(匹配的第一个字符串)或 null，并改变lastIndex(再次执行exec时开始搜索的位置)
    ```js
    const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
    const matchObj = RE_DATE.exec('1999-12-31');
    // 返回结果
    [
        // 匹配的第一个字符串
        0: "1999-12-31"
        // 所有分组
        1: "1999"
        2: "12"
        3: "31"
        // 设置了具名组，并且该组有匹配时的分组捕获
        groups: undefined
        groups: {
            year:1999,
            month:12,
            day:31
        }
        // 匹配到的字符位于原始字符串的基于0的索引值
        index: 0
        // 原始字符串	
        input: "1999-12-31"
        length: 4
    ]
    ```
- RegExp.prototype.test(str)
    - 执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。
    ```js
    var str = 'abc'
    var reg = /^a/i
    console.log(reg.test(str))
    ```
- RegExp.prototype.unicode[ES6]
    - 返回是否设置了u修饰符。
- RegExp.prototype.sticky[ES6]
    - 返回是否设置了y修饰符
- RegExp.prototype.flags[ES6]
    - 返回正则表达式的修饰符

### 字符串的正则方法
5个方法：match()、replace()、search()、split()、matchAll()
### 规则
- 默认前一次匹配的结束是下一次匹配的开始
### 字符类
- []中括号表示范围
  - `[a-zA-Z],[abc],[cf]at`,
  - `[0-9]`
  - `[^a-d]` 非a-d的字符
- ()括号表示里面内容是个整体，优先顺序，|表示或者
  - `(cla|pa)ss` 表示class或者pass

#### 预定义字符类
| 符号 | 含义                                                           |
| :--- | :------------------------------------------------------------- |
| .    | 匹配除\n换行符外的任何单字符。匹配包括\n在内的所有字符，使用`(. | \n)` |
| \d   | 数字字符:[0-9]                                                 |
| \D   | 非数字字符:[^0-9]                                              |
| \s   | 空白字符（空格和换行符）:[\f\n\r\t\v]                          |
| \S   | 非空白字符:[^\s]                                               |
| \w   | 单词字符:[a-zA-Z_0-9]                                          |
| \W   | 非单词字符:[^\w]                                               |

### 量词
- 允许指定匹配出现的次数,以下为贪婪模式：

| 符号   | 含义            |
| :----- | :-------------- |
| X?     | 匹配X零次或一次 |
| X*     | 匹配X零次或多次 |
| X+     | 匹配X一次或多次 |
| X{n,m} | 匹配n-m次       |
| X{n,}  | 匹配X至少n次    |

 <!-- ![量词模式](../../img/三种模式.jpg) -->
 <img :src="$withBase('/img/三种模式.jpg')" alt="foo">

- 量词模式
  - 贪婪：尽量多的匹配目标字符串，且能够回退
  - 勉强：尽量少地匹配目标串
  - 侵占：尽量多地匹配目标串，且不能回退

```md
目标串：xfooxxxxxxfoo
贪婪模式：.*foo
匹配一个（*f尽量多地全部字符串匹配，然后到foo，没有字符串了，就回退一个，再回退一个，直到回退三个时满足条件，然后就匹配了一个）
勉强模式：*?foo
匹配两个（第一个字符不是f，所以勉强地吞下一个x，然后第二个开始发现是foo，所以第一次匹配是xfoo,然后第二次吞下很多个xxx后发现xxxxxxfoo符合，所以共匹配两次）
侵占模式：.*+foo
匹配0个（一次性匹配所有字符，不回退，所以后面的foo没有字符串了）
```
```md
目标串：232hjdhfd7474$
贪婪模式：\w+[a-z]
匹配一个
勉强模式：\w+?[a-z]
匹配三个
侵占模式：\w++[a-z]
匹配0个
```
### 捕获组
- 捕获组：使用括号作为单独的单元来对待的一种方式，可通过程序方便地拿到分组对应的匹配内容
- 作用：
  - 方便程序获取指定组的匹配
  - 反向引用时调用
- 比如在((A)(B(C)))中，按左括号从左到右来数，有四个括号
  - 1:((A)(B(C)))// 表示整个表达式
  - 2:(A)
  - 3:(B(C))
  - 4:(C)
- 具名组匹配（为每一个组匹配指定一个名字）[ES6]
    - 在圆括号内部，模式的头部添加`问号 + 尖括号 + 组名（?<year>）`，就可以在exec方法返回结果的groups属性上引用该组名。数字序号（matchObj[1]）依然有效。
    - 如果具名组as没有找到匹配，那么matchObj.groups.as属性值就是undefined，并且as这个键名在groups是始终存在的。
    ```js
    const RE_OPT_A = /^(?<as>a+)?$/;
    const matchObj = RE_OPT_A.exec('');

    matchObj.groups.as // undefined
    'as' in matchObj.groups // true
    ```
    - 利用具名组解构赋值(直接从匹配结果上为变量赋值)
    ```js
    let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
    one  // foo
    two  // bar
    ```
    - 利用具名组替换（使用$<组名>引用具名组。）
      - 第二个参数是字符串
        ```js
        let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
        '2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
        // '02/01/2015'
        ```
      - 第二个参数是函数。具名组匹配新增了最后一个函数参数(具名组构成的一个对象)。函数内部可以直接对这个对象进行解构赋值。
      ```JS
      '2015-01-02'.replace(re, (
          matched, // 整个匹配结果 2015-01-02
          capture1, // 第一个组匹配 2015
          capture2, // 第二个组匹配 01
          capture3, // 第三个组匹配 02
          position, // 匹配开始的位置 0
          S, // 原字符串 2015-01-02
          groups // 具名组构成的一个对象 {year, month, day}
      ) => {
          let {day, month, year} = groups;
          return `${day}/${month}/${year}`;
      });
      ```
    - 引用（两种引用语法可以同时使用）
      -  \k<组名>
      -  数字引用（\1）
        ```js
        const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
        RE_TWICE.test('abc!abc!abc') // true
        RE_TWICE.test('abc!abc!ab') // false
        ```
#### 反向引用
- 使用反斜线\后跟一个数字来表示。数字用来表示需要引用的分组组号
```js
// 匹配两个数字连续出现两次的目标串(如：1212、2424)
(\d\d)\1 12123233 
// 匹配一次(\d\d表示匹配两个数字，括号括起来表示是一个分组,\1表示重复这个分组一次)
```
```js
// 匹配html标签
<([a-zA-Z]+).*?>(.|\n)*.?</\1>
<div id="vId">我知道<未来>的<a>路</a>很<a>不好走</a></div>
// 匹配一次（([a-zA-Z]+)是前面的标签名，.*?勉强模式匹配多个非换行字符的标签属性,(.|\n)*.?勉强模式匹配标签中间内容，\1重复前面的标签名）
```
#### 非捕获组
- 概要
  - 分组括号里第一个是?就是非捕获组(不计算在分组里面)
  - 好处：不会将匹配到的字符存储在内存中，从而节省内存
- 分类
  - `(?:Pattern)`
```js
// 匹配industry或者Industries
// 这种情况有分组
industr(y|ies)
// 改为没有分组的(节省内存)
industr(?:y|ies)
```
#### 零宽度断言
| 表达式  | 含义                               | 添加时间 |
| ------- | ---------------------------------- | -------- |
| x(?=y)  | 先行断言，仅匹配被y跟随的x。       |          |
| x(?!y)  | 先行否定断言，仅匹配不被y跟随的x。 |          |
| (?<=y)x | 后行断言，仅匹配x在y后面           | ES6      |
| (?<!y)x | 后行否定断言，仅匹配x不在y后面     | ES6      |
- 例：正则表达式(?<!4)56(?=9)
    - 答：文本56前面不能是4，后面必须是9组成，因此5569匹配，4569不匹配
- 例：提取字符串da12bka3434bdca4343bdca234bm中包含在字符a和b之间的数字，但是这个a之前的字符不能是c，b后面的字符必须是d才能提取。
    - 答：通过添加分组拿到分组内容 [^c]a(\d+)bd，通过零宽度断言，去掉前后分组，拿到剩下中间的一个分组 (?<=[^c]a)\d+(?=bd)

-------------------------------------------书签

#### 模式修政符
- 可组合搭配使用

| 表达式 | 含义                                                          | 添加时间 |
| ------ | ------------------------------------------------------------- | -------- |
| i      | 不区分大小写                                                  |          |
| g      | 全局匹配                                                      |          |
| m      | 多行修饰符，使^和$匹配每一行的行首和行尾                      |          |
| s      | 设置为dotAll模式，使.可以匹配任意单个字符                     | ES6      |
| x      |                                                               |          |
| e      |                                                               |          |
| u      | 处理大于\uFFFF的 Unicode 字符                                 | ES6      |
| y      | 与g修饰符类似，也是全局匹配，但匹配必须从剩余的第一个位置开始 | ES6      |

#### 边界匹配器
| 表达式 | 含义             |
| ------ | ---------------- |
| ^      | 行首             |
| $      | 行尾             |
| \b     | 匹配一个单词边界 |
| \B     | 匹配非单词边界   |
```md
I say thank you
thank you 
thank you all the same
<!-- 查找以thank开头的行：^thank，匹配两项-->
<!-- 查找以thank开头以same结尾的行：^thank.*same$，匹配一项 -->
```

#### RegExp.​$1...$9
- 值为String类型
- 返回上一次正则表达式匹配中，第n个子表达式所匹配的文本。（只保存最前面的9个匹配文本。）

#### \p{...}和\P{...}
- 允许正则表达式匹配符合 Unicode 某种属性的所有字符
- 这两种类只对 Unicode 有效，所以使用的时候一定要加上u修饰符。
- 由于 Unicode 的各种属性非常多，所以这种新的类的表达能力非常强。
    ```js
    // 匹配所有数字
    const regex = /^\p{Number}+$/u;
    regex.test('²³¹¼½¾') // true
    regex.test('㉛㉜㉝') // true
    regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true
    // 匹配所有空格
    \p{White_Space}

    // 匹配各种文字的所有字母，等同于 Unicode 版的 \w
    [\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

    // 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
    [^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

    // 匹配 Emoji
    /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

    // 匹配所有的箭头字符
    const regexArrows = /^\p{Block=Arrows}+$/u;
    regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true
    ```
#### 综合实例
- URL
```md
/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
<!-- http或者https开头，http和https可有可无，数字或者小写字母或者.或者-有一个及以上，然后.，然后2-6个小写字母或者.的字符串，然后单词或者空格或者.或者-有0个及以上，整个分组0个及以上，然后/有或者没有，结束。 -->
/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([?=&\/\w \.-]*)*\/?$/
<!-- 修改加上?=&后可匹配带参数url -->
```
## 内置对象-日期函数

日期函数最常用的 API 如下

```javascript
Date.now()  // 获取当前时间毫秒数
var dt = new Date()
dt.getTime()  // 获取毫秒数
dt.getFullYear()  // 年
dt.getMonth()  // 月（0 - 11）
dt.getDate()  // 日（0 - 31）
dt.getHours()  // 小时（0 - 23）
dt.getMinutes()  // 分钟（0 - 59）
dt.getSeconds()  // 秒（0 - 59）

dt.setDate()
// 根据本地时间为指定的日期对象设置月份中的第几天。
dt.setFullYear()
// 根据本地时间为指定日期对象设置完整年份（四位数年份是四个数字）。
dt.setHours()
// 根据本地时间为指定日期对象设置小时数。
dt.setMilliseconds()
// 根据本地时间为指定日期对象设置毫秒数。
dt.setMinutes()
// 根据本地时间为指定日期对象设置分钟数。
dt.setMonth()
// 根据本地时间为指定日期对象设置月份。
dt.setSeconds()
// 根据本地时间为指定日期对象设置秒数。
dt.setTime()
// 通过指定从 1970-1-1 00:00:00 UTC 开始经过的毫秒数来设置日期对象的时间，对于早于 1970-1-1 00:00:00 UTC的时间可使用负值。

```
- 获取`2017-06-10`格式的日期
```javascript
function formatDate(dt) {
    if (!dt) {
        dt = new Date()
    }
    var year = dt.getFullYear()
    var month = dt.getMonth() + 1
    var date = dt.getDate()
    if (month < 10) {
        // 强制类型转换
        month = '0' + month
    }
    if (date < 10) {
        // 强制类型转换
        date = '0' + date
    }
    // 强制类型转换
    return year + '-' + month + '-' + date
}
var dt = new Date()
var formatDate = formatDate(dt)
console.log(formatDate)
```

## 内置对象-数组常用 API

| 功能       |                                      API |                 es6 |
| :--------- | ---------------------------------------: | ------------------: |
| 合并、切割 |                        concat,join,slice |                     |
| 添加       |               unshift(从头),push(从末尾) |                     |
| 删除       |                  shift(从头),pop(从末尾) |                     |
| 删除并添加 |                                   splice |         copy​Within |
| 排序       |                             sort,reverse |                     |
| 遍历       |                       map,forEach,reduce | entries,keys,values |
| 筛选       |                        filter,every,some |                     |
| 查找       |                     indexOf,last​IndexOf |     find,find​Index |
| 转换       | toString,toLocaleString,toSource,ValueOf |                     |
| 自带       |                           Array​.isArray | Array.from,Array.of |



### 数组自带方法
- Array​.isArray()
#### ES6新增
- Array​.from(object, mapFunction, thisValue)
  - 将非数组转为数组（`拥有 length 属性的对象（类数组对象）`和`可迭代的对象`）。
  - 第二个参数(类似map方法),用来对每个元素进行处理，将处理后的值放入返回的数组。
  - 第三个参数，用来绑定map方法中用到的this。
- Array.of()
  - 替代Array()或new Array()
  - Array()
    - 参数为1个时，会指定数组的长度
  - Array.of()
    - 参数为1个时，依然是一个数组
  ```js
  Array(3) // [, , ,]
  Array.of(1) // [1]
  ```
### 实例方法
#### ES5
:::warning 合并、切割
- Array​.prototype​.concat(arrayX,arrayX,......,arrayX)
  - 返回被连接数组的一个副本。
  - 不改变现有的数组
- Array​.prototype​.join()
- Array​.prototype​.slice(start,end)
  - 返回选定的元素。
  - 包前不包后
  - start负数指倒数开始，end不指定就是到最后
:::
:::warning 添加
- Array​.prototype​.unshift()
- Array​.prototype​.push(newelement1,newelement2,....,newelementX)
:::
:::warning 删除
- Array​.prototype​.shift()
- Array​.prototype​.pop()
:::
:::warning 删除并添加
- Array​.prototype​.splice(index,howmany,item1,.....,itemX)
  - 返回被删除的元素的数组。
:::
:::warning 排序
- Array​.prototype​.sort()
  - 默认从小到大arr.sort()
    ```js
    arr.sort(function(a, b) {
            // 从小到大排序
            return a - b
            // 从大到小排序
            // return b - a
        })
    ```
- Array​.prototype​.reverse()
:::
:::warning 遍历
- Array​.prototype​.map(function(currentValue,index,arr){},this.Value)
  - 对数组每个元素进行操作，创建一个新数组
    ```js
    var arr2 = arr.map(function(item, index) {
        return '<b>' + item + '</b>'
    })
     ```
- Array​.prototype​.for​Each(function (item, index) {})
  - 遍历数组的所有元素
- Array​.prototype​.reduce(function(total,currentValue,index,arr){},initialValue)
  - 第一个函数返回总值和每一项的计算，对数组进行计算后得到结果
    ```js
    Array.reduce()
    ```
- Array​.prototype​.reduce​Right()
:::
:::warning 筛选
- Array​.prototype​.filter(function(currentValue,index,arr){},this.Value)
  - 第一个函数返回筛选条件，筛选符合条件的元素
  ```js
    var arr2 = arr.filter(function (item, index) {
        if (item >= 2) {
            return true
        }
    })
  ```
- Array​.prototype​.every()
  - 所有的数组元素，都满足一个条件
    ```js
    arr.every(function (item, index) {
        if (item < 4) {
            return ture
        }
    })
    ```
- Array​.prototype​.some()
  - 只要有一个满足条件即可
    ```js
    arr.some(function (item, index) {
        if (item < 2) {
            return ture
        }
    })
    ```
- Array​.prototype​.indexOf()
- Array​.prototype​.last​IndexOf()
:::
:::warning 转换
- Array​.prototype​.toString()
  - 把数组转换为字符串，并返回结果。(数组中的元素之间用逗号分隔)
- Array​.prototype​.toLocale​String()
:::

#### ES6新增
- Array​.prototype​.copy​Within(target, start = 0, end = this.length)
  - 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
  - 会修改当前数组
  ```js
  [1, 2, 3, 4, 5].copyWithin(0, 3)
  // [4, 5, 3, 4, 5]
  ```
- Array​.prototype​.find()
  - 第一个参数是一个回调函数，所有数组成员依次执行该回调函数，
  - 找出第一个返回值为true的成员，返回该成员。没有符合条件的，返回undefined。
  - 第二个参数（回调函数中的this指向）
    ```js
    [1, 5, 10, 15].find(function(value, index, arr) {
        return value > 9;
    }) // 10
    ```
- Array​.prototype​.find​Index()
  - 第一个参数是一个回调函数，所有数组成员依次执行该回调函数，
  - 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
  - 第二个参数（回调函数中的this指向）
    ```js
    [1, 5, 10, 15].findIndex(function(value, index, arr) {
        return value > 9;
        }) // 2
    ```
    :::tip 和indexOf区别
        - indexOf:找不到NaN
        - find,findIndex:可以借助Object.is方法找到。
    :::
- Array​.prototype​.fill(value, start, end)
  - 使用给定值，填充一个数组。
  - start：填充起始位置，可以省略。end：填充结束位置，可以省略，实际结束位置是end-1。
    ```js
    let a1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    a1.fill(7) // 7,7,7,7,7,7,7,7,7,7,7
    ```
- Array​.prototype​.entries()
  - 键值对遍历
  - 返回一个遍历器对象,可以用for...of循环进行遍历
  ```js
  for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
  }
  ```
- Array​.prototype​.keys()
  - 键名遍历
  - 返回一个遍历器对象,可以用for...of循环进行遍历
  ```js
  for (let index of ['a', 'b'].keys()) {
    console.log(index);
  }
  ```
- Array​.prototype​.values()
  - 键值遍历
  - 返回一个遍历器对象,可以用for...of循环进行遍历
  ```js
  for (let elem of ['a', 'b'].values()) {
    console.log(elem);
  }
  ```
- Array​.prototype​.includes()
  - 返回某个数组是否包含给定的值
  - 第二个参数为负数，则表示倒数的位置
  :::tip
  - indexOf:-1不直观，NaN误判
  - includes：直观，NaN准确判断
  :::
- Array​.prototype​.flat()
  - 返回一个新数组，将嵌套的数组“拉平”，变成一维的数组
  - 第一个参数是整数，表示想要拉平的层数，默认为1。(Infinity表示不管多少层都拉平)
  ```js
  [1, [2, [3]]].flat(Infinity)
  // [1, 2, 3]
  ```
- Array​.prototype​.flatMap()
  - 对原数组的每个成员执行一个函数（相当map），然后对返回值组成的数组执行flat()方法。
  - 第二个参数绑定遍历函数里面的this。
  - flatMap只能展开一层数组。
  ```js
  arr.flatMap(function callback(currentValue[, index[, array]]) {
    // ...
  }[, thisArg])
  // 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
  [1, 2, 3, 4].flatMap(x => [[x * 2]])
  // [[2], [4], [6], [8]]
  ```

### 扩展运算符（数组）[ES6]
- 三个点（...）,将一个数组转为用逗号分隔的参数序列。
```js
console.log(...[1, 2, 3])
// 1 2 3
function push(array, ...items) {
  array.push(...items);
}
```
- 可以放置表达式。
- 如果扩展运算符后面是一个空数组，则不产生任何效果。
- 只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。
- 替代函数的 apply 方法
  - 由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
    ```js
    // ES5 的写法
    Math.max.apply(null, [14, 3, 77])

    // ES6 的写法
    Math.max(...[14, 3, 77])

    // 等同于
    Math.max(14, 3, 77);
    ```
- 数组的扩展运算符应用
  - 复制数组（浅拷贝）
    ```js
    // 写法一
    const a2 = [...a1];
    // 写法二
    const [...a2] = a1;
    ```
  - 合并数组（浅拷贝）
    ```js
    // ES5 的合并数组
    arr1.concat(arr2, arr3);
    // [ 'a', 'b', 'c', 'd', 'e' ]

    // ES6 的合并数组
    [...arr1, ...arr2, ...arr3]
    // [ 'a', 'b', 'c', 'd', 'e' ]
    ```
  - 将字符串转为数组（能够正确识别四个字节的 Unicode 字符。`Array.from()`也可以）
    ```js
    [...'hello']
    // [ "h", "e", "l", "l", "o" ]
    ```
  - 将任意有Iterator接口的对象转为数组（如node节点集合,set map集合等）
    :::tip
    - 扩展运算符：转有`可迭代的对象`为数组
    - Array.from：转`拥有 length 属性的对象（类数组对象）`和`可迭代的对象`为数组
    :::

### 将空位转为undefined[ES6]
- ES6 明确将空位转为undefined。
## 内置对象-字符串常用 API

| 功能       |                                  ES5 API |                                                                        ES6 API |
| :--------- | ---------------------------------------: | -----------------------------------------------------------------------------: |
| 查找       |              indexOf,lastIndexOf,charAt, |                  String.fromCodePoint,codePointAt,includes,startsWith,endsWith |
| 合并，切割 | concat,slice[),subString[),subStr,splite |                                                                                |
| 匹配       |                     match,replace,search |                                                                       matchAll |
| 格式化     |      toLowerCase,toUpperCase,trim,repeat | String.fromCodePoint, String.raw,codePointAt,padStart,padEnd,trimStart,trimEnd |

### 查找
- charAt()
- charCodeAt()
- indexOf()
- lastIndexOf()

- String.fromCodePoint()
    - 可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足。
    - 多个参数，会被合并成一个字符串返回。
    - 与codePointAt()方法相反，定义在String对象上，codePointAt方法定义在字符串的实例对象上。
    ```js
    String.fromCodePoint(0x20BB7)
    // "𠮷"
    String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
    // true
    ```
- str.codePointAt()
    - 返回一个字符的码点（能够正确处理 4 个字节储存的字符）
     - 是测试一个字符由两个字节还是由四个字节组成的最简单方法
```js
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
``` 
- includes()
    - 返回布尔值，表示是否找到了参数字符串。
    - 支持第二个参数，表示开始搜索的位置。
- startsWith()
    - 返回布尔值，表示参数字符串是否在原字符串的头部。
    - 支持第二个参数，表示开始搜索的位置。
- endsWith()
    - 返回布尔值，表示参数字符串是否在原字符串的尾部。
    - 支持第二个参数，表示开始搜索的位置。
### 合并、切割
- concat()
- slice(start,end)
  - 提取字符串的某个部分，并以新的字符串返回被提取的部分。
- substring(start,stop)
  - 提取字符串中介于两个指定下标之间的字符。
- str.substr(start[, length])
  - 提取字符串
- str.split([separator[, limit]])
  - 把一个字符串按分隔符分割成字符串数组
  - separator【必需】字符串或正则表达式(如果空字符串("")被用作分隔符，则字符串会在每个字符之间分割。如果没有找到或者省略了分隔符，则该数组包含一个由整个字符串组成的元素)
  - limit【可选】返回数组的最大长度
### 匹配
- str.replace(regexp|substr, newSubStr|function)
  - 替换
  - 第二个参数是字符串
  - 第二个参数是函数
  ```js
  '2015-01-02'.replace(re, (
        matched, // 整个匹配结果 2015-01-02
        capture1, // 第一个组匹配 2015
        capture2, // 第二个组匹配 01
        capture3, // 第三个组匹配 02
        position, // 匹配开始的位置 0
        S, // 原字符串 2015-01-02
        groups // 具名组构成的一个对象 {year, month, day}[ES6]
    ) => {
        let {day, month, year} = groups;
        return `${day}/${month}/${year}`;
    });
  ```
- str.search(regexp)
  - 对正则表达式和指定字符串进行匹配搜索
  - 匹配成功，返回首次匹配项的索引，否则返回-1
- str.match(regexp)
  - 可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
  - 返回匹配结果的数组（数组的内容看regexp是否加了全局标志g）

- str.matchAll()
    - 如果一个正则表达式在字符串里面有多个匹配，一般使用g修饰符或y修饰符，在循环里面逐一取出。
    - 返回一个正则表达式在当前字符串的所有匹配(返回一个遍历器,用for...of循环)
    - 转数组（...运算符或Array.from方法）

### 格式化

- toLocaleLowerCase()
- toLocaleUpperCase()
- toLowerCase()
- toString()
- toUpperCase()
- trim()
- trimRight()
- trimLeft()
- valueOf()
- String.fromCharCode()
    - 从 Unicode 码点返回对应字符(不能识别码点大于0xFFFF的字符)
```js
String.fromCharCode(0x20BB7)
// "ஷ"
```

- String.raw() 
    - 返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串
- str.repeat(count)
    - 返回一个新字符串，表示将原字符串重复n次。参数必须为正数
    ```js
    "abc".repeat(-1)     // RangeError: 必须为正数
    "abc".repeat(0)      // ""
    "abc".repeat(1)      // "abc"
    "abc".repeat(2)      // "abcabc"
    ```
- normalize()
    - 将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
```js
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true
```
- str.padStart()，str.padEnd()
    - 如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
    - 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
    - 省略第二个参数，默认使用空格补全长度
    - 用途
        - 为数值补全指定位数
        - 提示字符串格式
```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```
```js
// 提示字符串格式
12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```
- str.trimStart()，str.trimEnd()
    - trimStart()消除字符串头部的空格
    - trimEnd()消除尾部的空格。
    - 返回新字符串，不修改原始字符串。
## 内置对象-对象常用 API
### 属性
- 属性名
  - obj.xxx(xxx是变量要用[xxx])
- 属性遍历
  - for-in
    ```js
    var obj = {
        x: 100,
        y: 200,
        z: 300
    }
    var key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(key, obj[key])
        }
    }
    ```
### Object 构造函数的方法
#### ES5
- Object.create(proto, [propertiesObject])
  - 使用指定的原型对象和属性创建一个新对象。
- Object.defineProperty()
  - 在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
    - 添加的属性不可修改
    - 属性无法看到但是可以取到（可以枚举）
  - 描述符
    - configurable(为true时属性描述符才能被改变，属性也能被删除。默认false)
    - enumerable(为true时出现在对象的枚举属性中，默认false)。
    - 数据描述符和存取描述符二选一
      - 数据描述符
        - value(任意javascript值,默认undefined)
        - writable(为true时value能被修改，默认false)
      - 存取描述符
        - get
          - 给属性提供 getter 的方法，访问属性时被执行
          - 默认undefined
          - 没有参数传入，会传入this对象
        - set
          - 给属性提供 setter 的方法，属性值修改时触发
          - 默认undefined
          - 一个参数：新值
  - 使用场景(`class的实现``vue的MVVM``mobx``装饰器``koa`)
  ```js
  let obj={}
  let temp;
  // get第一种写法
  Object.defineProperty(obj,'name',{
    get(){
        return temp
    },
    set(val){
        temp=val;
    }
  })
  // get第二种写法
  let obj={
    temp:'',
    get PI(){
      return this.temp
    },
    set PI(val){
      this.temp=val;
    }
  }
  obj.name='小明'
  ```
#### ES6新增
- Object.is(val1,val2)
  - 与严格比较运算符（===）基本一致(区别：`+0不等于-0`和`NaN等于自身`。)
  ```js
  Object.is(+0, -0) // false
  Object.is(NaN, NaN) // true
  ```
    - 参数
        - value1，第一个需要比较的值。
        - value2，第二个需要比较的值。
    - 返回值
        - 表示两个参数是否相同的`布尔值` 。
        - 是不是非数
    - window.isNaN()
        - 先把参数转化为数字类型,再判断是不是 NaN
        - 只要不是数字都满足
    - Number.isNaN()
        - 先判断参数是不是数字类型,不是就返回 false, 是数字类型再进入判断是不是 NaN.
        - 只有数字中的NaN满足
    ```js
    window.isNaN('abc');// true
    Number.isNaN('abc');// false
    ```

- Object.assign(target, ...sources)
  - 合并对象
  - 只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
  ```js
  const target = { a: 1 };
  const source1 = { b: 2 };
  const source2 = { c: 3 };
  Object.assign(target, source1, source2);
  target // {a:1, b:2, c:3}
  ```
  :::tip
  - 注意点
    - 浅拷贝
    - 同名属性覆盖
    - 可以处理数组（会把数组视为对象）
    - 如果复制的是个取值函数，会先求值再复制
  - 用途
    - 为对象添加属性
    - 为对象添加方法
    - 克隆对象（只克隆对象自身的值）
    - 合并对个对象
    - 为属性指定默认值
        ```js
        const DEFAULTS = {
        logLevel: 0,
        outputFormat: 'html'
        };
        function processContent(options) {
        options = Object.assign({}, DEFAULTS, options);
        console.log(options);
        // ...
        }
        ```
    :::


- Object.getOwnPropertyDescriptors() 
    - 返回指定对象所有自身属性（非继承属性）的描述对象。
    - 用途
        - 解决Object.assign()无法正确拷贝get属性和set属性的问题。（配合Object.defineProperties()方法）
        - 配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝。
- __proto__属性
  - 用来读取或设置当前对象的prototype对象。
  - 最好使用下面的`Object.setPrototypeOf()（写操作）`、`Object.getPrototypeOf()（读操作）`、`Object.create()（生成操作）`代替。
- Object.setPrototypeOf(object, prototype)
  - 设置对象的原型（即内部 [[Prototype]] 属性）。
- Object.getPrototypeOf(obj)
  - 读取一个对象的原型对象
- Object.keys(obj)
  - 返回一个包含所有给定对象自身可枚举属性名称的数组。
  - for...of循环
- Object.values(obj)
  - 返回一个包含所有给定对象自身可枚举属性值的数组。
  - for...of循环
- Object.entries(obj)
  - 返回一个包含所有给定对象自身可枚举属性键值的数组。
  - for...of循环
  - 另一个用处：将对象转为真正的Map结构
    ```js
    const obj = { foo: 'bar', baz: 42 };
    const map = new Map(Object.entries(obj));
    map // Map { foo: "bar", baz: 42 }
    ```
- Object.fromEntries() 
  - 将一个键值对数组转为对象。
    ```js
    Object.fromEntries([
        ['foo', 'bar'],
        ['baz', 42]
    ])
    // { foo: "bar", baz: 42 }
    ```
  - 用处
    - 将键值对的数据结构还原为对象（特别适合将 Map 结构转为对象）
    - 配合URLSearchParams对象，将查询字符串转为对象。
    ```js
    Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
    // { foo: "bar", baz: "qux" }
    ```
- Object.getOwnPropertySymbols(obj)
    - 返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
### Object 实例的方法
- Object.prototype.hasOwnProperty()
  - 返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。
- Object.prototype.isPrototypeOf()
  - 返回一个布尔值，表示指定的对象是否在本对象的原型链中。
- Object.prototype.toString()
  - 返回对象的字符串表示。
- Object.prototype.valueOf()
  - 返回指定对象的原始值。


## 内置对象-Function API
- 实例的方法
  - Function.prototype.apply(thisArg, [argsArray])
    - 在一个对象的上下文中应用另一个对象的方法
    - 参数能够以数组形式传入。(数组元素将作为单独的参数传给 func 函数)
  - Function.prototype.call(thisArg, arg1, arg2, ...)
    - 在一个对象的上下文中应用另一个对象的方法
    - 参数能够以列表形式传入。
  - Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
    - 在一个对象的上下文中应用另一个对象的方法

:::warning 注意
call()方法的作用和 apply() 方法区别
- call()方法接受的是`参数列表`
- apply()方法接受的是一个`参数数组`
:::
:::tip 注
- 利用apply展开数组
```js
var numbers = [5, 6, 2, 3, 7];
var max = Math.max.apply(null, numbers);
console.log(max);
// expected output: 7
var min = Math.min.apply(null, numbers);
console.log(min);
// expected output: 2
```
:::

ES6语法：

### 函数参数的默认值[ES6]
- 参数默认值是惰性求值的(每次都重新计算默认值表达式的值)
```js
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const p = new Point();
p // { x: 0, y: 0 }
```
- 与解构赋值默认值结合使用
```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```
  - 两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。
- 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
- 指定了默认值后，length属性将失真。
  ```js
  (function (a, b, c = 5) {}).length // 2
  ```
- 设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。
- 应用
  - 可以指定某一个参数不得省略，如果省略就抛出一个错误
  - 可以将参数默认值设为undefined，表明这个参数是可以省略的。
### rest 参数[ES6]
- 形式为`...变量名`，用于获取函数的多余参数
- arguments是类数组，rest参数是真数组
- rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
- 函数的length属性，不包括 rest 参数。
```js
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}
// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```
```js
(function(...a) {}).length  // 0
```
### 函数内严格模式
- 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

### 函数的name属性
- 函数的name属性，返回该函数的函数名。（ES6才将其写入了标准）
```js
function foo() {}
foo.name // "foo"
```
- 如果将一个匿名函数赋值给一个变量
```js
var f = function () {};
// ES5
f.name // ""
// ES6
f.name // "f"
```

### 箭头函数

- 一个参数可以省略圆括号
- 可以省略return和{}，如果返回的是一个对象，要用小括号包裹起来
- 用处
  - 简化回调函数
    ```js
    // 正常函数写法
    [1,2,3].map(function (x) {
    return x * x;
    });
    // 箭头函数写法
    [1,2,3].map(x => x * x);
    ```
- 注意点
  - 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。 在箭头函数中，this指向是固定的
  - 不可以当作构造函数(就是不可以使用new命令)
  - 没有arguments,可以用 rest 参数代替。
- 不适用的场合
    - 定义对象的方法，且该方法内部包括this。
    - 需要动态this的时候
    - 函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值
- 嵌套的箭头函数
### 尾调用优化
- 指某个函数的最后一步是调用另一个函数。
```js
function f(x){
  return g(x);
}
```

- 尾调用优化
    - 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
- 尾递归
    - 尾调用自身，就称为尾递归。
    - 递归非常耗费内存，很容易发生“栈溢出”错误。对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
    - ES6规定所有实现必须部署“尾调用优化”。
### 函数参数的尾逗号 
-  允许函数的最后一个参数有尾逗号。
```js
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);
```
### delete 操作符
- delete expression
    - 断开引用来间接
    - 所有情况都返回true，除非属性是一个自己不可配置的属性
```js
// 例：
delete object.property 
delete object['property']
```
:::tip 注意
- 如果删除的属性不存在，delete不会起作用，但仍会返回true
- delete操作只会在自身的属性上起作用(不会删除原型链上的属性)
- 删除一个数组元素时，数组的长度不受影响
```js
var trees = ["redwood","bay","cedar","oak","maple"];
delete trees[3];
if (3 in trees) {
   // 这里不会执行
}
```
:::



## 面试题
### 写一个能遍历对象和数组的`forEach`函数

遍历数组使用`forEach`，而遍历对象使用`for in`，但是在实际开发中，可以使用一个函数就遍历两者，jquery 就有这样的函数

```javascript
function forEach(obj, fn) {
    var key
    if (obj instanceof Array) {
        // 准确判断是不是数组
        obj.forEach(function (item, index) {
            fn(index, item)
        })
    } else {
        // 不是数组就是对象
        for (key in obj) {
            							       		   if(obj.hasOwnProperty(key)){
                fn(key, obj[key])
            }
        }
    }
}

var arr = [1,2,3]
// 注意，这里参数的顺序换了，为了和对象的遍历格式一致
forEach(arr, function (index, item) {
    console.log(index, item)
})

var obj = {x: 100, y: 200}
forEach(obj, function (key, value) {
    console.log(key, value)
})
```

### 实现一个深拷贝
```js
function deepCopy(obj){
    //递归跳出去的条件，不加的话就相当于死循环
    if(typeof obj!='object'){
        return obj;
    }
    var newObj;
    if(obj instanceof Array){
        newObj=[];
    }else{
        newObj={};
    }
    //将obj身上的所有属性复制到newObj身上
    for(var attr in obj){
        //自己调用自己  （递归）
        newObj[attr]=deepCopy(obj[attr]);
    }
    return newObj;
};
```

### setTimeout设置为0有什么作用？
```js
var fuc = [1,2,3];
for(var i in fuc){
  setTimeout(function(){console.log(fuc[i])},0);
  console.log(fuc[i]);
}
//1
//2
//3
//3
//3
```
虽然设置为0秒后执行任务，实际上是大于0秒才执行的。可是这有什么用呢？

用处就在于我们可以改变任务的执行顺序！因为浏览器会在执行完当前任务队列中的任务，再执行setTimeout队列中积累的的任务。

通过设置任务在延迟到0s后执行，就能改变任务执行的先后顺序，延迟该任务发生，使之异步执行。



