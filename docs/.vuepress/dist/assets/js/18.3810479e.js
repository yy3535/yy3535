(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{188:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"es6"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es6","aria-hidden":"true"}},[t._v("#")]),t._v(" ES6")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#let和const"}},[t._v("let和const")]),s("ul",[s("li",[s("a",{attrs:{href:"#优点"}},[t._v("优点")])]),s("li",[s("a",{attrs:{href:"#const特殊地方"}},[t._v("const特殊地方")])]),s("li",[s("a",{attrs:{href:"#哪些地方用const"}},[t._v("哪些地方用const")])])])]),s("li",[s("a",{attrs:{href:"#解构赋值-deconstruction"}},[t._v("解构赋值(deconstruction)")])]),s("li",[s("a",{attrs:{href:"#扩展运算符…"}},[t._v("扩展运算符…")]),s("ul",[s("li",[s("a",{attrs:{href:"#用处"}},[t._v("用处")])])])]),s("li",[s("a",{attrs:{href:"#object-defineproperty-定义属性"}},[t._v("Object.defineProperty(定义属性)")]),s("ul",[s("li",[s("a",{attrs:{href:"#使用"}},[t._v("使用")])]),s("li",[s("a",{attrs:{href:"#vue双向绑定实现原理"}},[t._v("vue双向绑定实现原理")])])])]),s("li",[s("a",{attrs:{href:"#class类"}},[t._v("class类")]),s("ul",[s("li",[s("a",{attrs:{href:"#es5中的类"}},[t._v("es5中的类")])]),s("li",[s("a",{attrs:{href:"#es6中的类"}},[t._v("es6中的类")])]),s("li",[s("a",{attrs:{href:"#babel"}},[t._v("babel")])]),s("li",[s("a",{attrs:{href:"#装饰器"}},[t._v("装饰器")])])])]),s("li",[s("a",{attrs:{href:"#箭头函数"}},[t._v("箭头函数")])]),s("li",[s("a",{attrs:{href:"#symbol"}},[t._v("Symbol")])]),s("li",[s("a",{attrs:{href:"#map-set-集合"}},[t._v("map set 集合")]),s("ul",[s("li",[s("a",{attrs:{href:"#set"}},[t._v("set")])]),s("li",[s("a",{attrs:{href:"#set的方法"}},[t._v("Set的方法")])]),s("li",[s("a",{attrs:{href:"#map"}},[t._v("map")])])])]),s("li",[s("a",{attrs:{href:"#模板字符串"}},[t._v("模板字符串``")])]),s("li",[s("a",{attrs:{href:"#其他语法"}},[t._v("其他语法")])])])]),s("p"),t._v(" "),s("h2",{attrs:{id:"let和const"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#let和const","aria-hidden":"true"}},[t._v("#")]),t._v(" let和const")]),t._v(" "),s("h3",{attrs:{id:"优点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#优点","aria-hidden":"true"}},[t._v("#")]),t._v(" 优点")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("没有变量提升问题")])]),t._v(" "),s("li",[s("p",[t._v("不能重复声明")])]),t._v(" "),s("li",[s("p",[t._v("不会污染全局作用域(let a; window.a//null)")])]),t._v(" "),s("li",[s("p",[t._v("有作用域")]),t._v(" "),s("blockquote",[s("p",[t._v("以前需要让变量有作用域，需要用函数把变量包起来：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("(function(){\n\tvar a=1 \n})()\n")])])]),s("p",[t._v("现在{}和let配合可产生作用域")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("{\n\tlet a=1\n}\n")])])])])]),t._v(" "),s("li",[s("p",[t._v("变量会绑定作用域内的let，不受外部影响(块级作用域开始的地方到let声明之前称作"),s("strong",[t._v("暂存死区")]),t._v("，会出现not defined错误)")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let a=2\n{\n\tconsole.log(a)//not defined\n\tlet a=1\n}\nconsole.log(a)\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("for(let i=0;i<100;i++){\n  setTimeout(()=>{\n    console.log(i);\n  },1)\n}\n")])])]),s("h3",{attrs:{id:"const特殊地方"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#const特殊地方","aria-hidden":"true"}},[t._v("#")]),t._v(" const特殊地方")]),t._v(" "),s("p",[t._v("常量，不能更改值得引用地址，会报错")]),t._v(" "),s("p",[t._v("所以可这样更改：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("const a={a:1}\na.a=100//正确\n")])])]),s("h3",{attrs:{id:"哪些地方用const"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#哪些地方用const","aria-hidden":"true"}},[t._v("#")]),t._v(" 哪些地方用const")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("const fs=require('fs');\nfs.xxx\n")])])]),s("h2",{attrs:{id:"解构赋值-deconstruction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解构赋值-deconstruction","aria-hidden":"true"}},[t._v("#")]),t._v(" 解构赋值(deconstruction)")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("结构相同的内容，可直接拿出来")])]),t._v(" "),s("li",[s("p",[t._v("可赋予默认值")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("Promise.all([1,2,3,4]).then(function([,,a,,b='hello']){\n  console.log(a,b)//3 'hello'\n})\nlet [,,a,,b='hello']=[1,2,3,4];\n")])])])]),t._v(" "),s("li",[s("p",[t._v("对象的解构，=号是赋予默认值，:是起别名")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let {length}=[1,2,3,4];\nconsole.log(length);//4\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let {length}={length:3};//length:3\nlet {length:Len}={length:3}//Len:3\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"扩展运算符…"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#扩展运算符…","aria-hidden":"true"}},[t._v("#")]),t._v(" 扩展运算符…")]),t._v(" "),s("h3",{attrs:{id:"用处"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#用处","aria-hidden":"true"}},[t._v("#")]),t._v(" 用处")]),t._v(" "),s("ol",[s("li",[t._v("#####对象的展开(es7)")]),t._v(" "),s("li",[t._v("拷贝对象")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let obj={name:'zfpx',age:9};\nlet school={...obj}//...的作用就是删掉外面的{}\nconsole.log(school===obj)//不相等，因为是另辟了一个空间\n")])])]),s("ol",[s("li",[s("p",[t._v("合并对象")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let school={...obj,...obj1};\n")])])])])]),t._v(" "),s("ul",[s("li",[s("p",[t._v("$.extend：深拷贝")])]),t._v(" "),s("li",[s("p",[t._v("扩展运算符(…)：浅拷贝，对象的对象引用地址还是同一个")])]),t._v(" "),s("li",[s("p",[t._v("Object.assign(es6)：浅拷贝")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let o=Object.assign(obj.obj1)\n或者\nlet o={}\nlet o=Object.assign(o,obj,obj1)\n")])])])])]),t._v(" "),s("blockquote",[s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//如何实现深拷贝----递归拷贝\nlet obj={a:b:{abc:abc}}\nfunction deepClone(obj){\nif(obj===null) return null;\nif(typeof obj!='object') return obj;\nif(obj instanceof RegExp) return new RegExp(obj);\nif(obj instanceof Date) return new Date(obj);\nlet newObj=new obj.constructor;\nfor(let key in obj){\nnewObj[key]=deepClone(obj[key]);\n}\nreturn newObj\n}\nlet newReg=deepClone(obj);\nconsole.log(newReg);\n")])])])]),t._v(" "),s("ol",[s("li",[t._v("#####数组的展开(es6)")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("console.log([...arr1,...arr2])//原理：es6转es5,concat(arr1,arr2)\nMath.max.apply(Math,arr1)//以前展开数组方法\nconsole.log(Math.max(...arr1));//现在展开数组方法\n")])])]),s("ol",[s("li",[s("h5",{attrs:{id:"剩余运算符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#剩余运算符","aria-hidden":"true"}},[t._v("#")]),t._v(" 剩余运算符")]),t._v(" "),s("p",[t._v("只能放在函数的最后一个参数，sum(b,…arg)")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("function sum(...arg){//使用剩余运算符作为参数接收，并且只能放在最后一项\n  //return eval(arguments.join('+'));类数组没有join方法\n  return eval([...arguments].join('+'));//类数组可迭代，所以可以用这个运算符\n}\nlet r=sum(1,2,3,4,5);\nconsole.log(r)\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"object-defineproperty-定义属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#object-defineproperty-定义属性","aria-hidden":"true"}},[t._v("#")]),t._v(" Object.defineProperty(定义属性)")]),t._v(" "),s("p",[t._v("1.这种方式定义无法看到但是可以取到属性")]),t._v(" "),s("p",[t._v("2.这种方式定义的属性不可更改")]),t._v(" "),s("p",[t._v("3.这种方式定义的属性不可删除")]),t._v(" "),s("p",[t._v("4.value可改成get,set，捕获事件")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let obj={}\nlet temp=3.15;\nObject.defineProperty(obj,'name',{\n\t//原理:\n\t//enumerable:false,如果改成true就可看见。\n\t//writable:false，改成true就可以改写\n\t//configurable:false，改成true就可被删除\n  //value:123===>可改成get和set，且使用get，set是不能有value和writable的\n\tget(){\n    console.log('哈哈')\n    return temp\n\t},\n\tset(val){\n    console.log('呵呵');\n    temp=val;\n\t}\n})\nconsole.log(obj)//{}\nconsole.log(obj.name)//123\n\nget第二种写法\n\nlet obj={\n\ttemp:'',\n  get PI(){\n    return this.temp\n  },\n  set PI(val){\n    this.temp=val;\n  }\n}\nconsole.log(obj.PI)\nobj.PI=100;\n")])])]),s("h3",{attrs:{id:"使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用")]),t._v(" "),s("ul",[s("li",[t._v("class的实现")]),t._v(" "),s("li",[t._v("vue的MVVM")]),t._v(" "),s("li",[t._v("mobx")]),t._v(" "),s("li",[t._v("装饰器")]),t._v(" "),s("li",[t._v("koa")])]),t._v(" "),s("p",[t._v("//作业：")]),t._v(" "),s("p",[t._v("写promise es6版本的 传到github")]),t._v(" "),s("h3",{attrs:{id:"vue双向绑定实现原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue双向绑定实现原理","aria-hidden":"true"}},[t._v("#")]),t._v(" vue双向绑定实现原理")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//老的原理\nlet obj={name:'zfpx',age:9};\nfunction update(){\n  console.log('数据更新了')\n}\nfunction observer(obj){\n  if(typeof obj!=='object'){\n    return obj;//普通值不需要观察\n  }\n  for(let key in obj){\n    defineReactive(obj,key,obj[key]);\n  }\n}\n//把对象中的所有属性都采用Object.defineProperty方式来定义\nfunction defineReactive(obj,key,value){\nobserver(value);//递归确认值是否是对象\n  Object.defineProperty(obj,key,{\n    get(){\n      return value;\n    },\n    set(val){\n      update();\n      if(value!=val) value=val\n    }\n  })\n}\nobserver(obj);\nobj.name=100;\nconsole.log(obj.name)\nobj.name.name='zfpx1';\n\n//现在的原理：proxy 代理 es6语法 mobx observer\n好处：\n- Object.defineProperty不支持数组，而proxy可监控到数组的变化\n- 不存在的属性添加时依然可以监控\n坏处：\n- 兼容性不好，Object.defineProperty是es5语法\n//let arr=[1,2,3]\nlet obj={}\nlet p=new Proxy(obj,{\n  get(target,key,proxy){//第三个参数一般不用，调用了会陷入死循环\n    return Reflect.get(target,key);//第二种写法\n    //第一种写法：return target[key]\n  },\n  set(target,key,value){\n  \tif(key==='length') return true;\n    return Reflect.set(target,key,value);\n  }\n})\n//p.push(4);\np.name='hello';\n\n")])])]),s("h2",{attrs:{id:"class类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#class类","aria-hidden":"true"}},[t._v("#")]),t._v(" class类")]),t._v(" "),s("h3",{attrs:{id:"es5中的类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es5中的类","aria-hidden":"true"}},[t._v("#")]),t._v(" es5中的类")]),t._v(" "),s("p",[t._v("原生的构造函数")]),t._v(" "),s("p",[t._v("类必须要大写")]),t._v(" "),s("p",[t._v("es5中可以当做函数来调用，es6中类只能new")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Animal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("type"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Animal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("eat")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'eat'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 继承的三种方法")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1.继承实例上的属性")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Cat")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Animal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2.获取父类的公共属性")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" node刚出来的时候\nes5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Cat")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("__proto__"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Animal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" node6"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("的时候\nes5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Cat")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("Object"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Animal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("constructor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Cat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" es6出来以后\nes6"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Object"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setPrototypeOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Cat")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Animal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" cat"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Cat")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'哺乳类'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("eat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3.继承父类实例上的所有属性：因为初始化子类不能给父类传参，所以没人用，一般用1+2")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Cat")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Animal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" cat"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Cat")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'哺乳类'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n")])])]),s("h3",{attrs:{id:"es6中的类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es6中的类","aria-hidden":"true"}},[t._v("#")]),t._v(" es6中的类")]),t._v(" "),s("p",[t._v("只能new")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("class Animal{\n  constructor(type){\n    this.type=type;\n  }\n  //添加公共属性\n  eat(){\n    console.log(this);\n  }\n}\n//继承原型和公共方法，extends里面内置了call，也实现了继承共有属性\nClass Cat extends Animal{\n\t//静态方法，子类可继承\n\tstatic flag(){\n    return '好玩'\n\t}\n  constructor(type){\n    super(type);//继承必须写这句，相当于Animal.call(this.type);\n  }\n}\nAnimal.prototype.eat=...//不需要用这种方法，直接在类里添加即可\nAnimal()//出错 构造函数Animal只能通过new来调用\nlet animal=new Animal('哺乳类');\nlet cat=new Cat('哺乳类')\n\n\n")])])]),s("p",[t._v("如何用es5实现es6Class类")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("function _classCallCheck(sub,constr){\n  if(!(sub instanceof constr)){\n    throw new Error('Cannot with new ')\n  }\n}\nlet Animal=function (){\n  function Animal(type){\n    _classCallCheck(this,Animal);//判断如果不是通过new返回错误\n    this.type=type;\n  }\n  _createClass();//用Object.defineProperty，因为通过es6类创建的方法是不可看到的\n  return Animal;\n}()\nAnimal()\n//...没看懂==！\n\n")])])]),s("h3",{attrs:{id:"babel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#babel","aria-hidden":"true"}},[t._v("#")]),t._v(" babel")]),t._v(" "),s("p",[t._v("转换es6成es5")]),t._v(" "),s("p",[t._v("可在命令行中直接转换")]),t._v(" "),s("ol",[s("li",[t._v("安装babel")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("npm install @babel/cli @babel/core//babel核心和babelcli\nnpm add @babel/preset-env//babel插件1\nnpm add @babel/plugin-proposal-class-properties//babel插件2\nnpm add @babel/plugin-proposal-decorators//babel插件3\n\n")])])]),s("ol",[s("li",[s("p",[t._v("新建一个.babelrc文件，运行时会按这个文件的方式来解析")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('{\n\t"presets":[\n    "@babel/preset-env"//这个插件告诉babel按es6到es5编译\n\t],\n  "plugins":[\n  \t[\n      "@babel/plugin-proposal-class-properties",//这个插件用来转化类上的属性\n      {\n        "loose":false\n      }\n  \t],\n  \t[\n      "@babel/plugin-proposal-decorators",//这个插件用来识别类装饰器\n      {\n        "legacy":true\n      }\n  \t]\n  ]\n}\n\n')])])])]),t._v(" "),s("li",[s("p",[t._v("解析")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("class Circle{\n\tconstructor(){\n    this.a=1\n\t}//简写成如下写法\n\ta=1//高级写法，可用babel解析识别\n  static PI=3.14//es6不支持静态属性，可用babel解析识别\n}\nlet c=new Circle;\nconsole.log(c.a)\n命令：babel 6.class.js -o new.jss\n\n")])])])])])])]),t._v(" "),s("h3",{attrs:{id:"装饰器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#装饰器","aria-hidden":"true"}},[t._v("#")]),t._v(" 装饰器")]),t._v(" "),s("pre",[s("code",[t._v("  @符号表示是装饰器，他可以修饰类 类中的属性和方法\n\n  ```\n  function sweetCoffee(coffee){\n    coffee();\n    console.log('加糖')\n  }\n  function coffee(){\n    console.log('一杯苦coffee')\n  }\n  sweetCoffee(coffee)\n  \n  ```\n")])]),t._v(" "),s("h2",{attrs:{id:"箭头函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#箭头函数","aria-hidden":"true"}},[t._v("#")]),t._v(" 箭头函数")]),t._v(" "),s("p",[t._v("没有this指向 没有arguments")]),t._v(" "),s("p",[t._v("一个参数可以省略圆括号")]),t._v(" "),s("p",[t._v("可以省略return和{}，如果返回的是一个对象，要用小括号包裹起来")]),t._v(" "),s("h2",{attrs:{id:"symbol"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#symbol","aria-hidden":"true"}},[t._v("#")]),t._v(" Symbol")]),t._v(" "),s("p",[t._v("js的数据类型：number string boolean null undefined  object")]),t._v(" "),s("p",[t._v("Symbol是第七种，一般用作常量")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("console.log(typeof Symbol());//symbol\nconsole.log(Symbol()===Symbol());//false\nconsole.log(Symbol('a')===Symbol('a'));//false\nconst a1=Symbol.for('a');//声明一个Symbol\nconsole.log(Symbol.keyFor(a1))//a ,取值\n\n")])])]),s("p",[t._v("特点：每次拿到的都不一样")]),t._v(" "),s("h2",{attrs:{id:"map-set-集合"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#map-set-集合","aria-hidden":"true"}},[t._v("#")]),t._v(" map set 集合")]),t._v(" "),s("h3",{attrs:{id:"set"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#set","aria-hidden":"true"}},[t._v("#")]),t._v(" set")]),t._v(" "),s("p",[t._v("放的东西不能重复(数组可重复)，可以被迭代")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//数组去重\nlet arr=[1,2,3,3,2,1]\nconsole.log(new Set(arr));\n\n")])])]),s("h4",{attrs:{id:"常见面试题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常见面试题","aria-hidden":"true"}},[t._v("#")]),t._v(" 常见面试题")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//并集\nlet arr1=[1,2,3,3,2,1];\nlet arr2=[4,5,6];\nlet s=[...new Set([...arr1,arr2])];//Symbol.iterator\nconsole.log(s)//1,2,3,4,5,6\n\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//交集\nlet s1=new Set(arr1);\nlet s2=new Set(arr2);\nlet r=[...s1].filter(item=>{//如果返回true表示留下\n  return s2.has(item);\n})\nconsole.log(r);\n\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//差集\nlet r=[...s1].filter(item=>{//如果返回true表示留下\n  return !s2.has(item);\n})\nconsole.log(r);\n\n")])])]),s("h3",{attrs:{id:"set的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#set的方法","aria-hidden":"true"}},[t._v("#")]),t._v(" Set的方法")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let s=new Set([1,2,3]);\ns.add(5);\ns.clear();\ns.delete(2);\n\n")])])]),s("h3",{attrs:{id:"map"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#map","aria-hidden":"true"}},[t._v("#")]),t._v(" map")]),t._v(" "),s("p",[t._v("一样，不能放重复的数据")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let map=new Map();\nmap.set('js',['nodejs'])\nmap.set('js',['js1'])//覆盖\nconsole.log(map);\nmap.forEach((item,key)=>{\n  console.log(item,key)\n})\n\n")])])]),s("h2",{attrs:{id:"模板字符串"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模板字符串","aria-hidden":"true"}},[t._v("#")]),t._v(" 模板字符串``")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//拼接字符串")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'zfpx'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" age"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" val"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("今年")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("age"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("岁了\n你好\n`")])]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("val"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("ul",[s("li",[t._v("用`（反引号）标识，用${}将变量括起来。可自动支持换行，用${}显示变量值")]),t._v(" "),s("li",[t._v("如果使用模版字符串表示多行字符串，所有的空格和缩进都会被保存在输出中")]),t._v(" "),s("li",[t._v("可以放入任意的JavaScript表达式，还可以进行运算")]),t._v(" "),s("li",[t._v("模版字符串还可以调用函数")]),t._v(" "),s("li",[t._v("引用模版字符串本身")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"return"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"`Hello! ${name}`"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" func"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("str"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("func")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"zzw"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"其他语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#其他语法","aria-hidden":"true"}},[t._v("#")]),t._v(" 其他语法")]),t._v(" "),s("ul",[s("li",[t._v("Object.is(value1, value2);\n"),s("ul",[s("li",[t._v("参数\n"),s("ul",[s("li",[t._v("value1，第一个需要比较的值。")]),t._v(" "),s("li",[t._v("value2，第二个需要比较的值。")])])]),t._v(" "),s("li",[t._v("返回值\n"),s("ul",[s("li",[t._v("表示两个参数是否相同的"),s("code",[t._v("布尔值")]),t._v(" 。")])])])])]),t._v(" "),s("li",[t._v("是不是非数\n"),s("ul",[s("li",[t._v("window.isNaN()\n"),s("ul",[s("li",[t._v("先把参数转化为数字类型,再判断是不是 NaN")]),t._v(" "),s("li",[t._v("只要不是数字都满足")])])]),t._v(" "),s("li",[t._v("Number.isNaN()\n"),s("ul",[s("li",[t._v("先判断参数是不是数字类型,不是就返回 false, 是数字类型再进入判断是不是 NaN.")]),t._v(" "),s("li",[t._v("只有数字中的NaN满足")])])])])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isNaN")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abc'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\nNumber"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isNaN")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abc'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n")])])])])}],!1,null,null,null);a.default=n.exports}}]);