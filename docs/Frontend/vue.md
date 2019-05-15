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
   ```html
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
### @绑定事件

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

#### 修饰符(可以连续修饰)

@keyup.按键名称/按键unicode码//只有按了该按键才响应

常用：.ctrl .esc .enter

```html
<input type="text" @keyup.enter="fn">
<input type="text" @keyup.esc="fn">
```
vue配置一个键盘code别名,需要按fn+f1

```js
Vue.config.keyCodes={
  'f1':112
}
```

### v-bind:或者:

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
```html
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

**组件的某个子元素触发父级方法（调用自己属性上的父级的方法），有三种方法。**


- this.$attrs //获取当前组件所有的属性
- this.$listeners //获取当前组件所有的绑定事件

1. @click="$listeners.click()"
2. @click="this.$emit('click')"
3. v-on="$listeners"

```js
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
`v-slot:` `#` `<slot>`
```
<template v-slot:hello>
  ...
</template>
或者
<template #:hello>
  ...
</template>
或者
<div class="wrap">
  <slot></slot>
</div>
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



##### $refs
获取所有引用
- ref名不能重复，重复会覆盖。但如果遇到循环，就会成数组形式
- 子组件给一个ref,父组件调用this.$refs.com.show传值，父组件调用子组件的方法
```
<div id="app">
    <template v-for="i in 3">
        <div ref="my">我的dom元素</div>
    </template>
    <my-component ref="com"></my-component>
</div>
<script>
    let vm=new Vue({
        el:'#app',
        mounted(){
            console.log(this.$refs.my)
            console.log(this.$refs.com.show)
        },
        components:{
            'myComponent':{
                methods:{
                    show(){
                        alert(1)
                    }
                },
                template:`<div>my-component</div>`
            }
        }
    })
</script>
```


##### 自定义指令(directive)
Vue自带指令：v-model v-html v-text {{}} v-cloak v-if/v-else v-show v-pre 有十几种
指令有全局和局部

- 自定义指令
默认函数形式
Vue.directive('xxx',function(el,bindings,vnode){
      ...  
});
相当于bind和update
Vue.directive('xxx',function(el,bindings,vnode){
      //只当数据更新时指令生效
      update(el,bindings,vnode){
          ...
      },
      //只当用户绑定时指令生效
      bind(el,bindings,vnode){
          ...
      } 
});

- 自定义只取长度为三的字符串的指令且双向绑定

```
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

- inserted
dom渲染完成后执行，相当于bind加了nextTick
```
Vue.directive('focus',{
    bind(el){
        //dom渲染出来后
        Vue.nextTick(()=>{
            //绑定事件
            el.focus()
        })
    }
    inserted(el){
        el.focus()
    }
})
```

- 指令和过滤器函数中的this是window，所以不能用this

##### 过滤器(filter)
- 只改变数据的展示形式 并不会改变原数据，可用computed替代
- 分为全局和局部过滤器
- 指令和过滤器函数中的this是window，所以不能用this
  
Vue.filter('xxx',function(value,len){
    ...
})

```
<div id="app">
    {{name | capitalize(2)}}
</div>
<script>
    Vue.filter('capitalize',function(value,len){
        return value.slice(0,len).toUpperCase()+value.slice(len);
    })
    let vm=new Vue({
        el:'#app',
        data:{
            flag:false,
            name:'zfjq'
        },
        filter(value,len){
            ...
        }
    })
</script>
```

### 异步组件
组件在异步加载完成后再显示出来，
一般需要配合webpack的懒加载来使用
```
Vue.component('my-component',function(resolve){
    setTimeout(()=>{
        resolve({
            template:'<h1>hello</h1>'
        })
    },1000)
})
```


### 使用.vue文件开发两种方法

- 安装vue-cli脚手架
npm install @vue/cli -g

- 安装service-global
npm install -g @vue/cli-service-global
```
vue serve App.vue
//http://localhost:8080/直接访问组件页面
```

### 递归组件

.vue文件组件
- 组件大写可辨认`MenuItem`
- 使用
  1. 定义组件
  2. 引用组件
  3. 注册组件
    

- 用于树结构，菜单等
- 组件中使用`name:'ReSub'`给自己命名,使用`<ReSub></ReSub>`可以调用自己，实现递归组件。
- 把共同的循环的部分抽离成组件，然后在组件中调用自己。

```
//App.vue
<template>
    <div id="app">
        <Menu>
            <template v-for="menu in menuList">
                <MenuItem 
                    :key="menu.title" 
                    v-if="!menu.children"
                >
                    {menu.title}
                </MenuItem>
                <!-- 把重复的部分抽离出去 -->
                <ReSubMenu :key="menu.title" v-else :data="menu.children"></ReSubMenu>
            </template>
        </Menu>
    </div>
</template>
<script>
//.vue可省略
import Menu from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import ReSubMenu from './ReSubMenu';
export default {
    data(){
        return {
            menuList:[
                {
                    title:'菜单1',
                    children:[
                        {
                            title:'菜单1-1',
                            children:[
                                {title:'菜单1-1-1'},
                                {title:'菜单1-1-2'},
                                {title:'菜单1-1-3'},
                            ]
                        },
                        {title:'菜单1-1'},
                        {title:'菜单1-1'},
                    ]
                },
                {
                    title:'菜单2'
                },
                {
                    title:'菜单3'
                }
            ]
        }
    },
    components:{
        Menu,MenuItem,SubMenu,ReSubMenu
    }
}
</script>
<style>
#app{
    color:red;
}
</style>
```

```
//Menu.vue

```

```
//MenuItem.vue
<template>
    <div>
        <li><slot></slot></li>
    </div>
</template>
<script>
export default {
    data(){
        return {msg:'hello'}
    }
}
</script>
<style>
</style>
```

```
//SubMenu.vue
<template>
    <div>
        <div class="title" @click="change">
            <slot name="title"></slot>
        </div>
        <div v-show="flag" class="sub">
            <slot name="title"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {flag:false}
    },
    methods:{
        change(){
            this.flag=!this.flag;
        }
    }
}
</script>
<style>
    .sub{
        padding-left:20px;
    }
</style>
```

```
//ReSubMenu.vue
<template>
    <SubMenu>
        <template #title>
            {{data.title}}
        </template>
        <template v-for="child in data.children">
            <MenuItem :key="child.title" v-if="!child.children">{{child.title}}</MenuItem>
            <ReSub :key="child.title" v-else :data="child"></ReSub>
        </template>
    </SubMenu>
</template>
<script>
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
export default {
    name:'ReSub',//可以使用递归组件
    props:{
        data:{
            type:Object,
            default:()=>({})
        },
    },
    components:{
        SubMenu,MenuItem
    }
}
</script>
<style>

</style>
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

```
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

```
//HelloWorld.vue
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

```
<style scoped lang="less">
@import '../assets/common.less';
.hello{
  color:@color
}
</style>
```

- less文件
```
//common.less
@color:red;
```

### 打包
npm run build，出现dist目录

### express
vue 启动服务通过express，所以内置了express.
```
//server.js
let express=require('express');

let app=express();

app.get('/getUser',(req,res)=>{
    res.json({name:'zfpx'});
})

app.listen(3000)
```

### defer & async /preload & prefetch



### 基于vue-cli编写组件---小球滚动组件

- 组件的id问题，`_uid`用于标识组件的每个实例
- 属性(校验 ,计算属性)
- 双向通信(props+emit / v-model / .sync),三种一种比一种简单,其中v-model用的最多
- 数据绑定($refs 拿到子组件的方法，来调用组件中的方法)
- 注意：子组件中的this.observer.define拦截，而this.timer不需要。直接赋值就行了。
- h5的requestAnimationFrame、cancelAnimationFrame代替setTimeout

```
//App.vue
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

```
//ScrollBall.vue
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
> #
url加#xxx
> history(h5api)
history.pushState({},null,'/a')
问题：刷新时浏览器会找不到路径

### 使用

#### 路由配置文件
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
- 


#### 在Vue实例中引用路由
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

#### 在Vue实例模板中显示路由视图
- //一个路由一个组件
```js
//App.vue
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
- //一个路由多个组件

```js
<div class="container">
  <router-view></router-view>
  <router-view name="name"></router-view>
  <router-view name="version"></router-view>
</div>
```



#### 点击路由跳转(声明式路由跳转)
router-link
- to属性
to='home'
to='/home'
:to='{path:'/home'}'
:to='{name:'home'}'
to='/user/detail?id=1'
- tag属性
链接无下划线
tag='span'
- 

```js
<router-link to='/home'>首页</router-link>
<router-link to='login'>登录</router-link>
<router-link :to="{name:'profile'}">个人中心</router-link>
<router-link :to="{path:'/user'}">用户</router-link>

//传参1(问号传参)
<router-link to="/user/detail?id=1">用户详情</router-link>
{{this.$route.query.id}}

//传参2(路径传参)
{
  path:'detail/:id',
  name:'userDetail,
  component:()=>import('_v/UserDetail.vue)
}
<router-link to="/user/detail/1">用户详情</router-link>
{{this.$route.params.id}}

```
> bootstrap
yarn add bootstrap3
```js
//main.js中全局引用
import 'bootstrap/dist/css/bootstrap.css'
```
#### 编程式路由跳转
this.$router.push(path)
```js
this.$router.push('/user/list')
```

#### 路由钩子函数
例如：离开一个组件前即一个组件销毁前提示是否离开。
- 参数next：继续函数`next()` `next(path)`,可选择去的路由。
1. 组件中的路由钩子
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

2. 路由配置中的路由钩子(在组件之前触发)
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

1. 全局路由钩子(在组件，路由配置之前，对所有路由有效)
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

##### 路由钩子总结
当组件切换时：
1. 离开钩子(组件beforeRouterLeave)
2. 进入新页面之前(全局beforeEach-->路由配置beforeEnter-->组件beforeRouterEnter)
3. 路由解析完成(全局beforeResolve)
4. 页面进入完成(全局afterEach)
5. 属性变化，但没有重新加载组件(组件beforeRouteUpdate)
6. 组件渲染完成(组件beforeRouterEnter回调)

##### 【官网】完整的导航解析流程（背）
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


##### 拦截登录
设置路由备注，在全局beforeEach中拦截
```js
//routes.js
{
    path:'/profile',
    name:'profile',
    component:()=>import('_v/Profile.vue'),
    //路由元信息(备注)
    meta:{needLogin:true}
},
```

```js
//main.js
router.beforeEach((to,from,next)=>{
  //是否需要登录
  let flag=to.matched.some(match=>match.meta&&match.meta.needLogin);
  //是否已登录
  let isLogin=localStorage.getItem('login');
  console.log(flag,isLogin)
  
  if(flag){//需要登录
    if(isLogin){
      next()
    }else{
      next('/login')
    }
  }else{//不需要登录
    next()
  }
  //是登陆页且已经登录
  if(to.name==='login'&&isLogin){
    next('/')
  }

})
```

##### 面试考点
- 钩子函数
- $router方法 $route属性
- meta备注
- redirect重定向


### vuex
组件之间的传值多且复杂，所以用它把数据统一存放起来

#### 面试考点
![vuex图](https://vuex.vuejs.org/vuex.png)

- vue是单向数据流，组件变动不能驱动数据，而是数据变动驱动组件
- 组件驱动数据
  同步情况，调用mutation改数据
  异步情况，派发action，调用api，再在action里调用mutation改数据。好处：调用api逻辑不分散地放在组件里，而是独立出来，方便复用。

  | vue组件 | vuex |
  | ------- | ------ |
  | data | state |
  | computed | getters |
  |  |  |

#### 安装
yarn add vuex

#### 新建
- 新建src/store/state.js

- 新建src/store/getters.js

- 新建src/store/mutations.js

- 新建src/store/actions.js

- 新建src/store/index.js

#### store配置
```js
//index.js
import Vue from 'vue';
import vuex from 'vuex'

import actions from './actions';
import mutations from './mutations';
import state from './state';
import getters from './getters'

import user from './mudules/user'

Vue.use(vuex);
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

- 公共数据
```js
//state.js
export default {
    lesson:'珠峰培训',
}
```

- 子模块数据
新建 /store/modules/user.js
```js
//user.js
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

#### 在实例中引用store

```
//main.js
import Vue from 'vue'
import App from './App.vue'

import store from './store/index'
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
```js

#### 使用数据

如果页面中注入了store 每个实例上都会存在一个属性 `$store`,
##### 直接使用$store
```js
//App.vue
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

##### 辅助函数

```js
//App.vue
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

- 如果子模块没有开启namespace,只有state需要通过模块.属性获取。如果开启了namespace，所有的都需要通过模块.属性获取

- 异步需要从action绕一下，好处：
action里可以多次调用接口，action里可以调用其他action

- 使用模块最好使用辅助函数

- 同步修改状态 commit mapMutation
- 异步修改状态 dispatch mapAction

- 不要赋值修改状态，严格模式下不合法

### jsonwebtoken(jwt)

### iview,axios


### express,jsonwebtoken(jwt),bodyparser











### axios 获取数据

### jwt 实现 权限 vuex+jwt 鉴权

### 报错
- No ESLint configuration found
npm install eslint --save-dev
./node_modules/.bin/eslint --init 初始化配置文件.eslintrc.js

### google工具
- vuetools
  ```html
  <!-- 根实例 -->
  <Root>
    <!-- App实例 -->
    <App></App>
  <Root>
  ```
