# vue

[[toc]]

## start

- 渐进式
可按需使用
- 逐一递增
vue+components+vue-router+vuex+vue-cli
- 库和框架的区别

  库：调用库中的方法实现自己的功能

  框架：我们在指定的位置写好代码，框架帮我们调用
- mvc和mvvm区别

  mvc单向，model-view-controller，数据变化后需要通过controller手动改变视图
  <mark-check id="mvvmdefine"></mark-check>
  <highlight-box>mvvm双向</highlight-box>，model-view-viewmodel，数据变化可以驱动视图，vm就是viewmodel
- 声明式和命令式

  reduce不知道内部如何实现，是声明式

  for循环，命令计算机帮执行，叫做命令式

### vm=new Vue({})配置
<mark-check id="newvue"></mark-check>

```js
let vm=new Vue({
    //范围 
    el:'#app',
    //替换范围中内容
    template:'<h1>hello world</h1>',
    //存放数据,把数据代理给了vm。用之前需要先声明。
    data:{
      info:{xxx:'xxx'}
    }
}).$mount('#app')//与el相同作用，二选一
```
**注：**
el换成.$mount('#app')是一样的。
单元测试时会用到。


## observer(响应式变化)
<mark-check id="zhisheweiduixiang"></mark-check>
### 什么样的数据会更新

1. <highlight-box>对象需要先声明存在，才能触发数据更新。</highlight-box>

2. <highlight-box>数组需要改写，改写后length变化不能监听</highlight-box>

   ```js
   let arr=['push','slice','shift','unshift']
    arr.forEach(method=>{
      let oldPush=Array.prototype[method];
      Array.prototype[method]=function(value){
        console.log('数据更新了')
        oldPush.call(this,value)//别人身上的方法，想要使用到自己身上，就用call去调用
      }
    })
    obj.age.push(5)
   ```
3. <highlight-box>值设置为对象才有效，需要修改某个值，可以使用</highlight-box>
```js
  vm.$set(vm.info,'address','zf');
   
    vm.info.address='world'//无效 
    
    vm.info={address:'回龙观'}//有效，
```
<mark-check id="shuangxiangbangdingyuanli"></mark-check>
### observer原理
<mark-box>

```js
//老的原理
let obj={name:'zfpx',age:9};
function update(){
  console.log('数据更新了')
}
function observer(obj){
  if(typeof obj!=='object'){
    return obj;//普通值不需要观察
  }
  for(let key in obj){
    defineReactive(obj,key,obj[key]);
  }
}
//把对象中的所有属性都采用Object.defineProperty方式来定义
function defineReactive(obj,key,value){
observer(value);//递归确认值是否是对象
  Object.defineProperty(obj,key,{
    get(){
      return value;
    },
    set(val){
      update();
      if(value!=val) value=val
    }
  })
}
observer(obj);
obj.name=100;
console.log(obj.name)
obj.name.name='zfpx1';

//现在的原理：proxy 代理 es6语法 mobx observer
好处：
- Object.defineProperty不支持数组，而proxy可监控到数组的变化
- 不存在的属性添加时依然可以监控
坏处：
- 兼容性不好，Object.defineProperty是es5语法
//let arr=[1,2,3]
let obj={}
let p=new Proxy(obj,{
  get(target,key,proxy){//第三个参数一般不用，调用了会陷入死循环
    return Reflect.get(target,key);//第二种写法
    //第一种写法：return target[key]
  },
  set(target,key,value){
  if(key==='length') return true;
    return Reflect.set(target,key,value);
  }
})
//p.push(4);
p.name='hello';

```
</mark-box>

<mark-check id="vueinstance"></mark-check>
## vue实例

### 实例属性
- <highlight-box>vm.$data</highlight-box>
- <highlight-box>vm.$props</highlight-box>
- <highlight-box>vm.$el</highlight-box>
- <highlight-box>vm.$options</highlight-box>
- <highlight-box>vm.$parent</highlight-box>
- <highlight-box>vm.$root</highlight-box>
- <highlight-box>vm.$children</highlight-box>
- <highlight-box>vm.$slots</highlight-box>
- <highlight-box>vm.$scopedSlots</highlight-box>
- <highlight-box>vm.$refs</highlight-box>
- <highlight-box>vm.$isServer</highlight-box>
- <highlight-box>vm.$attrs</highlight-box>
- <highlight-box>vm.$listeners</highlight-box>

### 实例方法
#### 数据
- <highlight-box>vm.$watch</highlight-box>
  - vm.$watch('info.xxx',function(newValue,oldValue){...})

   数据变化后执行
   (多次更新只会触发一次)

- vm.$set
- vm.$delete
#### 事件
- <highlight-box>vm.$on</highlight-box>
  - vm.$on('click',change) 绑定事件
- vm.$once
- vm.$off
- <highlight-box>vm.$emit</highlight-box>
#### 生命周期
- <highlight-box>vm.$mount</highlight-box>
- vm.$forceUpdate
- <highlight-box>vm.$nextTick</highlight-box>
  - vm.$nextTick(()=>{...})
    - 视图更新后再执行
   (vue数据变化后更新视图操作是异步执行的)
- vm.$destroy
   - 手动销毁组件

<mark-check id="template"></mark-check>

## template

### <highlight-box>取值表达式{{}}</highlight-box>

   作用：
   - 运算
   - 取值
   - 三元

   **注：**
   - 其中的this都是指代vm实例，可省略
   - 取值时放对象，加空格即可 {{ {name:1} }}

<mark-check id="directive"></mark-check>

## 指令
### <highlight-box>v-text</highlight-box>

### <highlight-box>v-html </highlight-box>
渲染成dom元素

**注：**
v-html使用innerHTML,所以不要将用户输入的内容展现出来，内容必须为可信任
\<img src="x" onerror="alert()" /> 图片找不到会走onerror事件，就会弹出alert框
   
### <highlight-box>v-show</highlight-box>

### <highlight-box>v-if v-else v-else-if</highlight-box>
   - 必须是连一块的
   - 可使用template无意义标签来框起来

   **v-if和v-show的区别：**
   v-if控制dom有没有，v-show控制样式不显示，v-show不支持template

### <highlight-box>v-for</highlight-box>

   ```html
   <!-- 循环数组 -->
   <div v-for="(fruit,index) in fruits" :key="index">{{fruit}}{{index}}</div>
   <!-- 循环对象 -->
   <div v-for="(value,key) in fruits" :key="key">{{value}}{{key}}</div>
   ```

   - 循环谁就把它放在谁身上

   - vue2.5以上要求必须使用key属性

   - 可使用template无意义标签来框起来

  **注：**
  1. key只能加在循环的元素上，不能加在template上，应该加在内部循环的元素上
    
```html
<template v-for="i in 3">
<div :key="${i}_1"></div>
<div :key="${i}_2"></div>
</template>
```
  2. key也可以用来区分元素

```html
//修改flag值后不会立刻渲染，因为认为是同一个东西，加了key之后就会立刻重新渲染
<div v-if="flag">
  <span>珠峰</span>
  <input type="text" key="1"/>
</div>
<div v-else>
  <span>架构</span>
  <input type="text" key="2"/>
</div>
```

  3. 尽量不要用index来作为key，因为index再数据顺序变化后会消耗性能，如果有唯一标识，尽量用唯一标识

### <highlight-box>v-on</highlight-box>或@ 绑定事件

```html
<input type='text' @input="fn"/>

methods:{
  fn(){...}
}
```

- 绑定方法，写在method中，this指向vm实例，data中不能放方法，因为this指向window
- methods中不要写成fn:()=>{}，否则this就指向window了
- 方法传参：
  1. 需要传参就加括号写参数，无参数则不加括号
  2. 默认有e事件参数，有传参时，保留$event参数作为事件参数

#### 事件修饰符(可以连续修饰)
- .stop 阻止冒泡
- .prevent 取消默认事件
- .capture 使用事件捕获模式
- .self 只针对元素自身
- .once 事件只会触发一次
- .passive 滚动事件的默认行为 (即滚动行为) 立即触发
```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```
#### 按键修饰符
- @keyup.按键名称/按键unicode码//只有按了该按键才响应

- 常用：.ctrl .esc .enter

```html
<input type="text" @keyup.enter="fn">
<input type="text" @keyup.esc="fn">
```

- 全局自定义按键修饰符别名：
```js
Vue.config.keyCodes={
  'f1':112
}
```

### <highlight-box>v-bind</highlight-box>或: 绑定属性

```html
<!-- <input type='text' :value="msg"/> -->
```

- 绑定属性

> 动态绑定样式 
class
1. 等于对象
```html
<div class="abc" :class="{b:true}">你好</div>
```
2. 等于数组
```html
<div class="abc" :class="['a','b',c]">你好</div>//c为data中定义的
```
style
等于对象或者数组
```html
<div style='color:red' :style="{background:'blue'}">
<div style='color:red' :style="[{background:'red',color:'blue'}]">
```

### <highlight-box>v-model</highlight-box>
#### input
   ```html
   <!-- <input type='text' :value="msg" @input="e=>{msg=e.target.value}"/> -->
   等价于  <!-- v-model 是 @input + :value 的一个语法糖-->
   <!-- <input type='text' v-model="msg"/> -->
   ```
#### model属性自定义model
```js
{
  model:{
    prop:'checked',
    event:'change'
  }
}
```
#### .sync绑定
```vue
<template>
  <Son1 :money="mny" @update:money="val=>mny=val"></Son1>
  // 等同于
  <Son1 :money.sync="mny"></Son1>
</template>
```
#### select,radio和checkbox
```js
//select
data:{
selectValue:'',
list:['{value:'菜单1',id:1}','{value:'菜单2',id:2}','{value:'菜单3',id:3}']
}
<select v-model="selectValue">
<option value="0" disabled>请选择</option>
<option v-for="item in list" :key="item.id" :value="item.id">{{item.value}}</option>
</select>
//select属性multiple多选，太丑一般不用

//radio
//根据v-model来分组,以前根据name分组
data:{
radioValue:'男'
}

<input type='radio' v-model="radioValue" value="男"/>
<input type='radio' v-model="radioValue" value="女"/>
<input type='radio' v-model="radioValue" value="其他"/>

//checkbox
//只要是多个就是数组
data:{
  checkValue:true,
  checkValues:[]
}
不给value，值就是true/false，给了value，就是数组
<!--true/false-->
<input type='checkbox' v-model="checkValue"/>
<!--多选-->
<input type='checkbox' v-model="checkValues" value="游泳"/>
<input type='checkbox' v-model="checkValues" value="健身"/>
<input type='checkbox' v-model="checkValues" value="看书"/>
{{checkValues}}
```

#### 修饰符（可以连续修饰）
```html
  <input type="text" v-model.number="val">{{typeof val}}//只能数字
  <input type="text" v-model.trim="val">{{typeof val}}//清除空格
```

### <highlight-box>v-slot</highlight-box>

### <highlight-box>v-pre</highlight-box>
- 内容不编译

### <highlight-box>v-cloak</highlight-box>
- 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

### <highlight-box>v-once </highlight-box>
只渲染一次，数据变化了也不更新视图

## computed

- methods getFullName()放取值表达式中会造成性能问题，每次其他数据更新都会重新执行这个方法
- computed也是通过Object.defineProperty来实现的，只有依赖的数据更新时才会执行（有缓存）
```js
computed:{
  fullName(){
    return this.firstName+this.lastName;
  }
}
```

### watch实现computed
```js
data:{
  firstName:'珠',
  lastName:'峰',
  fullName:'',
},
methods:{
  getFullName(){
    this.fullName=this.firstName+this.lastName;
  }
},
watch:{//相当于vm.$watch('firstname',()=>{})
  //普通写法，需要mount来执行（立即执行）
  firstName(newValue){
    this.getFullName();
  },
  //其他写法
  firstName:{
    handler(newValue){
      this.getFullName();
    },
    // 立即执行
    immediate:true,
    // 深度(对象中的任何一个属性发送变化，都会执行，默认只监控一层)
    deep:true
  }
  lastName(){
    this.getFullName();
  }
}
```
<mark-check id="computedmethod"></mark-check>
- <highlight-box>computed和method的区别？</highlight-box>
  - computed只有绑定的数据变了才会执行，method做绑定时所有数据变了都会执行
<mark-check id="computedwatch"></mark-check>
- <highlight-box>computed和watch的区别？</highlight-box>
  - 一般来说需要依赖别的属性来动态获得值的时候可以使用 computed，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用 watch。
<mark-check id="computedwatch"></mark-check>
- <highlight-box>data和watch的区别？</highlight-box>

  - data是数据，不可以根据变量计算，而watch支持异步，可以实现一些简单的功能，一般会先考虑使用computed，不能再用watch
- computed 和 watch 还都支持对象的写法
```js
vm.$watch('obj', {
    // 深度遍历
    deep: true,
    // 立即触发
    immediate: true,
    // 执行的函数
    handler: function(val, oldVal) {}
})
var vm = new Vue({
  data: { a: 1 },
  computed: {
    aPlus: {
      // this.aPlus 时触发
      get: function () {
        return this.a + 1
      },
      // this.aPlus = 1 时触发
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
```

### computed实现双向绑定
```vue
<template>
  <input type="checkbox" v-model="checkAll">
  <input type="checkbox" v-for="(item,key) in checks" v-model="item.value" :key="key">
</template>
<script>
  data:{
    checks:[{value:true},{value:false},{value:true},]
  },
  computed:{
    checkAll:{
      get(){
        return this.checks.every(check=>check.value)
      },
      set(kvalue){
        this.checks.forEach(check=>check.value=value);
      }
    }
  }
</script>
```
<mark-check id="lifestyle"></mark-check>

## 生命周期
![生命周期](./img/lifecycle.png)

<mark-check id="beforeCreate"></mark-check>

### <highlight-box>beforeCreate</highlight-box>
在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
```js
data:{
  a:1
},
beforeCreate(){
  console.log(this)//初始化自己的生命周期，事件方法 $on $emit
  console.log(this.$data)//undefined
}
```
<mark-check id="created"></mark-check>

### <highlight-box>created</highlight-box>
在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
```js
created(){
  console.log(this.$el)//无法获取真实dom元素
  console.log(this.$data)//{a:1}
}
```

<mark-check id="beforeMount"></mark-check>
### <highlight-box>beforeMount</highlight-box>
在挂载开始之前被调用：相关的 render 函数首次被调用。

<mark-check id="mounted"></mark-check>

### <highlight-box>mounted</highlight-box>
<mark-box>
<highlight-box>el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted：</highlight-box>
</mark-box>
```js
mounted(){
  // ajax请求到数据后使用nextTick,等待数据更新后再打印
  this.$nextTick(()=>{
    // 数据更新后再打印dom内容
    console.log(this.$el.innerHTML);
  })
}
```

<mark-check id="beforeUpdate"></mark-check>

### <highlight-box>beforeUpdate</highlight-box>
更新前
```js
beforeUpdate(){
  console.log(this.$el.innerHTML);
}
```

<mark-check id="updated"></mark-check>
### <highlight-box>updated</highlight-box>
一般不要操作数据，否则可能会死循环
更新后
```js
updated(){
  console.log(this.$el.innerHTML);
}
```

<mark-check id="beforeDestroy"></mark-check>
### <highlight-box>beforeDestroy（重要）</highlight-box>
实例销毁之前调用。在这一步，实例仍然完全可用。一般会放销毁定时器等解绑操作
```js
beforeDestroy(){
  console.log(this.$el.innerHTML);
}
```

<mark-check id="destroyed"></mark-check>
### <highlight-box>destroyed</highlight-box>
Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
```js
destroyed(){
  console.log(this.$el.innerHTML);
}
```
<mark-check id="destoryquestion"></mark-check>
- 什么情况会走destroy?
  - 路由切换
    一个组件切换到另一个组件，上一个组件要销毁
  - vm.$destroy()
    手动销毁

![vue生命周期](/img/lifecycle.png)

## 组件(component)
- 组件是可复用的 Vue 实例，且带有一个名字
```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
<script>
  // 定义一个名为 button-counter 的新组件
  Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  })
  // 使用组件
  new Vue({ el: '#components-demo' })
</script>

```
:::warning 注意
- data 选项必须是一个函数（以此保证每个实例可以维护一份被返回对象的独立的拷贝）
:::
- 单个根元素
  - 每个组件必须只有一个根元素
  ```html
  <!-- 将模板的内容包裹在一个父元素内 -->
  <div class="blog-post">
    <h3>{{ title }}</h3>
    <div v-html="content"></div>
  </div>
  ```
- 解析DOM模板注意事项
  - 有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。
  - 使用`is`特性
  ```html
  <!-- 这个自定义组件 <blog-post-row> 会被作为无效的内容提升到外部，并导致最终渲染结果出错。 -->
  <table>
    <blog-post-row></blog-post-row>
  </table>
  <!-- 使用is特性 -->
  <table>
    <tr is="blog-post-row"></tr>
  </table>
  ```
  - 从以下来源使用模板的话，这条限制是不存在的：
    - 字符串 (例如：template: '...')
    - 单文件组件 (.vue)
    - `<script type="text/x-template">`




### 组件注册
#### 全局注册（Vue.component(...)）和局部注册
  - 全局注册，注册之后可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中。
  - 局部注册,父组件内部注册
  ```js
  import ComponentA from './ComponentA.vue'

  export default {
    components: {
      ComponentA
    },
    // ...
  }
  ```
  :::warning 公共组件header footer之类
  写在根组件App里即可在整个App组件里共享(如何共享？？路由里的使用不了)
  :::
#### 组件名
  - 遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。避免和当前以及未来的 HTML 元素相冲突。
#### 基础组件的自动化全局注册
如果使用了 webpack (或在内部使用了 webpack 的 Vue CLI 3+)，就可以使用 require.context 只全局注册这些非常通用的基础组件。
这里有一份可以让你在应用入口文件 (比如 src/main.js) 中全局导入基础组件的示例代码：
```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```
:::warning 注意
全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生。
:::
:::tip 使用.vue文件开发两种方法
- 安装vue-cli脚手架
npm install @vue/cli -g
- 安装service-global
npm install -g @vue/cli-service-global
```js
vue serve App.vue
//http://localhost:8080/直接访问组件页面
```
:::

### Prop
- 可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。
```js
// prop可以任意数量，任意值
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
// 对象
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```
```html
<!-- prop被注册后，数据可以作为自定义特性传递过来 -->
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```
```html
<!-- 动态传递特性 -->
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```
```html
<!-- 动态传递对象（无论何时为 post 对象添加一个新的属性，它都会自动地在 <blog-post> 内可用。） -->
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
```

#### Prop的大小写
- HTML中的特性名不区分大小写，所以使用短横线命名

#### Prop类型
- 字符串数组形式
```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

- 对象形式(prop名称:prop类型)
```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```
#### 传递静态或动态Prop
- 传递数字、布尔值、数组、对象
  - 即便值是静态的，我们仍然需要 `v-bind` 来告诉 Vue，这是一个 JavaScript 表达式而不是一个字符串。
  ```html
  <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
  <blog-post v-bind:likes="42"></blog-post>

  <!-- 用一个变量进行动态赋值。-->
  <blog-post v-bind:likes="post.likes"></blog-post>
  ```

- 传入一个对象的所有属性
  - 将一个对象的所有属性都作为 prop 传入，可以使用不带参数的 v-bind (取代 v-bind:prop-name)
  ```js
  post: {
    id: 1,
    title: 'My Journey with Vue'
  }
  ```
  ```html
  <blog-post v-bind="post"></blog-post>
  <!-- 等价于： -->
  <blog-post
    v-bind:id="post.id"
    v-bind:title="post.title"
  ></blog-post>
  ```

#### 单向数据流
- 子组件内部不应该改变 prop
  - 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中
  - 注意：在子组件中改变对象或数组的prop本身将会影响到父组件的状态。


#### Prop 验证
- 当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。
- prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 在 default 或 validator 函数中是不可用的。
```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```
- 类型检查
  - type可以是下列原生构造函数中的一个
    - String
    - Number
    - Boolean
    - Array
    - Object
    - Date
    - Function
    - Symbol  
  - 也可以是自定义的构造函数
#### 非 Prop 的特性
- 组件可以接受任意的特性，而这些特性会被自动添加到这个组件的根元素上。
- 非 prop 特性是指传向一个组件，但是该组件并没有相应 prop 定义的特性。

- 替换/合并已有的特性
  - 对于绝大多数特性来说，从外部提供给组件的值会替换掉组件内部设置好的值。
  - 如果传入 type="text" 就会替换掉 type="date" 并把它破坏
  - class 和 style 特性，两边的值会被合并起来

- 禁用特性继承
  - 如果不希望组件的根元素继承特性(不在DOM上显示)，可以在组件的选项中设置 `inheritAttrs: false`。
    - inheritAttrs: false 选项不会影响 style 和 class 的绑定。
    ```js
    Vue.component('my-component', {
      inheritAttrs: false,
      // ...
    })
    ```
  - 实例的 $attrs包含了传递给一个组件的特性名和特性值,可以手动决定这些特性会被赋予哪个元素(用掉的会从$attrs里去掉)
    ```js
    Vue.component('base-input', {
      inheritAttrs: false,
      props: ['label', 'value'],
      template: `
        <label>
          {{ label }}
          <input
            v-bind="$attrs"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
          >
        </label>
      `
    })
    ```



### 自定义事件
- 父组件在模板中控制字号，并通过`v-on:事件命`绑定事件，`$event`是接受的参数
```html
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
      <!-- 绑定事件 -->
      v-on:enlarge-text="postFontSize += 0.1"
      <!-- 接受参数 -->
      v-on:enlarge-text="postFontSize += $event"
      <!-- 事件函数是方法 -->
      v-on:enlarge-text="onEnlargeText"
    ></blog-post>
  </div>
</div>
<script>
  new Vue({
    el: '#blog-posts-events-demo',
    data: {
      posts: [/* ... */],
      postFontSize: 1
    },
    methods: {
      // 作为第一个参数传入
      onEnlargeText: function (enlargeAmount) {
        this.postFontSize += enlargeAmount
      }
    }
  })
</script>
```
- 组件中添加按钮，通过`v-on:行为="$emit(事件名，参数)"`触发事件，可传一个参数
```js
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      // 绑定事件
      <button v-on:click="$emit('enlarge-text')">
        Enlarge text
      </button>
      // 传参
      <button v-on:click="$emit('enlarge-text',0.1)">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
```
#### 事件名
  - 需要完全匹配，不存在任何自动化的大小写转换
  - 推荐始终使用 kebab-case 的事件名

#### 在组件上使用 v-model

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 value 特性绑定到一个名叫 value 的 prop 上
- 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```
```html
<custom-input v-model="searchText"></custom-input>
```
像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。`model` 选项可以用来避免这样的冲突
```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```
```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```

#### 将原生事件绑定到组件
- 使用 v-on 的 .native 修饰符,在组件的根元素上直接监听一个原生事件
```html
<base-input v-on:focus.native="onFocus"></base-input>
```

- 如果根元素上没有这个原生事件，父级的 .native 监听器将静默失败。
- 提供了一个 `$listeners` 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。
- `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。

#### .sync 修饰符
同步

<mark-check id="componentsmessage"></mark-check>

### 组件间通信
- 子组件触发父级的方法
  - this.$attrs 获取当前组件所有的属性
  - this.$listeners 获取当前组件所有的绑定事件
  - v-bind=$attrs 绑定所有的属性
  - v-on=$listeners 绑定所有的方法


- 组件的某个子元素触发父级方法
  - （调用自己属性上的父级的方法），有三种方法。
    - @click="$listeners.click()"
    - @click="this.$emit('click')"
    - v-on="$listeners"

  ```html
    <div id="app">
      <!--相当于 this.on('click',change)-->
      <my-button @click="change" @mouseup="change"></my-button>
    </div>
    <!-- 第一种 -->
    <button @click=“$listeners.click()”>点我啊</button>
    <!-- 第二种 -->
    <button @click="$emit('click')"></button>
    <!-- 第三种,所有事件全绑上去 -->
    <button v-on="$listeners"></button>
  ```

<mark-box>

- <highlight-box>props emit | $attrs $listeners | $parent $children $ref | $provider $inject | eventBus vuex</highlight-box>
1. prop和$emit
父组件向子组件传递属性和方法通过prop,子组件触发父组件方法，通过$emit调用
2. 同步数据 v-model .sync
3. $attrs和$listeners，如果props里用了，attrs就会减少。未使用的会添加在组件的属性中显示出来。如果不希望没有用的属性增加到dom元素上，加上inheritAttrs:false
Vue2.4开始提供$attrs所有属性和$listeners所有事件方法
4. $parent,$children,
衍生出来封装$dispatch(elementUI简化$parent.$parent.$parent这样的操作，只要父级有该方法就执行)，$broadcast($children.$children.$children这样的操作，只要子级有该方法就行)这两个方法
```JS
Vue.prototype.$diapatch=function(eventName,value){
  let parent=this.$parent;
  while(parent){
    parent.$emit(eventName,value);
    parent=parent.$parent;
  }
}
```
```js
Vue.prototype.$broadcast=function(eventName,componentName,value){
  let children=this.$children;
  function broadcast(children){
    for(let i=0;i<children.length;i++){
      let child=children[i];
      if(componentName===child.$options.name){
        child.$emit(eventName,value)
        return;
      }else{
        if(child.$children){
          broadcast(child.$children);
        }
      }
    }
  }
  broadcast(children)
}
```
5. $refs
   - 父组件中给子组件添加ref属性，获取子组件实例
6. provide和inject
父组件提供数据，子组件获取数据，但不知道数据是哪里的来源
7. eventBus
兄弟组件数据传递，在任何组件中发布，在其他组件中调用。可以任意组件间通信，只适合小规模（大规模不好维护 一呼百应）
```js
Vue.prototype.$bus=new Vue({});
this.$bus.$on()
this.$bus.$emit()
```
8. vuex状态管理 大规模

</mark-box>

### 插槽
#### 插槽内容
- 当组件渲染的时候，<slot></slot> 将会被替换为slot位置上的内容。
- 插槽内可以包含任何模板代码，包括 HTML，甚至其它的组件
```html
<!-- 如果 <alert-box> 没有包含一个 <slot> 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。 -->
<alert-box>
  Something bad happened.
</alert-box>
```
```js
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

#### 编译作用域
- 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。（插槽里只能用到父级里的实例属性，不能访问子组件里的属性）

#### 后备内容
- 设置默认显示内容，如果不提供任何插槽内容，即显示这个。如果提供，会覆盖掉。
```html
<button type="submit">
  <slot>Submit</slot>
</button>
```

#### 具名插槽
- 多个插槽情况需要使用。
- `name`属性
  - 命名插槽，默认不带name时，name为'default'
  ```html
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
  ```
- 使用`v-slot:插槽名`命令指定内容对应的插槽名称，可简写为`#`
  - v-slot 只能添加在一个 `<template>` 上
  ```html
  <base-layout>
    <!-- <template> 元素中的所有内容都将会被传入相应的插槽 -->
    <template v-slot:header>
      <h1>Here might be a page title</h1>
    </template>
    <!-- 任何没有被包裹在带有 v-slot 的 <template> 中的内容都会被视为默认插槽的内容。 -->
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
    <!-- 等同于 -->
    <template v-slot:default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>
    <template v-slot:footer>
      <p>Here's some contact info</p>
    </template>
  </base-layout>
  ```

#### 作用域插槽
- 让父级插槽内容能够访问子组件中才有的数据
- 将子组件的数据`v-bind`绑到插槽上去即可
```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```
```html
<current-user>
  {{ user.firstName }}
</current-user>
```
- 可以使用`v-slot`定义名字
```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```



### 动态组件和异步组件
#### 动态组件
- `<component>`元素加上`is`特性来实现
```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```
currentTabComponent 可以包括
- 已注册组件的名字，或
- 一个组件的选项对象

#### 异步组件
- 组件在异步加载完成后再显示出来，一般需要配合webpack的懒加载来使用
```js
Vue.component('my-component',function(resolve){
    setTimeout(()=>{
        resolve({
            template:'<h1>hello</h1>'
        })
    },1000)
})
```
### 处理边界情况
#### 访问元素&组件
- 访问根实例`$root`,所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。可获得根组件的数据和方法等。
- 访问父级组件实例`$parent`，在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式。
- 访问子组件实例或子元素
  - 在 JavaScript 里直接访问一个子组件。通过 `ref` 特性为这个子组件赋予一个 ID 引用
  - 当 ref 和 v-for 一起使用的时候，得到的引用将会是一个包含了对应数据源的这些子组件的数组。
  ```html
  <base-input ref="usernameInput"></base-input>
  ```
  ```js
  this.$refs.usernameInput
  ```
- 依赖注入
  - provide 选项允许我们指定我们想要提供给后代组件的数据/方法。
  - 在任何后代组件里，可以使用 inject 选项来接收属性
  ```js
  provide: function () {
    return {
      getMap: this.getMap
    }
  }
  ```
  ```js
  inject: ['getMap']
  ```
#### 程序化的事件侦听器

- $on(eventName, eventHandler) 侦听一个事件
- $once(eventName, eventHandler) 一次性侦听一个事件
- $off(eventName, eventHandler) 停止侦听一个事件
#### 循环引用
- 递归组件
  - 必须设置name属性，全局组件会自动把ID设置为name
  - 递归组件容易无限循环，必须确保递归调用是由条件的（例如使用一个最终会得到false的v-if）
- 组件之间的循环引用
  - 例如文件目录树`<tree-folder>`和`<tree-folder-contents>`互相引用，会报错
  ```js
  <!-- 解决方法1：组件创建之前引用其中一个-->
  beforeCreate: function () {
    this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
  }
  <!-- 解决方法2：webpack的异步import -->
  components: {
    TreeFolderContents: () => import('./tree-folder-contents.vue')
  }
  ```
#### 模板定义的替代品
- 内联模板
`inline-template` 这个特殊的特性出现在一个子组件上时，这个组件将会使用其里面的内容作为模板
```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```
- X-Template
`<script>` 元素中，并为其带上 `text/x-template` 的类型，然后通过一个 id 将模板引用过去。
```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```
```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```
#### 控制更新
- 强制更新
`$forceUpdate`
- 通过 v-once 创建低开销的静态组件
组件包含了大量静态内容,可以在根元素上添加 v-once 特性以确保这些内容只计算一次然后缓存起来
```js
Vue.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```


## 过渡&动画
- 常见触发动画的操作 v-if v-show v-for 路由切换
  - css添加动画 animation transition（库：Animate.css）
  - js添加动画 自带的钩子（库：velocity）
- 动画分为单个动画和多个动画
### 进入/离开和列表过渡
#### 单元素/组件过渡
`transition`,给条件渲染 (使用 v-if)、条件展示 (使用 v-show)、动态组件、组件根节点添加进入/离开过渡
```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
<script>
  new Vue({
    el: '#demo',
    data: {
      show: true
    }
  })
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
```

- 过渡的类名
  - v-enter 过渡的开始状态
  - v-enter-active 过渡生效时的状态
  - v-enter-to 进入过渡的结束状态
  - v-leave
  - v-leave-active
  - v-leave-to
  :::tip
  v为默认前缀，可用name属性指定
  :::


- 自定义过渡的类名
  - enter-class
  - enter-active-class
  - enter-to-class (2.1.8+)
  - leave-class
  - leave-active-class
  - leave-to-class (2.1.8+)

- 过渡的持续时间
```html
<transition :duration="1000">...</transition>
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

- JavaScript 钩子
```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```
```js
// ...
methods: {
  // --------
  // 进入中
  // --------

  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // --------
  // 离开时
  // --------

  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

#### 初始渲染的过渡
- `appear` 特性还是 `v-on:appear` 钩子
```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

#### 多个元素的过渡
```html
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>Sorry, no items found.</p>
</transition>
```
```html
<transition>
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>
```
```html
<transition>
  <button v-bind:key="isEditing">
    {{ isEditing ? 'Save' : 'Edit' }}
  </button>
</transition>
```
```html
<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>
```
```js
// ...
computed: {
  buttonMessage: function () {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```
- 过渡模式
  - in-out：新元素先进行过渡，完成之后当前元素过渡离开。

  - out-in：当前元素先进行过渡，完成之后新元素过渡进入。
#### 多个组件的过渡
- 使用动态组件即可
```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```
```js
new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})
```
```css
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
```


#### 列表过渡
- 概念
  - 同时渲染整个列表（比如使用v-for）,使用`<transition-group>`
  - 会以一个真实的元素呈现，默认span，可以通过tag修改
  - CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。
- 列表的进入/离开过渡
```html
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```
```js
new Vue({
  el: '#list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  }
})
```
```css
/* 当添加和移除元素的时候，周围的元素会瞬间移动到他们的新布局的位置，而不是平滑的过渡 */
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
```

- 列表的排序过渡
  - move实现平滑过渡
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>

  <div id="flip-list-demo" class="demo">
    <button v-on:click="shuffle">Shuffle</button>
    <transition-group name="flip-list" tag="ul">
      <li v-for="item in items" v-bind:key="item">
        {{ item }}
      </li>
    </transition-group>
  </div>
  ```
  ```js
  new Vue({
    el: '#flip-list-demo',
    data: {
      items: [1,2,3,4,5,6,7,8,9]
    },
    methods: {
      shuffle: function () {
        this.items = _.shuffle(this.items)
      }
    }
  })
  ```
  ```css
  .flip-list-move {
    transition: transform 1s;
  }
  ```
- 列表的交错过渡
  - 通过 data 属性与 JavaScript 通信 ，实现列表的交错过渡


#### 可复用的过渡
- 将 `<transition>` 或者 `<transition-group>` 作为根组件，然后将任何子组件放置在其中
```js
Vue.component('my-special-transition', {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'very-special-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function (el) {
          // ...
        },
        afterEnter: function (el) {
          // ...
        }
      }
    }
    return createElement('transition', data, context.children)
  }
})
```
#### 动态过渡

### 状态过渡
数字和运算、颜色的显示、SVG 节点的位置、元素的大小和其他的属性

## 可复用性&组合
### 混入
混入对象的选项将被“混合”进入该组件本身的选项。
```js
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```
- 选项合并
   - 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
   - 混入对象的钩子将在组件自身钩子之前调用。
   - Vue.extend() 也使用同样的策略进行合并。
:::tip
- 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```
:::
- 全局混入
```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```
- 自定义选项合并策略

<mark-check id="directive"></mark-check>
### 自定义指令(directive)
- <highlight-box>有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。</highlight-box>
  - 指令函数中的this是window，所以不能用this

```js
// 当页面加载时，该元素将获得焦点 (注意：autofocus 在移动版 Safari 上不工作)。注册一个自定义指令 `v-focus`
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 使用
<input v-focus>
```
<mark-check id="gouzifunction"></mark-check>
- 钩子函数(均为可选)：

  - <highlight-box>bind</highlight-box>：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

  - <highlight-box>inserted</highlight-box>：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

  - <highlight-box>update</highlight-box>：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 。

  - <highlight-box>componentUpdated</highlight-box>：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

  - <highlight-box>unbind</highlight-box>：只调用一次，指令与元素解绑时调用。

<mark-check id="gouzifunctionarguments"></mark-check>
- 钩子函数参数
  - <highlight-box>el</highlight-box>：指令所绑定的元素，可以用来直接操作 DOM 。
  - <highlight-box>binding</highlight-box>：参数是一个对象，包含以下属性：
      - <highlight-box>name</highlight-box>：指令名，不包括 v- 前缀。
      - <highlight-box>rawName</highlight-box>: 指令名及参数，包括 v- 前缀和参数
      - <highlight-box>value</highlight-box>：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
      - <highlight-box>oldValue</highlight-box>：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
      - <highlight-box>expression</highlight-box>：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
      - <highlight-box>arg</highlight-box>：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
      - <highlight-box>modifiers</highlight-box>：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
  - <highlight-box>vnode</highlight-box>：Vue 编译生成的虚拟节点。
    - context:当前指令所在的组件
  - <highlight-box>oldVnode</highlight-box>：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
  :::tip
  除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
  :::

<mark-check id="directivedemo"></mark-check>
- demo:自定义只取长度为三的字符串的指令且双向绑定的指令
```html
<div id="app">
    <!-- <input type="text" v-split.3.xxx="msg"> -->
</div>
<!-- <script>
    Vue.directive('split',{
        bind(el,binding,vnode){
            let ctx=vnode.context;//当前指令所在的组件
            let [,len]=binding.rawName.split('.');
            el.addEventListener('input',(e)=>{
                let val=e.target.value.slice(0,len);
                ctx[binding.expression]=val;
                el.value=val;
            })
            //赋予默认值
            el.value=ctx[binding.expression].value.slice(0,3);
        }
    });
    let vm=new Vue({
        el:'#app',
        data:{
            msg:'a'
        }
    })
</script> -->
```


### 渲染函数 & JSX
#### 使用render函数来创建DOM
- 虚拟 DOM
<mark-check id="createElement"></mark-check>
- <highlight-box>createElement</highlight-box>
  - <underline-box>返回一个VNode</underline-box>
  - 参数
    - <underline-box>HTML标签名</underline-box>、组件选项对象，或者resolve 了上述任何一种的一个 async 函数{String | Object | Function}
    - <underline-box>数据对象</underline-box>{Object}
    - <underline-box>子级VNode</underline-box> (VNodes){String | Array}
  
  ```js
  render: function (createElement) {
    createElement(
      'div',
      {},
      [
        '先写一些文字',
        createElement('h1', '一则头条'),
        createElement(MyComponent, {
          props: {
            someProp: 'foobar'
          }
        })
      ]
    )
  }
  ```
:::tip 返回的虚拟dom对象
```js
{
  tag:'div',
  props:{},
  children:[{
    tag:undefined,
    props:undefined,
    children:undefined,
    text:'hello'
  }]
}
<div>hello</div>
new Vue({
  render(h){
    return h('div',{},'hello')
  }
})
```

:::
- 数据对象

  ```js
  {
    // 与 `v-bind:class` 的 API 相同，
    // 接受一个字符串、对象或字符串和对象组成的数组
    'class': {
      foo: true,
      bar: false
    },
    // 与 `v-bind:style` 的 API 相同，
    // 接受一个字符串、对象，或对象组成的数组
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // 普通的 HTML 特性
    attrs: {
      id: 'foo'
    },
    // 组件 prop
    props: {
      myProp: 'bar'
    },
    // DOM 属性
    domProps: {
      innerHTML: 'baz'
    },
    // 事件监听器在 `on` 属性内，
    // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
    // 需要在处理函数中手动检查 keyCode。
    on: {
      click: this.clickHandler
    },
    // 仅用于组件，用于监听原生事件，而不是组件内部使用
    // `vm.$emit` 触发的事件。
    nativeOn: {
      click: this.nativeClickHandler
    },
    // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
    // 赋值，因为 Vue 已经自动为你进行了同步。
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    // 作用域插槽的格式为
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => createElement('span', props.text)
    },
    // 如果组件是其它组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    // 其它特殊顶层属性
    key: 'myKey',
    ref: 'myRef',
    // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
    // 那么 `$refs.myRef` 会变成一个数组。
    refInFor: true
  }
  ```
- 使用 JavaScript 代替模板功能
  - v-if 和 v-for
  - v-model需自己实现
  - 事件 & 按键修饰符
    - 使用前缀的
  
    | 修饰符                             | 前缀 |
    | :--------------------------------- | :--- |
    | `.passive`                         | `&`  |
    | `.capture`                         | `!`  |
    | `.once`                            | `~`  |
    | `.capture.once` 或 `.once.capture` | `~!` |
    ```js
    on: {
      '!click': this.doThisInCapturingMode,
      '~keyup': this.doThisOnce,
      '~!mouseover': this.doThisOnceInCapturingMode
    }
    ```
    - 直接使用事件方法的


    | 修饰符                                      | 处理函数中的等价操作                                                                                            |
    | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------- |
    | `.stop`                                     | `event.stopPropagation()`                                                                                       |
    | `.prevent`                                  | `event.preventDefault()`                                                                                        |
    | `.self`                                     | `if (event.target !== event.currentTarget) return`                                                              |
    | 按键： `.enter`, `.13`                      | `if (event.keyCode !== 13) return` (对于别的按键修饰符来说，可将 `13` 改为[另一个按键码](http://keycode.info/)) |
    | 修饰键： `.ctrl`, `.alt`, `.shift`, `.meta` | `if (!event.ctrlKey) return` (将 `ctrlKey` 分别修改为 `altKey`、`shiftKey` 或者 `metaKey`)                      |
  - 插槽
    - this.$slots 访问静态插槽的内容
    -  this.$scopedSlots 访问作用域插槽
    -  scopedSlots 字段向子组件中传递作用域插槽

<mark-check id="jsx"></mark-check>

#### JSX语法
使用一个 Babel 插件，用于在 Vue 中使用 JSX 语法
```js
import AnchoredHeading from './AnchoredHeading.vue'

new Vue({
  el: '#demo',
  render: function (h) {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})
```

::: warning
将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的。从 Vue 的 Babel 插件的 3.4.0 版本开始，自动注入 `const h = this.$createElement`，这样你就可以去掉 (h) 参数了。
:::


#### 函数式组件
- 组件是比较简单，没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法。实际上，它只是一个接受一些 prop 的函数。将组件标记为 functional，这意味它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)。
- 因为函数式组件只是函数，所以渲染开销也低很多。
```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```
- 单文件组件的函数式组件声明
```html
<template functional>
</template>
```
- 模板编译


- jsx和函数式组件案例
```js
// myTitle.js
export default {
  functional:true,// 有了函数属性，render函数里就有context参数
  methods:{
    say(){
      alert(1)
    }
  }
  render:function(h,context){
    let t='h'+context.props.type;

    return <t on-click={()=>context.say}>{{context.slots().default}}</t>
  }
}
```
```html
<!-- app.vue -->
<template>
  <div id="app">
    <MyTitle :type="5">hello</MyTitle>
  </div>
</template>
<script>
  import myTitle from './components/myTitle.js'
  export default {
    mounted(){
      console.log(this._info);
    },
    name:'app',
    components:{
      MyTitle
    }
  }
</script>
```
<mark-check id="dateComponent"></mark-check>
<mark-question></mark-question>
<absolute-box>clickOutside指令的包含和不包含没看懂</absolute-box>
- vue的日历组件
  - 注意点
    - 日历上点击时会自动让日历消失，用事件委托解决，把事件绑定在外层元素上面。
  ```js
  // App.vue
  <template>
    <div>
      <!-- :value="now" @input="val=>now=val" -->
      <!-- <DataPicker v-model="now"></DataPicker> -->
    </div>
  </template>

  <script>
  // import DataPicker from './date-picker';
    export default {
      components:{
        // DataPicker
      },
      data(){
        return {
          now:new Date()
        }
      }
    }
  </script>

  <style lang="scss" scoped>

  </style>
  ```

  ```vue

  // date-picker.vue
  <template>
    <div v-click-outside>
      <input type="text" :value="formatDate">
      <div class="pannel" v-if="isVisible">
        <div>
          <span>&lt;</span>
          <span @click="preMonth">&lt;&lt;</span>
          <span>{{time.year}}年</span>
          <span>{{time.month+1}}月</span>
          <span @click="nextMonth">&gt;&gt;</span>
          <span>&gt;</span>
        </div>
        <div class="pannel-content">
          <div class="days">
            <!-- 直接列出一个6*7一个列表  -->
            <span v-for="j in 7" :key="`_`+j" class="cell">{{weekDays[j-1]}}</span>
            <div v-for="i in 6" :key="i">
              <span 
                class="cell cell-days"
                @click="chooseDate(visibleDays[(i-1)*7+(j-1)])"
                :class="[
                  {notCurrentMonth:!isCurrentMonth(visibleDays[(i-1)*7+(j-1)])},
                  {today:isToday(visibleDays[(i-1)*7+(j-1)])},
                  {select:isSelect(visibleDays[(i-1)*7+(j-1)])}
                ]"
                v-for="j in 7" 
                :key="j"
              >
                {{visibleDays[(i-1)*7+(j-1)].getDate()}}
              </span>
            </div>
            
          </div>
        </div>
        <div class="pannel-footer">
          今天
        </div>
      </div>
    </div>
  </template>

  <script>
  import * as utils from './util'
    export default {
      directives:{
        // 指令的声明周期
        clickOutside:{
          bind(el,bindings,vnode){
            // 把事件绑定给document上 看一下点击的是否是当前这个元素内部
            let handler=(e)=>{
              if(el.contains(e.target)){
                // 判断一下是否当前面板已经显示出来了
                if(!vnode.context.isVisible){
                  vnode.context.focus();
                  console.log('包含');
                }
              }else{
                console.log('不包含');
                if(vnode.context.isVisible){
                  vnode.context.blur();
                }
              }
            };
            el.handler=handler;
            document.addEventListener('click',handler);
          },
          unbind(el){
            document.removeEventListener('click',el.handler)
          }
        }
      },
      data(){
        let {year,month}=utils.getYearMonthDay(this.value);
        return {
          weekDays:['日','一','二','三','四','五','六'],
          time:{year,month},
          isVisible:false// 面板是否课件
        }
      },
      props:{
        value:{
          type:Date,
          default:()=>new Date
        }
      },
      computed:{
        visibleDays(){
          // 先获取当前是周几
          let {year,month}=utils.getYearMonthDay(new Date(this.time.year,this.time.month,1));
          // 先生成一个当前月份第一天
          let currentFirstDay=utils.getDate(year,month,1)
          // 获取当前是周几，把天数往前移动几天
          let week=currentFirstDay.getDay();
          let startDay=currentFirstDay-week*60*60*1000*24;
          // 循环42天
          let arr=[];
          for(let i=0;i<42;i++){
            arr.push(new Date(startDay+i*60*60*1000*24))
          }
          return arr;
        },
        formatDate(){
          let {year,month,day}=utils.getYearMonthDay(this.value)
          return `${year}-${month+1}-${day}`
        }
      },
      methods:{
        focus(){
          this.isVisible=true;
        },
        blur(){
          this.isVisible=false;
        },
        isCurrentMonth(date){
          let {year,month}=utils.getYearMonthDay(utils.getDate(this.time.year,this.time.month));
          let {year:y,month:m}=utils.getYearMonthDay(date);
          return year===y&&month===m;
        },
        isToday(date){
          let {year,month,day}=utils.getYearMonthDay(new Date());
          let {year:y,month:m,day:d}=utils.getYearMonthDay(date);
          return year===y&&month===m&&day===d;
        },
        chooseDate(date){
          this.time=utils.getYearMonthDay(date);
          this.$emit('input',date);
          this.blur();// 关闭弹窗
        },
        isSelect(date){
          // 获取当前的年月日
          let {year,month,day}=utils.getYearMonthDay(this.value);
          let {year:y,month:m,day:d}=utils.getYearMonthDay(date);
          return year===y&&month===m&&day===d;
        },
        preMonth(){
          let d=utils.getDate(this.time.year,this.time.month,1);
          d.setMonth(d.getMonth()-1);
          this.time=utils.getYearMonthDay(d);

        },
        nextMonth(){
          let d=utils.getDate(this.time.year,this.time.month,1);
          d.setMonth(d.getMonth()+1);
          this.time=utils.getYearMonthDay(d);
        }
      }
    }
  </script>

  <style lang="stylus" scoped>
  .pannel
    width 32*7px;
    position absolute;
    background #fff;
    box-shadow 2px 2px 2px pink,-2px -2px 2px pink;
    .pannel-nav
      display flex;
      justify-content space-around;
      height 30px;
      span
        cursor pointer;
        user-select none;
    .pannel-content
      .cell
        display inline-flex;
        justify-content center;
        width 32px;
        height 32px;
        font-font-weight bold;
      .cell-days:hover,.select
        border 1px solid pink;
        box-sizing border-box;
    .pannel-footer
      height 30px
      text-align center
  .notCurrentMonth
    color gray
  .today
    background red;
    color #fff;
    border-radius 4px;
  </style>
  ```
  ```js
  // util.js
  const getYearMonthDay = (date) => {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      return { year, month, day };
  }
  const getDate = (year, month, day) => {
      return new Date(year, month, day);
  }

  export {
      getYearMonthDay,
      getDate
  }
  ```

- 插件的编写

```js
// App.vue
<template>
  <div>
    <button @click="showMessage">点我弹层</button>
  </div>
</template>

<script>

import Vue from 'vue';
import Message from './Message';// 第一种方式：export 
Vue.use(Message);// 第二种方式：export default 使用一个插件，内部需要提供一个install方法

export default {
  methods:{
    showMessage(){
      // 第二种方式
      this.$message.info({
        message:'我很帅',
        duration:3000
      })
      // 第一种方式
      // Message.info({
      //   message:'我很帅',
      //   duration:3000
      // })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
```
```vue
// Message.vue
<template>
  <div class="messages" v-if="messages.length">
    <div v-for="m in messages" :key="m.id">
      {{m.message}}
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        messages:[]
      }
    },
    mounted(){
      this.id=0;// 当前弹层的唯一标识
    },
    methods:{
      add(options){
        let id=this.id++;
        let layer={...options,id};
        this.messages.push(layer);// 每增加一个就向数组中存放一个
        layer.timer=setTimeout(()=>{// 时间到了，将自己移除
          this.remove(layer);
        },options.duration)
      },
      remove(layer){
        clearTimeout(layer.timer);
        this.messages=this.messages.filter(message=>message.id!==layer.id)
      }

    }
  }
</script>

<style lang="scss" scoped>

</style>
```
```js
// Message.js
import Vue from 'vue';
import MessageComponent from './Message.vue';
// 获取当前组件的实例
let getInstance = () => {
    let vm = new Vue({
        render: h => h(MessageComponent)
    }).$mount(); // 会在内存中进行挂载
    document.body.appendChild(vm.$el);

    let component = vm.$children[0];
    return {
        add(options) {
            component.add(options);
        }
    }
}

// 单例模式
let instance;
let getInst = () => {
    instance = instance || getInstance();
    return instance;
}
const Message = {
    info(options) {
        getInst().add(options);
    },
    warn() {

    },
    success() {

    },
    error() {

    }
}

export {
    Message
}
let _Vue;
export default { // 写插件的原理
    install(Vue) { // options选项代表use的第二个参数
        console.log(Vue)
        if (!_Vue) { // 防止用户多次use
            _Vue = Vue;
            let $message = {};
            Object.keys(Message).forEach(type => {
                $message[type] = Message[type];
            });
            Vue.prototype.$message = $message
        }
        // 在所有的组件中都增加了这个方法
        Vue.mixin({
            beforeCreate() {
                // Vue遍历组件特点：从父级到子级
                if (this.$options.info) {
                    this._info = this.$options.info;
                } else {
                    this._info = this.$parent && this.$parent._info;
                }
            },
        })
    }
}
```
```js
// main.js
import Vue from 'vue';
import App from './App.vue';

let info = { a: 1, b: 2 };

export default new Vue({
    el: "#app",
    info,
    render: h => h(App)
})
```
- 表单组件
- 扩展表格组件

<mark-check id="plugins"></mark-check>
### 插件
用来为Vue添加全局功能
- <highlight-box>添加全局方法或者属性</highlight-box>。如: vue-custom-element

- <highlight-box>添加全局资源</highlight-box>：指令/过滤器/过渡等。如 vue-touch

- 通过<highlight-box>全局混入</highlight-box>来添加一些组件选项。如 vue-router

- 添加<highlight-box> Vue 实例方法</highlight-box>，通过把它们添加到 Vue.prototype 上实现。

- <highlight-box>一个库，提供自己的 API，同时提供上面提到的一个或多个功能</highlight-box>。如 vue-router

<mark-check id="useplugins"></mark-check>
#### 使用插件
- 全局方法 <highlight-box>Vue.use() 使用插件</highlight-box>，需要在调用 new Vue() 启动应用之前完成
- 第一个参数是有install的对象，第二个参数是options，会传入成为install第二个参数
- Vue.use 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件
- `awesome-vue` 集合了大量由社区贡献的插件和库。

<mark-check id="developplugins"></mark-check>
#### 开发插件
- <highlight-box>暴露一个 install 方法。</highlight-box>
  - <highlight-box>第一个参数是 Vue 构造器</highlight-box>
  - <highlight-box>第二个参数是一个可选的选项对象</highlight-box>
<mark-question></mark-question>
<absolute-box>防止用户多次use没看懂</absolute-box>
```js
let _Vue;
MyPlugin.install = function (Vue, options) {
  // 防止用户多次use
  if(!_Vue){
    _Vue=Vue;
  }
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```
```js
Vue.mixin({
  beforeCreate(){
    // 在所有组件里都增加_info这个方法
    if(this.$options.info){
      this._info=this.$options.info
    }else{
      this._info=this.$parent&&this.$parent._info;
    }
  }
})
```

<mark-check id="filter"></mark-check>
### 过滤器(filter)
<!-- - `message | filterA` -->
- <highlight-box>可被用于一些常见的文本格式化</highlight-box>
- <highlight-box>可用在两个地方：双花括号插值和 v-bind 表达式</highlight-box>
- 可用computed替代(过滤器只改变数据的展示形式 不改变原数据)
- 过滤器函数中的this是window，所以不能用this
<!-- - 过滤器可以串联：`{{ message | filterA | filterB }}` -->
<mark-check id="filterdemo"></mark-check>
- demo:字符串前两个数字变大写

## vue-cli 3.0

### 创建项目
1. vue create xxx/vue ui(可视化)
vue create vue-router-apply

2. 选手动
default(babel,eslint)//默认配置(包括babel和eslint)
Manually select features//手动配置

3. 选配置
babel,CSS

4. 配置放独立文件

5. 进入项目文件夹
cd vue-router-apply
yarn serve

6. 可新建<highlight-box>vue.config.js</highlight-box>来重置webpack配置
//vue.config.js基于node,node不支持import语法

```js
//webpack配置
let path=require('path');
module.exports={
    //baseURL
    //默认环境变量 NODE_ENV production devlopment
    //打包后的结果带域名，开发中不带
    publicPath:process.env.NODE_ENV==='production'?'http://www.zhufeng.cn':'/',
    //assets打包成一个独立文件assets
    assetsDir:'asserts',
    //打包目录
    outputDir:'./my-dist',
    //使用模板方式 一般不使用 render改成template
    runtimeCompiler:true,
    //打包不再使用sourcemap
    productionSourceMap:false, 
    //修改webpack内部配置（获取webpack配置并给它添加自己的逻辑）
    chainWebpack:config=>{
        //给目录src配置了别名'+'，路径可以用+代替src
        config.resolve.alias.set('+',path.resolve(__dirname,'src'))
    },
    //新增其他webpack配置
    configureWebpack:{
        plugins:[],
        module:{}
    },
    //配置开发服务时使用
    devServer:{
        //代理解决跨域：8080 -> 自己的8080服务器 => 3000，服务访问服务是不受限的。
        //开发环境使用，生产环境前端+后台=>同一个服务器，就没有跨域问题了
        //一般情况下如果不是没有后端程序员不需要用代理，直接请求头复制一下。
        proxy:{
            //http://localhost:8080/getUser帮我代理到http://localhost:3000/getUser
            '/getUser':{
                target:"http://localhost:3000"
            }
        }
    },
    //第三方插件配置
    //可以使用三种方法配置插件：1. vue ui 安装插件 2. vue add style-resources-loader，相当于npm install @vue/cli-style-resource-loader 3. 在这儿配置
    pluginOptions:{
        //会给每个组件都引入这样一个样式文件
        'style-resources-loader':{
            preProcessor:'less',
            patterns:[
                path.resolve(__dirname,'src/assets/common.less')
            ]
        }
    }
}
```

```vue
<!-- HelloWorld.vue -->
<template>
  <div class="hello">
    123
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    //没写默认是`http://localhost:8080/getUser`
    axios.get('getUser').then(data=>{
      console.log(data)
    })
  }
}
</script>
```
- scope
限制当前css只在当前组件上使用

- lang
使用语言设置
less/

```vue
<style scoped lang="less">
@import '../assets/common.less';
.hello{
  color:@color
}
</style>
```

- less文件
```less
//common.less
@color:red;
```

### 打包
npm run build，出现dist目录
- vue 启动服务通过express，所以内置了express.

### defer & async /preload & prefetch

### 基于vue-cli编写组件---小球滚动组件

- 组件的id问题，`_uid`用于标识组件的每个实例
- 属性(校验 ,计算属性)
- 双向通信(props+emit / v-model / .sync),三种一种比一种简单,其中v-model用的最多
- 数据绑定($refs 拿到子组件的方法，来调用组件中的方法)
- 注意：子组件中的this.observer.define拦截，而this.timer不需要。直接赋值就行了。
- h5的requestAnimationFrame、cancelAnimationFrame代替setTimeout

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <!-- 第三种   :value.sync="xxx"=:xxx + this.$emit('update:xxx')-->
    <!-- pos5是pos4得语法糖 -->
    <ScrollBall color="red" :target="300" :value.sync="pos5" ref="ball5">红球</ScrollBall>
    <ScrollBall color="red" :value="pos4" :target="300" @update:value="value=>pos4=value">红球</ScrollBall>
    <!-- 第二种   v-model=:value+input -->
    <!-- pos3是pos1得语法糖 -->
    <ScrollBall color="red" v-model="pos3" :target="300">红球</ScrollBall>
    <ScrollBall color="red" :value="pos1" :target="300" @input='input'>红球</ScrollBall>
    <!-- 第一种   props+emit -->
    <ScrollBall color="blue" :value="pos2" :target="500">蓝球</ScrollBall>
    <button @click="getPosition">获取球1的位置</button>
    <button @click="stop">停</button>
  </div>
</template>

<script>
import ScrollBall from './components/ScrollBall'
export default {
  name: 'app',
  data(){
    return {
      pos1:50,
      pos2:100,
      pos3:60,
      pos4:200,
      pos5:190,
    }
  },
  components:{
    ScrollBall,
  },
  methods:{
    getPosition(){

    },
    input(value){
      this.pos1=value;
    },
    stop(){
      this.$refs.ball5.stop()
    }
  }
}
</script>

<style>
</style>
```

```vue
<!-- ScrollBall.vue -->
<template>
    <div class="ball" :style="style" :id="ballId">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'scroll-ball',
    props:{
        color:{
            type:String,
            default:'white'
        },
        value:{
            type:Number,
            default:0
        },
        target:{
            type:Number,
            default:300
        }
    },
    methods:{
        stop(){
            cancelAnimationFrame(this.timer)
        }
    },
    mounted(){
        //单向数据流 子组件通知父亲，当前自己的位置，父亲更新位置，再传递给子组件
        let ball=document.getElementById(this.ballId)
        let fn=()=>{
            let left=this.value;
            if(left>=this.target){
                return cancelAnimationFrame(this.timer)
            }
            this.$emit('input',left+2)
            this.$emit('update:value',left+2)
            ball.style.transform=`translate(${this.value}px)`;
            this.timer=requestAnimationFrame(fn)
        }
        //requestAnimationFrame根据浏览器刷新频率来设置，性能比setTimeout高一点
        this.timer=requestAnimationFrame(fn)
    },
    computed:{
        ballId(){
            //通过uid来区分组件的实例
            return `ball_`+this._uid
        },
        style(){
            return {background:this.color}
        }
    }
}
</script>


<style scoped lang="less">
    .ball{
        width:100px;
        height: 100px;
        border-radius: 50%;
        text-align: center;
        line-height: 100px;
        border: 1px solid red;
    }

</style>
```

## vue-router

### 安装
yarn add vue-router

### 路由的两种方式
- `#`哈希值
  
url加#xxx
- history(h5api)

history.pushState({},null,'/a')

问题：刷新时浏览器会找不到路径
- 两种模式对比
  - Hash 模式只可以更改 # 后面的内容，History 模式可以通过 API 设置任意的同源 URL
  - History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
  - Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候

### 路由配置文件
- 第三方插件 引入后要使用Vue.use() => install
- install注册了两个全局组件：
`router-link` 链接
`router-view` 路由视图
- install定义了两个变量：
`$router`,`this.$router`,包含方法
`$route`,`this.$route`,包含属性
- 导出路由配置

```js
//router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//默认导出
export default new VueRouter({
    //路由形式(默认hash，history)
    mode:'hash / history',
    //路由映射表(建议单独一个routes.js文件导出routes)
    routes,
})

```

```js
//routes.js
import Home from '_v/Home';
import Name from '_v/Name.vue';
import Version from '_v/Version.vue';

export default [
    //首页显示
    {
        path:'/',
        //重定向去首页(需要用path)
        redirect:{path:'/home'}
    },
    {
        path:'/home',
        name:'home',
        //一个路由多个组件
        components:{
            default:Home,
            name:Name,
            version:Version
        }
    },
    {
        path:'/login',
        name:'login',
        //组件懒加载(现在是页面进入所有组件都加载。希望点击时才加载组件,使用`懒加载`,但可能会导致白屏问题)
        component:()=>import('_v/Login.vue')
    },
    {
        path:'/profile',
        name:'profile',
        component:()=>import('_v/Profile.vue')
    },
    {
        path:'/user',
        name:'user',
        component:()=>import('_v/User.vue'),
        //子路由(//path'/'代表根目录，所以'/add'表示根目录下的add,'add'表示'/user/add')
        children:[
            //设置默认显示（使用时必须用路径跳转，不能使用name）
            {
                path:'',
                component:()=>import('_v/UserAdd')
            },
            {
                path:'add',
                name:'userAdd',
                component:()=>import('_v/UserAdd')
            },
            {
                path:'list',
                name:'userList',
                component:()=>import('_v/UserList')
            }
        ]
    },
    //路由都匹配不到的情况
    {
        path:'*',
        component:()=>import('_v/404')
    }
]
```

- 导入文件目录太繁琐应定义别名
```js
//vue.config.js
config.resolve.alias.set('_',path.resolve(__dirname,'src/components'))

config.resolve.alias.set('_v',path.resolve(__dirname,'src/views'))
```


### 在Vue实例中引用路由
```js
//main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,//在实例中引用路由
  render: h => h(App),
}).$mount('#app')

```

### 在Vue实例模板中显示路由视图
- 一个路由一个组件
```vue
<!-- App.vue -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  data(){
    return {}
  }
}
</script>
<style>
</style>

```
- 一个路由多个组件

```html
<div class="container">
  <router-view></router-view>
  <router-view name="name"></router-view>
  <router-view name="version"></router-view>
</div>
```



### 点击路由跳转(声明式路由跳转)
router-link
- to属性
  - to='home'
  - to='/home'
  - :to='{path:'/home'}'
  - :to='{name:'home'}'
  - to='/user/detail?id=1'
- tag属性
  - 链接无下划线
  - tag='span'

```html
<router-link to='/home'>首页</router-link>
<router-link to='login'>登录</router-link>
<router-link :to="{name:'profile'}">个人中心</router-link>
<router-link :to="{path:'/user'}">用户</router-link>

<!-- 传参1(问号传参/query传参) -->
<router-link to="/user/detail?id=1">用户详情</router-link>
<router-link :to="{ path: '/user/detail', query: { id: 1 }}">用户详情</router-link>
{{this.$route.query.id}}

<!-- 传参2(路径传参) -->
{
  path:'detail/:id',
  name:'userDetail,
  component:()=>import('_v/UserDetail.vue)
}
<router-link to="/user/detail/1">用户详情</router-link>
{{this.$route.params.id}}

```
- bootstrap
yarn add bootstrap3
```js
//main.js中全局引用
import 'bootstrap/dist/css/bootstrap.css'
```
### 编程式路由跳转
```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
{{this.$route.params.userId}}

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
{{this.$route.query.plan}}
```

### 路由钩子函数
例如：离开一个组件前即一个组件销毁前提示是否离开。
- 参数next：继续函数`next()` `next(path)`,可选择去的路由。
#### 组件中的路由钩子
- beforeRouteLeave
- beforeRouterEnter
- beforeRouterUpdate
```js
//login.vue
export default {
  //离开钩子(离开组建，组件销毁时)
  beforeRouteLeave (to, from, next) {
    if(this.username){
        let confirm=window.confirm('你需要切换吗')
        if(confirm){
            next()
        }
    }else{
        next()
    }
  }
  //进入之前钩子
  beforeRouterEnter(to, from, next){
    //此方法中不能拿到this
    if(from.name==='userAdd'){
        console.log('是这里过来的')
    }
    next(vm=>{
        //组件渲染完成后会回调，可以在这里拿到当前实例
        console.og(vm);
    })
  },
  //当前路由更新钩子(相当于监控$route,一般与mount配合使用，当属性变化时，并没有重新加载组件，但会触发这个)
  beforeRouterUpdate(to, from, next){
      next();
  },
  watch:{
      $route(){
          alert(1)
      }
  }
}


```

#### 路由配置中的路由钩子(在组件之前触发)
- beforeEnter
```js
//routes.js
{
    path:'/profile',
    name:'profile',
    component:()=>import('_v/Profile.vue'),
    beforeEnter:(to,from,next){
      next()
    }
},
```

#### 全局路由钩子(在组件，路由配置之前，对所有路由有效)
- router.beforeEach
- router.beforeResolve
```js
//main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

//进入当前路由之前触发
router.beforeEach((to,from,next)=>{
  next();
})
//当前路由解析后触发
router.beforeResolve((to,from,next)=>{
  next();
})
//当前路由进入完毕后触发
router.afterEach(()=>{

})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

#### 路由钩子总结
当组件切换时：
1. 离开钩子(组件beforeRouterLeave)
2. 进入新页面之前(全局beforeEach-->路由配置beforeEnter-->组件beforeRouterEnter)
3. 路由解析完成(全局beforeResolve)
4. 页面进入完成(全局afterEach)
5. 属性变化，但没有重新加载组件(组件beforeRouteUpdate)
6. 组件渲染完成(组件beforeRouterEnter回调)

<mark-check id="vuerouterliucheng"></mark-check>
#### 【官网】完整的导航解析流程（背）
1. 导航被触发。
2. 在失活的组件里调用 beforeRouterLeave 离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。


#### 登录拦截设置session，cookie，未登录去登陆页
- 设置路由备注，在全局beforeEach中拦截
```js
//main.js
router.beforeEach((to,from,next)=>{
  if(to.path!=='/login'&&!store.user){
    let sessionUser=sessionStorage.getItem('user')&&JSON.parse(sessionStorage.getItem('user'));
    if(sessionUser){
      store.commit('user',sessionUser);
    }else{
      router.push('/login');
    }
  }
  next();
})
```

#### 设置空白页
```js
// router/index.js
{
  name: '登录',
  path: '/login',
  component: LoginPage,
  meta:{blankPage:true}
},
```
```js
// App.vue
<router-view v-if="$route.meta.blankPage" />
<el-container v-else style="height:100%;">
</el-container>
```

#### 路由面试考点
- 钩子函数
- $router方法 $route属性
  - $route.path当前路由
- meta备注
- redirect重定向


## vuex
组件之间的传值多且复杂，所以用它把数据统一存放起来
- 面试考点
![vuex图](https://vuex.vuejs.org/vuex.png)
- vue是单向数据流，组件变动不能驱动数据，而是数据变动驱动组件
- 组件驱动数据
  - 同步情况，调用mutation改数据
  - 异步情况，派发action，调用api，再在action里调用mutation改数据。
    - 好处：调用api逻辑不分散地放在组件里，而是独立出来，方便复用。
<mark-check id="vuex1"></mark-check>

| vue组件  |       vuex        |
| :------: | :---------------: |
|   data   |       state       |
| computed |      getters      |
| methods  | mutations/actions |
  

### 安装
yarn add vuex

### 新建store文件夹
- 新建src/store/state.js

- 新建src/store/getters.js

- 新建src/store/mutations.js

- 新建src/store/actions.js

- 新建src/store/index.js

### store配置
```js
//index.js
import Vue from 'vue';
import vuex from 'vuex'
import { mapState, mapMutations, mapActions } from "vuex";

import actions from './actions';
import mutations from './mutations';
import state from './state';
import getters from './getters'

import user from './mudules/user'
// Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（调用 Vue.use(Vuex)）
Vue.use(vuex);
// 注册到所有的vue实例中
Vue.prototype.$axios = axios;
Vue.prototype.$mapState = mapState;
Vue.prototype.$mapMutations = mapMutations;
Vue.prototype.$mapActions = mapActions;
export default new vuex.Store({
    //子模块
    modules:{
        user,
    },
    //严格模式(开发下使用，严格模式下不可以直接赋值修改状态)
    strict:process.env.NODE_ENV!=='production'
    actions,
    mutations,
    state,
    getters
})
```
```js
//state.js(公共数据)
export default {
    lesson:'珠峰培训',
}
```

- 新建 `/store/modules/user.js`
```js
//user.js(子模块数据)
export default {
    //命名空间，true
    namespaced:true,
    state:{
      userName:'姜文'
    },
    action:{
      change_user({commit},payload){
          setTimeout(()=>{
              commit('change_user',payload)
          },1000)
      }
    },
    mutations:{
      change_user(state,payload){
          state.userName=payload;
      }
    },
    getters:{
      getNewUserName(state){
          return '帅'+state.userName
      }
    }
}
```

### 在实例中引用store
```js
// main.js
import Vue from 'vue'
import App from './App.vue'

import store from './store/index'
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
```

### 数据获取和修改
- 如果页面中注入了store 每个实例上都会存在一个属性 `$store`
- 注意事项：
  - 如果子模块没有开启namespace,只有state需要通过模块.属性获取。如果开启了namespace，所有的都需要通过模块.属性获取
  - 异步需要从action绕一下
    - 好处：
    action里可以多次调用接口，action里可以调用其他action
  - 使用模块最好使用辅助函数
- 总结：
  <mark-check id="vuex2"></mark-check>
  - 同步修改状态 commit mapMutation
  - 异步修改状态 dispatch mapAction
  - 不要赋值修改状态，严格模式下不合法
#### 直接使用$store
```html
<!-- App.vue -->
<template>
  <div id="app">
    <!-- 获取数据公共 -->
    {{$store.state.lesson}}
    {{$store.getters.getNewName}}
    <!-- 获取数据子模块 -->
    {{$store.state.user.userName}}
    {{$store.getters.user.getNewName}}
  </div>
</template>
<script>
export default {
  name: 'app',
  methods:{
    change(){
      // 同步修改数据子模块
      this.$store.commit('user/change','jw')
      // 异步修改数据子模块
      this.$store.dispatch('user/change_user','jw')
    }
  }
}
</script>
<style>
</style>
```
#### 辅助函数
```html
<!-- App.vue -->
<template>
  <div id='app'>
    {{lesson}}
    {{userName}}
    {{u}}
    {{getNewName}}
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations} from 'vuex';
export default {
  name: 'app',
  computed:{
    // 获取数据公共
    ...mapState(['lesson','className']),
    ...mapGetters(['getNewName'])
    // 获取数据子模块
    ...mapState('user',['userName'])
    ...mapGetters('user',['getNewUserName'])

    //起别名:对象形式
    ...mapState('user',{u:(state)=>state.userName})
  },
  methods:{
    // 同步修改数据子模块
    ...mapMutations('user',['change_user']),
    change(){
      this['change_user']('jw')
    },
    // 异步修改数据子模块
    ...mapActions('user',['change_user']),
    this['change_user']('jw')
  }
}
</script>
```
- 模块引用可使用`createNamespaceHelpers`
```js
import {createNamespaceHelpers} from 'vuex';
let {mapState} = createNamespaceHelpers('user');
export default {
  name: 'app',
  computed:{
    ...mapState['userName']
  }
}
</script>
```
### vuex刷新失效



- 再获取
- 使用vuex中间件把数据存在本地
  - 最优方法-vuex安装插件vuex-persits
  ```js
  const persits=(store)=>{
    store.subscribe((mutation,state)=>{
      localStorage.setItem('vuex-state',JSON.stringify(state))
    })
  }
  // localStorage.getItem('vuex-item');
  // 替换掉store里的值
  // store.replaceState();
  export default new Vuex.Store({
    plugins:[
      persits
    ]
  })
  ```

### vuex原理
1. vuex文件导出install函数和store类。
2. 通过Vue.use(vuex)，执行install函数，install中通过vue.mixin混入把根组件上传递的store属性赋值给所有的子组件，同时在根组件的$store上赋值store。
3. 给this.state赋值，将options.state值放在Vue组件的data中赋给this.state，实现数据变化，视图更新。使用get state(){}类的属性访问器去掉访问state时中间多的一层
4. 优化封装迭代对象得forEach方法
5. new ModuleCollection(options)，执行register函数注册模块为树结构，递归调用register，让模块成为如下完整树结构，赋值给this._modules。
6. installModule(this, this.state, [], this._modules.root) 把模块树结构放到store上去。getter重新定义值为函数执行结果。mutation和action转成拥有state,payload,store等参数的函数，通过发布订阅模式把函数存在store.mutation和store.action上，然后等调用时调用。mutation函数中，mutation执行完后，循环执行_subscribe，加上参数。循环children，递归执行intallModule(store, rootState, path.concat(moduleName), module)
7. 依次执行插件的函数。插件函数中调用store.subscribe(fn),将fn放入_subscribe中，当mutation任一函数触发时所有订阅执行一遍。
:::tip
```js
let modules=
{
  _rawModule:a,
  _children:{
    b:{
      _rawModule:b,
      _children:{},
      state:xxx
    },
    c:{
      _rawModule:b,
      _children:{},
      state:xxx
    }
  },
  state:xxx
}
```
:::
```js
// vuex.js
let Vue;

class ModuleCollection {
    constructor(options) {
        this.register([], options); // 注册模块 将模块注册成树结构
    }
    register(path, rootModule) {
        let module = { // 将模块格式化
            _rawModule: rootModule,
            _children: {},
            state: rootModule.state
        }
        if (path.length == 0) {
            this.root = module; // 如果是根模块，将这个模块挂在根节点上
        } else {
            // 递归都用reduce方法  // 通过_children属性进行查找
            let parent = path.slice(0, -1).reduce((root, current) => {
                return root._children[current]
            }, this.root)
            parent._children[path[path.length - 1]] = module
        }

        // 看当前模块是否有modules
        if (rootModule.modules) { // 如果有modules 开始重新再次注册
            forEach(rootModule.modules, (moduleName, module) => {
                // [a,c]
                this.register(path.concat(moduleName), module)
            })
        }
    }
}

const forEach = (obj, cb) => {
    Object.keys(obj).forEach(key => {
        cb(key, obj[key]);
    })
}

const installModule = (store, rootState, path, rootModule) => {

    if (path.length > 0) {
        let parent = path.slice(0, -1).reduce((root, current) => {
            return root[current]
        }, rootState)

        // vue 不能再对象上增加不存在的属性 否则不会导致视图更新
        Vue.set(parent, path[path.length - 1], rootModule.state);

        // 实现了 查找挂载数据
    }

    // 以下代码都是在处理 模块中 getters actions mutation
    let getters = rootModule._rawModule.getters;
    if (getters) {
        forEach(getters, (getterName, fn) => {
            Object.defineProperty(store.getters, getterName, {
                get() {
                    // 让getter执行当自己的状态 传入
                    return fn(rootModule.state); // 让对应的函数执行
                }
            })
        })
    }
    let mutations = rootModule._rawModule.mutations;
    if (mutations) {
        forEach(mutations, (mutationName, fn) => {
            let mutations = store.mutations[mutationName] || [];
            mutations.push(payload => {
                fn(rootModule.state, payload);
                // 让所有的订阅依次执行
                store._subscribes.forEach(fn => fn({ type: mutationName, payload }, rootState));
            })
            store.mutations[mutationName] = mutations;
        })
    }
    let actions = rootModule._rawModule.actions;
    if (actions) {
        forEach(actions, (actionName, fn) => {
            let actions = store.actions[actionName] || [];
            actions.push(payload => {
                fn.call(store, store, payload);
            })
            store.actions[actionName] = actions;
        })
    }
    // 挂载儿子
    forEach(rootModule._children, (moduleName, module) => {
        installModule(store, rootState, path.concat(moduleName), module)
    })

}

class Store {
    constructor(options = {}) {
        // 将用户的状态放到了store中
        this.s = new Vue({ // 核心 定义了响应式变化 数据更新 更新视图
            data() {
                return { state: options.state }
            }
        });
        // let getters = options.getters;
        this.getters = {}
        this.mutations = {};
        this.actions = {};
        this._subscribes = [];
        this._modules = new ModuleCollection(options); // 把数据格式化成一个想要的树结构
        installModule(this, this.state, [], this._modules.root);

        options.plugins.forEach(plugin => plugin(this));
    }

    subscribe(fn) {
        this._subscribes.push(fn)
    }

    // 提交更改 会再当前的store上找到对应的函数执行
    commit = (mutationName, payload) => {
        this.mutations[mutationName].forEach(fn => fn(payload))
    }
    dispatch = (actionName, payload) => {
        this.actions[actionName](payload); // 源码里有一个变量 来控制是否是通过mutation来更新状态的
    }
    get state() { // 类的属性访问器
        return this.s.state
    }
}

const install = (_Vue) => {
    Vue = _Vue; // vue的构造函数
    // vue组件渲染的顺序
    Vue.mixin({
        beforeCreate() {
            // 没有将$store放在原型上（否则所有Vue实例都有了）
            // 需要拿到store，给每个组件都增加$store属性
            if (this.$options && this.$options.store) {
                //给根实例增加$store属性 
                this.$store = this.$options.store;
            } else {
                // 有可能单独创建了一个实例没有父亲，那就无法获取到store属性
                this.$store = this.$parent && this.$parent.$store;
            }
        },
    })
}

export default {
    // 给用户提供一个install方法，默认会被调用
    install,
    Store
}
```
```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 1. 使用这个插件install方法

const persits = (store) => {
    store.subscribe((mutation, state) => {
        localStorage.setItem('vuex-state', JSON.stringify(state))
    })
}
export default new Vuex.Store({ // 导出的是一个store的实例
    plugins: [
        persits
    ],
    modules: {
        a: {
            state: { a: 1 },
            modules: {
                c: {
                    state: { c: 1 },
                    mutations: {
                        // this.mutations[syncAdd]=[fn,fn]
                        syncAdd(state, payload) {
                            console.log('add')
                        }
                    }
                }
            }
        },
        b: {
            state: { b: 1 }
        }
    },
    state: { // 统一的状态管理
        age: 10
    },
    getters: {
        myAge(state) {
            return state.age + 18;
        }
    },
    mutations: {
        syncAdd(state, payload) {
            state.age += payload;
        },
        syncMinus(state, payload) {
            state.age -= payload;
        }
    }, // 可以更改状态
    actions: {
        asyncMinus({ commit }, payload) { // 异步获取完后 提交到mutation中
            setTimeout(() => {
                commit('syncMinus', payload);
            }, 1000)
        }
    } // 异步提交更改
})
```

```html
<template>
  <div id="app">
    珠峰的年龄是{{$store.state.age}}
    {{$store.getters.myAge}}
    <br>
    <button @click="add">按钮</button>
    <button @click="asyncMinus">异步减少</button>
    {{this.$store.getters.computedC}}
    {{this.$store.state.a.a}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  mounted(){
    console.log(this.$store._modules)
    // root
  },
  methods:{
    add(){
      this.$store.commit('syncAdd',10);
    },
    asyncMinus(){
      this.$store.dispatch('asyncMinus',5)
    }
  }
}
</script>

<style>
</style>
```
## SSR服务端渲染
- vue的问题
  - 因为首页的html只有一个id为app的div标签，所以SEO什么都搜不到
- 预渲染
  - 预渲染的原理
    - 先再本地跑一个无头浏览器运行代码，（爬虫的原理），会出来dom标签，把这个dom放到真实浏览器中。
  - vue的预渲染插件
    - 纯静态页面可以使用这种方式。自己生成好页面传到服务器。但动态数据的话不会更新数据

    ```js
    npm install prerender-spa-plugin
    const PrerenderSPAPlugin=require('prerender-spa-plugin')


    // webpack配置 会默认下载一个开发版的chrome 下载速度（taobao源）
    plugins:[
      new PrerenderSPAPlugin({
        // 渲染出的页面存放地址
        staticDir:path.join(__dirname,'dist'),
        // 需要预渲染html的页面
        routes:['/','/about',],
      })
    ]
    ```

- vue SSR 服务端渲染
  - 在服务端把vue的数据和模板直接渲染好，返回给浏览器。好处是可以拿到完整的数据。可解决vue白屏问题
  - 优点
    - 客户端渲染不利于SEO搜索引擎优化
    - 服务端渲染可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
    - SSR直接将HTML字符串传递给浏览器。大大加快了首屏加载时间
  - 缺点
    - SSR占用更多的CPU和内存资源
    - 一些常用的浏览器API可能无法正常使用
    - 在vue中只支持beforeCreate和created两个生命周期
  - 所以会把部分请求还是浏览器请求，放在mounted里，其他放在浏览器支持的两个里
```js
yarn init -y
yarn add express vue vue-server-renderer
```
- 安装模块
```js
yarn add webpack webpack-cli webpack-dev-server // webpack需要的
@babel-loader @babel/preset-env // 处理es6语法的
vue vue-template-compiler vue-loader // 处理编译vue的
vue-style-loader css-loader // 处理样式
html-webpack-plugin // 处理html
webpack-merge // 合并webpack配置 和configureWebpack一样的功能
```

## axios 获取数据
```js
// 简单api
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

// 定制config(只有url是必须得，类型默认GET)(一般使用这种方便统一配置)
axios.create([config])
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
axios#getUri([config])

// 发送请求配置
见官方文档

// 返回格式
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}

// 拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

```

<mark-check id="jwt"></mark-check>

## jwt 实现 权限 vuex+jwt 鉴权
```js
yarn add body-parser jsonwebtoken
```
- jwt(jsonwebtoken)
  - 通过token得方式鉴定用户是否登录
<mark-check id="jwtnode"></mark-check>

- node
```js
let jwt=require('jsonwebtoken');
// token加密
jwt.sign(
  {username:'admin'},
  secret,
  {
  expiresIn:20
})
// token验证
jwt.verify(token,secret,(err,decode)=>{
  if(err){
    return res.json({
      code:1,
      data:'token失效了'
    })
  }else{
    res.json({
      username:decode.username,
      code:0,
      token:jwt.sign(
        {username:'admin'},
        secret,
        {
        expiresIn:20
      })
    })
  }
})
```
<mark-check id="jwtjs"></mark-check>

- js
```js
let instance=axios.create();
// 拦截器
instance.interceptors.response.use((res)=>{
  return res.data
})
instance.interceptors.request.use((config)=>{
  // 添加服务端传来的token
  config.headers.Authorization=getLocal('token');
  return config
})
```

- demo
```js
// router.js
{
  path:'/',
  name:'home',
  component:Home
},{
  path:'/login',
  name:'login',
  component:()=>import('./views/Login.vue')
},{
  path:'/profile',
  name:'profile',
  component:()=>import('./views/Profile.vue'),
  meta:{
    needLogin:true
  }
},
```
```js
// App.vue
<div id="app">
  <Spin fix v-if="$store.state.isShowLoading">
    加载中...
  </Spin>
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/profile">Profile</router-link>
      <router-view></router-view>
  </div>
</div>
```
```js
// Login.vue
<template>
  <div class="login">
    <Input type="text" placeholder="请输入用户名" style="width:300px"/>
    <Button type="primary">登录</Button>
  </div>
</template>
```
```js
// Home.vue
<template>
  <div class="home">
    当前登录用户名{{$store.username}}
  </div>
</template>
<script>
import {getUser} from '../api/user.js'
export default {
  name:'home',
  components:{

  },
  async mounted(){
    let res=await getUser();
    console.log(res)
  }
}
</script>
```
```js
// server.js
let express=require('express');
let app=express();
let bodyParser=require('body-parser');
let jwt=require('jsonwebtoken');

// 跨域请求头设置
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","http://localhost:8080);
  res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUS");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");

  if(req.method.toLowerCase()==='options'){
    return res.end();
  }

  next();
})

// 中间件
app.use(bodyParser.json());
let secret='zfjg'
// cookie token（json web token json数据格式的密钥） 验证用户
app.post('/login',(req,res)=>{
  let {username}=req.body;
  if(username==='admin'){
    res.json({
      code:0,
      username:'admin',
      token:jwt.sign(
        // 数据
        {username:'admin'},
        // 密钥
        secret,
        {
        // 过期时间20s
        expiresIn:20
      })
    })
  }else{
    res.json({
      code:1,
      data:'用户名不存在'
    })
  }
})

app.get('/validate',(req,res)=>{
  let token=req.header.authorization;
  jwt.verify(token,secret,(err,decode)=>{
    // cookie和session因为是存储在服务器中，所以重启服务器后就无法识别
    // 而token不会有这种问题
    if(err){
      return res.json({
        code:1,
        data:'token失效了'
      })
    }else{
      // 淘宝登陆后30分钟不操作后自动退出
      res.json({
        username:decode.username,
        code:0,
        // 需要把token的时效延长
        token:jwt.sign(
          // 数据
          {username:'admin'},
          // 密钥
          secret,
          {
          // 过期时间20s
          expiresIn:20
        })
      })
    }
  })
})

app.listen(3000)
```
```js
// ajaxRequest.js
import axios from 'axios';
import store from '../store';
import {getLocal} from './local';
// 当第一次请求 显示loading 剩下的时候就不调用了
// 当都请求完毕后 隐藏loading
class AjaxRequest{
  constructor(){
    this.baseURL=process.env.NODE_ENV=='production'?'/':'http://localhost:3000';
    // 超时时间
    this.timeout=3000;
    // 每次的请求
    this.queue={};
  }
  // 合并配置项
  merge(options){
    return {...options,baseURL:this.baseURL,timeout:this.timeout}
  }
  setInterceptor(instance,url){
    // 响应拦截
    // 如果上一个promise返回了一个常量，会作为下一个promise的输入
    instance.interceptors.response.use((res)=>{
      // 每次请求成功后，都删除队列里的路径
      delete this.queue[url];
      if(Object.keys(this.queue).length===0){
        // loading控制
        store.commit('hideLoading');
      }
      // 更改返回的数据结构
      return res.data
    })
    // 请求拦截
    instance.interceptors.request.use((config)=>{
      // 更改请求头（token:请求头里加一个属性比如Authorization值为‘xxx’）
      config.headers.Authorization=getLocal('token');
      if(Object.keys(this.queue).length===0){
        // loading控制
        store.commit('showLoading');
      }
      this.queue[url]=url;
      return config
    })
  }
  request(options){
    let instance=axios.create();
    // 设置拦截器
    this.setInterceptor(instance,options.url);
    let config=this.merge(options);
    return instance(config);
  }
}
export default new AjaxRequest
```

```js
// api/user.js(专门写api的)
import axios from '../libs/ajaxRequest';
// 放置接口
export const getUser=()=>{
  return axios.request({
    url:'/user',
    method:'get'
  })
}

export const login=(username)=>{
  return axios.request({
    method:'post',
    url:'/login',
    data:{
      username
    }
  })
}

export const validate=()=>{
  return axios.request({
    method:'get',
    url:'/validate'
  })
}
```
```js
// login.vue
<template>
  <div class="login">
    <Input type="text" v-model="username" placeholder="请输入用户名">
    
    <Button type="primary" v-on:click="login()">登录</Button>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      username:''
    }
  },
  methods:{
    ...mapActions(['toLogin']),
    login(){
      this['toLogin'](this.username).then(data=>{
        this.$router.push('/');
      },err=>{
        this.$Message.error(err);
      });
    }
  }
}
getUser().then(data=>{

})
</script>
```
```js
// store.js
import {login,validate} from './api/user';
import {setLocal} from './libs/local';
state:{
  isShowLoading:false,
  username:''
},
mutations:{
  showLoading(state){
    state.isShowLoading=true;
  },
  hideLoading(state){
    state.isShowLoading=false;
  },
  setUser(state,username){
    state.username=username;
  }
},
// 存放着接口调用
actions:{
  async toLogin({commit},username){
    let res=await login(username);
    if(res.code===0){
      commit('setUser',res.username);
      // 将token保存到客户端上 每次请求时带上token,服务端校验token，如果token不正确或过期，未登录
      setLocal('token',res.token);
    }else{
      return Promise.reject(res.data);
    }
  },
  async validate({commit}){
    let res=await validate();
    if(res.code===0){
      commit('setUser',res.username);
      setLocal('token',res.token);
    }
    // 返回用户是否失效
    return res.code===0
  }
}

```
```js
// src/libs/local.js
export const setLocal=(key,value)=>{
  if(typeof value =='object'){
    value=JSON.stringify(value);
  }
  localStorage.setItem(key,value);
}

export const getLocal=(key)=>{
  return localStorage.getItem(key);
}
```
```js
// main.js
let whiteList=['/xxx']
router.beforeEach(async (to,from,next)=>{
  if(whiteList.includes(to.path)){
    next()
  }
  let isLogin=await store.dispatch('validate');
  let needLogin=to.matched.some(match=>match.meta.needLogin);
  if(needLogin){
    if(isLogin){
      next()
    }else{
      next('/login')
    }
  }else{
    if(isLogin&&to.name==='login'){
      next('/')
    }else{
      next();
    }
  }
})
```
- 为了更安全 可以服务端设置cookie的方式 并且 仅读，跨域的话cookie就会屏蔽掉
- jwt是把用户的信息存到客户端 每次客户端带token校验一下是否登陆过
- session和cookie是存到服务端。假如一个服务器起了多个进程，每个端口都登录了同一个用户，这样就会重复，所以一般存到数据库中。token不会有这个问题。更好的做集群，分布式。
## 动态引入图片
- 将图片作为模块加载进去，比如`images:[{src:require(‘./1.png')},{src:require(‘./2.png')}]`这样webpack就能将其解析。
## 报错
- No ESLint configuration found
npm install eslint --save-dev
./node_modules/.bin/eslint --init 初始化配置文件.eslintrc.js

## google调试工具
- vuetools
  ```html
  <!-- 根实例 -->
  <Root>
    <!-- App实例 -->
    <App></App>
  <Root>
  ```
## vue.http请求头加token
```js
Vue.http.interceptors.push((request, next) => {
    if(request.url.includes('Warning/Warning')){
      request.headers.set('auth', this.user.Token);
    }
    next()
  });
```

## less
lang="less"
```js
<style lang="scss">
</style>
```
- npm install sass-loader -D
-  npm install node-sass -D

## vue 组件库
### better-scroll
#### 介绍
```html
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
  <!-- you can put some other DOMs here, it won't affect the scrolling
</div>
```
- 自动在wrapper中的第一个节点即content上处理滚动，忽略其他元素
#### 安装
```js
npm install @better-scroll/core@next --save
```
#### 使用
- 基础滚动
  ```js
  import BScroll from '@better-scroll/core'
  let bs = new BScroll('.wrapper', {
  })
  ```
- 增强型滚动
  ```js
  import BScroll from '@better-scroll/core'
  import PullUp from '@better-scroll/pull-up'

  let bs = new BScroll('.wrapper', {
    pullUpLoad: true
  })
  ```
- 配置项
  - scrollY 默认true
  - scrollX 默认false
  - freeScroll 支持横向和纵向同时滚动
  - bounce 回弹动画
  - bounceTime 回弹动画时长
- API
  - 属性
  - 方法
    - bs.refresh() 
      - 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    - bs.on(type, fn, context)//事件名，回调函数，this指向
      - 监听当前实例上的钩子函数。如：scroll、scrollEnd 等。
  - 钩子（事件）
    - touchEnd
      - {Object} {x, y} 位置坐标
      - 鼠标/手指离开。
    ```js
    import BScroll from '@better-scroll/core'
    let scroll = new BScroll('.wrapper', {
      probeType: 3
    })
    function onScroll(pos) {
        console.log(`Now position is x: ${pos.x}, y: ${pos.y}`)
    }
    scroll.on('scroll', onScroll)
    ```
    :::warning
    better-scroll是目前比较好用的开源滚动库,提供很多灵活的api供我们开发各种实用的组件,文档地址(https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll),本次主要用到它提供的pullDownRefresh 和 pullUpLoad api 开启上拉加载和下拉刷新的功能,同时它还提供两个event用于发送请求,pullingUp会在一次上拉加载之后触发,pullingdown 会在一次下拉刷新之后触发,可以在这两个事件中请求数据.这里有一个坑就是,每次上拉或者下拉之后需要调用finishPullUp或finishPullDown来结束这些动作.另外better-scroll在ios系统上快速滚动可能会出现白屏的bug,而且当你滚动暂停的时候回出现抖动,这些可以通过修改配置项useTransition:false解决,better-scroll会开始以js帧动画来渲染滑动效果,以下是代码部分
    :::
### vue-awesome-swiper
轮播

### vue-lazyload
- 懒加载

### lodash
- npm i lodash
- 处理数组，字符串，对象等的工具库
- upperFirst 格式化变量名
- camelCase 格式化变量名
```js
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
```
### DOMPurify
- xss防御库

### 每个页面都想引用一个自己写的插件怎么引入，main里面不行


### vue-loader高版本需要webpack配置plugin

### 全局插件样式覆盖
- 组件样式覆盖
  - 添加去掉了模块化的style标签，模块化的css覆盖不了
```html
<style lang="scss">
  .product-slider{
    .swiper-container{
      box-sizing:border-box;
      padding:0 24px;
    }
  }
</style>
```
### vue serve
- 一个main.js加一个App.vue文件 使用`vue serve App.vue`即可预览vue文件
```JS
// main.js
import Vue from 'vue';
import App from './App.vue';
new Vue({
    el: '#app',
    render: h => h(App)
})
```
### 内置组件
#### keep-alive
- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- max - 数字。最多可以缓存多少组件实例。
- `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

当组件在 `<keep-alive>` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件。

## vue+typescript
- template和以前写法一致，script有变化
```ts
<script lang="ts">
import
</script>
```
### 引入Typescript
```js
// 安装vue的官方插件
npm i vue-class-component vue-property-decorator --save
// 安装其它插件
npm i ts-loader typescript tslint tslint-loader tslint-config-standard --save-dev
```
- vue-class-component：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件

- vue-property-decorator：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器

- ts-loader：TypeScript 为 Webpack 提供了 ts-loader，其实就是为了让webpack识别 .ts .tsx文件

- tslint-loader跟tslint：我想你也会在.ts .tsx文件 约束代码格式（作用等同于eslint）

- tslint-config-standard：tslint 配置 standard风格的约束

### 配置webpack
首先找到./build/webpack.base.conf.js

找到entry.app 将main.js 改成 main.ts, 顺便把项目文件中的main.js也改成main.ts, 里面内容保持不变
```js
entry: {
  app: './src/main.ts'
}
```
找到resolve.extensions 里面加上.ts 后缀 （是为了之后引入.ts的时候不写后缀）
```js
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      '@': resolve('src')
    }
  }
```
找到module.rules 添加webpack对.ts的解析
```js
module: {
  rules: [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
// 从这里复制下面的代码就可以了
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader'
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        appendTsSuffixTo: [/\.vue$/],
      }
    },
// 复制以上的
  }
}
```
是不是加完了，那现在来解释一下
- ts-loader 会检索当前目录下的 tsconfig.json 文件，根据里面定义的规则来解析.ts文件（就跟.babelrc的作用一样）
- tslint-loader 作用等同于 eslint-loader

### 添加tsconfig.json
```js
{
  // 编译选项
  "compilerOptions": {
    // 输出目录
    "outDir": "./output",
    // 是否包含可以用于 debug 的 sourceMap
    "sourceMap": true,
    // 以严格模式解析
    "strict": true,
    // 采用的模块系统
    "module": "esnext",
    // 如何处理模块
    "moduleResolution": "node",
    // 编译输出目标 ES 版本
    "target": "es5",
    // 允许从没有设置默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // 将每个文件作为单独的模块
    "isolatedModules": false,
    // 启用装饰器
    "experimentalDecorators": true,
    // 启用设计类型元数据（用于反射）
    "emitDecoratorMetadata": true,
    // 在表达式和声明上有隐含的any类型时报错
    "noImplicitAny": false,
    // 不是函数的所有返回路径都有返回值时报错。
    "noImplicitReturns": true,
    // 从 tslib 导入外部帮助库: 比如__extends，__rest等
    "importHelpers": true,
    // 编译过程中打印文件名
    "listFiles": true,
    // 移除注释
    "removeComments": true,
    "suppressImplicitAnyIndexErrors": true,
    // 允许编译javascript文件
    "allowJs": true,
    // 解析非相对模块名的基准目录
    "baseUrl": "./",
    // 指定特殊模块的路径
    "paths": {
      "jquery": [
        "node_modules/jquery/dist/jquery"
      ]
    },
    // 编译过程中需要引入的库文件的列表
    "lib": [
      "dom",
      "es2015",
      "es2015.promise"
    ]
  }
}
```




