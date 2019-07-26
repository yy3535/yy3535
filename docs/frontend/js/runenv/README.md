# 运行环境
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
  - GET(获取资源)
  - POST(传输资源)
  - PUT(更新资源)
  - DELETE(删除资源)
  - HEAD(获得报文首部)
- POST和GET的区别（记住三到四个）
  - 【记】GET在浏览器回退时是无害的，而POST会再次提交请求
  - GET产生的URL可以被收藏，而POST不可以(可不记)
  - 【记】GET请求会被浏览器主动缓存，而POST不可以
  - GET请求只能进行url编码，而POST支持多种编码方式(可记可不记)
  - 【记】GET请求参数会被完整保留在浏览器历史纪录里，而POST中的参数不会被保留
  - 【记】GET请求在URL中传送的参数是有长度限制的，而POST没有限制
    - 【记】不同浏览器不一样，如果使用get请求，拼接的url不能太长，否则会被浏览器截断，http协议对长度有限制，所以太长发不出去，会截断
  - 【重要】对参数的数据类型，GET只接受ASCII字符，而POST没有限制
  - GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息(了解)
  - 【记】GET参数通过URL传递，POST放在Request body中（了解）
- HTTP状态码
  - 记忆
    - 1xx：指示信息-表示请求已接受，继续处理
    - 2xx：成功-表示请求已被成功接收
    - 3xx：重定向-要完成请求必须进行更进一步的操作
    - 4xx：客户端错误-请求有语法错误或请求无法实现
    - 5xx：服务端错误-服务器未能实现合法的请求
  - 具体
    - 200 OK：客户端请求成功
    - 206 Partial Content：客户发送了一个带有Range头的GET请求，服务器完成了它(较多，audio,video标签，文件很大时会返回这个)
    - 301 Moved Permanently：所请求的页面已经转移至新的url
    - 302 Found：所请求的页面已经临时转移至新的url
    - 304 Not Modified：客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来的缓冲问答那个还可以继续使用
    - 400 Bad Request：客户端请求有语法错误，不能被服务器所理解
    - 401 Unauthorized：请求未经授权，这个状态码必须和WWW-Authenticate报头域一起使用
    - 403 Forbidden：对被请求页面的访问被禁止(较多，某页面的地址只能通过服务器来访问)
    - 404 Not Found：请求资源不存在(较多，请求一个不存在的地址)
    - 500 Internal Server Error：服务器发送不可预期的错误原来缓冲的文档还可以继续使用(一般服务端处理)
    - 503 Server Unavailable：请求未完成，服务器临时过载或当机，一段时间后可能会恢复正常(一般服务端处理)
- 什么是持久连接
    - http普通模式是无连接无状态，但是可设置keep-alive模式支持持久链接，当出现对服务器的后继请求事，避免了建立或者重新建立连接。从http1.1版本开始才支持。
- 什么是管线化
  - 普通持久连接
    - 请求1->响应1->请求2->响应2->请求3->响应3
  - 管线化持久连接
    - 【记】【原理】请求1->请求2->请求3->响应1->响应2->响应3(请求打包过去，响应打包发回来)
    - 【记】管线化机制通过持久连接完成，http1.1才支持
    - 【记】只有GET和HEAD请求可以管线化，而POST有所限制
    - 【记】初次创建连接不应启动管线机制，因为对方服务器不一定支持http/1.1版本的协议
    - 管线化不会影响响应到来的顺序
    - http/1.1要求服务端支持管线化，但并不要求服务端对响应进行管线化处理，只要求对管线化的请求不失败即可
    - 因为以上服务端问题，开启管线化可能并不会大幅度提升性能，而且很多服务器和代理程序对管线化支持并不好，因此Chrome和Firefox默认并未开启管线化支持

## 页面加载

### 浏览器加载资源的过程

#### 加载资源的形式

- 输入 url 加载 html
- http://coding.m.imooc.com
- 加载 html 中的静态资源
- `<script src="/static/js/jquery.js"></script>`

#### 从输入url到得到html的过程

- 浏览器根据 DNS 服务器得到域名的 IP 地址
- 向这个 IP 的机器发送 http 请求
- 服务器收到、处理并返回 http 请求
- 浏览器得到返回内容

### 浏览器渲染页面的过程

- 根据 HTML 结构生成 DOM Tree
- 根据 CSS 生成 CSS Rule
- 将 DOM 和 CSSOM 整合形成 RenderTree
- 根据 RenderTree 开始渲染和展示
- 遇到`<script>`时，会执行并阻塞渲染

### 为何要把 css 放在 head 中

### 为何要把 JS 放在 body 最后

### `window.onload`和`DOMContentLoaded`区别

```js
window.addEventListener('load', function () {
    // 页面的全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', function () {
    // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
})
```

## 性能优化
- 原则
  - 多使用内存、缓存或者其他方法
  - 减少 CPU 计算、较少网络

### 加载资源优化

- 静态资源的压缩合并（JS代码压缩合并、CSS代码压缩合并、雪碧图）
- 静态资源缓存（资源名称加 MD5 戳）
- 使用 CND 让资源加载更快
- 使用 SSR 后端渲染，数据直接突出到 HTML 中

### 渲染优化

- CSS 放前面 JS 放后面
- 懒加载（图片懒加载、下拉加载更多）
- 减少DOM 查询，对 DOM 查询做缓存
- 减少DOM 操作，多个操作尽量合并在一起执行（`DocumentFragment`）
- 事件节流
- 尽早执行操作（`DOMContentLoaded`）

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

#### 事件节流

例如要在文字改变时触发一个 change 事件，通过 keyup 来监听。使用节流。

```js
var textarea = document.getElementById('text')
var timeoutId
textarea.addEventListener('keyup', function () {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(function () {
        // 触发 change 事件
    }, 100)
})
```

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
      - 发出请求时，XSS代码出现在URL中，作为输入提交到服务器端，服务器端解析后响应，XSS代码随响应内容一起传回浏览器，最好浏览器解析执行XSS代码。
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
    - 存储型
      - 和反射型XSS差别在于，提交的代码会存储在服务器端（数据库，内存，文件系统等），下次请求目标页面时不用再提交XSS代码
  - 攻击方式
    - 盗用cookie，获取敏感信息
    - 破坏页面结构，插入一些内容
    - 利用flash，了解即可
    - DDOS(分布式拒绝服务攻击)，是目前最为强大最难以防御的攻击方式之一。
      - DOS攻击：利用合理的客户端请求来占用过多的服务器资源，从而使合法用户无法得到服务器的响应
      - DDOS是在传统的DOS攻击上产生的一类攻击方式
    - ServerlimitDOS(当http header过长的时候，web server会产生一个400或者是4开头的错误，如果这些超长的数据保存在cookie中，能够让用户每次访问的时候造成http头超长，导致一些用户无法访问域名)
  - 防御措施（让插入的js不可执行）
    - 编码(转义)
      - 对用户输入的数据进行HTML Entity编码，显示为转义字符

      |-|字符|十进制|转义字符|
      |:---:|:---:|:---:|:---:|
      |     "      | \&#34;  | \&quot; |
      |     &      | \&#38;  | \&amp;  |
      |     <      | \&#60;  |  \&lt;  |
      |     >      | \&#62;  |  \&gt;  |
      | 不断开空格   | \&#160; | \&nbsp; |

    - 过滤
      - 移除用户上传的DOM属性，如onerror等
      - 移除用户上传的Style节点、Script节点、Iframe节点等。
    - 矫正
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
              // 过滤危险标签
              if(tag=='script'||tag=='style'||tag=='link'||tag=='iframe') return;
              results+='<'+tag;
              // 过滤掉所有属性
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

// 字符转义，前端或者后端做都可以
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