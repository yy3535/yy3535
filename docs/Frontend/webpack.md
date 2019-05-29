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

- npx webpack --mode development
    - mode默认production，会压缩代码，development，开发模式，不压缩代码
- 根目录新建webpack.config.js
  - 配置文件只能用commonjs规范（基于node）
  - 如果修改了配置文件名字，就需要`npx webpack --config new-name`来打包
```js
let path=require('path');
// 引入插件
let HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    // 单入口
    entry:''./src/index.js,
    // 多入口
    entry:{
        main:''
    },
    // 打包出口
    output:{
        // 路径（必须为绝对路径）
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
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
            // 文件压缩
            minify:{
                removeAttributeQuotes:true,
                removeTagWhitespace:true,
            },
            // 引用js文件的哈希值设置变化的（避免缓存）
            hash:true
        })
    ],
    // 加载器
    modules:{
        // 规则
        // use值有三种['style-loader'],'style-loader',[{loader:'style-loader',...options}]
        rules:[
            // css加载器（顺序不能变）
                // style把样式加到html文件中，css解析@import
                // less：安装less,使用less-loader
                // sass：安装node-sass,使用sass-loader
                // stylus：安装stylus,使用stylus-loader
            {test:/\.css/,use:['style-loader','css-loader','less-loader']},
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

                        ]
                    }
                }],
                // 不打包的文件目录
                exclude:
            }
        ]
    }
}
```

```cmd
<!-- 安装插件 -->
yarn add html-webpack-plugin -D

```

```cmd
<!-- 安装加载器 -->
yarn add css-loader style-loader
yarn add @babel/core @babel/preset-env babel-loader
```

- 启动开发服务
```cmd
yarn add webpack-dev-server -D
```
  - npx webpack-dev-server
    - 启动开发服务（修改后可及时更新页面。打包的页面存在内存里，并不打包出来）
