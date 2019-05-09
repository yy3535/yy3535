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

```
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

   ```let arr=['push','slice','shift','unshift']
    arr.forEach(method=>{
      let oldPush=Array.prototype[method];
      Array.prototype[method]=function(value){
        console.log('数据更新了')
        oldPush.call(this,value)//别人身上的方法，想要使用到自己身上，就用call去调用
      }
    })
    obj.age.push(5)```
   ```


3. 值设置为对象才有效，需要修改某个值，可以使用vm.$set(vm.info,'address','zf');
   
    vm.info.address='world'//无效 
    
    vm.info={address:'回龙观'}//有效，

### observer原理

```
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

   ```
   //循环数组
   <div v-for="(fruit,index) in fruits" :key="index">{{fruit}}{{index}}</div>
   //循环对象
   <div v-for="(value,key) in fruits" :key="key">{{value}}{{key}}</div>
   ```

   - 循环谁就把它放在谁身上

   - vue2.5以上要求必须使用key属性

   - 可使用template无意义标签来框起来

  **注：**
  1. key只能加在循环的元素上，不能加在template上，应该加在内部循环的元素上
    
    ```
    <template v-for="i in 3">
    <div :key="${i}_1"></div>
    <div :key="${i}_2"></div>
    </template>
    ```
  2. key也可以用来区分元素

    ```
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
   ```
   <input type='text' :value="msg" @input="e=>{msg=e.target.value}"/>
   等价于  <!-- v-model 是 @input + :value 的一个语法糖-->
   <input type='text' v-model="msg"/>
   ```

#### select,radio和checkbox
   ```
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
```
  <input type="text" v-model.number="val">{{typeof val}}//只能数字
  <input type="text" v-model.trim="val">{{typeof val}}//清除空格
```
### @绑定事件

```
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

#### 修饰符(可以连续修饰)

@keyup.按键名称/按键unicode码//只有按了该按键才响应

常用：.ctrl .esc .enter

```
<input type="text" @keyup.enter="fn">
<input type="text" @keyup.esc="fn">
```
vue配置一个键盘code别名,需要按fn+f1

```
Vue.config.keyCodes={
  'f1':112
}
```

### v-bind:或者:

```
<input type='text' :value="msg"/>
```

- 绑定属性

> 动态绑定样式 
class
1. 等于对象
```
<div class="abc" :class="{b:true}">你好</div>
```
2. 等于数组
```
<div class="abc" :class="['a','b',c]">你好</div>//c为data中定义的
```
style
等于对象或者数组
```
<div style='color:red' :style="{background:'blue'}">
<div style='color:red' :style="[{background:'red',color:'blue'}]">
```

## computed
- methods getFullName()放取值表达式中会造成性能问题，每次其他数据更新都会重新执行这个方法
- computed也是通过Object.defineProperty来实现的，只有依赖的数据更新时才会执行（有缓存）
```
computed:{
  fullName(){
    return this.firstName+this.lastName;
  }
}
```

### watch实现computed
```
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
  //普通写法，需要mount来执行
  firstName(newValue){
    this.getFullName();
  },
  //其他写法
  firstName:{
    handler(newValue){
      this.getFullName();
    },
    //立即执行
    immediate:true
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
```
全选：<input type="checkbox" v-model="checkAll">
<input type="checkbox" v-for="(item,key) in checks" v-model="item.value" :key="key">
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
```

## 生命周期

初始化自己的生命周期，并且绑定自己的事件
- this.$data 
vm.data

### beforeCreate
实例尚未创建完成
初始化注入，和响应事件
```
data:{
  a:1
},
beforeCreate(){
  console.log(this)//undefined
  console.log(this.$data)//undefined
}

```
### created
可以获取数据和调用方法
```
create(){
  console.log(this)//存在
  console.log(this.$data)//{a:1}
}
```

### beforeMount
渲染前，第一次调用渲染函数执行，可以拿到data,method等


### mounted（重要）
渲染后，可获取真实dom，一般ajax请求放在这儿。
```
mounted(){
  console.log(this.$el.innerHTML);
}
```

### beforeUpdate
更新前
```
beforeUpdate(){
  console.log(this.$el.innerHTML);
}
```

### updated
一般不要操作数据，否则可能会死循环
更新后
```
updated(){
  console.log(this.$el.innerHTML);
}
```

### beforeDestroy（重要）
销毁前（当前实例还可以用），一般会放销毁定时器等解绑操作
```
beforeDestroy(){
  console.log(this.$el.innerHTML);
}
```

### destroyed
销毁后（实例上的方法，监听，事件绑定都被移除）
```
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
### 组件化开发的优点：
  - 一个页面分为几个组件开发，方便协作，方便维护，可复用

- 要采用闭合标签
- 为了每个组件的数据，互不影响，data采用函数
### 全局组件
```
<div id='app'>
  <my-button></my-button>
  <my-button></my-button>
  <my-button></my-button>
</div>
<script>
  //组件实际上就是个对象
  Vue.component('my-button',{
    template:`<button>{{msg}}</button>`,
    data(){
      return {
        msg:'点我啊'
      }
    }
  })
  //根实例，也是一个组件
  let vm=new Vue({
    el:'#app',
  })
</script>
```

### 局部组件
声明在某个组件之内
- 子组件在父组件的模板中使用
- 组件名定义时写大驼峰，使用时用`-`连接，因为html标签不能有大写字母
```
//父组件
<div id='app'>
  <my-button></my-button>
  <my-button></my-button>
  <my-button></my-button>
</div>
let vm = new Vue({
  el:"#app",
  //子组件
  components:{
    'MyButton':{
      data(){
        return {msg:'点我啊'}
      },
      template:`<button>{{}}</button>`
    }
  }
})
```

### 组件交互

prop
#### prop传值

- 简单传值
```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>

My journey with Vue
Blogging with Vue
Why Vue is so fun
```
- 传一个数组
```
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```

#### this.$attrs
没有使用的属性

#### prop大小写
当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名
```
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

#### prop类型
每个 prop 都有指定的值类型,可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型
```
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

#### 传递静态或动态 Prop
- 静态prop
```
<blog-post title="My journey with Vue"></blog-post>
```

- 动态prop
```
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post
  v-bind:title="post.title + ' by ' + post.author.name"
></blog-post>
```

##### 传入一个对象的所有属性
如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind
```
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```
下面的模板：
```
<blog-post v-bind="post"></blog-post>
```
等价于：
```
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

##### 禁用特性继承

```
Vue.component('my-component', {
  inheritAttrs: false,//没有用到的属性，不会显示在dom结构上了
  //
  template:`<div>my-button <my v-bind="$attrs"></my></div>`,
  components:{
    'my':{
      props:['a','b'],
      template:`<span>{{a}} {{b}}</span>`
    }
  }
})
```

```
let vm=new Vue({
  el:'#app',
  data:{
    content:'点我啊'
  },
  components:{
    'MyButton':{
      mounted(){
        //对没有使用的属性 把他保留在this.$attrs中
        console.log(this.$attrs)
      },
      inheritAttrs:false,//没有用到的数据，就不会显示在dom结构上了
      template:`<div>my-button <my v-bind="$attrs"></my></div>`,
      components:{
        'my':{
          props:['a','b'],
          template:`<span>{{a}}{{b}}</span>`
        }
      }
    }
  }
})
```

##### props
属性父级传子组件
```
<my-button :a="1" b="2" :arr="[1,2,3]"></my-button>
componets:{
  'MyButton':{
    props:{
      msg:{
        //类型，校验只会出错误，但不影响页面渲染
        type:String,
        //默认值
        default:'点我啊'
      },
      a:{
        type:Number
      },
      b:{
        type:String,
        //验证
        validator(value){
          return value>3
        }
      },
      arr:{
        type:Array,
        //属性校验中，如果是数组/对象，需要将默认值返回
        default:()=>([1,2])//箭头函数后面是括号表示[1,2]是个返回值
      }
    },
    template:`<button>{{msg}}{{a}}{{b}}</button>`
  }
}

```

##### 子组件触发父级的方法

**子组件触发父级的方法，给子组件最外层元素绑定。**
@click.native
```
<div id="app">
  <my-button @click.native="change"></my-button>
</div>
<script>
  let vm=new Vue({
    el:'#app',
    data:{
      content:'点我啊'
    },
    methods:{
      change(){
        alert(1);
      }
    }
    components:{
      'MyButton':{
        template:`<button>点我啊</button>`
      }
    }
  })
</script>
```

**组件的某个子元素触发父级方法，有三种方法。**

- this.$attrs //获取当前组件所有的属性
- this.$listeners //获取当前组件所有的绑定事件

1. @click="$listeners.click()"
2. @click="this.$emit('click')"
3. v-on="$listeners"

```
  <div id="app">
    <!--相当于 this.on('click',change)-->
    <my-button @click="change" @mouseup="change"></my-button>
  </div>
  template:`<div>
    //第一种
    <button @click=“$listeners.click()”>点我啊</button>
    //第二种
    <button @click="$emit('click')"></button>
    //第三种,所有事件全绑上去
    <button v-on="$listeners"></button>
  </div>`

```
> v-bind=$attrs 绑定所有的属性
> v-on=$listeners 绑定所有的方法

##### 总结：props emit | $attrs $listeners | $parent $children

##### $parent $children

- $parent
获取父组件的实例
- $children
获取所有的子组件

- slot插槽
name：
1. default
2. 自定义:hello
v-slot
\#
```
<template v-slot:hello>
  <>
</template>
或者
<template #:hello>
  <>
</template>
```


```
//手风琴效果组件
<div id="app">
  <collapse>
    <collapse-item title="react">内容1</collapse-item>
    <collapse-item title="vue">内容2</collapse-item>
    <collapse-item title="node">内容3</collapse-item>
  </collapse>
</div>
<script>
  Vue.component('Collapse',{
    methods:{
      cut(childId){
        this.$children.forEach(child=>{
          if(child._uid!==childId){
            child.show=false
          }
        })
      }
    },
    template:`<div class="wrap">
      <slot></slot>
    </div>`
  });
  Vue.component('CollapseItem',{
    props:['title'],
    data(){
      return {
        show:false
      }
      
    },
    methods:{
      change(){
        this.$parent.cut(this._uid);
        this.show=!this.show;
      }
    }
    template:`<div>
      <div class="title" @click="change">{{title}}</div>
      <div v-show="show">
        <slot></slot>
      </div>
    </div>`
  })
  let vm=new Vue({
    el:'#app'
  })
</script>
```

##### provide
在根组件上提供属性，所有的子组件都可以获取
可实现组件传值

```
<div id="app">
  <my></my>
</div>
Vue.component('my',{
  inject:['a'],
  template:"<div>{{a}}</div>"
})
let vm=new Vue({
  el:'#app',
  provide:{
    a:1
  },
  mounted(){
    console.log(this._uid)
  }
})
```




##### 总结：组件间通信
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

##### 异步组件

##### 递归组件
