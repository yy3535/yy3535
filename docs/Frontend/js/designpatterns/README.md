# 前端设计模式
[[toc]]

## 面对对象

   1. 把客观对象属性抽象成属性和操作，隐藏内部属性
   2. 把同一个类型的对象的属性和操作绑在一起，变成类
   3. 可实现继承和操作
      - 面对对象的分析 OOA
      - 面对对象的设计 OOD
      - 面对对象的变成 OOP

1. 类

   ```js
   class Animal{
     constructor(name){
       this.name=name;
     }
     eat(food){
       console.log(`${this.name} eat ${food}`)
     }
   }
   let dog=new Animal("狗");
   dog.eat("肉")
   ```

   

2. 继承

   父类公用方法

   ```js
   class Dog extends Animal{
     constructor(){
       super("狗")
     }
     speak(){
       console.log("汪汪汪")
     }
   }
   let dog=new Dog();
   dog.eat("肉");
   dog.speak();
   
   class Cat extends Animal{
     constructor(){
       super('猫');
     }
     speak(){
       console.log('喵喵喵')
     }
   }
   let cat=new Cat();
   cat.eat("鱼");
   cat.speak();
   ```

   

2. 封装

- 减少耦合，部分不让外部访问，管理接口权限
- 带_开头的都是私有的，业界约定，但es6语法尚不支持，typescript有这种特性

1. 安装

```
npm install -g typescript
```

2. 使用

```ts
//2.ts
function greeting(user:string){//类型限制
  return 'hello'+user;
}
let user='zfpx';
console.log(greeting(user));
let user=10;
console.log(greeting(user));//报错
```

编译成js

```
tsc 2.ts//会出来一个2.js
```

特点

- 类型限制，如上

- 封装

  public 类内和类外都可使用

  protected 可在类内和子类中使用

  private 只可在类内使用

  ```ts
  //2.ts
  class Person{
    public name:string;
    protected age:number;
    private money:number;
    constructor(name,age,money){
      this.name=name;
      this.age=age;
      this.money=money;
    }
  }
  class Student extends Person{
  	public num:number;
    constructor(name,age,money,num){
      super(name,age,money);
      this.num=num;
    }
    getName(){
      //在子类中可以访问父类的公有属性
      console.log(`我的名字叫${this.name}`)
    }
    getAge(){
      //在子类中可以访问父类的protected属性
      console.log(`我的名字叫${this.age}`)
    }
    getMoney(){
      console.log(`我的名字叫${this.money}`)//出错
    }
  }
  let s1=new Student('zfpx',10,100,1);
  //在其他类中可访问公有属性
  console.log(s1.name)//可访问
  console.log(s1.age)//报错
  console.log(s1.money)//报错，在类外
  ```

  

4. 多态

   同一个函数名接收不同参数(暂时无法实现，会报错)

   同一个函数名在子类中实现不同功能



## 设计原则

- 按什么标准来实现功能。
- 功能相同，有不同的设计方法。
- 需求不断变化，设计的作用就会体现出来。

五大设计原则

- 单一职责原则

  一个程序只做一件事，否则拆分

- 开放封闭原则

  对扩展开放，对修改封闭，不能改老代码

  ```js
  //request.js
  function checkStatus(response){
    if(response.code>=200&&response.code<300){
      return response;
    }else{
      throw new Error('响应结果不正确');
    }
  }
  function parseJSON(response){
    return response.json();
  }
  function request(url,options){
  /**
  *1.判断相应的状态码是不是2xx，如果不是的话也认为是错误
  *2.把相应体转化成JSON对象
  */
    fetch(url,options)
    	.then(checkStatus)
    	.then(parseJSON)
    	.then(checkCode)
  }
  ```

  

- 里氏替换原则

  - 子类的函数能覆盖父类同名函数

    ```js
    class Animal{
      eat(){
        
      }
    }
    class Cat{
      constructor(){
        super()
      }
      eat(){
        console.log("鱼")
      }
    }
    class Dog{
      constructor(){
        super()
      }
      eat(){
        console.log("骨头")
      }
    }
    ```

    

  - 父类能出现的地方，子类也能出现

    ```
    //应用场景
    //React 虚拟DOM,hello和h1都是子类，所以都能放
    React.render(<Hello/>);
    React.render(<h1/>)
    ```

  - js使用比较少

- 接口隔离原则

  - 保持接口独立，接口单一原则，JS中没有接口，使用较少，ts中有接口

    ```
    //4.ts
    interface Person{
      firstName:string
      lastName:string
    }
    interface Fly{
      swing:number;
    }
    function greeting(obj:Person){//加上类型检查会对传入的对象作检查，类型不对或者缺少会报错
      console.log(obj.firstName+obj.lastName)
    }
    let p={firstName:'张',lastName:'三'}
    greeting(p)
    ```

    

- 依赖反转原则

  - 依赖抽象而不依赖实现(尽量依赖父类而不依赖子类)，能依赖Person不依赖Women

    ```js
    class Person{
      constructor(){}
      buy(){}
    }
    class Man extends Person{
      constructor(gender){
        this.gender=gender;
      }
      buy(){
        console.log("买ipad")
      }
    }
    class Woman extends Person{
      constructor(gender){
        this.gender=gender;
      }
      buy(){
        console.log("买包")
      }
    }
    let p=new Person();
    let man=new Man('男');
    let women=new Woman('女');
    man.buy();
    woman.buy();
    ```

    

## 工厂模式

**UML**

标准建模语言，其中一个最重要的就是**类图**和**对象图**

**类图**

描述类的关系(依赖，泛华(继承))

![](/img/类图.png)



### 简单工厂模式

   +public 

   -private 

   箭头空三角 子类继承父类

   ![简单工厂模式](/img/简单工厂.png)

   ```js
   class Plant{
     constructor(name){
       this.name=name;
     }
     grow(){
       console.log('我正在生长~~~~')
     }
   class Apple extends Plant{
     constructor(name,flavour){
       super(name);
       this.flavour=flavour;
     }
   }
   class Orange extends Plant{
     constructor(name,flavour){
       super(name);
       this.flavour=flavour;
     }
   }
   new Apple();
   new Orange();
   ```

   直接new有什么缺点：

   1. 耦合(需要知道我要的类在哪里，得知道怎么做)
   2. 依赖具体实现(apple类永远不能修改删掉)

   简单工厂模式：(用一个类做一个端菜的服务员)

   ```js
   class Factory{
     static create(type){
       switch(type)
       	case 'apple':
       		return new Apple('苹果','甜');
       	case 'orange':
       		return new Orange('橘子’，酸');
       	default:
       		throw new Error('你要的东西没有');
     }
   }
   let apple=Factory.create('apple');
   console.log(apple.flavour);
   let orange=Factory.create('orange');
   console.log(orange.flavour);
   
   ```

   好处：

   1. （有一天橘子没有了，可以换成柠檬，但客户并不知道）隐藏实现，需求修改后只需要改更少的一部分
   2. 外部简单，内部灵活

   经典应用场景：

   1. jQuery

      ```js
      class jQuery{
        constructor(selector){
          let elements=Array.from(document.querySelectorAll(selector));
          let length=elements?elements.length:0;
          for(let i=0;i<length;i++){
            this[i]=elements[i];
          }
          this.length=length;
        }
        html(){}
      }
      window.$=function(selector){
        return new jQuery(selector)//调方法，返回一个jquery实例
      }
      ```

      

   2. react

      ```js
      //虚拟DOM
      let h1=<h1 className="title">hello</h1>;
      //babel编译后变成：let h1=React.createElement('h1',{className:'title'},'hello');
      //h1就是虚拟DOM
      class VNode{
        constructor(tagName,attrs,children){
          this.tagName=tagName;
          this.attrs=attrs;
          this.children=children;
        }
      }
      function createElement(tagName,attrs,children){
        return new VNode(tagName,attrs,children)//返回一个VNode实例，有一天VNode名字改了，外部依然是调用createElement
      }
      ```

      

### 工厂方法模式

核心工厂不再负责所有产品的创建，而是将具体创建交给子类去做

原因：

- 简单工厂模式不符合开闭原则(对修改关闭，对扩展开放，会改到老代码)

```js
//plant.js
class Plant{
  constructor(name){
    this.name=name;
  }
}
module.exports=Plant;
//apple.js
let Plant=require('./plant');
let Factory=require('./factory');
class Apple extends Plant{
  constructor(name,flavour){
    super(name);
    this.flavour=flavour;
  }
}
class AppleFactory extends Factory{
  static create(){
    return new Apple('苹果','甜');
  }
}
module.exports=AppleFactory;
//orange.js
let Plant=require('./plant');
let Factory=require('./factory');
class Orange extends Plant{
  constructor(name,flavour){
    super(name);
    this.flavour=flavour;
  }
}
class OrangeFactory extends Factory{
  static create(){
    return new Orange('桔子','酸');
  }
}
module.exports=OrangeFactory;
//factory.js
//工厂一般是接口，规定子类必须实现的方法
//依赖抽象而不依赖实现
class Factory{
  create(){}
}
module.exports=Factory;

//接口一般会跟配置对象配合
let settings={
  'apple':AppleFactory,
  'orange':OrangeFactory
}
let apple=settings['apple'].create();
let orange=settings['orange'].create();
```

> 什么是接口？
> 
接口只有方法定义，没有具体实现，如果一个类要实现该接口，就必须实现该接口中的所有方法



### 抽象工厂模式

![](/img/抽象工厂模式1.png)

![](/img/抽象工厂模式2.png)

```js
//1.method.js
class Factory{}
class AppleFactory extends Factory{
  createButton(){//创建按钮
  	return new AppleButton();
  }
  createIcon(){//创建图标
  	return new AppleIcon();
  }
}
class WindowsFactory extends Factory{
  createButton(){//创建按钮
  	return new WindowsButton();
  }
  createIcon(){//创建图标
  	return new WindowsIcon();
  }
}

class Icon{}
class AppleIcon{
  render(){
    console.log(`绘制苹果的图标`)
  }
}
class WindowsIcon{
  render(){
    console.log(`绘制Windows的图标`)
  }
}

class Button{}
class AppleButton{
  render(){
    console.log(`绘制苹果的按钮`)
  }
}
class WindowsButton{
  render(){
    console.log(`绘制windows的按钮`)
  }
}
let windowsFactory=new WindowsFactory();
windowsFactory.createIcon().render();
windowsFactory.createButton().render();
```

使用场景：工厂里有多种产品，而且生产过程都是一套一套的。

### 总结工厂模式

1. 简单工厂 

   一般就是一个函数返回产品的实例

2. 工厂方法模式

   多了工厂类，要想创建产品，需要先创建此工厂的实例，再通过这个工厂返回产品实例

3. 抽象工厂模式

   前两种只能创建一种产品，这种一个工厂可批量创建产品

> 实际工作中第一种用的最多，2、3种很少见到和用到。



## 单例模式

![](/img/单例模式.png)

```js
//es6的单例写法
class Window{
  constructor(name){
    this.name=name;
  }
  static getInstance(){
    if(!this.instance){
      this.instance=new Window();
    }
    return this.instance;
  }
}
//Window.getInstance()是类上的方法，只可以通过类来访问，不能通过实例来访问

//es5的单例写法
function Window(name){
  this.name=name;
}
Window.prototype.getName=function(){//这是实例可访问的方法
  return this.name;
}
Window.getInstance=(function(){//通过闭包实现只能通过Window.getInstance访问的方法
  let instance;
  return function(name){
    if(!instance){
      instance=new Window(name);
    }
    return instance;
  }
}){};
let w1=Window.getInstance();
let w2=Window.getInstance();
```

**两个问题**

1. 客户端 就是使用这个类的使用者必须知道这是一个单例的类，必须主动调用Instance方法

2. 并不能真正阻止客户端直接new Window

   ```
   let w3=new Window();
   let w4=new Window();
   ```

**解决问题**

能够直接new Window，并且是个单例的。

1. 透明单例：

```
let Window=(function(){
  let window;
  let Window=function(name){
    if(window){
      return window;
    }else{
      this.name=name;
      return (window=this);
    }
  }
  return Window;
})();
//new 关键字 创建一个对象，this指向这个对象，执行代码，返回this
let w1=new Window();
let w2=new Window();
console.log(w1===w2);
```

2. 单例改进

   透明单例违反了单一职责原则，应该把类的实例的创建逻辑和单例逻辑分开

   ```
   function Window(name){
     this.name=name;
   }
   Window.prototype.getName=function(){
     console.log(this.name);
   }
   let CreateWindow=(function(){
     let instance;
     return function(name){
       if(!instance){
         instance=new Window(name);
       }
       return instance;
     }
   })();
   let w1=new CreateSingle('zfpx1');//加不加new一样
   let w2=new CreateSingle('zfpx2');
   console.log(w1===w2)
   ```

3. 单例改进

   因为new Window(name)写死了，不能直接添加其他的构造函数的单例

   ```
   function Window(name){
     this.name=name;
   }
   Window.prototype.getName=function(){
     console.log(this.name);
   }
   function Dialog(title,content){
     this.title=title;
     this.content=content;
   }
   let CreateSingle=function(Constructor){
     let instance;
     return function(name){
       if(!instance){
       	Constructor.apply(this,arguments);//让Constructor执行时里面的this指向执行CreateSingle时new出来的对象
       	Object.setPrototypeOf(this,Constructor.prototype);
       	//这句是this.__proto__=Constructor.prototype的简写
       	//如果不添加这句，w1就无法访问到Window原型上的getName方法，因为this的原型指向Function.prototype,即原型继承
         instance=this;
         //或者省略以上改成一句instance=new Constructor(...arguments);也可以
       }
       return instance;
     }
   };
   let createWindow=CreateSingle(Window);
   let w1=createWindow('zfpx1');//无论是new还是直接调用，都会创建一个this指针
   let w2=createWindow('zfpx2');
   console.log(w1===w2)//true
   
   let createDialog=CreateSingle(Dialog);
   let w1=createDialog('zfpx1');
   let w2=createDialog('zfpx2');
   console.log(w1===w2)//true
   ```

4. 命名空间(单例的一种)

   能解决：

   - 变量名冲突
   - 复杂层次对象的可读性要求

   ```
   //例如：jquery并没有把变量都声明在window上，而是都挂在$对象 JQuery
   $.get()
   $.post()
   $.ajax()
   ```

   ```
   let $={};
   $.define=function(namespace,fn){
     let namespaces=namespace.split('.');
     let fnName=namespaces.pop();
     let current=$;
     for(let i=0;i<namespaces.length;i++){
       let namespace=namespaces[i]//dom
       if(!current[namespace]){
         current[namespace]={};//{dom:{}}
       }
       current=current[namespace];
     }
     current[fnName]=fn;
   }
   $.define('dom.class.addClass',function(){
     console.log('dom.class.addClass');
   });
   $.define('dom.attr',function(){
     console.log('dom.attr');
   })
   $.define('string.trim',function(){
     console.log('string.trim');
   })
   $.define('event.preventDefault',function(){
     console.log('event.preventDefault');
   })
   ```

   **应用场景**

   1. jQuery

      ```
      if(window.jQuery!=null){
        return window.jQuery;//一个页面只会有一个jquery实例
      }else{
        //init~~~~~~
      }
      ```

   2. 模态窗口

      ```
      <button id="show-btn">显示登录框</button>
      <button id="hide-btn">隐藏登录框</button>
      <script>
      	class Login{
          constructor(){
            this.element=document.createElement('div');
            this.element.innerHTML={
              `
              用户名 <input name="username"/>
              密码 <input name="password"/>
              <input type="submit" value="登录"/>
              `
            }
            this.element.style.cssText=`width:100px;height:100px;position:absolute;left:50%;top:50%;margin-top:-50px;margin-left:-50px; display:none;`
            document.body.appendChild(this.element);
          }
          show(){
            this.element.style.display='block';
          }
          hide(){
            this.element.style.display='none';
          }
          static getInstance(){
            if(!this.instance){
              this.instance=new Login();
            }
            return this.instance;
          }
      	}
      	document.getElementById("show-btn).addEventListener('click',function(){
          Login.getInstance.show();
      	})
      	document.getElementById("hide-btn).addEventListener('click',function(){
          Login.getInstance.hide();
      	})
      </script>
      ```

   3. Redux 整个应用只有一个仓库，整个仓库只有一个状态state

      ```
      function createStore(reducer){
        let state;
        let listeners=[];
        function subscribe(listener){
          listeners.push(listener);
        }
        function getState(){
          return state;
        }
        function dispatch(action){
          state=reducer(state,action);
        }
        return{
          getState,
          dispatch,
          subscribe
        }
      }
      let reducer=function(){}
      let store=createStore(reducer)
      ```

   4. 数据库连接池

      本地创建与服务器数据库连接，取出数据后销毁。

      连接池创建固定连接，省去创建和销毁的时间

   5. 缓存

      缓存是为了提高性能的

      ```
      let express=require('express');
      let bodyParser=require('body-parser');
      let fs=require('fs');
      let app=express();
      app.use(bodyParser.urlencoded({extended:true}))
      app.use(bodyParser.json())
      let cache={};//缓存
      //返回某个用户的详情
      app.get('/user/:id',function(){
        let id=req.params.id;
        let user=cache[id];
        if(uesr){
          res.json(user);
        }else{
          fs.readFile(`./users/${id}.json`,'utf8',function(err,data){
            let user=JSON.parse(data);
            cache[id]=user;
            res.json(user);
          })
        }
        
      })
      //写入某个用户详情
      app.get('/user',function(req,res){
        let user=req.body;//{id:1,name:'zfpx1',age:9}
        fs.writeFile(`./users/${user.id}.json`,JSON.stringify(user),function(err){
          res.json(user);
        })
      })
      app.listen(8080);
      ```

      

   6. LRU缓存

      用一个数组来存储数据，给每一个数据项标记一个访问时间戳

      每次插入新数据项的时候，先把数组中存在的数据项的时间戳自增，并将新数据项的时间戳设置为0并插入到数组中

      每次访问数组中的数据项的时候，将被访问的数据项的时间戳置为0

      当数组空间已满时，将时间戳最大的数据项淘汰

      ```
      class LRUCache{
        constructor(capacity){
          this.capacity=capacity;
          this.members=[];
        }
        put(key,value){
        	let oldestAge=-1;
        	let oldestIndex=-1;
          for(let i=0;i<this.member.length;i++){
            let member=this.members[i];
            if(member.age>oldestAge){
              oldestAge=member.age;
            	oldestIndex=i;
            }
            member.age++;
          }
          if(this.member.length>=this.capacity){
            this.members.splice(oldestIndex,1);
          }
          this.members.push({key,value,age:0})
        }
        get(key){
          for(let i=0;i<this.members.length;i++){
            let member=this.members[i];//{key,value,age}
            if(member.key===key){
              member.age=0;
              return member.value;
            }
          }
          return -1;
        }
      }
      let cache=new LRUCache(3);
      cache.put('1','1');
      cache.put('2','2');
      cache.put('3','3');
      console.log(cache.get('2'))
      ```

      

   ## 适配器模式

   ![](/img/适配器模式.png)

   ```
   //适配器
   class Power{
     charge(){
       return '220v';
     }
   }
   class Adaptor{
     constructor(power){
       this.power=power;
     }
     charge(){//此处可以改为xxx任意名字
       let v=this.power.charge;
       return `${v}=>12v`;
     }
   }
   class Client{
     constructor(){
       this.adaptor=new Adaptor();
     }
     use(){
       console,log(this.adaptor.charge())
     }
   }
   let client=new Client();
   client.use();
   ```

   ```
   //参数的适配
   //返回值的适配
   function ajax(options){
     let defaultOptions={
       method:'GET',
       dataType:'json'
     }
     for(let attr in options){
       defaultOptions[attr]=options[attr]||defaultOptions[attr];//参数适配
     }
     console.log(defaultOptions);
   }
   function transform(str){
     return JSON.parse(str)
   }
   ajax({
     url:'http://www.baidu.com',
     method:'POST',
     success(str){
       //服务器返回的是JSON字符串
       let result=transform(str)//返回值适配
     }
   })
   ```

   ```
   //串行连续的读取三个文件的内容
   const fs=require('fs');
   function promisify(fn){
     return function(...args){
       return new Promise(function(resolve,reject){
         fn(...args,function(err,data){
           if(err){
             reject(err);
           }else{
             resolve(data)
           }
         })
       })
     }
   }
   let readFile=promisify(fs.readFile);//需要promise时适配一个promise
   (awync function read(){
     let one=await readFile('1.txt','utf8');
     let two=await readFile('2.txt','utf8');
     let three=await readFile('3.txt','utf8');
     console.log(one,two,three)
   }){}();
   ```

   ```
   //需要修改项目中所有的jquery方法为fetch
   window.$={//适配了原来所有的$.ajax，并且使用了fetch（老用法适配新用法）
     ajax(options){
       return fetch(options.url,{
         method:options.type||'GET',
         body:JSON.stringify(options.data||{})
       }).then(response=>response.json());
     }
   }
   $.ajax({
     url,
     type:'POST',
     dataType:'json',
     data:{id:1}
   }).then(function(data){
     console.log(data);
   })
   ```

   ```
   //Vue中使用案例
   <body>
   	<div id='root'>
   		<p>{{name}}</p>
   		<p>{{upperName}}</p>
   	</div>
   	<script>
   		let vm=new Vue({
         el:'#root',
         data:{
           name:'zfpx'
         },
         computed:{
           upperName(){
             return this.name.toUpperCase();//老字符串适配成一个新的字符串
           }
         }
   		})
   	</script>
   </body>
   ```

   ## 装饰器模式

   面向切面编程

   给一个类增加功能，但不会改变类的实质，只是修饰作用。它比适配器模式更强大。他修饰的方法必须同名。

   是将一个对象嵌入另一个对象之中，实际上相当于这个对象被另一个对象包装起来，形成一条包装链。请求随着这条链条依次传递到所有的对象，每个对象有处理这个请求的机会。

   

   ![](/img/装饰器模式.png)

   ```
   class Duck{
     constructor(name){
       this.name=name;
     }
     eat(food){
       console.log(`吃${food}`)
     }
   }
   class TangDuck{
     constructor(name){
       this.duck=new Duck(name)
     }
     eat(food){//必须同名,修饰上面的同名方法
       this.duck.eat(food);
       console.log('谢谢');
     }
   }
   let t=new TangDuck();
   t.eat('苹果');
   ```

   ```
   //装饰器模式有时候会优于继承
   class Coffee{
     make(water){
       return `${water}+咖啡`;
     }
     cost(){
       return 10;
     }
   }
   class MilkCoffee{
     constructor(parent){
       this.parent=parent;
     }
     make(water){
       return `${this.parent.make(water)+奶}`;
     }
     cost(){
       return `${this.parent.cost()+2}`;
     }
   }
   class SugarCoffee{
     constructor(parent){
       this.parent=parent;
     }
     make(water){
       return `${this.parent.make(water)+糖}`;
     }
   }
   let coffee=new Coffee();
   let sugarCoffee=new sugarCoffee(coffee);
   let milkCoffee=new MilkCoffee(sugarCoffee);
   milkCoffee.make('水')
   ```

   **AOP:**

   AOP就是在函数执行之前或之后添加一些额外的逻辑，而不需要修改函数原来的功能。

   ```
   Function.prototype.before=function(beforeFn){
     let _this=this;
     return function(){
       beforeFn.apply(this,arguments);//继承beforeFn，调用beforeFn
       _this.apply(this,arguments);//调用函数
     }
   }
   Function.prototype.after=function(afterFn){
     let _this=this;
     return function(){
       _this.apply(this,arguments);//调用函数
       afterFn.apply(this,arguments);//继承afterFn，调用afterFn
     }
   }
   function buy(money,goods){
     console.log(`花${money}元买${goods}`);
   }
   buy=buy.before(function(){
     console.log('向媳妇申请一块钱');
   })
   buy=buy.after(function(){
     console.log('向媳妇归还两毛钱');
   })
   buy(0.8,'盐')；
   
   ```

   **应用场景**

   1. 埋点：

   埋点分析，是网站分析的一种常用的数据采集方法。

   ajax的请求拦截，koa中间件，redux中间件都是基于装饰器实现的。

   - 服务器端埋点

   - 客户端埋点

     - 代码埋点(写死)

       ```
       //4.html
       <body>
       	<button data-name="watermelon" id="watermelon">西瓜</button>
       	<button data-name="apple" id="apple">苹果</button>
       	<script>
       		let watermelon=document.getElementById('watermelon');
       		let apple=document.getElementById('apple');
       		function click(){
             console.log('你点击了'+this.dataset.name);
             let img=new Image();
             img.src='http://localhost:3000/report?name='+this.dataset.name;
       		}
       		Array.from(document.querySelectorAll('button')).forEach(button=>{
             button.addEventListener('click',click);
       		})
       	</script>
       </body>
       //report.js
       let express=require('express');
       let app=express();
       let goods={};
       app.get('/report',function(req,res){
         let name=req.query.name;
         if(goods[name]){
           goods[name]++;
         }else{
           goods[name]=1
         }
         console.log('name',name);
         res.json(goods);
       })
       app.get('/',function(req,res){
         res.json(goods);
       })
       app.listen(3000);
       ```

       

     - 自动化埋点(AOP，推荐)

       ```
       //点击统计
       //4.html
       <body>
       	<button data-name="watermelon" id="watermelon">西瓜</button>
       	<button data-name="apple" id="apple">苹果</button>
       	<script>
       		let watermelon=document.getElementById('watermelon');
       		let apple=document.getElementById('apple');
       		Function.prototype.after=function(afterFn){
             let _this=this;
             return function(){
               _this.apply(this,arguments);//调用函数
               afterFn.apply(this,arguments);//继承afterFn，调用afterFn
             }
           }
       		function click(){
             console.log('你点击了'+this.dataset.name);
       		}
       		click=click.after(function(){
             let img=new Image();
             img.src='http://localhost:3000/report?name='+this.dataset.name;
       		})
       		Array.from(document.querySelectorAll('button')).forEach(button=>{
             button.addEventListener('click',click);
       		})
       	</script>
       </body>
       //report.js
       let express=require('express');
       let app=express();
       let goods={};
       app.get('/report',function(req,res){
         let name=req.query.name;
         if(goods[name]){
           goods[name]++;
         }else{
           goods[name]=1
         }
         console.log('name',name);
         res.json(goods);
       })
       app.get('/',function(req,res){
         res.json(goods);
       })
       app.listen(3000);
       ```

       ```
       //2.表单校验，避免校验逻辑和表单提交逻辑合在一起
       <body>
       	
       		用户名 <input type="text" id="username"/>
       		密码 <input type="text" id="password"/>
       		<button id="submit-btn">提交</button>
       	
       	<script>
       		Function.prototype.before=function(beforeFn){
             let _this=this;
             return function(){
               let ret=beforeFn.apply(this,arguments);//继承beforeFn，调用beforeFn
               if(ret){
                 _this.apply(this,arguments);//调用函数
               }
             }
           }
       		function submit(){
             console.log('提交表单')
       		}
       		let checkUserNameNotNull=submit.before(function(){
             let username=document.getElementById('username').value;
       		  if(username.length<6){
               return alert('用户名长度不够')
       		  }
       		  return true;
       		})
       		checkUserNameMoreThanSix=checkUserNameNotNull.before(function(){
             let username=document.getElementById('username').value;
       		  if(!username){
               return alert('用户名没有输入')
       		  }
       		  return true;
       		})
       		document.getElementById('submit-btn').addEventListener('click',submit)
       	</script>
       </body>
       ```

       

     - 第三方实现 百度统计，友盟等

   2. decorator(node不认识，需要babel转译)

      webpack要支持decorators要安装如下插件：

      ```
      //babel-plugin-proposal-decorators
      "plugins":[
        ["@babel/plugin-proposal-decorator",{"legacy":true}],//装饰器
        ["@babel/plugin-proposal-class-properties",{"loose":true}]//类装饰器
      ]
      ```

      类装饰器

      ```
      @testable
      class Person{
        
      }
      function testable(target){//对类进行装饰
        target.testalbe=true;
      }
      console.log(Person.testable);
      ```

      ```
      //react以前的例子（现在已废掉）
      let Hooks={
        componentWillMount(){
          console.log('componentWillMount');
        },
        componentDidMount(){
          console.log('componentDidMount');
        }
      }
      function mixins(...others){
        return function(target){
           Object.assign(target.prototype,...others);
        }
      }
      @mixings(Hooks)
      class Component{
        
      }
      let c=new Component();
      console.log(c)
      ```

      ```
      //方法decorators,用函数装饰类上的属性
      function readonly(target,attr,descriptor){//目标，属性名，属性描述器
        descriptor.writable=false;
      }
      class Circle{
        @readonly
        PI=3.14
      }
      let c=new Circle();
      c.PI=300;
      console.log(c.PI)
      
      //在一个老的逻辑之前执行一段逻辑
      function logger(target,attr,descriptor){
        let oldVal=descriptor.value;
        descriptor.value=function(...args){
          console.log(`参数：${args}`);
          return oldVal(...args);
        }
      }
      class Caculator{
        @logger
        sum(a,b){
          return a+b;
        }
      }
      let c=new Caculator();
      let ret=c.sum(1,2);
      console.log(ret);
      
      ```

      

   ## 代理模式

   由于一个对象不能直接引用另一个对象，所以需要通过代理对象在这两个对象之间起到中介作用

   在使用者和目标对象之间加一个代理对象，通过代理可以实现控制

   例如，VPN

   ![](/img/VPN.png)

   中国网站有GFW防火墙，所以无法访问谷歌服务器，需要买一个中间服务器，创建proxy代理，通过它来访问谷歌。

   ![](/img/代理模式.png)

   ```
   //1.google.js
   class Google{
     get(url){
       return google;
     }
   }
   class Proxy{
     constructor(){
       this.google=new Google();
     }
     get(url){
       return this.google.get(url);
     }
   }
   let proxy=new Proxy();
   let result=proxy.get('http://www/google.com');
   console.log(result);//google
   ```

   ![](/img/公司内部服务器.png)

   

   ```
   //2.cache.js
   //n=4 1!+2!+3!+4
   //修改前，
   function multi(n){
     if(n<=1){
       return 1;
     }else{
       return n*multi(n-1)
     }
   }
   let sum=function(n){
     let result=0;
     for(let i=1;i<=n;i++){
       result+multi(n)
     }
     return result;
   }
   console.time('cost');
   console.log(sum(3))
   console.time('cost');
   
   //修改后
   let sum=(function(){
     let cache={};//缓存每次的计算结果
     function multi(n){
       if(n<=1){
         return 1;
       }else{
         return n*(cache[n-1]||multi(n-1))
       }
     }
     return function(n){
       let result=0;
       for(let i=1;i<n;i++){
         let ret=multi(i);
         cache[i]=ret;//从1开始，每个阶乘都记录在了缓存中
         result+=ret;
       }
       return result;
     }
   })();
   console.time('cost');
   ```

   **proxy函数**

   ```
   //$.proxy绑定this。通过$.proxy生成新的函数，内部调用原始函数
   <body>
   	<button id='clickMe'>点我</button>
   	<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
   	<script>
   		document.getElementById('clickMe').addEventListener('click',function(){
         setTimeout($.proxy(function(){
           $(this).css('color','red');
         },this),3000)//proxy绑定this到this,否则是window。原理：setColor=setColor.bind(this)
   		})
   	</script>
   </body>
   ```

   ```
   //自己写一个$.proxy
   document.getElementById('clickMe').addEventListener('click',function(){
     function setColor(){
       $(this).css('color','red');
     }
     function proxy(fn,context){
       return function(){
         fn.apply(context,arguments);
       }
     }
     setColor=proxy(setColor,this);
     setTimeout(setColor,3000);
   });
   ```

   **Proxy(es6)**

   - Proxy 用于修改某些操作的默认行为
   - Proxy可以理解成，在目标对象之前架设一层"拦截"，外界对该对象的访问，都必须先通过这层拦截，因此提供了对外界访问的过滤和改写。由它来代理某些操作，即代理器
   - Vue3.0是用Proxy实现的。Vue2.0是用Object.defineProperty实现的。

   ```
   let wangy={
     name:"王燕",
     age:31,
     height:165
   }
   let wangMaMa = new Proxy(wangy,{
     get(target,key){
       if(key=='age'){
         return target.age-2;
       }else if(key==='height'){
         return target.height+3;
       }else{
         return target[key];
       }
     },
     set(target,key,val){
       if(key=='boyfriend'){
         let boyfriend=val;
         if(boyfriend.age>40){
           throw Error('太老了');
         }else if(boyfriend.salary<20000){
           throw Error('太穷了');
         }else{
           target[key]=val;
         }
       }
     }
   })
   console.log(wangMaMa.age)
   console.log(wangMaMa.height)
   console.log(wangMaMa.name)
   wangMaMa.boyfriend={age:12,salary:8};
   
   ```

   > 代理模式和适配器模式区别？
   >
   > 适配器提供不同接口，代理模式提供一模一样的接口

   > 代理模式和装饰器模式的区别？
   >
   > 装饰器模式原来的功能不变还可以使用，代理模式改变原来的功能

   **事件委托**

   addEventListener的第三个参数，true为捕获，false为冒泡

   事件委托也是一种代理模式

   ```
   <body>
   	<ul>
   		<li>1</li>
   		<li>2</li>
   		<li>3</li>
   	</ul>
   	<script>
   		let ulist=document.getElementById('ulist');
   		ulist.addEventListener('click',function(event){
   			if(event.target.nodetype==='li'){
           console.log(event.target.innerHTML);
   			}
   		})
   	</script>
   </body>
   ```

   **图片懒加载**

   不改变原有代码，且API不变，增强了额外的功能

   ```
   //app.js
   let express=require('express')
   let path=require('path')
   app=express();
   app.use(express.static(__dirname));
   app.get('/images/:name',function(req,res){
   	setTimeout(function(){
       res.sendFile(path.join(__dirname,req.path));
   	},2000)
     
   })
   app.get('/loading.gif',function(req,res){
     res.sendFile(path.resolve('loading.gif'));
   })
   app.listen(3000);
   ```

   ```
   //index.html
   <body>
   	<ul id='menu'>
   		<li data-src='/images/bg1.jpg'>图片1</li>
   		<li data-src='/images/bg2.jpg'>图片2</li>
   	</ul>
   	<div id"bgimg"></div>
   	<script>
   		let bgimg=document.getElementById('bgimg');
   		let menu=document.getElementById('menu');
   		let Background=(function(){
         let img=new Image();
         bgimg.appendChild(img);
         return {
           setSrc(src){
             img.src=src;
           }
         }
   		})()
   		menu.addEventListener('click',function(event){
         let src=event.darget.dataset.src;
         Background.setSrc(src);
   		})
   	</script>
   </body>
   
   //使用代理模式改进
   //index.html
   <body>
   	<ul id='menu'>
   		<li data-src='/images/bg1.jpg'>图片1</li>
   		<li data-src='/images/bg2.jpg'>图片2</li>
   	</ul>
   	<div id"bgimg"></div>
   	<script>
   		let bgimg=document.getElementById('bgimg');
   		let menu=document.getElementById('menu');
   		let Background=(function(){
         let img=new Image();
         bgimg.appendChild(img);
         return {
           setSrc(src){
             img.src=src+'?ts='+Date.now();
           }
         }
   		})()
   		//不改变原有代码，且API不变，增强了额外的功能
   		---------------------修改2------------------------
   		let ProxyBackground=(function(){
         let img=new Image();
         img.onload=function(){
           Background.setSrc(this.src);
         }
         return {
           setSrc(src){
             Background.setSrc('/loading.gif');
             img.src=src
           }
         }
   		})()
   		---------------------修改2------------------------
   		menu.addEventListener('click',function(event){
         let src=event.darget.dataset.src;
         --------修改1-----------
         ProxyBackground.setSrc(src);//
         --------修改1-----------
   		})
   	</script>
   </body>
   ```

   

**防抖代理**

勾选后修改数据，有时候点击多了的时候，不需要发送那么多请求，而是等确定后再发送请求

```
//app.js
let express=require('express')
let path=require('path')
app=express();
app.use(express.static(__dirname));
let todos=[
  {id:1,text:'吃饭',completed:false},
  {id:2,text:'睡觉',completed:false},
  {id:3,text:'打豆豆',completed:false}
]
app.get('/todos'，function(req,res){
  res.json(todos);
})
app.get('/toggle',function(req,res){
  let ids=req.query.ids;
  ids=ids.split(',').map(item=>parseInt(item));
  todos=todos.map(function(todo){
    if(ids.includes(todo.id)){
      todo.completed=!todo.completed;
    }
    return todo;
  });
  res.json({code:0})
})
app.listen(3000);

//index.html
<ul id="todoApp">

</ul>
<script>
	let todoApp=document.getElementById('todoApp');
	window.onload=function(){
    fetch('/todos').then(res=>res.json()).then(function(todos){
      todoApp.innerHTML=todos.map(item=>{
        `<li>
        	<input value="${item.id}" type="checkbox" ${item.completed?"checked":""}/>
        	${item.text}
        </li>`
      }).join('');
    })
	}
	function toggle(id){
    fetch(`/toggle?id=${id}`).then(res=>res.json()).then(function(result){
      
    })
	}
	let lazyToggle=(function(){
    let ids=[];
    let timer;
    return function(id){
      ids.push(id);
      if(!timer){
        timer=setTimeout(function(){
          toggole(ids.join(','));
          ids=[];
          clearTimeout(timer);
          timer=null;
        },2000);
      }
    }
	})();
	todoApp.addEventListener('click',function(event){
    let id=event.target.value;
    lazyToggle(id);
	})
</script>
```



## 外观模式

![](/img/外观模式.png)

```
class Sum{
    sum(a,b) {
        return a+b;
    }
}
class Minus{
    minus(a,b) {
        return a-b;
    }
}
class Multiply{
    multiply(a,b) {
        return a * b;
    }
}
class Calculator{
    constructor() {
        this.sumObj=new Sum();
        this.minusObj=new Minus();
        this.multiplyObj=new Multiply();
    }
    sum(...args) {
        this.sumObj.sum(...args);
    }
    minus(...args) {
        this.minusObj.minus(...args);
    }
    multiply(...args) {
        this.multiplyObj.multiply(...args);
    }
}
let calculator=new Calculator();
calculator.sum(1,2);
calculator.minus(1,2);
calculator.multiply(1,2);
```

**场景**

- 为复杂的模块或子系统提供外界访问的模块
- 子系统相互独立

redux

客户端和子模块得到了隔离，内部修改影响不到使用。

![](/img/redux.png)

## 观察者模式(监听模式)

- 被观察者供维护观察者的一系列方法
- 观察者提供更新接口
- 观察者把自己注册到被观察者里
- 在被观察者发生变化时候，调用观察者的更新方法

```
class Star{
    constructor(name) {
        this.name=name;
        this.state='';
        this.observers=[];
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state=state;
        this.notifyAllObservers();
    }
    attach(observer) {
        this.observers.push(observer);
    }
    notifyAllObservers() {
        this.observers.forEach(observer=>observer.update());
    }
}
class Fan{
    constructor(name,star) {
        this.name=name;
        this.star=star
        this.star.attach(this);
    }
    update() {
        console.log(`我的明星喜欢${this.star.getState()}，我也喜欢`);    
    }
}
let star=new Star('angelbaby');
let fan1=new Fan('zhangsan',star);
star.setState('绿色');
```

**场景**

1. 事件绑定

   ```
    <button id="btn">click</button>
       <script>
           let btn = document.getElementById('btn');
           btn.addEventListener('click',()=>{alert(1)});
           btn.addEventListener('click',()=>{alert(2)});
           btn.addEventListener('click',()=>{alert(3)});
       </script>
   ```

   

2. Promise

   ```
   class Promise{
       constructor(fn) {
           this.callbacks=[];
           let resolve=() => {
               this.callbacks.forEach(callback => callback())
           };
           fn(resolve);
       }
       then(callback) {
           this.callbacks.push(callback);
       }
   }
   let promise=new Promise(function (resolve,reject) {
       setTimeout(function () {
           resolve(100);
       },1000);
   });
   promise.then(() => console.log(1));
   promise.then(() => console.log(2));
   ```

3. JQuery.Callbacks

   Callbacks对象其实就是一个函数队列，获得Callbacks对象之后 ，就可以向这个集合中增加或者删除函数。

   ```
   <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
   <script>
    window.jQuery={
        Callbacks(){
          let observers = [];
          function add(observer){
              observers.push(observer);
          }
          function remove(observer){
              let index = observers.indexOf(observer);
              if(index != -1)
                observers.splice(index,1);
          }
          function fire(){
              observers.forEach(item=>item());
          }
          return {
              add,
              remove,
              fire
          }
      }
    }
    let callbacks = jQuery.Callbacks();
   
    let a1= ()=>alert(1);
    let a2= ()=>alert(2);
    let a3= ()=>alert(13);
    callbacks.add(a1);
    callbacks.add(a2);
    callbacks.add(a3);
    callbacks.remove(a3);
    callbacks.fire();
   </script>
   ```

4. events

   node库---自定义事件，来自events模块。可以实现监听事件，触发事件

   ```
   const EventEmitter=require('events');
   const util=require('util');
   let eve=new EventEmitter();
   eve.on('click',function (name) {
       console.log(1,name);
   });
   eve.on('click',function (name) {
       console.log(2,name);
   });
   eve.emit('click','zfpx');
   
   //使用util.inherits继承EventEmitter
   function Bell(){
     
   }
   util.inherits(Bell,EventEmitter);
   let bell=new Bell();
   bell.on('click',function(name){
     console.log("同学们进入")
   })
   
   ```

5. stream文件流

   ```
   let fs=require('fs');
   let rs=fs.createReadStream('./1.txt');
   rs.on('data',function (data) {
       console.log(data)
   });
   rs.on('end',function () {
       console.log('end')
   });
   ```

6. http服务器

   ```
   let http=require('http');
   let server = http.createServer();
   server.on('request',(req,res)=>{
     req.on('data',function(data){
         console.log(data)
     });
   }));
   ```

7. 生命周期函数

8. vue watch

   ```
   <body>
   <div id="root">
         <p>FullName: {{fullName}}</p>
         <p>FirstName: <input type="text" v-model="firstName"/></p>
         <p>LastName: <input type="text" v-model="lastName"/></p>
   </div>
   <script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js"></script>
   <script>
   new Vue({
     el:'#root',
     data: {
       firstName:'张',
       lastName: '三',
       fullName:'张三'
     },
     watch: {
       firstName(newName, oldName) {
         this.fullName = newName + ' ' + this.lastName;
       }
     } 
   })
   </script>
   ```

9. redux

**观察者模式和发布订阅模式的区别？**

- 观察者模式

  ![](/img/观察者模式.png)

  1. 观察者和被观察者是耦合的
  2. 观察者的update动作是由被观察者来调用的

- 发布订阅模式

  ![](/img/发布订阅模式.png)

  ```
  class Agency{
      constructor() {
          this._topics={};
      }
      // on addEventListener
      subscribe(topic,listener) {
          let listeners=this._topics[topic];
          if (listeners) {
              listeners.push(listener);
          } else {
              this._topics[topic]=[listener];
          }
      }
      //emit
      publish(topic) {
          let listeners=this._topics[topic];
          let args=Array.from(arguments).slice(1);
          listeners.forEach(listener => listener(...args));
      }
  }
  let agent=new Agency();
  class Landlord{
      constructor(name) {
          this.name=name;
      }
      lend(agent,area,money) {
          agent.publish('house',area,money);
      }
  }
  
  class Tenant{
      constructor(name) {
          this.name=name;
      }
      rent(agent) {
          agent.subscribe('house', (area,money)=> {
              console.log(`有新房源了, ${area}平米, ${money}元`);
          });
      }
  }
  let t1=new Tenant('房客1');
  let t2=new Tenant('房客2');
  let l1=new Landlord('房东1');
  t1.rent(agent);
  t2.rent(agent);
  l1.lend(agent,30,2000);
  ```

- 虽然两种模式都存在订阅者和发布者（观察者可认为是订阅者、被观察者可认为是发布者）

- 但是观察者模式是由被观察者调度的，而发布/订阅模式是统一由调度中心调的

- 所以观察者模式的订阅者与发布者之间是存在依赖的，而发布/订阅模式则不会。
