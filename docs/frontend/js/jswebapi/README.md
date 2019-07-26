# JS-WEB-API
[[toc]]

## DOM操作

### DOM节点
- nodeType 区分过滤text标签，=1是p，=3是text
- nodeName=#text是text，=p是p
- 包括
    - 获取节点，以及获取节点的 Attribute 和 property 
    - 获取父节点 获取子节点
    - 新增节点，删除节点
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
- DOM事件(DOM标准)的级别
    |级别|格式|
    |:---|:---|
    |DOM0|element.onclick=function(){}|
    |DOM2 |element.addEventListener('click',function(){},false)(DOM1标准设立的时候没有事件相关的东西，所以直接是2)(默认false,冒泡阶段触发，true,捕获阶段触发。)|
    |DOM3 |element.addEventListener('keyup',function(){},false)(事件类型较DOM2增加了很多)|
- DOM事件模型
    - 冒泡(从下往上)
    - 捕获(从上往下)
- DOM事件流
    - 比如点击了左键，左键是怎么传到页面上，就叫事件流
    - 一个事件流分三个阶段：捕获阶段->目标阶段->冒泡阶段。事件通过捕获到达目标阶段，再从目标阶段冒泡上传到window对象
- 具体流程
    - 事件捕获：window->document->html->body->...->目标元素
    - 冒泡流程：目标元素->...->boyd->html->document->window
      - 如何拿html对象：document.documentElement
      - 如何拿body：document.body
- Event对象的常见应用
    - 事件类型
        - CAPTURING-PHASE  当前事件阶段为捕获阶段
        - AT-TARGET   当前事件是目标阶段,在评估目标事件
        - BUBBLING-PHASE   当前的事件为冒泡阶段
    - 目标
        - 【重要】target 当前目标元素,事件委托中指子元素
        - 【重要】currentTarget 当前绑定的元素，事件委托中指父级元素

    - 事件行为
        - 【重要】preventDefault() 阻止默认行为(比如阻止链接默认跳转行为)
        - 【重要】stopPropagation() 阻止冒泡
        - 【重要】stopImmediatePropagation() 优先级(绑定了ab两个事件，a事件中写了此函数，那么b就不会执行)

    - 键盘事件
        - altKey    
          - 返回当事件被触发时，"ALT" 是否被按下。
        - ctrlKey	
          - 返回当事件被触发时，"CTRL" 键是否被按下。
        - shiftKey	
          - 返回当事件被触发时，"SHIFT" 键是否被按下。
        - charCode  
          - 返回onkeypress事件触发键值的字母代码。
        - key	    
          - 在按下按键时返回按键的标识符。
        - button	
          - 返回当事件被触发时，哪个鼠标按钮被点击。
        - keyCode	
          - 返回onkeypress事件触发的键的值的字符代码，或者 onkeydown 或 onkeyup 事件的键的代码。
    - 鼠标位置
        - clientX	返回当事件被触发时，鼠标指针的水平坐标。
        - clientY	返回当事件被触发时，鼠标指针的垂直坐标。
        - screenX	返回当某个事件被触发时，鼠标指针的水平坐标。
        - screenY	返回当某个事件被触发时，鼠标指针的垂直坐标。
    
- 【重要】自定义事件
  - Event
    ```js
    // 声明自定义事件
    var eve=new Event('custome');
    ev.addEventListener('custome',function(){
        console.log('custome');
    })
    // 触发自定义事件
    ev.dispatchEvent(eve);
    ```
  - CustomEvent
    - 多一个obj的参数，`new CustomEvent('custome',object)`


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

#### 事件绑定
```javascript
var btn = document.getElementById('btn1')
btn.addEventListener('click', function (event) {
    console.log('clicked')
})
```

- 通用的事件绑定函数
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
- IE 低版本是使用`attachEvent`来绑定事件的。
#### 事件冒泡
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

#### 事件代理
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
## BOM操作
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

### 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件

使用代理，优点

- 使代码简洁
- 减少浏览器的内存占用


## ajax

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
- IE低版本使用`var xhr = new ActiveXObject("Microsoft.XMLHTTP")`创建，

- xhr.readyState
    - 0 - (未初始化）还没有调用send()方法 
    - 1 -（载入）已调用send()方法，正在发送请求 
    - 2 -（载入完成）send()方法执行完成，已经接收到全部响应内容
    - 3 -（交互）正在解析响应内容 
    - 4 -（完成）响应内容解析完成，可以在客户端调用了 

- xhr.status
    - 200 正常
    - 404 找不到资源
    - 5xx 服务器端出错了

### 跨域
- 浏览器的同源策略：
    - url协议、域名、端口不同，就是跨域
    - 即一个域下的页面中，无法通过 ajax 获取到其他域的接口。
    
- 可实现跨域的几个标签
  - `<script src="xxx">`
    - 可以使用CDN，CDN基本都是其他域的链接。
    - 可以实现JSONP，获取其他域接口的信息。
  - `<img src="xxxx"/>`
    - `<img>`可以做打点统计，因为统计方并不一定是同域的。除了能跨域之外，`<img>`几乎没有浏览器兼容问题
  - `<link href="xxxx">`
    - 可以使用CDN，CDN基本都是其他域的链接。

- 所有的跨域请求方式，都需要信息提供方来做出相应的支持和改动

#### JSONP（利用script标签的跨域特性实现）
- 从服务端`http://www.abc.com/?callback=callbackName`下载一段callback函数执行代码，数据作为函数的参数。
- 页面中定义一个`window.callbackName=function(data){}`，函数执行后即可进入callback函数获取到data。
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
```js
// server.js
// express 跨域
app.use((req,res,next)=>{
    // 请求来源
    res.header("Access-Control-Allow-Origin","http://localhost:8080");
    // 接受的请求类型
    res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT");
    // 跨域设置
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
})
```
```js
response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");  // 第二个参数填写允许跨域的域名称，不建议直接写 "*"
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

// 接收跨域的cookie
response.setHeader("Access-Control-Allow-Credentials", "true");
```

## websocket
- 使用
```js
var Socket = new WebSocket(url, [protocol] );
```

- WebSocket API

|事件|	描述|
|:-----:|:----:|
|Socket.onopen|	连接建立时触发|
|Socket.onmessage|	客户端接收服务端数据时触发|
|Socket.onerror|	通信发生错误时触发|
|Socket.onclose|	连接关闭时触发|
|WebSocket 方法|
|方法|	描述|
|Socket.send()|	使用连接发送数据|
|Socket.close()|	关闭连接|

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

## 存储

### cookie、session
- cookie缺点：
  - 存储量太小，只有 4KB
  - 所有 http 请求都带着，会影响获取资源的效率
  - API 简单，需要封装才能用
  ```JS
  // cookie.js
    const cookie={
        setCookie(cname,cvalue,exdays){
            var d = new Date();
            d.setTime(d.getTime()+(exdays*24*60*60*1000));
            var expires = "expires="+d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        getCookie(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) 
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        },
        checkCookie(){
            var username=cookie.getCookie("username");
            if (username!=""){
                alert("Welcome again " + username);
            }
            else {
                username = prompt("Please enter your name:","");
                if (username!="" && username!=null){
                    setCookie("username",username,365);
                }
            }
        }
    }
    export default cookie;
  ```
  ```js
  // 删除cookie
  cookie.setCookie('user','',-1);
  // 保存30天
  cookie.setCookie('user',JSON.stringify(response.data.data),30);
  // 获取cookie
  let cookieUser=cookie.getCookie('user')&&JSON.parse(cookie.getCookie('user'));
  ```
### locationStorage、sessionStorage[ES6]
- 存储在sessionStorage或localStorage中的数据特定于该页面的协议
- localStorage
  - 存储量增大到 5M
  - 不会带到 http 请求中
  - API 适用于数据存储 `localStorage.setItem(key, value)` `localStorage.getItem(key)`

  - iOS系统的safari浏览器的隐藏模式，使用`localStorage.setItem`，因此使用时尽量加入到`try-catch`中
- sessionStorage
  - 数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
  - 在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话(这点和 session cookies 的运行方式不同)
  ```js
  // 保存sessionStorage
  sessionStorage.setItem('user',JSON.stringify(response.data.data));
  // 获取sessionStorage
  let sessionUser=sessionStorage.getItem('user')&&JSON.parse(sessionStorage.getItem('user'));
  ```
#### cookie，sessionStorage 和 localStorage 的区别
- 容量
- 是否会携带到 ajax 中
- API易用性

## jquery

- 移动端使用 zepto，使用方法和 jquery 一样。API 地址 http://jquery.cuishifeng.cn/

- jquery文档：jquery123,http://tool.oschina.net/apidocs/apidoc?api=jquery
- jquery插件：jq22

### DOM 操作

#### DOM 查询

```js
// 建议是用 $xxx 命名
var $p1 = $('#p1')
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
|type|默认GET|
|url|默认当前页地址|
|success|请求成功回调函数|
|async|默认true,默认异步|
|beforeSend(XHR)|发送请求前修改XMLHttpRequest对象，XMLHttpRequest为唯一参数，如果返回false,可以取消本次ajax请求|
|cache|默认值:true,dataType为script和jsonp时默认为false,设置false将不缓存此页面|
|contentType|默认"application/x-www-form-urlencoded",发送信息至服务器时内容编码类型|
|dataType|可用值:`xml`,`html`,`script`,`json`,`jsonp`,`text`,注意：使用JSONP 形式调用函数时,如"myurl?callback=?"jQuery 将自动替换为正确的函数名,以执行回调函数.|
|error|默认自动判断(xml 或html), 请求失败时调用此函数|

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
- 问题：转日期出错(日期格式统一改为字符串即可)
- 上线后本地能获取为json文件为对象的json数据不能变为对象了（是不是hbuilder的问题？？？）

