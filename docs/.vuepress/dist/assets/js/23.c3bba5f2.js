(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{182:function(t,e,r){"use strict";r.r(e);var o=r(0),a=Object(o.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[r("h1",{attrs:{id:"zepto源码解读"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#zepto源码解读","aria-hidden":"true"}},[t._v("#")]),t._v(" zepto源码解读")]),t._v(" "),r("h2",{attrs:{id:"逻辑设计"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#逻辑设计","aria-hidden":"true"}},[t._v("#")]),t._v(" 逻辑设计")]),t._v(" "),r("p",[t._v("zepto对象看起来像数组，但无论是instanceof还是._"),r("em",[t._v("proto")]),t._v("_.constructor都不是Array.")]),t._v(" "),r("h2",{attrs:{id:"javascript原型基础知识"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#javascript原型基础知识","aria-hidden":"true"}},[t._v("#")]),t._v(" javascript原型基础知识")]),t._v(" "),r("p",[t._v("每个函数都有一个prototype，")]),t._v(" "),r("p",[t._v("里面包含一个constructor和_"),r("em",[t._v("proto")]),t._v("_，")]),t._v(" "),r("p",[t._v("constructor指向这个函数本身")]),t._v(" "),r("blockquote",[r("p",[t._v("prototype:")]),t._v(" "),r("ol",[r("li",[t._v("constructor")]),t._v(" "),r("li",[t._v("_"),r("em",[t._v("proto")]),t._v("_")])])]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("var fn=function(){}\nfn.prototype\n> constructor//fn===fn.prototype.constructor//true\n> __proto__\n")])])]),r("p",[t._v("Array的prototype里也有constructor和_"),r("em",[t._v("proto")]),t._v("_，还包括内置的一些属性。")]),t._v(" "),r("blockquote",[r("p",[t._v("Array.prototype:")]),t._v(" "),r("ol",[r("li",[t._v("constructor")]),t._v(" "),r("li",[t._v("_"),r("em",[t._v("proto")]),t._v("_")]),t._v(" "),r("li",[t._v("map")]),t._v(" "),r("li",[t._v("push")])]),t._v(" "),r("p",[t._v("...")])]),t._v(" "),r("p",[t._v("所有构造函数new出来的对象都有个_"),r("em",[t._v("proto")]),t._v("_，指向构造函数的prototype，__proto__是可修改的，但修改以后原来的就没有了。")]),t._v(" "),r("h2",{attrs:{id:"zepto设计原理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#zepto设计原理","aria-hidden":"true"}},[t._v("#")]),t._v(" zepto设计原理")]),t._v(" "),r("p",[t._v("重写数组_"),r("em",[t._v("proto")]),t._v("_，里面要用到原数组属性的直接=Array.prototype.xxx，其余添加它想要添加的方法。")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("var arr=[1,2,3];\narr.__proto__={\n  addClass:function(){\n    console.log('this is addClass');\n  },\n  concat:Array.prototype.concat,\n  push:Array.prototype.push\n};\narr.push(4);\narr.addClass();\n")])])]),r("h2",{attrs:{id:"zepto源码解构"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#zepto源码解构","aria-hidden":"true"}},[t._v("#")]),t._v(" zepto源码解构")]),t._v(" "),r("p",[t._v("https://cdn.bootcss.com/zepto/1.1.6/zepto.js")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("var Zepto=(function(){\n  var $,\n  zepto={}\n  //省略N行代码\n  $=function(selector,context){\n    return zepto.init(selector,context)\n  }\n  //省略N行代码\n  return $\n})()\nwindow.Zepto=Zepto\nwindow.$===undefined&&(window.$=Zepto)\n")])])]),r("h2",{attrs:{id:"zepto源码-init函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#zepto源码-init函数","aria-hidden":"true"}},[t._v("#")]),t._v(" zepto源码-init函数")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("zepto.init=function(selector,context){\n  var dom\n  // ...此处省略N行对dom的处理...\n  // 1.selector为空\n  // 2.selector是字符串，其中又分好几种情况\n  // 3.selector是函数\n  // 4.其他情况，例如selector是数组，对象等\n  return zepto.Z(dom,selector)\n}\n")])])]),r("h2",{attrs:{id:"zepto源码-z函数-上"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#zepto源码-z函数-上","aria-hidden":"true"}},[t._v("#")]),t._v(" zepto源码-Z函数-上")]),t._v(" "),r("p",[t._v(".fn，在类库中一般是.prototype原型的意思。因为prototype太长，所以把prototype赋值给fn")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("zepto.Z=function(dom,selector){\n  dom=dom||[]\n  dom.__proto__=$.fn\n  dom.selector=selector||''\n  return dom\n}\n\n$.fn={\n  //...很多属性...\n}\n")])])]),r("h2",{attrs:{id:"zepto源码-z函数-下"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#zepto源码-z函数-下","aria-hidden":"true"}},[t._v("#")]),t._v(" zepto源码-Z函数-下")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("function Z(dom,selector){\n  var i,len=dom?dom.length:0\n  for(i=0;i<len;i++) this[i]=dom[i]\n  this.length=len\n  this.selector=selector||''\n}\n\nzepto.Z=function(dom,selector){\n  return new Z(dom,selector)\n}\n\n$.fn={\n  //...很多属性...\n}\n\nzepto.Z.prototype=Z.prototype=$.fn\n")])])])])}],!1,null,null,null);e.default=a.exports}}]);