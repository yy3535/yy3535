# ES6

[[toc]]

## let和const
- let
  - 没有变量提升问题
  - 不能重复声明
  - 不会污染全局作用域(let a; window.a//null)
  - 有作用域
    - 以前需要让变量有作用域，需要用函数把变量包起来：
    ```js
    (function(){
    	var a=1 
    })()
    ```
    现在{}和let配合可产生作用域
    ```js
    {
    	let a=1
    }
    ```
    - 变量会绑定作用域内的let，不受外部影响(块级作用域开始的地方到let声明之前称作`暂存死区`，会出现not defined错误)
    ```js
    let a=2
    {
      console.log(a)//not defined
      let a=1
    }
    console.log(a)
    ```
    ```js
    for(let i=0;i<100;i++){
      setTimeout(()=>{
        console.log(i);
      },1)
    }
    ```
- const
   - 基本和let一样，但它是常量(更改值会报错)
   ```js
   // 只能这样更改
   const a={a:1}
   a.a=100//正确
   ```
   - 用处(模块引用等不需要更改的地方)
   ```js
   const fs=require('fs');
   fs.xxx
   ```
## 解构赋值(deconstruction)
- 结构相同的内容，可直接拿出来
- 可赋予默认值
  ```js
  let [,,a,,b='hello']=[1,2,3,4];
  ```
- 对象的解构，=号是赋予默认值，:是起别名
 ```js
 let {length}=[1,2,3,4];
 console.log(length);//4
 ```
 ```js
 let {length}={length:3};//length:3
 let {length:Len}={length:3}//Len:3
 ```
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
## 箭头函数
- 没有this指向(this和定义有关，和谁调用无关) 没有arguments
- 一个参数可以省略圆括号
- 可以省略return和{}，如果返回的是一个对象，要用小括号包裹起来

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
## 模板字符串``
```js
//拼接字符串
let name='zfpx';
let age=10;
let val=`${name}今年${age}岁了
你好
`
console.log(val)
```
- 用`（反引号）标识，用${}将变量括起来。可自动支持换行，用${}显示变量值
- 如果使用模版字符串表示多行字符串，所有的空格和缩进都会被保存在输出中
- 可以放入任意的JavaScript表达式，还可以进行运算
- 模版字符串还可以调用函数
- 引用模版字符串本身
```js
let str="return"+"`Hello! ${name}`";
let func=new Function("name",str);
console.log(func("zzw"));
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
```