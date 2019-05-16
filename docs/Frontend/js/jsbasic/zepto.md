# zepto源码解读

## 逻辑设计

zepto对象看起来像数组，但无论是instanceof还是.\__proto__.constructor都不是Array.

## javascript原型基础知识

每个函数都有一个prototype，

里面包含一个constructor和\__proto__，

constructor指向这个函数本身

> prototype:
>
> 1. constructor
> 2. \__proto__

```
var fn=function(){}
fn.prototype
> constructor//fn===fn.prototype.constructor//true
> __proto__
```

Array的prototype里也有constructor和\__proto__，还包括内置的一些属性。

> Array.prototype:
>
> 1. constructor
> 2. \__proto__
> 3. map
> 4. push
>
> ...

所有构造函数new出来的对象都有个\__proto__，指向构造函数的prototype，\__proto__是可修改的，但修改以后原来的就没有了。

## zepto设计原理

重写数组\__proto__，里面要用到原数组属性的直接=Array.prototype.xxx，其余添加它想要添加的方法。

```
var arr=[1,2,3];
arr.__proto__={
  addClass:function(){
    console.log('this is addClass');
  },
  concat:Array.prototype.concat,
  push:Array.prototype.push
};
arr.push(4);
arr.addClass();
```

## zepto源码解构

https://cdn.bootcss.com/zepto/1.1.6/zepto.js

```
var Zepto=(function(){
  var $,
  zepto={}
  //省略N行代码
  $=function(selector,context){
    return zepto.init(selector,context)
  }
  //省略N行代码
  return $
})()
window.Zepto=Zepto
window.$===undefined&&(window.$=Zepto)
```

## zepto源码-init函数

```
zepto.init=function(selector,context){
  var dom
  // ...此处省略N行对dom的处理...
  // 1.selector为空
  // 2.selector是字符串，其中又分好几种情况
  // 3.selector是函数
  // 4.其他情况，例如selector是数组，对象等
  return zepto.Z(dom,selector)
}
```

## zepto源码-Z函数-上

.fn，在类库中一般是.prototype原型的意思。因为prototype太长，所以把prototype赋值给fn

```
zepto.Z=function(dom,selector){
  dom=dom||[]
  dom.__proto__=$.fn
  dom.selector=selector||''
  return dom
}

$.fn={
  //...很多属性...
}
```



## zepto源码-Z函数-下

```
function Z(dom,selector){
  var i,len=dom?dom.length:0
  for(i=0;i<len;i++) this[i]=dom[i]
  this.length=len
  this.selector=selector||''
}

zepto.Z=function(dom,selector){
  return new Z(dom,selector)
}

$.fn={
  //...很多属性...
}

zepto.Z.prototype=Z.prototype=$.fn
```

