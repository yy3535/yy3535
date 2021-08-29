# 开发环境

## Git

### 常用的 git 命令

- git add .
- git checkout xxx
- git commit -m "xxx"
- git push origin master
- git pull origin master
- git stash / git stash pop

### 多人使用 git 协作开发的基本流程

- git branch
- git checkout -b xxx / git checkout xxx
- git merge xxx

### svn 和 git 的区别
- svn 是每一步操作都离不开服务器，创建分支，提交代码都需要连接服务器。
- git 可以在本地创建分支，提交代码，最后再一起 push 到服务器上。
- git 拥有 svn 的所有功能，但是却比 svn 强大的多。

## 模块化

这一小节就不出题目了，因为它本身就是一个题目，范围也比较单一，就是模块化。

### 为何需要模块化
- 全局变量污染
- 引用多个模块后必须分清模块的依赖关系

### 使用模块化之后
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