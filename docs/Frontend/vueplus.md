
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
- 组件大写可辨认<MenuItem>
- 使用
  1. 定义组件
  2. 引用组件
  3. 注册组件
    

- 用于树结构，菜单等
- 

```
//App.vue
<template>
    <div id="app">
        <Menu>
            <MenuItem>菜单1</MenuItem>
            <MenuItem>菜单2</MenuItem>
            <MenuItem>菜单3</MenuItem>
            <SubMenu>
                <template #title>
                    菜单4
                </template>
                <MenuItem>菜单4-1</MenuItem>
                <MenuItem>菜单4-2</MenuItem>
            </SubMenu>
        </Menu>
    </div>
</template>
<script>
//.vue可省略
import Menu from './Menu.vue';
import Menu from './MenuItem';
import SubMenu from './SubMenu';
export default {
    data(){
        return {msg:'hello'}
    },
    components:{
        SubMenu,
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
<template>
    <div class="menu">
        <slot></slot>
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


### vue-cli写两个组件（cli配置）

### vue-router 钩子的用法


### vuex 模块的

### axios 获取数据

### jwt 实现 权限 vuex+jwt 鉴权

