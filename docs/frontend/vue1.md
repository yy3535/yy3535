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
    <div :key="${i}_1">{{i}}</div>
    <div :key="${i}_2">{{i}}</div>
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
   <!--true/false-->
   <input type='checkbox' v-model="checkValue" value="是否喜欢"/>
   <!--多选-->
   <input type='checkbox' v-model="checkValues" value="游泳"/>
   <input type='checkbox' v-model="checkValues" value="健身"/>
   <input type='checkbox' v-model="checkValues" value="看书"/>
   {{checkValues}}
   ```

   

### @

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
     2. 默认有e事件参数，有传参时，保留$event参数作为事件参数 -->

### v-bind:或者:

   ```
   <input type='text' :value="msg"/>
   ```

   - 绑定属性

   