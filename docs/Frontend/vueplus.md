
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




### 

### vue-router 钩子的用法


### vuex 模块的

### axios 获取数据

### jwt 实现 权限 vuex+jwt 鉴权

