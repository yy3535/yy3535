# 【8. webpack】
[webpack](https://www.webpackjs.com/guides/production/)
## 什么是WebPack
- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。
## 初始化项目
```md
mkdir webpack-test
cd webpack-test
npm init -y
```
## 快速上手
### 核心概念
- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。
- context: context即是项目打包的路径上下文，如果指定了context,那么entry和output都是相对于上下文路径的，contex必须是一个绝对路径
> Webpack 启动后会从Entry里配置的Module开始递归解析 Entry 依赖的所有 Module。 每找到一个 Module， 就会根据配置的Loader去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。
### 配置webpack
```md
npm install webpack webpack-cli -D
```
#### 创建src目录
```md
mkdir src
```
#### 创建dist目录
```md
mkdir dist
```
#### 打包命令
- npx webpack
    - 会执行nodemodules/bin/webpack.cmd
    - 默认将src/index.js打包成dist/main.js
- npx webpack --mode development
    - 默认production，压缩代码，development，不压缩代码
:::tip
```json
// package.json
{
    "scripts":{
        "dev":"webpack-dev-server",
        "build":"webpack",
        "start":"yarn run dev"
    }
}
```
:::
:::tip 打包原理
从index.js按require顺序一层一层打包（commonjs规范）
:::
#### 创建基本配置文件
- entry：配置入口文件的地址
- output：配置出口文件的地址
- module：配置模块,主要用来配置不同文件的加载器
- plugins：配置插件
- devServer：配置开发服务器
```js
// webpack.config.js
module.exports={
    entry: './src/index.js',// entry:['react','react-dom'],
    output: {
        path: path.resolve(__dirname,'dist'),// 输出的目录只能是绝对路径
        filename:'bundle.js'
    },
    module: {},
    plugins: [],
    devServer: {}
}
```
#### 创建index.html文件
```html
<body>
    <div id="root"></div>
    <script src="bundle.js"></script>
</body>
```
#### mode
- development
- production
- none

common
```js
//parent chunk中解决了的chunk会被删除
optimization.removeAvailableModules:true
//删除空的chunks
optimization.removeEmptyChunks:true
//合并重复的chunk
optimization.mergeDuplicateChunks:true
```
development
```js
//调试
devtool:eval
//缓存模块, 避免在未更改时重建它们。
cache:true
//缓存已解决的依赖项, 避免重新解析它们。
module.unsafeCache:true
//在 bundle 中引入「所包含模块信息」的相关注释
output.pathinfo:true
//在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。
optimization.providedExports:true
//找到chunk中共享的模块,取出来生成单独的chunk
optimization.splitChunks:true
//为 webpack 运行时代码创建单独的chunk
optimization.runtimeChunk:true
//编译错误时不写入到输出
optimization.noEmitOnErrors:true
//给模块有意义的名称代替ids
optimization.namedModules:true
//给模chunk有意义的名称代替ids
optimization.namedChunks:true
```
production
```js
//性能相关配置
performance:{hints:"error"....}
//某些chunk的子chunk已一种方式被确定和标记,这些子chunks在加载更大的块时不必加载
optimization.flagIncludedChunks:true
//给经常使用的ids更短的值
optimization.occurrenceOrder:true
//确定每个模块下被使用的导出
optimization.usedExports:true
//识别package.json or rules sideEffects 标志
optimization.sideEffects:true
//尝试查找模块图中可以安全连接到单个模块中的段。- -
optimization.concatenateModules:true
//使用uglify-js压缩代码
optimization.minimize:true
```
## 配置开发服务器
- npx webpack-dev-server
    - 启动开发服务（修改后可及时更新页面。打包的页面存在内存里，并不打包出来）
- 内置了express
```md
yarn add webpack-dev-server -D
```
```js
devServer:{
    contentBase:path.resolve(__dirname,'dist'),
    host:'localhost',
    compress:true,
    port:8080
}
// 开发服务的配置
devServer:{
    // 静态文件放置目录(产出的文件写到内存里，而不是写在硬盘上。为了速度快。)
    contentBase:'./dist',
    // 端口号
    port:3000,
    // 进度条
    progress:true,
    // 服务开启gzip压缩
    compress:'true',
    
},
```

## 支持加载css文件
- module/rules中使用不同的loader把不同的文件转成JS
### 参数
- test：匹配处理文件的扩展名的正则表达式
- use：loader名称，就是你要使用模块的名称
- include/exclude:手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
- query：为loaders提供额外的设置选项
- enforce:'pre',确保在最之前校验
                
### loader三种写法
```js
// loader
{
    test: /\.css/,
    loader:['style-loader','css-loader']
}
// use
{
    test: /\.css/,
    use:['style-loader','css-loader']
}
// use+loader
{
    test: /\.css/,
    include: path.resolve(__dirname,'src'),
    exclude: /node_modules/,
    use: [{
        loader: 'style-loader'
    },'css-loader']
}
```

## 插件
模块代码转换的工作由 loader 来处理。除此之外的其他任何工作都可以交由 plugin 来完成
### 自动生成html
自动生成HTML文件，并在里面引入生成的资源，chunksSortMode可以控制引入顺序,写多个不同的入口文件即生成多个html
```md
yarn add html-webpack-plugin -D
```
```js
entry:{
    index:'./src/index.js',  // chunk名字 index
    common:'./src/common.js' //chunk名字 common
},
// 自动生成一个html文件来引用入口文件
new HtmlWebpackPlugin({
    filename:'index.html',// 产出后的文件名
    template:'./public/index.html',// 指定模板文件
    hash:true,// 为了避免缓存，可以在产出的资源后面添加hash值
    minify:{// 对html文件进行压缩
        removeAttributeQuotes:true,// 去掉属性的双引号
        removeTagWhitespace:true,
    },
    chunks:['common','index'],// 引入的入口文件
    chunksSortMode:'manual'//对引入代码块进行排序的模式 手工
})
```
## 支持图片
### 手动添加图片
```md
yarn add file-loader url-loader -D
```
- file-loader(图片拷贝),可用url-loader代替，url-loader会调用file-loader
    - file-loader 解决CSS等文件中的引入图片路径问题
    - url-loader 当图片小于limit的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
    - options
        - limit
        - publicPath:'https://www.baidu.com',打包时只在图片地址前加域名
### JS中引入图片
```js
import logo from '../images/logo.png';
let img=new Image();
img.src=logo;
document.body.appendChild(img);
```
```js
{
  test:/\.(jpg|png|bmp|gif|svg)/,
    use:[
    {
       loader:'url-loader',
       options:{limit:10*1024}// 小于10k就转base64
    }
  ]
}
```
### CSS中引入图片
```css
.logo{
    width:355px;
    height:133px;
    background-image: url(./images/logo.png);
    background-size: cover;
}
```
```html
<div class="logo"></div>
```
### 在HTML中使用图片
- <img src="" alt=""/>
    - 用html-withimg-loader解决
```js
<img src="./qq.png" />
{
    test:/\.html/,
    use:'html-withimg-loader'
}
```

- 注意：webpack打包后，会优先运行dist文件夹下的代码，而不是src本地的。



## 分离CSS
- CSS不再内嵌在js中，而单独提取出来Link加载`mini-css-extract-plugin`
    - filename 打包入口文件
    - chunkFilename 用来打包import('module')方法中引入的模块
### 安装
```md
npm install --save-dev mini-css-extract-plugin
```
### import和class CSS
```js
new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename:'[id].css'// 异步加载的时候用的
}),
{
    test: /\.css/,
    include: path.resolve(__dirname,'src'),
    exclude: /node_modules/,
    use: [{
        loader: MiniCssExtractPlugin.loader
    },'css-loader']
}
```
### 内联CSS
```md
cnpm i html-inline-css-webpack-plugin -D
```
```js
const HtmlInlineCssWebpackPlugin= require('html-inline-css-webpack-plugin').default;

plugins:[
  new HtmlInlineCssWebpackPlugin()
]
```

### 压缩JS和CSS
- `optimize-css-assets-webpack-plugin`压缩CSS
- 用`terser-webpack-plugin`替换掉`uglifyjs-webpack-plugin`解决uglifyjs不支持es6语法问题,压缩JS
```md
npm i uglifyjs-webpack-plugin terser-webpack-plugin optimize-css-assets-webpack-plugin -D
```
```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
           /*  new UglifyJsPlugin({
                cache: true,//启动缓存
                parallel: true,//启动并行压缩
                //如果为true的话，可以获得sourcemap
                sourceMap: true // set to true if you want JS source maps
            }), */
            new TerserPlugin({
                 parallel: true,//开启多进程并行压缩
                 cache: true// 开启缓存
            }),
            //压缩css资源的
            new OptimizeCSSAssetsPlugin({
                 assetNameRegExp:/\.css$/g,// 指定要压缩的模块的正则
                 //cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。
                 cssProcessor:require('cssnano')
            })
        ]
    },
```
### css和image存放单独目录
```js
{
   loader:MiniCssExtractPlugin.loader,
    options:{
        publicPath:'/'
    } 
}
```
```js
output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
+        publicPath:'/'// 根路径 在浏览器访问的时候要以什么路径访问 /xx.jpg
    },
{
  test:/\.(jpg|jpeg|png|bmp|gif|svg|ttf|woff|woff2|eot)/,
  use:[
        {
          loader:'url-loader',
          options:{
              limit: 4096,
               name:'[name]',
+              outputPath: 'images',// 把图片拷贝到images目录下
+              publicPath:'/images'// 重写此处的publicPath
          }
        }
     ]
}

plugins: [
        new MiniCssExtractPlugin({
-            filename: 'css/[name].css',
+            chunkFilename:'css/[id].css'
+            filename:'css/[name].[hash].[chunkhash].[contenthash].css',
        }),

```
### 文件指纹

:::tip hash、chunkhash、contenthash
- hash:修改任何项目文件都会导致所有文件的hash发生改变
- chunkhash:chunk里有文件变了就变
- contenthash:本模块变了才会变
:::

|占位符名称	|含义|
|:---|:---|
|ext|	资源后缀名|
|name|	文件名称|
|path|	文件的相对路径|
|folder|	文件所在的文件夹|
|contenthash|	文件的内容hash,默认是md5生成|
|hash|	文件内容的hash,默认是md5生成|
|emoji|	一个随机的指代文件内容的emoj|

### 编译less和sass
安装
```md
npm i less less-loader -D
npm i node-sass sass-loader -D
```
编写样式
```css
@color:red;
.less-container{
    color:@color;
}
```
```css
$color:green;
.sass-container{
    color:$color;
}
```
```js
{
    test: /\.less/,
    include: path.resolve(__dirname,'src'),
    exclude: /node_modules/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
    },'css-loader','less-loader']
},
{
    test: /\.scss/,
    include: path.resolve(__dirname,'src'),
    exclude: /node_modules/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
    },'css-loader','sass-loader']
},
```

## 处理CSS3属性前缀
- Trident内核：主要代表为IE浏览器, 前缀为-ms
- Gecko内核：主要代表为Firefox, 前缀为-moz
- Presto内核：主要代表为Opera, 前缀为-o
- Webkit内核：产要代表为Chrome和Safari, 前缀为-webkit
[caniuse](https://caniuse.com/)
```md
npm i postcss-loader autoprefixer --save-dev
```
```css
::placeholder {
    color: red;
}
```
postcss.config.js
```js
module.exports={
    plugins:[require('autoprefixer')]
}
```
webpack.config.js
```js
{
   test:/\.css$/,
   use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader'],
   include:path.join(__dirname,'./src'),
   exclude:/node_modules/
}
```

## 转义ES6/ES7/JSX
Babel其实是一个编译JavaScript的平台,可以把ES6/ES7,React的JSX转义为ES5
### 安装
```md
npm i babel-loader @babel/core @babel/preset-env  @babel/preset-react  --save-dev
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties --save-dev
```
### decorator
```js
//Option+Shift+A
function readonly(target,key,discriptor) {
    discriptor.writable=false;
}

class Person{
    @readonly PI=3.14;
}
let p1=new Person();
p1.PI=3.15;
console.log(p1)
```
jsconfig.json
```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```
### 配置
webpack.config.js
```js
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
```
```js
{
    test: /\.jsx?$/,
    use: {
        loader: 'babel-loader',
        options:{
         "presets": ["@babel/preset-env"],// 预设配置
         "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],// 装饰器(放类属性上面)
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]// 类属性
         ]
        }
    },
    include: path.join(__dirname,'src'),
    exclude:/node_modules/
}
```
.babelrc
    - 相当于webpack.config.js中的babel-loader
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
```
### babel runtime
- babel 在每个文件都插入了辅助代码，使代码体积过大
- babel 对一些公共方法使用了非常小的辅助代码，比如 _extend
- 默认情况下会被添加到每一个需要它的文件中。你可以引入 @babel/runtime 作为一个独立模块，来避免重复引入
```md
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```
.babelrc
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
    [
         "@babel/plugin-transform-runtime",
         {
            "corejs": false,
            "helpers": true,
            "regenerator": true,
            "useESModules": true
        }
    ]
  ]
}
```
> webpack打包的时候，会自动优化重复引入公共方法的问题

### ESLint校验代码格式规范
- 建议制定团队的eslint规范
- 基于eslint:recommend配置进行改进
- 发现代码错误的规则尽可能多的开启
- 帮助保持团队的代码风格统一而不要限制开发体验
```md
npm install eslint eslint-loader babel-eslint --save-dev
```
.eslintrc.js
```js
module.exports = {
    // 是否是根配置
    root: true,
    //指定解析器选项
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2015
    },
    //指定脚本的运行环境
    env: {
        browser: true,// window document
        node:true// require process
    },
    // 启用的规则及其各自的错误级别
    rules: {
        "indent": ["error", 4],//缩进风格
        "quotes": ["error", "double"],//引号类型 
        "semi": ["error", "always"],//关闭语句强制分号结尾
        "no-console": "error",//禁止使用console
        "arrow-parens": 0 //箭头函数用小括号括起来
    }
}
```
webpack.config.js
```js
module: {
    //配置加载规则
    rules: [
        {
            test: /\.js$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: [path.resolve(__dirname, 'src')], // 指定检查的目录
            options: { fix: true } // 这里的配置项参数将会被传递到 eslint 的 CLIEngine   
        },
```
### 继承airbnb
```md
cnpm i eslint-config-airbnb eslint-loader eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks and eslint-plugin-jsx-a11y --save-dev
```
.eslintrc.js
```js
module.exports = {
    "parser":"babel-eslint",
    "extends":"airbnb",
    "rules":{
        "semi":"error",
        "no-console":"off",
        "linebreak-style":"off",
        "eol-last":"off"
        //"indent":["error",2]
    },
    "env":{
        "browser":true,
        "node":true
    }
}
```
### 引入字体
- OTF—— opentype 苹果机与PC机都能很好应用的兼容字体
- 配置loader
```js
{
 test:/\.(woff|ttf|eot|svg|otf)$/,
     use:{
        //url内部内置了file-loader
        loader:'url-loader',
        options:{//如果要加载的图片大小小于10K的话，就把这张图片转成base64编码内嵌到html网页中去
            limit:10*1024
        }
   }
 },
```
使用字体
```css
@font-face {
    src: url('./fonts/HabanoST.otf') format('truetype');
    font-family: 'HabanoST';
}
.welcome {
    font-size:100px;
    font-family: 'HabanoST';
}
```
## 如何调试打包后的代码
- sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术
- webpack通过配置可以自动给我们source maps文件，map文件是一种对应编译文件和源文件的方法
```js
// 源码映射（方便调试错误。源代码和打包后的代码做映射，本地调试生产环境时使用。一般生产环境不使用）
// 单独创建一个源码映射文件,并且指定错误的行和列
devtool:'source-map',
// 在打包文件中加入源码，不分离，文件会很大
devtool:'eval-source-map',
// 不分离，不定位到列(很少用)
devtool:'cheap-module-source-map',
// 分离，不定位到列(较多)
devtool:'cheap-module-eval-source-map'
```
|类型|	含义|
|:---|:---|
|source-map|	原始代码 最好的sourcemap质量有完整的结果，但是会很慢|
|eval-source-map|	原始代码 同样道理，但是最高的质量和最低的性能|
|cheap-module-eval-source-map|	原始代码（只有行内） 同样道理，但是更高的质量和更低的性能|
|cheap-eval-source-map|	转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl|
|eval|	生成代码 每个模块都被eval执行，并且存在@sourceURL,带eval的构建模式能cache SourceMap|
|cheap-source-map|	转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用|
|cheap-module-source-map|	原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射|





## 打包第三方类库
### 直接引入
```js
import _ from 'lodash';
alert(_.join(['a','b','c'],'@'));
```
### 插件引入
- webpack配置ProvidePlugin后，在使用时将不再需要import和require进行引入，直接使用即可
- _ 函数会自动添加到当前模块的上下文，无需显示声明
```js
+ new webpack.ProvidePlugin({
+     _:'lodash'
+ })
```
> 没有全局的$函数，所以导入依赖全局变量的插件依旧会失败
### expose-loader
不需要任何其他的插件配合，只要将下面的代码添加到所有的loader之前
```js
require("expose-loader?libraryName!./file.js");
```
```js
{ 
  test: require.resolve("jquery"), 
  loader: "expose-loader?jQuery"
}
```
```js
require("expose-loader?$!jquery");
```

### externals
如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals
```js
 const jQuery = require("jquery");
 import jQuery from 'jquery';
```
```html
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
```
```js
+ externals: {
+         jquery: 'jQuery'//如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global
+ },
module: {
```
### 外链CDN
html-webpack-externals-plugin 
```js
+ const htmlWebpackExternalsPlugin= require('html-webpack-externals-plugin');
new htmlWebpackExternalsPlugin({
            externals:[
                {
                    module:'react',
                    entry:'https://cdn.bootcss.com/react/15.6.1/react.js',
                    global:'React'
                },
                 {
                    module:'react-dom',
                    entry:'https://cdn.bootcss.com/react/15.6.1/react-dom.js',
                    global:'ReactDOM'
                }
            ]
}) 
```

## watch
当代码发生修改后可以自动重新编译
```js
module.exports = {
    //默认false,也就是不开启
    watch:true,
    //只有开启监听模式时，watchOptions才有意义
    watchOptions:{
        //默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored:/node_modules/,
        //监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout:300,
        //判断文件是否发生变化是通过不停的询问文件系统指定议是有变化实现的，默认每秒问1000次
        poll:1000
    }
}
```
## 添加商标
```js
+ new webpack.BannerPlugin('by yy'),
```
## 拷贝静态文件
有时项目中没有引用的文件也需要打包到目标目录
```md
npm i copy-webpack-plugin --save-dev
```
```js
new CopyWebpackPlugin([{
  from: path.resolve(__dirname,'src/assets'),//静态资源目录源地址
  to:path.resolve(__dirname,'dist/assets') //目标地址，相对于output的path目录
}])
```
## 打包前先清空输出目录
[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)
```md
npm i  clean-webpack-plugin -D
```
```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
plugins:[
new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*'],})
]
```
## 服务器代理
### 不修改路径
请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
```js
devServer:{
    proxy: {
        "/api": 'http://localhost:3000'
    }
}
```
### 修改路径
```js
proxy: {
    "/api": {
       target: 'http://localhost:3000',
       pathRewrite:{"^/api":""}        
    }            
}
```
### before after
before 在 webpack-dev-server 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。
```js
before(app){
  app.get('/api/users', function(req, res) { 
    res.json([{id:1,name:'zfpx1'}])
  })
}
```
### webpack-dev-middleware
在 Express 中提供 webpack-dev-server 静态服务能力的一个中间件
```md
npm install webpack-dev-middleware --save-dev
```
```js
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackOptions = require('./webpack.config');
webpackOptions.mode = 'development';
const compiler = webpack(webpackOptions);
app.use(webpackDevMiddleware(compiler, {}));
app.listen(3000);
```
- 使用webpack-dev-middleware的好处是可以在既有的 Express 代码基础上快速添加 webpack-dev-server 的功能，同时利用 Express 来根据需要添加更多的功能，如 mock 服务、代理 API 请求等
## resolve解析
解析查找路径require()
> console.log(module.paths)可以打印出查找文件顺序
### extensions
指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
```js
resolve: {
  extensions: [".js",".jsx",".json",".css"]
},
```
### alias
配置别名可以加快webpack查找模块的速度

- 每当引入bootstrap模块的时候，它会直接引入bootstrap,而不需要从node_modules文件夹中按模块的查找规则查找
```js
const bootstrap = path.resolve(__dirname,'node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css');
resolve: {
+    alias:{
+        "bootstrap":bootstrap
+    }
},
```

### modules
- 对于直接声明依赖名的模块（如 react ），webpack 会类似 Node.js 一样进行路径搜索，搜索node_modules目录
- 这个目录就是使用resolve.modules字段进行配置的 默认配置
```js
resolve: {
    modules: ['node_modules'],
}
```
如果可以确定项目内所有的第三方依赖模块都是在项目根目录下的 node_modules 中的话
```js
resolve: {
modules: [path.resolve(__dirname, 'node_modules')],
}
```
### mainFields
默认情况下package.json 文件则按照文件中 main 字段的文件名来查找文件
```js
resolve: {
  // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
  mainFields: ['browser', 'module', 'main'],
  // target 的值为其他时，mainFields 默认值为：
  mainFields: ["module", "main"],
}
```
### mainFiles
当目录下没有 package.json 文件时，我们说会默认使用目录下的 index.js 这个文件，其实这个也是可以配置的
```js
resolve: {
  mainFiles: ['index'], // 你可以添加其他默认使用的文件名
},
```
### resolveLoader
`resolve.resolveLoader`用于配置解析 loader 时的 resolve 配置,默认的配置
```js
module.exports = {
  resolveLoader: {
    modules: [ 'node_modules' ],
    extensions: [ '.js', '.json' ],
    mainFields: [ 'loader', 'main' ]
  }
};
```
## noParse
- `module.noParse` 字段，可以用于配置哪些模块文件的内容不需要进行解析
- 不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度
```js
module.exports = {
    // ...
    module: {
        noParse: /jquery|lodash/, // 正则表达式
        // 或者使用函数
        noParse(content) {
            return /jquery|lodash/.test(content)
        },
    }
}...
```
> 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制
## DefinePlugin
`DefinePlugin`创建一些在编译时可以配置的全局常量
```js
new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(true),
    VERSION: "1",
    EXPRESSION: "1+2",
    COPYRIGHT: {
        AUTHOR: JSON.stringify("殷艺")
    }
})
```
```js
console.log(PRODUCTION);
console.log(VERSION);
console.log(EXPRESSION);
console.log(COPYRIGHT);
```
- 如果配置的值是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值
- 如果配置的值不是字符串，也不是一个对象字面量，那么该值会被转为一个字符串，如 true，最后的结果是 'true'
- 如果配置的是一个对象字面量，那么该对象的所有 key 会以同样的方式去定义
- JSON.stringify(true) 的结果是 'true'
## IgnorePlugin
`IgnorePlugin`用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去
```js
import moment from  'moment';
console.log(moment);
```
```js
new webpack.IgnorePlugin(/^\.\/locale/,/moment$/)
```
- 第一个是匹配引入模块路径的正则表达式
- 第二个是匹配模块的对应上下文，即所在目录名
## 区分环境变量
- 日常的前端开发工作中，一般都会有两套构建环境
- 一套开发时使用，构建结果用于本地开发调试，不进行代码压缩，打印 debug 信息，包含 sourcemap 文件
- 一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印 debug 信息，静态文件不包括 sourcemap
- webpack 4.x 版本引入了 mode 的概念
- 当你指定使用 production mode 时，默认会启用各种性能优化的功能，包括构建结果优化以及 webpack 运行性能优化
- 而如果是 development mode 的话，则会开启 debug 工具，运行时打印详细的错误信息，以及更加快速的增量编译构建
### 环境差异
- 生产环境
    - 可能需要分离 CSS 成单独的文件，以便多个页面共享同一个 CSS 文件
    - 需要压缩 HTML/CSS/JS 代码
    - 需要压缩图片
- 开发环境
    - 需要生成 sourcemap 文件
    - 需要打印 debug 信息
    - 需要 live reload 或者 hot reload 的功能...
### 获取mode参数
env/argv.mode获取--env的值
```js
npm install --save-dev optimize-css-assets-webpack-plugin
```
```js
  "scripts": {
+    "dev": "webpack-dev-server --env=development --open"
  },
```
```js
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports=(env,argv) => ({
    optimization: {
        
        minimizer: argv.mode == 'production'?[            
            new TerserWebpackPlugin({
               parallel:true,//开启多进程并行压缩
               cache:true//开启缓存
      }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]:[]
    }
})
```
### 封装log方法
webpack 时传递的 mode 参数，是可以在我们的应用代码运行时，通过 process.env.NODE_ENV 这个变量获取
```js
export default function log(...args) {
    if (process.env.NODE_ENV == 'development') {
        console.log.apply(console,args);
    }
}
```
### 拆分配置
可以把 webpack 的配置按照不同的环境拆分成多个文件，运行时直接根据环境变量加载对应的配置即可
- webpack.base.js：基础部分，即多个文件中共享的配置
- webpack.development.js：开发环境使用的配置
- webpack.production.js：生产环境使用的配置
- webpack.test.js：测试环境使用的配置...
- [webpack-merge](https://github.com/survivejs/webpack-merge)
```js
const { smart } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.js')
module.exports = smart(base, {
  module: {
    rules: [],
  }
})
```

## 对图片进行压缩和优化
`image-webpack-loader`可以帮助我们对图片进行压缩和优化
```md
npm install image-webpack-loader --save-dev
```
```js
{
          test: /\.(png|svg|gif|jpe?g|ico)$/,
          use: [
            'file-loader',
+           {
+             loader: 'image-webpack-loader',
+             options: {
+               mozjpeg: {
+                 progressive: true,
+                 quality: 65
+               },
+               optipng: {
+                 enabled: false,
+               },
+               pngquant: {
+                 quality: '65-90',
+                 speed: 4
+               },
+               gifsicle: {
+                 interlaced: false,
+               },
+               webp: {
+                 quality: 75
+               }
+             }
+           },
          ]
        }
```
## 多入口MPA
- 有时候我们的页面可以不止一个HTML页面，会有多个页面，所以就需要多入口
- 每一次页面跳转的时候，后台服务器都会返回一个新的html文档，这种类型的网站就是多页网站，也叫多页应用
:::tip glob
实现文件匹配功能。使用特殊字符来匹配想要的文件。
:::
```js
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const htmlWebpackPlugins=[];
const glob = require('glob');
const entry={};
const entryFiles = glob.sync('./src/**/index.js');// 返回所有src下index.js的路径
entryFiles.forEach((entryFile,index)=>{
    let entryName = path.dirname(entryFile).split('/').pop();
    entry[entryName]=entryFile;
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template:`./src/${entryName}/index.html`,
        filename:`${entryName}/index.html`,
        chunks:[entryName],
        inject:true,
        minify:{
            html5:true,
            collapseWhitespace:true,
            preserveLineBreaks:false,
            minifyCSS:true,
            minifyJS:true,
            removeComments:false
        }
    }));
}); 

module.exports={
    entry,
    plugins: [
        //other plugins
        ...htmlWebpackPlugins
    ]
}
```
## 日志优化
- 日志太多太少都不美观
- 可以修改`stats`
|预设|	替代|	描述|
|:---|:---|:---|
|errors-only|	none|	只在错误时输出|
|minial|	none|	发生错误和新的编译时输出|
|none|	false|	没有输出|
|normal|	true|	标准输出|
|verbose|	none|	全部输出|
### friendly-errors-webpack-plugin
```md
cnpm i friendly-errors-webpack-plugin
```
```js
+ stats:'verbose',
  plugins:[
+   new FriendlyErrorsWebpackPlugin()
  ]
```
> 编译完成后可以通过echo $?获取错误码，0为成功，非0为失败
## 错误上报
- compiler在每次构建结束之后会触发done的hook
- process.exit可以主动处理报错
```js
function(){
  this.hooks.done.tap('done',stats=>{
    if(stats.compilation.errors&&stats.compilation.errors.length){
            console.log('build errorerrorerrorerrorerror');
           process.exit(1);
    }
  });
},
```
## 日志输出
```json
 "scripts": {
    "build": "webpack",
+    "build:stats":"webpack --json > stats.json",
    "dev": "webpack-dev-server --open"
  },
```
```js
const webpack = require('webpack');
const config = require('./webpack.config.js');
webpack(config,(err,stats)=>{
  if(err){
    console.log(err);
  }
  if(stats.hasErrors()){
    return console.error(stats.toString("errors-only"));
  }
  console.log(stats);
});
```
## 费时分析
```js
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smw = new SpeedMeasureWebpackPlugin();
module.exports =smw.wrap({
});
```
## webpack-bundle-analyzer
是一个webpack的插件，需要配合webpack和webpack-cli一起使用。这个插件的功能是生成代码分析报告，帮助提升代码质量和网站性能
```js
cnpm i webpack-bundle-analyzer -D
```
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports={
  plugins: [
    new BundleAnalyzerPlugin()  // 使用默认配置
    // 默认配置的具体配置项
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: '8888',
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   excludeAssets: null,
    //   logLevel: info
    // })
  ]
}
```
```json
{
 "scripts": {
    "dev": "webpack --config webpack.dev.js --progress"
  }
}
```
webpack.config.js
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports={
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
      generateStatsFile: true, // 是否生成stats.json文件
    }),
  ]
}
```
```json
{
 "scripts": {
    "generateAnalyzFile": "webpack --profile --json > stats.json", // 生成分析文件
    "analyz": "webpack-bundle-analyzer --port 8888 ./dist/stats.json" // 启动展示打包报告的http服务器
  }
}
```
```md
npm run generateAnalyzFile
npm run analyz
```
## polyfill
### babel-polyfill
- babel-polyfill是React官方推荐，缺点是体积大
- babel-polyfill用正确的姿势安装之后，引用方式有三种：

1. require("babel-polyfill");
2. import "babel-polyfill";
3. module.exports = { 　　entry: ["babel-polyfill", "./app/js"] };
### polyfill-service
- 自动化的 JavaScript Polyfill 服务
- Polyfill.io 通过分析请求头信息中的 UserAgent 实现自动加载浏览器所需的 polyfills
```html
<script src="https://polyfill.io/v3/polyfill.min.js"></script>
```
## libraryTarget 和 library
当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们

- output.library 配置导出库的名称
- output.libraryExport 配置要导出的模块中哪些子模块需要被导出。 它只有在 output.libraryTarget 被设置成 commonjs 或者 commonjs2 时使用才有意义
- output.libraryTarget 配置以何种方式导出库,是字符串的枚举类型，支持以下配置
|libraryTarget|	使用者的引入方式|	使用者提供给被使用者的模块的方式|
|:---|:---|:---|
|var|	只能以script标签的形式引入我们的库|	只能以全局变量的形式提供这些被依赖的模块|
|commonjs|	只能按照commonjs的规范引入我们的库|	被依赖模块需要按照commonjs规范引入|
|amd|	只能按amd规范引入|	被依赖的模块需要按照amd规范引入|
|umd|	|可以用script、commonjs、amd引入|	按对应的方式引入|






## 打包库和组件
- webpack还可以用来打包JS库
- 实现数学运算功能加减乘除的库
- 打包成压缩版和非压缩版
- 支持AMD/CJS/ESM方式导入
### 编写库文件
webpack.config.js
```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  mode:'none',
  entry:{
      'zhufengmath':'./src/index.js',
      'zhufengmath.min':'./src/index.js'
  },
  optimization:{
      minimize:true,
      minimizer:[
          //可以支持es6,默认的使用TerserPlugin
          new TerserPlugin({
              include:/\.min\.js/
          })
      ]
  },
  output:{
      filename:'[name].js',
      library:'zhufengmath',//配置导出库的名称
      libraryExport:'default',
      libraryTarget:'umd'//配置以何种方式导出库,是字符串的枚举类型
  }
};
```
package.json
```json
"scripts": {
+    "build": "webpack",
```
index.js
```js
//zhufengnodejs zhufengjiagou
if(process.env.NODE_ENV == 'production'){
    module.exports = require('./dist/zhufengmath.min.js');
}else{
    module.exports = require('./dist/zhufengmath.js');
}
```
src/index.js
```js
export function add(a,b){
  return a+b;
}
export function minus(a,b){
  return a-b;
}
export function multiply(a,b){
  return a*b;
}
export function divide(a,b){
  return a/b;
}
export default {
  add,minus,multiply,divide
}
```

## px 自动转成rem
- 使用px2rem-loader
- 页面渲染时计算根元素的font-size值
[lib-flexible](https://github.com/amfe/lib-flexible)
```md
cnpm i px2rem-loader lib-flexible -D
```
index.html
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>主页</title>
    <script>
      let docEle = document.documentElement;
      function setRemUnit () {
        //750/10=75   375/10=37.5
        docEle.style.fontSize = docEle.clientWidth / 10 + 'px';
      }
      setRemUnit();
      window.addEventListener('resize', setRemUnit);
    </script>
</head>
<body>
    <div id="root"></div>
</body>
```
reset.css
```css
*{
    padding: 0;
    margin: 0;
}
#root{
    width:375px;
    height:375px;
    border:1px solid red;
    box-sizing: border-box;
}
```
webpack.config.js
```js
{
        test:/\.css$/,//如果要require或import的文件是css的文件的话
        //从右向左处理CSS文件,oader是一个函数
        use:[{
                loader:MiniCssExtractPlugin.loader,
                options:{
                     publicPath: (resourcePath, context) => {
                        return '/';
                    }
                    //publicPath: '/'
                }
        },{
                    loader:'css-loader',
                    options:{
                        //Enables/Disables or setups number of loaders applied before CSS loader.
                        importLoaders:0
                    }
                },{
                    loader:'postcss-loader',
                    options:{
                        plugins:[
                            require('autoprefixer')
                        ]
                    }
                },{
+                    loader:'px2rem-loader',
+                    options:{
+                        remUnit:75,
+                        remPrecesion:8
+                    }
+                }]
+            },
```
## 内联资源







## 参考














:::tip
- 配置文件只能用commonjs规范（基于node）
- 修改配置文件名字，需要指定配置文件：`npx webpack --config new-name`
:::

## 打包优化
### dll
- xxx.dll,如react,react-dom,react-router-dom登不需要改动的包做成xxx.dll文件上线直接放上去，体积不变，开发时打包速度明显变快
```js
// webpack.react.js
let path=require('path');
// webpack内置插件，所以不需要安装
let webpack=require('webpack/lib/DllPlugin');
module.exports={
    entry:{
        react:['react','react-dom']
    },
    output:{
        filename:'_dll_[name].js',
        path:path.resolve(__dirname,'dist'),
        // 导出到exports对象上，exports[_dll_a=function(){}()，写this挂到this上
        libraryTarget:'commonjs',
        library:'_dll_[name]',
    },
    plugins:[
        // 声明动态链接库
        new webpack.DllPlugin({
            // 产生出去的是个json文件
            name:'_dll_[name]',
            path:path.resolve(__dirname,'dist','mainfest.json')
        })
    ]
}
```
```js
// webpack.config.js
let ReferencePlugin=require('webpack/lib/DllReferencePlugin');

plugins:[
    new ReferencePlugin({
        mainifest:path.resolve(__diraname,'dist','mainifest.json')
    })
]

```
```html
// index.html
<script src='_dll_react.js'></script>
```
### 多线程打包
- 进程里包括线程
- 进程里包括一条主线程，node中可以开子进程，一般不会超过当前cpu核数(i5 4 i7 8，默认开4个)
- 较复杂的项目才使用，小项目打包时间会变慢
```js
let Happypack=require('happypack');
module:{
    rules:[
        {
            test:/\.js$/,
            exclude:/node_modules/,
            include:path.resolve('src'),
            use:'happypack/loader?id=js'
        },
        {
            test:/\.css$/,use:'happypack/loader?id=css'
        }
    ]
},
plugins:[
    // 多线程打包
    new Happypack({
        id:'js',
        use:{
            loader:'babel-loader',
            options:{
                presets:[
                    "@babel/preset-env"
                ]
            }
        }
    }),
    new Happypack({
        id:'css',
        use:['style-loader','css-loader']
    })
]
```

### webpack3需要处理的一些情况(webpack4自动处理)
- tree shanking(树上的叶子没用的去掉)和把变量尽可能最小化
  - webpack4
    - 必须使用import语法，require不支持（所以前端不要使用require语法，可能会导致代码多余）
    - 生产模式配置了`optimization`并且有配置内容会自动去掉，并且会把变量尽可能最小化，开发模式不会去掉
  - webpack3
    - 使用scope hosting工具解决
```js
// cakc.js
let add=(a,b)=>{
    return 'sum'+(a+b)
}
let minus=(a,b)=>{
    return 'minus'+(a+b)
}
export {add,minus}
```
```js
// index.js
import {add} from './calc';
```

### 提取公共代码的插件 webpack4 配置优化项 webpack3 使用插件
- 多入口页面使用。
```js
// index.js
import './a';
import './b';
import jquery from jquery;
```
```js
// other.js
import './a';
import './b';
import jquery from jquery;
```
```js
// about.js
import jquery from jquery;
```
```js
module.exports={
    optimization:{
        // 分割代码，缓存用 把a和b打包成一个文件，并缓存下来
        splitChunks:{
            cacheGroups:{
                // 普通模块打包
                common:{
                    // 入口中有公共的抽离
                    chunks:'initial',,
                    // 只要有字节是公用的就提取
                    minSize:0,
                    // 最少重复引用多少次才提取
                    minChunks:2
                },
                // 第三方模块打包
                vendor:{
                    // 优先级（先打包第三方模块）
                    priority:1,
                    test:/node_modules/,
                    chunks:'initial',
                    minSize:0,
                    minChunks:2,
                }
            }
        }
    }
}
```

## webpack实现动态懒加载js
- import() 
  - 动态加载js,草案中的方法，现在需要引用插件`@babel/plugin-syntax-dynamic-import`才能使用
```js
btn.addEventListener('click',function(){
    import('./use').then(data=>{
        // use.js中的代码挂载default上。
        console.log(data.default)
    })
})
```
```js
rules:[
    // 需要在webpack中配置动态加载js的插件
    {
        test:/\.js$/,
        use:[{
            loader:'babel-loader',
            options:{
                presets:[],
                plugins:[
                    "@babel/plugin-syntax-dynamic-import"
                ]
            }
        }]
    }
]
```

- 原理
  - JSONP加载js
  - 第一步 window['webpackJsonp'].push=webpackJsonpCallback;把json的回调挂载window上
  - 第二步 调用__webpack_require__.e 告诉内部加载0.js，并且返回的是一个promise
  - 第三步 在modules的属性上把当前的0.js放在modules的对象内
  - 第四步 __webpack_require__.bind(null,'./src/use.js')引用这个use.js。__webpack_exports__[\"default\"]='hello' exports.default='hello';
  - 第五步 下一次then就可以拿到这个exports对象 通过.default拿到异步加载的结果

## webpack 手写


## chunk的分割规则
1. node_moduels单独抽到vendors
2. import单独取到单独的chunk里