# vuepress

## 安装VuePress

```
npm install -D vuepress
```

## 新建如下文件

```
project
├─── docs
│   ├── README.md
└── package.json
```

## 在docs/README.md中添加代码

```
# my first vuepress
```

## 在package.json中添加代码

```
{
    "scripts": {
        "dev": "vuepress dev docs",
        "build": "vuepress build docs"
    }
}
```

## 启动项目

```   
npm run dev
```

![img](https://upload-images.jianshu.io/upload_images/7704547-40844c80b175f261.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/247/format/webp)
- 生成静态的 HTML 文件

```
npm run build
//文件默认被生成在 .vuepress/dist，可通过config.js dest 字段修改。
```

## 创建如下文件
```
project
├─── docs //根目录，也是vuepress要解析的文件夹
│   ├── README.md //首页页面
│   └── .vuepress
│       ├── dist //打包生成的文件
│       ├── public //图片等静态资源
│       ├── config.js //主题配置
|       └── components //自定义组件
└── package.json
```

## config.js基本配置
```
module.exports = {
    // base 会自动添加到以 / 开头的所有 URL 中,默认'/'
    base: '/note/',
    // 网站标题，显示在导航栏中
    title: 'yy3535', 
    // 网站描述，meta标签
    description: 'yy3535的笔记', 
    // 被注入页面 HTML <head> 额外的标签
    head: [
        ['link', { rel: 'icon', href: '/img/geass-bg.ico' }]
    ]
}
```

## 主页布局
```
---
home: true
heroImage: /hero.png
actionText: Get Started →
actionLink: /guide/
features:
- title: Simplicity First
details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Vue-Powered
details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
- title: Performant
details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

之后的任何其他内容将在功能部分之后呈现。

## 顶部导航栏和侧边栏配置
```
module.exports = {
    ...
//主题配置
themeConfig: {

    // 嵌套标题深度，将提取标题到侧边栏
    sidebarDepth: 4, 

    <!------github仓库和编辑链接------!>
    // 假定 GitHub。也可以是一个完整的 GitLab 网址
    repo: 'vuejs/vuepress',
    // 如果你的文档不在仓库的根部
    docsDir: 'docs',
    // 可选，默认为 master
    docsBranch: 'master',
    // 默认为 true，设置为 false 来禁用
    editLinks: true
    editLinkText: 'Help us improve this page!'

    // 文档更新时间：每个文件git最后提交的时间,
    lastUpdated: 'Last Updated' ,

    //代码块显示行数
    markdown: {
        lineNumbers: true
    }

    //搜索框
    search: false,
    searchMaxSuggestions: 10
    apiKey: '<API_KEY>',
    indexName: '<INDEX_NAME>'

    //上次更新，默认off，给string则显示string
    lastUpdated: '上次更新', 
    
    // 顶部导航栏
    nav:[
        //简单项
        { text: 'frontend', link: '/Frontend/' },
        //设置下拉列表
        {
            text: 'Languages',
            items: [
            { text: 'Chinese', link: '/language/chinese' }
            ]
        },
        //设置下拉列表分组
        {
            text: 'Languages',
            items: [
            { text: 'Group1', items: [/*  */] },
            { text: 'Group2', items: [/*  */] }
            ]
        }
    ],
    //禁用导航栏
    navbar: false,
    // 侧边栏
    //自动生成仅包含当前页面的标题链接的侧栏
    sidebar:'auto',
    sidebar: [
        '/',
        '/page-a',
        //自定义标题
        ['/page-b', 'Explicit link text'],
        //多级菜单
        '/js/jsbasic/xxx',
    ],
    sidebar: [
        {
            title: 'Group 1',
            强制一个组始终打开
            collapsable: false,
            children: [
            '/',
            //多级菜单
            '/js/jsbasic/xxx',
            ]
        },
        {
            title: 'Group 2',
            children: [ /* ... */ ]
        }
    ],
    sidebar: {
        // 侧边栏在 /foo/ 上
        '/foo/': [
        '',
        'one',
        'two'
        ],
        // 侧边栏在 /bar/ 上
        '/bar/': [
        '',
        'three',
        'four'
        ]
    },
}
```

- 图片等静态资源的路径/默认指向public文件夹
- 导航路径/默认指向docs文件夹
- .md扩展名可省略，/结尾的路径默认为/README.md，自动把页面第一个标题显示为变体，自定义可使用[link,text]形式

## 页面单独自定义  
用---包起来

```
---
//页面覆盖提取标题深度
sidebarDepth: 2
//自动生成仅包含当前页面的标题链接的侧边栏(可在该页面单独定义)
sidebar: auto
//禁用特定页面上的侧边栏
sidebar: false
//上一个下一个是根据侧边栏自动推断的，可覆盖或者禁用上一个下一个
prev: ./some-other-page
next: false
//自定义页面独有class
pageClass: custom-page-class
.theme-container.custom-page-class {
    /* page-specific rules */
}
//特定页面的自定义布局,这将为给定页面渲染 `.vuepress/components/SpecialLayout.vue`
layout: SpecialLayout
//禁用特定页面导航栏
navbar: false
//显示侧边栏所有页面的标题链接
displayAllHeaders: true // Default: false
//禁用侧边栏跟随滚动效果以及url哈希值变化效果
activeHeaderLinks: false
//隐藏特定页面上的编辑链接
editLink: false

---
```

## CSS覆盖
创建一个 `.vuepress/override.styl` 文件,有几个颜色变量可以调整：
```
// 显示默认值
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
```


## 打包放github

打包后找到 `docs/.vuepress/dist` 的文件，拷贝到github仓库中，访问http://yy3535.github.io。


## 静态资源
- 相对路径
- 基础路径
会在基础路径后寻找`.vuepress/public`路径下的文件
```vue
<img :src="$withBase('/foo.png')" alt="foo">
```

## Markdown 拓展
- 内部链接
```md
[Home](/) <!-- 跳转到根部的 README.md -->
[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->
[foo heading anchor](/foo/#heading) <!-- 跳转到 foo/index.html 的特定 anchor 位置 -->
[foo - one](/foo/one.html) <!-- 具体文件可以使用 .html 结尾 -->
[foo - two](/foo/two.md) <!-- 也可以用 .md -->
```
注意：

1. 确保链接以 .html 或 .md 结尾；

2. 确保路径大小写正确，因为路径的匹配是大小写敏感的。

- GitHub风格的表格
```md
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

- Emoji
```md
:tada: :100:
```
[所有表情](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)
- 目录
```md
[[toc]]
```
可以通过 markdown.toc 选项来配置

- 自定义容器
```md
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: danger STOP
Danger zone, do not proceed
:::
```

- 代码块中的行高亮
```md
``` js{4}
export default {
data () {
    return {
    msg: 'Highlighted!'
    }
}
}
```/
```

- 行号
```js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}  
```