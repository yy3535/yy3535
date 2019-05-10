
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

##### 过滤器

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






