# node
[[toc]]

## 事件环(event loop) 

浏览器中，先调用主栈，主栈执行完成后，微任务放入微任务队列，宏任务放入宏任务队列（按执行顺序放入，setTimeout到时间了再放），执行完微任务，再取出宏任务队列中第一个执行，执行完后再次执行完微任务，再取第二个。

————— 环

![eventloop](/img/事件环.png)

- heap:堆，对象引用函数地址放在堆里

- stack:栈，代码执行放在栈里，后进先出

```js
//销毁顺序
function a(){
  console.log(1);
  b()
  function b(){
    console.log(2);
    c()
    function c(){
      console.log(3);
    }
  }
}
a()
```

- queue:队列，先进先出<—— xxx <—— 

```js
[1,2,3].shift();
[1,2,3].pop();
```

- 线程
  - 线程里包含着进程。

- 进程
  - 计算机分配调度任务的最小单位。

- js是单线程，也可以说是多线程(异步)

- then方法会比setTimeout等异步的等级更高一些，微任务会优先执行

**宏任务**： `setTimeout` `setImmediate` `ie下使用 MessageChannel`

**微任务**： `promise.then方法` `MutationObserver` `nextTick`

```js
//定时器(只有ie支持，宏任务)
setImmediate(function(){})

//管道(宏任务)
let channel=new MessageChannel()
let port1=channel.port1;
let port2=channel.port2;
port1.postMessage('hello');
port2.onmessage=function(e){
  console.log(e.data)//hello
}
```
```js
// 微任务
let observer=new MutationObserver(function(){
  console.log('当前节点 已经更新完')
})
observer.observe(app,{
  childList:true
});
for(let i=0;i<10;i++){
  app.appendChild(document.createElement('p'));
}
```

## Node概况
### 定义
  - node并不是JavaScript全集(es+dom+bom)，只是ecmascript+模块(服务端必备的方法)
### 单线程
- **webworker并不能改变单线程的本质**
- 多线程单线程
  - 多线程，锁的问题(多个线程修改同一个文件，需要先锁住文件，避免其他线程修改)
  - 多线程，看上去像同时做两件事，但其实只是这个干一点，那个干一点，再这个干一点。切换执行上下文是浪费时间的
  - i/o密集型业务适合node，node单线程，并且通过事件驱动，完成后自动返回。不像别的是不断地要去询问，完成了吗
  ![屏幕快照 2019-04-06 21.46.45](/img/多线程单线程.png)
```js
//1.js
//webworker,有任务，去通知别人做，主线程接着运算
//不能操作dom
onmessage=function(e){
  let sum=0;
  for(let i=0;i<e.data;i++){
    sum+=i;
  }
  postMessage(sum);
}
//1.html
let worker=new Worker('./1.js');
worker.postMessage(10000);
worker.onmessage=function(e){
  console.log(e.data);
}
console.log('haha')//
```
### 浏览器模型
- 我们的代码通过渲染引擎渲染，渲染引擎分为网络引擎，js引擎和css引擎，他们都是不能同时渲染的。都是一个线程。
![browser](/img/browser.jpg)
### node的Event Loop
- node里没有渲染引擎，只有node系统，功能就是让用户能实现异步。
- 模块里的异步其实是通过模拟多线程实现的。
![nodesystem](/img/nodesystem.png)
### Node作用
- 可用js编写服务端
- 提高用户并发量，比传统的Java和Php高(java多线程)   
### Node优点：
- 基于v8引擎，执行效率高，不高的地方用c写，c++模块扩展
- 使用事件驱动，非阻塞式I/O模型
- npm包管理器，是全球最大的开源库生态系统
### Node缺点：
- 脆，主线程挂了，就完蛋了
### 什么场合用Node框架
- 不适合处理cpu密集的
  - 聊天服务器(websocket)
  - 电子商务网站(静态服务，io读取)
## Node安装
- 本地：下载安装包直接安装，node -v npm -v(送包管理器)
- 版本切换：mac nvm工具 win下 nvm-win
## Node基础
### 一些概念
- 在浏览器中默认`this`指代`window`，在浏览器中`window`是代理了`global`属性，而文件中运行这个`this`不是`global`
```js
//node.js
console.log(this);
//{}
console.log(global)
// Object[global]{
//   ...
//   global:[Circular],
//   //进程
//   process:
//   	process {
      
//     },
//   //操作文件，需要二进制类型，就是Buffer,可以和字符串进行转换
//   Buffer:
//   clearImmediate setImmediate
//   setTimeout clearTimeout
//   ...
// }

//把对象展示成详细的
console.dir(Object.keys(global))
```
- REPL read evaluate print loop 循环求值打印
```js
//进入node环境
node
//打印出global的内容
console.log(this)
```
### 全局的属性

- console
```js
//1 标准输出
console.log('log')
console.log('info') 
process.stdout.write('呵呵')
//2 错误输出
console.warn('warn')
console.error('error')
process.stderr.write('错误')
// 监控输出类型
process.stdin.on('data',function(data){
  console.log(data.toString())//0 表示标准输入
})
```
- process

  - process.pid//进程id

  - process.exit()//手动退出应用

  - process.cwd()//current working directory 当前工作目录

  - process.chdir('6.node')//改变当前工作目录

  - process.nextTick(()=>{//是node中唯一一个微任务
  ​	console.log('nextTick');
  })

  - process 环境变量 env 参数 argv：webpack definePlugin原理就是通过这个实现

  ```js
  //yargs把执行命令的时候传递参数解析成对象，可以自己手动将其变成对象
  let args=process.argv.slice(2);
  args=args.reduce((total,value,currentIndex,arr)=>{
    if(value.includes('-')){
      total[value.slice(1)]=arr[currentIndex+1];
    }
    return total;
  },{});
  console.log(args.p)
  ```
### node事件环
- node中有如下六个队列，依次执行。
- 每次都把队列清空后，或者达到执行的最大限制切换到下一个队列中会再执行微任务
![node事件环](/img/node事件环.png)
```js
// 面试题
let fs=require('fs');
//poll阶段下一个阶段是check,所以执行的话一定是走的setImmidaite
fs.readFile('note.md','utf-8',function(){
  setTimeout(function(){
    console.log('timeout')
  },0);
  setImmediate(function(){
    console.log('setImmediate2')
  })
})
```
## Node Module
### 模块化作用
- 解决协同开发问题，避免全局变量，防止重名。
### node模块化类型
- common.js
- 模块化所有类型
  - cmd:如sea.js
  - amd:如require.js
### 定义模块 
- node中一个文件就是一个模块
### 引用模块 
- require静态导入，
::: warning 注意：
- esmodule（es6模块）,使用import动态导入
- node靠静态文件读取
:::

### 导出模块 
- module.exports
```js
//1.js
module.export="zfpx"
```
```js
//2.module.js
//读取文件(会默认添加后缀名.js，找不到再.json，找不到再.node)
let str=require('./1.js')
let r=require('./user')
//内置模块
```
### 模块化原理--闭包
- seajs、requirejs都是闭包，node也是为了模块化，所以在每个文件外面套了个闭包，这个函数把文件中的`this`指向更改为`module.exports`
```js
(function (exports,require,module,__filename,__dirname){
  module.exports='zfpx';
  //隐藏了这句
  return module.exports
})
let fn=`(function a(){let b=1;console.log(b)})()`;
//内置模块 沙箱
let vm=require('vm');
vm.runInThisContext(fn);
```

### require原理(加载js如何实现)
- 拿到用户传入的路径将路径解析成绝对路径，创建一个模块，根据路径加载对应的方法，如果是json把读取的结果放到模块的exports对象上，req方法最后返回这个exports对象
```js
//核心模块 不需要./操作
let path=require('path');
let fs=require('fs');
let vm=require('vm');
function Module(id){
  this.id=id;
  this.exports={};//导出对象
}
let obj={
  '.js'(module){
    let content=fs.readFileSync(module.id,'utf8');
    let moduleWrap=['(function(exports,module,require,__filename,__dirname){','})'];
    //给字符串添加了一个函数
    let script=moduleWrap[0]+content+moduleWrap[1];
    vm.runInThisContext(script).call(module.exports,module.exports,module,req);
  },
  '.json'(module){//处理json的模块
    module.exports=JSON.parse(fs.readFileSync(module.id,'utf8'))
  }
}
function req(moduleId){
	//拿到绝对路径
  let absPath=path.resolve(__dirname,moduleId);
  //创建模块
  let module=new Module(absPath);
  //根据后缀名进行加载
  let ext=path.extname(absPath);
  //加载json 加载完后expots会赋予最终的结果，并把结果返回
  obj[ext](module);
  return module.exports;
}
let user=req('./user.json');
console.log(user);
let user=req('./user.js');
console.log(user);
```
::: tip 面试题
module和exports什么关系？
- exports是module.exports的别名
:::
### module.exports的两种写法
- module.exports=xxx
- export.a=xxx
- global.b=xxx//引用时也是global.b//不推荐，一般不使用
exports=module.exports={}

所以不能直接赋值exports，因为返回的是module.exports，但可以赋值给exports.a属性值也会添加到module.exports身上
## node内置方法
### vm沙箱
- vm.runInThisContext(fn) 在当前沙箱中运行fn代码
### fs沙箱
- fs.accessSync(文件名) 判断文件是否可以访问的到
- Fs.readfile() 读取文件
```js
let fs=require('fs');
fs.accessSync('1.test.js')
```
### path 相对路径转绝对路径
- path.resolve(目录,文件名)在目录下找文件
- path.join(目录,文件名)拼接，与resolve唯一不同处在遇到/的时候，resolve会返回最上层目录
- path.extname('1.min.js') //取扩展名 .js
- path.basename('1.min.js','.js')//取基础名 1.min
```js
let path=require('path');
console.log(path.resolve('1.test.js'))//C:\Users\speedly\...
console.log(path.resolve(__dirname,'1.test.js'))//__dirname下的1.test.js
console.log(path.join(__dirname,'1.test.js'))//与上面一样
console.log(path.resolve('a','/'))//resolve一碰到/就会返回最上层目录	c:\
console.log(path.join('a','/'))//a/
path.basename('1.min.js','.min.js')//取基础名 1
```
### util工具方法
- util.promisify(xxx)
  - 将回调方法改成promise（util较麻烦，一般用第三方模块mz，将node模块转化成promise形式）
```js
//拿出来是个属性实例
let util=require('util');
let fs=require('fs');
let read=util.promisify(fs.readFile);
```
- Util.inherits();
  - 继承方法，构造函数，继承原型上的公有属性(原理`Object.setPrototypefOf()`)
### events 自定义事件
- node主要靠事件驱动(发布订阅模式，vue，redux都是)
```js
//绑定
girl.on
//调用
girl.emit('失恋')
//新增绑定后调用,type是当前事件名称
girl.on('newListener',function(type){})
//解除绑定
girl.removeListener/off('失恋',cry)
//默认最大绑定数
girl.defaultMaxListeners
//设置最大绑定数
girl.setMaxListener(1)
//不管绑定多少次，仅触发一次
girl.once('失恋',cry)
```
```js
//拿出来是个类
let EventEmitter=require('events');
let util=require('util');
function Girl(){
  
}
util.inherits(Girl,EventEmitter);
girl.on('newListener',function(type){
  console.log(type)
  girl.emit('失恋')
})
let cry=function(){console.log('cry')}
let eat=function(){console.log('eat')}
girl.on('失恋',cry);
girl.on('失恋',eat);
```
- events自定义事件原理
```js
function EventEmitter(){
  this._events=Object.create(null)
}
EventEmitter.prototype.prependListener=function(eventName,callback){
  this.on(eventName,callback,true);
}
EventEmitter.prototype.on=function(eventName,callback,flag){
  if(!this._events) this._events=Object.create(null);
  if(eventName!='newListener'){
    this._events[newListener].forEach((fn)=>{
      fn(eventName)
    });
  }
  if(this._events[eventName]){
  if(falg){
      this._events[eventName].unshift(callback);
  }else{
      this._events[eventName].push(callback);
  }
    
  }else{
    this._events[eventName]=[callback];
  }
}
EventEmitter.prototype.off=function(eventName,callback){
//当前函数绑定的是cry,删除的也是cry
  this._events[eventName]=this._events[eventName].filter(
  (l)=>l!=callback&&l.l!=callback)
}
EventEmitter.prototype.once=function(eventName,callback){
function one(...args){
  callback(...args)
    this.off(eventName,one)
}
one.l=callback;
  this.on(eventName,one);
}
Emitter.prototype.emit=function(eventName,...args){
  this._events[eventName].forEach(fn=>{
    fn.call(this,...args);
  })
}
module.exports=EventEmitter;
```
### fs 文件
#### 编码
- 编码概况
  - node为了能操作文件，提供了fs模块，(文件内容一般都是二进制，八进制，十六进制），node读取的结果默认为十六进制
  - 一个字节最大是255位 0xff，
  - 汉字和字母占字节数
- 看编码 
  - utf8 三个字节 1个字节
- 编码历史
  1. ASCll码，最早美国人发明，包括127位英文字母在内的各种字符，所以一个英文字母占一位。但是对汉字和其他语言无效。
  2. GB2312，其他国家把128-255改成他们的字符，中国也改成了自己的字符，规定两个大于127的字符连一起就表示一个汉字，可以组合出7998个简体汉字，把数字符号，日文假名和ASCll原来就有的数字、标点、字母重编成两个字长的编码叫做全角字符。这种方案叫GB2312，是对ASCll的中文扩展。后来因为我们也得用法语，德语等其他语言，所以不用了。
  3. GBK，因为GB2312不够用，规定只要第二个字符大于127就是汉字，增加了20000个新汉字，包括繁体字和符号。
  4. GB18030/DBCS 增加了少数名字的字。
  5. Unicode，包括了地球上所有文化，所有字母和符号的编码，现在的规模可以容纳100多万个符号。规定所有的字母和符号都是两个字节。
  6. UTF-8，是Unicode的实现方式之一，是在互联网上使用最广的一种，意思是每次以8个单位传输数据，UTF-16就是以每次16位传输数据，UTF-8一个中文字符占3个字节。(node不支持gbk)
- 编码转换(base64)
  1. 图片转base64，不会发生请求
  2. 简单的编码转换，没有加密功能，把原有体积扩大了1/3
  3. `fileReader`文件读取器，读成`base64`编码的
  ```html
  <input type="file" onchange="fn(event)" />
  <script>
    function fn(e){
      let reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=function(e){
        console.log(e.currentTarget.result)
      }
    }
  </script>
  ```

#### 进制转换
- ().toString(进制)，任意进制转换
- parseInt('1011',2) 将任何进制转成十进制
```js
//十进制转化成二进制
(11).toString(2)
```
#### Buffer

```js
let buf1=Buffer.alloc(12)
let buf2=Buffer.from('珠峰')
//转字符串
buf2.toString()//珠峰
//把数组和字符串转换成二进制
buf1.from([1，2，3])
//通过数字声明一个buffer，3是字节长度
buf1.alloc(3)
//循环
buf1.forEach()
//复制
buf2.copy(buf1,targetStart,sourceStart,sourceEnd)
//拼接
Buffer.concat([buf1,buf2])
//查找
buf2.indexOf('珠')
```
#### fs  
- fs将文件读取成buffer。
- fs方法中，一般会有同步和异步两种方法，同步可以马上拿到返回结果，异步通过callback，只能error-first来获取错误。一般采用异步的方式。
`{encoding:'utf8',flag:'r'}`
- flags:
| 符号 | 含义                                     |
| ---- | ---------------------------------------- |
| r    | 读文件，文件不存在报错                   |
| r+   | 读取并写入，文件不存在报错               |
| w    | 写入文件，不存在则创建，存在则清空       |
| w+   | 读取并写入文件，不存在则创建，存在则清空 |
| wx   | 排它写入文件                             |
| a    | 追加写入                                 |

- fs.readFile
  - 读取文件

   ```js
   fs.readFile('./note.md','utf8',function(err,data){
   	if(err){
   		console.log(err);
   	}
   	console.log(data);
   })
   //{encoding:'utf8',flags:'r'}
   ```

- fs.writeFile
  - 写入文件(写入时，文件不存在会创建文件，如有内容会清空内容)

   ```js
   fs.writeFile('./note.md',1,function(err,data){
   	if(err){
   		console.log(err);
   	}
   	console.log(data);
   })
   ```
   ```js
   // readFile+writeFile实现拷贝功能（readfile将内容整个读取到内存中，再写入文件中。所以这种方式不可能读取比内存大的文件）
   function copy(source,target){
     fs.readFile(source,function(err,data){
       fs.writeFile(target,data,function(err){
         console.log('成功')
       })
     })
   }
   copy('a.md','b.md')
   ```
- fs.appendFile 
  - 追加写入（里面使用flag:a）
- fs.copyFile
  - 拷贝文件
   ```js
   fs.copyFile(source,target,function(){
     console.log('ok')
   })
   ```
- 从指定位置开始读取文件
   - 打开文件：fs.open('./1,txt','r',0600,**function**(err,fd){});

   - 读取文件：fs.read(fd, buffer, offset, length, position, callback((err, bytesRead, buffer)))

   - 写入文件：fs.write(fd, buffer[, offset[, length[, position]]], callback)

   process.stdin 0
   
   process.stdout 1
   
   process.stderr 2
   
   0,1,2是标识符，node中默认会占用0,1,2十三个描述符，所以自定义fd的是从3开始数

   ```js
   /*打开文件*/
   fs.open('a.md','r',function name(err,fd){
     console.log(fd)//3,fd是标识符，每次打开会累加
     let buffer=Buffer.alloc(3);//只能放三勺水
     /*读取文件*/
     //fd 文件描述符 buffer读取到哪里
     //0 是从buffer的哪个位置读取
     //3 读取的个数
     //0 读取文件的位置
     fs.read(fd,buffer,0,3,0,function(err,bytesRead){
     	//bytesRead 真实读取的字节数 <Buffer 31 00 00>
       /*关闭文件*/
       fs.close(fd,()=>{
         console.log('关闭')
       })
     })
   })
   ```
   ```js
   /*打开文件*/
   fs.open('a.md','w',function(err,fd){
   	let buffer=Buffer.from([1,2,3,4])
   	/*写入文件*/
   	//fd 代表文件描述符
   	//0 代表把buffer的第几个位置开始写入
   	//2 代表写入的个数
   	//0 写到文件的哪个位置
     fs.write(fd,buffer,0,2,0,function(err,written){
       console.log('写入成功')
       fs.fsync();//最后应该调用此方法，更新内存，将文件写入到磁盘中。
     });
   })
   ```

   ```js
   //实现一个拷贝，用fs.open fs.read fs.write实现拷贝文件的功能，控制读取速率，防止内存占用过多
   //第三个参数写Null，就会自动往后，不用自己计算位置
   //流的原理，发布订阅来简化
   function copy(source,target,callback){
     const BufferSize=2;
     fs.open(source,'r',function(err,rfd){
       fs.open(target,'w',function(err,wfd){
       	let buffer=Buffer.aloc(3);
       	function next(){
           fs.read(rfd,buffer,0,BUFFERSIZE,null,function(err,bytesRead){
             if(bytesRead>0){
               fs.write(wfd,buffer,0,bytesRead,null,function(err,written){
                 next();
               });
             }else{
             	fs.close(rfd,()=>{})
             	fs.close(wfd,()=>{
                 fs.fsync();
             	})
               callback();
             }
           })
       	};
       	next();
       })
     })
   }
   copy('a.md','b.md',function(){
     console.log('复制成功')
   })
   ```

- direction
  - 基本操作
   ```js
   //创建目录(必须保证父级存在)
   fs.mkdirSync('a/b') 或者fs.mkdirSync('a/b/c')或者 fs.mkdirSync('a\\b')双杠为了转义成\
   fs.mkdir()
   //判断一个文件是否有权限访问
   fs.access(path[, mode], callback)
   //删除目录(必须保证目录中没有子文件和子文件夹，否则会出错)
   fs.rmdirSync('a')
   fs.rmdir('a')
   //删除文件
   fs.unlinkSync
   fs.unlink
   //读取目录下所有文件
   fs.readdir(path[, options], callback)
   //查看文件目录信息
   let stat=fs.statSync(path)
   let stat=fs.stat(path,callback)
   stat.isDirectory()//是否是目录
   stat.isFile()//是否是目录
   ```

  - 做一个创建任意目录的工具
   ```js
   let fs=require('fs');
   //同步,使用for循环
   function mkdirSync(p){
     let dirs=p.split('/');
     for(let i=0;i<dirs.length;i++){
     	let currentPath=dirs.slice(0,i).join('/');
     	try{
         fs.accessSync(currentPath);
     	}catch(e){
         fs.mkdirSync(currentPath);
     	}
     }
   }
   mkdirSync('m/q/d')
   
   //异步，使用递归，next方法来帮助进行迭代操作
   //fs.access
   function mkdir(p,callback){
     let dirs=p.split('/');
     let index=0;
     function next(){
     	if(index===dirs.length) return callback();
       let currentPath=dirs.slice(0,++index).join('/');
       fs.access(currentPath,function(err){
         if(err){
           fs.mkdir(currentPath,function(){
             next();
           });
         }else{
           next();//当前文件夹存在就继续迭代
         }
       })
     }
     next();
   }
   mkdir('a/b/c',function(){
     console.log('创建完成')
   })
   ```

   - 同步先序深度优先删除目录
   
   ```js
   let fs=require('fs');
   let path=require('path')
   function rmSync(dir) {
       try {
           let stat = fs.statSync(dir);
           if (stat.isFile()) {
               fs.unlinkSync(dir);
           } else {
               let files=fs.readdirSync(dir);
               files
                   .map(file =path.join(dir,file))
                   .forEach(item=rmSync(item));
               fs.rmdirSync(dir);
           }
       } catch (e) {
           console.log('删除失败!');
       }
   }
   rmSync(path.join(__dirname,'a'));
   ```
   
   - 异步串行删除目录深度优先
   ```js
   function rmAsyncSeries(dir,callback) {
       setTimeout(() ={
           fs.stat(dir,(err,stat) ={
               if (err) return callback(err);
               if (stat.isDirectory()) {
                   fs.readdir(dir,(err,files) ={
                       let paths = files.map(file =path.join(dir,file));
                       function next(index) {
                           if (index>=files.length) return fs.rmdir(dir,callback);
                           let current=paths[index];
                           rmAsyncSeries(current,()=>next(index+1));
                       }
                       next(0);
                   });
               } else {
                   fs.unlink(dir,callback);
               }
           })
       },1000);
   }
   
   console.time('cost');
   rmAsyncSeries(path.join(__dirname,'a'),err ={
        console.timeEnd('cost');
   })
   
   //异步并行删除目录深度优先
   function rmAsyncParallel(dir,callback) {
       setTimeout(() ={
           fs.stat(dir,(err,stat) ={
               if (err) return callback(err);
               if (stat.isDirectory()) {
                   fs.readdir(dir,(err,files) ={
                       let paths=files.map(file =path.join(dir,file));
                       if (paths.length>0) {
                           let i=0;
                           function done() {
                               if (++i == paths.length) {
                                   fs.rmdir(dir,callback);
                               }
                           }
                         paths.forEach(p=>rmAsyncParallel(p,done));
                       } else {
                           fs.rmdir(dir,callback);
                       }
                   });
               } else {
                   fs.unlink(dir,callback);
               }
           })
       },1000);
   }
   console.time('cost');
   rmAsyncParallel(path.join(__dirname,'a'),err ={
        console.timeEnd('cost');
   })
   
   //异步删除非空目录(Promise版)
   function rmPromise(dir) {
       return new Promise((resolve,reject) ={
           fs.stat(dir,(err,stat) ={
               if (err) return reject(err);
               if (stat.isDirectory()) {
                   fs.readdir(dir,(err,files) ={
                       let paths = files.map(file =path.join(dir,file));
                       let promises = paths.map(p=>rmPromise(p));
                       Promise.all(promises).then((() =fs.rmdir(dir,resolve)));
                   });
               } else {
                   fs.unlink(dir,resolve);
               }
           });
       });
   }
   rmPromise(path.join(__dirname,'a')).then(() ={
       console.log('删除成功');
   })
   
   //同步删除目录(广度优先) 
   function rmSync(dir){
       let arr=[dir];
       let index=0;
       while (arr[index]) {
           let current=arr[index++];
           let stat=fs.statSync(current);
           if (stat.isDirectory()) {
               let dirs=fs.readdirSync(current);
               arr=[...arr,...dirs.map(d =path.join(current,d))];
           }
       }
       let item;
       while (null != (item = arr.pop())) {
           let stat = fs.statSync(item);
           if (stat.isDirectory()) {
               fs.rmdirSync(item);
           } else {
               fs.unlinkSync(item);
           }
       }
   }
   
   //异步删除目录(广度优先)
   function rmdirWideAsync(dir,callback){
       let dirs=[dir];
       let index=0;
       function rmdir() {
           let current = dirs.pop();
           if (current) {
               fs.stat(current,(err,stat) ={
                   if (stat.isDirectory()) {
                       fs.rmdir(current,rmdir);
                   } else {
                       fs.unlink(current,rmdir);
                   }
               });
           }
       }
       !function next() {
           let current=dirs[index++];
           if (current) {
               fs.stat(current,(err,stat) ={
                   if (err) callback(err);
                   if (stat.isDirectory()) {
                       fs.readdir(current,(err,files) ={
                           dirs=[...dirs,...files.map(item =path.join(current,item))];
                           next();
                       });
                   } else {
                       next();
                   }
               });
           } else {
               rmdir();
           }
       }();
   }
   ```

### 流

直接读取文件会占用内存。而流会从一个位置读到另一个位置，不关心内存大小。原理是封装了fs.read等。

Node.js中**四种基本的流类型**：

- 可读流，可写流，可读写流(双工流)，读写过程中可修改和变换数据的Duplex流

1. 可读流

   1. 创建

      fs.createReadStream(path,[options]);

   - path读取文件的路径

   - options
     - flags打开文件要做的操作,默认为'r'
     - encoding默认为null
     - autoClose:默认true
     - start开始读取的索引位置
     - end结束读取的索引位置(包前包后)
     - **highWaterMark**每次读取缓存区默认的大小64kb

   ```
   var rs = fs.createReadStream(path,[options]);
   ```

   2. 监听data事件

      ```
      rs.on('data', function (data) {
          console.log(data);
      });
      ```

   3. 监听end事件

      ```
      rs.on('end', function () {
          console.log('读取完成');
      });
      ```

      所有事件都是内部发布，外部on订阅。

   4. 监听open事件

      ```
      rs.on('open', function () {
          console.log(err);
      });
      ```

   5. 监听close事件

      ```
      rs.on('close', function () {
          console.log(err);
      });
      ```

   6. 监听错误事件(文件不存在)

      ```
      rs.on('error', function (err) {
          console.log(err);
      });
      ```

   7. 暂停和恢复触发data

      通过pause()方法和resume()方法

      ```
      rs.on('data', function (data) {
          rs.pause();
          console.log(data);
      });
      setTimeout(function () {
          rs.resume();
      },2000);
      ```

      

2. 可写流

3. pipe方法

4. 简单实现原理

5. 暂停模式

6. 自定义可读流

## 第三方模块
- 下载别人的包来使用npm（npm.js.org）
- 安装方式：
  - 全局安装
    - npm install xxx -g 只能在命令行中使用，工具类的会用这种方式
    - 统一安装到 C:\Users\speedly\AppData\Roaming\npm\node_modules(并不是像node和npm一样配置到环境变量里，而是在npm目录下创建了快捷键，所以能直接使用)
    ```js
    npm install nrm -g//切换npm下载源
    sudo npm install nrm -g(mac版)
    nrm --help//查看使用方法
    nrm ls //列出所有源
    npm 官方 cnpm 中国 taoboa 淘宝的
    nrm use npm//切到npm
    npm install http-server -g//启动一个服务
    npm root -g//查看全局安装的安装目录
    ```
  - 本地安装
    ```js
    // 先初始化(node package manager)：
    npm init -y
    // 默认是项目依赖(上线开发都需要，install可简写成i)
    npm install jquery 
    // 开发的时候使用，上线不用
    npm install @babel/cli -D 
    // 选择版本
    npm install jquery@2.1.0
    // 卸载
    Npm uninstall jquery
    // 查看
    npm info react
    // yarn也是一个包管理工具 区别：比npm快
    npm install yarn -g
    yarn add jquery
    yarn remove jquery
    // 安装成开发依赖(与npm一样)
    yarn add jquery -D
    ```
### mz模块
  - 将回调方法改成promise
```js
let fs=require('mz/fs');
```
### websocket
- 安装
```js
npm i nodejs-websocket -S
```

- 创建服务使用
```js
var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var server = ws.createServer(function(conn){
  conn.on("text", function (str) {
    var msg = {
        type: "message",
        text: "something",
        id:   "number",
        date: Date.now()
    };
    console.log("message:"+str)
    conn.send(JSON.stringify(msg));
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
}).listen(3001)
console.log("WebSocket建立完毕")
```

## 模块查找流程
![commonjs文件查找逻辑图](/img/commonjs文件查找逻辑图)
- 当前node_modules下，如果有文件同名js，先走js，找不到再找index.js，
- 有文件先找文件，没有文件再找文件夹//node10以上
- 自己写的模块也一样。
```js
// comsole.log(module.paths) 
// 模块的所有路径，当前路径找不到，就往上找
[ '/Users/yinyi/test/node_modules',
  '/Users/yinyi/node_modules',
  '/Users/node_modules',
  '/node_modules' ]
```
**node核心模块**


## express
- 安装
```js
npm install -g express-generator
npm install -g express
```
- 快速创建express项目
```js  
// e.js作为模板引擎
express -e ./
```
- 使用
```js
//server.js
let express=require('express');

let app=express();

app.get('/getUser',(req,res)=>{
    res.json({name:'zfpx'});
})

app.listen(3000)
```

