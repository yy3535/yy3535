# 04-运行环境
[[toc]]
## 页面加载

### 浏览器加载资源的过程

#### 加载资源的形式

- 输入 url 加载 html
- http://coding.m.imooc.com
- 加载 html 中的静态资源
- `<script src="/static/js/jquery.js"></script>`

#### 加载一个资源的过程

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

### 几个示例

#### 最简单的页面

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <p>test</p>
</body>
</html>
```

#### 引用 css

css 内容

```css
div {
    width: 100%;
    height: 100px;
    font-size: 50px;
}
```

html 内容

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="test.css">
</head>
<body>
    <div>test</div>
</body>
</html>
```

最后思考为何要把 css 放在 head 中？？？

#### 引入 js

js 内容

```js
document.getElementById('container').innerHTML = 'update by js'
```

html 内容

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="container">default</div>
    <script src="index.js"></script>
    <p>test</p>
</body>
</html>
```

思考为何要把 JS 放在 body 最后？？？

#### 有图片

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <p>test</p>
    <p><img src="test.png"/></p>
    <p>test</p>
</body>
</html>
```

引出`window.onload`和`DOMContentLoaded`

```js
window.addEventListener('load', function () {
    // 页面的全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', function () {
    // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
})
```

## 解答

### 从输入url到得到html的详细过程

- 浏览器根据 DNS 服务器得到域名的 IP 地址
- 向这个 IP 的机器发送 http 请求
- 服务器收到、处理并返回 http 请求
- 浏览器得到返回内容

### window.onload 和 DOMContentLoaded 的区别

- 页面的全部资源加载完才会执行，包括图片、视频等
- DOM 渲染完即可执行，此时图片、视频还没有加载完

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

### 题目

- 【面试】常见的 web 攻击方式有哪些，简述原理？如何预防？

### 解决

关于前端安全的知识，建议阅读《白帽子讲web安全》，作者也是一位很传奇的人物，这本书写的浅显易懂，很适合前端工程师阅读。

#### 常见的 web 攻击方式有哪些，简述原理？如何预防？

- SQL注入**。
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
        |     -      |  字符  | 十进制 | 转义字符 |
        | :--------: | :----: | :----: |
        |     "      | &#34;  | &quot; |
        |     &      | &#38;  | &amp;  |
        |     <      | &#60;  |  &lt;  |
        |     >      | &#62;  |  &gt;  |
        | 不断开空格 | &#160; | &nbsp; |
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