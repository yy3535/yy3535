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

#### 获取 DOM 节点

```javascript
var div1 = document.getElementById('div1') // 元素
var divList = document.getElementsByTagName('div')  // 集合
console.log(divList.length)
console.log(divList[0])

var containerList = document.getElementsByClassName('.container') // 集合
var pList = document.querySelectorAll('p') // 集合
```

#### prototype

DOM 节点就是一个 JS 对象，它符合之前讲述的对象的特征 ———— 可扩展属性

```javascript
var pList = document.querySelectorAll('p')
var p = pList[0]
console.log(p.style.width)  // 获取样式
p.style.width = '100px'  // 修改样式
console.log(p.className)  // 获取 class
p.className = 'p1'  // 修改 class

// 获取 nodeName 和 nodeType
console.log(p.nodeName)
console.log(p.nodeType)
```

#### Attribute

property 的获取和修改，是直接改变 JS 对象，而 Attibute 是直接改变 html 的属性。两种有很大的区别

```javascript
var pList = document.querySelectorAll('p')
var p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'imooc')
p.getAttribute('style')
p.setAttribute('style', 'font-size:30px;')
```

### DOM 树操作

新增节点

```javascript
var div1 = document.getElementById('div1')
// 添加新节点
var p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
div1.appendChild(p1) // 添加新创建的元素
// 移动已有节点
var p2 = document.getElementById('p2')
div1.appendChild(p2)
```

获取父元素

```javascript
var div1 = document.getElementById('div1')
var parent = div1.parentElement
```

获取子元素

```javascript
var div1 = document.getElementById('div1')
var child = div1.childNodes
```

删除节点

```javascript
var div1 = document.getElementById('div1')
var child = div1.childNodes
div1.removeChild(child[0])
```

还有其他操作的API，例如获取前一个节点、获取后一个节点等，但是面试过程中经常考到的就是上面几个。

nodeType 区分过滤text标签，=1是p，=3是text

nodeName=#text是text，=p是p

## 解答

### DOM 是哪种基本的数据结构？

树

### DOM 操作的常用 API 有哪些

- 获取节点，以及获取节点的 Attribute 和 property 
- 获取父节点 获取子节点
- 新增节点，删除节点

### DOM 节点的 Attribute 和 property 有何区别

- property 只是一个 JS 属性的修改
- attr 是对 html 标签属性的修改

## 02-BOM操作

DOM 是浏览器针对下载的 HTML 代码进行解析得到的 JS 可识别的数据对象。而 BOM（浏览器对象模型）是浏览器本身的一些信息的设置和获取，例如获取浏览器的宽度、高度，设置让浏览器跳转到哪个地址。

- navigator
- screen
- location
- history

这些对象就是一堆非常简单粗暴的 API 没人任何技术含量，讲起来一点意思都没有，大家去 MDN 或者 w3school 这种网站一查就都明白了。面试的时候，面试官基本不会出太多这方面的题目，因为只要基础知识过关了，这些 API 即便你记不住，上网一查也都知道了。

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

### 代理

我们设定一种场景，如下代码，一个`<div>`中包含了若干个`<a>`，而且还能继续增加。那如何快捷方便的为所有的`<a>`绑定事件呢？

```html
<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
</div>
<button>点击增加一个 a 标签</button>
```

这里就会用到事件代理，我们要监听`<a>`的事件，但要把具体的事件绑定到`<div>`上，然后看事件的触发点，是不是`<a>`

```javascript
var div1 = document.getElementById('div1')
div1.addEventListener('click', function (e) {
    var target = e.target
    if (e.nodeName === 'A') {
        alert(target.innerHTML)
    }
})
```

那我们现在完善一下之前写过的通用事件绑定函数，加上事件代理

```javascript
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

然后这样使用

```js
// 使用代理
var div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function (e) {
    console.log(this.innerHTML)
})

// 不适用代理
var a = document.getElementById('a1')
bindEvent(div1, 'click', function (e) {
    console.log(a.innerHTML)
})
```

最后，使用代理的优点

- 使代码简洁
- 减少浏览器的内存占用

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

#### JSONP

首先，有一个概念要你要明白，例如访问`http://coding.m.imooc.com/classindex.html`的时候，服务器端就一定有一个`classindex.html`文件吗？—— 不一定，服务器可以拿到这个请求，然后动态生成一个文件，然后返回。
同理，`<script src="http://coding.m.imooc.com/api.js">`也不一定加载一个服务器端的静态文件，服务器也可以动态生成文件并返回。OK，接下来正式开始。

例如我们的网站和慕课网，肯定不是一个域。我们需要慕课网提供一个接口，供我们来获取。首先，我们在自己的页面这样定义

```html
<script>
window.callback = function (data) {
    // 这是我们跨域得到信息
    console.log(data)
}
</script>
```

然后慕课网给我提供了一个`http://coding.m.imooc.com/api.js`，内容如下（之前说过，服务器可动态生成内容）

```js
callback({x:100, y:200})
```

最后我们在页面中加入`<script src="http://coding.m.imooc.com/api.js"></script>`，那么这个js加载之后，就会执行内容，我们就得到内容了

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

## 05-存储

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

## 06-jquery 相关

移动端使用 zepto，使用方法和 jquery 一样。API 地址 http://jquery.cuishifeng.cn/

直接代码演示即可，无需准备PPT

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
|:---|---:|
|type|类型:String,默认值:GET|
|url|类型:String,默认值:GET|
|success|类型:String,默认值:GET|
|options|类型:String,默认值:GET|
|async|类型:String,默认值:GET|
|beforeSend(XHR)|类型:String,默认值:GET|
|cache|类型:String,默认值:GET|
|type|类型:String,默认值:GET|
|type|类型:String,默认值:GET|
|type|类型:String,默认值:GET|
|type|类型:String,默认值:GET|
|type|类型:String,默认值:GET|

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
