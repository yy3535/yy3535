# JS高级
[[toc]]

## 实现call和applay
```js
// call.js
// 特点：1. 改变当前函数的this指向
// 2. 让当前函数执行
function fn1(){
  console.log(1);
}
funtion fn2(){
  console.log(2)
}

Function.prototype.call=function(context){
  context=context?Object(context):window;
  context.fn=this;
  let args=[];
  for(let i=1;i<arguments.length;i++){
    args.push('arguments['+i+']');
  }
  let r=eval('context.fn('+args+')');
  delete context.fn;
  return r;
}
fn1.call('hello','1','2');
// 如果多个call会让call方法执行，并把call中的this改变成指定的
fn1.call.call.call('hello','1','2');

```

```js
Function.prototype.apply=function(context,args){
  context=context?Object(context):window;
  context.fn=this;
  if(!args){
    return context.fn();
  }
  let r=eval('context.fn('+args+')');
  delete context.fn;
  return r;
}
fn1.apply('hello',[1,2,3,4])
```

## 模拟new的实现
```js
function new2(...rest){
    let obj = {};
    let [context,...args] = rest;
    obj._proto_ = Object.create(context.prototype);
    let result = context.apply(obj,args);
    return typeof result =="object" ? result : obj
}

function d(age){
    this.age = age;
    return {age:this.age,name:"111"}
}
var c = new2(d,16);
c 
//{age: 16, name: "111"}
```

## bind的实现原理
```js
let obj={
  name:'jw'
}
function fn(name,age){
  console.log(this.name+'养了一只'+name+age+'岁了')
}
// 1. bind方法可以绑定this指向
// 2. bind方法返回一个绑定后的函数（原理：高阶函数）
Function.prototype.bind=function(context){
  let that=this;
  let bindArgs=Array.prototype.slice.call(arguments,1)//['猫']
  function Fn(){}// Object.create原理
  function fBound(){
    let args=Array.prototype.slice.call(arguments)
    // 实现第四个功能
    return that.apply(this instanceof fBound?this:context,bindArgs.concat(args));
  }
  Fn.prototype=this.prototype;
  fBound.prototype=new Fn();
  return fBound
}


fn.prototype.flag='哺乳类';
// 3. 参数可以分两批传
let bindFn=fn.bind(obj,'猫');
bindFn(9);
// 4. 如果绑定的函数被new了 当前函数的this就是当前的实例
let instance=new bindFn(9)
console.log(instance.flag)//哺乳类
```

## 0.1+0.2!==0.3
- 计算机里面，所有的变量都是转成二进制存储的，运算时也是先转成二进制再进行运算
- 0.1是十进制，要转换成二进制
- 整数和小数如何转换成二进制？
  - 11=>(1*2^1+1*2^0)3  
  - 1010=>10(0*2^0+1*2^1+0*2^2+1*2^3)
  - 11.0101=>(1*2^1+1*2^0+0*2^-1+1*2^-2+0*2^-3+1*2^-4)
  - 0.1=>(0*2^0+1*2^-1)0.5
  - 整数位：2^(n-1)
  - 小数位：把当前的不停地乘2取整

```js
0.1 转化为2进制 0.00011
0.1*2=0.2 无整数
0.2*2=0.4 无整数
0.4*2=0.8 无整数
0.8*2=1.6 余0.6
0.6*2=1.2 余0.2
..无穷尽
console.log(0.1.toString(2)); // 双精度浮点数，会截取部分，四舍五入，会比之前大一点。
// 0.00011001100110011001100110011
console.log(0.2.toString(2)); // 同样比之前大一点
```

## ==和===区别，什么情况用==？
- 双等会先类型转换，再比较
- 类型转化的规则

### 类型转换规则
- if()/! 转换成布尔类型
  - false:undefined/null/''/0/NaN
- 运算类型转换 +(字符串拼接的含义) - * /
  - +如果有一个是字符串那就转成字符串
    
  - 其它情况都转成数字，如果有一个是NaN，那结果为NaN
    - 数字和非字符串相加
      ```js
      console.log(1+true)//2
      console.log(1+null)//1
      console.log(1+undefined)//NaN
      console.log(1+{})//1[object object]
      ```
      - 非数字相加
      ```js
      console.log(true+{})//true[object object]
      ```
      :::tip
      ```js
      // 对象中有两个方法 valueOf() toString()
      let obj={
        [Symbol.toPrimitive](){
          return 500
        },
        valueOf(){
          return {}// 是原始数据类型，就返回结果
        },
        toString(){
          return 200
        }
      }
      console.log(true+obj);//从上往下依次调用
      ```
      :::
      - +/-号单符号可以转换成number类型
      ```js
      console.log(1+ +'123')//123
      ```
- 比较运算（> = <）
  - ><
  ```js
  // 字符串比较：转换成asicall码
  console.log('a'<'b')// true
  // 数字和字符串比较：如果可以转成数字，那就转成数字，不能转换数字:false
  console.log(1<'123')// true
  console.log(1<'aaa')// false
  ```
  - ==
  ```js
  // null==等于undefined
  console.log(null==undefined);// true
  // null和undefined与其他类型比较，返回false
  console.log(null == 0)
  // 引用类型和引用类型比较，返回false
  console.log({}=={})// false
  // NaN 和任何类型比较都不相等，包括它自己
  console.log(NaN===1)// false
  // 字符串和数字比较：字符串转成数字
  console.log('1'===1)// true
  // 布尔类型，布尔转成数字
  console.log(1==true)// true
  // 对象和字符串、数字、symbol比较的时候，会把对象转换成原始数据类型
  console.log({}==='[object object]')
  console.log([]==![])// true 单目运算优先级别最高 
  // []==false  
  // []==0 //[].valueOf()
  // []==0 //[].toString() ''
  // ''==0 Number('');
  // 0==0
  // 相等
  ```

## 深拷贝与浅拷贝的区别？如何实现？
- 深拷贝：拷贝后的结果更改是不会影响拷贝前的，拷贝前后是没有关系的
- 浅拷贝：拷贝前和拷贝后是有关系的
```js
// 引用关系
// ...运算符只能深拷贝一层（一层之后都是浅拷贝）
let obj={name:'jw',address:{x:100,y:100}};
let o={...obj}
obj.name='hello'
console.log(obj===o)

// 深拷贝
// 1. JSON.parse/stringify
// 缺点：不能包含函数，undefined，拷贝后函数undefined都会丢了。不能实现复杂的拷贝
let obj={name:'jw',address:{x:100,y:100}};
let o=JSON.parse(JSON.stringify(obj));

// 2. 递归拷贝
// 
function deepClone(obj,hash=new WeakMap()){
  if(obj==null) return obj;// 如果是null或者undefined，就不进行拷贝操作
  if(obj instanceof Date) return new Date(obj);
  if(obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通值，如果是函数，不需要深拷贝
  if(typeof obj!=='object') return obj;
  // 是对象的话要进行深拷贝:
  // 解决问题：如果有循环引用的时候，递归会内存溢出
  if(hash.get(obj)) return hash.get(obj);
  // []{} Object.prototype.toString.call(obj)==[object Array]?[]:{}
  let cloneObj=new obj.constructor;
  hash.set(obj,cloneObj);
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      // 实现一个递归拷贝，保证是对象类型的话继续拷贝
      cloneObj[key]=deepClone(obj[key],hash);
    }
  }
  return cloneObj
}
let obj=null;
deepClone(obj)

// 
```

## 原型链
- 特殊的情况
```js
// 特殊的Function Object(既可以充当对象 也可以充当函数)
// 所以既有__proto__ 也有prototype
console.log(Function.__proto__===Function.prototype)
console.log(Object.__proto__===Function.prototype)
console.log(Object.__proto__===Function.__proto__)
```
- `hasOwnProperty`和`key in obj`
  - in 关键字 会判断这个属性是否属于原型 或者 实例上的属性
  - hasOwnProperty 只会看是否存在当前的实例上
  ```js
  function Animal(){
    // this.a=1;
  }
  Animal.prototype.a=2;
  let animal=new Animal();
  console.log(animal.hasOwnProperty(a));// false（自己身上）
  console.log('a' in animal);// true（不管在原型链还是自己身上）
  ```

## 9种常见跨域手段
### 为什么浏览器不支持跨域
- cookie LocalStorage
- DOM元素也有同源策略 iframe
- ajax也不支持跨域

### 为什么要实现跨域
- 前端放在一个地址，后端放在另一个地址
- 就想通信

### 跨域方式
- jsonp
  - 只能发送get请求 不支持post put delete
  - 不安全 xss攻击  不采用
```html
<script>
  function jsonp({url,params,cb}) {
    return new Promise((resolve,reject)=>{
      let script = document.createElement('script');
      window[cb] = function (data) {
        resolve(data);
        document.body.removeChild(script);
      }
      params = {...params,cb} // wd=b&cb=show
      let arrs = [];
      for(let key in params){
        arrs.push(`${key}=${params[key]}`);
      }
      script.src = `${url}?${arrs.join('&')}`;
      document.body.appendChild(script);
    });
  }

  jsonp({
    url: 'http://localhost:3000/say',
    params:{wd:'我爱你'},
    cb:'show'
  }).then(data=>{
    console.log(data);
  });
</script>
```
```js
// server.js
let express = require('express');
let app = express();

app.get('/say',function (req,res) {
  let {wd,cb} = req.query;
  console.log(wd); 
  res.end(`${cb}('我不爱你')`) 
})
app.listen(3000);
```
- cors
  - 最常用的方式，安全性高
  - 主要是服务器验证，设置返回头
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script>
    let xhr = new XMLHttpRequest;
    document.cookie = 'name=zfpx';
    // 跨域强制允许cookie---1
    xhr.withCredentials = true;
    xhr.open('GET','http://localhost:4000/getData',true);
    xhr.open('PUT','http://localhost:4000/getData',true);
    // 设置请求头
    xhr.setRequestHeader('name','zfpx');
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4){
        if(xhr.status>=200 && xhr.status < 300 || xhr.status ===304){
          console.log(xhr.response);
          // 跨域默认拒绝获取服务端给的返回头，要跨域设置支持设置返回头的名称
          console.log(xhr.getResponseHeader('name'));
        }
      }
    }
    xhr.send();
  </script>
</body>
</html>
```
```js
// server1.js
let express = require('express');
let app = express();
// 以当前目录作为静态目录
app.use(express.static(__dirname));
app.listen(3000);
```
```js
// server2.js
let express = require('express');
let app = express();
let whitList = ['http://localhost:3000']
app.use(function (req,res,next) {
  let origin = req.headers.origin;
  if(whitList.includes(origin)){
    // 跨域允许哪个源可以访问
    res.setHeader('Access-Control-Allow-Origin', origin);
    // 跨域允许携带哪个头访问
    res.setHeader('Access-Control-Allow-Headers','name,a,a');
    // 跨域允许哪个方法访问(get,post默认支持，其他复杂方法需要配置)
    res.setHeader('Access-Control-Allow-Methods','PUT');
    // 复杂请求方法会先发送一个试探的OPTIONS请求，成功后再发送该复杂请求
    if(req.method === 'OPTIONS'){
      res.end(); // OPTIONS请求不做任何处理
    }
    // 跨域预检的存活时间
    res.setHeader('Access-Control-Max-Age',6);
    // 跨域强制允许cookie---2
    res.setHeader('Access-Control-Allow-Credentials', true);
    // 跨域允许返回的头
    res.setHeader('Access-Control-Expose-Headers', 'name');
  }
  next();
});
app.put('/getData', function (req, res) {
  console.log(req.headers);
  res.setHeader('name','jw');
  res.end("我不爱你")
})
app.get('/getData',function (req,res) {
  console.log(req.headers);// origin:https://localhost:3000
  res.end("我不爱你")
})
app.use(express.static(__dirname));
app.listen(4000);
```
- postMessage
  - 常用的
  - window.postMessage()
    - 内容
    - 目标域
  - window.onmessage()
    - e 事件源
      - data 发送的内容
      - source 来源的window 
      - origin 来源域
```html
<!-- a.html -->
<body>
  <iframe src="http://localhost:4000/b.html" frameborder="0" id="frame" onload="load()"></iframe>
  <script>
    function load() {
      let frame = document.getElementById('frame');
      // 发送 参数：内容，给哪个域发的(src的域名复制过来)
      frame.contentWindow.postMessage('我爱你','http://localhost:4000');
      window.onmessage = function (e) {
        console.log(e.data);
      }
    }
  </script>
</body>
```
```html
<!-- b.html -->
<script>
  // 监听
  window.onmessage = function (e) {
    console.log(e.data);
    e.source.postMessage('我不爱你',e.origin)
  }
</script>
```
```js
// a.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(3000);
```
```js
// b.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(4000);
```
- window.name
```html
<!-- a.html -->
<body>
  a和b是同域的 http://localhost:3000
  c是独立的  http://localhost:4000
  a获取c的数据
  c把值放到window.name a先引用c 然后把a引用的地址改到b
  <iframe src="http://localhost:4000/c.html" frameborder="0" onload="load()" id="iframe"></iframe>
  <script>
    let first = true
    function load() {
      if(first){
        let iframe = document.getElementById('iframe');
        iframe.src = 'http://localhost:3000/b.html';
        first = false;
      }else{
        // 同域的情况可以拿name
        console.log(iframe.contentWindow.name);
      }
    }
  </script>
</body>
```
```html
<!-- b.html -->
<body></body>
```
```html
<!-- c.html -->
<body>
  <script>
    window.name = '我不爱你'  
  </script>
</body>
```
```js
// a.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(3000);
```
```js
// b.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(4000);
```
- location.hash
```html
<!-- a.html -->
<body>
  <!-- 路径后面的hash值可以用来通信  -->
  <!-- 目的a想访问c -->
  <!-- 利用a和b同域 -->
  <!-- a给c传一个hash值 c收到hash值后  c把hash值传递给b b将结果放到a的hash值中-->
  <iframe src="http://localhost:4000/c.html#iloveyou"></iframe>
  <script>
    window.onhashchange = function () {
      console.log(location.hash);
    }
  </script>
</body>
```
```html
<!-- b.html -->
<body>
  <script>
    window.parent.parent.location.hash = location.hash  
  </script>
</body>
```
```html
<!-- c.html -->
<body>
  <script>
    console.log(location.hash);
    let iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:3000/b.html#idontloveyou';
    document.body.appendChild(iframe);
  </script>
</body>
```
```js
// a.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(3000);
```
```js
// b.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(4000);
```
- document.domain 
  - 页面和嵌入iframe页面都设置document.domain为同一值，就可以通过iframe.contentWindow访问嵌入页面的值。
  - 用的较多
```
// hosts
127.0.0.1 a.zf1.cn
127.0.0.1 b.zf1.cn
```
```html
<!-- a.html -->
<body>
  <!-- 域名 一级域名二级域名 -->
  <!-- www.baidu.com -->
  <!-- video.baidu.com -->
  <!-- a是通过 http://a.zf1.cn:3000/a.html -->
  helloa
  <iframe src="http://b.zf1.cn:3000/b.html" frameborder="0" onload="load()" id="frame"></iframe>
  <script>
    document.domain = 'zf1.cn'
    function load() {
      console.log(frame.contentWindow.a);
    }
  </script>

</body>
```
```html
<body>
   hellob
   <script>
      document.domain = 'zf1.cn'
     var a = 100;
   </script>
</body>
```
```js
// a.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(3000);
```
```js
// b.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(4000);
```
- websocket
  - 无跨域限制
  - WebSocket是高级api，ws node, 不兼容一些浏览器，所以一般使用socket.io这个库来保证兼容性
```js
// server.js
let express = require('express');
let app = express();
let WebSocket = require('ws');
let wss = new WebSocket.Server({port:3000});
wss.on('connection',function(ws) {
  ws.on('message', function (data) {
    console.log(data);
    ws.send('我不爱你')
  });
})
```
```html
<!-- socket.html -->
<body>
  <script>
    let socket = new WebSocket('ws://localhost:3000');
    socket.onopen = function () {
      socket.send('我爱你');
    }
    socket.onmessage = function (e) {
      console.log(e.data);
    }
  </script>
</body>
```
- http-proxy

- nginx
  - 官网下载nginx安装包，exe文件打开后即可启动服务，localhost可访问页面。文件夹中的nginx.conf文件打开后修改配置
  - 配置修改后，exe当前目录下打开命令行。`nginx -s reload`重启服务。
  - 配置文件直接配置跨域头即可
```html
<body>
  <script>
    let xhr = new XMLHttpRequest;
    xhr.open('get','http://localhost/a.json',true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4){
        if(xhr.status>=200 && xhr.status < 300 || xhr.status ===304){
          console.log(xhr.response);
          console.log(xhr.getResponseHeader('name'));
        }
      }
    }
    xhr.send();
  </script>
</body>
```
```js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(3000);
```
```js
// nginx.conf
location / {
  root html;
  index index.html index.htm;
}
location ~.*\.json {
  root json;
  // 添加跨域头
  add_header "Access-Control-Allow-Origin" "*";
}
```
## CSRF
- 第三方网站拿不到用户cookie, 但当往3000端口提交请求时，浏览器会自动把3000端口的cookie带着去请求。表单是没有跨域问题的，3001提交到3000是可以的。
```html
<!-- fish.html -->
<body>
  <iframe src="bad.html" />
</body>
```
```html
<!-- bad.html -->
<body>
  <form name="myform" action="http://localhost:3000/api/transfer">
    <input type="text" name="target" value="jw">
    <input type="text" name="money" value="100">
  </form>
  <script>
    document.myform.submit()
  </script>
</body>
```
### 预防
1. 添加验证码
  - 伪造的请求拿不到验证码
  ```js
  // express生成验证码 svg-captcha
  let svgCaptcha=require('svg-captcha');
  ```
2. 判断来源
  - 3001访问的3000 referer判断
3. token