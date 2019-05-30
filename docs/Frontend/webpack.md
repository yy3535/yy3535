# webpack

## 模块打包机
    - 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
    - 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
    - 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
    - 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
    - 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
    - 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
    - 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。
  
## 安装
- yarn add webpack webpack-cli 
- yarn init
    - 默认有内置配置，默认打包index.js成main.js
    - 打包原理：从index.js按require顺序一层一层打包（commonjs规范）

- npx webpack
    - 会执行nodemodules/bin/webpack.cmd，打包
```json
// package.json
{
    "scripts":{
        "dev":"webpack-dev-server",
        "build":"webpack",
        // start可以省略run
        "start":"yarn run dev"
    }
}
```

- npx webpack --mode development
    - mode默认production，会压缩代码，development，开发模式，不压缩代码
- 根目录新建webpack.config.js
  - 配置文件只能用commonjs规范（基于node）
  - 如果修改了配置文件名字，就需要`npx webpack --config new-name`来打包
```js
let path=require('path');
// 引入插件
let HtmlWebpackPlugin=require('html-webpack-plugin');
let MiniCssExtractPlugin=require('mini-css-extract-plugin');
let UgligyJsPlugin=require('uglifyjs-webpack-plugin');
let OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');
module.exports={
    // 生产模式
    mode:'production',
    // 生产模式的压缩配置
    optimization:{
        minimizer:[
            new UgligyJsPlugin({
                cache:true,
                // 并行
                parallel:true,
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    // 单入口
    entry:'./src/index.js',
    // 多入口
    entry:{
        main:'./src/index.js',
        other:'./src/other.js',
    },
    // 打包出口
    output:{
        // 路径（必须为绝对路径）
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        // 可生成多个入口名字的文件
        filename:'[name].js',
        // 静态文件带8位哈希值，避免缓存
        filename:'[name].[hash:8].js',
    },
    // 开发服务的配置
    devServer:{
        // 打包内容目录
        contentBase:'./dist',
        // 端口号
        port:3000,
        // 进度条
        progress:true,
        // 压缩文件
        compress:'true',
    },
    // 插件(插件配置去npm.org.com找)
    plugins:[
        // 自动生成一个html文件来引用入口文件
        new HtmlWebpackPlugin({
            // 以下二选一
            filename:'index.html',
            template:'./public/index.html',
            // 对应入口文件生成Html
            chunks:['main'],
            // 文件压缩
            minify:{
                removeAttributeQuotes:true,
                removeTagWhitespace:true,
            },
            // 引用js文件的哈希值设置变化的（避免缓存）
            hash:true
        }),
        // 可写多个生成多个html对应多个入口文件
        new HtmlWebpackPlugin({
            // 以下二选一
            filename:'other.html',
            template:'./public/other.html',
            // 对应入口文件生成html
            chunks:['other'],
        }),
        // 抽离样式为link插件
        new MiniCssExtractPlugin({
            filename:'main.css'
        })
    ],
    // 加载器
    modules:{
        // 规则
        // use值有三种['style-loader'],'style-loader',[{loader:'style-loader',...options或者query}]
        rules:[
            
            // css加载器（顺序不能变）
                // style把样式style标签加到html文件中，css解析@import
                // less：安装less,使用less-loader
                // sass：安装node-sass,使用sass-loader
                // stylus：安装stylus,使用stylus-loader
            {
                test:/\.css$/,
                use:['style-loader','css-loader','less-loader'],
                use:[{
                    loader:'style-loader',
                    options:{
                        // 让style标签插在最上面
                        insertAt:'top'
                    }
                },'css-loader','less-loader'],
            },
            {
                test:/\.css$/,
                use:[
                    // 抽离css样式到link标签中，mini-css-extract-plugin
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // css浏览器前缀自动添加。根目录创建对应配置文件`postcss.config.js`
                    'postcss-loader'
                ]
            },
            // js es6-->es5
            {
                test:/\.js/,
                use:[{
                    loader:'babel-loader',
                    // es6转es5的规则，相当于根目录建`.babelrc`
                    options:{
                        // babel预设配置
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            // 装饰器识别(放类属性上面要)
                            ['@babel/plugin-proposal-decorators',{"legacy":true}],
                            // 类属性
                            ['@babel/plugin-proposal-class-properties',{"loose":true}],
                        ]
                    }
                }],
                // 编译打包时不需要的文件目录
                exclude:/node_modules/
            },
            // js babel使用.babelrc文件配置
            {
                test:/\.js/,
                // 代码规范校验,顺序不能变，校验配置文件根目录建.eslintrc.json，可在eslint官网demo生成
                use:['babel-loader','eslint-loader'],
                exclude:/node_modules/
            },
            // 代码规范校验
            {
                test:/\.js$/,
                use:'eslint-loader',
                // 确保在最之前校验
                enforce:'pre',
            },
        ]
    }
}
```

```cmd
<!-- 安装插件 -->
yarn add html-webpack-plugin -D
yarn add mini-css-extract-plugin -D
yarn add postcss-loader autoprefixer -D
```

```cmd
<!-- 安装加载器 -->
yarn add css-loader style-loader
yarn add @babel/core @babel/preset-env babel-loader
<!-- 安装代码校验 -->
yarn add eslint eslint-loader
```

```cmd
<!-- 安装babel的插件 -->
yarn add @babel/plugin-proposal-class-properties
yarn add @babel/plugin-proposal-decorators
<!-- 转某些高级es6es7语法 -->
yarn add @babel/runtime
yarn add plugin-transform-runtime
<!-- 转实例上的高级语法 -->
yarn add babel-polyfill
```

```js
// postcss.config.js
module.exports={
    plugins:[require('autoprefixer')]
}
```

```js
// .babelrc
{
    "presets":[
        "@babel/preset-env",
    ],
    "plugin":[
        // 转某些高级es6es7语法(generator,promise等babel无法转的)
        "@babel/plugin-transform-runtime",
    ]
}
```

```js
import './other.js';
// 转实例上的高级语法
import 'babel-polyfill';

str.includes('o');// es7
```

```js
// .eslintrc.json
{
    "parserOptions": {
        "ecmaVersion": 5,
        "sourceType": "script",
        "ecmaFeatures": {}
    },
    "rules": {
        // 改成0即可不验证
        "constructor-super": 2,
        "no-case-declarations": 2,
        "no-class-assign": 2,
        "no-compare-neg-zero": 2,
        "no-cond-assign": 2,
        "no-console": 2,
        "no-const-assign": 2,
        "no-constant-condition": 2,
        "no-control-regex": 2,
        "no-debugger": 2
    },
    "env": {}
}
```

- 启动开发服务
```cmd
yarn add webpack-dev-server -D
```
  - npx webpack-dev-server
    - 启动开发服务（修改后可及时更新页面。打包的页面存在内存里，并不打包出来）
