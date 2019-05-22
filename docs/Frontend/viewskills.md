# 前端跳槽面试必备技巧

## 职位描述(JD)
不同的JD需要匹配不同的技能。写出不同的简历。通过JD着重去准备某部分东西

## 业务分析
jr.jd.com
京东金融技术分析（知识点）
- UI组件
  - 导航组件（手动写一下）
  - 基本布局(左中右三栏布局，左右两栏布局，不同思路实现布局)
  - 鼠标移过效果（CSS3动画重点准备，肯定要问）
  - 页面中的所有UI组件，不熟悉的要去看一下准备一下
- Chrome开发面板查看技术细节(Sources)
  - 用到了jQuery(比如事件委托，选择器最基本的，最常用的配套的模板引擎：handlebars/juicer/easyTemplate/underscoretemplate，最新的jq更新)
  - vue框架
  - es6语法
  - webpack打包工具
- Elements看源码（主要看header）
  - 
```html
<!-- 设置IE用Edge渲染，有chrome用chrome渲染 -->
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<!-- 双核浏览器优先用webkit内核渲染浏览器 -->
<meta name="renderer" content="webkit">
<!-- 网站编码 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- 网站描述，SEO -->
<meta name="description" content="京东金融官网，服务金融机构的数字科技公司。中国互联网金融协会理事单位! 参与中央网信办等四部委发起的联合安全测评并位居榜首。旗下品牌包括京东财富、京东众筹、京东保险、京东白条、企业金融、京东股票、东家财富、金融云、城市计算等。">
<!-- 实现dns预解析，优化性能 -->
<link rel="dns-prefetch" href="//static.360buyimg.com">

```
- Application
  - local Storage用的比较多，Session Storage没怎么用，所以重点准备localstorage
  - Frames-Fronts
  字体文件，自定义字体，字体图标，知道是什么，怎么用
  - Frames-Images
  主要用了png和jpg，不用特别准备

www.elong.com
艺龙官网技术分析（知识点）
- 按上方顺序分析
- 注意右上角小程序(所以艺龙JD中说的微信项目就是小程序，需要准备微信小程序相关知识)
- 右上角手机版（就是webapp，h5需要了解）
- 左边的日期控件（去了解一下怎么写日期控件，了解其中的算法，万一问起来至少知道是怎么做的，虽然实际工作中就是调用已经写好的api）
- 鼠标移入拉宽，其它收缩的特效（准备好，扎实下基本功，面试时候可以拿出来说，甚至可以说出你更好的方案CSS animation做出来）
- viewport标签没有，`<html xmln='http://www.w3.org/1999/xhtml'>`说明项目一直维持久远历史状态，没有做新版重构。header中存在大量script，script不应该放在header部分（参考雅虎军规）。但它的script上有async，是异步加载的。异步加载script有几种
- Require.js(模块化准备)
技术栈总结：jquery+require.js

## 技术栈准备

### 技术栈

- jQuery:
    - 看源码（核心架构是什么，事件委托怎么做，插件机制是什么，兼容性暂时可以不看）：找一篇jquery源码分析文章看
- Vue/React/Angular:
    - 时间紧准备一个，问起来就说那个没用过，这个用的熟。对于其中一个的原理理解深，Vue源码深入理解，找一篇分析的文章看。提前准备好遇到过怎么问题，怎么解决的，思路是什么（二面三面经常问，考察思维，如何解决问题等）。
- Node:
    - 没时间不准备没事，直接说不了解，但要准备就准备好了，不要画蛇添足

### 前端工程（构建工具）
- sass/less:
- gulp/grunt:都不了解，就准备gulp
- npm:
    - 常见命令，通常怎么用的，npm scripts怎么用的（博客随便搜一个）
- browserify
- webpack:必准备

## 自我陈述

### 简历
- 基本信息 姓名-年龄-手机-邮箱-籍贯
- 学历，由最高往低写
- 工作经历，项目背景-技术栈-技术收益/业务业绩。如果确实没什么成绩，那你重新想一下当时什么没做好，自己代码写一遍，然后写再简历上。
- 开源项目，Github和说明（不要作假）。
- 最好不要写自我评价。
- 简历审美要好
  
### 自我陈述
- 自我介绍：面试官会根据你说的内容想好问题。
- 想告诉他的东西说半句留半句，让他来问你，你再说。
- 不懂的可以问。
- 问基础不要急躁。
- 遇到难度大的题目要尽量去思考，不要轻易放弃。
- 遇到困难的面试可以找面试官要资料，让自己有所收获。

### 参考简历
![模板简历1](/img/模板简历1.png)
![模板简历2](/img/模板简历2.png)

## 页面布局
### 实现两栏（三栏）布局的方法
```html
<section class="layout float">
    <style>
        .layout.float .left{
            float: left;
            width:300px;
            background-color: red;
        }
        .layout.float .right{
            float: right;
            width:300px;
            background-color:blue;
        }
        .layout.float .center{
            margin-left:300px;
            margin-right:300px;
            background-color:yellow;
        }
    </style>
    <article class="left-right-center">
        <div class="left"></div>
        <div class="right"></div>
        <div class="center">
            <div style="width:100%; height:50px;">
                hahaha 
                <h1>浮动解决方案</h1>
                1.这是三栏布局中间部分
                2.这是三栏布局中间部分
            </div>
        </div>
    </article>
</section>
<section class="layout absolute">
    <style>
        .layout.absolute{
            height: 100px;
        }
        .layout.absolute .left{
            position: absolute;
            width:300px;
            left:0;
            background-color: red;
        }
        .layout.absolute .center{
            position: absolute;
            left:300px;
            right:300px;
            background-color: yellow;
        }
        .layout.absolute .right{
            position: absolute;
            width:300px;
            right:0;
            background-color: blue;
        }
    </style>
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">
            <div style="width:100%; height:50px;">
                hahaha 
                <h1>绝对定位解决方案</h1>
                1.这是三栏布局中间部分
                2.这是三栏布局中间部分
            </div>
        </div>
        <div class="right"></div>
    </article>
</section>
<section class="layout flex">
    <style>
        .layout.flex .left-center-right{
            display:flex;
        }
        .layout.flex .left{
            width:300px;
            background-color: red;
        }
        .layout.flex .center{
            flex:1;
            background-color: yellow;
        }
        .layout.flex .right{
            width:300px;
            background-color: blue;
        }
    </style>
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">
            <div style="width:100%; height:50px;">
                hahaha 
                <h1>flex解决方案</h1>
                1.这是三栏布局中间部分
                2.这是三栏布局中间部分
            </div>
        </div>
        <div class="right"></div>
    </article>
</section>
<section class="layout table">
    <style>
        .layout.table .left-center-right{
            display:table;
            width:100%;
        }
        .layout.table .left{
            display:table-cell;
            width:300px;
            background-color: red;
        }
        .layout.table .center{
            display:table-cell;
            background-color: yellow;
        }
        .layout.table .right{
            display: table-cell;
            width:300px;
            background-color: blue;
        }
    </style>
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">
            <div style="width:100%; height:50px;">
                hahaha 
                <h1>表格解决方案</h1>
                1.这是三栏布局中间部分
                2.这是三栏布局中间部分
            </div>
        </div>
        <div class="right"></div>
    </article>
</section>
<section class="layout grid">
    <style>
        .layout.grid .left-center-right{
            display:grid;
            grid-template-rows: 100px;
            grid-template-columns: 300px auto 300px;
        }
        .layout.grid .left{
            background-color: red;
        }
        .layout.grid .center{
            background-color: yellow;
        }
        .layout.grid .right{
            background-color: blue;
        }
    </style>
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">
            <div style="width:100%; height:50px;">
                hahaha 
                <h1>grid解决方案</h1>
                1.这是三栏布局中间部分
                2.这是三栏布局中间部分
            </div>
        </div>
        <div class="right"></div>
    </article>
</section>
```

哪五种五种解决方案，
每个解决方案的优缺点：
	浮动：脱离文档流，处理不好带来很多问题/兼容性好
	绝对定位：快捷，不容易出问题/布局脱离文档流，其中所有子元素也必须脱离文档流，不实用
	Flex：解决了以上两个的问题，比较完美
	表格布局：兼容性好/有时不需要同时增高
	网格布局：
假设高度去掉，哪个方案不再适用了，
真正到业务中使用，哪个最实用

- 页面布局的变通（像上面一样写出多种方案，各个优缺点）
    - 三栏布局
        - 左右宽度固定，中间自适应
        - 上下高度固定，中间自适应
    - 两栏布局
        - 左宽度固定，右自适应
        - 右宽度固定，左自适应
        - 上高度固定，下自适应
        - 下高度固定，上自适应


## CSS盒模型
- 怎么看CSS盒模型？
    - 基本概念：标准模型+IE模型，margin,padding,border,content
    - 标准模型和IE模型的区别
        - 标准模型宽度是content
        - IE模型宽度是content,padding,border
    - CSS如何设置这两种模型
        - box-sizing:content-box(默认)/border-box;
    - JS如何设置获取盒模型对应的宽和高
        - dom.style.width/height(只能取行内样式，不能取内联样式和外联样式)
        - dom.currentStyle.width/height(得到的是渲染后的数据，仅IE)
        - window.getComputedStyle(dom).width/height(通用性好)
        - dom.getBoundingClientRect().width/height(内部通过位置来实现)
    - 实例题（根据盒模型解释边距重叠）
        - 两个div,里面的div高度100px,上边距(margin)为10px,求外面div的实际高度。--100，如果加了BFC,是110
    - BFC(边距重叠解决方案)
        - 三种情况（重叠原则：取最大值）
            - 父子margin重叠
            - 兄弟margin重叠
            - 空元素margin重叠(上下margin取最大值作边距和左右margin取最大值作边距)
        - BFC的基本概念:边距重叠解决方案
        - BFC的原理(渲染规则)
            - 在BFC这个元素垂直方向的边距会发生重叠
            - BFC的区域不会和浮动元素的box重叠
            - BFC在页面上是一个独立的容器，外面的元素不影响里面的元素，里面的也不影响外面
            - 计算BFC高度时，浮动元素也会参与计算
        - 如何创建BFC(以下任一条件)
            - overflow不为visible(设置hidden,auto)
            - float值不为none(默认为none，只要设置了float，当前元素就是BFC)
            - position不是static或relative(设置absolute,fixed)
            - display是table/tablecell跟table相关的都可以
        - BFC的使用场景
            - 解决边距重叠(父子重叠在父元素加BFC,兄弟重叠给自己或者兄弟加个父元素加BFC,空元素给自己加个父元素加加BFC)
            - demo1:(BFC的区域不会和浮动元素的box重叠)
```html
<section id='layout'>
    <style media="screen">
        #layout{
            background:red;
        }
        #layout .left{
            float:left;
            width:100px;
            height:100px;
            background:pink;
        }
        #layout .right{
            height:110px;
            background:#ccc;
            /* 给右边元素加BFC，右边就不会往左边流10px了 */
            overflow:auto;
        }
    </style>
    <div class="left"></div>
    <div class="right"></div>
</section>
```
                - demo2:父元素设置BFC可以清除浮动(计算BFC高度时，浮动元素也会参与计算)



## DOM事件
- 基本概念：DOM事件(DOM标准)的级别
    - DOM0 
      - element.onclick=function(){}
    - DOM2 
      - element.addEventListener('click',function(){},false)(DOM1标准设立的时候没有事件相关的东西，所以直接是2)
      - 默认false,冒泡阶段触发，true,捕获阶段触发。
    - DOM3 
      - element.addEventListener('keyup',function(){},false)(事件类型较DOM2增加了很多)
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
    - 多一个obj的参数，new CustomEvent('custome',object)

## 类型转换
### 数据类型
- 原始类型
  - Boolean
  - Null
  - Undefined
  - Number
  - String
  - Symbol(ES6新增)
- 对象
  - Object

### 显示类型转换
- Number函数
  - **数值**：转换后还是原来的值
  - **字符串**：如果可以被解析为数值，则转换为相应的数值，否则得到NaN.空字符串转为0
  - **布尔值**：true转成1，false转成0
  - **undefined**：转成NaN
  - **null**：转成0
  - **对象**：先调用自身的valueOf，不行再调用自身的toString，再不行就报错
- String函数
  - **数值**：转为相应的字符串
  - **字符串**：转换后还是原来的值
  - **布尔值**：true转成'true'，false转成'false'
  - **undefined**：转成'undefined'
  - **null**：转成'null'
  - **对象**：先调用自身的toString，不行再调用自身的valueOf，再不行就报错
- Boolean函数
  - undefined/null/-0/+0/NaN/''(空字符串)==>false
  - 其他一律为true

### 隐式类型转换
  - 四则运算
    - **+**：只要其中一个是String类型，表达式的值便是一个String。
    - **其余**：只要其中一个是Number类型，表达式的值便是一个Number。
    - **非法字符**：对于非法字符的情况通常会返回NaN
```js
'1' * 'a'     // => NaN
```
  - 判断语句
    - 转换规则同Boolean的构造函数。
  - Native调用
    - 比如console.log、alert调用自动转为字符串类型
#### 常见题目
```js
[]+[]
[]+{}
{}+[]
{}+{}
true+true
1+{a:1}
```




## HTTP协议

## 面对对象

## 原型链

## 通信

## 安全

## 算法

