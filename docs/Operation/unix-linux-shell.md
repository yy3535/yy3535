# shell

## 参考链接
- [UNIX / Linux 初学者教程](http://www.ee.surrey.ac.uk/Teaching/Unix/index.html)

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

## 文件写入，保存
- 如果在命令行下使用vim，先按下ESC退出编辑模式，然后输入：wq 保存并退出或者q退出或者q!强制退出，从而回到命令行界面。