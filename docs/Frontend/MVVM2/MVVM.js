// 订阅
class Dep {
    constructor() {
        // 存放所有的watcher
        this.subs = [];
    }

    // 订阅
    addSub(watcher) {
        this.subs.push(watcher);
    }

    // 发布
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}
// 观察者（把数据劫持和编译功能联系起来）
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 默认先存放一个老值
        this.oldValue = this.get();
    }

    get() {
        // 把自己放在this上
        Dep.target = this;
        // 把观察者和数据关联起来
        let value = CompileUtil.getVal(this.vm, this.expr);
        // 
        Dep.target = null;
        return value;
    }

    // 数据变化后，调用观察者的update方法
    update() {
        let newVal = CompileUtil.getVal(this.vm, this.expr);
        if (newVal !== this.oldValue) {
            this.cb(newVal);
        }
    }
}
// vm.$watch(vm,'school.name',(newVal)=>{

// })

// 实现数据劫持功能
class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        // 如果是对象，才观察
        if (data && typeof data == 'object') {
            // 如果是对象
            for (let key in data) {
                this.defineReactive(data, key, data[key]);
            }
        }
    }
    defineReactive(obj, key, value) {
        this.observer(value);
        // 给每个属性都加上发布订阅的功能
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            get() {
                // 创建watcher时，会取到对应的内容，并且把watcher放到了全局上
                Dep.target && dep.addSub(Dep.target);
                return value
            },
            set: (newVal) => {
                if (newVal !== value) {
                    this.observer(newVal)
                    value = newVal;
                    // 某个数据变了，只执行这个数据对应的watcher
                    dep.notify();
                }
            }
        })
    }
}

class Compiler {
    constructor(el, vm) {
        // 判断el属性是不是一个元素，如果不是元素就获取元素
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        // 把当前节点中的元素获取到放到内存中
        this.vm = vm;
        let fragment = this.node2fragment(this.el);
        // 把节点中的内容进行替换
        // 用数据编译模板
        this.compile(fragment);
        // 把内容塞到页面中

        this.el.appendChild(fragment)
    }

    isDirective(attrName) {
        return attrName.startsWith('v-')
    }

    // 编译元素
    compileElement(node) {
        let attributes = node.attributes;
        [...attributes].forEach(attr => {
            let { name, value: expr } = attr;
            // 判断是不是指令
            if (this.isDirective(name)) {
                let [, directive] = name.split('-');
                // 调用不同的指令来处理
                CompileUtil[directive](node, expr, this.vm);
            }
        })
    }

    // 编译文本
    compileText(node) {
        // 判断当前文本节点中的内容是否包含{{}}
        let content = node.textContent;
        if (/\{\{(.+?)\}\}/.test(content)) {
            CompileUtil['text'](node, content, this.vm);
        }
    }

    // 用来编译内存中的dom节点
    compile(node) {
        let childNodes = node.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                this.compileElement(child);
                // 如果是元素，需要把自己传进去，再去遍历子节点
                this.compile(child);
            } else {
                this.compileText(child);
            }
        })
    }

    // 把节点移动到内存中
    node2fragment(node) {
        // 创建一个文档碎片
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = node.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment
    }

    // 是不是元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
}
CompileUtil = {
    // 根据表达式取到对应的数据
    getVal(vm, expr) { // vm.$data 'school.name' [school,name]
        return expr.split('.').reduce((data, current) => {
            return data[current];
        }, vm.$data);
    },
    setVal(vm, expr, value) {
        expr.split('.').reduce((data, current, index, arr) => {
            if (arr.length - 1 === index) {
                return data[current] = value;
            }
            return data[current];
        }, vm.$data)
    },
    // 节点 表达式 当前实例
    model(node, expr, vm) {
        // 给输入框赋予value属性 node.value=xxx
        // 不能vm[school.name]
        let fn = this.updater['modelUpdater'];
        // 给v-model加一个观察者，如果数据更新，会触发重新赋值
        new Watcher(vm, expr, (newVal) => {
            fn(node, newVal);
        })
        node.addEventListener('input', (e) => {
            console.log(e);
            let value = e.target.value;
            this.setVal(vm, expr, value);
        })
        let value = this.getVal(vm, expr);
        fn(node, value);
    },
    html() {
        // node.innerHTML=xxx
    },
    getContentValue(vm, expr) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1]);
        })
    },
    text(node, expr, vm) { // expr => {{a}} {{b}} {{c}}
        let fn = this.updater['textUpdater'];
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            // 给表达式每个变量加一个观察者，如果数据更新，会触发重新赋值
            new Watcher(vm, args[1], (newVal) => {
                fn(node, this.getContentValue(vm, expr));
            })
            return this.getVal(vm, args[1]);
        });
        fn(node, content);
    },
    updater: {
        // 把数据插入到节点中
        modelUpdater(node, value) {
            node.value = value
        },
        htmlUpdater() {

        },
        textUpdater(node, value) {
            node.textContent = value;
        }
    }
}

// 基类
class Vue {
    constructor(options) {
        // this.$el $data $options
        this.$el = options.el;
        // 实现vm.xxx相当于vm.$data.xxx，拦截，代理
        this.$data = options.data;
        // 这个根元素 存在 编译模板
        if (this.$el) {

            // 把数据 全部转化成用Object.defineProperty来定义(循环每一项，转换)
            new Observer(this.$data);

            // 把数据获取操作 vm上的取值操作 都代理到vm.$data
            this.proxyVm(this.$data);
            console.log(this.$data);
            new Compiler(this.$el, this)
        }
    }
    proxyVm(data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                }
            })
        }
    }
}