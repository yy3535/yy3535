# HTML和css
[[toc]]
## HTML

### HTML常见元素
|标签|
|:---:|
|meta|
|title|
|style|
|link|
|script|
|base|
|div/section/article/aside/header/footer|
|p|
|span/em/strong|
|table/thead/tbody/tr/td|
|ul/ol/li/dt/dd|
|a|
|form/input/select/textarea/button|
 
### head里的标签
#### meta
- chartset
    ```html
    <meta charset="utf-8">
    ```
- viewport
    - width/height：和：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度/高度（单位为缩放为 100% 时的 CSS 的像素）。
    - initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。(1.0)
    - maximum-scale：允许用户缩放到的最大比例。(1.0)
    - minimum-scale：允许用户缩放到的最小比例。(1.0)
    - user-scalable：用户是否可以手动缩放(no)
    ```html
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    ```
#### base
- url默认设置(相对路径设置为该路径，a标签等设置为打开新的页面)(包括 `<a>`、`<img>`、`<link>`、`<form>` 标签中的 URL)
```html
<base href="http://www.baidu.com" target="_blank">
```


### 元素的属性
- a[href,target]
- img[src,alt]//路径，无图像时替代文本,width和height只能用百分比和px单位
- table td[colspan,rowspan]
- form[target,method,enctype]//在何处打开url,发送http的方法，发送表单数据前编码
- input[type,value]
- button[type]
- select>option[value]
- label[for]
### HTML5新增
- 表单
    - 日期、时间、搜索
    - 表单验证
    - placeholder、自动聚焦
- header/footer/section/article/nav/aside
- em/strong
- i 斜体/做icon图标

### 语义化标签
- 多个同样的东西可以用ul li标签，看上去更清楚

## CSS

### 盒模型
- margin,padding,border,content
#### 标准模型/IE模型
|盒子模型|宽度|
|:----|:----|
|标准模型|宽度是content|
|IE模型|宽度是content,padding,border|
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
- 负边距，会重叠。(margin为负)
### reset.css
```html
<!-- cdn -->
<link href="https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css" rel="stylesheet">
```
```md
<!-- 下载地址 -->
https://huruqing.gitee.io/demos/source/reset.css
```

### 属性

#### 选择器
- id选择器
- 类选择器
- 标签选择器
- 属性选择器
  - E[attr]
  - E[attr=val]
  - E[attr*=val]
  - E[attr^=val]
  - E[attr$=val]
- 伪类选择器
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
- 伪元素选择器
  - E::befor
  - E::after
  - E::first-letter
  - E::first-line
  - E::selection
    - c3 引入
#### 颜色
- Hsla(200,50%,100%,0.7)
    - H: Hue(色调)//0(或360)表示红色，120表示绿色，240表示蓝色
    - S: Saturation(饱和度)//0.0% - 100.0%
    - L：Lightness(亮度)。//0.0% - 100.0%
    - A：Alpha透明度//0~1
- RGBA:rgba(234,234,123,0.2),该透明度不会被继承，区别于opacity
- `#333333`

#### 文本阴影:
- text-shadow
  - none | shadow [ , shadow ]* 
  - 可以多阴影,逗号隔开
#### 盒模型:
box-sizing:content-box(标准模式盒模型) | border-box(怪异模式盒模型)
#### 盒子阴影:
box-shadow:none | shadow [ , shadow ]* 
- 可以有多个阴影
shadow = inset? && length{2,4} && color? 内阴影、{Xoffset 可负、Yoffset 可负、blur 不可负、外延可负}、颜色
#### 边框圆角:
border-radius:[ length | percentage ]{1,4} [ / [ length | percentage ]{1,4} ]?
按上左(top-left)、上右(top-right)、下右(bottom-right)、下左(bottom-left)的顺序作用于四个角
#### 边框图片:
- border-image:' border-image-source ' || ' 
- border-image-slice ' [ / ' border-image-width ' | / ' 
- border-image-width '? / '
- border-image-outset ' ]? || ' border-image-repeat '
source:图像路径url
- [面试]slice:内偏移(分割方式) [ number | percentage ]{1,4} && fill?指定从上,右,下,左方位来分隔图像,将图像分成4 个角,4 条边
和中间区域共9 份,中间区域始终是透明的(即没图像填充),加上关键字fill 后按border-image-repeat 设定填充
- width:边框厚度,将裁切的图片缩放至设定厚度,然后在边框中显示,超出
- border-width 部分不显示
- outset:扩张,设置后图像在原本基础上向外延展设定值后再显示,不允许负值(少用)
- repeat:平铺,默认stretch 拉伸;repeat 平铺但不缩放;round 平铺且自适应缩放大小;space 平铺且自适应缩放间距
#### 渐变:
- 线性渐变linear-gradient:( [point || angle,]? stop, stop [, stop]* )
- 径向渐变radial-gradient:([ [ shape || size ] [ at position ]? , | at position, ]?color-stop[ , color-stop ]+)
注意:渐变色不是单一颜色,不能使用backgroud-color 设置,只能使用background 设置
间隔分明实现,red 0%,red 33.3%,green 33.3%,green 66.6%,blue 66.6%,blue 100%
- [面试]径向渐变中的size:渐变终止的地方(要能看到明显的起点终点来判定是哪种,默认最远角)
- closest-side:最近边、farthest-side:最远边、closest-corner:最近角、farthest-corner:最远角
#### 背景:
- background-size:auto/number/percentage/cover/contain
- cover 自动等比缩放,直到某方向完全显示;contain 自动等比缩放,直到图片完全显示
- [面试]移动端实现较小图片拥有较大响应区:下面连个属性都设置成
- context-box,配合padding 值增大响应区
- background-origin:padding-box/border-box/content-box; 设置定位原点
- background-clip: padding-box/border-box/content-box; 设置显示区域
#### 过渡:
- transition: property duration timing-function delay;
- 过渡属性(必要,全属性为all)、过渡时间(必要)、过渡曲线(常用linear 匀速)、延时事件
#### 变换:
- 坐标轴:x 向右为正,y 向下文正,z 向屏幕外为正
- 3D 变换比2D 变换相比:多个Z 轴,合写语法需要写上默认值,此处不做详细说明
- translate 平移:正值向坐标轴正向平移,负值向坐标轴反向平移;默认参考元素左上角
- scale 缩放:比值,<1 为不缩放,>1 为放大,1 为缩小;默认参考元素中心点
- rotate 旋转:正向面对某坐标轴,正值为顺时针旋转,负值为逆时针旋转;默认参考元素中心点
- skew 斜切/翻转/扭曲(2D 独有):正值向坐标轴正向拉伸,默认元素中心点固定,拉伸右下角点,面积保持不变进行扭曲
- transform-origin 改变参考点
#### 动画
- 定义:@keyframes 动画序列{ 关键帧{ 属性:目标值} .... }
- 关键帧可以用from to 关键字,也可以用百分比
- 引用:animation: 动画序列名持续时间过渡类型延迟时间循环次数是否反向动画之外状态
- 过渡类型animation-timing-function: linear | ease-in-out | steps(n); 实现步进,此时动画不连续
- 循环次数animation-iteration-count:n | infinte; 可设定具体次数或无限循环
- [面试]动画外状态animation-fill-mode: forwards | backwords | both;
- 说明:forwards 在动画结束后保持最后状态(100%状态),backwords 会在延迟开始之前先执行最初状态(0%状态,无延迟
时,没有明显效果),both 会存在上述两种情况
是否反向animation-direction: alternate 交替| reverse 反向| normal 正常
- 常用简写:animation: move 5s [2s] linear infinite [alternate]

#### background

```js
background: #00ff00 url('smiley.gif') no-repeat fixed center; 
```
```js
background:bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;
```

### 布局

#### table布局
#### float浮动+margin
- float原本是做图文混排的
- float对自身的影响：
    - 形成“块”(BFC)
    - 位置尽量靠上
    - 位置尽量靠左（右）
- 如何清除浮动
    - 让盒子负责自己的布局
    - overflow:hidden(auto)
    - ::after(clear:both)
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

#### inline-block布局

#### flex布局
- 容器显示flex
    - display:flex
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

#### grid（网格）布局
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
#### 高度100px，实现两栏（三栏）布局
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





#### 响应式布局(适配移动端页面)
- viewport标签
- 隐藏、折行
- rem
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
### less
- xxx.less

- 定义变量
```
@color:red;
```

- 使用
```less
@import '../assets/xxx.less'
.hello{
    color:@color
}
```


