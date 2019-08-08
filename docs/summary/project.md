# 业务开发

## 业务开发流程

### 技术选型

#### 构建工具
1. 构建工具有哪些
- 任务分配和管理
`gulp`（流操作，输入输出）
`grunt`（不是流操作复杂项目比较慢）
- 不仅管理，而且编译
`webpack`
`rollup`（跟webpack类似）
- 其他
`fis`（百度内部）
`prepack`（facebook）

2. 为什么要构建工具
`资源压缩` `静态资源替换` `模块化处理` `编译处理`

3. 我们用哪个构建工具
`webpack`做编译 `npm scripts`做管理

#### MVVM框架选择
`Vue`
`React`
`Angular`-后端转前端
#### 模块化设计
1. js模块化设计
    - common.js 公司内所有项目的登录，注册等通用的东西
    - layout.js 公共布局
    - public.js(引入common.js和layout.js)
    - util.js
    ![模块化设计](./img/module-design.jpg)
2. CSS模块化设计
#### 自适应方案设计



#### 代码维护及复用性设计的思考
- 需求变更
- 产品迭代
- Bug定位
- 新功能开发


### 业务开发

### 测试验证

### 发布上线


## 项目设计与原理分析

### CSS模块化设计

1. 设计原则
- 可复用能继承要完整
- 周期性迭代

2. 设计方法
- 先整体后部分再颗粒化
    - 布局-页面（大的页面）-功能（基础组件）-业务
- 先抽象再具体
    - 京东金融可以把所有块作为面板抽象出来
    - 抽象成列表（横向/纵向）

3. 具体方案
![css模块化](./img/css-modules.jpg)
- reset.scss 重置默认样式
- layout.scss 布局样式
- element.scss 列表，按钮等功能性的东西

```css
/* layout.css */
/* 使用utf-8编码 */
@charset “UTF-8"

@mixin flex($direction:column,$inline:block){
    display: if($inline==block,flex,inline-flex);
    flex-direction:$direction;
    flex-wrap:wrap;
}
```

```css
/* element.scss */
@import "./layout.scss"

@mixin btn($size:14px,$color:#fff,$bgcolor:#F04752,$padding:5px,$radius:5px){
    padding:$padding;
    background-color:$bgcolor;
    border-radius:$radius;
    border:1px solid $bgcolor;
    font-size:#size;
    color:$color;
    text-align:center;
    line-height:1;
    display:inline-block;
}

@mixin list($direction:column){
    @include flex($direction);
}

@mixin panel($bgcolor:#fff,$padding:0,$margin:20px 0,$height:112px,$txtPadding:0 32px,$color:#333,$fontSize:32px){
    background:$bgcolor;
    padding:$padding;
    margin:$margin;
    >h4{
        height:$height;
        line-height:$height;
        padding:$txtPadding;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        text-align:center;
        color:$color;
        font-size:$fontSize;
    }
}

```

### JS组件设计
1. 设计原则
- 高内聚低耦合
    - 功能组件直接不要互相依赖(最高效复用)
- 周期性迭代
2. 设计方法
- 先整体后部分再颗粒化
- 尽可能地抽象（让任何东西都可以用的地步）

### JS自适应
- 移动端自适应，一份代码跑遍各个设备
1. 基本概念（https://github.com/jawil/blog/issues/21）
    - CSS像素(px)，设备像素(也叫物理像素，设备上的一个像素)，逻辑像素(px)，设备像素比（逻辑像素和设备像素的比值，比如苹果是2）
    - viewport
    - rem
2. 工作原理
    - 利用viewport和设备像素比调整基准像素（html的fontsize通过js动态地按物理像素/css像素的比值进行调整）
    - 利用px2rem自动转换css单位

### SPA设计
1. 设计意义
   - 前后端分离(前后端代码不耦合)
   - 减轻服务器压力（当一个应用操作比较复杂，有十几个页面的时候，每个用户操作几个页面只需要请求一次）
   - 增强用户体验（不存在多次下载页面的时间，只有接口的时间）
   - Prerender预渲染优化SEO(单页面对搜索引擎不友好，使用预渲染优化)![预渲染](codingfishman.github.io/2016/05/06/prerender预渲染优化SEO/)
2. 工作原理
   - History API(更加优雅，但对浏览器有要求)
    ![historyapi](./img/historyapi.jpg)
    - window.history.pushState()注册路由
    - 
   - Hash（不优雅，但兼容性最好）
     - 使用location.hash修改路由
     - 目标页面监听hashchange事件
    ![hash](./img/hash.jpg)
    
3. 面试
   - spa做了哪些事情？
   - 它是怎么做到的？

