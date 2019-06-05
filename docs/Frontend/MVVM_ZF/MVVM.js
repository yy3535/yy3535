// 观察者（发布订阅）
class Dep {
    constructor(){
        // 存放所有的watcher
        this.subs=[];
    }
    // 订阅
    addSub(watcher){
        this.subs.push(watcher);
    }
    // 发布
    notify(){
        this.subs.forEach(watcher=>watcher.update());
    }
}
class Watcher{
    constructor(vm,expr,cb){
        this.vm=vm;
        this.expr=expr;
        this.cb=cb;
        // 默认先存放老值
        this.oldValue=this.get();

    }
    get(){
        // 先把自己放在this上
        Dep.target=this;
        // 再把这个观察者和数据关联起来
        let value=CompileUtil.getVal(this.vm,this.expr);
        Dep.target=null;
        return value;
    }
    update(){
        let newVal=CompileUtil.getVal(this.vm,this.expr);
        if(newVal!==this.oldValue){
            this.cb(newVal);
        }
    }
}

// 数据劫持
class Observer {
    constructor(data){
        this.Observer(data);
    }
    observer(data){
        // 是对象才观察
        if(data&&typeof data=='object'){
            for(let key in data){
                this.defineReactive(data,key,data[key]);
            }
        }
    }
    defineReactive(obj,key,value){
        this.observer(value)
        // 给每一个属性都加上一个具有发布订阅的功能
        let dep=new Dep();
        Object.defineProperty(obj,key,{
            get(){
                // 创建watcher时，会取到对应的内容，并且把watcher放到了全局上
                Dep.target&&dep.addSub(Dep.target);
                return value;
            },
            set:(newVal)=>{
                if(newVal!=value){
                    this.observer(newVal);
                    value=newVal;
                    dep.notify();
                }
            }
        })
    }
}


// 编译模板
class Compiler{
    constructor(el,vm){
        // 是否是元素节点
        this.el=this.isElementNode(el)?el:document.querySelector(el);
        // 把节点移到内存中
        let fragment=this.node2fragment(this.el);

        // 把节点中的内容进行替换

        // 用数据编译模板
        this.compile(fragment);
        // 把编译好的内容塞回页面
    }
    compile(node){
        let childNodes=node.childNodes;
        [...childNodes].forEach(child=>{
            
            if(this.isElementNode(child)){
                // 元素节点
                this.compileElement(child)
                // 继续用数据编译元素节点的子节点
                this.compile(child)
            }else{
                // 文本节点
                this.compileText(child)
            }
        })
    }
    compileElement(node){
        let attributes=node.attributes;
        // 类数组转数组
        [...attributes].forEach(attr=>{
            let {name,value:expr}=attr;
            // 是否是指令
            if(this.isDirective(name)){
                let [,directive]=name.split('-');
                let [directiveName,eventName]=directive.split(':');
                CompileUtil[directiveName](node,expr,this.vm,eventName);
            }
        })
    }
    compileText(node){
        // 是否包含{{}}
        let content = node.textContent;
        // 找到所有文本
        if(/\{\{(.+?)\}\}/.test(content)){
            CompileUtil['text'](node,expr,vm);
        }

    }
    isDirective(attrName){
        return attrName.startWith('v-');
    }
    isElementNode(node){
        return node.nodeType===1;
    }
    
    node2fragment(node){
        let fragment=document.createDocumentFragment();
        let firstChild;
        while(firstChild=node.firstChild){
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
}
CompileUtil={
    getVal(vm,expr){
        let arr=expr.split('.');
        if(arr.length===0) return vm.$data[expr]
        return arr.reduce((data,current)=>{
            return data[current];
        },vm.$data)
    },
    setValue(vm,expr,value){
        return expr.split('.').reduce((data,current,index,arr)=>{
            if(index==arr.length-1){
                return data[current]=value;
            }
            return data[current];
        },vm.$data)
    },
    model(node,expr,vm){
        // node节点 expr表达式 vm当前实例
        // v-model的输入框赋值数据 node.value=xxx
        let fn=this.updater['modelUpdater']
        // 给输入框加一个观察者，如果稍后数据更新了会触发此方法，会拿新值给输入框赋值
        new Watcher(vm,expr,(newVal)=>{
            fn(node,newVal);
        })
        // 页面变化更新数据变化
        node.addEventListener('input',(e)=>{
            let value=e.target.value;
            this.setValue(vm,expr,value)
        })
        // 根据表达式取数据
        let value=this.getVal(vm,expr)
        fn(node,value)
    },
    html(node,expr,vm){
        // node节点 expr表达式 vm当前实例
        // v-model的输入框赋值数据 node.value=xxx
        let fn=this.updater['htmlUpdater']
        // 给输入框加一个观察者，如果稍后数据更新了会触发此方法，会拿新值给输入框赋值
        new Watcher(vm,expr,(newVal)=>{
            fn(node,newVal);
        })
        // 根据表达式取数据
        let value=this.getVal(vm,expr)
        fn(node,value)
    },
    getContentValue(vm,expr){
        // 遍历表达式，将内容重新替换成完整的内容，返回
        return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getVal(vm,args[1]);
        })
    },
    on(node,expr,vm,eventName){
        node.addEventListener(eventName,(e)=>{
            vm[expr].call(vm,e)
        })
    },
    text(node,expr,vm){
        let fn=this.updater['textUpdater'];
        let content=expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            // 给表达式每个人都加上观察者
            new Watcher(vm,args[1],()=>{
                // 返回一个全的字符串
                this.getContentValue(vm,expr);
            })
            return this.getVal(vm,args[1]);
        })
        fn(node,content);
    },
    updater:{
        htmlUpdater(node,value){
            node.innerHTML=value;
        },
        modelUpdater(){
            node.value=value;
        },
        htmlUpdater(){

        },
        textUpdater(node,value){
            node.textContent=value;
        }
    }
}

// 基类 调度
class Vue{
    constructor(options){
        // vue的$el,$data,$option实例方法
        this.$el=options.el;
        this.$data=options.data;
        let computed=options.computed;
        let methods=options.methods;
        if(this.$el){
            // 数据劫持（把数据全部转化成用Object.defineProperty来定义）
            new IntersectionObserver(this.$data);


            // computed实现
            for(let key in computed){
                Object.defineProperty(this.$data,key,{
                    get(){
                        return computed[key].call(this);
                    }
                })
            }

            // methods实现
            for(let key in methods){
                Object.defineProperty(this,key,{
                    get:()=>{
                        return methods[key]
                    }
                })
            }
            // 把数据获取操作 VM上的取值操作都代理到vm.$data
            this.proxyVm(this.$data);
            
            // 编译模板
            new Compiler(this.$el,this);
        }
    }
    // 实现了可以通过vm取到对应的值，直接拿值
    proxyVm(data){
        for(let key in data){
            Object.defineProperty(this,key,{
                get(){
                    // 进行了转化操作
                    return data[key];
                },
                // 设置代理方法
                set(newVal){
                    data[key]=newVal;
                }
            })
        }
    }
}