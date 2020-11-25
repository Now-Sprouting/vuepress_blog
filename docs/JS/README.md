# 1:数据类型
## 基本数据类型
**常见基本数据类型**<br>
``` javascript
let a //Undefined
let s = 'abc' //String
let n = 100  //Number
let b = true //Bollean
let s = Symbol('s') //Symbol
```

**具体案例**
``` javascript
let a = 100;
let b = a;
a = 200;
console.log(b);   //100  
```

## 引用型
**常见的引用类型**
``` javascript
let obj = {name:'tom',age:10}; //对象
let arr = [1,2,3]; //数组
let n = null //特殊引用类型,其指针指向为空地址
```

**具体案例**
``` javascript
let a = {age:20};
let b = a;
b.age = 22;
console.log(a.age); //22     
```

**为什么值类型和引用类型一定要按照上面的方式存储?**

这是因为 `JavaScript` 引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了话，所有的数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而又影响到整个程序的执行效率。<br/><br/>
比如某个函数执行结束了，`JavaScript` 引擎需要离开当前的执行上下文，只需要将指针下移到上个执行上下文的地址就可以了，如果
该函数没有产生闭包,那么该函数执行上下文栈区空间全部回收


## 数据类型检测方法
### typeof运算符
- typeof可以判断出所有值类型(可以判断出具体的Undefined,String,Number,Boolean)

- typeof可以判断出函数

``` javascript
typeof console.log //function
typeof function fn(){} //function
```

- typeof能识别引用数据类型(不能继续识别)

``` javascript
typeof null //object
typeof [1,2,3] //object
typeof {x:100} //object
```
:::tip
null的类型是object，这是由于历史原因造成的。1995年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑null，只把它当作object的一种特殊值。后来null独立出来，作为一种单独的数据类型，为了兼容以前的代码，typeof null返回object就没法改变了。---参考阮一峰的JavaScript教程
:::

### instanceof
`instanceof`运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置<br/>
底层机制:所有出现在其原型链上面的类检测结果都是 true
```js
console.log(12 instanceof Number); /* false */
console.log(new Number(12) instanceof Number); /* true */
console.log([] instanceof Array); /* true */
console.log([] instanceof Object); /* true */
```
`instanceof` 检查数据类型的局限性<br/>
- 基本数据类型无法检测<br/>
- 由于可以通过 __proto__ 和 prototype 更改, 所以结果不一定不一定是准确的

### Object.prototype.toString()
Object 的原型上的 toString方法可以检查出所有数据类型
```js
Object.prototype.toString.call(10) /* "[object Number]" */
Object.prototype.toString.call(true) /* "[object Boolean]" */
Object.prototype.toString.call('Ding') /* "[object String]" */
Object.prototype.toString.call(Symbol('s')) /* "[object Symbol]" */
Object.prototype.toString.call(undefined) /* "[object Undefined]" */

Object.prototype.toString.call([]) /* "[object Array]" */
Object.prototype.toString.call({}) /* "[object Object]" */
Object.prototype.toString.call(null) /* "[object Null]" */
```
### JQuery 源码中检测数据类型方法
```js
function toType( obj ) {
    if ( obj == null ) {
        return obj + "";
    }
    return (typeof obj === "object" || typeof obj === "function") ? Object.prototype.toString.call(obj) : typeof obj;
}
let a = [1, 2, 3, 4]
console.log(toType(a));
```








