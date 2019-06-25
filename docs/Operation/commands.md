# commands

## 清空命令行记录
```
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