# 02-JS-WEB-API
[[toc]]

## 01-DOM操作

### 从 HTML 到 DOM

#### DOM 的本质

讲 DOM 先从 html 讲起，讲 html 先从 XML 讲起。XML 是一种可扩展的标记语言，所谓可扩展就是它可以描述任何结构化的数据，它是一棵树！

```xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
  <other>
    <a></a>
    <b></b>
  </other>
</note>
```

HTML 是一个有既定标签标准的 XML 格式，标签的名字、层级关系和属性，都被标准化（否则浏览器无法解析）。同样，它也是一棵树。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div>
        <p>this is p</p>
    </div>
</body>
</html>
```

我们开发完的 html 代码会保存到一个文档中（一般以`.html`或者`.htm`结尾），文档放在服务器上，浏览器请求服务器，这个文档被返回。因此，最终浏览器拿到的是一个文档而已，文档的内容就是 html 格式的代码。

但是浏览器要把这个文档中的 html 按照标准渲染成一个页面，此时浏览器就需要将这堆代码处理成自己能理解的东西，也得处理成 JS 能理解的东西，因为还得允许 JS 修改页面内容呢。

基于以上需求，浏览器就需要把 html 转变成 DOM，html 是一棵树，DOM 也是一棵树。对 DOM 的理解，可以暂时先抛开浏览器的内部因此，先从 JS 着手，即可以认为 DOM 就是 JS 能识别的 html 结构，一个普通的 JS 对象或者数组。

【附带一个 chrome Element 的截图】

### DOM 节点操作
- DOM 节点就是一个 JS 对象
- nodeType 区分过滤text标签，=1是p，=3是text
- nodeName=#text是text，=p是p
```js
 // 获取DOM节点
var div1 = document.getElementById('div1')
 // 获取DOM节点的集合
var divList = document.getElementsByTagName('div')
var containerList = document.getElementsByClassName('.container')
var pList = document.querySelectorAll('p')
// 获取property和修改property(改变 JS 对象)
console.log(p.style.width) 
console.log(p.className) 
console.log(p.nodeName)
console.log(p.nodeType)
p.style.width = '100px'  
p.className = 'p1'
// 获取设置属性(Attibute 是改变 html 的属性)
p.getAttribute('style')
p.setAttribute('style', 'font-size:30px;')
// 创建节点
var p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
// 添加新节点
div1.appendChild(p1) 
// 移动已有节点
div1.appendChild(p2)
// 获取父节点
var parent = div1.parentElement
// 获取子节点
var child = div1.childNodes
// 删除节点
var child = div1.childNodes
div1.removeChild(child[0])
```

### DOM事件

|属性|	描述	|
| :------| ------: | :------: |
onabort|图像的加载被中断。|
onbeforeunload|	该事件在即将离开页面（刷新或关闭）时触发|
onerror	|在加载文档或图像时发生错误。|
onhashchange|	该事件在当前 URL 的锚部分发生修改时触发。	 |
onload	|一张页面或一幅图像完成加载。	|
onpageshow|	该事件在用户访问页面时触发	|
onpagehide|	该事件在用户离开当前网页跳转到另外一个页面时触发	|
onresize|	窗口或框架被重新调整大小。	|
onscroll|	当文档被滚动时发生的事件。	|
onunload|	用户退出页面。| 

## 解答

### DOM 是哪种基本的数据结构？

树

### DOM 操作的常用 API 有哪些

- 获取节点，以及获取节点的 Attribute 和 property 
- 获取父节点 获取子节点
- 新增节点，删除节点

## 02-BOM操作
- BOM（浏览器对象模型）
  - navigator
  - screen
  - location
  - history

```javascript
// navigator
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)

// screen
console.log(screen.width)
console.log(screen.height)

// location
console.log(location.href)
console.log(location.protocol) // 'http:' 'https:'
console.log(location.pathname) // '/learn/199'
console.log(location.search)
console.log(location.hash)

// history
history.back()
history.forward()
```

## 解答

### 如何检测浏览器的类型

```javascript
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

### 拆解url的各部分

```javascript
console.log(location.href)
console.log(location.protocol) // 'http:' 'https:'
console.log(location.pathname) // '/learn/199'
console.log(location.search)
console.log(location.hash)
```

## 03-事件

### 事件绑定

```javascript
var btn = document.getElementById('btn1')
btn.addEventListener('click', function (event) {
    console.log('clicked')
})
```

#### 通用的事件绑定函数

```js
function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn)
}
var a = document.getElementById('link1')
bindEvent(a, 'click', function(e) {
    e.preventDefault() // 阻止默认行为
    alert('clicked')
})
```

#### 关于IE低版本的兼容性

前几年 IE 低版本还占有较高流量的时候，这个函数要写的比较复杂，因为 IE 低版本是使用`attachEvent`来绑定事件的。但是现在 IE 低版本基本也都没人用了，而且主流的网站也都慢慢不支持了，现在还有大部分流量在移动端，也不用考虑这个兼容。

因此，我不建议大家再去详细学习 IE 低版本的事件绑定了，你只需要上网简单一看，知道 IE 低版本不一样，有一些兼容性的问题，知道`attachEvent`这个最主要的函数，就够了。这就足够你去应对当前比较好的面试机会。

但是，如果有一个面试机会非得考察 IE 低版本的各种兼容性问题，你不会也没关系。因为你干脆就放弃这次面试，你面试成功了，进去估计也是天天维护那些老掉牙的支持 IE 低版本的项目，没什么进步空间的。

### 事件冒泡

```html
<body>
    <div id="div1">
        <p id="p1">激活</p>
        <p id="p2">取消</p>
        <p id="p3">取消</p>
        <p id="p4">取消</p>
    </div>
    <div id="div2">
        <p id="p5">取消</p>
        <p id="p6">取消</p>
    </div>
</body>
```

对于以上 html 代码结构，点击`p1`时候进入激活状态，点击其他任何`p`都取消激活状态，如何实现？

```javascript
var p1 = document.getElementById('p1')
var body = document.body
bindEvent(p1, 'click', function (e) {
    e.stopPropatation() // 注释掉这一行，来体会事件冒泡
    alert('激活')
})
bindEvent(body, 'click', function (e) {
    alert('取消')
})
```

如果我们在`p1` `div1` `body`中都绑定了事件，它是会根据 DOM 的结构，来冒泡从下到上挨个执行的。但是我们使用`e.stopPropatation()`就可以阻止冒泡。

### 事件代理
- 使用
  - e.target// 目标DOM节点
  - e.target.nodeName=='A'// 目标DOM节点的节点名称(筛选a标签)
  - e.target.className// 目标DOM节点的类名
  - e.target.innerHTML// 目标DOM节点的内容
  - e.target.innerText// 目标DOM节点的内容
- 代理的优点
  - 使代码简洁
  - 减少浏览器的内存占用
```html
<!-- 例 -->
<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
</div>
<button>点击增加一个 a 标签</button>
<script>
    var div1 = document.getElementById('div1')
    div1.addEventListener('click', function (e) {
        var target = e.target
        if (target.nodeName === 'A') {
            alert(target.innerHTML)
        }
    })
</script>
```
```javascript
// 通用事件绑定函数
function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, function (e) {
        var target
        if (selector) {
            target = e.target
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}
// 使用代理
var div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function (e) {
    console.log(this.innerHTML)
})
// 不使用代理
var a = document.getElementById('a1')
bindEvent(div1, 'click', function (e) {
    console.log(a.innerHTML)
})
```


## 解答

### 编写一个通用的事件监听函数

```js
function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, function (e) {
        var target
        if (selector) {
            target = e.target
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}
```

### 描述DOM事件冒泡流程

- DOM树形结构
- 事件会顺着触发元素网上冒泡

### 对于一个无线下拉加载图片的页面，如何给每个图片绑定事件

使用代理，优点

- 使代码简洁
- 减少浏览器的内存占用


## 04-ajax

### XMLHttpRequest

```javascript
var xhr = new XMLHttpRequest()
xhr.open("GET", "/api", false)
xhr.onreadystatechange = function () {
    // 这里的函数异步执行，可参考之前 JS 基础中的异步模块
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            alert(xhr.responseText)
        }else{
            console.log('error');
        }
    }
}
xhr.send(null)
```

#### 关于IE低版本的兼容性问题

最后，还得补充一下 IE 低版本的兼容性问题，它使用`var xhr = new ActiveXObject("Microsoft.XMLHTTP")`创建，这里我的建议跟讲事件那个章节一样，查查资料了解一下，不用详细看。如果工作之后不用，最好彻底忘掉，下次面试再扒出来本教程的文档看看就行了。

### 状态码说明

#### readyState

xhr.readyState 的状态吗说明

- 0 - (未初始化）还没有调用send()方法 
- 1 -（载入）已调用send()方法，正在发送请求 
- 2 -（载入完成）send()方法执行完成，已经接收到全部响应内容
- 3 -（交互）正在解析响应内容 
- 4 -（完成）响应内容解析完成，可以在客户端调用了 

#### status

http 状态吗有 `2xx` `3xx` `4xx` `5xx` 这几种，比较常用的有以下几种

- 200 正常
- 404 找不到资源
- 5xx 服务器端出错了

### 跨域

- 浏览器的同源策略：
  - 即一个域下的页面中，无法通过 ajax 获取到其他域的接口。
- url 哪些地方不同算作跨域？
  - 协议
  - 域名
  - 端口

- html中可实现跨域的几个标签
  - `<script src="xxx">`
    - 可以使用CDN，CDN基本都是其他域的链接。
    - 可以实现JSONP，获取其他域接口的信息。
  - `<img src="xxxx"/>`
    - `<img>`可以做打点统计，因为统计方并不一定是同域的。除了能跨域之外，`<img>`几乎没有浏览器兼容问题
  - `<link href="xxxx">`
    - 可以使用CDN，CDN基本都是其他域的链接。

- 所有的跨域请求方式，都需要信息提供方来做出相应的支持和改动

#### JSONP（利用script标签的异步加载来实现的）
从服务端`http://www.abc.com/?callback=callbackName`下载一段callback函数执行代码，数据作为函数的参数。页面中定义一个`window.callbackName=function(data){}`，函数执行后即可进入callback函数获取到data。
```html
<script>
// 定义window.callbackName函数
window.callbackName = function (data) {
    console.log(data)
}
</script>
```

```js
// 服务端返回函数代码
callbackName({x:100, y:200})
```

#### 服务器端设置 http header

这是需要在服务器端设置的，现在推崇的跨域解决方案是这一种，比 JSONP 简单许多。

```js
response.setHeader("Access-Control-Allow-Origin", "http://localhost:8011");  // 第二个参数填写允许跨域的域名称，不建议直接写 "*"
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

// 接收跨域的cookie
response.setHeader("Access-Control-Allow-Credentials", "true");
```

## 解答

### 手动编写一个 ajax，不依赖第三方库

```js
var xhr = new XMLHttpRequest()
xhr.open("GET", "/api", false)
xhr.onreadystatechange = function () {
    // 这里的函数异步执行，可参考之前 JS 基础中的异步模块
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            alert(xhr.responseText)
        }
    }
}
xhr.send(null)
```

### 跨域的几种实现方式

- JSONP
- 服务器端设置 http header





## 05-websocket
- 使用
```js
var Socket = new WebSocket(url, [protocol] );
```

WebSocket 事件
事件	描述
Socket.onopen	连接建立时触发
Socket.onmessage	客户端接收服务端数据时触发
Socket.onerror	通信发生错误时触发
Socket.onclose	连接关闭时触发
WebSocket 方法
方法	描述
Socket.send()	使用连接发送数据
Socket.close()	关闭连接

```js
if(window.WebSocket){
    var ws = new WebSocket('ws://localhost:3001');

    ws.onopen = function(e){
        console.log("连接服务器成功");
        // 向服务器发送消息
        let params={
        region:'姑苏区'
        }
        ws.send(JSON.stringify(params));
    }
    ws.onclose = function(e){
        console.log("服务器关闭");
    }
    ws.onerror = function(){
        console.log("连接出错");
    }
    // 接收服务器的消息
    ws.onmessage = function(e){
        let message = "message:"+e.data+"";
        
        console.log(message);
    }   
}

```

## 06-存储

### cookie

cookie 本身不是用来做服务器端存储的（计算机领域有很多这种“狗拿耗子”的例子，例如 css 中的 float），它设计是用来在服务器和客户端进行信息传递的，因此我们的每个 http 请求都带着 cookie。但是 cookie 也具备浏览器端存储的能力（例如记住用户名和密码），因此就被开发者用上了。

使用起来也非常简单`document.cookie = ....`即可。

但是 cookie 有它致命的缺点：

- 存储量太小，只有 4KB
- 所有 http 请求都带着，会影响获取资源的效率
- API 简单，需要封装才能用

### locationStorage 和 sessionStorage

后来，HTML5标准就带来了`sessionStorage`和`localStorage`，先拿`localStorage`来说，它是专门为了浏览器端缓存而设计的。其优点有：

- 存储量增大到 5M
- 不会带到 http 请求中
- API 适用于数据存储 `localStorage.setItem(key, value)` `localStorage.getItem(key)`

`sessionStorage`的区别就在于它是根据 session 过去时间而实现，而`localStorage`会永久有效，应用场景不懂。例如，一些重要信息需要及时失效的放在`sessionStorage`中，一些不重要但是不经常设置的信息，放在`localStorage`

另外告诉大家一个小技巧，iOS系统的safari浏览器的隐藏模式，使用`localStorage.setItem`，因此使用时尽量加入到`try-catch`中

## 解答

### 请描述一下 cookie，sessionStorage 和 localStorage 的区别？

- 容量
- 是否会携带到 ajax 中
- API易用性

## 07-jquery 相关

- 移动端使用 zepto，使用方法和 jquery 一样。API 地址 http://jquery.cuishifeng.cn/

- jquery文档：jquery123
- jquery插件：jq22

### DOM 操作

#### DOM 查询

```js
// 建议是用 $xxx 命名
var $p1 = $('#p1')

var $div = $('div')
$div.forEach(function () {
    console.log(this)
})
```

#### DOM 结构操作

```js
var $div1 = $('#div1')

// 增加新建节点
var $newP = $('<p>new p</p>')
$div1.append($newP)
// 移动现有节点
var $p1 = $('#P1')
$div1.append($p1)

// 获取父节点
$p1.parent()

// 获取子节点
$div1.children()

// 移除节点
$p1.remove()
```

### 事件绑定

#### 基本应用

```js
var $a = $('#a1')
$a.on('click', function (e) {
    e.preventDefault()
    console.log('clicked')
})
```

#### 代理

```js
var $div = $('div')
$div.on('click', 'a', function (e) {
    console.log(this.html())
})
```

### ajax

#### 非跨域

```js
$.ajax({
    url: '/api',
    data:{name:"zhangsan",age:18},
    dataType:"json",
    type:"POST",
    success: function (result) {
        console.log(result)
    },
    error:function(){

    }
})
```
|项|值|
|:---|:---|
|type|类型:String,默认值:GET|
|url|类型:String,默认值:当前页地址|
|success|类型:Function，请求成功回调函数|
|options|类型:Object|
|async|类型:Boolean,默认值:true,默认异步，注意：同步请求将锁住浏览器，用户其他操作必须等待请求完成才可执行|
|beforeSend(XHR)|类型:Function,发送请求前修改XMLHttpRequest对象，XMLHttpRequest为唯一参数，如果返回false,可以取消本次ajax请求|
|cache|类型:Boolean,默认值:true,dataType为script和jsonp时默认为false,设置false将不缓存此页面|
|contentType|类型:String,默认值:"application/x-www-form-urlencoded",发送信息至服务器时内容编码类型.默认值适合大多数情况.如果你明确的传递了一个content-type 给$.ajax()那么它必行会发送给服务器(即使没有数据要发送)|
|data|类型:String,发送到服务器的数据,将自动转换为请求字符串格式.GET 请求中将附加在URL 后.查看processData 选项说明以禁止此自动转换.必须为Key/Value 格式,如果为数组,jQuery 将自动为不同值对应同一个名称.如:{foo:["bar1", "bar2"]}转换为’&foo=bar1&foo=bar2’|
|dataFilter|类型:Function,给AJAX 返回的原始数据的进行预处理的函数.提供data 和type 两个参数,data 是AJAX 返回的原始数据,type 是调用jQuery.ajax 时提供的dataType 参数,函数返回的值将由jQuery 进一步处理|
|dataType|类型:String,预期服务器返回的数据类型.如果不指定,jQuery 将自动根据HTTP 包MIME 信息来智能判断,比如XML MIME 类型就被识别为XML.在1.4 中,JSON 就会生成一个JavaScript 对象,而script 则会执行这个脚本.随后服务器端返回的数据会根据这个值解析后,传递给回调函数.可用值:`xml`,`html`,`script`,`json`,`jsonp`,`text`,注意：使用JSONP 形式调用函数时,如"myurl?callback=?"jQuery 将自动替换? 为正确的函数名,以执行回调函数.|
|error|类型:Function,默认值:自动判断(xml 或html), 请求失败时调用此函数|

#### JSONP
提供方提供的数据：

```js
myCallback({
    "x": 100,
    "y": 200
})
```

接收方的写法：

```js
$.ajax({
    url: 'http://localhost:8882/x-origin.json',
    dataType: 'jsonp',
    jsonpCallback: 'myCallback',
    success: function (data) {
        console.log(data)
    }
})
```

#### XML

```js
$(xml).find("student").each(function(i){
    //获取id节点
    var id=$(this).children("id"),
    //获取节点文本
        id_value=id.text(),
    //获取student下的email属性。
        email=$(this).attr("email");
    //构造HTML字符串，通过append方法添加进之前建立代码片段
    frag.append("<li>"+id_value+"-"+email+"</li>");
});
```
- excel转为xml
  - 选项中勾选开发工具
  - 新建一个xml模板，两个数据以上，列名写好
  - 点击源，添加映射，把列拖入表格中
  - 填入数据
  - 另存为xml
- 问题：转日期出错？？？
- 上线后本地能获取为json文件为对象的json数据不能变为对象了（是不是hbuilder的问题？？？）

