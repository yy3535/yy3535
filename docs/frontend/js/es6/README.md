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


## 数值的扩展
- 见变量部分
## 函数的扩展
- 见函数API
## 数组的扩展
- 见数组API
## 对象的扩展
### 属性
#### 属性的写法
- 简洁表示法
  - 直接写变量（属性名为变量名, 属性值为变量的值）
  - 简写函数
  ```js
  const o = {
    method() {return "Hello!";}
  };
  const o = {
    method: function() {return "Hello!";}
  };
  ```
- 属性名表达式
  - 属性名的两种写法`obj.foo = true;`和`obj['a' + 'bc'] = 123;`
  - 字面量方式(大括号)定义对象，ES6规定可用`['a' + 'bc']`定义属性
  ```js
  let propKey = 'foo';
  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
  };
  let obj = {
    ['h' + 'ello']() {
      return 'hi';
    }
  };
  ```
:::warning
- 属性名表达式与简洁表示法，不能同时使用
:::
#### 函数属性的name属性
- 方法的name属性返回函数名
- 方法使用了取值函数（getter）和存值函数（setter），返回值是方法名前加上get和set。
- bind方法创造的函数，name属性返回bound加上原函数的名字
- Function构造函数创造的函数，name属性返回anonymous。

#### 属性遍历
:::tip
- 可枚举性
  - 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。其中有个`enumerable`为false即不可枚举。
  ```js
  //  {
  //    value: 123,
  //    writable: true,
  //    enumerable: true,
  //    configurable: true
  //  }
  ```
- 不可枚举的属性
  - 所有 Class 的原型的方法都是不可枚举的。
  - toString
  - length
- 忽略不可枚举属性的方法
  - for...in循环：只遍历对象自身的和继承的可枚举的属性。
  - Object.keys()：返回对象自身的所有可枚举的属性的键名。
  - JSON.stringify()：只串行化对象自身的可枚举的属性。
  - Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
:::
- 属性遍历的五种方法
  - for...in
  - Object.keys(obj)
  - Object.getOwnPropertyNames(obj)
  - Object.getOwnPropertySymbols(obj)
  - Reflect.ownKeys(obj)
### super 关键字
- 指向当前对象的原型对象
```js
const proto = {
  foo: 'hello'
};
const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};
Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```
- 注意
  - 只能用在对象的方法之中

### 扩展运算符（对象）[ES2018]
#### 解构赋值

#### 扩展运算符
- 数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
- 扩展运算符后面不是对象，则会自动将其转为对象。
- 对象的扩展运算符等同于使用Object.assign()方法。
- 后面可以跟表达式。
:::tip
- 完整克隆一个对象（对象实例的属性+对象原型的属性）
```js
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};
// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);
// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```
:::
- 用处
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
  let ab = { ...a, ...b };
  // 等同于
  let ab = Object.assign({}, a, b);
  ```
## 对象的新增方法
- 见对象API


## Symbol
### 引入原因
- 对象的属性名容易冲突（引入后对象的属性名有两种类型，一种是字符串，另一种是Symbol 类型，可保证不会冲突）
### 概念
- 表示独一无二的值。
- 是第七种原始数据类型(js的数据类型：`number` `string` `boolean` `null` `undefined` `object`)
- Symbol函数前不能使用new命令，不是对象，不能添加属性（类似字符串的数据类型）
### 参数
- 接受一个字符串作为参数
- 如果 参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
- 相同参数的返回值是不相等的(参数只是表示对当前 Symbol 值的描述)
```js
let s1 = Symbol('foo');
s1 // Symbol(foo)
```
### 值
- 不能与其他类型的值进行运算
- 可以显式转为字符串，可以转为布尔值，不能转为数值

### Symbol API
#### 构造函数方法
- Symbol(str)
  - 返回一个Symbol值
  - 会被登记在全局环境中供搜索
- Symbol.for(str)
  - 搜索有没有以该参数作为名称的 Symbol 值。有就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
  - 不会被登记在全局环境中
  ```js
  Symbol.for("bar") === Symbol.for("bar")
  // true
  Symbol("bar") === Symbol("bar")
  // false
  ```
- Symbol.keyFor(str)
  - 返回一个已登记的 Symbol 类型值的key。
    ```js
    let s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"
    ```
#### 11个内置的Symbol值
- Symbol.hasInstance
  - 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
    ```js
    class MyClass {
      [Symbol.hasInstance](foo) {
        return foo instanceof Array;
      }
    }
    [1, 2, 3] instanceof new MyClass() // true
    ```
- Symbol.isConcatSpreadable
  - 等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
    ```js
    let arr1 = ['c', 'd'];
    ['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
    arr1[Symbol.isConcatSpreadable] // undefined

    let arr2 = ['c', 'd'];
    arr2[Symbol.isConcatSpreadable] = false;
    ['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
    ```

- Symbol.species
  - 对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
  - 实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。

- Symbol.match
  - 对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。

- Symbol.replace
  - 对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。

- Symbol.search 
  - 对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。
- Symbol.split
  - 对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。
- Symbol.iterator 
  - 对象的Symbol.iterator属性，指向该对象的默认遍历器方法。对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器
- Symbol.toPrimitive
  - 对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
- Symbol.toStringTag 
  - 对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。
- Symbol.unscopables
  - 对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
#### 实例方法
- Symbol.prototype.description
  - 返回 Symbol 的描述。
- 

### 作为对象属性名
- 不能用点运算符。
#### 属性名的遍历
- 只能用`Object.getOwnPropertySymbols`获取指定对象的所有 Symbol 属性名。
- 因为不会被常规方法遍历得到，可以为对象定义一些非私有的、但又希望只用于内部的方法。
### 作为常量
- 保证一组常量的值都是不相等的
- 可以保证上面的switch语句会按设计的方式工作。
- 将魔术字符串的变量值改成Symbol 值，确保不会冲突。
  :::warning 魔术字符串
  在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
  :::

## Set 和 Map 数据结构
### Set
#### 概念
- 类似于数组，但是成员的值都是唯一的，没有重复的值。
- 没有键名，只有键值（键名和键值是同一个值）
```js
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4(不会添加重复的值)
```
:::warning 数组去重
```js
// 去除数组的重复成员
[...new Set(array)]
Array.from(new Set(array));
```
:::
#### 参数
- 一个用来初始化的具有 iterable 接口的集合
#### 值
- 在 Set 内部，两个NaN是相等。两个空对象不相等
#### 实例的属性和方法
:::warning 属性
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。
:::
:::warning 操作方法
- add(value)：添加某个值，返回 Set 结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。
:::
:::warning 遍历操作
- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach((value,key)=>{})：使用回调函数遍历每个成员
  - 第二个参数，表示绑定处理函数内部的this对象。
:::
#### 数组的方法间接用于Set
```js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```
#### 实现并集、交集、差集
```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

### WeakSet
- 与Set类似，但成员只能是对象，而不能是其他类型的值。
- WeakSet 不可遍历（因为垃圾回收机制不考虑 WeakSet 对该对象的引用，所以一旦引用对象被回收，成员数就会减少）
```js
const ws = new WeakSet();
```
#### 方法
- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中

#### 用处
- 储存 DOM 节点
  - 不用担心这些节点从文档移除时，会引发内存泄漏。

### Map
#### 概念
- 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
:::tip
Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
:::
```js
const m = new Map();
```
#### 参数
- 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构
- Set和Map都可以用来生成新的 Map。
```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
```

#### 实例的属性
- size
  - 返回 Map 结构的成员总数。

#### 实例的操作方法 
- set(key, value)
  - 设置键名key对应的键值为value，然后返回整个 Map 结构。
  - 如果key已经有值，则键值会被更新，否则就新生成该键。
  - 可以采用链式写法(返回的是当前的Map对象)
  ```js
  let map = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
  ```
- get(key)
  - 读取key对应的键值，如果找不到key，返回undefined。
- has(key)
  - 返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- delete(key)
  - 删除某个键，返回true。如果删除失败，返回false。
- clear()
  - 清除所有成员，没有返回值。

#### 遍历方法
- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach((value,key,map)=>{})：遍历 Map 的所有成员。
  - 第二个参数，用来绑定this。

#### 数组的方法间接用于Map
```JS
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

### WeakMap
- 与Map结构类似，但只接受对象作为键名（null除外），不接受其他类型的值作为键名。
- 键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
- WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
```js
const map = new WeakMap();
```
#### WeakMap API
- 无遍历操作，无size属性，无clear
- get()
- set()
- has()
- delete()
#### 用途
-  DOM 节点作为键名
  - 一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
- 部署私有属性
  - 如果删除实例，它们也就随之消失，不会造成内存泄漏。


## Proxy
### 概述
- 为了操作对象而提供的新 API
- 表示由它来“代理”某些操作，可以译为“代理器”。（对外界的访问进行过滤和改写）
```js
var proxy = new Proxy(target, handler);
```
### 参数
- target（所要拦截的目标对象）
- handler（一个对象，用来定制拦截行为）
```js
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});
proxy.time // 35
proxy.name // 35
```
### 注意
- 必须针对Proxy实例进行操作，而不是针对目标对象进行操作
- 如果handler没有设置任何拦截，那就等同于直接通向原对象。
- 可将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
### 操作方法
- get(target, propKey, receiver)
  - 拦截对象属性的读取，比如proxy.foo和proxy['foo']。
- set(target, propKey, value, receiver)
  - 拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
- has(target, propKey)
  - 拦截propKey in proxy的操作，返回一个布尔值。
- construct(target, args)
  - 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
- deleteProperty(target, propKey)
  - 拦截delete proxy[propKey]的操作，返回一个布尔值。
- defineProperty(target, propKey, propDesc)
  - 拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- getOwnPropertyDescriptor(target, propKey)
  - 拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- getPrototypeOf(target)
  - 拦截Object.getPrototypeOf(proxy)，返回一个对象。
- isExtensible(target)
  - 拦截Object.isExtensible(proxy)，返回一个布尔值。
- ownKeys(target)
  - 拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- preventExtensions(target)
  - 拦截Object.preventExtensions(proxy)，返回一个布尔值。
- setPrototypeOf(target, proto)
  - 拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- apply(target, object, args)
  - 拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

### Proxy.revocable()
- 返回一个可取消的 Proxy 实例。
### 用途
- Web 服务的客户端
```js
const service = createWebService('http://example.com/data');
service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl+'/' + propKey);
    }
  });
}
```
- 实现数据库的 ORM 层

## Reflect
### 概念
- 为了操作对象而提供的新 API
- Object对象的一些明显属于语言内部的方法，未来的新方法将只部署在Reflect对象上，只有Reflect对象上可以拿到语言内部的方法。
- 修改某些Object方法的返回结果，让其变得更合理。
- 让Object操作都变成函数行为。
```js
// 老写法
'assign' in Object // true
// 新写法
Reflect.has(Object, 'assign') // true
```
- 与Proxy对象的方法一一对应，Proxy对象可以方便地调用对应的Reflect方法，完成默认行为。
### 静态方法（大部分与Object对象的同名方法的作用相同，而且它与Proxy对象的方法是一一对应的。）
- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
```js
Reflect.get(myObject, 'foo') // 1
```
- Reflect.set(target, name, value, receiver)
```js
Reflect.set(myObject, 'foo', 2);
myObject.foo // 2
```
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

### 使用 Proxy 实现观察者模式
```js
const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
// 输出
// 李四, 20
```

```js
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
```
## Promise对象
### 概念
- Promise 是一个对象，从它可以获取异步操作的消息。
- 特点
  - promise对象的异步操作的三种状态:pending（进行中）、fulfilled（已成功）和rejected（已失败）
  - 状态改变：`从pending变为fulfilled`和`从pending变为rejected`

### 参数
- 一个函数（函数参数resolve和reject，由js引擎提供，不用自己部署）
  - resolve
    - 将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
  - reject
    - 将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
```js
const promise = new Promise(function(resolve, reject) {
  /* 某异步操作 */
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

```

### 构造函数方法
- Promise()

- Promise.all([p1,p2,p3]) 
  - 所有成员返回成功才会成功，有一个失败就失败
  - 将多个 Promise 实例，包装成一个新的 Promise 实例
  - 参数是具有 Iterator 接口的对象，且每个成员都是Promise实例(不是会自使用resolve转)
  - 如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
  ```js
  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
  .then(result => result);
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result);
  Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));
  // Error: 报错了
  ```
- Promise.race([p1,p2,p3]) 
  - 将多个 Promise 实例，包装成一个新的 Promise 实例。
  - 参数是具有 Iterator 接口的对象，且每个成员都是Promise实例(不是会自使用resolve转)
  - 只要有一个参数promise状态改变，就产生结果
```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
p
.then(console.log)
.catch(console.error);
```
- Promise.resolve()
  - 将现有对象转为 状态为resolved 的Promise 对象
  - then会立即执行
  ```js
  Promise.resolve('foo')
  // 等价于
  new Promise(resolve => resolve('foo'))
  ```
  - 四种参数
    - 参数是一个 Promise 实例（直接返回这个实例）
    - 参数是一个thenable对象（将这个对象转为 Promise 对象，然后立即执行thenable对象的then方法。）
    - 参数不是具有then方法的对象，或根本就不是对象（则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。）
    - 不带有任何参数（返回一个resolved状态的 Promise 对象。）
    :::warning 快速得到一个promise对象
    希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。
    :::
- Promise.reject(reason)
  - 返回一个状态为rejected的Promise 实例
  - 回调函数立即执行
  - 参数会作为reject的理由，变成后续方法的参数。
```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))
p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

### 实例方法
- Promise.prototype.then()
  - 参数1(回调函数)：状态变为resolved时调用
  - 参数2(回调函数)：状态变为rejected时调用
  - 返回的是一个新的Promise实例（可以链式调用,第一个then方法指定的回调函数，返回的是另一个Promise对象。）
  ```js
  promise.then(function(value) {
    // success
  }, function(error) {
    // failure
  });
  ```
  ```js
  getJSON("/post/1.json").then(
    post => getJSON(post.commentURL)
  ).then(
    comments => console.log("resolved: ", comments),
    err => console.log("rejected: ", err)
  );
  ```
- Promise.prototype.catch()
  - 指定发生错误时的回调函数
  - .then(null, rejection)或.then(undefined, rejection)的别名
  - 建议使用catch方法，而不使用then方法的第二个参数。
  ```js
  getJSON('/posts.json').then(function(posts) {
    // ...
  }).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
  });
  ```
- Promise.prototype.finally() [ES2018]
  - 指定不管 Promise 对象最后状态如何，都会执行的操作。(本质上是then方法的特例)
  ```JS
  promise
    .then(result => {···})
    .catch(error => {···})
    .finally(() => {···});
  ```


### Promise实现一个Ajax操作
```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

### 应用
- 加载图片
  - 将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。
- Generator 函数与 Promise 的结合
- 同步和异步同样处理
  - Promise.try提案

## Iterator和for..of循环
### 概念
  - 统一的接口机制，来处理所有不同的数据结构（Array,Object,Map,Set）。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作`for...of`
### Iterator接口
- 一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）（Symbol.iterator属性名是symbol内置对象，属性值是个函数，执行这个函数，就会返回一个遍历器。）
```js
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```
### 具备Iterator接口的数据结构
- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象
```js
// 手动遍历
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```
:::warning 类数组（存在数值键名和length属性）部署 Iterator 接口
Symbol.iterator方法引用数组的 Iterator 接口。
```js
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
```
:::
### 调用Iterator接口的场合
- 任何接受数组作为参数的场合（数组的遍历会调用遍历器接口）
  - for...of
  - Array.from()
  - Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
  - Promise.all()
  - Promise.race()
- 解构赋值
- 扩展运算符
- yield*

### 遍历器对象部署的方法
- next()
- return
  - 如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return方法。(如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。)
- throw
  - 配合 Generator 函数使用

### for...of循环
- 数组
  - 代替forEach方法
  - for...in循环读取键名，for...of循环读取键值
  - for...in返回所有属性，for...of只返回具有数字索引的属性
- Set和Map
  - 遍历的顺序是按照各个成员被添加进数据结构的顺序
  - Set 结构遍历时，返回的是一个值， Map 结构遍历时，返回的是一个数组(数组的两个成员分别为当前 Map 成员的键名和键值)
:::warning 遍历语法总结
- for循环（麻烦）
- forEach(无法中途跳出循环，break和return都无效)
- for...in(遍历键名)
  - 会遍历手动添加的其他键，甚至包括原型链上的键。
  - 可能会以任意顺序遍历键名。
- for...of
  - 语法简洁，没有for...in的缺点。
  - 可以与break、continue和return配合使用。
  - 提供了遍历所有数据结构的统一操作接口。

:::

## Generator 函数的语法
### 概念
- 状态机，封装了多个内部状态
- 调用后返回一个遍历器对象（遍历器生成函数），可以依次遍历 Generator 函数内部的每一个状态。
- function关键字与函数名之间有一个星号(没有规定是哪个位置)，函数体内部使用yield表达式（定义不同的内部状态）
- 分段执行，调用遍历器对象的next方法进入下一个状态（yield表达式是暂停执行的标记）
- next()
  - 遇到yiedl或者return返回一个有value(内部状态的值)和done(是否遍历结束)属性的对象。
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true }
```

#### yield表达式
- yield表达式只能用在 Generator 函数里面
- yiedl具备记忆位置功能，return不具备
- 如果用在另一个表达式之中，必须放在圆括号里面。
- 用作函数参数或放在赋值表达式的右边，可以不加括号。

#### Iterator接口赋值Generator
- 可以把 Generator 赋值给对象的Symbol.iterator属性(Generator 函数就是遍历器生成函数)

### next()方法
  - 带一个参数，该参数就会被当作上一个yield表达式的返回值。
### 构造函数
- Generator.prototype.throw()
  - 在函数体外抛出错误，然后在 Generator 函数体内捕获。
  - 接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。
```js
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

- Generator.prototype.return() 
  - 返回给定的值(参数)，并且终结遍历 Generator 函数。

:::warning next(),throw(),return
- 让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
  - next()是将yield表达式替换成一个值。
  - throw()是将yield表达式替换成一个throw语句。
  - return()是将yield表达式替换成一个return语句。
:::

### Generator函数里执行Generator函数。
- yiedl* 表达式
```js
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```
### 作为对象属性
```js
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
// 等同于
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};
```

### 作为状态机
- Generator 是实现状态机的最佳结构。
- 不用外部变量保存状态，因为它本身就包含了一个状态信息（目前是否处于暂停态）
```js
// ES5状态机
var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}
// Generator状态机
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
```

### 应用（可以暂停函数执行，返回任意表达式的值。）
- 异步操作的同步化表达
  ```js
  function* main() {
    var result = yield request("http://some.url");
    var resp = JSON.parse(result);
      console.log(resp.value);
  }
  function request(url) {
    makeAjaxCall(url, function(response){
      it.next(response);
    });
  }
  var it = main();
  it.next();
  ```
- 控制流管理
```js
// Promise实现
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();

// Generator改善
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
```
- 部署 Iterator 接口
- 作为数据结构
  - 可以看作是一个数组结构
    ```js
    function* doStuff() {
      yield fs.readFile.bind(null, 'hello.txt');
      yield fs.readFile.bind(null, 'world.txt');
      yield fs.readFile.bind(null, 'and-such.txt');
    }
    // 像数组一样用for of遍历
    for (task of doStuff()) {
      // task是一个函数，可以像回调函数那样使用它
    }
    ```

## Generator 函数的异步应用
### ES5的异步处理方法
- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象
  - 不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。
  - 代码冗余（原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆then）原来的语义变得很不清楚。

### 传统异步编程的解决方案（多任务的解决方案）协程
  - 概念
    - 第一步，协程A开始执行。
    - 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
    - 第三步，（一段时间后）协程B交还执行权。
    - 第四步，协程A恢复执行

### 协程在ES6中的实现（Generator 函数）
- 可以交出函数的执行权（即暂停执行）。
  -  Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。

### co模块
- 自动执行Genrerator函数
  - 接受 Generator 函数作为参数，返回一个 Promise 对象。
  - 源码：利用递归执行next不停进行then回调
```js
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
var co = require('co');
co(gen);
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});
```
```js
// co源码
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
  });
}
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
  });
}
function next(ret) {
  if (ret.done) return resolve(ret.value);
  var value = toPromise.call(ctx, ret.value);
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(
    new TypeError(
      'You may only yield a function, promise, generator, array, or object, '
      + 'but the following object was passed: "'
      + String(ret.value)
      + '"'
    )
  );
}
```
- 支持并发的异步操作
  - 要把并发的操作都放在数组或对象里面，跟在yield语句后面。
```js
// 数组的写法
co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res);
}).catch(onerror);

// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
}).catch(onerror);
```

## async函数
### 是 Generator 函数的语法糖。
```js
// Generator
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
// async
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
- 改善
  - 内置执行器（Generator 函数，需要调用next方法，或者用co模块，才能真正执行）。
  - 更好的语义
  - 更广的适用性（await后可以是 Promise 对象和原始类型的值，co模块的yield后只能是Thunk函数或Promise对象）
  - 返回值是Promise(Generator 函数的返回值是 Iterator 对象)
  - z总之：async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。
### 基本用法
- async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
- async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
```js
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
```

### await命令
- await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
- 错误处理
  - 将其放在try...catch代码块之中
  - 有多个await命令，可以统一放在try...catch结构中。
- 注意点
  - 最好把await命令放在try...catch代码块中。（await命令后面的Promise对象，运行结果可能是rejected）
  - 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
    ```js
    // 多个await
    let foo = await getFoo();
    let bar = await getBar();
    // 写法一
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
    // 写法二
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;
    ```
  - await命令只能用在async函数之中
    - 如果将forEach方法的参数改成async函数，也有问题。正确的写法是采用for循环。
  - async 函数可以保留运行堆栈。
### async函数实现原理
- 将 Generator 函数和自动执行器，包装在一个函数里。
```js
async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```



## 扩展运算符`…`
- `...`的作用就是删掉外面的{}

### 用于对象的展开(es7)
### 用于数组的展开
### 用于剩余运算符
## Class 的基本语法
### 简介
#### 生成实例对象的传统方法是通过构造函数。
#### ES6引入了 Class（类）这个概念，作为对象的模板。【只是一个语法糖】
- 与ES5一致的
  - 让对象原型的写法更加清晰、更像面向对象编程的语法。不需要加上function这个关键字,方法之间不需要逗号分隔(构造函数的另一种写法)
  - 类的数据类型就是函数，类本身就指向构造函数。
  - 使用也是对类使用new命令
  - 类的所有方法都定义在类的prototype属性上面。(Object.assign方法一次向类添加多个方法)
  - prototype对象的constructor属性，直接指向“类”的本身，
- 与ES5不一致的
  - 类的内部所有定义的方法，都是不可枚举的
  - 类必须使用new调用，否则会报错（普通构造函数不用new也可以执行）
```js
// ES5
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
var p = new Point(1, 2);
// ES6
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
```js
class Point {
  // ...
}
typeof Point // "function"
Point === Point.prototype.constructor // true

class Point {
  constructor() {
    // ...
  }
  toString() {
    // ...
  }
  toValue() {
    // ...
  }
}
// 等同于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```
#### constructor【与ES5一致】
- 默认方法，如果定义，会添加一个空的constructor方法。（通过new命令生成对象实例时，自动调用该方法。）
- 默认返回实例对象（即this），可以指定返回另外一个对象。
#### 类的实例【与ES5一致】
  - 使用new命令
  - 实例的属性除非显式定义在其本身（this对象上），否则都是定义在原型上（class上）。
#### 取值函数（getter）和存值函数（setter）【与ES5一致】
- 对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
  - 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
```
#### 属性表达式
- 类的属性名，可以采用表达式。
#### Class用表达式形式定义
- 类的名字只在 Class 的内部可用，指代当前类。在 Class 外部，只能用变量名引用。
- 可简写省略名字
```js
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
const MyClass = class { /* ... */ };
```
#### 注意
- 类和模块的内部，默认是严格模式
- 类不存在变量提升（hoist）
- 类函数的许多特性都被Class继承，包括name属性
- 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
- 类的方法内部如果含有this，它默认指向类的实例。

### 静态方法（不会被实例继承，而是直接通过类来调用）
- 在一个方法前，加上static关键字
### 静态属性()
- ES6 明确规定，Class 内部只有静态方法，没有静态属性。只能采取这种方法
- 有提案提供像静态方法一样的static关键字
```js
class Foo {
}
Foo.prop = 1;
Foo.prop // 1
```
### 实例属性
- 定义
  - 定义在constructor()方法里面
  - 定义在类的最顶层（这时，不需要在实例属性前面加上this。）
  ```js
  class IncreasingCounter {
    _count = 0;
    get value() {
      console.log('Getting the current value!');
      return this._count;
    }
    increment() {
      this._count++;
    }
  }
  ```

### 私有方法和私有属性
- 只能在类的内部访问的方法和属性，外部不能访问。
- ES6 不提供，可以采取以下三种方法模拟实现，（#语法目前在提案中）
  - 在命名上加以区别。
  - 将私有方法移出模块
  - 利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

### new.target 属性
- 用在构造函数之中，返回new命令作用于的那个构造函数。
- 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，
- 可以用来确定构造函数是怎么调用的。

## Class 的继承
### 简介
- 通过extends关键字实现继承
- super关键字表示父类的构造函数
- 子类必须在constructor方法中调用super方法
  - 子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
  :::warning ES5继承和ES6继承区别
  - ES5 先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
  - ES6 先将父类实例对象的属性和方法，加到this上面，然后再用子类的构造函数修改this。
  :::
```js
class Point {
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```
### 获取父类
- 判断一个类是否继承了另一个类。
```js
Object.getPrototypeOf(ColorPoint) === Point
// true
```
### super 关键字
- 作为函数，代表父类的构造函数，用来继承父类方法
- 作为对象
  - 在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
### 类的 prototype 属性和__proto__属性
- 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
  - 子类的__proto__属性，表示构造函数的继承，总是指向父类。
  - 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

### 原生构造函数（js内置构造函数）的继承
- 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。
  - Boolean()
  - Number()
  - String()
  - Array()
  - Date()
  - Function()
  - RegExp()
  - Error()
  - Object()

### Mixin模式的实现
- Mixin
  - 多个对象合成一个新的对象，新对象具有各个组成成员的接口。
```js
// 将多个类的接口“混入”（mix in）另一个类。
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

## Module的语法
### 概述
- ES6之前，CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。
- ES6 在语言标准的层面上，实现了模块功能，而且得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
:::warning 区别
- CMD和AMD运行时才能确定模块的依赖关系，输入时必须查找对象属性，而ES6编译时就能确定
```js
// CommonJS模块(整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。
// “运行时加载”，因为只有运行时才能得到这个对象)
// CommonJS 模块输出的是值的缓存，不存在动态更新，
let { stat, exists, readFile } = require('fs');

// ES6模块(从fs模块加载 3 个方法，其他方法不加载。
// “编译时加载”或者静态加载,编译时就完成模块加载)
// 值动态更新
import { stat, exists, readFile } from 'fs';
```
:::
- ES6模块优点
  - 静态加载
  - 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。
  - 将来浏览器的新 API 就能用模块格式提供
  - 不再需要对象作为命名空间（比如Math对象），可以通过模块提供。
- 注意
  - ES6的模块自动采用严格模式
  - ES6模块中，顶层的this指向undefined(不应该在顶层代码使用this)

### export命令
- 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
- 可使用as重命名
- export命令规定的是对外的接口，所以输出的必须是接口（必须在接口名与模块内部变量之间建立一一对应的关系，通过接口取到值，而不能直接输出值）
- export语句输出的接口，与其对应的值是动态绑定关系（通过该接口，可以取到模块内部实时的值）
- export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错
```js
// 写法一
export var firstName = 'Michael';
export var lastName = 'Jackson';
export function multiply(x, y) {
  return x * y;
};
// 写法二（优先考虑）
var firstName = 'Michael';
var lastName = 'Jackson';
function v1() { ... }
export { firstName, lastName, v1 as streamV1 };
```
```js
// 报错
var m = 1;
export m;
// 报错
function f() {}
export f;
// 写法一
export var m = 1;
// 写法二
var m = 1;
export {m};
// 写法三
var n = 1;
export {n as m};
// 正确
export function f() {};
// 正确
function f() {}
export {f};

export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);// 输出变量foo，值为bar，500毫秒后变成baz
```
### import命令
- 接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。
- 使用as关键字，将输入的变量重命名。
- 输入的变量是只读的(不允许在加载模块的脚本里面，改写接口。但对象的属性是可以改写的。改写后其他模块也能读取，所以很难查错)
- from，位置，.js后缀可以省略，只是模块名，必须有配置文件，告诉js引擎该模块的位置
- import命令具有提升效果，会提升到整个模块的头部，首先执行。
- import是静态执行，所以不能使用表达式和变量（运行时才能得到结果的语法）
- 没有from,import语句会执行所加载的模块
- 多次重复执行同一句import语句，只会执行一次
```js
// main.js
import { firstName, lastName, year } from './profile.js';
import { lastName as surname } from './profile.js';
import 'lodash';
function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```
### 模块的整体加载
- 用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
```js
// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}
export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```
```js
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```
### export default命令
- import命令后面，不使用大括号。可以指定任意名字。
- 无需知道模块里有哪些属性和方法即可加载模块。
- 本质是将后面的值，赋给default变量，然后系统允许你为它取任意名字。
  - 后面不能跟变量声明语句
  - 可以直接将一个值写在export default之后。
  - 可以同时输入默认方法和其他接口
  - 可以用来输出类
```js
// export-default.js
export default function () {
  console.log('foo');
}
export function each(obj, iterator, context) {
  // ···
}
export { each as forEach };
```
```js
// import-default.js
import customName from './export-default';
import _, { each, forEach } from 'lodash';
customName(); // 'foo'
```

### export 与 import 的复合写法 
- 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
- 写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。
```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

- 模块接口改名
```js
export { foo as myFoo } from 'my_module';
```
- 整体输出
```js
export * from 'my_module';
// 默认接口
export { default } from 'foo';
```
- 具名接口改为默认接口
```js
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;
```
- 默认接口改名为具名接口
```js
export { default as es6 } from './someModule';
```
- 下面三种import语句，没有对应的复合写法。
```js
import * as someIdentifier from "someModule";
import someIdentifier from "someModule";
import someIdentifier, { namedIdentifier } from "someModule";
```
#### 模块的继承
```js
// circleplus.js
// 继承了circle模块。
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```


#### 跨模块常量
- const声明的常量只在当前代码块有效。
- 如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享
  - 建一个专门的constants目录
  - 将这些文件输出的常量，合并在index.js里面。
  - 使用的时候，直接加载index.js
```js
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};
// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
```
```js
// constants/index.js
export {db} from './db';
export {users} from './users';
```
```js
// script.js
import {db, users} from './constants/index';
```

### import()
- require是运行时加载模块，import命令无法取代require的动态加载功能。
```js
// require到底加载哪一个模块，只有运行时才知道。
const path = './' + fileName;
const myModual = require(path);
```
- 提案，建议引入import()函数，完成动态加载。
  - 返回一个 Promise 对象。
  - import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
- 适用场合
  - 按需加载。
  - 条件加载
  - 动态的模块路径

## Module的加载实现
### 浏览器加载
- 传统方法
  - `<script>`标签打开`defer`或`async`属性，脚本就会异步加载。(渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。)
  :::warning defer和async区别
  defer是“渲染完再执行”，能保证加载顺序，async是“下载完就执行”，无法保证加载顺序。
  :::
  ```js
  <script src="path/to/myModule.js" defer></script>
  <script src="path/to/myModule.js" async></script>
  ```

- ES6模块加载规则
  - 使用`<script>`标签，加入`type="module"`属性
    - 对于`type="module"`的默认（defer）异步加载
    
    ```js
    <script type="module" src="./foo.js"></script>
    ```
  - 内嵌脚本
  ```js
  <script type="module">
    import utils from "./utils.js";
    // other code
  </script>
  ```

### ES6 模块与 CommonJS 模块的差异
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

### Node加载
- 概述
  - 





### es5中的类
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