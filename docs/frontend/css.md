# css

## HTML常见元素
- meta

- title
- style
- link
- script
- base
- div/section/article/aside/header/footer
- p
- span/em/strong
- table/thead/tbody/tr/td
- ul/ol/li/dt/dd
- a
- form/input/select/textarea/button

- head里面的标签
```
//编码格式
<meta charset="utf-8">
//移动端适应
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
//url默认设置(相对路径设置为该路径，a标签等设置为打开新的页面)(包括 <a>、<img>、<link>、<form> 标签中的 URL)
<base href="http://www.baidu.com" target="_blank">
```

## 元素的重要属性
- a[href,target]
- img[src,alt]//路径，无图像时替代文本
- table td[colspan,rowspan]
- form[target,method,enctype]//在何处打开url,发送http的方法，发送表单数据前编码
- input[type,value]
- button[type]
- select>option[value]
- label[for]

## HTML5新增
- 表单
    - 日期、时间、搜索
    - 表单验证
    - placeholder、自动聚焦
- header/footer/section/article/nav/aside
- em/strong
- i 斜体/做icon图标

## 颜色
- Hsla(200,50%,100%,0.7)
H: Hue(色调)//0(或360)表示红色，120表示绿色，240表示蓝色
S: Saturation(饱和度)//0.0% - 100.0%
L：Lightness(亮度)。//0.0% - 100.0%
A：Alpha透明度//0~1

## CSS布局
### table布局（简单）
### 技巧性布局（难）
#### float浮动+margin
float原本是做图文混排的
float对自身的影响：
- 形成“块”(BFC)
- 位置尽量靠上
- 位置尽量靠左（右）

##### float两栏布局
```
<div class="container">
    <div class="left">
        左
    </div>
    <div class="right">
        右
    </div>
</div>

.right{

}
```
##### float三栏布局
#### inline-block布局


### flexbox/grid(偏简单)
#### flexbox布局

### 响应式布局(如何适配移动端页面)
在不同设备上正常使用，主要处理屏幕大小问题
方法：
- viewport
- 隐藏，折行，自适应空间
- rem/viewport/media query

#### 实现两栏（三栏）布局的方法
```
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

#### 如何清除浮动
- 让盒子负责自己的布局
- overflow:hidden(auto)
- ::after(clear:both)

## flex布局

### 容器显示flex
#### display:flex
```
.box{
    display:flex
}
//行内元素
.box{
    display:inline-flex
}
webkit内核浏览器（safari）
.box{
    display:-webkit-flex;
    display:flex;
}
```

### 容器其他属性
#### flex-direction
项目排列方向：row | row-reverse | column | column-reverse;

#### flex-wrap
换行：nowrap | wrap | wrap-reverse;

#### flex-flow以上两项合集
默认：row nowrap。

#### justify-content
主轴对齐方式：flex-start | flex-end | center | space-between | space-around;

#### align-items
交叉轴对齐方式：flex-start | flex-end | center | baseline | stretch;

#### align-content
多根轴的对齐方式：flex-start | flex-end | center | space-between | space-around | stretch;

### 项目的属性

#### order
项目排列顺序：默认0，数值越小排列越靠前

#### flex-grow
项目放大比例：默认0，数值越大，放大比例越大

#### flex-shrink
项目缩小比例：默认1，数值越大，缩小比例约小

#### flex-basis
项目占据空间：默认auto(项目本来的大小)，可设350px等固定大小

#### flex以上三项合集
默认：0 1 auto，第一个值必填。后两个可选。
快捷值：auto (1 1 auto) 和 none (0 0 auto)
优先使用这个，而不是分开写

#### align-self
某项目的对齐方式：auto | flex-start | flex-end | center | baseline | stretch;

## grid（网格）布局












