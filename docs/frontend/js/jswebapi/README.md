# JS-WEB-API
[[toc]]

## DOM操作
- DOM操作出来nodeList是类数组
<mark-check id="Node"></mark-check>

### Node
- 节点属性
    - nodeName
    - nodeType(括号中为Node常量)
        - 1（Node.Element_Node）
        - 3（Node.Text_Node）
        - 8（Node.COMMENT_NODE）
        - 9（Node.Document_Node）
        - 11（Node.DocumentFragment_Node）
        ```js
        document.nodeType === Node.DOCUMENT_NODE; // true
        ```
    - nodeValue
    - textContent
        - document:null
        - comment/text node:text inside the node(即nodeValue)
        - 其它:每个child node的textContent连接。
- 节点关系
    - childNodes
        - 返回包含指定节点的子节点的集合，该集合为即时更新的集合，NodeList,是个类数组
    - parentNode
    - parentElement
    - firstChild
        - 如果有一个子节点, childNode 是节点的第一个子节点的引用，否则为null。
    - lastChild
    - hasChildNodes
    - previousSibling
      - 返回当前节点的前一个兄弟节点,没有则返回null.
    - nextSibling 
      - 返回其父节点的 childNodes 列表中紧跟在其后面的节点，如果指定的节点为最后一个节点，则返回 null。
- 方法
    - appendChild
        - 将一个节点添加到指定父节点的子节点列表末尾。
    - removeChild
    - insertBefore
      - var insertedNode = parentNode.insertBefore(newNode, referenceNode);
      - 函数返回被插入过的子节点；当 newNode 是 DocumentFragment 时，返回空 DocumentFragment。
    - replaceChild
    - cloneNode
    - contains
        - Returns a Boolean value indicating whether a node is a descendant of a given node or not.
### Document
- 继承自Node和EventTarget

- DOM 树
    - DOM 树包含了像 `<body>` 、`<table>` 这样的元素，以及大量其他元素。
<mark-check id="document"></mark-check>

- Properties
    - Document.documentElement
        - 返回当前文档的直接子节点，一般是`<html>`元素
    - Document.body
        - 返回当前文档的 `<body>` 或 `<frameset>` 节点。
    - Document.head
        - 返回当前文档的`<head>`元素
    - Document.title
        - 获取和设置当前文档的标题
    - Document.forms
        - 返回一个包含当前文档中所有表单元素`<form>`的列表

    - Document.domain
        - 获取或设置当前文档的域名
    - Document.doctype
    - Document.location
        - 返回当前文档的URI
    - Document.documentURI
        - 返回当前文档的路径
    - Document.referrer
        - 返回来源页面的URI
    - Document.URL
        - 以字符串形式返回文档的地址栏链接

    - Document.cookie
        - 返回一个使用分号分隔的cookie列表，或者设置（写入）一个cookie
        - 以字符串的方式返回所有的 cookie，类型格式： cookie1=value; cookie2=value; cookie3=value;
        ```js
        document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";
        ```
        ```js
        function setCookie(cname,cvalue,exdays)
        {
            var d = new Date();
            d.setTime(d.getTime()+(exdays*24*60*60*1000));
            var expires = "expires="+d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }
        function getCookie(cname)
        {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) 
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        }
        function checkCookie(){
            var user=getCookie("username");
            if (user!=""){
                alert("欢迎 " + user + " 再次访问");
            }
            else {
                user = prompt("请输入你的名字:","");
                if (user!="" && user!=null){
                    setCookie("username",user,30);
                }
            }
        }
        ```
    - Document.readyState
        - 返回当前文档的加载状态
- Methods
    - Document.createElement()
    - Document.getElementsByClassName()
    - Document.getElementsByTagName()
    - document.getElementById()
    - document.querySelector()
    - document.querySelectorAll()
    - Document.createDocumentFragment()
        - 创建一个 new document fragment.

- Events
    - <highlight-box>scroll</highlight-box>
    - visibilitychange
    - <highlight-box>wheel</highlight-box>
    - Animation events
        - animationend
    - Clipboard events
        - copy
        - cut
        - paste
    - Drag & drop events
        - drag
        - dragend
        - dragenter
        - dragexit
        - dragleave
        - dragover
        - dragstart
        - drop
    - Fullscreen events
        - fullscreenchange
        - fullscreenerror
    - Keyboard events
        - <highlight-box>keydown</highlight-box>
        - <highlight-box>keypress</highlight-box>
        - <highlight-box>keyup</highlight-box>
    - Load & unload events
        - <highlight-box>DOMContentLoaded</highlight-box>
        - <highlight-box>readystatechange</highlight-box>
    - Pointer events
    - Selection events
        - selectionchange
        - selectstart
    - Touch events
        - touchcancel
        - touchend
        - touchmove
        - touchstart
    - Transition events
        - transitioncancel
        - transitioned
        - transitionrun
        - transitionstart
### Element

<mark-check id="element"></mark-check>

- 继承自Node和EventTarget
    - nodeType:1
    - nodeName:标签名
    - nodeValue:null
    - parentNode:可能是Document或Element
- Properties
    - tagName:同nodeName
    - id
    - name
    - className
    - classList
    - attributes
        - 返回该元素所有属性节点的一个实时集合。该集合是一个 NamedNodeMap 对象，不是一个数组，所以它没有 数组 的方法。attributes 是字符串形式的名/值对，每一对名/值对对应一个属性节点。(类数组，有length属性)。每个属性有name和value
    - value
        - 值
    - innerHTML
    - innerText

    - children
        - 返回 一个Node的子elements ，是一个动态更新的 HTMLCollection。
    - firstElementChild
    - lastElementChild

    - clientWidth
    - clientHeight
    - clientTop
    - clientLeft
    
    - scrollWidth
    - scrollHeight
    - scrollTop
        ![scrollTop](../../img/scrollTop.png)
    - scrollLeft
        <!-- ![scrollHeight](../../img/scrollHeight.png) -->
- Methods
    - getElementsByClassName()
    - getElementsByTagName()
    - querySelector()
    - querySelectorAll()
    - append()
    - getAttribute()
    - setAttribute()
    - hasAttribute()
    - hasAttributes()
    - scroll()
    - scrollTo()
    - scrollBy()
    - matches(selectorString)
        - 返回true/false,元素是否符合选择器
        - 参数为css选择器字符串
    - getBoundingClientRect() 
      - 方法返回元素的大小及其相对于视口的位置。
    - getClientRects() 
      - 方法返回一个指向客户端中每一个盒子的边界矩形的矩形集合。

语法
    
- Events
    - click
    - dbclick
    - contextmenu
    - mousedown
    - mouseup
    - mouseenter
    - mouseleave
    - mouseout
    - mousemove
    - mouseover

    - focus
    - focusin
    - focusout
    - blur

    - keyup
    - keydown
    - keypress

    - select
    - copy
    - paste
    - fullscreenchange
    - fullscreenerror
    - touchstart
    - touchcancel
#### HTMLElement
- Properties
    - style
        - 通过单独的样式属性（如elt.style.color = '...'）比用elt.style.cssText = '...' 或者 elt.setAttribute('style', '...')形式更加简便
#### SVGElement

### EventTarget
- Element,Document,Window以及XMLHttpRequest,AudioNode,AudioContext等继承了EventTarget
- Event也可以通过onevent的properties和attributes来设置
- Constructor
    - EventTarget()
        - 创建一个EventTarget实例
<mark-check id="eventtarge"></mark-check>
- Methods
    - EventTarget.addEventListener()
    - EventTarget.removeEventListener()
    - EventTarget.dispatchEvent()

### Text
<mark-check id="text"></mark-check>
- <highlight-box>nodeType:3</highlight-box>
- nodeName:"#text"
- nodeValue:节点所包含的文本
- parentNode:一个Element
- 不支持（没有）子节点
- Properties
    - data
        - 节点所包含的文本
    - length
- Methods
    - appendData(text)
        - 将text添加到节点末尾
    - deleteData(offset,count)
        - 从offset指定的位置开始删除count个字符
    - insertData(offset,text)
        - 在offset指定的位置插入text
    - replaceData(offset,count,text)
        - 用text替换从offset指定的位置开始到offset+count为止处的文本
    - splitText(offset)
        - 从offset指定的位置将当前文本节点分成两个文本节点
    - substringData(offset,count)
        - 提取从offset指定的位置开始到offset+count为止处的字符串

### DocumentFragment
<mark-check id="DocumentFragment"></mark-check>

- <highlight-box>nodeType值为11</highlight-box>
- nodeName值为"#document-fragment"
- nodeValue值为null
- parentNode值为null
- 子节点可以是Element,Text等

- 文档片段接口，表示一个没有父级文件的最小文档对象。
- 被作为一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的XML片段。
- 最大的区别是因为 DocumentFragment 不是真实DOM树的一部分，它的变化不会触发 DOM 树的（重新渲染) ，且不会导致性能等问题。


### Window
<mark-check id="windowduixiang"></mark-check>

#### <highlight-box>window事件</highlight-box>

|属性|	描述	|
| :------| ------: | :------: |
onload	|一张页面或一幅图像完成加载。	|
onbeforeunload|	该事件在即将离开页面（刷新或关闭）时触发|
onunload|	用户退出页面。| 
onpageshow|	该事件在用户访问页面时触发	|
onpagehide|	该事件在用户离开当前网页跳转到另外一个页面时触发	|
onerror	|在加载文档或图像时发生错误。|
onabort|图像的加载被中断。|
onhashchange|	该事件在当前 URL 的锚部分发生修改时触发。	 |
onresize|	窗口或框架被重新调整大小。	|
onscroll|	当文档被滚动时发生的事件。	|

#### Window方法
- setTimeout
```js
var timeoutID = scope.setTimeout(function[, delay, param1, param2, ...]);// param1, ..., paramN 附加参数，一旦定时器到期，它们会作为参数传递给function 
var timeoutID = scope.setTimeout(function[, delay]); 
var timeoutID = scope.setTimeout(code[, delay]);
```
- getComputedStyle
  - 返回的style是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。
```js
let style = window.getComputedStyle(element, [pseudoElt]);
```
- element
  - 用于获取计算样式的Element。
- pseudoElt 可选
  - 指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。
#### Window属性
- innerWidth
  - 浏览器视口（viewport）宽度（单位：像素），如果存在垂直滚动条则包括它。
- innerHeight
  - 浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。
  - requestAnimationFrame
    - 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
    ```js
    window.requestAnimationFrame(callback);
    ```

### DOM事件
- DOM事件(DOM标准)的级别
    |级别|格式|
    |:---|:---|
    |DOM0|element.onclick=function(){}|
    |DOM2 |element.addEventListener('click',function(){},false)(DOM1标准设立的时候没有事件相关的东西，所以直接是2)(<highlight-box>默认false,冒泡阶段触发，true,捕获阶段触发。</highlight-box>)|
    |DOM3 |element.addEventListener('keyup',function(){},false)(事件类型较DOM2增加了很多)|
- DOM事件模型
    - 冒泡(从下往上)
    - 捕获(从上往下)
- DOM事件流
    - 比如点击了左键，左键是怎么传到页面上，就叫事件流
    - 一个事件流分三个阶段：捕获阶段->目标阶段->冒泡阶段。事件通过捕获到达目标阶段，再从目标阶段冒泡上传到window对象
<mark-check id="shijian"></mark-check>

- 事件绑定具体流程
    - 事件捕获：window->document->html->body->...->目标元素
    - 冒泡流程：目标元素->...->boyd->html->document->window

```js
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);

```
- options 可选
    - 一个指定有关 listener 属性的可选参数对象。可用的选项如下：
    - capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
    - once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
    - passive: Boolean，设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
- Event对象
    - 事件类型
        - CAPTURING-PHASE  当前事件阶段为捕获阶段
        - AT-TARGET   当前事件是目标阶段,在评估目标事件
        - BUBBLING-PHASE   当前的事件为冒泡阶段
    <mark-check id="eventduixiang"></mark-check>
    - Event属性
        - <highlight-box>target</highlight-box> 当前目标元素,事件委托中指子元素
        - <highlight-box>currentTarget</highlight-box> 当前绑定的元素，事件委托中指父级元素

    - <highlight-box>Event键盘属性</highlight-box>
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
    - <highlight-box>Event鼠标位置属性</highlight-box>
        - clientX	返回当事件被触发时，鼠标指针的水平坐标。
        - clientY	返回当事件被触发时，鼠标指针的垂直坐标。
        - screenX	返回当某个事件被触发时，鼠标指针的水平坐标。
        - screenY	返回当某个事件被触发时，鼠标指针的垂直坐标。

    - <highlight-box>Event方法</highlight-box>
        - preventDefault() 阻止默认行为(比如阻止链接默认跳转行为)
        - stopPropagation() 阻止捕获和冒泡阶段中当前事件的进一步传播。
        - stopImmediatePropagation() 优先级(绑定了ab两个事件，a事件中写了此函数，那么b就不会执行)
    
<mark-check id="zidingyievent"></mark-check>
- <highlight-box>自定义事件</highlight-box>
    ```js
    // 声明
    var eve=new Event('custome');
    ev.addEventListener('custome',function(){})
    // 触发
    ev.dispatchEvent(eve);
    ```


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
```javascript
var p1 = document.getElementById('p1')
var body = document.body
bindEvent(p1, 'click', function (e) {
    e.stopPropagation() // 注释掉这一行，来体会事件冒泡
    alert('激活')
})
bindEvent(body, 'click', function (e) {
    alert('取消')
})
```

#### 事件委托/代理
- 使用
  - e.target // 目标DOM节点
<mark-check id="shijiandaili"></mark-check>
- <highlight-box>代理的优点</highlight-box>
  - 利用事件冒泡的机制，只需要绑定一个父元素的事件，就可以监听所有子元素的事件并绑定。
  - 解决了动态添加的元素绑定事件的问题
  - 代码简洁，减少浏览器的内存占用
<mark-check id="shijiandailidemo"></mark-check>
```html
<!-- 例 -->
<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
</div>
<button>点击增加一个 a 标签</button>
<!-- <script>
    var div1 = document.getElementById('div1')
    div1.addEventListener('click', function (e) {
        var target = e.target
        if (target.nodeName === 'A') {
            alert(target.innerHTML)
        }
    })
</script> -->
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
  ```js
    // navigator
    var ua = navigator.userAgent
    var isChrome = ua.indexOf('Chrome')
    console.log(isChrome)
  ```
  - screen
    - screen.width
    - screen.height
  - location
    ```js
    var url = document.createElement('a');
    url.href = 'https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container';
    console.log(url.href);      // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
    console.log(url.protocol);  // https:
    console.log(url.host);      // developer.mozilla.org
    console.log(url.hostname);  // developer.mozilla.org
    console.log(url.port);      // (blank - https assumes port 443)
    console.log(url.pathname);  // /en-US/search
    console.log(url.search);    // ?q=URL
    console.log(url.hash);      // #search-results-close-container 
    console.log(url.origin);    // https://developer.mozilla.org
    ```
    - hash
        - onhashchange事件监听变化
  - history
    - back() // 跳到上一个路径
    - forward()// 跳到下一个路径
    - go(0) // 跳到某个路径（参数索引）
    - length // 地址的数量
    - pushState() // 放入一个新地址，并跳到新地址
        
        - data
        - title
        - url
        ```js
        history.pushState({name:'新路径'},'新路径','/newpath')
        ```
    - replaceState() // 替换当前的地址
        ```js
        history.replaceState({name:'新路径'},'新路径','/newpath')
        ```
    - state // push或者replace时传的状态
        ```js
        {
            name:"新路径"
        }
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

<mark-check id="view2"></mark-check>

### 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件

使用代理，优点

- 使代码简洁
- 减少浏览器的内存占用



## ajax
<mark-check id="xmlhttprequest"></mark-check>
### <highlight-box>XMLHttpRequest</highlight-box>
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
- 只能是get请求，后端需要返回固定格式
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

#### cors
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

虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为简单请求和复杂请求。

- 简单请求
- 
以 Ajax 为例，当满足以下条件时，会触发简单请求

使用下列方法之一：

- GET

- HEAD

- POST

Content-Type 的值仅限于下列三者之一：

- text/plain

- multipart/form-data

- application/x-www-form-urlencoded

请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器； XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。

- 复杂请求

那么很显然，不符合以上条件的请求就肯定是复杂请求了。

对于复杂请求来说，首先会发起一个预检请求，该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。

对于预检请求来说，如果你使用过 Node 来设置 CORS 的话，可能会遇到过这么一个坑。

以下以 express 框架举例：
```js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  )
  next()
})
```
该请求会验证你的 Authorization 字段，没有的话就会报错。

当前端发起了复杂请求后，你会发现就算你代码是正确的，返回结果也永远是报错的。因为预检请求也会进入回调中，也会触发 next 方法，因为预检请求并不包含 Authorization 字段，所以服务端会报错。

想解决这个问题很简单，只需要在回调中过滤 option 方法即可
```js
res.statusCode = 204
res.setHeader('Content-Length', '0')
res.end()
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

WebSocket 方法

|方法|	描述|
|:-----:|:----:|
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
  ```js
    document.cookie='a=1; b=2'
  ```
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

- localStorage 5m 一直存 不能跨域 存储的地方是浏览器
- sessionStorage 不关浏览器就存活
- cookie  4k 每次请求时携带 一般做注册登录，存放不敏感信息（密码 账户不能存）不安全
    - 不能跨域设置cookie，但可以一级域名和二级域名设置
- session 比较安全 内容存放在服务端的(session 是基于cookie) 目前 注册登录 大致的流程 默认登录后 给你个标识 每次请求时 会自动带上cookie 可以通过session找到当前账户对应的内容
    - 服务器内存中，重启后没了，会存放到数据库中

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

