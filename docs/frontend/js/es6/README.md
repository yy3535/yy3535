# ES6

[[toc]]

## let和const
### 优点

1. 没有变量提升问题

2. 不能重复声明

3. 不会污染全局作用域(let a; window.a//null)

4. 有作用域

   > 以前需要让变量有作用域，需要用函数把变量包起来：
   >
   > ```
   > (function(){
   > 	var a=1 
   > })()
   > ```
   >
   > 现在{}和let配合可产生作用域
   >
   > ```
   > {
   > 	let a=1
   > }
   > ```

5. 变量会绑定作用域内的let，不受外部影响(块级作用域开始的地方到let声明之前称作**暂存死区**，会出现not defined错误)

   ```
   let a=2
   {
   	console.log(a)//not defined
   	let a=1
   }
   console.log(a)
   ```

   ```
   for(let i=0;i<100;i++){
     setTimeout(()=>{
       console.log(i);
     },1)
   }
   ```

   ### const特殊地方

   常量，不能更改值得引用地址，会报错

   所以可这样更改：

   ```
   const a={a:1}
   a.a=100//正确
   ```

   ### 哪些地方用const

   ```
   const fs=require('fs');
   fs.xxx
   ```

   

   ## 解构赋值(deconstruction)

   - 结构相同的内容，可直接拿出来

   - 可赋予默认值

     ```
     Promise.all([1,2,3,4]).then(function([,,a,,b='hello']){
       console.log(a,b)//3 'hello'
     })
     let [,,a,,b='hello']=[1,2,3,4];
     ```

   - 对象的解构，=号是赋予默认值，:是起别名

     ```
     let {length}=[1,2,3,4];
     console.log(length);//4
     ```

     ```
     let {length}={length:3};//length:3
     let {length:Len}={length:3}//Len:3
     ```

     

   ## 扩展运算符…

   ### 用处

   1. #####对象的展开(es7)
   2. 拷贝对象

   ```
   let obj={name:'zfpx',age:9};
   let school={...obj}//...的作用就是删掉外面的{}
   console.log(school===obj)//不相等，因为是另辟了一个空间
   ```

   1. 合并对象

      ```
      let school={...obj,...obj1};
      ```

   - $.extend：深拷贝

   - 扩展运算符(…)：浅拷贝，对象的对象引用地址还是同一个

   - Object.assign(es6)：浅拷贝 

     ```
     let o=Object.assign(obj.obj1)
     或者
     let o={}
     let o=Object.assign(o,obj,obj1)
     ```

   > ```
   > //如何实现深拷贝----递归拷贝
   > let obj={a:b:{abc:abc}}
   > function deepClone(obj){
   > if(obj===null) return null;
   > if(typeof obj!='object') return obj;
   > if(obj instanceof RegExp) return new RegExp(obj);
   > if(obj instanceof Date) return new Date(obj);
   > let newObj=new obj.constructor;
   > for(let key in obj){
   > newObj[key]=deepClone(obj[key]);
   > }
   > return newObj
   > }
   > let newReg=deepClone(obj);
   > console.log(newReg);
   > ```

   1. #####数组的展开(es6)

   ```
   console.log([...arr1,...arr2])//原理：es6转es5,concat(arr1,arr2)
   Math.max.apply(Math,arr1)//以前展开数组方法
   console.log(Math.max(...arr1));//现在展开数组方法
   ```

   1. ##### 剩余运算符

      只能放在函数的最后一个参数，sum(b,…arg)

      ```
      function sum(...arg){//使用剩余运算符作为参数接收，并且只能放在最后一项
        //return eval(arguments.join('+'));类数组没有join方法
        return eval([...arguments].join('+'));//类数组可迭代，所以可以用这个运算符
      }
      let r=sum(1,2,3,4,5);
      console.log(r)
      ```

      

   ## Object.defineProperty(定义属性)

   1.这种方式定义无法看到但是可以取到属性

   2.这种方式定义的属性不可更改

   3.这种方式定义的属性不可删除

   4.value可改成get,set，捕获事件

   ```
   let obj={}
   let temp=3.15;
   Object.defineProperty(obj,'name',{
   	//原理:
   	//enumerable:false,如果改成true就可看见。
   	//writable:false，改成true就可以改写
   	//configurable:false，改成true就可被删除
     //value:123===>可改成get和set，且使用get，set是不能有value和writable的
   	get(){
       console.log('哈哈')
       return temp
   	},
   	set(val){
       console.log('呵呵');
       temp=val;
   	}
   })
   console.log(obj)//{}
   console.log(obj.name)//123
   
   get第二种写法
   
   let obj={
   	temp:'',
     get PI(){
       return this.temp
     },
     set PI(val){
       this.temp=val;
     }
   }
   console.log(obj.PI)
   obj.PI=100;
   ```

   ### 使用

   - class的实现
   - vue的MVVM
   - mobx
   - 装饰器
   - koa

   

   //作业：

   写promise es6版本的 传到github

   

   ### vue双向绑定实现原理

   ```
   //老的原理
   let obj={name:'zfpx',age:9};
   function update(){
     console.log('数据更新了')
   }
   function observer(obj){
     if(typeof obj!=='object'){
       return obj;//普通值不需要观察
     }
     for(let key in obj){
       defineReactive(obj,key,obj[key]);
     }
   }
   //把对象中的所有属性都采用Object.defineProperty方式来定义
   function defineReactive(obj,key,value){
   observer(value);//递归确认值是否是对象
     Object.defineProperty(obj,key,{
       get(){
         return value;
       },
       set(val){
         update();
         if(value!=val) value=val
       }
     })
   }
   observer(obj);
   obj.name=100;
   console.log(obj.name)
   obj.name.name='zfpx1';
   
   //现在的原理：proxy 代理 es6语法 mobx observer
   好处：
   - Object.defineProperty不支持数组，而proxy可监控到数组的变化
   - 不存在的属性添加时依然可以监控
   坏处：
   - 兼容性不好，Object.defineProperty是es5语法
   //let arr=[1,2,3]
   let obj={}
   let p=new Proxy(obj,{
     get(target,key,proxy){//第三个参数一般不用，调用了会陷入死循环
       return Reflect.get(target,key);//第二种写法
       //第一种写法：return target[key]
     },
     set(target,key,value){
     	if(key==='length') return true;
       return Reflect.set(target,key,value);
     }
   })
   //p.push(4);
   p.name='hello';
   
   ```

   

   ## class类

   ### es5中的类

   原生的构造函数

   类必须要大写

   es5中可以当做函数来调用，es6中类只能new

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

   只能new

   ```
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

   如何用es5实现es6Class类

   ```
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

   ### babel

   转换es6成es5

   可在命令行中直接转换

   1. 安装babel

   ```
   npm install @babel/cli @babel/core//babel核心和babelcli
   npm add @babel/preset-env//babel插件1
   npm add @babel/plugin-proposal-class-properties//babel插件2
   npm add @babel/plugin-proposal-decorators//babel插件3
   
   ```

   1. 新建一个.babelrc文件，运行时会按这个文件的方式来解析

      ```
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

   2. 解析

      ```
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

### 装饰器

      @符号表示是装饰器，他可以修饰类 类中的属性和方法

      ```
      function sweetCoffee(coffee){
        coffee();
        console.log('加糖')
      }
      function coffee(){
        console.log('一杯苦coffee')
      }
      sweetCoffee(coffee)
      
      ```

      

   

## 箭头函数

没有this指向 没有arguments

一个参数可以省略圆括号

可以省略return和{}，如果返回的是一个对象，要用小括号包裹起来



## Symbol

js的数据类型：number string boolean null undefined  object

Symbol是第七种，一般用作常量

```
console.log(typeof Symbol());//symbol
console.log(Symbol()===Symbol());//false
console.log(Symbol('a')===Symbol('a'));//false
const a1=Symbol.for('a');//声明一个Symbol
console.log(Symbol.keyFor(a1))//a ,取值

```

特点：每次拿到的都不一样

## map set 集合

### set

放的东西不能重复(数组可重复)，可以被迭代

```
//数组去重
let arr=[1,2,3,3,2,1]
console.log(new Set(arr));

```

#### 常见面试题

```
//并集
let arr1=[1,2,3,3,2,1];
let arr2=[4,5,6];
let s=[...new Set([...arr1,arr2])];//Symbol.iterator
console.log(s)//1,2,3,4,5,6

```

```
//交集
let s1=new Set(arr1);
let s2=new Set(arr2);
let r=[...s1].filter(item=>{//如果返回true表示留下
  return s2.has(item);
})
console.log(r);

```

```
//差集
let r=[...s1].filter(item=>{//如果返回true表示留下
  return !s2.has(item);
})
console.log(r);

```

### Set的方法

```
let s=new Set([1,2,3]);
s.add(5);
s.clear();
s.delete(2);

```

### map

一样，不能放重复的数据

```
let map=new Map();
map.set('js',['nodejs'])
map.set('js',['js1'])//覆盖
console.log(map);
map.forEach((item,key)=>{
  console.log(item,key)
})

```

## 字符串符号``

可自动支持换行，用${}显示变量值

```
//拼接字符串
let name='zfpx';
let age=10;
let val=`${name}今年${age}岁了
你好
`
console.log(val)

```
