# 【1. HTML和css】

[[toc]]

## HTML基础
### 如何理解HTML
- HTML文档
- 描述文档的结构
- 有区块和大纲
- 工具：![工具](https://h5o.github.io/)
- 语义化的重要性：方便各种爬虫，蜘蛛工具读取
### HTML版本
- HTML4/4.01(SGML)
    - SGML是XML得超级版本
    - 浏览器容错比较多，因为有些语法不规范
- XHTML(XML)
    - 要求比较严格(所有的属性必须有值等)
- HTML5
![html版本](./img/HTML_version.png)

### HTML常见元素
- header
|标签|
|:---:|
|meta|
|title|
|style|
|link|
|script|
|base|

- body

|标签|
|:---:|
|div/section/article/aside/header/footer|
|p|
|span/em/strong|
|table/thead/tbody/tr/td|
|ul/ol/li/dl/dt/dd|
|a|
|form/input/select/textarea/button|


#### meta
- charset
`<meta charset="utf-8">`
- viewport
`<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,minimal-ui">`
    - width/height：viewport 的大小
        - 320(会按设备宽度等比放大或缩小)、`device-width`(为设备的宽度/高度)等。
    - initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。(1.0)
    - maximum-scale：允许用户缩放到的最大比例。(1.0)
    - minimum-scale：允许用户缩放到的最小比例。(1.0)
    - user-scalable：用户是否可以手动缩放(no)
    - viewport分哪几类？
        - layout-viewport（页面窗口）
        - visual-viewport（手机屏幕能看到的页面窗口的大小区域）
        - ideal-viewport（手机屏幕大小区域）
    - width=device-width的工作原理是什么?
        - 让layout-viewport等于ideal-viewport
#### base
- `<base href="http://www.baidu.com" target="_blank">`
### HTML元素分类
- 按默认样式分类
    - 块级(block)
    - 行内/内联(inline)
    - inline-block(对外inline对内block)
        - select
        - input
- 按内容分类
![w3c](https://html.spec.whatwg.org/multipage/)
### HTML元素嵌套关系
- 块级元素可以包含行内元素
- 块级元素不一定能包含块级元素，比如`p`不能包含`div`
- 行内元素一般不能包含块级元素，但`a`可能可以包含块级元素（规则是看到a直接跳过不检查，transparent，能不能包含取决于a外层的元素能否包含div）

### HTML元素默认样式和定制化
- 使用reset.css，margin,padding去掉
- 使用*重置margin:0;padding:0,但是可能会带来选择器性能问题
- Normalize.css，另一种选择，保留一些元素的属性，保持统一

### HTML重要属性
- a[href,target]
- img[src,alt]
    - 路径
    - 无图像时替代文本
    - width和height只能用百分比和px单位
- table td[colspan,rowspan]
- form[target,method,enctype]
    - 表单提交到哪里
    - 发送http的方法
    - 发送表单数据前编码（主要为post提供，1.url-encode方式把文本提交，2.form-data方式，把数据编码后提交，上传文件只能用rom-data方式）
    - 为什么ajax提交也需要form
        - 可借助submit,reset
        - 批量获取表单，比如jquery的serialize
        - 框架中验证功能需要结合form
        - 有form时浏览器的密码管理工具会记住用户名密码
- input[type,value,name]
    - button
    - radio,name
    - submit/reset,出现在form中
    - 
- button[type]
    - button
    - submit/reset,出现在form中
- select>option[value]
- label[for]
    - for指向input的id，进行关联

### 语义化标签
- list用ulli或者dldddt(可以用作标题内容分辨)
### HTML5新增
- 表单
    - 日期、时间、搜索
    - 表单验证
    - placeholder、自动聚焦
- header/footer/section/article/nav/aside(前面四个进入大纲)
- em/strong（强调）
- i 斜体/做icon图标

### HTML面试真题
- doctype的意义是什么
    - 让浏览器以标准模式渲染
    - 让浏览器知道元素的合法性
- HTML XHTML HTML5的关系
    - HTML属于SGML
    - XHTML属于XML，是HTML进行XML严格化的结果
    - HTML5不属于SGML或XML，比XHTML宽松
- em和i有什么区别
    - em是语义化标签，表强调
    - i是纯样式，只是斜体，没有语义
- 哪些元素可以自闭合
    - 表单元素 input
    - 图片 img
    - br hr
    - meta link
- HTML和DOM的关系
    - HTML是死的字符串
    - DOM是由HTML解析而来的活的对象
- property和attribute的区别
    - attribute是死的
    - property是活的
- from的作用
    - 直接提交表单
    - 使用submit/reset按钮
    - 便于浏览器保存表单
    - 第三方库可以整体提取值
    - 第三方库可以进行表单验证
## CSS基础
- Cascading Style Sheet(层叠样式表)
### 基本规则
```css
选择器{
    属性:值;
    属性:值
}
```
### 选择器
- 用于匹配HTML元素
#### 分类

- id选择器
- 类选择器
- 标签选择器
- 属性选择器
    - E[attr]
    - E[attr=val]
    - E[attr*=val]
    - E[attr^=val]
    - E[attr$=val]
- 伪类选择器(状态)
    - E:only-of-type
    - E:only-child
    - E:first-child
    - E:last-child
    - E:nth-child(n)
    - E:nth-last-child(n)
    - E:nth-of-type(n)
    - E:nth-last-of-type(n)
        - {n 范围[0,+∞),即所有子元素,0 和负数在伪类选择器中获取不到;-n+5 表示[1,5]}
    - E:empty
    - E:target
    - E:enabled
    - E:disabled
        - 控制表单控件的禁用状态
    - E:checked
        - 单选框或复选框被选中
- 伪元素选择器（元素）
    - E::befor
    - E::after
    - E::first-letter
    - E::first-line
    - E::selection
        - c3 引入
- 组合选择器[type=checkbox]+label{}
- 否定选择器:not(.link){}
- 通用选择器*

:::tip
- 伪类和伪元素的区别
    - 伪类表状态，伪元素是真的有元素，前者是单冒号，后者是双冒号
:::

#### 权重
- ID选择器 #id{} +100
- 类 属性 伪类 +10
- 元素 伪元素 +1
- 其它选择器 +0
- 但是不进位，十个类选择器权重不会等于id选择器
- !important优先级最高
- 内联的样式优先级最高
- 相同权重 后写的生效
#### 解析和性能（浏览器的解析方式是从右往左找的，这样性能比较高，速度比较快）
### 非布局样式

- 字体
    - 字体族（不加引号，指定一种字体族，会从字体族中随便选择一种字体来显示）
        - serif(衬线字体) sans-serif(非衬线字体) monospace(等宽字体) cursive(手写体) fantasy(花体)
    - 多字体fallback(没有黑体就用下一个，再没有就同一个字体族找一个)
    ```css
    .chinese{
        <!-- mac上用PingFang，window上有微软雅黑 -->
        font-family:"PingFang SC","Microfoft Yahei",monospace;
    }
    ```
    - 网络字体，自定义字体
        - 使用场景
            - 宣传/品牌/banner等固定图标
            - 字体图标
    - iconfont
    ```css
    <!-- 定义字体 -->
    @font-face{
        font-family:"IF";
        <!-- 地址是远程服务器一定要有cois的头 -->
        src:url("./IndieFlower.ttf");
    }
    .custom-font{
        <!-- 使用字体 -->
        font-family:IF;
    }
    ```
- 行高
    - 顶线，底线，基线。会按基线对齐，行高是按行高最高的元素的高度来算
    - 背景区域是由字体大小决定的
    - line-height如果比字体高度高，就会平均分布在字体上下两边，垂直居中
    - verticle-align，不设按基线对齐，top按顶线对齐，bottom按底线对齐，middle按居中对齐
    :::tip
    - 图片和文字同一行,去除这个缝隙
        - verticle-align:bottom
        - display:block
    :::
- 背景
    - 背景颜色
        - 单词
        - #ff0000 #f00 (rgb，不够直观)
        - rgb(0,0,0)/rgba
        - hsl(0,100%,50%); (色相0-360[0或360红色，120绿色，240蓝色]，饱和度0%-100%，亮度0%-100%，对人更友好)/hsla
        :::tip
        - opacity透明度会继承，而颜色的透明度不会被继承
        :::
    - 渐变色背景
        - 线性渐变linear-gradient( [point || angle,]? stop, stop [, stop]* )
        - 径向渐变radial-gradient([ [ shape || size ] [ at position ]? , | at position, ]?color-stop[ , color-stop ]+)
    - 多背景叠加
        - 可利用渐变色实现网格图案
    - 背景图片和属性（雪碧图）
        - background:url(./test.png);
        - 移动端三倍屏（1px显示为3px），做一个三倍尺寸的图，然后background-size除以三。
    - base64和性能优化(图片本身的体积会变成原来的3/4，减少了http的连接数，增大了解码的开销。一般用在小的图片上，写的时候写图片，构建时打包成base64)
    - 多分辨率适配
- 边框
    - 线型（solid dashed） 大小 颜色
    - 边框背景图(border-image:round:按整数个去重复图案)
    - 边框衔接（三角形）

- 滚动
    - overflow:visible(内容撑出去)/hidden/scroll/auto
- 文本折行
    - overflow-wrap(以前是word-wrap) 通用换行控制,是否保留单词
        - break-word
        - break-all
        - keep-all
    - word-break 针对多字节文字，中文句子也是一个单词
    - white-space 空白处是否断行
        - no-wrap

:::tip 其它
- word-break normal|break-all|keep-all|break-word; 
- word-spacing  
- word-wrap
- letter-spacing 中文间距
- white-space nowrap 文字不换行
- text-overflow: ellipsis; 超出后变...
    - 实现不换行超出...的语句
    ```css
    h4{
        white-space:nowrap;
        text-overflow:eslipsis;
        overflow: hidden;
    }
    ```
- overflow: hidden
- text-align:justify;文本两端对齐
:::

- 装饰性属性
    - (粗体)font-weight:600/normal(400)/bold(700)/lighter(取决于父级)/bolder(取决于父级)/100(只能是100-900,9个值)
    - (斜体)font-style:itatic
    - (下划线)text-decoration:none
    - (指针)cursor:pointer
    - (双击不选中文字)user-select:none;
- hack和案例
    - 在特定浏览器上的写法，做兼容性
    - 缺点：难理解 难维护 易失效
    - 替代方案:特性检测，针对性加class
    ```html
    <!-- 美化checkbox,把原来的按钮去掉 -->
    <style>
        .checkbox input {
            display: none;
        }
        
        .checkbox input:checked+label {
            background-image: url(./checkbox2.png);
        }
        
        .checkbox input+label {
            background: url(./checkbox1.png) left center no-repeat;
            background-size: 20px 20px;
            padding-left: 20px;
            user-select: none;
        }
        
        .checkbox input+label:hover {
            cursor: default;
        }
    </style>
    <div class="checkbox">
        <input type="checkbox" id="handsome"/>
        <label for="handsome">我很帅</label>
    </div>
    ```
    ```html
    <!-- css radio checked实现选项卡 -->
    <!-- css checkbox checked实现一个文件树 -->
    ```
    - 如何美化checkbox
        - label[for]和id
        - 隐藏原生input
        - :checked + label
:::tip
reset.css
```html
<!-- cdn -->
<link href="https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css" rel="stylesheet">
```
```md
<!-- 下载地址 -->
https://huruqing.gitee.io/demos/source/reset.css
```
```css
/* 公共样式 */
.left {
    float: left;
}

.right {
    float: right;
}

.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}

.clearfix:after {
    clear: both;
}
```
:::
- 面试题
```css
/* 四宫格中间有分界线情况实现，利用伪元素做竖线，利用外部容器的底边框，再设relative，向上偏移一个格子的距离，即可居中 */
.item{
    position:relative;
    width:50%;
    &:after{
        content:" ";
        width:1px;
        height:136px;
        display:block;
        position:absolute;
        top:5%;
        right:0;
        margin-top:-68px;
        border-right:1px solid #eee;
    }
    &:nth-child(2n){
        display:none;
    }
}
```
### 盒模型
- margin,padding,border,content
#### 标准模型/IE模型
| 盒子模型 | 宽度                         |
| :------- | :--------------------------- |
| 标准模型 | 宽度是content                |
| IE模型   | 宽度是content,padding,border |
- box-sizing:content-box(默认)/border-box;
:::warning 获取盒模型宽度/高度
- dom.style.width/height(只能取行内样式，不能取内联样式和外联样式)
- dom.currentStyle.width/height(得到的是渲染后的数据，仅IE)
- window.getComputedStyle(dom).width/height(通用性好)
- dom.getBoundingClientRect().width/height(内部通过位置来实现)
:::
:::tip 实例题（根据盒模型解释边距重叠）
- 两个div,里面的div高度100px,上边距(margin)为10px,求外面div的实际高度。--100，如果加了BFC,是110
:::
#### BFC(边距重叠解决方案)
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
        - overflow:hidden(auto)
        - ::after{clear:both}
- 负边距，会重叠。(margin为负)
## CSS布局
### table布局
-  table间隙
   -  cellpadding="0" cellspacing="0"
```css
.degree-table {
  color: #606266;
}
.degree-table td {
  border: 1px solid #ebeef5;
  border-right: 0px;
  font-size: 12px;
  padding: 6px 10px;
}
tr td:last-child {
  border: 1px solid #ebeef5;
}
```
### float浮动+margin
- float原本是做图文混排的
- float对自身的影响：
    - 形成“块”(BFC)
    - 位置尽量靠上
    - 位置尽量靠左（右）
- 如何清除浮动
    - 让盒子负责自己的布局
    - overflow:hidden(auto)
    - ::after(clear:both)
- 右边的元素浮动到右边需要把它放在最左边才行
- 两栏布局
```html
<div class="container">
    <div class="left">
        左
    </div>
    <div class="right">
        右
    </div>
</div>
<style>
    .right{
        float:right;
    }
</style>
```
- float三栏布局
### 绝对定位和相对定位
- relative和static有什么区别
    - relative是对static定位的相对偏移，如果top,left都设0，那就基本相同，否则就在static基础上进行相对偏移
- absoluete是相对于最近的一个absolute或者relative元素
### inline-block布局
- 有间隙
  - 办法一：解决元素之间的空白符
  - 方法二：为父元素中设置font-size: 0，在子元素上重置正确的font-size
  - 方法三：为inline-block元素添加样式float:left
  - 方法四：设置子元素margin值为负数
  - 方法五：最优解在这，设置父元素，display:table和word-spacing
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="{CHARSET}">
		<title></title>
		<style type="text/css">
			body{
				margin: 0;
				padding: 0;
			}
			.item{
				display: inline-block;
				width:50%;
				box-sizing: border-box;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<div class="item">left</div>
			<div class="item">right</div>
		</div>
	</body>
</html>
```
### flex布局
- 容器显示flex
    - display:flex
    - display:inline-flex：将对象作为内联块级弹性伸缩盒显示
```css
.box{
    display:flex
}
/* 行内元素 */
.box{
    display:inline-flex
}
/* webkit内核浏览器（safari） */
.box{
    display:-webkit-flex;
    display:flex;
}
```
- 容器其他属性
    - flex-direction
        - 项目排列方向：row | row-reverse | column | column-reverse;

    - flex-wrap
        - 换行：nowrap | wrap | wrap-reverse;

    - flex-flow以上两项合集
        - 默认：row nowrap。

    - justify-content
        - 主轴对齐方式：flex-start | flex-end | center | space-between | space-around;

    - align-items
        - 交叉轴对齐方式：flex-start | flex-end | center | baseline | stretch;

    - align-content
        - 多根轴的对齐方式：flex-start | flex-end | center | space-between | space-around | stretch;

- 项目的属性

    - order
        - 项目排列顺序：默认0，数值越小排列越靠前

    - flex-grow
        - 项目放大比例：默认0，数值越大，放大比例越大

    - flex-shrink
        - 项目缩小比例：默认1，数值越大，缩小比例约小

    - flex-basis
        - 项目占据空间：默认auto(项目本来的大小)，可设350px等固定大小

    - flex以上三项合集
        - 默认：0 1 auto，第一个值必填。后两个可选。
        - 快捷值：auto (1 1 auto) 和 none (0 0 auto) 
        - 优先使用这个，而不是分开写

    - align-self
        - 某项目的对齐方式：auto | flex-start | flex-end | center | baseline | stretch;
- 最后一行左对齐
  - 加上最多列数的空div，设置宽度为项目宽，高度为0，即可

### grid（网格）布局
- 容器显示grid
```css
.box{
    display:grid;
}
/* 行内元素 */
.box{
    display:inline-grid
}
```

- 容器的其他属性
    - grid-template-columns
        - 列：100px 100px 100px/auto

    - grid-template-rows
        - 行：100px 100px 100px

    - grid-template-areas
        - 网格区域：
        ```js
        "h h h h h h h h h h h h"
        "m m c c c c c c c c c c"
        "f f f f f f f f f f f f";
        ```

    - grid-column-gap

    - grid-row-gap

    - grid-gap以上两项合集

    - justify-items

    - align-items

    - justify-content

    - align-content

    - grid-auto-colums

    - grid-auto-rows

    - grid-auto-flow

- 项目属性

    - grid-column-start

    - grid-column-end

    - grid-column以上两项合集
    1/4
    - grid-row-start

    - grid-row-end

    - grid-row
    2/3

    - grid-area
        - 项目的网格区域名称
        ```css
        grid-area: h;
        ```

    - justify-self

    - align-self
### 高度100px，实现两栏（三栏）布局
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.bootcss.com/minireset.css/0.0.2/minireset.min.css">
    <title>Document</title>
    <style>
        html * {
            padding: 0;
            margin: 0;
        }
        
        .layout {
            margin-top: 20px;
        }
        
        .layout article div {
            min-height: 100px;
        }
    </style>
</head>

<body>
    <section class="layout float">
        <style>
            .layout.float .left {
                float: left;
                width: 300px;
                background-color: red;
            }
            
            .layout.float .right {
                float: right;
                width: 300px;
                background-color: blue;
            }
            
            .layout.float .center {
                margin-left: 300px;
                margin-right: 300px;
                background-color: yellow;
            }
        </style>
        <article class="left-right-center">
            <div class="left"></div>
            <div class="right"></div>
            <div class="center">
                <div>
                    hahaha
                    <h1>浮动解决方案</h1>
                    1.这是三栏布局中间部分 2.这是三栏布局中间部分
                </div>
            </div>
        </article>
    </section>
    <section class="layout absolute">
        <style>
            .layout.absolute .left-center-right>div{
                position:absolute;
            }
            .layout.absolute .left {
                width: 300px;
                left: 0;
                background-color: red;
            }
            .layout.absolute .center {
                left: 300px;
                right: 300px;
                background-color: yellow;
            }
            .layout.absolute .right {
                width: 300px;
                right: 0;
                background-color: blue;
            }
        </style>
        <article class="left-center-right">
            <div class="left"></div>
            <div class="center">
                <div>
                    hahaha
                    <h1>绝对定位解决方案</h1>
                    1.这是三栏布局中间部分 2.这是三栏布局中间部分
                </div>
            </div>
            <div class="right"></div>
        </article>
    </section>
    <section class="layout flex">
        <style>
            .layout.flex .left-center-right {
                display: flex;
            }
            
            .layout.flex .left {
                width: 300px;
                background-color: red;
            }
            
            .layout.flex .center {
                flex: 1;
                background-color: yellow;
            }
            
            .layout.flex .right {
                width: 300px;
                background-color: blue;
            }
        </style>
        <article class="left-center-right">
            <div class="left"></div>
            <div class="center">
                <div>
                    hahaha
                    <h1>flex解决方案</h1>
                    1.这是三栏布局中间部分 2.这是三栏布局中间部分
                </div>
            </div>
            <div class="right"></div>
        </article>
    </section>
    <section class="layout table">
        <style>
            .layout.table .left-center-right {
                display: table;
                width: 100%;
            }
            .layout.table .left-center-right div{
                display: table-cell;
            }
            .layout.table .left {
                width: 300px;
                background-color: red;
            }
            .layout.table .center {
                background-color: yellow;
            }
            .layout.table .right {
                width: 300px;
                background-color: blue;
            }
        </style>
        <article class="left-center-right">
            <div class="left"></div>
            <div class="center">
                <div>
                    hahaha
                    <h1>表格解决方案</h1>
                    1.这是三栏布局中间部分 2.这是三栏布局中间部分
                </div>
            </div>
            <div class="right"></div>
        </article>
    </section>
    <section class="layout grid">
        <style>
            .layout.grid .left-center-right {
                display: grid;
                width:100%;
                grid-template-rows: 100px;
                grid-template-columns: 300px auto 300px;
            }
            .layout.grid .left {
                background-color: red;
            }
            .layout.grid .center {
                background-color: yellow;
            }
            .layout.grid .right {
                background-color: blue;
            }
        </style>
        <article class="left-center-right">
            <div class="left"></div>
            <div class="center">
                <div>
                    hahaha
                    <h1>grid解决方案</h1>
                    1.这是三栏布局中间部分 2.这是三栏布局中间部分
                </div>
            </div>
            <div class="right"></div>
        </article>
    </section>
</body>

</html>
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





### 响应式设计和布局
- 不同设备上正常使用（主要处理屏幕大小问题）
- 主要方法：
    - 隐藏（一些东西移动端不显示）
    - 折行（移动端折行）
    - 自适应空间（设计时多留自适应空间）
        - viewport
        - rem
            - hotcss
            - 通过html字体大小(默认16px)来确定元素大小的办法，使用rem尺寸单位
            - 根据不同尺寸的屏幕设置不同的html字体大小
            - em相对于父级元素，rem相对于html标签
            - rem有小数的地方会不太精准，精确度要求高的地方不要用rem进行布局
            - px2rem
            :::warning rem实现代码
            - 将压缩原生js放到head标签中
            ```html
            <script>!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(normal,e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),l=o.match(/U3\/((\d+|\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=normal?1:1/s,m=r.querySelector('meta[name="viewport"]');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=normal?"50px": a/2*s*n+"px"},e.exports=t["default"]}]);  flex(false,100, 1);</script>
            ```
            - 此方案仅适用于移动端web
            - rem适合写固定尺寸(间距之类)。其余的根据需要换成flex或者百分比。
            - 一般来讲，使用了这个方案是没必要用媒体查询了
            - 不要手动设置viewport，该方案自动帮你设置
            - 源码
            ```js
            'use strict';

            /**
            * @param {Boolean} [normal = false] - 默认开启页面压缩以使页面高清;  
            * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
            * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
            */
            const win = window;
            export default win.flex = (normal, baseFontSize, fontscale) => {
            const _baseFontSize = baseFontSize || 100;
            const _fontscale = fontscale || 1;

            const doc = win.document;
            const ua = navigator.userAgent;
            const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
            const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
            const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
            const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
            let dpr = win.devicePixelRatio || 1;
            if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
                // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
                dpr = 1;
            }
            const scale = normal ? 1 : 1 / dpr;

            let metaEl = doc.querySelector('meta[name="viewport"]');
            if (!metaEl) {
                metaEl = doc.createElement('meta');
                metaEl.setAttribute('name', 'viewport');
                doc.head.appendChild(metaEl);
            }
            metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
            doc.documentElement.style.fontSize = normal ? '50px' : `${_baseFontSize / 2 * dpr * _fontscale}px`;
            };

            //http://www.jianshu.com/p/b00cd3506782

            //640px以内進行一個自適應
            ```
            :::

            ```js
                (function(){
                    function refreshRem(){
                        <!-- 屏幕宽度750，1rem=100px iphone6 1rem=50px -->
                        <!-- 默认的16px是默认值 16不好计算 -->
                        document.documentElement.style.fontSize=document.documentElement.clientWidth/750*100+'px';
                    }
                    refreshRem();
                    window.addEventListener('resize',refreshRem,false);
                })();
            ```
        - 媒体查询
            - @media screen [not|only]? and (media feature) { CSS-Code; }
                - media feature :max(min)-height (width),为了实现向上兼容,常用min-width,从小写到大
                ```css
                .container{padding:0 15px; margin:0 auto;}
                .container:before{
                    content: '';
                    display: table;/*防止第一个子元素margin-top越界*/
                    }
                .container:after{
                    content:"";
                    display:table;/*防止最后個子元素margin-bottom越界*/
                    clear:both;/*清楚子元素浮动的影响*/
                }
                /*超大PC屏幕下的专用样式*/
                @media screen and (min-width:1200px) {
                    .container{ width:1170px;}
                    .my-img{width:25%}
                }
                /*中等PC屏幕下的专用样式*/
                @media screen and (min-width:992px) and (max-width: 1199px) {
                    .container{width:970px;}
                    .my-img{width:25%}
                }
                /*PAD屏幕下的专用样式*/
                @media screen and (min-width: 768px) and (max-width:991px ){
                    .container{width:750px;}
                    .my-img{width:50%}
                }
                /*PHONE屏幕下的专用样式*/
                @media screen and (min-width:767px) {
                    .container{ width:100%;}
                    .my-img{  width:100%;}
                }
                ```
            - 媒体查询调用不同css 文件
            ```html
            <link rel="stylesheet" media=" screen and|not|only (media feature)" href="mystylesheet.css">
            ```



### 实现各种居中（整理用法和适用场合）
#### 水平居中
- margin:0 auto

#### 垂直居中
- margin-top设为父级减子级的50%
- vertical-align:middle

#### 水平垂直居中
```css
/* 绝对定位居中 */
.box {
    width: 100px;
    height: 100px;
    background: red;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
```

```css
/* relative+margin居中 */
.box {
    position:relative;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```

```css
/* table居中 */
.box{
    display:table;
    verticle-align:middle;
    text-align:center;
}
.boxb{
    display:table-cell;
    
}
```

```css
/* flex居中 */
.box{
    display:flex
    margin:auto;
    /* justify-content:center;
    align-items:center; */
}
.
```
```css
/* grid居中 */
.box{
    display:grid;
    grid-template-rows:auto;
    grid-template-columns:auto;
}
```
### 占满屏
```css
.box {
    background: red;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
}
```

### html的footer置于页面最底部的方法
```html
<!-- 父层 -->     
<div id="wapper">     
    <!-- 主要内容 -->     
    <div id="main-content">     
    </div>     
    <!-- 页脚 -->     
    <div id="footer">     
    </div>     
</div>   
```
```css
#wapper{     
    position: relative;   /*重要！保证footer是相对于wapper位置绝对*/     
    height: auto;          /* 保证页面能撑开浏览器高度时显示正常*/     
    min-height: 100%  /* IE6不支持，IE6要单独配置*/     
}     
#footer{     
   position: absolute;  bottombottom: 0; /* 关键 */     
   left:0; /* IE下一定要记得 */     
   height: 60px;         /* footer的高度一定要是固定值*/     
}     
#main-content{     
   padding-bottom: 60px; /*重要！给footer预留的空间*/     
}     
```

## CSS效果
### box-shadow

<mark-check id="boxshadow"></mark-check>

- <highlight-box>box-shadow:12px 12px 0px 18px rgba(0,0,0,.4) inset;</highlight-box>

- <highlight-box>box-shadow:x方向偏移 y方向偏移 模糊区域 扩展大小 阴影颜色 阴影种类(inset内阴影 默认外阴影)</highlight-box>

- 技巧
    - 可以利用阴影复制一个元素出来
    - 给多个阴影
    ```html
    <style>
        box-shadow:200px 200px 0 5px green,
                    230px 200px 0 5px green,
                    215px 215px 0 -3px red;
    </style>
    <div class="container">
    </div>
    ```
    - 一个元素画哆啦A梦（一个元素画什么什么系列都是用阴影）
        - 因为都是圆，所以通过一个鼻子投影就行了。
- 作用
    - 营造层次感立体感
    - 充当没有宽度的边框
    - 特殊效果
### text-shadow

<mark-check id="boxshadow"></mark-check>

- <highlight-box>text-shadow:-1px -1px 0 #aaa;</highlight-box>

- <highlight-box>text-shadow:x方向偏移 y方向偏移 模糊区域 阴影颜色</highlight-box>

- 作用
    - 立体感
    - 印刷品质感
### border-radius

<mark-check id="boxshadow"></mark-check>

- <highlight-box>border-radius:50%;</highlight-box>

- <highlight-box>border-radius:上 右 下 左;</highlight-box>

- border-top-left-radius:100px 50px;(左上角的 水平方向 垂直方向)
- border-top-right-radius:0;
- border-radius:10px 10px 10px 10px / 20px 20px 20px 20px (水平方向/垂直方向，形成一个椭圆)
- 作用
    - 圆角矩形
    - 圆形
    - 半圆/扇形
    - 一些奇怪的角角
        - width:0;height:0;border:10px solid green; border-radius 30px/40px;
### background
- 纹理，图案
- 渐变
- 雪碧图动画
- 背景尺寸适应
    - background-position
    - background-size:100px/50%/cover/contain;
    - background-repeat
### clip-path

<mark-check id="boxshadow"></mark-check>

- <highlight-box>clip-path:inset(100px 50px);(矩形)</highlight-box>
- <highlight-box>clip-path:circle(50px at 100px 100px)（圆形）</highlight-box>
- <highlight-box>clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);(多边形)</highlight-box>
- <highlight-box>clip-path: url(resources.svg#c1);</highlight-box>
- 作用
    - 对容器进行裁剪
    - 常见几何图形
    - 自定义路径
- 和border-radius区别：
    - 容器占位是不变的
    - 方便做容器内的动画
    ```css
    .container{
        width:400px;
        height:300px;
        background:url(./panda.jpg);
        background-size:cover;
        padding:10px;
        clip-path:circle(50px at 100px 100px);
        transition:clip-path .4s;
    }
    .container:hover{
        clip-path:circle(80px at 100px 100px)
    }
    ```
- 可以和svg搭配使用
### 3D-transform
<mark-check id="transform"></mark-check>
- <highlight-box>transform:</highlight-box>
    - <highlight-box>translate(位移)(10px)</highlight-box>
    - <highlight-box>scale(缩放)(2)</highlight-box>
    - <highlight-box>rotate(旋转)(25deg)</highlight-box>
    - <highlight-box>skew(斜切)(10px)</highlight-box>
- 变换的顺序不可以随意改
```js

// 2d
transform: translate(12px, 50%);
transform: translateX(2em);
transform: translateY(3in);

transform: scale(2, 0.5);
transform: scaleX(2);
transform: scaleY(0.5);

transform: rotate(0.5turn);

transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);

// 3d
transform: perspective(17px);// 眼睛到物体的距离
transform-style: preserve-3d;// 设置了即为3d视图，可z方向变换

transform: translate3d(12px, 50%, 3em);
transform: translateZ(2px);

transform: scale3d(2.5, 1.2, 0.3);
transform: scaleZ(0.3);

transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);

/* Multiple function values */
transform: translateX(10px) rotate(10deg) translateY(5px);
```
- 应用
    - 3D卡片，3D相册
```html
<!-- 立方体 -->
<style>
    .container {
            margin:50px;
            padding: 10px;
            border: 1px solid red;
            width: 200px;
            height: 200px;
            position: relative;
            /* 眼睛到物体的距离 */
            perspective: 500px;
        }
        
        #cube {
            width: 200px;
            height: 200px;
            transform-style: preserve-3d;
            transform: translateZ(-100px);
            transition: transform 1s;
        }
        
        #cube div {
            width: 200px;
            height: 200px;
            position: absolute;
            line-height: 200px;
            font-size: 50px;
            text-align: center;
        }
        
        #cube:hover {
            transform: translateZ(-100px) rotateX(90deg) rotateY(90deg);
        }
        
        .front {
            transform: translateZ(100px);
            background: rgba(255, 0, 0, .3);
        }
        
        .back {
            transform: translateZ(-100px) rotateY(180deg);
            background: rgba(0, 255, 0, .3);
        }
        
        .left {
            transform: translateX(-100px) rotateY(-90deg);
            background: rgba(0, 0, 255, .3);
        }
        
        .right {
            transform: translateX(100px) rotateY(90deg);
            background: rgba(255, 255, 0, .3);
        }
        
        .top {
            transform: translateY(-100px) rotateX(-90deg);
            background: rgba(255, 0, 255, .3);
        }
        
        .bottom {
            transform: translateY(100px) rotateX(90deg);
            background: rgba(0, 255, 255, .3);
        }
</style>
<body>
    <div class="container">
        <div id="cube">
            <div class="front">1</div>
            <div class="back">2</div>
            <div class="left">3</div>
            <div class="right">4</div>
            <div class="top">5</div>
            <div class="bottom">6</div>
        </div>
    </div>
</body>
```
### 面试题
- 如何用一个div画xxx
    - box-shadow无限投影
    - :::before
    - :::after
- 如何产生不占空间的边框
    - box-shadow
    - outline
- 如何实现圆形元素
    - border-radius:50%
- 如何实现iOS图标的圆角（不是标准的圆角）
    - 把图标的图片用矢量设计软件导成svg，然后用clip-path:(svg)去裁剪
- 如何实现半圆、扇形等图形
    - border-radius组合
    - 有无边框
    - 边框粗细
    - 圆角半径

<mark-check id="pingyifangda"></mark-check>

- <highlight-box>如何平移/放大一个元素</highlight-box>

    - transform:translateX(100px)
    - transform:scale(2)

<mark-check id="3d"></mark-check>

- <highlight-box>如何实现3D效果</highlight-box>

    1. transform:perspective:500px;（设置物体至眼睛的距离）
    2. transform-style:preserve-3d;(不设置这个，z轴的设置就没有效果)
    3. transform:translate rotate ...（做各种变换）
## CSS动画
- 动画的原理
    - 视觉暂留作用
    - 画面逐渐变化
- 动画的作用
    - 愉悦感
    - 引起注意
    - 反馈
    - 掩饰
- 动画类型
    - transition补间动画
    - keyframe关键帧动画
    - 逐帧动画
### transition补间动画
- CSS帮你自动算以下几种情况的动画
    - 位置-平移
        left/right/margin/transform
    - 方位-旋转(transform)
    - 大小-缩放(transform)
    - 颜色
    - 透明度(opacity)
    - 其它-线性变换(transform)
<mark-check id="transition"></mark-check>
- <highlight-box>transition:width 1s;</highlight-box>
- <highlight-box>transition-delay:1s;// 延迟1s再执行</highlight-box>
- <highlight-box>transition:1s width 1s;// 延迟简写在第一个</highlight-box>
- <highlight-box>transition:width 1s,background 3s;//多个动画</highlight-box>
- <highlight-box>transition:all 1s;// 所有能够动画的属性都设为1s</highlight-box>
- <highlight-box>transition-timing-function:linear(线性，匀速)/ease-in-out(中间越来越快，开头结尾慢)/ease-in(开头慢，后面越来越快);</highlight-box>
    - 搜easer或者animation关键词来找贝塞尔曲线 :cubic-bezier(0.465,-0.460,0.525,1.435);
:::tip
- 浏览器f12再按ESC可以跳出来动画面板
:::
<mark-check id="transition-demo"></mark-check>
```html
<style>
    .container{
        width:100px;
        height:100px;
        background:red;
        transition:width 1s;
    }
    .container:hover{
        width:800px;
    }
</style>
```
### 关键帧动画
- 相当于多个补间动画
- 补间动画要求元素状态有变化，而关键帧动画与元素的变化无关，页面一加载就有动画
- 定义更加灵活
<mark-check id="animation"></mark-check>
- <highlight-box>animation:run 1s;</highlight-box>
- <highlight-box>animation:run 1s linear(匀速);</highlight-box>
- <highlight-box>animation-direction:reverse(动画反向);</highlight-box>
- <highlight-box>animation-iteration-count:2/infinite;(动画循环次数)</highlight-box>
- <highlight-box>animation-play-state:paused;(播放状态,保留当前暂停状态)</highlight-box>
- <highlight-box>animation-fill-mode:forwards/backwards;(元素最后的状态，保留动画最后的效果/保留动画初始的效果)</highlight-box>
- @keyframes
```css
@keyframes run{
    0%{
        width:100px;
    }
    100%{
        width:800px;
    }
}
/* 等价于 */
@keyframes run{
    from{
        width:100px;
    }
    to{
        width:800px;
    }
}
/* 两个以上进度 */
@keyframes run{
    0%{
        width:100px;
    }
    50%{
        width:200px;
    }
    100%{
        width:800px;
    }
}
@keyframes run{
    0%{
        width:100px;
    }
    20%{
        width:50px;
    }
    50%{
        width:200px;
    }
    100%{
        width:800px;
    }
}
```
<mark-check id="animationDemo"></mark-check>
```css
.container{
    width:100px;
    height:100px;
    background:red;
    animation:run 1s;
}
@keyframes run{
    0%{
        width:100px;
    }
    100%{
        width:800px;
    }
}
```

### 逐帧动画
- 没有补间的过程，中间不自动过渡
<mark-check id="steps1"></mark-check>
- <highlight-box>还是用的animation/@keyframes这种方案,使用animation-timing-function:steps(1)(让动画静止)</highlight-box>
- 适用于无法补间计算的动画，资源较大，用一张张图片模仿出动画
```css
.container{
    width:100px;
    height:100px;
    border:1px solid red;
    background:url(./animal.png) no-repeat;
    animation:run 1s infinite;
    animation-timing-function:steps(1);// 指定两个关键帧之间有几个画面，每个区间之间只有一个画面就不会有补间
}
@keyframes run{
    0%{
        background-position:0 0;
    }
    12.5%{
        background-position:-100px 0;
    }
    25%{
        background-position:-200px 0;
    }
    37.5%{
        background-position:-300px 0;
    }
    50%{
        background-position:0 -100px;
    }
    62.5%{
        background-position:-100px -100px;
    }
    0%{
        background-position:-200px -100px;
    }
    0%{
        background-position:-300px -100px;
    }
}
```
### CSS面试真题
<mark-check id="animation-view1"></mark-check>
- <highlight-box>CSS动画的实现方式有几种</highlight-box>
    - transition
    - keyframes/animation
<mark-check id="animation-view2"></mark-check>
- <highlight-box>过渡动画和关键帧动画的区别</highlight-box>
    - 过渡动画需要有状态变化
    - 关键帧动画不需要状态变化
    - 关键帧动画能控制更精细
<mark-check id="animation-view3"></mark-check>
- <highlight-box>如何实现逐帧动画</highlight-box>
    - 使用关键帧动画
    - 去掉补间（steps）
<mark-check id="animation-view4"></mark-check>
- <highlight-box>CSS动画的性能</highlight-box>
    - 性能不坏（很难写出性能差的css动画）
    - 部分情况下优于JS（js动画的性能变化比较大，优化空间大）
    - 但JS可以做到更好
    - 部分高危属性，box-shadow等（不管是css和js做动画都非常慢，性能非常差）
## 框架集成和CSS工程化
### 预处理器
- 通过工具编译成CSS
- less/Sass/Scss 的文件
- 总结
    - 嵌套 反映层级和约束
    - 变量和计算 减少重复代码
    - `Extend`和`Mixin`代码片段
    - 循环 适用于复杂有规律的样式
    - import CSS文件模块化
#### less/sass
- [sass](http://sass.bootcss.com/)
- less安装less，sass安装node-sass
- less是node写的，sass是Ruby写的
- 文件后缀less/scss
- 编译`lessc xxx.less`成css文件/编译`node-sass xxx.scss`
- 理念：尽量接近css/避免和css命名重复
<mark-check id="qiantao"></mark-check>
- <highlight-box>嵌套写法，&代表没有空格(层级清楚，强制约束) </highlight-box>
```css
/* less */
.wrapper{
    background:white;
    .nav{
        font-size:12px;
    }
    .content{
        font-size:14px;
        &:hover{
            background:red;
        }
    }
}
```
```css
/* sass */
.wrapper{
    background:white;
    .nav{
        font-size:12px;
    }
    .content{
        font-size:14px;
        &:hover{
            background:red;
        }
    }
}
```
<mark-check id="bianliang"></mark-check>
- <highlight-box>变量</highlight-box>
```css
/* less */
@fontSize:12px;
@bgColor:red;

body{
    padding:0;
    margin:0;
}
.wrapper{
    /* 颜色函数 */
    background:lighten(@bgColor,40%);
    .nav{
        font-size:@fontSize;
    }
    .content{
        font-size:@fontSize+2px;
        &:hover{
            background:@bgColor;
        }
    }
}
```
```css
/* sass */
$fontSize:12px;
$bgColor:red;

body{
    padding:0;
    margin:0;
}
.wrapper{
    /* 颜色函数 */
    background:lighten($bgColor,40%);
    .nav{
        font-size:$fontSize;
    }
    .content{
        font-size:$fontSize+2px;
        &:hover{
            background:$bgColor;
        }
    }
}
```
<mark-check id="mixin"></mark-check>
- <highlight-box>mixin</highlight-box>
    - <highlight-box>`一段代码需要复用`</highlight-box>
    - 以前是在html中加多个类实现
    - 作用
        - 如清除浮动
        - 创建独立样式
        - 原子类思想，写好block,line-height,font-size直接用等。
```css
/* less */
@fontSize:12px;
@bgColor:red;
/* 1. 定义mixin(.既是class又是mixin) */
.block(@fontSize){
    font-size:@fontSize;
    border:1px solid #ccc;
    border-radius:4px;
}
.wrapper{
    .nav{
        /* 2. 调用mixin，相当于把上面的样式复制到了这里 */
        .block(@fontSize);
    }
}
```
```css
/* sass */
$fontSize:12px;
$bgColor:red;
/* 1. 定义mixin */
@mixin block($fontSize){
    font-size:$fontSize;
    border:1px solid #ccc;
    border-radius:4px;
}
.wrapper{
    .nav{
        /* 2. 调用mixin，相当于把上面的样式复制到了这里 */
        @include block($fontSize);
    }
}
```
<mark-check id="extend"></mark-check>
- <highlight-box>extend</highlight-box>
    - 扩展一个选择器
    - `公共样式不是被复制，而是选择器提取出来，把公共的样式写到一起`
    - `mixin导致重复代码太多，导致效率不高`
```css
/* less */
@fontSize:12px;
@bgColor:red;
.block{
    font-size:@fontSize;
    border:1px solid #ccc;
    border-radius:4px;
}
.wrapper{
    /* 第一种写法 */
    .content:extend(.block){
        &:hover{
            background:@bgColor;
        }
    }
    /* 第二种写法 */
    .content{
        &:extend(.block);
        &:hover{
            background:@bgColor;
        }
    }   
}
```
```css
/* less编译后 */
.wrapper .content {
    font-size:12px;
    border:1px solid #ccc;
    border-radius:4px;
}
.wrapper {
    background:#ffcccc;
}
.wrapper .content:hover{
    background:red;
}
```
```css
/* sass */
$fontSize:12px;
$bgColor:red;
.block{
    font-size:$fontSize;
    border:1px solid #ccc;
    border-radius:4px;
}
.wrapper{
    .content{
        /* 只有一种方式 */
        @extend .block;
        &:hover{
            background:$bgColor;
        }
    } 
}
```
<mark-check id="mixinheextend"></mark-check>
:::tip
- <highlight-box>mixin和extend如何选择</highlight-box>
    - 不需要一个变量来控制、更追求编译后文件比较小，选择extend
    - 场景比较复杂、还有更复杂的比如带条件的情况，选择mixin
:::
<mark-check id="loop"></mark-check>
- <highlight-box>循环</highlight-box>
    - 适用于网格系统、复杂动画效果，延迟各不一样的情况
```css
/* less只能用递归再给个停止条件来实现 */
.gen-col(@n) when (@n>0){
    .gen-col(@n-1);
    .col-@{n}{
        width:1000px/12*@n;
    }
}
.gen-col(12);
```
```css
/* 编译后 */
.col-1{
    width:83.3333333px;
}
.col-2{
    width:166.6666667px;
}
.col-3{
    width:250px;
}
.col-4{
    width:333.33333333px;
}
.col-5{
    width:416.66666667px;
}
...
.col-12{
    width:1200px;
}
```
```css
/* sass用递归实现，有if所以条件写在里面 */
@mixin gen-col($n){
    @if $n>0 {
        @include gen-col($n-1);
        .col-#{$n}{
            width:1000px/12*$n;
        }
    }
}
/* 调用 */
@include gen-col(12);

/* sass用for循环实现 */
@for $i from 1 through 12 {
    .col-#{$i}{
        width:1000px/12*$i;
    }
}
```

<mark-check id="mixinheextend"></mark-check>

- <highlight-box>css模块化</highlight-box>
    - 可以把css拆成很多部分再引入,结构清晰，方便维护 
    - css预处理器会把模块化引入的css合成一个文件，解决了文件太细碎后加载的性能问题。
```css
/* less/sass */
@import "./logo";
@import "./header";
@import "./nav";
@import "article";
@import "dialog";
@import "./footer";
// CSS Module 有一个:export关键字，它在功能上等同于 ES6 的关键字export，即导出一个 js 对象。
:export {
  name: "less";
  mainColor: @mainColor;
  fontSize: @fontSize;
}
```


#### CSS预处理框架
- 提供现成的mixin，类似JS类库，封装常用功能
    - SASS-Compass
    - Less-Lesshat/EST

- EST例子
```css
/* est是按需调用的，所以all是可以的 */
@impport "est/all";

@support-ie-version:7;
@use-autoprefixer:false;

.global-reset();

.box{
    .inline-block();
    .opacity(60);
    height:100px;
    background:geen;
    margin:10px;
}
.left{
    float:left;
    .clearfix();
}
.row{
    .make-row();
    .col{
        .make-column(1/4);
        background:red;
        height:100px;
    }
}
.my-triangle{
    width:50px;
    height:50px;
}
.my-triangle::after{
    content:' ';
    .triangle(top left,10px,red,side);
}
```
### Bootstrap原理和用法
- CSS框架
- Bootstrap 4
    - 兼容IE10+
    - 使用flexbox布局
    - 抛弃nomalize.css
    - 提供布局和reboot版本
- 提供
    - 基础样式
    - 常用组件
    - JS组件
- 官网
    - https://getbootstrap.com/
    - bootstrap
        - css
            - bootstrap-grid.css// 基本布局功能
            - bootstrap-reboot.css // 基本样式
            - bootstrap.css // 全部功能
```html
<body>
    <h2 class="title">注册</h2>
    <form id="myForm">
        <div>
            <label>姓名</label>
            <input name="name" type="text" />
        </div>
        <div>
            <label>密码</label>
            <input name="name" type="text" />
        </div>
        <div>
            <label>电话</label>
            <input name="name" type="text" />
        </div>
        <div>
            <label>地址</label>
            <input name="name" type="text" />
        </div>
        <div id="result">
            
        </div>
        <div class="operate">
            <button type="submit">提交</button>
        </div>
    </form>
    <div></div>
</body>
```
### CSS工程化
- PostCSS
    - css解析功能
    - 还有两百多个插件
- 功能
    - import模块合并
    - autoprefixier自动加前缀
    - cssnano压缩代码
    - cssnext使用CSS新特性
    - precss变量、mixin、循环等

```css
/* cssnext把新的css语法编译一下 */
:root{
    --mainColor:red;
    --danger-theme:{
        color:white;
        background-color:red;
    };
}
a{
    color:var(--mainColor);
}
.danger{
    @apply --danger-theme;
}
```
```css
/* precss */
$blue:#056ef0;
$column:200px;

.menu{
    width:calc(4*$column);
}

.menu_link{
    background:$blue;
    width:$column;
}

.notice--clear{
    @if 3<5{
        background:green;
    }
    @else{
        background:blue;
    }
}

@for $i from 1 to 3 {
    .b-$i { width:$(i)px; }
}
```

:::tip
- vue中的使用
    - module/scoped
    - 编译成随机字符串/加上自定义属性
- sketch自动生成渐变色，做设计稿
:::

- 单位

1.em

在做手机端的时候经常会用到的做字体的尺寸单位

说白了 em就相当于“倍”，比如设置当前的div的字体大小为1.5em，则当前的div的字体大小为：当前div继承的字体大小*1.5

但是当div进行嵌套的时候，em始终是按照当前div继承的字体大小来缩放，参照后面的例子。

2.rem

这里的r就是root的意思，意思是相对于根节点来进行缩放，当有嵌套关系的时候，嵌套关系的元素的字体大小始终按照根节点的字体大小进行缩放。

参照后面给的demo

3.vh

vh就是当前屏幕可见高度的1%，也就是说

height:100vh == height:100%;

但是有个好处是当元素没有内容时候，设置height:100%该元素不会被撑开，

但是设置height:100vh，该元素会被撑开屏幕高度一致。

4.vw

vw就是当前屏幕宽度的1%

补充一句，当设置width:100%，被设置元素的宽度是按照父元素的宽度来设置，

但是100vw是相对于屏幕可见宽度来设置的，所以会出现50vw 比50%大的情况