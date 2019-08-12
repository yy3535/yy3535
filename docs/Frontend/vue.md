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

  mvvm双向，model-view-viewmodel，数据变化可以驱动视图，vm就是viewmodel
- 声明式和命令式

  reduce不知道内部如何实现，是声明式

  for循环，命令计算机帮执行，叫做命令式

### vm=new Vue({})配置

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

### 什么样的数据会更新

1. 对象需要先声明存在，才能触发数据更新。

2. 数组需要改写，改写后length变化不能监听

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


3. 值设置为对象才有效，需要修改某个值，可以使用vm.$set(vm.info,'address','zf');
   
    vm.info.address='world'//无效 
    
    vm.info={address:'回龙观'}//有效，

### observer原理

```js
let obj={
    name:'jw',
    age:{
    	age:18
    }
}
//vue数据劫持 Object.defineProperty
function observer(obj){
  if(typeof obj=='object'){
    for(let key in obj){
      defineReactive(obj,key,obj[key]);
    }
  }
}
function defineReactive(obj,key,value){
	observer(value);//判断 value是不是对象，如果是对象，会继续监控
  Object.defineProperty(obj,key,{
    get(){
      return value
    },
    set(val){
      observer(val);//如果设置的值是对象 需要在进行这个对象的监控
      console.log('数据更新了')
      value=val;
    }
  })
}
observer(obj)
obj.age.age='zf'
```

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


## vue实例上的方法
### vm.$el 

   当前挂载的元素
### vm.$options 

   当前实例的参数
### vm.$nextTick(()=>{...})

   视图更新后再执行
   (vue数据变化后更新视图操作是异步执行的)
### vm.$watch('info.xxx',function(newValue,oldValue){...})

   数据变化后执行
   (多次更新只会触发一次)

### vm.$destroy 手动销毁组件

### vm.$on('click',change) 绑定事件

## template

### 取值表达式{{}}

   作用：
   - 运算
   - 取值
   - 三元

   **注：**
   - 其中的this都是指代vm实例，可省略
   - 取值时放对象，加空格即可 {{ {name:1} }}

## 指令
14个
### v-once,v-html
#### v-once 
只渲染一次，数据变化了也不更新视图
#### v-html 
渲染成dom元素

**注：**
v-html使用innerHTML,所以不要将用户输入的内容展现出来，内容必须为可信任
\<img src="x" onerror="alert()" /> 图片找不到会走onerror事件，就会弹出alert框
   
### v-if v-else
   - 必须是连一块的
   - 可使用template无意义标签来框起来

   **v-if和v-show的区别：**
   v-if控制dom有没有，v-show控制样式不显示，v-show不支持template

### v-for 

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


### v-model
#### input
   ```html
   <input type='text' :value="msg" @input="e=>{msg=e.target.value}"/>
   等价于  <!-- v-model 是 @input + :value 的一个语法糖-->
   <input type='text' v-model="msg"/>
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
//multiple，太丑一般不用

//radio
//根据v-model来分组
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
### v-on或@ 绑定事件

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

### v-bind或: 绑定属性

```html
<input type='text' :value="msg"/>
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
> computed和method的区别？
computed只有绑定的数据变了才会执行，method做绑定时所有数据变了都会执行

> computed和watch的区别？
- watch支持异步，可以实现一些简单的功能，一般会先考虑使用computed，不能再用watch

### computed实现双向绑定
```html
全选：<input type="checkbox" v-model="checkAll">
<input type="checkbox" v-for="(item,key) in checks" v-model="item.value" :key="key">
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

## 生命周期

初始化自己的生命周期，并且绑定自己的事件
- this.$data 
vm.data

### beforeCreate
实例尚未创建完成
初始化注入，和响应事件
```js
data:{
  a:1
},
beforeCreate(){
  console.log(this)//初始化自己的生命周期，事件方法 $on $emit
  console.log(this.$data)//undefined
}

```
### created
可以获取数据和调用方法
```js
created(){
  console.log(this.$el)//无法获取真实dom元素
  console.log(this.$data)//{a:1}
}
```

### beforeMount
渲染前，第一次调用渲染函数执行，可以拿到data,method等
如果有template会把它渲染成render函数

### mounted（重要）
渲染后，可获取真实dom，一般ajax请求放在这儿。
```js
mounted(){
  // ajax请求到数据后使用nextTick,等待数据更新后再打印
  this.$nextTick(()=>{
    // 数据更新后再打印dom内容
    console.log(this.$el.innerHTML);
  })
}
```

### beforeUpdate
更新前
```js
beforeUpdate(){
  console.log(this.$el.innerHTML);
}
```

### updated
一般不要操作数据，否则可能会死循环
更新后
```js
updated(){
  console.log(this.$el.innerHTML);
}
```

### beforeDestroy（重要）
销毁前（当前实例还可以用），一般会放销毁定时器等解绑操作
```js
beforeDestroy(){
  console.log(this.$el.innerHTML);
}
```

### destroyed
销毁后（实例上的方法，监听，事件绑定都被移除）
```js
destroyed(){
  console.log(this.$el.innerHTML);
}
```
> 什么情况会走destroy?
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
    - <script type="text/x-template">




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

为了让它正常工作，这个组件内的 <input> 必须：

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
- 使用 v-on 的 .native 修饰符,在一个组件的根元素上直接监听一个原生事件
```html
<base-input v-on:focus.native="onFocus"></base-input>
```

- 如果根元素上没有这个原生事件，父级的 .native 监听器将静默失败。
- 提供了一个 `$listeners` 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。
- `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。

#### .sync 修饰符
同步

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




- props emit | $attrs $listeners | $parent $children
1. prop和$emit
父组件向子组件传递通过prop,子组件向父组件传递通过$emit
2. $attrs和$listeners
Vue2.4开始提供$attrs和$listeners传递值
3. $parent,$children
4. $refs
获取实例
5. provider和inject
父组件通过provider提供变量，子组件通过inject来注入变量
6. eventBus
平级组件数据传递，可使用中央事件总线方式
7. vuex状态管理


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
### 自定义指令(directive)
- Vue自带指令：
`v-model`
`v-html`
`v-text`
`{{}}`
`v-cloak`
`v-if/v-else`
`v-show`
`v-pre`有十几种
- 自定义指令有全局和局部
- 分为默认函数形式和bind,update形式
- 指令函数中的this是window，所以不能用this
```js
// 局部指令
directives: {
  focus: {
    inserted: function (el) {
      el.focus()
    }
  }
}
```
```js
// 1. 默认函数形式
Vue.directive('xxx',function(el,bindings,vnode){
      ...  
});
// 2. bind和update形式
Vue.directive('xxx',function(el,bindings,vnode){
      // 数据更新时指令生效
      update(el,bindings,vnode){
          ...
      },
      // 用户绑定时指令生效
      bind(el,bindings,vnode){
          Vue.nextTick(()=>{
              //dom渲染出来后绑定事件
              el.focus()
          })
      },
      // dom渲染完成后执行，相当于bind加了nextTick
      inserted(el){
        el.focus()
      },
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
      componentUpdated(){

      },
      // 只调用一次，指令与元素解绑时调用。
      unbind(){

      }
});
```
- demo
```html
<!-- 自定义只取长度为三的字符串的指令且双向绑定的指令 -->
<div id="app">
    <input type="text" v-split.3.xxx="msg">
</div>
<script>
    Vue.directive('split',{
        bind(el,bindings,vnode){
            let ctx=vnode.context;//当前指令所在的组件
            let [,len]=bindings.rawName.split('.');
            el.addEventListener('input',(e)=>{
                let val=e.target.value.slice(0,len);
                ctx[bingdings.expression]=val;
                el.value=val;
            })
            //赋予默认值
            el.value=ctx[bingdings.expression].value.slice(0,3);
        }
    });
    let vm=new Vue({
        el:'#app',
        data:{
            msg:'a'
        }
    })
</script>
```


### 渲染函数 & JSX
- 使用render函数来创建DOM
- vue实例中，如果有了template，就放弃el，使用template
```js
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```
- 节点、树以及虚拟 DOM
  - 虚拟DOM
    - Vue 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 DOM
    ```JS
    <!-- `createElement`返回`createNodeDescription` -->
    return createElement('h1', this.blogTitle)
    ```
- createElement 参数
  
  ```javascript
  // @returns {VNode}
  createElement(
    // {String | Object | Function}
    // 一个 HTML 标签名、组件选项对象，或者
    // resolve 了上述任何一种的一个 async 函数。必填项。
    'div',

    // {Object}
    // 一个与模板中属性对应的数据对象。可选。
    {
      // (详情见下一节)
    },

    // {String | Array}
    // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
    // 也可以使用字符串来生成“文本虚拟节点”。可选。
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
  ```
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
- JSX
Vue 的 Babel 插件可实现支持JSX语法写render函数
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
:::warning
从 Vue 的 Babel 插件的 3.4.0 版本开始，自动注入 `const h = this.$createElement`
:::


- 函数式组件
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
```html
<template functional>
</template>
```
- 模板编译


- jsx和函数式组件案例
```js
// myTitle.js
export default {
  functional:true,
  render:function(h){
    return <div>

    </div>
  }
}
```
```html
<!-- app.vue -->
import myTitle from './components/myTitle.js'
```
:::tip
- 手写组件

- vue的树组件
- vue的日历组件
  - 日历上点击时会自动让日历消失，用事件委托解决，把事件绑定在外层元素上面。
- 表单组件
- 扩展表格组件
:::
### 插件
用来为Vue添加全局功能
- 添加全局方法或者属性。如: vue-custom-element

- 添加全局资源：指令/过滤器/过渡等。如 vue-touch

- 通过全局混入来添加一些组件选项。如 vue-router

- 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。

- 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router
#### 使用插件
- 全局方法 Vue.use() 使用插件，需要在调用 new Vue() 启动应用之前完成
- 第一个参数是有install的对象，第二个参数是options，会传入成为install第二个参数
- Vue.use 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件
- `awesome-vue` 集合了大量由社区贡献的插件和库。
#### 开发插件
- 暴露一个 install 方法。
  - 第一个参数是 Vue 构造器
  - 第二个参数是一个可选的选项对象
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
### 过滤器(filter)
- 可用computed替代(过滤器只改变数据的展示形式 不改变原数据)
- 分为全局和局部过滤器
- 过滤器函数中的this是window，所以不能用this
```html
<!-- 字符串前两个数字变大写 -->
<div id="app">
    {{name | capitalize(2)}}
</div>
<script>
    // 全局过滤器
    Vue.filter('capitalize',function(value,len){
        return value.slice(0,len).toUpperCase()+value.slice(len);
    })
    let vm=new Vue({
        el:'#app',
        data:{
            flag:false,
            name:'zfjq'
        },
        // 局部过滤器
        filter(value,len){
            ...
        }
    })
</script>
```


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

6. 可新建vue.config.js来重置webpack配置
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

```html
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

```html
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

```html
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

```html
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
```html
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

#### 【官网】完整的导航解析流程（背）
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
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


## vue源码

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


## jwt 实现 权限 vuex+jwt 鉴权

```js
// ajaxRequest.js
import axios from 'axios';
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
    
    instance.interceptors.request.use((config)=>{
      // 更改请求头
      config.headers.Authorization='xxx';
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
    this.setInterceptor(instance,options.url);
    let config=this.merge(options);
    return instance(config);
  }
}
export default new AjaxRequest

// api/user.js
import axios from '../libs/ajaxRequest';
// 放置接口
export const getUser=()=>{
  axios.request({
    url:'/user',
    method:'get'
  })
}

```
```js
// store.js
state:{
  isShowLoading:false
},
mutations:{
  showLoading(state){
    state.isShowLoading=true;
  },
  hideLoading(state){
    state.isShowLoading=false;
  }
},
actions:{

}
```

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
### vue-qr
- 二维码生成

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
