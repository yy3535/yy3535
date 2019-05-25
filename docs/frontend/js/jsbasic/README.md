# 01-JS基础知识
[[toc]]

## 01-变量类型和计算知识点

### 变量类型

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

### 变量计算（此处为值类型的计算）

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

## 答题

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

## 02-原型和原型链知识点

### 构造函数

```javascript
function Foo(name, age) {
    this.name = name
    this.age = age
    this.class = 'class-1'
    // return this  // 默认有这一行
}
var f = new Foo('zhangsan', 20)
// var f1 = new Foo('lisi', 22)  // 创建多个对象
```

以上示例是通过`new Foo`创建出来一个`f`对象，对象有`name` `age` `class`三个属性，**这样我们就称`Foo`是`f`的构造函数**。构造函数这个概念在高级语言中都存在，它就像一个模板一样，可以创建出若干个示例。

函数执行的时候，如果前面带有`new`，那么函数内部的`this`在执行时就完全不一样了，不带`new`的情况我们下一章节会讲到。**带`new`执行时，函数中的`this`就会变成一个空对象，让程序为其属性赋值，然后最终返回。**`return this`是默认执行的，如何验证？———— 你可以最后加一个`return {x:10}`试一下。返回之后，`f`就被赋值成了这个新对象，这样就创建完成了。

### 构造函数 - 扩展

**- `var a = {}`其实是`var a = new Object()`的语法糖

- `var a = []`其实是`var a = new Array()`的语法糖
- `function Foo(){...}`其实是`var Foo = new Function(...)`的语法糖**

大家看到以上几点，明白我要表达的意思了吗？

**如何判断一个函数是否是一个变量的构造函数呢 ———— 使用`instanceof`**

### 几个要点

以下要点，要全部明白并且记住！！！在此我会详细解释

- **所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（除了`null`意外）**
- **所有的引用类型（数组、对象、函数），都有一个`__proto__`(隐式原型)属性，属性值是一个普通的对象**
- **所有的函数，都有一个`prototype`（显示原型）属性，属性值也是一个普通的对象**
- **所有的引用类型（数组、对象、函数），`__proto__`属性值指向它的构造函数的`prototype`属性值**

```javascript
var obj = {}; obj.a = 100;
var arr = []; arr.a = 100;
function fn () {}
fn.a = 100;

console.log(obj.__proto__);
console.log(arr.__proto__);
console.log(fn.__proto__);

console.log(fn.prototype)

console.log(obj.__proto__ === Object.prototype)
```

### 原型

我们先将一开始的示例做一下改动，然后看一下执行的效果

```javascript
// 构造函数
function Foo(name, age) {
    this.name = name
}
Foo.prototype.alertName = function () {
    alert(this.name)
}
// 创建示例
var f = new Foo('zhangsan')
f.printName = function () {
    console.log(this.name)
}
// 测试
f.printName()
f.alertName()
```

执行`printName`时很好理解，但是执行`alertName`时发生了什么？这里再记住一个重点 **当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`（即它的构造函数的`prototype`）中寻找**

那么**如何判断一个这个属性是不是对象本身的属性呢？使用`hasOwnProperty`，常用的地方是遍历一个对象的时候**

```javascript
var item
for (item in f) {
    // 高级浏览器已经在 for in 中屏蔽了来自原型的属性，但是这里建议大家还是加上这个判断，保证程序的健壮性
    if (f.hasOwnProperty(item)) {
        console.log(item)
    }
}
```

### 原型链

还是接着上面的示例，执行`f.toString()`时，又发生了什么？因为`f`本身没有`toString()`，并且`f.__proto__`（即`Foo.prototype`）中也没有`toString`。这个问题还是得拿出刚才那句话————**当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`（即它的构造函数的`prototype`）中寻找**

如果在`f.__proto__`中没有找到`toString`，那么就继续去`f.__proto__.__proto__`中寻找，因为`f.__proto__`就是一个普通的对象而已嘛！

这样一直往上找，你会发现是一个链式的结构，所以叫做“原型链”。直到找到最上层都没有找到，那么就宣告失败，返回`undefined`。最上层是什么 ———— `Object.prototype.__proto__ === null`

### 原型链中的`this`

所有的从原型或者更高级的原型中得到、执行的方法，其中的`this`在执行时，就指向了当前这个触发事件执行的对象。因此`printName`和`alertName`中的`this`都是`f`。

### instanceof

- 原理
  - 如果要计算`f instanceof Foo`是不是正确，就要判断`f`的原型一层一层往上，能否对应到`Foo.prototype`。同理，如果要计算`f instanceof Object`是不是正确，就要判断`f`的原型一层一层往上，能否对应到`Object.prototype`

### 扩展参考

讲解原型和原型链，绝对要参考我之前写过的文章[《深入理解JS原型和闭包系列博客》]

## 答题

### 如何**准确**判断一个变量是数组类型

只有`instanceof`才能判断一个对象是否是真正的数组

```javascript
var arr = []
arr instanceof Array // true
typeof arr // object，typeof 是无法判断是否是数组的
```

扩展：实际应用中，和数组同样重要、起同样作用并且更加灵活的数据结构还是“伪数组”或者“类数据”（jquery 就用到了）。因此，**在实际应用中，只需要判断`length`属性是否是数字即可。**

```javascript
var arr = []
var likeArr = {
    0: 'aaa',
    1: 'bbb',
    2: 'ccc',
    length: 3
}

typeof arr.length === 'number' // true
typeof likeArr.length === 'number' // true
```

PS：**为何需要要扩展补充？** 在面试过程中，面试官很希望能从你那里得到“惊喜”，即面的他提问的问题，你正确回答之后，还能有所补充，这样你会加分不少。在日常工作中也一样，如果你能在完成工作之后再去考虑如何更有质量、更有效率的完成工作，或者通过本次工作的总结出一种方式，能更好的完成接下来的工作，那你的 leader 绝对高看你一眼。这其实就是我们所说的**积极、主动和工作热情**，光嘴说没用，你得实干。

### 写一个原型链继承的例子

接下来继续回答这个问题。你看其他人的培训或者看书，这个例子一般都会给你弄一些小猫小狗小动物来演示，例如

```javascript
// 动物
function Animal() {
    this.eat = function () {
        console.log('animal eat')
    }
}
// 狗
function Dog() {
    this.bark = function () {
        console.log('dog bark')
    }
}
Dog.prototype = new Animal()
// 哈士奇
var hashiqi = new Dog()
```

```javascript
function Elem(id){
	this.elem=document.getElementById(id)
}
Elem.prototype.html=function(val){
	var elem=this.elem
	if(val){
		elem.innerHTML=val
		return this//链式操作
	}else{
		return elem.innerHTML
	}
}
Elem.prototype.on=function(type,fn){
	var elem=this.elem
	elem.addEventListener(type,fn)
}
var div1=new Elem('detail-page');
console.log(div1.html())
div1.html('<p>hello imooc</p>')
div1.on('click',function(){
	alert('clicked')
})
```



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

### 描述 new 一个对象的过程

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
### zepto（或其他框架） 源码中如何使用原型链

## 03-作用域和闭包知识点

本节我们将全面梳理 JS 代码的执行过程，涉及到的概念有非常多。所以大家一定要耐心听，如果你此前不了解这一块，而通过本教程掌握了这方面知识，对你的基础知识将会有质的提醒。

### 执行上下文

先看下面的例子，你可能会对结果比较差异。当然，我不建议在实际开发中通过这种方式来炫技，我们这里演示纯粹是为了讲解知识点做一个铺垫。

```javascript
console.log(a)  // undefined
var a = 100

fn('zhangsan')  // 'zhangsan' 20
function fn(name) {
    age = 20
    console.log(name, age)
    var age
}
```

在一段 JS 脚本（即一个`<script>`标签中）执行之前，会先创建一个**全局执行上下文**环境，先把代码中即将执行的（内部函数的不算，因为你不知道函数何时执行）变量、函数声明（和“函数表达式”的区别）都拿出来。变量先暂时赋值为`undefined`，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。再次强调，这是在代码执行之前才开始的工作。

另外，一个函数在执行之前，也会创建一个**函数执行上下文**环境，跟**全局上下文**差不多，不过**函数执行上线文**中会多出`this` `arguments`和函数的参数。参数和`arguments`好理解，这里的`this`咱们需要专门讲解。

总结一下

- 范围：一段`<script>`或者一个函数
- 全局：变量定义，函数声明
- 函数：变量定义，函数声明，this，arguments

### this

先搞明白一个很重要的概念 ———— **`this`的值是在执行的时候才能确认，定义的时候不能确认！** 为什么呢 ———— 因为`this`是执行上下文环境的一部分，而执行上下文需要在代码执行之前确定，而不是定义的时候。看如下例子

```javascript
var a = {
    name: 'A',
    fn: function () {
        console.log(this.name)
    }
}
a.fn()  // this === a
a.fn.call({name: 'B'})  // this === {name: 'B'}
var fn1 = a.fn
fn1()  // this === window
```

`this`执行会有不同，主要集中在这几个场景中

- 作为构造函数执行（new的时候，this会是一个空对象，在构造函数中赋值后返回）
- 作为对象属性执行（可能有三种结果，如上）
- 作为普通函数执行（可能有两种结果，如下）
- 用于`call` `apply` `bind`

前两种情况咱们之前都介绍过了，这里只是统一的提出来，汇总一下，不再详细讲了。这里主要说第三种

```javascript
function fn() {
    console.log(this)
}
fn()  // window
fn.call({a:100})  // {a:100}  和 call 同理的还有 apply bind
```

### 作用域

作为有 JS 基础的同学，你应该了解 JS 没有块级作用域。例如

```javascript
if (true) {
    var name = 'zhangsan'
}
console.log(name)
```

从上面的例子可以体会到作用域的概念，作用域就是一个独立的地盘，让变量不会外泄、暴露出去。上面的`name`就被暴露出去了，因此，**JS 没有块级作用域，只有全局作用域和函数作用域**。

```javascript
var a = 100
function fn() {
    var a = 200
    console.log('fn', a)
}
console.log('global', a)
fn()
```

全局作用域就是最外层的作用域，如果我们写了很多行 JS 代码，变量定义都没有用函数包括，那么他们就全部都在全局作用域中。这样的坏处就是很容易装车。

```javascript
// 张三写的代码中
var data = {a:100}

// 李四写的代码中
var data = {x:true}
```

这就是为何 jquery zepto 等库的源码，所有的代码都会放在`(function(){....})()`中。因为放在里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他的库或者 JS 脚本造成影响。这是函数作用域的一个体现。

### 作用域链

首先认识一下什么叫做**自由变量**。如下代码中，`console.log(a)`要得到`a`变量，但是在当前的作用域中没有定义`a`（可对比一下`b`）。当前作用域没有定义的变量，这成为**自由变量**。自由变量如何得到 ———— 向父级作用域寻找。

```javascript
var a = 100
function fn() {
    var b = 200
    console.log(a)
    console.log(b)
}
fn()
```

如果父级也没呢？再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是**作用域链**。

```javascript
var a = 100
function F1() {
    var b = 200
    function F2() {
        var c = 300
        console.log(a)
        console.log(b)
        console.log(c)
    }
    F2()
}
F1()
```

### 闭包

直接看一个例子

```javascript
function F1() {
    var a = 100
    return function () {
        console.log(a)
    }
}
var f1 = F1()
var a = 200
f1()
```

自由变量将从作用域链中去寻找，但是**依据的是函数定义时的作用域链，而不是函数执行时**，以上这个例子就是闭包。闭包主要有两个应用场景：

- 函数作为返回值，上面的例子就是
- 函数作为参数传递，看以下例子

```javascript
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
F2(f1)
```

> 面试题
```
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
```
答：函数 getNameFunc 内返回一个闭包，因此 this 指向全局对象，所以 this.name 即为定义在全部作用域下的 name（"The Window"）。
而函数 getName 内并未返回闭包，因此 this 指向当前对象，所以 this.name 即为当前作用域下的 name（"My Object"）。

### 扩展阅读

请参考我之前写过的文章[《深入理解JS原型和闭包系列博客》](http://www.cnblogs.com/wangfupeng1988/p/3977924.html)

## 解题

### 说一下对变量提升的理解

函数执行时会先创建当前的上下文环境，其中这两点会产生“变量提升”的效果

- 变量定义
- 函数声明

### 说明 this 几种不同的使用场景

- 作为构造函数执行
- 作为对象属性执行
- 作为普通函数执行
- call apply bind

### 创建 10 个 a 标签，点击的时候弹出来对应的序号

错误的写法

```javascript
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

正确的写法

```javascript
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

上面的回答已经结束了，但是还有一点可以优化，如果能做到，那将会给你加分。提示一下，是关于 DOM 操作的性能问题的。这里先按下不表，等后面讲解性能问题的时候再说。有兴趣的可以先去查查`DocumentFragment`

### 如何理解作用域

根据我之前写过的[《深入理解JS原型和闭包》](http://www.cnblogs.com/wangfupeng1988/p/3977924.html)系列博客，详细讲解作用域和闭包。

### 实际开发中闭包的应用

闭包的实际应用，主要是用来封装变量。即把变量隐藏起来，不让外面拿到和修改。

```javascript
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

## 04异步知识点

### 什么是异步

先看下面的 demo，根据程序阅读起来表达的意思，应该是先打印`100`，1秒钟之后打印`200`，最后打印`300`。但是实际运营根本不是那么回事。

```javascript
console.log(100)
setTimeout(function () {
    console.log(200)
}, 1000)
console.log(300)
```

再对比以下程序。先打印`100`，再弹出`200`（等待用户确认），最后打印`300`。这个运行效果就符合预期要求。

```javascript
console.log(100)
alert(200)  // 1秒钟之后点击确认
console.log(300)
```

这俩到底有何区别？———— 第一个示例中间的步骤根本没有阻塞接下来程序的运行，而第二个示例却阻塞了后面程序的运行。前面这种表现就叫做**异步**（后面这个叫做**同步**）

为何需要异步呢？如果第一个示例中间步骤是一个 ajax 请求，现在网络比较慢，请求需要5秒钟。如果是同步，这5秒钟页面就卡死在这里啥也干不了了。

最后，前端 JS 脚本用到异步的场景主要有两个：

- 定时 `setTimeout` `setInverval`
- 网络请求，如 `ajax` `<img>`加载
- 事件绑定（后面会有解释）

ajax 代码示例

```javascript
console.log('start')
$.get('./data1.json', function (data1) {
    console.log(data1)
})
console.log('end')
```

img 代码示例（常用语打点统计）

```javascript
console.log('start')
var img = document.createElement('img')
img.onload = function () {
    console.log('loaded')
}
img.src = '/xxx.png'
console.log('end')
```

事件绑定

```javascript
console.log('start')
document.getElementById('btn1').addEventListener('click', function () {
    alert('clicked')
})
console.log('end')
```

### 异步和单线程

JS 在客户端运行的时候，只有一个线程可运行，因此想要两件事儿同时干是不可能的。如果没有异步，我们只能同步干，就像第二个示例一样，等待过程中卡住了，但是有了异步就没有问题了。那么单线程是如何实现异步的呢？

```javascript
console.log(100)
setTimeout(function () {
    console.log(200)
})
console.log(300)
```

那上面的示例来说，有以下几点。重点从这个过程中体会**单线程**这个概念，即事情都是一步一步做的，不能两件事儿一起做。

- 执行第一行，打印`100`
- 执行`setTimeout`后，传入`setTimeout`的函数会被暂存起来，不会立即执行。
- 执行最后一行，打印`300`
- 待所有程序执行完，处于空闲状态时，会立马看有没有暂存起来的要执行。
- 发现暂存起来的`setTimeout`中的函数无需等待时间，就立即来过来执行

下面再来一个`setTimeout`的例子。规则和上面的一样，只不过这里暂存起来的函数，需要等待 1s 之后才能被执行。

```javascript
console.log(100)
setTimeout(function () {
    console.log(200)
}, 1000)
console.log(300)
```

下面再来一个 ajax 的例子。规则也是一样的，只不过这里暂存起来的函数，要等待网络请求返回之后才能被执行，具体时间不一定。

```javascript
console.log(100)
$.get('./data.json', function (data) {
    console.log(200)
})
console.log(300)
```

最后再解释一下事件绑定，如下代码。其实事件绑定的实现原理和上面的是一样的，也是会把时间暂存，但是要等待用户点击只有，才能被执行。原理是一样的，因此事件绑定在原理上来说，可以算作是异步。但是从设计上来说，还是分开好理解一些。

```javascript
console.log(100)
$btn.click(function () {
    console.log(200)
})
console.log(300)
```

**重点：异步的实现机制，以及对单线程的理解**

------

下面的暂时先不讲

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

不过目前已经有了非常明确的解决方案 —— Promise，并且 Promise 放在 ES6 的标准中了。很遗憾本教程的范围不包括 ES6 ，因为 ES6 包含的内容太多了，放在这个教程中会很庞大，成本太高。

> 要想把异步讲全面，那得单独需要一门课程花5-7个小时去讲解（JS、jquery、ES6、node）。如果这样一讲，那就又带出了ES6的很多知识，又得花额外的时间去讲解，这样算下来，就得10多个小时。

我提供了一个参考链接，如果大家有本节课的基础，再去看参考链接的内容，应该能掌握异步更高级的知识。

### 参考和扩展阅读

- [深入理解 JavaScript 异步系列（1）——基础](http://www.cnblogs.com/wangfupeng1988/p/6513070.html)
- [深入理解 JavaScript 异步系列（2）—— jquery的解决方案](http://www.cnblogs.com/wangfupeng1988/p/6515779.html)
- [深入理解 JavaScript 异步系列（3）—— ES6 中的 Promise](http://www.cnblogs.com/wangfupeng1988/p/6515855.html)
- [深入理解 JavaScript 异步系列（4）—— Generator](http://www.cnblogs.com/wangfupeng1988/p/6532713.html)
- [深入理解 JavaScript 异步系列（5）—— async await](http://www.cnblogs.com/wangfupeng1988/p/6532734.html)

## 解答

### 同步和异步的区别是什么？分别举一个同步和异步的例子

同步会阻塞代码执行，而异步不会。`alert`是同步，`setTimeout`是异步

### 一个关于`setTimeout`的笔试题

面试题中，`setTimeout`的基本是必会出现的

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

该题目的答案是`1 3 5 2 4`，不知道跟你答对了没有。具体的原理，我们后面再详细讲解。

### 前端使用异步的场景有哪些

- setTimeout setInterval
- 网络请求
- 事件绑定（可以说一下自己的理解）

## 05其他基础知识知识点

### 正则表达式

`test`函数的用法

```javascript
var ua = navigator.userAgent
var reg = /\bMicroMessenger\b/i
console.log(reg.test(ua))
```

用于`replace`的示例

```javascript
function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, '')
}
```

`match`函数的用法

```javascript
var url = 'http://www.abc.com/path/xxx.html?a=10&b=20&c=30#topic'  // 后面的 #topic 也可能没有
var reg = /\?(.+?)(#|$)/
var matchResult = url.match(reg)
console.log(matchResult[1]) // a=10&b=20&c=30
```

略过正则表达式，不讲

------

### 日期函数

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
```

### Math

Math 最常用的只有一个 API —— `Math.random()`，常用于清除浏览器缓存，比如频繁访问一个链接，就在链接后加一个random()
| 功能 | API |
| :------| ------: |
| random() | [0,1) |
| ceil(x) | 向上取整 |
| floor(x) | 向下取整 |
| round(x) | 四舍五入 |
| abs(x) | 绝对值 |
| max(x,y,z,...n) | 求最大值 |
| min(x,y,z...n) | 求最小值 |

### 数组常用 API

| 功能 | API |
| :------| ------: |
| 合并、切割 | concat,join,slice |
| 添加 | unshift(从头),push(从末尾) |
| 删除 | shift(从头),pop(从末尾) |
| 删除并添加 | splice |
| 排序 | sort,reverse |
| 转换 | toString,toLocaleString,toSource,ValueOf |
| 遍历 | map,forEach,reduce |
| 筛选 | filter,every,some |
| 转换成数组 | Array.from |

- Array.forEach

遍历数组的所有元素
```javascript
var arr = [1,2,3]
arr.forEach(function (item, index) {
    console.log(index, item)
})
```

- Array.every

判断所有的数组元素，都满足一个条件
```javascript
var arr = [1,2,3]
var result = arr.every(function (item, index) {
    if (item < 4) {
        return ture
    }
})
console.log(result)
```

- Array.some

判断所有的数组元素，只要有一个满足条件即可
```javascript
var arr = [1,2,3]
var result = arr.some(function (item, index) {
    if (item < 2) {
        return ture
    }
})
console.log(result)
```

- Array.sort
```javascript
var arr = [1,4,2,3,5]
var arr2 = arr.sort(function(a, b) {
    // 从小到大排序
    return a - b
    // 从大到小排序
    // return b - a
})
console.log(arr2)
```

- Array.map

第一个函数返回对数组每个元素进行操作，创建一个新数组
```
Array.map(function(currentValue,index,arr),this.Value)
```
```javascript
var arr = [1,2,3,4]
var arr2 = arr.map(function(item, index) {
    // 将元素重新组装，并返回
    return '<b>' + item + '</b>'
})
console.log(arr2)
```

- Array.filter

第一个函数返回筛选条件，筛选符合条件的元素。

```
Array.filter(function(currentValue,index,arr),this.Value)
```

```javascript
var arr = [1,2,3]
var arr2 = arr.filter(function (item, index) {
    // 通过某一个条件过滤数组
    if (item >= 2) {
        return true
    }
})
console.log(arr2)
```

- Array.reduce

第一个函数返回总值和每一项的计算，对数组进行计算后得到结果

```
Array.reduce(function(total,currentValue,index,arr),initialValue)
```


- Array.from

from() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组。

```
Array.from(object, mapFunction, thisValue)
```

### 字符串常用 API

| 功能 | API |
| :------| ------: |
| 查找 | indexOf,lastIndexOf,includes,charAt |
| 合并，切割 | concat,slice[),subString[),subStr,splite |
| 匹配 | match,replace,search,startsWith |
| 格式化 | toLowerCase,toUpperCase,trim,repeat |


### 对象常用 API

- for-in

```javascript
var obj = {
    x: 100,
    y: 200,
    z: 300
}
var key
for (key in obj) {
    // 注意这里的 hasOwnProperty，再讲原型链时候讲过了
    if (obj.hasOwnProperty(key)) {
        console.log(key, obj[key])
    }
}
```

## 解答

### 获取`2017-06-10`格式的日期

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

### 获取随机数，要求是长度一直的字符串格式

使用`Math.random()`可获取字符串，但是返回的是一个小于 1 的小数，而且小数点后面长度不同

```javascript
var random = Math.random()
var random = random + '0000000000'  // 后面加上 10 个零
var random = random.slice(0, 10)
console.log(random)
```



背诵字符串的方法



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
```
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

### 其他面试题
- setTimeout设置为0有什么作用？
```
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
