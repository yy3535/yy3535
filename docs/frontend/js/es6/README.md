# ES6

[[toc]]

## let和const
### let
  - 有作用域(声明的变量，只在let命令所在的代码块内有效。)
  - 不存在变量提升
  - 暂时性死区(TDZ)
    - 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。凡是在声明之前就使用这些变量，就会报错。
    ```JS
    var tmp = 123;
    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }
    ```
  - 不允许重复声明
  ```js
  // 报错
  function func() {
    let a = 10;
    var a = 1;
  }
  ```
### 块级作用域
- 为什么需要块级作用域？
  - 内层变量可能会覆盖外层变量。
  - 用来计数的循环变量泄露为全局变量。
- ES6块级作用域
  - let为 JavaScript 新增了块级作用域
  ```js
  function f1() {
    let n = 5;
    if (true) {
      let n = 10;
    }
    console.log(n); // 5
  }
  ```
  - 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
  ```js
  // IIFE 写法
  (function () {
    var tmp = ...;
    ...
  }());

  // 块级作用域写法
  {
    let tmp = ...;
    ...
  }
  ```
  - S5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。ES6允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
### const
- 声明一个只读的常量。一旦声明，常量的值就不能改变。
- 一旦声明变量，就必须立即初始化，不能留到以后赋值。
- 只能保证变量指向的那个内存地址所保存的数据不得改动，对于复合类型的数据（主要是对象和数组），指向的数据结构不能保证不可变
```js
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```
- 冻结对象：`Object.freeze`
```js
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```
彻底冻结对象：
```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```
- 用处(模块引用等不需要更改的地方)
```js
const fs=require('fs');
fs.xxx
```
### ES6声明变量的六种方法
- ES5:var,function
- ES6添加四种：let,const,import,class

### 顶层对象的属性
- 顶层对象
  - 浏览器环境：window对象
  - Node：global对象
  - ES5 之中，顶层对象的属性与全局变量是等价的。
    - 问题
      - 没法在编译时就报出变量未声明的错误，只有运行时才能知道
      - 程序员很容易不知不觉地就创建了全局变量（比如打字出错）
      - window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。
```js
window.a = 1;
a // 1

a = 2;
window.a // 2
```
-  ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
  - 为了保持兼容性,var命令和function命令声明的全局变量，依旧是顶层对象的属性；
  - let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
```js
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

### globalThis对象
- 顶层对象（提供全局作用域）
  - 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
  - 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
  - Node 里面，顶层对象是global，但其他环境都不支持。
- 为了能够在各种环境，都能取到顶层对象，一般使用this变量
  - 局限性
    - 全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。
    - 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
    - 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用。
  - 解决
  ```js
  // 方法一
  (typeof window !== 'undefined'
    ? window
    : (typeof process === 'object' &&
        typeof require === 'function' &&
        typeof global === 'object')
      ? global
      : this);

  // 方法二
  var getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  };
  ```
  - 提案
    - 引入globalThis作为顶层对象（任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。）
## 解构赋值(deconstruction)
### 定义
- 按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
```js
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
// 解构不成功，变量的值就等于undefined
let [bar, foo] = [1];
// 不完全解构(等号左边的模式，只匹配一部分的等号右边的数组)，解构依然可以成功。
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
// 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。否则会报错。
let [foo] = 1;
// Set和Generator都可以，因为有Iterator接口
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```
### 规则
- 只要等号右边的值不是对象或数组，就先将其转为对象。
### 本质
- 属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
### 默认值
- 解构赋值允许指定默认值。
- 只有当一个数组成员严格等于undefined，默认值才会生效。
- 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
- 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
  ```js
  let [foo = true] = [];
  foo // true

  let [x, y = 'b'] = ['a']; // x='a', y='b'
  let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

  let [x = 1, y = x] = [];     // x=1; y=1
  ```
### 对象的解构赋值
- 数组的取值由它的位置决定；而对象属性变量必须与属性同名，才能取到正确的值。
```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
```
- 内部机制是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
```

### 注意点
- 大括号不要在行首，否则会解释为代码块，需要加上小括号解决
```js
let x;
({x} = {x: 1});
```
- 可以对数组进行对象属性的解构(数组本质是特殊的对象)

### 字符串的解构赋值
- 字符串被转换成了一个类似数组的对象。
```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
- 类似数组的对象都有一个length属性
```js
let {length : len} = 'hello';
len // 5
```
### 数值和布尔值的解构赋值
- 数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。
```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```
- undefined和null无法转为对象，所以对它们进行解构赋值
```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```
### 函数参数的解构赋值
```js
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

function move({x = 0, y = 0}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```
### 圆括号问题
- 变量声明语句，不能使用圆括号。
- 函数参数也属于变量声明，不能带有圆括号。
- 赋值语句，模式部分不能放在圆括号中。
- 赋值语句的非模式部分，可以使用圆括号
```js
({ p: a }) = { p: 42 };// 报错
[(b)] = [3]; // 正确
```

### 用途
- 交换变量的值
```js
let x = 1;
let y = 2;
[x, y] = [y, x];
```
- 从函数返回多个值
- 函数参数的定义
- 提取 JSON 数据
- 函数参数的默认值
- 遍历 Map 结构
- 输入模块的指定方法


## 字符串的扩展
### 字符的 Unicode 表示法
- 现在共有 6 种方法可以表示一个字符。
```js
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```
- 字符串的遍历器接口
  - 最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
```js
// 字符串可以被for...of循环遍历。
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```
```js
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```
### 直接输入U+2028和U+2029
- JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。
    - U+005C：反斜杠（reverse solidus)
    - U+000D：回车（carriage return）
    - U+2028：行分隔符（line separator）
    - U+2029：段分隔符（paragraph separator）
    - U+000A：换行符（line feed）
JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被JSON.parse解析，就有可能直接报错。
```js
const json = '"\u2028"';
JSON.parse(json); // 可能报错
```
JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。
```js
const PS = eval("'\u2029'");
```

### JSON.stringify() 的改造
- 根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的JSON.stringify()方法有可能返回不符合 UTF-8 标准的字符串。
- 为了确保返回的是合法的 UTF-8 字符，ES2019 改变了JSON.stringify()的行为。如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。
```js
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

### 模板字符串
```js
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
`
console.log(val)
```
- 用`（反引号）标识，用${}将变量括起来。支持换行
- 所有的空格,缩进和换行都会被保留
- 可以放入任意的JavaScript表达式，可以进行运算
- 可以调用函数
- 需要使用反引号，则前面要用反斜杠转义。
- 嵌套使用
```js
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];
console.log(tmpl(data));
```
- 引用模板字符串本身，在需要时执行，可以写成函数。
```js
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"
```
### 标签模板
- 定义
  - 紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。
```js
// 无参数
alert`123`
alert(123)
// 有参数
let a = 5;
let b = 10;
tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
// 第一个参数是一个数组(是模板字符串中那些没有变量替换的部分)（包括一个自带的raw属性，保存了转译后的原第一个参数的数组['Hello ', ' world ', '']）
// 其他参数是模板字符串各个变量被替换后的值
tag(['Hello ', ' world ', ''], 15, 50);
```
- 应用
  - 过滤 HTML 字符串，防止用户输入恶意内容。
  - 多语言转换（国际化处理）
  - 通过标签函数，代替Mustache 之类的模板库（添加条件判断和循环处理功能）
  - 调用其他语言的函数，在 JavaScript 语言之中嵌入其他语言。
## 字符串的新增方法
- 见api
## 正则的扩展
- 见正则基础

## 扩展运算符`…`
- `...`的作用就是删掉外面的{}

### 用于对象的展开(es7)
- 拷贝对象(另辟一个空间)
  ```js
  let obj={name:'zfpx',age:9};
  let school={...obj}
  ```
  :::tip 深拷贝与浅拷贝

  - 浅拷贝(对象的对象引用地址还是同一个)
    - 扩展运算符`...`
    - Object.assign
  - 深拷贝
    - $.extend
    - 实现深拷贝(通过递归)
      ```js
      let obj={a:b:{abc:abc}}
      function deepClone(obj){
        if(obj===null) return null;
        if(typeof obj!='object') return obj;
        if(obj instanceof RegExp) return new RegExp(obj);
        if(obj instanceof Date) return new Date(obj);
        let newObj=new obj.constructor;
        for(let key in obj){
          newObj[key]=deepClone(obj[key]);
        }
        return newObj
      }
      let newReg=deepClone(obj);
      console.log(newReg);
      ```
  :::
- 合并对象
  ```js
  let school={...obj,...obj1};
  ```
### 用于数组的展开
- [...arr1,...arr2]
  - 原理：concat(arr1,arr2)
   ```js
   // 以前展开数组方法？
   Math.max.apply(Math,arr)
   // 现在展开数组方法
   Math.max(...arr)
   ```
### 用于剩余运算符
- 只能放在函数的最后一个参数，如sum(b,…arg)
```js
// 使用剩余运算符作为参数接收(只能放在最后一项)
function sum(...arg){
  // 类数组可迭代，所以可以用这个运算符转数组
  return eval([...arguments].join('+'));
}
let r=sum(1,2,3,4,5);
console.log(r)
```
## class类

### es5中的类
- 原生的构造函数
- 类必须要大写
- es5中可以当做函数来调用，es6中类只能new
```js
function Animal(type){
  this.type=type;
}
Animal.prototype.eat=function(){
  console.log('eat')
}
// 继承的三种方法
// 1.继承实例上的属性
function Cat(type){
  Animal.call(this,type)
}
// 2.获取父类的公共属性
- node刚出来的时候
es5:Cat.prototype.__proto__=Animal.prototype;
- node6.0的时候
es5:Cat.prototype=Object.create(Animal.prototype,{constructor:{value:Cat}});
- es6出来以后
es6:Object.setPrototypeOf(Cat.prototype,Animal.prototype);

let cat=new Cat('哺乳类')
console.log(cat.eat)
// 3.继承父类实例上的所有属性：因为初始化子类不能给父类传参，所以没人用，一般用1+2
Cat.prototype=new Animal();
let cat=new Cat('哺乳类');
```
### es6中的类
- 只能new
```js
class Animal{
  constructor(type){
    this.type=type;
  }
  //添加公共属性
  eat(){
    console.log(this);
  }
}
//继承原型和公共方法，extends里面内置了call，也实现了继承共有属性
Class Cat extends Animal{
  //静态方法，子类可继承
  static flag(){
      return '好玩'
  }
  constructor(type){
    super(type);//继承必须写这句，相当于Animal.call(this.type);
  }
}
Animal.prototype.eat=...//不需要用这种方法，直接在类里添加即可
Animal()//出错 构造函数Animal只能通过new来调用
let animal=new Animal('哺乳类');
let cat=new Cat('哺乳类')
```
### 用es5实现es6Class类
```js
function _classCallCheck(sub,constr){
  if(!(sub instanceof constr)){
    throw new Error('Cannot with new ')
  }
}
let Animal=function (){
  function Animal(type){
    _classCallCheck(this,Animal);//判断如果不是通过new返回错误
    this.type=type;
  }
  _createClass();//用Object.defineProperty，因为通过es6类创建的方法是不可看到的
  return Animal;
}()
Animal()
//...没看懂==！
```

## 装饰器
- @符号表示是装饰器
- 可以修饰类，类中的属性和方法
```js
function sweetCoffee(coffee){
  coffee();
  console.log('加糖')
}
function coffee(){
  console.log('一杯苦coffee')
}
sweetCoffee(coffee)
```
```js
@testable
class MyTestableClass {
  // ...
}
function testable(target) {
  target.isTestable = true;
}
MyTestableClass.isTestable // true
```
## Symbol
- 是第七种js数据类型(js的数据类型：`number` `string` `boolean` `null` `undefined` `object`)
- 一般用作常量，每次拿到的都不一样
```js
console.log(typeof Symbol());//symbol
console.log(Symbol()===Symbol());//false
console.log(Symbol('a')===Symbol('a'));//false
const a1=Symbol.for('a');//声明一个Symbol
console.log(Symbol.keyFor(a1))//a ,取值
```

## map set 集合
### set
- 放的东西不能重复(数组可重复)，可以被迭代
```js
//数组去重
let arr=[1,2,3,3,2,1]
console.log(new Set(arr));
```
:::tip 常见面试题
```js
//并集
let arr1=[1,2,3,3,2,1];
let arr2=[4,5,6];
let s=[...new Set([...arr1,arr2])];//Symbol.iterator
console.log(s)//1,2,3,4,5,6
```
```js
//交集
let s1=new Set(arr1);
let s2=new Set(arr2);
let r=[...s1].filter(item=>{//如果返回true表示留下
  return s2.has(item);
})
console.log(r);
```
```js
//差集
let r=[...s1].filter(item=>{//如果返回true表示留下
  return !s2.has(item);
})
console.log(r);
```
:::
- Set的方法
```js
let s=new Set([1,2,3]);
s.add(5);
s.clear();
s.delete(2);
```
### map
- 一样，不能放重复的数据
```js
let map=new Map();
map.set('js',['nodejs'])
map.set('js',['js1'])//覆盖
console.log(map);
map.forEach((item,key)=>{
  console.log(item,key)
})
```


## 其他语法
- Object.is(value1, value2);
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

## 第三方模块

### babel
- 转换es6成es5
- 可在命令行中直接转换
1. 安装babel
```js
npm install @babel/cli @babel/core//babel核心和babelcli
npm add @babel/preset-env//babel插件1
npm add @babel/plugin-proposal-class-properties//babel插件2
npm add @babel/plugin-proposal-decorators//babel插件3
```
2. 新建一个.babelrc文件，运行时会按这个文件的方式来解析
  ```js
  // .babelrc
  {
    "presets":[
      "@babel/preset-env"//这个插件告诉babel按es6到es5编译
    ],
    "plugins":[
      [
        "@babel/plugin-proposal-class-properties",//这个插件用来转化类上的属性
        {
          "loose":false
        }
      ],
      [
        "@babel/plugin-proposal-decorators",//这个插件用来识别类装饰器
        {
          "legacy":true
        }
      ]
    ]
  }
  ```
3. 解析
  ```js
  class Circle{
    constructor(){
      this.a=1
    }//简写成如下写法
    a=1//高级写法，可用babel解析识别
    static PI=3.14//es6不支持静态属性，可用babel解析识别
  }
  let c=new Circle;
  console.log(c.a)
  命令：babel 6.class.js -o new.jss
  ```

### moment
- 时间的插件(12345676543245 YYYY-MM-DD)
  - 可以算相对时间 多语言
```js
yarn add moment
import moment from 'moment'
moment.locale('zh-cn');
console.log(moment().fromNow());
moment(str).format('YYYY-MM-DD HH:mm:ss');// 获取'YYYY-MM-DD HH:mm:ss'格式的时间
```