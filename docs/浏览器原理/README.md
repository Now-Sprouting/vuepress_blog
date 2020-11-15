# 浏览器中的 JavaScript 执行机制
## 变量提升
先看如下代码
```js
sayHello()
console.log(myname)
var myname = 'Ding'
function sayHello() {
    console.log('Hello World');
}
```
执行结果
```js
Hello World
undefined
```
出现上面这种情况的原因就是浏览器的**变量提升**机制<br/>
:::tip
所谓的变量提升，是指在 JavaScript 代码执行过程中,JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”
:::
上述代码变量提升后
```js
// 变量提升部分
var myname = undefined
function sayHello() {
    console.log('Hello World');
}

// 可执行代码部分
sayHello()
console.log(myname)
myname = 'Ding'
```
虽然函数和变量在执行之前都提升到了代码开头,但实际上变量和函数声明在代码里的位置是不会改变的，而且是在**编译阶段**被 `JavaScript` 引擎放入内存中,编译阶段会生成两部分内容---**执行上下文** 和 **可执行代码**<br/>
执行上下文是 `JavaScript` 执行一段代码时的运行环境<br/>
上面变量提升部分内容就是 **执行上下文**
```js
// 执行上下文
var myname = undefined
function sayHello() {
    console.log('Hello World');
}
```
可执行代码
```js
sayHello()
console.log(myname)
myname = 'Ding'
```
不是所有代码都会进行编译后创建执行上下文,只有下面三种代码才会在执行之前就进行编译并创建执行上下文<br/>
- 当 JavaScript 执行全局代码的时候，会编译全局代码并创建全局执行上下文，而且在整个页面的生存周期内，全局执行上下文只有一份。
- 调用一个函数的时候，函数体内的代码会被编译,并创建函数执行上下文,函数执行结束之后，创建的函数执行上下文会被销毁。
- 使用 eval 函数时

## 调用栈
调用栈就是用来管理函数调用关系的一种数据结构,看如下代码
```js
var a = 2
function add() {
    var b = 10
    return  a+b
}
add()
```
有了上面执行上下文的概念基础上我们看一下这个代码<br/>
1.首先全部代码进入编译阶段,生成**全局执行上下文**和**可执行代码**,并且压入到**调用栈**中
```js
// 全局执行上下文
var a = undefined
function add() {}
// 可执行代码
a = 2
add()
```
2.当执行可执行代码并调用函数 `add()`的时候,创建**add 函数执行上下文**并入栈
```js
// add 函数执行上下文
var b = undefined
// 可执行代码
b = 10
return a + b
```
3.执行完 add()函数,该函数的执行上下文就会从栈顶弹出<br/>
以上就是调用栈的大体流程<br/>
在平时调试时我们可以通过**断点**的方式在浏览器控制台右方的 `Call Stack` 中查看调用栈信息,也可以通过 `console.trace()` 打调用栈信息

## 变量环境和词法环境
在 ES6 之前不存在 `let` 和 `const` 的时候,所有的变量都是存储在执行上下文中的**变量环境**中的,也就是说 `JavaScript` 引擎是通过变量环境实现函数级作用域的,那么 ES6 之后引出的块级作用域后 `JavaScript` 引擎是如何实现块级作用域的支持呢?
```js

function foo(){
    var a = 1
    let b = 2
    {
      let b = 3
      var c = 4
      let d = 5
      console.log(a)
      console.log(b)
    }
    console.log(b) 
    console.log(c)
    console.log(d)
}   
foo()
```



