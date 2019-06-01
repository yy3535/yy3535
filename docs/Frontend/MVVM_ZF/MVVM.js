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
                CompileUtil[directive](node,expr,this.vm);
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
        return expr.split('.').reduce((data,current)=>{
            return data[current];
        },vm.$data)
    },
    model(node,expr,vm){
        // node节点 expr表达式 vm当前实例
        // v-model的输入框赋值数据 node.value=xxx
        let fn=this.updater['modelUpdater']
        // 根据表达式取数据
        let value=this.getVal(vm,expr)
        fn(node,value)
    },
    html(){
        // node.innerHTML=xxx
    },
    text(node,expr,vm){
        let fn=this.updater['textUpdater'];
        let content=expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getVal(vm,args[1]);
        })
        fn(node,content);
    },
    updater:{
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

        if(this.$el){
            // 编译模板
            new Compiler(this.$el,this);
        }
    }
}