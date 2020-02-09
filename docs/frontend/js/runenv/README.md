# 【5. 运行环境】
[[toc]]
## HTTP协议

- HTTP协议的主要特点
    - 简单快速(每个资源是固定的，处理起来简单，访问资源输入URI就行)
    - 灵活（每个http协议头部分有个类型，可请求不同类型资源）
    - 无连接【重要】（连接一次就会断掉，不会保持连接）
    - 无状态【重要】（客户端和服务端是两种身份，单http协议上是不能区分两次连接的身份的）
- HTTP报文的组成部分
  - 请求报文
      - 请求行
        - http方法
        - 页面地址
        - http协议以及版本
      - 请求头
        - key,value值告诉服务端我要哪些内容，哪些类型
      - 空行
        - 请求头和请求体的分割
      - 请求体
        - 数据部分
```md
<!-- 请求行 -->
POST /search HTTP/1.1  
<!-- 请求头 -->
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel, application/vnd.ms-powerpoint, 
application/msword, application/x-silverlight, application/x-shockwave-flash, */*  
Referer: <a href="http://www.google.cn/">http://www.google.cn/</a>  
Accept-Language: zh-cn  
Accept-Encoding: gzip, deflate  
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; TheWorld)  
Host: <a href="http://www.google.cn">www.google.cn</a>  
Connection: Keep-Alive  
Cookie: PREF=ID=80a06da87be9ae3c:U=f7167333e2c3b714:NW=1:TM=1261551909:LM=1261551917:S=ybYcq2wpfefs4V9g; 
NID=31=ojj8d-IygaEtSxLgaJmqSjVhCspkviJrB6omjamNrSm8lZhKy_yMfO2M4QMRKcH1g0iQv9u-2hfBW7bUFwVh7pGaRUb0RnHcJU37y-
FxlRugatx63JLv7CWMD6UB_O_r  

hl=zh-CN&source=hp&q=domety
```
  - 响应报文
      - 状态行
      - 响应头
      - 空行
      - 响应体
```md
<!-- 状态行 -->
HTTP/1.1 200 OK
<!-- 响应头 -->
Date: Sat, 31 Dec 2005 23:59:59 GMT
Content-Type: text/html;charset=ISO-8859-1
Content-Length: 122

＜html＞
＜head＞
＜title＞Wrox Homepage＜/title＞
＜/head＞
＜body＞
＜!-- body goes here --＞
＜/body＞
＜/html＞
```
- HTTP方法
  - get(获取资源)
  - post(传输资源)
  - put(更新资源)
  - delete(删除资源)
  - options(试探请求，跨域时会用到)
  - head(获得报文首部)

  - 前四个叫做resful风格
  <mark-check id="post&get"></mark-check>
- <highlight-box>POST和GET的区别</highlight-box>
  - <underline-box>GET在浏览器回退时是无害的，而POST会再次提交请求</underline-box>
  - <underline-box>GET请求会被浏览器主动缓存，而POST不可以</underline-box>
  - <underline-box>GET请求参数会被完整保留在浏览器历史纪录里，而POST中的参数不会被保留</underline-box>
  - <underline-box>GET请求在URL中传送的参数是有长度限制的，而POST没有限制</underline-box>
    - 不同浏览器不一样，如果使用get请求，拼接的url不能太长，否则会被浏览器截断，http协议对长度有限制，所以太长发不出去，会截断
  - <underline-box>对参数的数据类型，GET只接受ASCII字符，而POST没有限制</underline-box>
  - <underline-box>GET参数通过URL传递，POST放在Request body中（了解）</underline-box>
  - GET产生的URL可以被收藏，而POST不可以(可不记)
  - GET请求只能进行url编码，而POST支持多种编码方式(可记可不记)
  - GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息(了解)
- HTTP状态码

  | 状态  | 含义    |      |
  | ---- | ------------------------------ | ---- |
  | 1XX  | Informational(信息性状态码)    |      |
  | 2XX  | Success(成功状态码)            |      |
  | 3XX  | Redirection(重定向)            |      |
  | 4XX  | Client Error(客户端错误状态码) |      |
  | 5XX  | Server Error(服务器错误状态吗) |      |

  - 2XX 成功
    - 200 OK 客户端发过来的数据被正常处理
    - 204 Not Content 正常响应，没有实体
    - 206 Partial Content 范围请求，返回部分数据，响应报文中由Content-Range指定实体内容(较多，audio,video标签，文件很大时会返回这个)
    ```js
    curl -v --header "Range:bytes=0-3" https://www.baidu.com/
    ```
  - 3XX 重定向
    - 301 Moved Permanently：永久重定向(换域名)
    - 302 Found：临时重定向，规范要求方法名不变，但是都会改变
    - 303(See Other) 和302类似，但必须用GET方法
    - 304 Not Modified：配合(If-Match、If-Modified-Since、If-None_Match、If-Range、If-Unmodified-Since)。客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来的缓冲文档还可以继续使用
    - 307(Temporary Redirect) 临时重定向，不该改变请求方法
  - 4XX 客户端错误
    - 400 Bad Request：请求报文语法错误
    - 401 Unauthorized：需要认证（没权限）
    - 403 Forbidden：服务器拒绝访问对应的资源(较多，某页面的地址只能通过服务器来访问)
    - 404 Not Found：服务器上无法找到资源
  - 5XX 服务器端错误
    - 500 Internal Server Error：服务器故障
    - 503 Server Unavailable：服务器处于超负载或正在停机维护

- <highlight-box>什么是持久连接</highlight-box>
    - http普通模式是无连接无状态，但是<underline-box>可设置keep-alive模式支持持久链接</underline-box>，当出现对服务器的后继请求事，避免了建立或者重新建立连接。从http1.1版本开始才支持。
- <highlight-box>什么是管线化</highlight-box>
  - <underline-box>普通持久连接</underline-box>
    - <underline-box>请求1->响应1->请求2->响应2->请求3->响应3</underline-box>
  - <underline-box>管线化持久连接</underline-box>
    - <underline-box>请求1->请求2->请求3->响应1->响应2->响应3(请求打包过去，响应打包发回来)</underline-box>
    - <underline-box>管线化机制通过持久连接完成，http1.1才支持</underline-box>
    - <underline-box>只有GET和HEAD请求可以管线化，而POST有所限制</underline-box>
    - <underline-box>初次创建连接不应启动管线机制，因为对方服务器不一定支持http/1.1版本的协议</underline-box>
    - 管线化不会影响响应到来的顺序
    - http/1.1要求服务端支持管线化，但并不要求服务端对响应进行管线化处理，只要求对管线化的请求不失败即可
    - 因为以上服务端问题，开启管线化可能并不会大幅度提升性能，而且很多服务器和代理程序对管线化支持并不好，因此Chrome和Firefox默认并未开启管线化支持

## 页面加载

### 浏览器加载资源的过程

<mark-check id="jiazaiziyuan"></mark-check>
#### 加载资源的形式

- 输入 url 加载 html
- http://coding.m.imooc.com
- 加载 html 中的静态资源
- `<script src="/static/js/jquery.js"></script>`

<mark-check id="url2html"></mark-check>
#### 从输入url到得到html的过程

- 浏览器根据 DNS 服务器得到域名的 IP 地址
- 向这个 IP 的机器发送 http 请求
- 服务器收到、处理并返回 http 请求
- 浏览器得到返回内容

<mark-check id="yemianxuanran"></mark-check>
### 浏览器渲染页面的过程

- 根据 HTML 结构生成 DOM Tree
- 根据 CSS 生成 CSS Rule
- 将 DOM 和 CSSOM 整合形成 RenderTree
- 根据 RenderTree 开始渲染和展示
- 遇到`<script>`时，会执行并阻塞渲染

### 为何要把 css 放在 head 中

### 为何要把 JS 放在 body 最后

<mark-check id="onloadDomContentLoaded"></mark-check>
### `window.onload`和`DOMContentLoaded`区别

```js
window.addEventListener('load', function () {
    // 页面的全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', function () {
    // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
})
```

<mark-check id="xingnengyouhua"></mark-check>
## 性能优化
- 原则
  - 多使用内存、缓存或者其他方法
  - 减少 CPU 计算、较少网络

### <highlight-box>加载资源优化</highlight-box>

- 静态资源的压缩合并（JS代码压缩合并、CSS代码压缩合并、雪碧图）
- 静态资源缓存（资源名称加 MD5 戳）
- 使用 CND 让资源加载更快
- 使用 SSR 后端渲染，数据直接突出到 HTML 中

### <highlight-box>渲染优化</highlight-box>

- CSS 放前面 JS 放后面
- 尽早执行操作（`DOMContentLoaded`）
- 懒加载（图片懒加载、下拉加载更多）
- 减少DOM 查询，对 DOM 查询做缓存
- 减少DOM 操作，多个操作尽量合并在一起执行（`DocumentFragment`）
- 事件节流


### 详细解说

#### 静态资源的压缩合并

如果不合并，每个都会走一遍之前介绍的请求过程

```html
<script src="a.js"></script>
<script src="b.js"></script>
<script src="c.js"></script>
```

如果压缩了，就只走一遍请求过程

```html
<script src="abc.js"></script>
```

#### 静态资源缓存

通过连接名称控制缓存

```html
<script src="abc_1.js"></script>
```

只有内容改变的时候，链接名称才会改变

```html
<script src="abc_2.js"></script>
```

#### 使用 CND 让资源加载更快

```html
<script src="https://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
```

#### 使用 SSR 后端渲染

如果提到 Vue 和 React 时，可以说一下

#### CSS 放前面 JS 放后面

将浏览器渲染的时候，已经提高

#### 懒加载

一开始先给为 src 赋值成一个通用的预览图，下拉时候再动态赋值成正式的图片

```html
<img src="preview.png" data-realsrc="abc.png"/>
```

#### DOM 查询做缓存

两端代码做一下对比

```js
var pList = document.getElementsByTagName('p')
var i
for (i = 0; i < pList.length; i++) {
}
```

```js
var i
for (i = 0; i < document.getElementsByTagName('p').length; i++) {
}
```

总结：DOM 操作，无论查询还是修改，都是非常耗费性能的，尽量减少

#### 合并 DOM 插入

DOM 操作是非常耗费性能的，因此插入多个标签时，先插入 Fragment 然后再统一插入DOM

```js
var listNode = document.getElementById('list')
// 要插入 10 个 li 标签
var frag = document.createDocumentFragment();
var x, li;
for(x = 0; x < 10; x++) {
    li = document.createElement("li");
    li.innerHTML = "List item " + x;
    frag.appendChild(li);
}
listNode.appendChild(frag);
```

<mark-check id="fangdoujieliu"></mark-check>

#### 防抖和节流
- 优化高频时间 onscroll oninput resize onkeyup keydown 降低代码执行频率
- 用户scroll和resize行为导致页面不断地重新渲染，如果在绑定的回调函数中大量操作dom也会出现页面卡顿
- 要在文字改变时触发一个 change 事件，通过 keyup 来监听。
- <highlight-box>防抖</highlight-box>
  - <highlight-box>对于短时间内连续触发的事件（上面的滚动事件），防抖的含义就是让某个时间期限（如上面的1000毫秒）内，事件处理函数只执行一次。只执行最后一次</highlight-box>
  - underscore的debounce方法 松手后隔会再执行
```js
var textarea = document.getElementById('text')
var timeoutId
textarea.addEventListener('keyup', function () {
    if (timeoutId) {
        clearTimeout(timeoutId)// 如果有连续动作，那取消执行。直到1s内没有第二次点击，才不会取消执行。
    }
    timeoutId = setTimeout(function () {
        console.log('内容修改了')
    }, 1000)
})

// debounce
function debounce(func,wait,immediate){
  let timeout;
  return function(){
    clearTimeout(timeout);
    if(immediate){
      let callNow=!timeout;
      if(callNow) func.apply(this,arguments);
    }
    timeout=setTimeout(()=>{
      func.apply(this,arguments);
      timeout=null;
    },wait);
  }
}

function logger(){
  console.log('logger');
}
// 第三个参数表示首次点击有效果，之后就没效果了
btn.addEventListener('click',debounce(logger,1000,true))

```

- <highlight-box>节流(Throttle)</highlight-box>
  - <highlight-box>保证一段时间内，核心代码只执行一次。函数执行一次后，在某个时间段内暂时失效，过了这段时间后再重新激活（类似于技能冷却时间）。</highlight-box>
  - underscore库中的throttle方法
```js
var textarea = document.getElementById('text')
var valid = true;// 事件功能有效
textarea.addEventListener('keyup', function() {
    if (!valid) {
        return false;
    }
    valid = false;// 事件功能失效
    timeoutId = setTimeout(function() {
        console.log('内容修改了')
        valid = true;// 事件功能有效
    }, 1000)
})

// 节流
let btn=document.getElementById('btn');

// 问题：最后一次不能触发，但希望最后一次可以触发
// function throttle(func,wait){
//   let previous=0;
//   return function (){
//     let now=Date.now();
//     if(now-previous>wait){
//       func.apply(this,arguments);
//       previous=now;
//     }
//   }
// }

function throttle(func,wait,options){
  // trailing最后一次应该触发（默认触发）
  let args,context,previous=0,timeout;
  let later=function(){
    previous=options.leading===false?0:Date.now();
    func.apply(context,args);
    args=context=null;
  }
  let throttled=function (){
    args=arguments;
    context=this;
    let now=Date.now();
    if(!previous&&options.leading===false) previous=now;
    let remaning=wait-(now-previous);
    if(remaining<=0){
      // 第一次
      if(timeout){
        clearTimeout(timeout);
        timeout=null;
      }
      func.apply(context,args);
      previous=now;
    }else if(!timeout && options.trailing!==false){
      timeout=setTimeout(later,remaning);
    }
  }
  return throttled;
}

function logger(){
  console.log('logger');
}
btn.addEventListener('click',throttle(logger,1000,{trailing:true}))


```

- loadash库中，将两个合起来成为一个
```html
<head>
  <script src="./debounce.js"></script>
  <script src="./throttle.js"></script>
</head>
<body>
  <div id="btn">点击</div>
  <script>
    function logger(e) {
      console.log('logger',e);
    }
    // 第三个参数 表示首次 先触发一下
    btn.addEventListener('click', throttle(logger,1000,false));
  </script>
</body>
```
```js
// debounce.js
// 防抖 + 节流
// debounce 就是上来后 先开一个定时 只要一直点击  到时间什么都不做 就在开一个定时器
function debounce(func, wait, opts = {}) {
  let maxWait;
  if ('maxWait' in opts) {
    maxWait = opts.maxWait;
  }
  let leading = true; // 第一次点击时触发
  let trailing = true; // 最后一次也要触发
  // loadash 定时器实现的
  let lastCallTime; // 最后调用的时间 previous
  let timeout;
  let lastThis; // 返回函数的this
  let lastArgs; // 返回函数的参数
  // shouldInvoke 是否应该调用
  let lastInvokeTime;
  let shouldInvoke = function (now) {
    let sinceLastTime = now - lastCallTime;
    let sinceLastInvoke = now - lastInvokeTime;
    // 第一次
    return lastCallTime === undefined || sinceLastTime > wait || sinceLastInvoke >= maxWait;
  }
  // leadingEdge 是否第一次执行
  let invokeFunc = function (time) {
    lastInvokeTime = time; // 最终的调用函数的时间
    func.apply(lastThis, lastArgs);
  }
  // startTimer就是开启了一个定时器
  let startTimer = function (timerExpired, wait) {
    timeout = setTimeout(timerExpired, wait);
  }
  let remainingWait = function (now) {
    return wait - (now - lastCallTime);
  }
  let trailingEdge = function (time) {
    timeout = undefined;
    if (trailing) {
      invokeFunc(time);
    }
  }
  let timerExpired = function () {
    let now = Date.now(); // 当前定时器到时间了 看看是否需要执行这个函数
    if (shouldInvoke(now)) { // 如果需要调用
      // 触发结束的方法
      return trailingEdge(now);
    }
    startTimer(timerExpired, remainingWait(now));
  }
  let leadingEdge = function (time) {
    lastInvokeTime = time;
    if (leading) { // 需要执行就调用函数
      invokeFunc(time)
    }
    startTimer(timerExpired, wait); // 开启一个定时器 看下一次定时器到了 是否需要执行func
  }
  let debounced = function (...args) {
    lastThis = this;
    lastArgs = args;
    let now = Date.now();
    // 判断当前的debounce时是否需要执行
    let isInvoking = shouldInvoke(now);
    lastCallTime = now;
    if (isInvoking) {
      if (timeout === undefined) {
        leadingEdge(now);
      }
    }
  }
  return debounced;
}
```
```js
// throttle.js
function throttle(func,wait) {
  return debounce(func, wait,{ // maxWait最大的点击时间
    maxWait:wait
  });
}
```
```html
<body style="height:20000000px">
  <script>
    let flag = false;
    function scroll() {
      if(!flag){
        flag = true
        requestAnimationFrame(loggeer)
      }
    }
    function loggeer() {
      console.log('logger');
      flag = false;
    }
    window.addEventListener('scroll',scroll)
    </script>
</body>
```
<mark-check id="fangdoujieliuyingyong"></mark-check>
- 应用
  - 搜索框input事件，例如要支持输入实时搜索可以使用节流方案（间隔一段时间就必须查询相关内容），或者实现输入间隔大于某个值（如500ms），就当做用户输入完成，然后开始搜索，具体使用哪种方案要看业务需求。
  - 页面resize事件，常见于需要做页面适配的时候。需要根据最终呈现的页面情况进行dom渲染（这种情形一般是使用防抖，因为只需要判断最后一次的变化情况）
#### 尽早执行操作

```js
window.addEventListener('load', function () {
    // 页面的全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', function () {
    // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
})
```

## 安全性

### 推荐书
- 阅读《白帽子讲web安全》

### web 攻击方式

- SQL注入
  - 例如做一个系统的登录界面，输入用户名和密码，提交之后，后端直接拿到数据就拼接 SQL 语句去查询数据库。如果在输入时进行了恶意的 SQL 拼装，那么最后生成的 SQL 就会有问题。但是现在稍微大型的一点系统，都不会这么做，从提交登录信息到最后拿到授权，都经过层层的验证。因此，SQL 注入都只出现在比较低端小型的系统上。

- XSS
  - 基本概念和缩写
    - Cross Site Scripting，【记】跨站脚本攻击
  - 攻击原理
    - 与CSRF区别，不需要任何验证，通过合法方式向页面注入js，比如评论
  - 攻击类型
    - 反射型
      - 查询的参数里有代码
      - 查询参数用encodeURIComponent编译即可。
      ```js
      // index.js
      router.get('/', function(req, res, next) {
        // 关闭浏览器的XSS拦截
        res.set('X-XSS-Protection',0)
        res.render('index', { title: 'Express',xss:req.query.xss });
      });

      // index.ejs
      <div class="">
          <%- xss %>
      </div>

      // 篡改页面内容，自动触发
      `http://localhost:3000/?xss=<img src="null" onerror="alert(1)"/>`
      // 篡改页面内容，引诱触发
      `http://localhost:3000/?xss=<p onclick="alert('点我')">点我</p>`
      // 篡改页面内容，最简单的广告插入
      `http://localhost:3000/?xss=<iframe src="//baidu.com/t.html"></iframe>`
      ```
    - DOM-Based
      - 基于后端
    - 存储型
      - 恶意脚本存储到了服务器上，所有人访问都会有问题，比反射性和DOM-Baseed范围更大
  - 攻击方式
    - 盗用cookie，获取敏感信息
    - 破坏页面结构，插入一些内容
    - 利用flash，了解即可
    - DDOS(分布式拒绝服务攻击)，是目前最为强大最难以防御的攻击方式之一。
      - DOS攻击：利用合理的客户端请求来占用过多的服务器资源，从而使合法用户无法得到服务器的响应
      - DDOS是在传统的DOS攻击上产生的一类攻击方式
    - ServerlimitDOS(当http header过长的时候，web server会产生一个400或者是4开头的错误，如果这些超长的数据保存在cookie中，能够让用户每次访问的时候造成http头超长，导致一些用户无法访问域名)
  <mark-check id="xssfangyu"></mark-check>
  - 防御
    - 客户端传递给服务器时，需要先校验过滤一下
    - 服务端再做一次过滤
    - 直接在输出的时候过滤
    ```js
    function html_encode(str){
      var s='';
      if(str.length==0) return "";
      s=str.replace(/&/g,"&amp;");
      s=s.replace(/</g,"&lt;");
      s=s.replace(/>/g,"&gt;");
      s=s.replace(/\s/g,"&nbsp;");
      s=s.replace(/\'/g,"&#39;");
      s=s.replace(/\"/g,"&quot;");
      s=s.replace(/\n/g,"<br/>");
      console.log('s',s)
      return s;
    }
    ```

    1. <highlight-box>转义</highlight-box>
      - 对用户输入的数据进行HTML Entity转义，显示为转义字符
      <absolute-box>两种转义字符的方式：<br/>1. 反斜杠加在特定的字符之前表示转义。<br/>2. 使用HTML Entity转义字符串</absolute-box>

      | 转义字符 | 意义                                | ASCII码值（十进制） |
      | -------- | ----------------------------------- | ------------------- |
      | \a       | 响铃(BEL)                           | 007                 |
      | \b       | 退格(BS) ，将当前位置移到前一列     | 008                 |
      | \f       | 换页(FF)，将当前位置移到下页开头    | 012                 |
      | \n       | 换行(LF) ，将当前位置移到下一行开头 | 010                 |
      | \r       | 回车(CR) ，将当前位置移到本行开头   | 013                 |
      | \t       | 水平制表(HT) （跳到下一个TAB位置）  | 009                 |
      | \v       | 垂直制表(VT)                        | 011                 |
      | \\       | 代表一个反斜线字符''\'              | 092                 |
      | \'       | 代表一个单引号（撇号）字符          | 039                 |
      | \"       | 代表一个双引号字符                  | 034                 |
      | \?       | 代表一个问号                        | 063                 |
      | \0       | 空字符(NUL)                         | 000                 |
      | \ddd     | 1到3位八进制数所代表的任意字符      | 三位八进制          |
      | \xhh     | 十六进制所代表的任意字符            | 十六进制            |

      |字符|HTML实体编号|HTML实体名称|
      |:---:|:---:|:---:|
      |     "      | \&#34;  | \&quot; |
      |     &      | \&#38;  | \&amp;  |
      |     <      | \&#60;  |  \&lt;  |
      |     >      | \&#62;  |  \&gt;  |
      | 不断开空格   | \&#160; | \&nbsp; |

    :::tip
    转义字符串(Escape Sequence)，即字符实体(Character Entity)分成三部分:第一部分是一个&符号，英文叫ampersand;第二部分是实体(Entity)名字或者是#加上实体(Entity)编号;第三部分是一个分号。
    :::
    
    2. <highlight-box>过滤</highlight-box>
      - 移除用户上传的DOM属性，如onerror等
      - 移除用户上传的Style节点、Script节点、Iframe节点等。
    3. <highlight-box>校正</highlight-box>
      - 避免直接对HTML Entity解码
      - 使用DOM Parse转换，矫正不配对的DOM标签

  - 实战
  - 插件库
    - encode.js：可以使用https://github.com/mathiasbynens/he 中的he.js
    - domParse：可以用https://github.com/blowsie/Pure-JavaScript-HTML5-Parser 中的htmlparser.js
```html
// 通过构建Node服务和简历一个评论功能，实例演示XSS的攻击及预防
// index.ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <script src="/javascripts/encode.js"></script>
    <script src="/javascripts/domParse.js"></script>
    <script>
      var parse=function(str){
        var results='';
        try{
          // 先反转义（解码），再domparse
          HTMLParser(he.unescape(str,{strict:true}),{
            start:function(tag,attrs,unary){
              // 开始标签
              // 【防xss】2. 过滤危险标签
              // style标签可控制元素是否显示
              // iframe通常用来插入广告（是跨域的）
              if(tag=='script'||tag=='style'||tag=='link'||tag=='iframe') return;
              results+='<'+tag;
              // 【防xss】3. 所有属性都不添加，即去掉了onclick onerror等等
              // for(var i=0,len=attrs.length;i<len;i++){
              //   results+=" "+attrs[i].name+'="'+attrs[i].escaped+'"';
              // }
              results+=(unary?"/":"")+">";
            },
            end:function(tag){
              // 结束标签
              results+="</"+tag+">";
            },
            chars:function(text){
              // 标签中间部分
              results+=text;
            },
            comment:function(text){
              // 注释部分
              results+="<!--"+text+"-->";
            }
          })
          return results
        }catch(e){
          console.log(e)
        }finally{

        }
      }
    </script>
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <textarea name="" id="txt" cols="30" rows="10">
      <p>sks <img src="/1.jpg" alt="" onerror="alert(1)" /></p>
    </textarea>
    <button id="btn">评论</button>
    <button id="get">获取评论</button>

    <script>
      var btn=document.getElementById("btn");
      var get=document.getElementById("get");
      var txt=document.getElementById("txt")
      btn.addEventListener('click',function(){
        var xhr=new XMLHttpRequest();
        var url='/comment?comment='+txt.value;
        xhr.open('GET',url,true);
        xhr.onreadystatechange=function(){
          if(xhr.readyState===4){
            if(xhr.status===200){
              console.log(xhr);
            }else{
              console.log('error');
            }
          }
        }
        xhr.send();
      });
      get.addEventListener('click',function(){
        var xhr=new XMLHttpRequest();
        var url='/getComment';
        xhr.open('GET',url,true);
        xhr.onreadystatechange=function(){
          if(xhr.readyState===4){
            if(xhr.status===200){
              var com=parse(JSON.parse(xhr.response).comment);
              // var com=JSON.parse(xhr.response).comment;
              console.log(com);
              var txt=document.createElement('span');
              txt.innerHTML=com;
              document.body.appendChild(txt);
            }else{
              console.log('error');
            }
          }
        }
        xhr.send();
      })
    </script>

  </body>
</html>
```

```js
// index.js
var express = require('express');
var router = express.Router();

var comments={};

// 【防xss】1.字符转义，前端或者后端做都可以
function html_encode(str){
  var s='';
  if(str.length==0) return "";
  s=str.replace(/&/g,"&amp;");
  s=s.replace(/</g,"&lt;");
  s=s.replace(/>/g,"&gt;");
  s=s.replace(/\s/g,"&nbsp;");
  s=s.replace(/\'/g,"&#39;");
  s=s.replace(/\"/g,"&quot;");
  s=s.replace(/\n/g,"<br/>");
  console.log('s',s)
  return s;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/comment',function(req,res,next){
  comments.v=html_encode(req.query.comment);
  // comments.v=req.query.comment;
  console.log('插入的',comments.v)
  
})

router.get('/getComment',function(req,res,next){
  console.log(comments.v)
  res.json({
    comment:comments.v
  })
})

module.exports = router;

```
- CSRF
  - 基本概念和缩写
    - Cross-site request forgery，【记】跨站请求伪造
  - 攻击原理
    - <img :src="$withBase('/img/攻击原理.jpg')">
  - 防御措施
    - Token验证(链接自动携带cookie，但是不会自动携带token)
    - Referer验证(页面来源，判断来源是否是本站点下的页面)
    - 隐藏令牌(隐藏在http header头中)

- XSS和CSRF区别
  - XSS是上传输入的js脚本，并执行
  - CSRF是需要用户已登录，帮你自动执行接口