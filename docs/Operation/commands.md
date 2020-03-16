# commands
## 目录
```js
mkdir xxx xxx xxx
mkdir -p xxx/xxx xxx/xxx
cd xxx
ls xxx
```

## 新建文件
```js
touch xxx/xxx xxx
```

## 用某个软件打开某个目录
```js
// 打开当前的app目录
open -a atom app/
// 打开当前目录
open -a atom .
```

## 清空命令行记录
```js
clear
```

## 新建一个文件并写一行代码进去
```
echo '...' > xxx.xxx
echo '<template><h1>Hello!</h1></template>' > App.vue
```

## node升级
- windows:去官网下载新的安装包覆盖安装
- mac及其他：安装npm升级模块

## npm install时 报错Maximum call stack size exceeded
- 给npm降级或者升级

降级 ： npm install -g npm@5.4.0

升级 ： npm install -g npm  升级到最新版

## npm run dev 时报TypeError: Cannot read property 'compilation' of undefined
- 升级node版本，因为别人的node版本高，所以安装的包版本高，导致安装时node版本不够高。
- 这是版本问题。打开项目的package.json文件可以发现，webpack是3.6.0版本，optimize-css-assets-webpack-plugin是5.0.1版本
  - 解决：npm i optimize-css-assets-webpack-plugin@3.2.0
- npm run dev 报
```js
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! hzguanjia@1.0.0 dev: webpack-dev-server --open --inline --progress --config build/webpack.dev.conf.js
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the hzguanjia@1.0.0 dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\DELL\AppData\Roaming\npm-cache_logs\2019-04-03T06_40_57_606Z-debug.log
```
  - 解决：npm install webpack-dev-server@2.9.7 --save-dev

## 文件写入，保存
- 如果在命令行下使用vim，先按下ESC退出编辑模式，然后输入：wq 保存并退出或者q退出或者q!强制退出，从而回到命令行界面。

## yarn
- yarn add [package]@[version]
- yarn remove <package...>

## mac操作快捷键
【⇧+⌘+。】 显示/隐藏隐藏的文件夹