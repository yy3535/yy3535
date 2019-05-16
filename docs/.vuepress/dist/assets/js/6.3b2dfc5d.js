(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{193:function(e,n,t){"use strict";t.r(n);var s=t(0),a=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"node"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#node","aria-hidden":"true"}},[e._v("#")]),e._v(" node")]),e._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#事件环-event-loop"}},[e._v("事件环(event loop)")])]),t("li",[t("a",{attrs:{href:"#eventloop-img-事件环-png"}},[e._v("!eventloop")])]),t("li",[t("a",{attrs:{href:"#_1-node能够解决什么问题"}},[e._v("1. Node能够解决什么问题")])]),t("li",[t("a",{attrs:{href:"#_2-node安装"}},[e._v("2. Node安装")])]),t("li",[t("a",{attrs:{href:"#_3-node基础"}},[e._v("3. Node基础")])]),t("li",[t("a",{attrs:{href:"#node里的事件环"}},[e._v("node里的事件环")])]),t("li",[t("a",{attrs:{href:"#_4-node-module"}},[e._v("4. Node Module")])])])]),t("p"),e._v(" "),t("h3",{attrs:{id:"事件环-event-loop"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#事件环-event-loop","aria-hidden":"true"}},[e._v("#")]),e._v(" 事件环(event loop)")]),e._v(" "),t("p",[e._v("浏览器中，先调用主栈，主栈执行完成后，微任务放入微任务队列，宏任务放入宏任务队列（按执行顺序放入，setTimeout到时间了再放），执行完微任务，再取出宏任务队列中第一个执行，执行完后再次执行完微任务，再取第二个。——环")]),e._v(" "),t("h3",{attrs:{id:""}},[t("a",{staticClass:"header-anchor",attrs:{href:"#","aria-hidden":"true"}},[e._v("#")]),e._v(" "),t("img",{attrs:{src:"/img/%E4%BA%8B%E4%BB%B6%E7%8E%AF.png",alt:"eventloop"}})]),e._v(" "),t("p",[e._v("heap:堆，对象引用函数地址放在堆里")]),e._v(" "),t("p",[e._v("stack:栈，代码执行放在栈里，后进先出")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//销毁顺序\nfunction a(){\n  console.log(1);\n  b()\n  function b(){\n    console.log(2);\n    c()\n    function c(){\n      console.log(3);\n    }\n  }\n}\na()\n")])])]),t("p",[e._v("queue:队列，先进先出<—— xxx <——")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("[1,2,3].shift();\n[1,2,3].pop();\n")])])]),t("blockquote",[t("p",[e._v("什么叫线程？")]),e._v(" "),t("p",[e._v("线程里包含着进程。")])]),e._v(" "),t("blockquote",[t("p",[e._v("什么叫进程？")]),e._v(" "),t("p",[e._v("计算机分配调度任务的最小单位。")])]),e._v(" "),t("p",[e._v("js是单线程，也可以说是多线程(异步)")]),e._v(" "),t("p",[e._v("then方法会比setTimeout等异步的等级更高一些，微任务会优先执行")]),e._v(" "),t("p",[t("strong",[e._v("宏任务")]),e._v("： setTimeout setImmediate ie下使用 MessageChannel")]),e._v(" "),t("p",[t("strong",[e._v("微任务")]),e._v("： promise.then方法,MutationObserver，nextTick")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("setImmediate(function(){})//定时器，只有ie支持，也属于宏任务\nlet channel=new MessageChannel()//管道，属于宏任务\nlet port1=channel.port1;\nlet port2=channel.port2;\nport1.postMessage('hello');\nport2.onmessage=function(e){\n  console.log(e.data)//hello\n}\n\n\n\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let observer=new MutationObserver(function(){\n  console.log('当前节点 已经更新完')\n})\nobserver.observe(app,{\n  childList:true\n});\nfor(let i=0;i<10;i++){\n  app.appendChild(document.createElement('p'));\n}\n")])])]),t("h3",{attrs:{id:"_1-node能够解决什么问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-node能够解决什么问题","aria-hidden":"true"}},[e._v("#")]),e._v(" 1. Node能够解决什么问题")]),e._v(" "),t("ol",[t("li",[e._v("可用js编写服务端")]),e._v(" "),t("li",[e._v("提高用户并发量，比传统的Java和Php高(java多线程)")])]),e._v(" "),t("p",[e._v("node并不是JavaScript全集(es+dom+bom)，只是ecmascript+模块(服务端必备的方法)")]),e._v(" "),t("p",[t("img",{attrs:{src:"/img/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%8D%95%E7%BA%BF%E7%A8%8B.png",alt:"屏幕快照 2019-04-06 21.46.45"}})]),e._v(" "),t("ul",[t("li",[t("p",[e._v("多线程，锁的问题(多个线程修改同一个文件，需要先锁住文件，避免其他线程修改)")])]),e._v(" "),t("li",[t("p",[e._v("多线程，看上去像同时做两件事，但其实只是这个干一点，那个干一点，再这个干一点。切换执行上下文是浪费时间的")])]),e._v(" "),t("li",[t("p",[e._v("i/o密集型业务适合node，node单线程，并且通过事件驱动，完成后自动返回。不像别的是不断地要去询问，完成了吗")])])]),e._v(" "),t("p",[e._v("node优点：")]),e._v(" "),t("ul",[t("li",[e._v("基于v8引擎，执行效率高，不高的地方用c写，c++模块扩展")]),e._v(" "),t("li",[e._v("使用事件驱动，非阻塞式I/O模型")]),e._v(" "),t("li",[e._v("npm包管理器，是全球最大的开源库生态系统")])]),e._v(" "),t("p",[e._v("Node缺点：")]),e._v(" "),t("p",[e._v("脆，主线程挂了，就完蛋了")]),e._v(" "),t("p",[e._v("node特点：")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("单线程(webworker并不能改变单线程的本质)")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//webworker,有任务，去通知别人做，主线程接着运算\n//1.js\n//不能操作dom\nonmessage=function(e){\n  let sum=0;\n  for(let i=0;i<e.data;i++){\n    sum+=i;\n  }\n  postMessage(sum);\n}\n//1.html\nlet worker=new Worker('./1.js');\nworker.postMessage(10000);\nworker.onmessage=function(e){\n  console.log(e.data);\n}\nconsole.log('haha')//\n")])])])]),e._v(" "),t("li",[t("p",[e._v("浏览器模型")]),e._v(" "),t("p",[e._v("我们的代码通过渲染引擎渲染，渲染引擎分为网络引擎，js引擎和css引擎，他们都是不能同时渲染的。都是一个线程。")]),e._v(" "),t("p",[t("img",{attrs:{src:"/img/browser.jpg",alt:"browser"}})])]),e._v(" "),t("li",[t("p",[e._v("node的Event Loop")]),e._v(" "),t("p",[e._v("node里没有渲染引擎，只有node系统，功能就是让用户能实现异步。")]),e._v(" "),t("p",[e._v("模块里的异步其实是通过多线程模拟实现的。")]),e._v(" "),t("p",[t("img",{attrs:{src:"/img/nodesystem.png",alt:"nodesystem"}})])]),e._v(" "),t("li",[t("p",[e._v("什么场合用node框架")]),e._v(" "),t("p",[e._v("不适合处理cpu密集的")]),e._v(" "),t("ul",[t("li",[e._v("聊天服务器(websocket)")]),e._v(" "),t("li",[e._v("电子商务网站(静态服务，io读取)")])])])]),e._v(" "),t("h3",{attrs:{id:"_2-node安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-node安装","aria-hidden":"true"}},[e._v("#")]),e._v(" 2. Node安装")]),e._v(" "),t("p",[e._v("本地：下载安装包直接安装，node -v npm -v(送包管理器)")]),e._v(" "),t("p",[e._v("版本切换：mac nvm工具 win下 nvm-win")]),e._v(" "),t("h3",{attrs:{id:"_3-node基础"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-node基础","aria-hidden":"true"}},[e._v("#")]),e._v(" 3. Node基础")]),e._v(" "),t("p",[e._v("在浏览器中默认this指代window")]),e._v(" "),t("p",[e._v("在浏览器中window是代理了global属性")]),e._v(" "),t("p",[e._v("而文件中运行这个this不是global")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//1.node.js\nconsole.log(this);//{}\n//node文件中打印global\nconsole.log(global)\n//Object[global]{\n  ...\n  global:[Circular],\n  process://进程\n  \tprocess {\n      \n  \t},\n  Buffer://操作文件，需要二进制类型，就是Buffer,可以和字符串进行转换,\n  clearImmediate setImmediate\n  setTimeout clearTimeout\n  ...\n}\n//把对象展示成详细的\nconsole.dir(Object.keys(global))\n")])])]),t("p",[e._v("REPL read evaluate print loop 循环求值打印")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("node//进入node环境\nconsole.log(this)//打印出global的内容\n")])])]),t("p",[t("strong",[e._v("全局的属性：")])]),e._v(" "),t("ol",[t("li",[e._v("console")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("console.log('log')\nconsole.log('info') \nprocess.stdout.write('呵呵')//1 标准输出，等价以上两个\nconsole.warn('warn')\nconsole.error('error')\nprocess.stderr.write('错误')//2 错误输出，等价以上两个\nprocess.stdin.on('data',function(data){\n  console.log(data.toString())//0 表示标准输入\n})\n")])])]),t("ol",{attrs:{start:"2"}},[t("li",[t("p",[e._v("process")]),e._v(" "),t("p",[e._v("process.pid//进程id")]),e._v(" "),t("p",[e._v("process.exit()//手动退出应用")]),e._v(" "),t("p",[e._v("process.cwd()//current working directory 当前工作目录")]),e._v(" "),t("p",[e._v("process.chdir('6.node')//改变当前工作目录")]),e._v(" "),t("p",[e._v("process.nextTick(()=>{//是node中唯一一个微任务")]),e._v(" "),t("p",[e._v("​\tconsole.log('nextTick');")]),e._v(" "),t("p",[e._v("})")]),e._v(" "),t("p",[e._v("process 环境变量 env 参数 argv：webpack definePlugin原理就是通过这个实现")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//yargs把执行命令的时候传递参数解析成对象，可以自己手动将其变成对象\nlet args=process.argv.slice(2);\nargs=args.reduce((total,value,currentIndex,arr)=>{\n  if(value.includes('-')){\n    total[value.slice(1)]=arr[currentIndex+1];\n  }\n  return total;\n},{});\nconsole.log(args.p)\n")])])]),t("blockquote",[t("h3",{attrs:{id:"node里的事件环"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#node里的事件环","aria-hidden":"true"}},[e._v("#")]),e._v(" node里的事件环")]),e._v(" "),t("p",[e._v("node中有如下六个队列，依次执行。")]),e._v(" "),t("p",[e._v("每次都把队列清空后，或者达到执行的最大限制切换到下一个队列中会再执行微任务")])]),e._v(" "),t("p",[t("img",{attrs:{src:"/img/node%E4%BA%8B%E4%BB%B6%E7%8E%AF.png",alt:"node事件环"}})]),e._v(" "),t("blockquote",[t("p",[e._v("面试题：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let fs=require('fs');\n//poll阶段下一个阶段是check,所以执行的话一定是走的setImmidaite\nfs.readFile('note.md','utf-8',function(){\n  setTimeout(function(){\n    console.log('timeout')\n  },0);\n  setImmediate(function(){\n    console.log('setImmediate2')\n  })\n})\n")])])])])])]),e._v(" "),t("h3",{attrs:{id:"_4-node-module"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-node-module","aria-hidden":"true"}},[e._v("#")]),e._v(" 4. Node Module")]),e._v(" "),t("p",[e._v("模块，解决协同开发问题，避免全局变量，防止崇明，模块化都是靠闭包实现的。")]),e._v(" "),t("p",[e._v("cmd:sea.js")]),e._v(" "),t("p",[e._v("amd:require.js")]),e._v(" "),t("p",[e._v("node里用common.js")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("定义模块 node中一个文件就是一个模块")])]),e._v(" "),t("li",[t("p",[e._v("引用模块 require静态导入，")]),e._v(" "),t("blockquote",[t("p",[e._v("esmodule: 即es6模块 使用import 动态导入")])]),e._v(" "),t("p",[e._v("node靠文件读取")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//1.js\nmodule.export=\"zfpx\"\n//2.module.js\n//读取文件\nlet str=require('./1.js')\nconsole.log(str);\nlet r=require('./user')//会默认添加后缀名.js，找不到再.json，找不到再.node\n//内置模块\n\n")])])])]),e._v(" "),t("li",[t("p",[e._v("导出模块 module.exports")])])]),e._v(" "),t("p",[t("strong",[e._v("模块化原理")])]),e._v(" "),t("blockquote",[t("p",[e._v("seajs requirejs 闭包")]),e._v(" "),t("p",[e._v("node也是为了模块化，所以在每个文件外面套了个闭包，这个函数把文件中的this指向更改为module.exports")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("(function (exports,require,module,__filename,__dirname){\n  module.exports='zfpx';\n  return module.exports//隐藏了这句\n})\nlet fn=`(function a(){let b=1;console.log(b)})()`;\n//内置模块 沙箱\nlet vm=require('vm');\nvm.runInThisContext(fn);\n")])])])]),e._v(" "),t("p",[t("strong",[e._v("node内置方法")])]),e._v(" "),t("ol",[t("li",[t("p",[e._v("vm沙箱")]),e._v(" "),t("p",[e._v("vm.runInThisContext(fn) 在当前沙箱中运行fn代码")])]),e._v(" "),t("li",[t("p",[e._v("fs沙箱")]),e._v(" "),t("p",[e._v("fs.accessSync(文件名) 判断文件是否可以访问的到")]),e._v(" "),t("p",[e._v("Fs.readfile() 读取文件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let fs=require('fs');\nfs.accessSync('1.test.js')\n")])])])]),e._v(" "),t("li",[t("p",[e._v("path 相对路径转绝对路径")]),e._v(" "),t("p",[e._v("path.resolve(目录,文件名)在目录下找文件")]),e._v(" "),t("p",[e._v("path.join(目录,文件名)拼接，与resolve唯一不同处在遇到/的时候，resolve会返回最上层目录")]),e._v(" "),t("p",[e._v("path.extname('1.min.js') //取扩展名 .js")]),e._v(" "),t("p",[e._v("path.basename('1.min.js','.js')//取基础名 1.min")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let path=require('path');\nconsole.log(path.resolve('1.test.js'))//C:\\Users\\speedly\\...\nconsole.log(path.resolve(__dirname,'1.test.js'))//__dirname下的1.test.js\nconsole.log(path.join(__dirname,'1.test.js'))//与上面一样\nconsole.log(path.resolve('a','/'))//resolve一碰到/就会返回最上层目录\tc:\\\nconsole.log(path.join('a','/'))//a/\npath.basename('1.min.js','.min.js')//取基础名 1\n")])])])])]),e._v(" "),t("p",[t("strong",[e._v("require原理")]),e._v("(加载js如何实现)")]),e._v(" "),t("p",[e._v("拿到用户传入的路径将路径解析成绝对路径，创建一个模块，根据路径加载对应的方法，如果是json把读取的结果放到模块的exports对象上，req方法最后返回这个exports对象")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//核心模块 不需要./操作\nlet path=require('path');\nlet fs=require('fs');\nlet vm=require('vm');\nfunction Module(id){\n  this.id=id;\n  this.exports={};//导出对象\n}\nlet obj={\n  '.js'(module){\n    let content=fs.readFileSync(module.id,'utf8');\n    let moduleWrap=['(function(exports,module,require,__filename,__dirname){','})'];\n    //给字符串添加了一个函数\n    let script=moduleWrap[0]+content+moduleWrap[1];\n    vm.runInThisContext(script).call(module.exports,module.exports,module,req);\n  },\n  '.json'(module){//处理json的模块\n    module.exports=JSON.parse(fs.readFileSync(module.id,'utf8'))\n  }\n}\nfunction req(moduleId){\n\t//拿到绝对路径\n  let absPath=path.resolve(__dirname,moduleId);\n  //创建模块\n  let module=new Module(absPath);\n  //根据后缀名进行加载\n  let ext=path.extname(absPath);\n  //加载json 加载完后expots会赋予最终的结果，并把结果返回\n  obj[ext](module);\n  return module.exports;\n}\n\nlet user=req('./user.json');\nconsole.log(user);\nlet user=req('./user.js');\nconsole.log(user);\n")])])]),t("blockquote",[t("p",[t("strong",[e._v("面试题")])]),e._v(" "),t("p",[e._v("module和exports什么关系？")]),e._v(" "),t("p",[e._v("答：exports是module.exports的别名")])]),e._v(" "),t("p",[t("strong",[e._v("module.exports的两种写法")])]),e._v(" "),t("ul",[t("li",[e._v("module.exports=xxx")]),e._v(" "),t("li",[e._v("export.a=xxx")]),e._v(" "),t("li",[e._v("global.b=xxx//引用时也是global.b//不推荐，一般不使用")])]),e._v(" "),t("p",[e._v("exports=module.exports={}")]),e._v(" "),t("p",[e._v("所以不能直接赋值exports，因为返回的是module.exports，但可以赋值给exports.a属性值也会添加到module.exports身上")]),e._v(" "),t("p",[t("strong",[e._v("第三方模块")])]),e._v(" "),t("p",[e._v("下载别人的包来使用npm")]),e._v(" "),t("p",[e._v("npm.js.org")]),e._v(" "),t("p",[e._v("安装有两种方式：")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("全局安装")]),e._v(" "),t("p",[e._v("npm install xxx -g 只能在命令行中使用，工具类的会用这种方式")]),e._v(" "),t("p",[e._v("统一安装到 C:\\Users\\speedly\\AppData\\Roaming\\npm\\node_modules")]),e._v(" "),t("p",[e._v("(并不是像node和npm一样配置到环境变量里，而是在npm目录下创建了快捷键，所以能直接使用)")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("npm install nrm -g//切换npm下载源\nsudo npm install nrm -g(mac版)\nnrm --help//查看使用方法\nnrm ls //列出所有源\nnpm 官方 cnpm 中国 taoboa 淘宝的\nnrm use npm//切到npm\n\nnpm install http-server -g//启动一个服务\n\nnpm root -g//查看全局安装的安装目录\n")])])])]),e._v(" "),t("li",[t("p",[e._v("本地安装")]),e._v(" "),t("p",[e._v("先初始化(node package manager)：npm init -y")]),e._v(" "),t("p",[e._v("npm install jquery 默认是项目依赖(上线开发都需要，install可简写成i)")]),e._v(" "),t("p",[e._v("npm install @babel/cli -D 开发的时候使用，上线不用")]),e._v(" "),t("p",[e._v("npm install jquery@2.1.0//选择版本")]),e._v(" "),t("p",[e._v("Npm uninstall jquery//卸载")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("npm info react//查看\n")])])]),t("p",[e._v("yarn也是一个包管理工具 区别：比npm快")]),e._v(" "),t("p",[e._v("npm install yarn -g")]),e._v(" "),t("p",[e._v("yarn add jquery")]),e._v(" "),t("p",[e._v("yarn remove jquery")]),e._v(" "),t("p",[e._v("yarn add jquery -D//安装成开发依赖(与npm一样)")])])]),e._v(" "),t("p",[t("strong",[e._v("模块查找流程")])]),e._v(" "),t("p",[t("img",{attrs:{src:"/img/commonjs%E6%96%87%E4%BB%B6%E6%9F%A5%E6%89%BE%E9%80%BB%E8%BE%91%E5%9B%BE",alt:""}})]),e._v(" "),t("p",[e._v("module.paths:(模块的所有路径，当前路径找不到，就往上找)")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("[ '/Users/yinyi/test/node_modules',\n  '/Users/yinyi/node_modules',\n  '/Users/node_modules',\n  '/node_modules' ]\n")])])]),t("ul",[t("li",[e._v("当前node_modules下，如果有文件同名js，先走js，找不到再找index.js，")]),e._v(" "),t("li",[e._v("有文件先找文件，没有文件再找文件夹//node10以上")]),e._v(" "),t("li",[e._v("自己写的模块也一样。")])]),e._v(" "),t("p",[t("strong",[e._v("node核心模块")])]),e._v(" "),t("ol",[t("li",[t("p",[e._v("util 工具方法")]),e._v(" "),t("p",[e._v("util.promisify(xxx)//将回调方法改成promise")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let util=require('util');//拿出来是个属性实例\nlet fs=require('fs');\nlet read=util.promisify(fs.readFile);\n")])])]),t("blockquote",[t("p",[t("strong",[e._v("util较麻烦，一般用第三方模块mz，将node模块转化成promise形式")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let fs=require('mz/fs');\n")])])])]),e._v(" "),t("p",[e._v("Util.inherits();//继承方法，构造函数，继承原型上的属性(公有属性)")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//原理\nObject.setPrototypefOf()\n")])])])]),e._v(" "),t("li",[t("p",[e._v("events 自定义事件")]),e._v(" "),t("p",[e._v("node主要靠事件驱动(发布订阅模式，vue，redux都是)")]),e._v(" "),t("p",[e._v("girl.on//绑定")]),e._v(" "),t("p",[e._v("girl.emit('失恋')//调用")]),e._v(" "),t("p",[e._v("girl.on('newListener',function(type){})//新增绑定后调用,type是当前事件名称")]),e._v(" "),t("p",[e._v("girl.removeListener/off('失恋',cry)//解除绑定")]),e._v(" "),t("p",[e._v("girl.defaultMaxListeners//默认最大绑定数")]),e._v(" "),t("p",[e._v("girl.setMaxListener(1)//设置最大绑定数")]),e._v(" "),t("p",[e._v("girl.once('失恋',cry)//不管绑定多少次，仅触发一次")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let EventEmitter=require('events');//拿出来是个类\nlet util=require('util');\nfunction Girl(){\n  \n}\nutil.inherits(Girl,EventEmitter);\ngirl.on('newListener',function(type){\n  console.log(type)\n  girl.emit('失恋')\n})\nlet cry=function(){console.log('cry')}\nlet eat=function(){console.log('eat')}\ngirl.on('失恋',cry);\ngirl.on('失恋',eat);\n")])])]),t("p",[t("strong",[e._v("原理：")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function EventEmitter(){\n  this._events=Object.create(null)\n}\nEventEmitter.prototype.prependListener=function(eventName,callback){\n  this.on(eventName,callback,true);\n}\nEventEmitter.prototype.on=function(eventName,callback,flag){\n  if(!this._events) this._events=Object.create(null);\n  if(eventName!='newListener'){\n    this._events[newListener].forEach((fn)=>{\n      fn(eventName)\n    });\n  }\n  if(this._events[eventName]){\n  \tif(falg){\n      this._events[eventName].unshift(callback);\n  \t}else{\n      this._events[eventName].push(callback);\n  \t}\n    \n  }else{\n    this._events[eventName]=[callback];\n  }\n}\nEventEmitter.prototype.off=function(eventName,callback){\n\t//当前函数绑定的是cry,删除的也是cry\n  this._events[eventName]=this._events[eventName].filter(\n  (l)=>l!=callback&&l.l!=callback)\n}\nEventEmitter.prototype.once=function(eventName,callback){\n\tfunction one(...args){\n\t\tcallback(...args)\n    this.off(eventName,one)\n\t}\n\tone.l=callback;\n  this.on(eventName,one);\n}\nEmitter.prototype.emit=function(eventName,...args){\n  this._events[eventName].forEach(fn=>{\n    fn.call(this,...args);\n  })\n}\nmodule.exports=EventEmitter;\n")])])])])]),e._v(" "),t("h2",{attrs:{id:"_5-fs应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-fs应用","aria-hidden":"true"}},[e._v("#")]),e._v(" 5. fs应用")]),e._v(" "),t("blockquote",[t("p",[e._v("编码")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("node为了能操作文件，提供了fs模块，(文件内容一般都是二进制，八进制，十六进制），node读取的结果默认为十六进制")])]),e._v(" "),t("li",[t("p",[e._v("一个字节最大是255位 0xff，")])]),e._v(" "),t("li",[t("p",[e._v("汉字和字母占字节数")]),e._v(" "),t("p",[e._v("看编码 utf8 三个字节 1个字节")]),e._v(" "),t("p",[e._v("编码历史")]),e._v(" "),t("ol",[t("li",[e._v("ASCll码，最早美国人发明，包括127位英文字母在内的各种字符，所以一个英文字母占一位。但是对汉字和其他语言无效。")]),e._v(" "),t("li",[e._v("GB2312，其他国家把128-255改成他们的字符，中国也改成了自己的字符，规定两个大于127的字符连一起就表示一个汉字，可以组合出7998个简体汉字，把数字符号，日文假名和ASCll原来就有的数字、标点、字母重编成两个字长的编码叫做全角字符。这种方案叫GB2312，是对ASCll的中文扩展。后来因为我们也得用法语，德语等其他语言，所以不用了。")]),e._v(" "),t("li",[e._v("GBK，因为GB2312不够用，规定只要第二个字符大于127就是汉字，增加了20000个新汉字，包括繁体字和符号。")]),e._v(" "),t("li",[e._v("GB18030/DBCS 增加了少数名字的字。")]),e._v(" "),t("li",[e._v("Unicode，包括了地球上所有文化，所有字母和符号的编码，现在的规模可以容纳100多万个符号。规定所有的字母和符号都是两个字节。")]),e._v(" "),t("li",[e._v("UTF-8，是Unicode的实现方式之一，是在互联网上使用最广的一种，意思是每次以8个单位传输数据，UTF-16就是以每次16位传输数据，UTF-8一个中文字符占3个字节。(node不支持gbk)")])]),e._v(" "),t("p",[e._v("编码转换(base64)")]),e._v(" "),t("ol",[t("li",[e._v("图片转base64，不会发生请求")]),e._v(" "),t("li",[e._v("简单的编码转换，没有加密功能，把原有体积扩大了1/3")]),e._v(" "),t("li",[e._v("fileReader文件读取器，读成base64编码的")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('<input type="file" onchange="fn(event)" />\n<script>\n\tfunction fn(e){\n    let reader=new FileReader();\n    reader.readAsDataURL(e.target.files[0]);\n    reader.onload=function(e){\n      console.log(e.currentTarget.result)\n    }\n\t}\n<\/script>\n')])])]),t("p",[e._v("进制转换")]),e._v(" "),t("p",[e._v("().toString(进制)，任意进制转换")]),e._v(" "),t("p",[e._v("parseInt('1011',2) 将任何进制转成十进制")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//十进制转化成二进制\n(11).toString(2)\n")])])]),t("p",[e._v("Buffer")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let buf1=Buffer.alloc(12)\nlet buf2=Buffer.from('珠峰')\n")])])]),t("p",[e._v("buf2.toString()//珠峰")]),e._v(" "),t("p",[e._v("buf1.from([1，2，3])//把数组和字符串转换成二进制")]),e._v(" "),t("p",[e._v("buf1.alloc(3)//通过数字声明一个buffer，3是字节长度")]),e._v(" "),t("p",[e._v("buf1.forEach()//循环")]),e._v(" "),t("p",[e._v("buf2.copy(buf1,targetStart,sourceStart,sourceEnd)//复制")]),e._v(" "),t("p",[e._v("Buffer.concat([buf1,buf2])//拼接")]),e._v(" "),t("p",[e._v("buf2.indexOf('珠')")])])])]),e._v(" "),t("p",[e._v("fs将文件读取成buffer。")]),e._v(" "),t("p",[e._v("fs方法中，一般会有同步和异步两种方法，同步可以马上拿到返回结果，异步通过callback，只能error-first来获取错误。一般采用异步的方式。")]),e._v(" "),t("p",[e._v("{encoding:'utf8',flag:'r'}")]),e._v(" "),t("p",[e._v("flags:")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("符号")]),e._v(" "),t("th",[e._v("含义")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("r")]),e._v(" "),t("td",[e._v("读文件，文件不存在报错")])]),e._v(" "),t("tr",[t("td",[e._v("r+")]),e._v(" "),t("td",[e._v("读取并写入，文件不存在报错")])]),e._v(" "),t("tr",[t("td",[e._v("w")]),e._v(" "),t("td",[e._v("写入文件，不存在则创建，存在则清空")])]),e._v(" "),t("tr",[t("td",[e._v("w+")]),e._v(" "),t("td",[e._v("读取并写入文件，不存在则创建，存在则清空")])]),e._v(" "),t("tr",[t("td",[e._v("wx")]),e._v(" "),t("td",[e._v("排它写入文件")])]),e._v(" "),t("tr",[t("td",[e._v("a")]),e._v(" "),t("td",[e._v("追加写入")])])])]),e._v(" "),t("ol",[t("li",[t("p",[e._v("fs.readFile//读取文件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("fs.readFile('./note.md','utf8',function(err,data){\n\tif(err){\n\t\tconsole.log(err);\n\t}\n\tconsole.log(data);\n})\n//{encoding:'utf8',flags:'r'}\n")])])])]),e._v(" "),t("li",[t("p",[e._v("fs.writeFile//写入文件")]),e._v(" "),t("p",[e._v("写入时，文件不存在会创建文件，如有内容会清空内容")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("fs.writeFile('./note.md',1,function(err,data){\n\tif(err){\n\t\tconsole.log(err);\n\t}\n\tconsole.log(data);\n})\n")])])]),t("p",[t("strong",[e._v("拷贝功能：")])]),e._v(" "),t("p",[e._v("readfile将内容整个读取到内存中，再写入文件中。所以这种方式不可能读取比内存大的文件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function copy(source,target){\n  fs.readFile(source,function(err,data){\n    fs.writeFile(target,data,function(err){\n      console.log('成功')\n    })\n  })\n}\ncopy('a.md','b.md')\n")])])])]),e._v(" "),t("li",[t("p",[e._v("fs.appendFile //追加写入")]),e._v(" "),t("p",[e._v("里面使用flag:a")])]),e._v(" "),t("li",[t("p",[e._v("fs.copyFile//拷贝文件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("fs.copyFile(source,target,function(){\n  console.log('ok')\n})\n")])])])]),e._v(" "),t("li",[t("p",[e._v("从指定位置开始读取文件")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("打开文件：fs.open('./1,txt','r',0600,"),t("strong",[e._v("function")]),e._v("(err,fd){});")])]),e._v(" "),t("li",[t("p",[e._v("读取文件：fs.read(fd, buffer, offset, length, position, callback((err, bytesRead, buffer)))")])]),e._v(" "),t("li",[t("p",[e._v("写入文件：fs.write(fd, buffer[, offset[, length[, position]]], callback)")])])]),e._v(" "),t("blockquote",[t("p",[e._v("process.stdin 0")]),e._v(" "),t("p",[e._v("process.stdout 1")]),e._v(" "),t("p",[e._v("process.stderr 2")]),e._v(" "),t("p",[e._v("0,1,2是标识符，node中默认会占用0,1,2十三个描述符，所以自定义fd的是从3开始数")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/*打开文件*/\nfs.open('a.md','r',function name(err,fd){\n  console.log(fd)//3,fd是标识符，每次打开会累加\n  let buffer=Buffer.alloc(3);//只能放三勺水\n  /*读取文件*/\n  //fd 文件描述符 buffer读取到哪里\n  //0 是从buffer的哪个位置读取\n  //3 读取的个数\n  //0 读取文件的位置\n  fs.read(fd,buffer,0,3,0,function(err,bytesRead){\n  \t//bytesRead 真实读取的字节数 <Buffer 31 00 00>\n    /*关闭文件*/\n    fs.close(fd,()=>{\n      console.log('关闭')\n    })\n  })\n})\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/*打开文件*/\nfs.open('a.md','w',function(err,fd){\n\tlet buffer=Buffer.from([1,2,3,4])\n\t/*写入文件*/\n\t//fd 代表文件描述符\n\t//0 代表把buffer的第几个位置开始写入\n\t//2 代表写入的个数\n\t//0 写到文件的哪个位置\n  fs.write(fd,buffer,0,2,0,function(err,written){\n    console.log('写入成功')\n    fs.fsync();//最后应该调用此方法，更新内存，将文件写入到磁盘中。\n  });\n})\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//实现一个拷贝，用fs.open fs.read fs.write实现拷贝文件的功能，控制读取速率，防止内存占用过多\n//第三个参数写Null，就会自动往后，不用自己计算位置\n//流的原理，发布订阅来简化\nfunction copy(source,target,callback){\n  const BufferSize=2;\n  fs.open(source,'r',function(err,rfd){\n    fs.open(target,'w',function(err,wfd){\n    \tlet buffer=Buffer.aloc(3);\n    \tfunction next(){\n        fs.read(rfd,buffer,0,BUFFERSIZE,null,function(err,bytesRead){\n          if(bytesRead>0){\n            fs.write(wfd,buffer,0,bytesRead,null,function(err,written){\n              next();\n            });\n          }else{\n          \tfs.close(rfd,()=>{})\n          \tfs.close(wfd,()=>{\n              fs.fsync();\n          \t})\n            callback();\n          }\n        })\n    \t};\n    \tnext();\n    })\n  })\n}\ncopy('a.md','b.md',function(){\n  console.log('复制成功')\n})\n")])])])]),e._v(" "),t("li",[t("p",[e._v("direction")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//创建目录(必须保证父级存在)\nfs.mkdirSync('a/b') 或者fs.mkdirSync('a/b/c')或者 fs.mkdirSync('a\\\\b')双杠为了转义成\\\nfs.mkdir()\n//判断一个文件是否有权限访问\nfs.access(path[, mode], callback)\n//删除目录(必须保证目录中没有子文件和子文件夹，否则会出错)\nfs.rmdirSync('a')\nfs.rmdir('a')\n//删除文件\nfs.unlinkSync\nfs.unlink\n//读取目录下所有文件\nfs.readdir(path[, options], callback)\n//查看文件目录信息\nlet stat=fs.statSync(path)\nlet stat=fs.stat(path,callback)\nstat.isDirectory()//是否是目录\nstat.isFile()//是否是目录\n")])])]),t("blockquote",[t("p",[e._v("做一个创建任意目录的工具")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let fs=require('fs');\n//同步,使用for循环\nfunction mkdirSync(p){\n  let dirs=p.split('/');\n  for(let i=0;i<dirs.length;i++){\n  \tlet currentPath=dirs.slice(0,i).join('/');\n  \ttry{\n      fs.accessSync(currentPath);\n  \t}catch(e){\n      fs.mkdirSync(currentPath);\n  \t}\n  }\n}\nmkdirSync('m/q/d')\n\n//异步，使用递归，next方法来帮助进行迭代操作\n//fs.access\nfunction mkdir(p,callback){\n  let dirs=p.split('/');\n  let index=0;\n  function next(){\n  \tif(index===dirs.length) return callback();\n    let currentPath=dirs.slice(0,++index).join('/');\n    fs.access(currentPath,function(err){\n      if(err){\n        fs.mkdir(currentPath,function(){\n          next();\n        });\n      }else{\n        next();//当前文件夹存在就继续迭代\n      }\n    })\n  }\n  next();\n}\nmkdir('a/b/c',function(){\n  console.log('创建完成')\n})\n")])])])]),e._v(" "),t("blockquote",[t("p",[e._v("同步先序深度优先删除目录")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let fs=require('fs');\nlet path=require('path')\nfunction rmSync(dir) {\n    try {\n        let stat = fs.statSync(dir);\n        if (stat.isFile()) {\n            fs.unlinkSync(dir);\n        } else {\n            let files=fs.readdirSync(dir);\n            files\n                .map(file => path.join(dir,file))\n                .forEach(item=>rmSync(item));\n            fs.rmdirSync(dir);\n        }\n    } catch (e) {\n        console.log('删除失败!');\n    }\n}\nrmSync(path.join(__dirname,'a'));\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("//异步串行删除目录深度优先\nfunction rmAsyncSeries(dir,callback) {\n    setTimeout(() => {\n        fs.stat(dir,(err,stat) => {\n            if (err) return callback(err);\n            if (stat.isDirectory()) {\n                fs.readdir(dir,(err,files) => {\n                    let paths = files.map(file => path.join(dir,file));\n                    function next(index) {\n                        if (index>=files.length) return fs.rmdir(dir,callback);\n                        let current=paths[index];\n                        rmAsyncSeries(current,()=>next(index+1));\n                    }\n                    next(0);\n                });\n            } else {\n                fs.unlink(dir,callback);\n            }\n        })\n    },1000);\n}\n\nconsole.time('cost');\nrmAsyncSeries(path.join(__dirname,'a'),err => {\n     console.timeEnd('cost');\n})\n\n//异步并行删除目录深度优先\nfunction rmAsyncParallel(dir,callback) {\n    setTimeout(() => {\n        fs.stat(dir,(err,stat) => {\n            if (err) return callback(err);\n            if (stat.isDirectory()) {\n                fs.readdir(dir,(err,files) => {\n                    let paths=files.map(file => path.join(dir,file));\n                    if (paths.length>0) {\n                        let i=0;\n                        function done() {\n                            if (++i == paths.length) {\n                                fs.rmdir(dir,callback);\n                            }\n                        }\n                      paths.forEach(p=>rmAsyncParallel(p,done));\n                    } else {\n                        fs.rmdir(dir,callback);\n                    }\n                });\n            } else {\n                fs.unlink(dir,callback);\n            }\n        })\n    },1000);\n}\nconsole.time('cost');\nrmAsyncParallel(path.join(__dirname,'a'),err => {\n     console.timeEnd('cost');\n})\n\n//异步删除非空目录(Promise版)\nfunction rmPromise(dir) {\n    return new Promise((resolve,reject) => {\n        fs.stat(dir,(err,stat) => {\n            if (err) return reject(err);\n            if (stat.isDirectory()) {\n                fs.readdir(dir,(err,files) => {\n                    let paths = files.map(file => path.join(dir,file));\n                    let promises = paths.map(p=>rmPromise(p));\n                    Promise.all(promises).then((() => fs.rmdir(dir,resolve)));\n                });\n            } else {\n                fs.unlink(dir,resolve);\n            }\n        });\n    });\n}\nrmPromise(path.join(__dirname,'a')).then(() => {\n    console.log('删除成功');\n})\n\n//同步删除目录(广度优先) \nfunction rmSync(dir){\n    let arr=[dir];\n    let index=0;\n    while (arr[index]) {\n        let current=arr[index++];\n        let stat=fs.statSync(current);\n        if (stat.isDirectory()) {\n            let dirs=fs.readdirSync(current);\n            arr=[...arr,...dirs.map(d => path.join(current,d))];\n        }\n    }\n    let item;\n    while (null != (item = arr.pop())) {\n        let stat = fs.statSync(item);\n        if (stat.isDirectory()) {\n            fs.rmdirSync(item);\n        } else {\n            fs.unlinkSync(item);\n        }\n    }\n}\n\n//异步删除目录(广度优先)\nfunction rmdirWideAsync(dir,callback){\n    let dirs=[dir];\n    let index=0;\n    function rmdir() {\n        let current = dirs.pop();\n        if (current) {\n            fs.stat(current,(err,stat) => {\n                if (stat.isDirectory()) {\n                    fs.rmdir(current,rmdir);\n                } else {\n                    fs.unlink(current,rmdir);\n                }\n            });\n        }\n    }\n    !function next() {\n        let current=dirs[index++];\n        if (current) {\n            fs.stat(current,(err,stat) => {\n                if (err) callback(err);\n                if (stat.isDirectory()) {\n                    fs.readdir(current,(err,files) => {\n                        dirs=[...dirs,...files.map(item => path.join(current,item))];\n                        next();\n                    });\n                } else {\n                    next();\n                }\n            });\n        } else {\n            rmdir();\n        }\n    }();\n}\n")])])])])])]),e._v(" "),t("h2",{attrs:{id:"_5-流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-流","aria-hidden":"true"}},[e._v("#")]),e._v(" 5. 流")]),e._v(" "),t("p",[e._v("直接读取文件会占用内存。而流会从一个位置读到另一个位置，不关心内存大小。原理是封装了fs.read等。")]),e._v(" "),t("p",[e._v("Node.js中"),t("strong",[e._v("四种基本的流类型")]),e._v("：")]),e._v(" "),t("ul",[t("li",[e._v("可读流，可写流，可读写流(双工流)，读写过程中可修改和变换数据的Duplex流")])]),e._v(" "),t("ol",[t("li",[t("p",[e._v("可读流")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("创建")]),e._v(" "),t("p",[e._v("fs.createReadStream(path,[options]);")])])]),e._v(" "),t("ul",[t("li",[t("p",[e._v("path读取文件的路径")])]),e._v(" "),t("li",[t("p",[e._v("options")]),e._v(" "),t("ul",[t("li",[e._v("flags打开文件要做的操作,默认为'r'")]),e._v(" "),t("li",[e._v("encoding默认为null")]),e._v(" "),t("li",[e._v("autoClose:默认true")]),e._v(" "),t("li",[e._v("start开始读取的索引位置")]),e._v(" "),t("li",[e._v("end结束读取的索引位置(包前包后)")]),e._v(" "),t("li",[t("strong",[e._v("highWaterMark")]),e._v("每次读取缓存区默认的大小64kb")])])])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("var rs = fs.createReadStream(path,[options]);\n")])])]),t("ol",{attrs:{start:"2"}},[t("li",[t("p",[e._v("监听data事件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("rs.on('data', function (data) {\n    console.log(data);\n});\n")])])])]),e._v(" "),t("li",[t("p",[e._v("监听end事件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("rs.on('end', function () {\n    console.log('读取完成');\n});\n")])])]),t("blockquote",[t("p",[e._v("所有事件都是内部发布，外部on订阅。")])])]),e._v(" "),t("li",[t("p",[e._v("监听open事件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("rs.on('open', function () {\n    console.log(err);\n});\n")])])])]),e._v(" "),t("li",[t("p",[e._v("监听close事件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("rs.on('close', function () {\n    console.log(err);\n});\n")])])])]),e._v(" "),t("li",[t("p",[e._v("监听错误事件(文件不存在)")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("rs.on('error', function (err) {\n    console.log(err);\n});\n")])])])]),e._v(" "),t("li",[t("p",[e._v("暂停和恢复触发data")]),e._v(" "),t("p",[e._v("通过pause()方法和resume()方法")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("rs.on('data', function (data) {\n    rs.pause();\n    console.log(data);\n});\nsetTimeout(function () {\n    rs.resume();\n},2000);\n")])])])])])]),e._v(" "),t("li",[t("p",[e._v("可写流")])]),e._v(" "),t("li",[t("p",[e._v("pipe方法")])]),e._v(" "),t("li",[t("p",[e._v("简单实现原理")])]),e._v(" "),t("li",[t("p",[e._v("暂停模式")])]),e._v(" "),t("li",[t("p",[e._v("自定义可读流")])])])])}],!1,null,null,null);n.default=a.exports}}]);