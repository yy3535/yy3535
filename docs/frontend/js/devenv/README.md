# 03-开发环境

## IDE

### 题目

- 【面试】了解哪些IDE，日常用的最多的是哪个？

### 解答

IDE 即你用什么编辑器来编写代码。这块肯定不会出笔试题，面试题也就基本简单聊一聊，但是就这么简单一聊，聪明的面试官就能管中窥豹，了解到你平常到底是否经常写代码。

#### 了解哪些IDE，日常用的最多的是哪个？

前端最常用的 IDE 有 [webstorm](https://www.jetbrains.com/webstorm/) [sublime](https://www.sublimetext.com/) [atom](https://atom.io/) 和 [vscode](https://code.visualstudio.com/)，我们可以分别是他们的官网看一下。

webstorm 是最强大的编辑器，因为它拥有各种强大的插件和功能，但是我没有用过，因为它收费。不是因为我舍不得花钱，是因为我觉得免费的 sublime 已经够我用了。因此，跟面试官聊到 webstorm 之后，没用过没事儿，一定要知道它：第一，强大；第二，收费。

sublime 是我日常用的编辑器，第一它免费，第二它轻量、高效，第三它插件非常多。用 sublime 一定要安装各种插件配合使用，可以去网上搜一下“sublime”常用插件的安装以及用法，还有它的各种快捷键，并且亲自使用它。这里就不一一演示了，网上的教程也很傻瓜式。

atom 是 github 出品的编辑器，跟 sublime 差不多，免费并且插件丰富，而且跟 sublime 相比风格上还有些小清新。但是我用过几次就不用了，因此它第一打开的时候会比较慢，卡一下才打开。当然总体来说也是很好用的，只是个人习惯问题。

vscode 是微软出品的轻量级（相对于 visual studio 来说）编辑器，微软做 IDE 那是出了名的好，出了名的大而全，因此 vscode 也有上述 sublime 和 atom 的各种优点，但是我也是因为个人习惯问题（本人不愿意尝试没有新意的新东西），用过几次就不用了。

总结一下：

- 如果你要走大牛、大咖、逼格的路线，就用 webstorm
- 如果你走普通、屌丝、低调路线，就用 sublime
- 如果你走小清新、个性路线，就用 vscode 或者 atom
- 如果你面试，最好有一个用的熟悉，其他都会一点

最后注意：千万不要说你使用 Dreamweaver 或者 notpad++ 写前端代码，会被人鄙视的。如果你不做 .net 也不要用 Visual Studio ，不做 java 也不要用 eclipse

## Git

### 题目

- 【笔试】写出一些常用的 git 命令
- 【面试】简述多人使用 git 协作开发的基本流程

### 解答

你此前做过的项目一定要用过 git ，而且必须是命令行，如果没用过，你自己也得恶补一下。对 git 的基本应用比较熟悉的同学，可以跳过这一节了。mac os 自带 git，windows 需要安装 git 客户端，自己去网上找。

国内比较好的 git 服务商是 coding.net ，国外的是大名鼎鼎的 github 但是很容易被墙。因此建议大家注册一个 coding.net 然后创建一个项目，来练练手。

#### 写出一些常用的 git 命令

- git add .
- git checkout xxx
- git commit -m "xxx"
- git push origin master
- git pull origin master
- git stash / git stash pop

#### 简述多人使用 git 协作开发的基本流程

- git branch
- git checkout -b xxx / git checkout xxx
- git merge xxx

#### 关于 svn

关于 svn 我的态度和针对 IE 低版本浏览器的态度一样，你要查询一下资料简单了解一下，面试的时候可能会问到，但是你只要熟悉了 git 的操作，面试官不会因为你不熟悉 sv 就难为你。但是前提是你要知道一点 svn 的基本命令，自己上网一查就行。

但是 svn 和 git 的区别你得了解。svn 是每一步操作都离不开服务器，创建分支，提交代码都需要连接服务器。而 git 就不一样了，你可以在本地创建分支，提交代码，最后再一起 push 到服务器上。因此，git 拥有 svn 的所有功能，但是却比 svn 强大的多。（git 是 linux 的创始人发明的东西，因此也倍得推崇）

## 模块化

这一小节就不出题目了，因为它本身就是一个题目，范围也比较单一，就是模块化。

### 为何需要模块化

#### 原始情况

规模较大的前端项目，不可能使用一个 JS 文件就能写完，不同的功能需要封装到不同的 JS 文件中，这样便于开发也便于维护。

项目的基础库`util.js`

```js
function getFormatDate(date, type) {
    // type === 1 返回 2017-06-15
    // type === 2 返回 2017年6月15日 格式
    // ……
}
```

项目有好多个业务，不同业务需要的日期格式不一样，因此每个业务有一个基础库`a-util.js`

```js
function aGetFormatDate(date) {
    return getFormatDate(date, 2) // 要求返回 2017年6月15日 格式
}
```

具体落实这个业务的功能层面，就需要使用业务的基础库，定义`a.js`

```js
var dt = new Date()
console.log(aGetFormatDate(dt))
```

这样，我们再使用`a.js`的时候，就需要去这样引用

```html
<script src="util.js"></script>
<script src="a-util.js"></script>
<script src="a.js"></script>
```

这样使用会有两个问题：

- 这些代码中的函数必须是全局变量，才能暴露给使用方，但是全局变量会造成很严重的污染，很容易覆盖别人的或者被别人覆盖
- `a.js`知道要引用`a-util.js`，但是他知道还需要依赖于`util.js`吗？如果不知道，就漏掉，就会报错

#### 使用模块化之后

模块化之后，我们的代码大体上要这么写（只是代码描述，并不一定真的这么写）

util.js

```js
export {
    getFormatDate: function (date, type) {
        // type === 1 返回 2017-06-15
        // type === 2 返回 2017年6月15日 格式
    }
}
```

a-util.js

```js
var getFormatDate = require('util.js')
export {
    aGetFormatDate: function (date) {
        return getFormatDate(date, 2) // 要求返回 2017年6月15日 格式
    }
}
```

a.js

```js
var aGetFormatDate = require('a-util.js')
var dt = new Date()
console.log(aGetFormatDate(dt))
```

这样，我们在使用时

- 直接`<script src="a.js"></script>`，其他的根据依赖关系自动引用
- 那两个函数，没必要做成全局变量，不会带来污染和覆盖

以上只是我们理想的两个状态，接下来就说一下具体该如何去实现。

### AMD

AMD 模块化规范是比较早提出的，现在也是比较成熟的模块化规范，代表工具是`require.js`，使用之后它会定义两个全局函数

- define 定义一个变量并返回，可供其他js引用
- require 引用其他已经定义好的变量
- 依赖的代码会自动、异步加载

拿上面的例子来做一个样例

首先是 util.js

```js
define(function () {
    return {
        getFormatDate: function (date, type) {
            if (type === 1) {
                return '2017-06-15'
            }
            if (type === 2) {
                return '2017年6月15日'
            }
        }
    }
})
```

然后是 a-util.js

```js
define(['./util.js'], function (util) {
    return {
        aGetFormatDate: function (date) {
            return util.getFormatDate(date, 2)
        }
    }
})
```

最后是 a.js

```js
define(['./a-util.js'], function (aUtil) {
    return {
        printDate: function (date) {
            console.log(aUtil.aGetFormatDate(date))
        }
    }
})
```

接下来是如何引用，我们还得定义一个`main.js`

```js
require(['./a.js'], function (a) {
    var date = new Date()
    a.printDate(date)
})
```

然后在页面中引用`<script src="js/require.js" data-main="./main.js"></script>`，运行时注意，各个js文件会异步加载

### CommonJS

CommonJS 是 nodejs 中模块定义的规范，但是这种规范越来越被放在前端开发来使用（当然这需要构建工具的编译，下一节讲述），原因如下

- 前端开发依赖的插件和库，都可以从 npm 中获取
- 构建工具的高度自动化，使得使用 npm 的成本非常低

CommonJS 不会异步加载各个JS，而是同步一次性加载出来

我们先来看一下 CommonJS 的输入和输出都是什么规范，然后下一节通过结合构建工具和 npm 一起演示一下使用方法。

util.js

```js
module.exports = {
    getFormatDate: function (date, type) {
        if (type === 1) {
            return '2017-06-15'
        }
        if (type === 2) {
            return '2017年6月15日'
        }
    }
}
```

a-util.js

```js
var util = require('util.js')
module.exports = {
    aGetFormatDate: function (date) {
        return util.getFormatDate(date, 2)
    }
}
```

### AMD 和 CommonJS 的不同使用场景

CommonJS 解决的问题和 AMD 一样，只不过是不同的标准而已，他们没有孰好孰坏之分，只是不同的工具使用场景不一样而已。

- 使用 AMD：各种代码都是自己定义的，不用依赖于 npm
- 使用 CommonJS：依赖于 npm

## 模块化-直接看代码演示 /code/webpack

新建一模一样的项目练习熟练。。

## 上线和回归

### 上线和回滚的流程

#### 介绍

- 上线和回滚是开发过程中的重要流程
- 各个公司上线和回滚的流程都不一样
- 由有具体的工具或者系统来搞定，无需我们关心细节
- 你也许没有体会过这类规范的流程，但是你要知道一些要点
- 只说要点，不详细讲解，也没法详细讲解

#### 上线原理

- 将测试完成的代码提交到git版本库的master分支
- 将当前服务器的代码全部打包并记录版本号，备份
- 将master分支的代码提交覆盖到线上服务器，生成新版本号

#### 回滚原理

- 将当前服务器的代码打包并记录版本号，备份
- 将备份的上一个版本号解压，覆盖到线上服务器，并生成新的版本号

### linux 服务器的基本命令

线上服务器一般使用 linux 服务器，而且是 server 版本的 linux，没有桌面也没有鼠标，如何操作呢？

**登录**

入职之后，一般会有现有的用户名和密码，拿来之后直接登录就行。运行 `ssh name@server` 然后输入密码即可登录

**目录操作**

- 创建目录 `mkdir`
- 删除目录 `rm -rf`
- 定位目录 `cd ` 返回上一级目录 cd ..
- 看当前目录 pwd
- 查看目录文件 `ls` `ll`
- 修改目录名 `mv `
- 拷贝目录 `cp a.js a1.js 移动文件 mv a1.js src/a1.js`

**文件操作**

- 创建文件 `touch ` `vi /vim==>i(输入)==>esc(退出输入)==>:w(保存)==>:q(退出)`
- 删除文件 `rm`
- 修改文件名 `mv`
- 拷贝文件 `cp` `scp`

**文件内容操作**

- 查看文件 `cat(全部)/head(前一部分)head -n 1 a.js/tail(后一部分)tail -n 2 a.js`
- 编辑文件内容 `vi /vim`
- 查找文件内容 `grep '2' a.js`