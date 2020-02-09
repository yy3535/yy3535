# TypeScript是什么
- Typescript是由微软开发的一款开源的编程语言
- Typescript是Javascript的超集，遵循最新的ES5/ES6规范。TypeScript扩展了Javascript语法
- TypeScript更像后端Java、C#这样的面向对象语言可以让JS开发大型企业应用
- 越来越多的项目是基于TS的，比如VSCode、Angular6、Vue3、React16
- TS提供的类型系统可以帮助我们在写代码的时候提供更丰富的语法提示
- 在创建前的编译阶段经过类型系统的检查，就可以避免很多线上的错误
![typescript](../../img/typescript.jpg)

## TypeScript安装和编译
### 安装
```md
cnpm i typescript -g
```
```md
<!-- 编译ts为js -->
tsc helloworld.ts
```
```md
<!-- 生成ts配置文件 -->
tsc --init 
```
```json
{
    script:{
        build:tsc
        dev:tsc --watch
    }
}

```
## 数据类型
### 布尔类型(boolean)
```ts
let married: boolean=false;
```
### 数字类型(number)
```ts
let age: number=10;
```
### 字符串类型(string)
```ts
let firstname: string='zfpx';
```
### 数组类型(array)
```ts
let arr2: number[]=[4,5,6];
let arr3: Array<number>=[7,8,9];
```
### 元组类型(tuple)
在 TypeScript 的基础类型中，元组（ Tuple ）表示一个已知数量和类型的数组
```ts
let zhufeng:[string,number] = ['zhufeng',5];
zhufeng[0].length;
zhufeng[1].toFixed(2);
```
```ts
const animal:[string,number,boolean] = ['zhufeng',10,true];
```
### 枚举类型(enum)
事先考虑某一个变量的所有的可能的值，尽量用自然语言中的单词表示它的每一个值
比如性别、月份、星期、颜色、单位、学历
### 普通枚举
```ts
enum Gender{
    GIRL,
    BOY
}
console.log(`李雷是${Gender.BOY}`);
console.log(`韩梅梅是${Gender.GIRL}`);

enum Week{
    MONDAY=1,
    TUESDAY=2
}
console.log(`今天是星期${Week.MONDAY}`);
```
```js
let Gender={};
(function(Gender){
    Gender["BOY"]=0;
    Gender[0]="BOY";
    Gender["GIRL"]=1;
    Gender[1]="GIRL";
})(Gender);
console.log(Gender);
```
### 常数枚举
```ts
const enum Colors {
    Red,
    Yellow,
    Blue
}
let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];
```
```ts
const enum Color {Red, Yellow, Blue = "blue".length};
```
### 任意类型(any) 
- any就是可以赋值给任意类型
- 第三方库没有提供类型文件时可以使用any
- 类型转换遇到困难时
- 数据结构太复杂难以定义
```ts
let root:any=document.getElementById('root');
root.style.color='red';
```
```ts
let root:(HTMLElement|null)=document.getElementById('root');
root!.style.color='red';//非空断言操作符(强行调用，忽略ts可能为null的警告)
```
### null 和 undefined
- null 和 undefined 是其它类型的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined
- ts配置strictNullChecks 参数用于新的严格空检查模式,在严格空检查模式下， null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any
```ts
let x: number;
x = 1;
x = undefined;    
x = null;   

let y: number | null | undefined;
y = 1;
y = undefined;   
y = null; 
```
### void 类型
- void 表示没有任何类型
- 当一个函数没有返回值时，TS 会认为它的返回值是 void 类型。
```ts
function greeting(name:string):void {
    console.log('hello',name);
    //当我们声明一个变量类型是 void 的时候，它的非严格模式(strictNullChecks:false)下仅可以被赋值为 null 和 undefined
    //严格模式(strictNullChecks:true)下只能返回undefined
    //return null;
    //return undefined;
}
```
### never类型
never是其它类型(null undefined)的子类型，代表不会出现的值
#### 
作为不会返回（ return ）的函数的返回值类型
```ts
// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function error(message: string): never {
    throw new Error(message);
}
let result1 = error('hello');
// 由类型推论得到返回值为 never
function fail() {
    return error("Something failed");
}
let result = fail();

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function infiniteLoop(): never {
    while (true) {}
}
```
#### strictNullChecks
- 在 TS 中， null 和 undefined 是任何类型的有效值，所以无法正确地检测它们是否被错误地使用。于是 TS 引入了 --strictNullChecks 这一种检查模式
- 由于引入了 --strictNullChecks ，在这一模式下，null 和 undefined 能被检测到。所以 TS 需要一种新的底部类型（ bottom type ）。所以就引入了 never。
```ts
// Compiled with --strictNullChecks
function fn(x: number | string) {
  if (typeof x === 'number') {
    // x: number 类型
  } else if (typeof x === 'string') {
    // x: string 类型
  } else {
    // x: never 类型
    // --strictNullChecks 模式下，这里的代码将不会被执行，x 无法被观察
  }
}
```
#### never 和 void 的区别
- void 可以被赋值为 null 和 undefined的类型。 never 则是一个不包含值的类型。
- 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
### 类型推论
- 是指编程语言中能够自动推导出值的类型的能力，它是一些强静态类型语言中出现的特性
- 定义时未赋值就会推论成any类型
- 如果定义的时候就赋值就能利用到类型推论
```ts
let username2;
username2 = 10;
username2 = 'zhufeng';
username2 = null;
```
### 包装对象（Wrapper Object）
- JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。
- 所有的原始数据类型都没有属性（property）
- 原始数据类型
    - 布尔值
    - 数值
    - 字符串
    - null
    - undefined
    - Symbol
```ts
let name = 'zhufeng';
console.log(name.toUpperCase());

console.log((new String('zhufeng')).toUpperCase());
```
当调用基本数据类型方法的时候，JavaScript 会在原始数据类型和对象类型之间做一个迅速的强制性切换
```ts
let isOK: boolean = true; // 编译通过
let isOK: boolean = Boolean(1) // 编译通过
let isOK: boolean = new Boolean(1); // 编译失败   期望的 isOK 是一个原始数据类型
```
### 联合类型
- 联合类型（Union Types）表示取值可以为多种类型中的一种
- 未赋值时联合类型上只能访问两个类型共有的属性和方法
```ts
let name: string | number;
console.log(name.toString());
name = 3;
console.log(name.toFixed(2));
name = 'zhufeng';
console.log(name.length);

export {};
```
### 类型断言
- 类型断言可以将一个联合类型的变量，指定为一个更加具体的类型
- 不能将联合类型断言为不存在的类型
```ts
let name: string | number;
console.log((name as string).length);
console.log((name as number).toFixed(2));
console.log((name as boolean));
```
### 字面量类型
可以把字符串、数字、布尔值字面量组成一个联合类型
```ts
type ZType = 1 | 'One'|true;
let t1:ZType = 1;
let t2:ZType = 'One';
let t3:ZType = true;
```
### 字符串字面量 vs 联合类型 
- 字符串字面量类型用来约束取值只能是某几个字符串中的一个, 联合类型（Union Types）表示取值可以为多种类型中的一种
- 字符串字面量 限定了使用该字面量的地方仅接受特定的值,联合类型 对于值并没有限定，仅仅限定值的类型需要保持一致
## 函数
### 函数的定义
可以指定参数的类型和返回值的类型
```ts
function hello(name:string):void {
    console.log('hello',name);
}
hello('zfpx');
```
### 函数表达式
定义函数类型
```ts
type GetUsernameFunction = (x:string,y:string)=>string;
let getUsername:GetUsernameFunction = function(firstName,lastName){
  return firstName + lastName;
}
```
### 没有返回值
```ts
let hello2 = function (name:string):void {
    console.log('hello2',name);
    return undefined;
}
hello2('zfpx');
```
### 可选参数
在TS中函数的形参和实参必须一样，不一样就要配置可选参数,而且必须是最后一个参数
```ts
function print(name:string,age?:number):void {
    console.log(name,age);
}
print('zfpx');
```
### 默认参数
```ts
function ajax(url:string,method:string='GET') {
    console.log(url,method);
}
ajax('/users');
```
### 剩余参数
```ts
function sum(...numbers:number[]) {
    return numbers.reduce((val,item)=>val+=item,0);
}
console.log(sum(1,2,3));
```
### 函数重载
在Java中的重载，指多个同名函数，参数数量或类型不一样
在TypeScript中，表现为给同一个函数提供多个函数类型定义
```ts
let obj: any={};
function attr(val: string): void;
function attr(val: number): void;
function attr(val:any):void {
    if (typeof val === 'string') {
        obj.name=val;
    } else {
        obj.age=val;
    }
}
attr('zfpx');
attr(9);
attr(true);
console.log(obj);
```

## 类
### 如何定义类
- "strictPropertyInitialization": true / 启用类属性初始化的严格检查/
- name!:string
```ts
class Person{
    name:string;
    getName():void{
        console.log(this.name);
    }
}
let p1 = new Person();
p1.name = 'zhufeng';
p1.getName();
```
```js
"use strict";
// 类
var Person=/** @class */ (function(){
    function Person(){}
    Person.prototype.getName=function(){
        console.log(this.name);
    };
    return Person;
}());
```
### 存取器
- 在 TypeScript 中，我们可以通过存取器来改变一个类中属性的读取和赋值行为
- 构造函数
    - 主要用于初始化类的成员变量属性
    - 类的对象创建时自动调用执行
    - 没有返回值
```ts
class User {
    myname:string;
    constructor(myname: string) {
        this.myname = myname;
    }
    get name() {
        return this.myname;
    }
    set name(value) {
        this.myname = value;
    }
}

let user = new User('zhufeng');
user.name = 'jiagou'; 
console.log(user.name); 
"use strict";
var User = /** @class */ (function () {
    function User(myname) {
        this.myname = myname;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this.myname;
        },
        set: function (value) {
            this.myname = value;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
var user = new User('zhufeng');
user.name = 'jiagou';
console.log(user.name);
```
### 参数属性
```ts
class User {
    constructor(public myname: string) {}
    get name() {
        return this.myname;
    }
    set name(value) {
        this.myname = value;
    }
}

let user = new User('zhufeng');
console.log(user.name); 
user.name = 'jiagou'; 
console.log(user.name);
```
### readonly
- readonly修饰的变量只能在构造函数中初始化
- 在 TypeScript 中，const 是常量标志符，其值不能被重新分配
- TypeScript 的类型系统同样也允许将 interface、type、 class 上的属性标识为 readonly
- readonly 实际上只是在编译阶段进行代码检查。而 const 则会在运行时检查（在支持 const 语法的 JavaScript 运行时环境中）
```ts
class Animal {
    public readonly name: string
    constructor(name:string) {
        this.name = name;
    }
    changeName(name:string){
        this.name = name;
    }
}

let a = new Animal('zhufeng');
a.changeName('jiagou');
```
### 继承
- 子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性
- 将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑
- super可以调用父类上的方法和属性
```ts
class Person {
    name: string;//定义实例的属性，默认省略public修饰符
    age: number;
    constructor(name:string,age:number) {//构造函数
        this.name=name;
        this.age=age;
    }
    getName():string {
        return this.name;
    }
    setName(name:string): void{
        this.name=name;
    }
}
class Student extends Person{
    no: number;
    constructor(name:string,age:number,no:number) {
        super(name,age);
        this.no=no;
    }
    getNo():number {
        return this.no;
    }
}
let s1=new Student('zfpx',10,1);
console.log(s1);
```
### 类里面的修饰符
```ts
class Father {
    public name: string;  //类里面 子类 其它任何地方外边都可以访问
    protected age: number; //类里面 子类 都可以访问,其它任何地方不能访问
    private money: number; //类里面可以访问， 子类和其它任何地方都不可以访问
    constructor(name:string,age:number,money:number) {//构造函数
        this.name=name;
        this.age=age;
        this.money=money;
    }
    getName():string {
        return this.name;
    }
    setName(name:string): void{
        this.name=name;
    }
}
class Child extends Father{
    constructor(name:string,age:number,money:number) {
        super(name,age,money);
    }
    desc() {
        console.log(`${this.name} ${this.age} ${this.money}`);
    }
}

let child = new Child('zfpx',10,1000);
console.log(child.name);
console.log(child.age);
console.log(child.money);
```
### 静态属性 静态方法
```ts
class Father {
    static className='Father';
    static getClassName() {
        return Father.className;
    }
    public name: string;
    constructor(name:string) {//构造函数
        this.name=name;
    }

}
console.log(Father.className);
console.log(Father.getClassName());
```
### 装饰器
- 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
- 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
- 装饰器的写法分为普通装饰器和装饰器工厂
#### 类装饰器
类装饰器在类声明之前声明，用来监视、修改或替换类定义
```ts
namespace a {
    interface Person {
        name: string;
        eat: any
    }
    function enhancer(target: any) {
        target.prototype.name = 'zhufeng';
        target.prototype.eat = function () {
            console.log('eat');
        }
    }
    @enhancer
    class Person {
        constructor() { }
    }
    let p: Person = new Person();
    console.log(p.name);
    p.eat();
}

namespace b {
    interface Person {
        name: string;
        eat: any
    }
    function enhancer(name: string) {
        return function enhancer(target: any) {
            target.prototype.name = name;
            target.prototype.eat = function () {
                console.log('eat');
            }
        }
    }

    @enhancer('zhufeng')
    class Person {
        constructor() { }
    }
    let p: Person = new Person();
    console.log(p.name);
    p.eat();
}

namespace c {
    interface Person {
        name: string;
        eat: any
    }
    function enhancer(target: any) {
        return class {
            name: string = 'jiagou'
            eat() {
                console.log('吃饭饭');
            }
        }
    }
    @enhancer
    class Person {
        constructor() { }
    }
    let p: Person = new Person();
    console.log(p.name);
    p.eat();
}
```
#### 属性装饰器
- 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数
- 属性装饰器用来装饰属性
    - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    - 第二个参数是属性的名称
- 方法装饰器用来装饰方法
    - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    - 第二个参数是方法的名称
    - 第三个参数是方法描述符
```ts
namespace d {
    function upperCase(target: any, propertyKey: string) {
        let value = target[propertyKey];
        const getter = function () {
            return value;
        }
        // 用来替换的setter
        const setter = function (newVal: string) {
            value = newVal.toUpperCase()
        };
        // 替换属性，先删除原先的属性，再重新定义属性
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
    function noEnumerable(target: any, property: string, descriptor: PropertyDescriptor) {
        console.log('target.getName', target.getName);
        console.log('target.getAge', target.getAge);
        descriptor.enumerable = true;
    }
    function toNumber(target: any, methodName: string, descriptor: PropertyDescriptor) {
        let oldMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            args = args.map(item => parseFloat(item));
            return oldMethod.apply(this, args);
        }
    }
    class Person {
        @upperCase
        name: string = 'zhufeng'
        public static age: number = 10
        constructor() { }
        @noEnumerable
        getName() {
            console.log(this.name);
        }
        @toNumber
        sum(...args: any[]) {
            return args.reduce((accu: number, item: number) => accu + item, 0);
        }
    }
    let p: Person = new Person();
    for (let attr in p) {
        console.log('attr=', attr);
    }
    p.name = 'jiagou';
    p.getName();
    console.log(p.sum("1", "2", "3"));
}
```
#### 参数装饰器
- 会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元数据
    - 第1个参数对于静态成员是类的构造函数，对于实例成员是类的原型对象
    - 第2个参数的名称
    - 第3个参数在函数列表中的索引
```ts
namespace d {
    interface Person {
        age: number;
    }
    function addAge(target: any, methodName: string, paramsIndex: number) {
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.age = 10;
    }
    class Person {
        login(username: string, @addAge password: string) {
            console.log(this.age, username, password);
        }
    }
    let p = new Person();
    p.login('zhufeng', '123456')
}
```
#### 装饰器执行顺序
- 有多个参数装饰器时：从最后一个参数依次向前执行
- 方法和方法参数中参数装饰器先执行。
- 类装饰器总是最后执行
- 方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行
```ts
namespace e {
    function Class1Decorator() {
        return function (target: any) {
            console.log("类1装饰器");
        }
    }
    function Class2Decorator() {
        return function (target: any) {
            console.log("类2装饰器");
        }
    }
    function MethodDecorator() {
        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
            console.log("方法装饰器");
        }
    }
    function Param1Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
            console.log("参数1装饰器");
        }
    }
    function Param2Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
            console.log("参数2装饰器");
        }
    }
    function PropertyDecorator(name: string) {
        return function (target: any, propertyName: string) {
            console.log(name + "属性装饰器");
        }
    }

    @Class1Decorator()
    @Class2Decorator()
    class Person {
        @PropertyDecorator('name')
        name: string = 'zhufeng';
        @PropertyDecorator('age')
        age: number = 10;
        @MethodDecorator()
        greet(@Param1Decorator() p1: string, @Param2Decorator() p2: string) { }
    }
}
/**
name属性装饰器
age属性装饰器
参数2装饰器
参数1装饰器
方法装饰器
类2装饰器
类1装饰器
 */
```
### 抽象类
- 抽象描述一种抽象的概念，无法被实例化，只能被继承
- 无法创建抽象类的实例
- 一般用来封装一些公共的属性和方法
- 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
```ts
abstract class Animal {
    name!:string;
    abstract speak():void;
}
class Cat extends Animal{
    speak(){
        console.log('喵喵喵');
    }
}
let animal = new Animal();//Cannot create an instance of an abstract class
animal.speak();
let cat = new Cat();
cat.speak();
```
|访问控制修饰符|	private protected public|
|:---:|:---:|
|只读属性|	readonly|
|静态属性|	static|
|抽象类、抽象方法|	abstract|
### 抽象类 vs 接口
- 不同类之间公有的属性或方法，可以抽象成一个接口（Interfaces）
- 而抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述,既不提供方法的实现，也不为属性进行初始化
- 一个类可以继承一个类或抽象类，但可以实现（implements）多个接口
- 抽象类也可以实现接口
```ts
abstract class Animal{
    name:string;
    constructor(name:string){
      this.name = name;
    }
    abstract speak():void;
  }
interface Flying{
      fly():void
}
class Duck extends Animal implements Flying{
      speak(){
          console.log('汪汪汪');
      }
      fly(){
          console.log('我会飞');
      }
}
let duck = new Duck('zhufeng');
duck.speak();
duck.fly();
```
### 抽象方法
- 抽象类和方法不包含具体实现，必须在子类中实现
- 抽象方法只能出现在抽象类中
- 子类可以对抽象类进行不同的实现
```ts
abstract class Animal{
    abstract speak():void;
}
class Dog extends  Animal{
    speak(){
        console.log('小狗汪汪汪');
    }
}
class Cat extends  Animal{
    speak(){
        console.log('小猫喵喵喵');
    }
}
let dog=new Dog();
let cat=new Cat();
dog.speak();
cat.speak();
```
### 重写(override) vs 重载(overload)
- 重写是指子类重写继承自父类中的方法
- 重载是指为同一个函数提供多个类型定义
```ts
class Animal{
    speak(word:string):string{
        return '动作叫:'+word;
    }
}
class Cat extends Animal{
    speak(word:string):string{
        return '猫叫:'+word;
    }
}
let cat = new Cat();
console.log(cat.speak('hello'));
//--------------------------------------------
function double(val:number):number
function double(val:string):string
function double(val:any):any{
  if(typeof val == 'number'){
    return val *2;
  }
  return val + val;
}

let r = double(1);
console.log(r);
```
### 继承 vs 多态
- 继承(Inheritance)子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态(Polymorphism)由继承而产生了相关的不同的类，对同一个方法可以有不同的行为
```ts
class Animal{
    speak(word:string):string{
        return 'Animal: '+word;
    }
}
class Cat extends Animal{
    speak(word:string):string{
        return 'Cat:'+word;
    }
}
class Dog extends Animal{
    speak(word:string):string{
        return 'Dog:'+word;
    }
}
let cat = new Cat();
console.log(cat.speak('hello'));
let dog = new Dog();
console.log(dog.speak('hello'));
```
## 接口
- 接口一方面可以在面向对象编程中表示为行为的抽象，另外可以用来描述对象的形状
- 接口就是把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类
- 一个类可以继承另一个类并实现多个接口
- 接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
- 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类的可以有多个子类，但只能有一个父类
### 接口
interface中可以用分号或者逗号分割每一项，也可以什么都不加
#### 对象的形状
```ts
//接口可以用来描述`对象的形状`,少属性或者多属性都会报错
interface Speakable{
    speak():void;
    name?:string;//？表示可选属性
}

let speakman:Speakable = {
    speak(){},//少属性会报错
    name,
    age//多属性也会报错
}
```
#### 行为的抽象
```ts
//接口可以在面向对象编程中表示为行为的抽象
interface Speakable{
    speak():void;
}
interface Eatable{
    eat():void
}
//一个类可以实现多个接口
class Person implements Speakable,Eatable{
    speak(){
        console.log('Person说话');
    }
    eat(){}
}
class TangDuck implements Speakable{
    speak(){
        console.log('TangDuck说话');
    }
    eat(){}
}
```
#### 任意属性
```ts
//无法预先知道有哪些新的属性的时候,可以使用 `[propName:string]:any`,propName名字是任意的
interface Person {
  readonly id: number;
  name: string;
  [propName: string]: any;
}

let p1 = {
  id:1,
  name:'zhufeng',
  age:10
}
```
### 接口的继承
一个接口可以继承自另外一个接口
```ts
interface Speakable {
    speak(): void
}
interface SpeakChinese extends Speakable {
    speakChinese(): void
}
class Person implements SpeakChinese {
    speak() {
        console.log('Person')
    }
    speakChinese() {
        console.log('speakChinese')
    }
}
```
### readonly
用 readonly 定义只读属性可以避免由于多人协作或者项目较为复杂等因素造成对象的值被重写
```ts
interface Person{
  readonly id:number;
  name:string
}
let tom:Person = {
  id :1,
  name:'zhufeng'
}
tom.id = 1;
```
### 函数类型接口
对方法传入的参数和返回值进行约束
```ts
interface discount{
  (price:number):number
}
let cost:discount = function(price:number):number{
   return price * .8;
} 
```
### 可索引接口
- 对数组和对象进行约束
- userInterface 表示index的类型是 number，那么值的类型必须是 string
- UserInterface2 表示：index 的类型是 string，那么值的类型必须是 string
```ts
interface UserInterface {
  [index:number]:string
}
let arr:UserInterface = ['zfpx1','zfpx2'];
console.log(arr);

interface UserInterface2 {
  [index:string]:string
}
let obj:UserInterface2 = {name:'zhufeng'};
```
### 类接口
对类的约束
```ts
interface Speakable {
    name: string;
    speak(words: string): void
}
class Dog implements Speakable {
    name!: string;
    speak(words:string) {
        console.log(words);
    }
}
let dog = new Dog();
dog.speak('汪汪汪');
```
### 构造函数的类型
- 在 TypeScript 中，我们可以用 interface 来描述类
- 同时也可以使用interface里特殊的new()关键字来描述类的构造函数类型
```ts
class Animal{
  constructor(public name:string){
  }
}
interface WithNameClass{
  new(name:string):Animal
}
function createAnimal(clazz:WithNameClass,name:string){
   return new clazz(name);
}
let a = createAnimal(Animal,'zhufeng');
console.log(a.name);
```
## 泛型
- 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
- 泛型T作用域只限于函数内部使用
### 泛型函数
首先，我们来实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值
```ts
function createArray(length: number, value: any): Array<any> {
  let result: any = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
let result = createArray(3,'x');
console.log(result);
```
使用了泛型
```ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
let result = createArray2<string>(3,'x');
console.log(result);
```
### 类数组
类数组（Array-like Object）不是数组类型，比如 arguments
```ts
function sum() {
    let args: IArguments = arguments;
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
    }
}
sum(1, 2, 3);

let root = document.getElementById('root');
let children: HTMLCollection = (root as HTMLElement).children;
children.length;
let nodeList: NodeList = (root as HTMLElement).childNodes;
nodeList.length;
```
### 泛型类
```ts
class MyArray<T>{
    private list:T[]=[];
    add(value:T) {
        this.list.push(value);
    }
    getMax():T {
        let result=this.list[0];
        for (let i=0;i<this.list.length;i++){
            if (this.list[i]>result) {
                result=this.list[i];
            }
        }
        return result;
    }
}
let arr=new MyArray();
arr.add(1); arr.add(2); arr.add(3);
let ret = arr.getMax();
console.log(ret);
```
### 泛型接口
泛型接口可以用来约束函数
```ts
interface Calculate{
  <T>(a:T,b:T):T
}
let add:Calculate = function<T>(a:T,b:T){
  return a;
}
add<number>(1,2);
```
### 多个类型参数
泛型可以有多个
```ts
function swap<A,B>(tuple:[A,B]):[B,A]{
  return [tuple[1],tuple[0]];
}
let swapped = swap<string,number>(['a',1]);
console.log(swapped);
console.log(swapped[0].toFixed(2));
console.log(swapped[1].length);
```
### 默认泛型类型
```ts
function createArray3<T=number>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
let result2 = createArray3(3,'x');
console.log(result2);
```
### 泛型约束
在函数中使用泛型的时候，由于预先并不知道泛型的类型，所以不能随意访问相应类型的属性或方法。
```ts
function logger<T>(val: T) {
    console.log(val.length); //直接访问会报错
}
//可以让泛型继承一个接口
interface LengthWise {
    length: number
}
//可以让泛型继承一个接口
function logger2<T extends LengthWise>(val: T) {
    console.log(val.length)
}
logger2('zhufeng');
logger2(1);
```
### 泛型接口
定义接口的时候也可以指定泛型
```ts
interface Cart<T>{
  list:T[]
}
let cart:Cart<{name:string,price:number}> = {
  list:[{name:'zhufeng',price:10}]
}
console.log(cart.list[0].name,cart.list[0].price);
```
### 泛型类型别名
泛型类型别名可以表达更复杂的类型
```ts
type Cart<T> = {list:T[]} | T[];
let c1:Cart<string> = {list:['1']};
let c2:Cart<number> = [1];
```
### 泛型接口 vs 泛型类型别名
- 接口创建了一个新的名字，它可以在其他任意地方被调用。而类型别名并不创建新的名字，例如报错信息就不会使用别名
- 类型别名不能被 extends和 implements,这时我们应该尽量使用接口代替类型别名
- 当我们需要使用联合类型或者元组类型的时候，类型别名会更合适

## 结构类型系统
### 接口的兼容性
- 如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
- 原理是Duck-Check,就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的
```ts
interface Animal {
    name: string;
    age: number;
}

interface Person {
    name: string;
    age: number;
    gender: number
}
// 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
function getName(animal: Animal): string {
    return animal.name;
}

let p = {
    name: 'zhufeng',
    age: 10,
    gender: 0
}

getName(p);
//只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
let a: Animal = {
    name: 'zhufeng',
    age: 10,
    gender: 0
}
```
### 基本类型的兼容性
```ts
//基本数据类型也有兼容性判断
let num : string|number;
let str:string='zhufeng';
num = str;

//只要有toString()方法就可以赋给字符串变量
let num2 : {
  toString():string
}

let str2:string='jiagou';
num2 = str2;
```
### 类的兼容性
在TS中是结构类型系统，只会对比结构而不在意类型
```ts
class Animal{
    name:string
}
class Bird extends Animal{
   swing:number
}

let a:Animal;
a = new Bird();

let b:Bird;
//并不是父类兼容子类，子类不兼容父类
b = new Animal();

class Animal{
  name:string
}
//如果父类和子类结构一样，也可以的
class Bird extends Animal{}

let a:Animal;
a = new Bird();

let b:Bird;
b = new Animal();

//甚至没有关系的两个类的实例也是可以的
class Animal{
  name:string
}
class Bird{
  name:string
}
let a:Animal ;
a = new Bird();
let b:Bird;
b = new Animal();
```
### 函数的兼容性
比较函数的时候是要先比较函数的参数，再比较函数的返回值
#### 比较参数
```ts
type sumFunc = (a:number,b:number)=>number;
let sum:sumFunc;
function f1(a:number,b:number):number{
  return a+b;
}
sum = f1;

//可以省略一个参数
function f2(a:number):number{
   return a;
}
sum = f2;

//可以省略二个参数
function f3():number{
    return 0;
}
sum = f3;

 //多一个参数可不行
function f4(a:number,b:number,c:number){
    return a+b+c;
}
sum = f4;
```
#### 比较返回值
```ts
type GetPerson = ()=>{name:string,age:number};
let getPerson:GetPerson;
//返回值一样可以
function g1(){
    return {name:'zhufeng',age:10};
}
getPerson = g1;
//返回值多一个属性也可以
function g2(){
    return {name:'zhufeng',age:10,gender:'male'};
}
getPerson = g2;
//返回值少一个属性可不行
function g3(){
    return {name:'zhufeng'};
}
getPerson = g3;
//因为有可能要调用返回值上的方法
getPerson().age.toFixed();
```
### 函数参数的协变
当比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功
```ts
"strictFunctionTypes": false
let sourceFunc = (args: number | string) => { }
let target1Func = (args: number | string) => { }
let target2Func = (args: number | string | boolean) => { }
sourceFunc = target1Func;
sourceFunc = target2Func;

interface Event {
    timestamp: number;
}

interface MouseEvent extends Event {
    eventX: number;
    eventY: number;
}

interface KeyEvent extends Event {
    keyCode: number;
}

function addEventListener(eventType: EventType, handler: (n: Event) => void) { }

addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.eventX + ', ' + e.eventY));
addEventListener(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.eventX + ', ' + e.eventY)));
```
### 泛型的兼容性
泛型在判断兼容性的时候会先判断具体的类型,然后再进行兼容性判断
```ts
//接口内容为空没用到泛型的时候是可以的
//1.接口内容为空没用到泛型的时候是可以的
interface Empty<T>{}
let x!:Empty<string>;
let y!:Empty<number>;
x = y;

//2.接口内容不为空的时候不可以
interface NotEmpty<T>{
  data:T
}
let x1!:NotEmpty<string>;
let y1!:NotEmpty<number>;
x1 = y1;

//实现原理如下,称判断具体的类型再判断兼容性
interface NotEmptyString{
    data:string
}

interface NotEmptyNumber{
    data:number
}
let xx2!:NotEmptyString;
let yy2!:NotEmptyNumber;
xx2 = yy2;
```
### 枚举的兼容性
- 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
- 不同枚举类型之间是不兼容的
```ts
//数字可以赋给枚举
enum Colors {Red,Yellow}
let c:Colors;
c = Colors.Red;
c = 1;
c = '1';

//枚举值可以赋给数字
let n:number;
n = 1;
n = Colors.Red;
```
## 类型保护
- 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
- 类型保护就是能够通过关键字判断出分支中的类型
### typeof 类型保护
```ts
function double(input: string | number | boolean) {
    if (typeof input === 'string') {
        return input + input;
    } else {
        if (typeof input === 'number') {
            return input * 2;
        } else {
            return !input;
        }
    }
}
```
### instanceof类型保护
```ts
class Animal {
    name!: string;
}
class Bird extends Animal {
    swing!: number
}
function getName(animal: Animal) {
    if (animal instanceof Bird) {
        console.log(animal.swing);
    } else {
        console.log(animal.name);
    }
}
```
### null保护
如果开启了strictNullChecks选项，那么对于可能为null的变量不能调用它上面的方法和属性
```ts
function getFirstLetter(s: string | null) {
    //第一种方式是加上null判断
    if (s == null) {
        return '';
    }
    //第二种处理是增加一个或的处理
    s = s || '';
    return s.charAt(0);
}
//它并不能处理一些复杂的判断，需要加非空断言操作符
function getFirstLetter2(s: string | null) {
    function log() {
        console.log(s!.trim());
    }
    s = s || '';
    log();
    return s.charAt(0);
}
```
### 链判断运算符
- 链判断运算符是一种先检查属性是否存在，再尝试访问该属性的运算符，其符号为 ?.
- 如果运算符左侧的操作数 ?. 计算为 undefined 或 null，则表达式求值为 undefined 。否则，正常触发目标属性访问，方法或函数调用。
```ts
a?.b; //如果a是null/undefined,那么返回undefined，否则返回a.b的值.
a == null ? undefined : a.b;

a?.[x]; //如果a是null/undefined,那么返回undefined，否则返回a[x]的值
a == null ? undefined : a[x];

a?.b(); // 如果a是null/undefined,那么返回undefined
a == null ? undefined : a.b(); //如果a.b不函数的话抛类型错误异常,否则计算a.b()的结果

a?.(); //如果a是null/undefined,那么返回undefined
a == null ? undefined : a(); //如果A不是函数会抛出类型错误
//否则 调用a这个函数
```
> 链判断运算符 还处于 stage1 阶段,TS 也暂时不支持

### 可辨识的联合类型
- 就是利用联合类型中的共有字段进行类型保护的一种技巧
- 相同字段的不同取值就是可辨识
```ts
interface WarningButton{
  class:'warning',
  text1:'修改'
}
interface DangerButton{
  class:'danger',
  text2:'删除'
}
type Button = WarningButton|DangerButton;
function getButton(button:Button){
 if(button.class=='warning'){
  console.log(button.text1);
 }
 if(button.class=='danger'){
  console.log(button.text2);
 }
}
```
### in操作符
in 运算符可以被用于参数类型的判断
```ts
interface Bird {
    swing: number;
}

interface Dog {
    leg: number;
}

function getNumber(x: Bird | Dog) {
    if ("swing" in x) {
      return x.swing;
    }
    return x.leg;
}
```
### 自定义的类型保护
- TypeScript 里的类型保护本质上就是一些表达式，它们会在运行时检查类型信息，以确保在某个作用域里的类型是符合预期的
- type is Type1Class就是类型谓词
- 谓词为 parameterName is Type这种形式,parameterName必须是来自于当前函数签名里的一个参数名
- 每当使用一些变量调用isType1时，如果原始类型兼容，TypeScript会将该变量缩小到该特定类型
```ts
function isType1(type: Type1Class | Type2Class): type is Type1Class {
    return (<Type1Class>type).func1 !== undefined;
}
interface Bird {
  swing: number;
}

interface Dog {
  leg: number;
}

//没有相同字段可以定义一个类型保护函数
function isBird(x:Bird|Dog): x is Bird{
  return (<Bird>x).swing == 2;
  //return (x as Bird).swing == 2;
}

function getAnimal(x: Bird | Dog) {
  if (isBird(x)) {
    return x.swing;
  }
  return x.leg;
}
```
### unknown
- TypeScript 3.0 引入了新的unknown 类型，它是 any 类型对应的安全类型
- unknown 和 any 的主要区别是 unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查
#### any 类型
- 在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的 顶级类型 (也被称作 全局超级类型)。
- TypeScript允许我们对 any 类型的值执行任何操作，而无需事先执行任何形式的检查
```ts
let value: any;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = Math.random;      // OK
value = null;             // OK
value = undefined;        // OK


let value: any;
value.foo.bar;  // OK
value.trim();   // OK
value();        // OK
new value();    // OK
```
#### unknown 类型
- 就像所有类型都可以被归为 any，所有类型也都可以被归为 unknown。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any）
- unknown 类型只能被赋值给 any 类型和 unknown 类型本身
```ts
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = Math.random;      // OK
value = null;             // OK
value = undefined;        // OK
value = new TypeError();  // OK


let value: unknown;

let value1: unknown = value;   // OK
let value2: any = value;       // OK
let value3: boolean = value;   // Error
let value4: number = value;    // Error
let value5: string = value;    // Error
let value6: object = value;    // Error
let value7: any[] = value;     // Error
let value8: Function = value;  // Error
```
#### 缩小 unknown 类型范围
- typeof
- instanceof
- 自定义类型保护函数
- 可以对 unknown 类型使用类型断言
```ts
const value: unknown = "Hello World";
const someString: string = value as string;
```
#### 联合类型中的 unknown 类型
在联合类型中，unknown 类型会吸收任何类型。这就意味着如果任一组成类型是 unknown，联合类型也会相当于 unknown：
```ts
type UnionType1 = unknown | null;       // unknown
type UnionType2 = unknown | undefined;  // unknown
type UnionType3 = unknown | string;     // unknown
type UnionType4 = unknown | number[];   // unknown
```
#### 交叉类型中的 unknown 类型
在交叉类型中，任何类型都可以吸收 unknown 类型。这意味着将任何类型与 unknown 相交不会改变结果类型：
```ts
type IntersectionType1 = unknown & null;       // null
type IntersectionType2 = unknown & undefined;  // undefined
type IntersectionType3 = unknown & string;     // string
type IntersectionType4 = unknown & number[];   // number[]
type IntersectionType5 = unknown & any;        // any
```
## 类型变换
### 交叉类型
交叉类型（Intersection Types）表示将多个类型合并为一个类型
```ts
interface Bird {
    name: string,
    fly(): void
}
interface Person {
    name: string,
    talk(): void
}
type BirdPerson = Bird & Person;
let p: BirdPerson = { name: 'zhufeng', fly() { }, talk() { } };
p.fly;
p.name
p.talk;
```
### typeof
可以获取一个变量的类型
```ts
//先定义类型，再定义变量
type People = {
    name:string,
    age:number,
    gender:string
}
let p1:People = {
    name:'zhufeng',
    age:10,
    gender:'male'
}
//先定义变量，再定义类型
let p1 = {
    name:'zhufeng',
    age:10,
    gender:'male'
}
type People = typeof p1;
function getName(p:People):string{
    return p.name;
}
getName(p1);
```
### 索引访问操作符
可以通过[]获取一个类型的子类型
```ts
interface Person{
    name:string;
    age:number;
    job:{
        name:string
    };
    interests:{name:string,level:number}[]
}
let FrontEndJob:Person['job'] = {
    name:'前端工程师'
}
let interestLevel:Person['interests'][0]['level'] = 2;
```
### keyof
索引类型查询操作符
```ts
interface Person{
  name:string;
  age:number;
  gender:'male'|'female';
}
//type PersonKey = 'name'|'age'|'gender';
type PersonKey = keyof Person;

function getValueByKey(p:Person,key:PersonKey){
  return p[key];
}
let val = getValueByKey({name:'zhufeng',age:10,gender:'male'},'name');
console.log(val);
```
### 映射类型
在定义的时候用in操作符去批量定义类型中的属性
```ts
interface Person{
  name:string;
  age:number;
  gender:'male'|'female';
}
//批量把一个接口中的属性都变成可选的
type PartPerson = {
  [Key in keyof Person]?:Person[Key]
}

let p1:PartPerson={};
//也可以使用泛型
type Part<T> = {
  [key in keyof T]?:T[key]
}
let p2:Part<Person>={};
```
### 内置工具类型
TS 中内置了一些工具类型来帮助我们更好地使用类型系统
|符号|	含义|
|:---:|:---:|
|+?|	变为可远|
|->|	变为必选|
#### Partial
Partial 可以将传入的属性由非可选变为可选，具体使用如下：
```ts
type Partial<T> = { [P in keyof T]?: T[P] };

interface A {
  a1: string;
  a2: number;
  a3: boolean;
}

type aPartial = Partial<A>;

const a: aPartial = {}; // 不会报错
```
#### Required
Required 可以将传入的属性中的可选项变为必选项，这里用了 -? 修饰符来实现。
```ts
//type Required<T> = { [P in keyof T]-?: T[P] };

interface Person{
  name:string;
  age:number;
  gender?:'male'|'female';
}
/**
 * type Require<T> = { [P in keyof T]-?: T[P] };
 */
let p:Required<Person> = {
  name:'zhufeng',
  age:10,
  //gender:'male'
}
```
#### Readonly
Readonly 通过为传入的属性每一项都加上 readonly 修饰符来实现。
```ts
interface Person{
  name:string;
  age:number;
  gender?:'male'|'female';
}
//type Readonly<T> = { readonly [P in keyof T]: T[P] };
let p:Readonly<Person> = {
  name:'zhufeng',
  age:10,
  gender:'male'
}
p.age = 11;
```
#### Pick
Pick 能够帮助我们从传入的属性中摘取某一项返回
```ts
interface Animal {
  name: string;
  age: number;
}
/**
 * From T pick a set of properties K
 * type Pick<T, K extends keyof T> = { [P in K]: T[P] };
 */
// 摘取 Animal 中的 name 属性
type AnimalSub = Pick<Animal, "name">; //{ name: string; }
let a:AnimalSub = {
    name:'zhufeng',
    age:10
}
```
:::tip T K P分别什么情况下使用
T 泛型类 会传过来一个类型
K keys 若干个key
P 就是个临时变量 指的是K里的每个元素
:::
#### 映射类型修饰符的控制
- TypeScript中增加了对映射类型修饰符的控制
- 具体而言，一个 readonly 或 ? 修饰符在一个映射类型里可以用前缀 + 或-来表示这个修饰符应该被添加或移除
- TS 中部分内置工具类型就利用了这个特性（Partial、Required、Readonly...），这里我们可以参考 Partial、Required 的实现
### 条件类型
- 在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活
- utility-types
#### 定义条件类型
```ts
interface Fish {
    name: string
}
interface Water {
    name: string
}
interface Bird {
    name: string
}
interface Sky {
    name: string
}
//三元运算符
type Condition<T> = T extends Fish ? Water : Sky;
let condition: Condition<Fish> = { name: '水' };
```
#### 条件类型的分发
```ts
interface Fish {
    fish: string
}
interface Water {
    water: string
}
interface Bird {
    bird: string
}
interface Sky {
    sky: string
}

type Condition<T> = T extends Fish ? Water : Sky;
//(Fish extends Fish ? Water : Sky) | (Bird extends Fish ? Water : Sky)
// Water|Sky
let condition1: Condition<Fish | Bird> = { water: '水' };
let condition2: Condition<Fish | Bird> = { sky: '天空' };
```
#### 内置条件类型
- TS 在内置了一些常用的条件类型，可以在 lib.es5.d.ts 中查看：
- infer最早出现在此 PR 中，表示在 extends 条件语句中待推断的类型变量
##### Exclude
从 T 可分配给的类型中排除 U
```ts
type  E = Exclude<string|number,string>;
let e:E = 10;
```
##### Extract
从 T 可分配的类型中提取 U
```ts
type  E = Extract<string|number,string>;
let e:E = '1';
```
##### NonNullable
从 T 中排除 null 和 undefined
```ts
type  E = NonNullable<string|number|null|undefined>;
let e:E = null;
```
##### ReturnType
获取函数类型的返回类型
```ts
function getUserInfo() {
  return { name: "zhufeng", age: 10 };
}

// 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo
type UserInfo = ReturnType<typeof getUserInfo>;

const userA: UserInfo = {
  name: "zhufeng",
  age: 10
};
type AnyFunction = (...args: any[]) => any;
type ReturnType2<T extends AnyFunction> = T extends (...args: any[]) => infer R ? R : any
```
##### Parameters
- Constructs a tuple type of the types of the parameters of a function 
type T
- Parameters
```ts
declare function f1(arg: { a: number, b: string }): void
type T0 = Parameters2<() => string>;  // []
type T1 = Parameters2<(s: string) => void>;  // [string]
type T2 = Parameters2<(<T>(arg: T) => T)>;  // [unknown]
```
```ts
type AnyFunction = (...args: any[]) => any;
//type ReturnType2<T extends AnyFunction> = T extends (...args: any[]) => infer R ? R : any;
type Parameters2<T extends AnyFunction> = T extends (...args: infer R) => any ? R : any;
```
##### InstanceType
获取构造函数类型的实例类型
InstanceType
```ts
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    getName() { console.log(this.name) }
}
type constructorParameters = ConstructorParameters<typeof Person>;
let params: constructorParameters = ['zhufeng']
type Instance = InstanceType<typeof Person>;
let instance: Instance = { name: 'zhufeng', getName() { } };
type Constructor = new (...args: any[]) => any;
type ConstructorParameters<T extends Constructor> = T extends new (...args: infer P) => any ? P : never;
type InstanceType<T extends Constructor> = T extends new (...args: any[]) => infer R ? R : any;
```
##### infer
- typescript_zh
- codesandbox
```ts
interface Action<T> {
    payload?: T
    type: string
}

class EffectModule {
    count = 1;
    message = "hello!";

    delay(input: Promise<number>) {
        return input.then(i => ({
            payload: `hello ${i}!`,
            type: 'delay'
        });
    }

    setMessage(action: Action<Date>) {
        return {
            payload: action.payload!.getMilliseconds(),
            type: "set-message"
        };
    }
}

type FuncName<T> = {
    [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type ts = FuncName<EffectModule>;

type Connect = (module: EffectModule) => { [T in FuncName<EffectModule>]: EffectModule[T] }


type TransformResultType<RT> = {
    [s in keyof RT]:
    RT[s] extends (input: Promise<infer T>) => Promise<Action<infer U>> ?
    (input: T) => Action<U> : (
        RT[s] extends (action: Action<infer T>) => Action<infer U> ? (action: T) => Action<U> : never
    )
}
type connectedResultType = ReturnType<Connect>;
type result = TransformResultType<connectedResultType>
export { };
```

## 模块VS命名空间
### 模块
- 模块是TS中外部模块的简称，侧重于代码和复用
- 模块在期自身的作用域里执行，而不是在全局作用域里
- 一个模块里的变量、函数、类等在外部是不可见的，除非你把它导出
- 如果想要使用一个模块里导出的变量，则需要导入
```ts
export const a = 1;
export const b = 2;
export default 'zhufeng';
```
```ts
import name, { a, b } from './1';
console.log(name, a, b);
```
### 命名空间
- 在代码量较大的情况下，为了避免命名空间冲突，可以将相似的函数、类、接口放置到命名空间内
- 命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象，命名空间内通过export向外导出
- 命名空间是内部模块，主要用于组织代码，避免命名冲突
#### 内部划分
```ts
export namespace zoo {
    export class Dog { eat() { console.log('zoo dog'); } }
}
export namespace home {
    export class Dog { eat() { console.log('home dog'); } }
}
let dog_of_zoo = new zoo.Dog();
dog_of_zoo.eat();
let dog_of_home = new home.Dog();
dog_of_home.eat();
```
```ts
import { zoo } from './3';
let dog_of_zoo = new zoo.Dog();
dog_of_zoo.eat();
```
## 类型声明
- 声明文件可以让我们不需要将JS重构为TS，只需要加上声明文件就可以使用系统
- 类型声明在编译的时候都会被删除，不会影响真正的代码
### 普通类型声明
```ts
declare const $: (selector: string) => { //变量
    click(): void;
    width(length: number): void;
};
$('#root').click();
console.log($('#root').width);
declare let name: string;  //变量
declare let age: number;  //变量
declare function getName(): string;  //方法
declare class Animal { name: string }  //类
console.log(name, age);
getName();
new Animal();
export default {};
```
### 外部枚举
外部枚举是使用declare enum定义的枚举类型
外部枚举用来描述已经存在的枚举类型的形状
```ts
declare enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
];
```
declare 定义的类型只会用于编译时的检查，编译结果中会被删除。上例的编译结果如下
```ts
var seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
];
```
也可以同时使用declare 和 const
```ts
declare const enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
];
```
编译结果
```ts
var seasons = [
    0 /* Spring */,
    1 /* Summer */,
    2 /* Autumn */,
    3 /* Winter */
];
```
### namespace
- 如果一个全局变量包括了很多子属性，可能使用namespace
- 在声明文件中的namespace表示一个全局变量包含很多子属性
- 在命名空间内部不需要使用 declare 声明属性或方法
```ts
declare namespace ${
    function ajax(url:string,settings:any):void;
    let name:string;
    namespace fn {
        function extend(object:any):void;
    }
}
$.ajax('/api/users',{});
$.fn.extend({
    log:function(message:any){
        console.log(message);
    }
});
export {};
```
### 类型声明文件
我们可以把类型声明放在一个单独的类型声明文件中
可以在类型声明文件中使用类型声明
文件命名规范为*.d.ts
观看类型声明文件有助于了解库的使用方式
#### jquery.d.ts
typings\jquery.d.ts
```ts
declare const $:(selector:string)=>{
    click():void;
    width(length:number):void;
}
```
#### tsconfig.json
tsconfig.json
```ts
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",  
    "outDir":"lib"
  },
  "include": [
    "src/**/*",
    "typings/**/*"
  ]
}
```
#### test.js
src\test.ts
```ts
$('#button').click();
$('#button').width(100);
export {};
```
### 第三方声明文件
可以安装使用第三方的声明文件
@types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
JavaScript 中有很多内置对象，它们可以在 TypeScript 中被当做声明好了的类型
内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准
这些内置对象的类型声明文件，就包含在TypeScript 核心库的类型声明文件中
#### 使用jquery
cnpm i jquery -S
//对于common.js风格的模块必须使用 import * as 
import * as jQuery from 'jquery';
jQuery.ajax('/user/1');
#### 安装声明文件
cnpm i @types/jquery -S
#### 自己编写声明文件
模块查找规则
`node_modules\@types\jquery/index.d.ts
我们可以自己编写声明文件并配置tsconfig.json
##### index.d.ts
types\jquery\index.d.ts
```ts
declare function jQuery(selector:string):HTMLElement;
declare namespace jQuery{
  function ajax(url:string):void
}
export default jQuery;
```
##### tsconfig.json
如果配置了paths,那么在引入包的的时候会自动去paths目录里找类型声明文件
在 tsconfig.json 中，我们通过 compilerOptions 里的 paths 属性来配置路径映射
paths是模块名到基于baseUrl的路径映射的列表
```ts
{
"baseUrl": "./",// 使用 paths 属性的话必须要指定 baseUrl 的值
"paths": {
"*":["types/*"]
}
```
#### npm声明文件可能的位置
```ts
node_modules/jquery/package.json
"types":"types/xxx.d.ts"
node_modules/jquery/index.d.ts
node_modules/@types/jquery/index.d.ts
```
### 扩展全局变量的类型
#### 扩展局部变量类型
```ts
declare var String: StringConstructor;
interface StringConstructor {
    new(value?: any): String;
    (value?: any): string;
    readonly prototype: String;
}
interface String {
    toString(): string;
}
//扩展类的原型
interface String {
    double():string;
}

String.prototype.double = function(){
    return this+'+'+this;
}
console.log('hello'.double());

//扩展类的实例
interface Window{
    myname:string
}
console.log(window.myname);
//export {} 没有导出就是全局扩展
```
#### 模块内全局扩展
types\global\index.d.ts
```ts
declare global{
    interface String {
        double():string;
    }
    interface Window{
        myname:string
    }
}

export  {}
```
### 合并声明
- 同一名称的两个独立声明会被合并成一个单一声明
- 合并后的声明拥有原先两个声明的特性
|关键字|	作为类型使用|	作为值使用|
|:---:|:---:|:---:|
|class|	yes|	yes|
|enum|	yes|	yes|
|interface|	yes|	no|
|type|	yes|	no|
|function|	no|	yes|
|var,let,const|	no|	yes|
类既可以作为类型使用，也可以作为值使用，接口只能作为类型使用
```ts
class Person{
    name:string=''
}
let p1:Person;//作为类型使用
let p2 = new Person();//作为值使用

interface Animal{
    name:string
}
let a1:Animal;
let a2 = Animal;//接口类型不能用作值
```
#### 合并类型声明
可以通过接口合并的特性给一个第三方为扩展类型声明
use.js
```ts
interface Animal{
    name:string
}
let a1:Animal={name:'zhufeng',age:10};
console.log(a1.name);
console.log(a1.age);
//注意不要加export {} ,这是全局的
types\animal\index.d.ts

interface Animal{
    age:number
}
```
#### 使用命名空间扩展类
我们可以使用 namespace 来扩展类，用于表示内部类
```ts
class Form {
  username: Form.Item='';
  password: Form.Item='';
}
//Item为Form的内部类
namespace Form {
  export class Item {}
}
let item:Form.Item = new Form.Item();
console.log(item);
```
#### 使用命名空间扩展函数
我们也可以使用 namespace 来扩展函数
```ts
function greeting(name: string): string {
    return greeting.words+name;
}

namespace greeting {
    export let words = "Hello,";
}

console.log(greeting('zhufeng'))
```
#### 使用命名空间扩展枚举类型
```ts
enum Color {
    red = 1,
    yellow = 2,
    blue = 3
}

namespace Color {
    export const green=4;
    export const purple=5;
}
console.log(Color.green)
```
#### 扩展Store
```ts
import { createStore, Store } from 'redux';
type StoreExt = Store & {
    ext: string
}
let store: StoreExt = createStore(state => state);
store.ext = 'hello';
```
### 生成声明文件
把TS编译成JS后丢失类型声明，我们可以在编译的时候自动生成一份JS文件
```ts
{
  "compilerOptions": {
     "declaration": true, /* Generates corresponding '.d.ts' file.*/
  }
}
```



































## Type annotations
```js
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";
let user = [0, 1, 2];

document.body.textContent = greeter(user);
```

## Interfaces
- 接口和使用时的数据的内部结构一样即可使用
```js
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.textContent = greeter(user);

```

## Classes
- 公共字段，私有字段
```js
class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.textContent = greeter(user);
```




















