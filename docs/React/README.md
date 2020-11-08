# 1:JSX 的本质
## 什么是JSX?
在 React 中, 你一定熟悉这种语法
``` JS
class App extends React.Component {
    constructor() {
        super();
        this.state = {
        
        }
    }
    render() {
        return (
          <div id="main" class="main">
              <div class="header">
                  <p>This is Header</p>
              </div>
              <div class="content">
                  <p>This is Content</p>
              </div>
              <div class="footer">
                  <p>This is Footer</p>
              </div>
          </div>
        )
    }
}
// 渲染组件
ReactDOM.render(<App/>, document.getElementById('app'))
```
在 render 函数中 return 的这部分就是 `JSX` 语法

## JSX 实际上是 React.createElement 的语法糖
我们可以去 bable 官网上 `试一试`, 我们把 return 中的 `JSX` 粘贴到 babel 官网上, 勾选出 react 我们就会发现 `JSX`被转换成了另一种写法, 转换如下:
``` JS
React.createElement("div", {
  id: "main",
  class: "main"
}, React.createElement("div", {
  class: "header"
}, React.createElement("p", null, "This is Header")), React.createElement("div", {
  class: "content"
}, React.createElement("p", null, "This is Content")), React.createElement("div", {
  class: "footer"
}, React.createElement("p", null, "This is Footer")));
```
可以观察出代码中包含大部分的 `React.createElement` 实际上 `JSX` 就是 `React.createElement`函数的语法糖, 语法糖的含义就是这种语法可以让你尝到甜头, <br/>
::: tip
因为早期 `React` 无 `JSX` 的版本, 只能通过`React.createElement`这种形式编写`React`代码<br/>
而现在的版本 `JSX` 通过 babel 就会转换成 `React.createElement` 的形式, 这也是为什么我们在不使用`React`脚手架:`create-react-app`的情况下编写 React 代码 都要引入 babel 的原因
:::
```JS
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
// 在不使用 React 脚手架的情况下编写 React 代码要引入 babel
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```
## 从 React 源码中分析 React.createElement
我们可以在在 React 源码的 ReactElement 中找到 `createElement` 函数,去掉一些 DEV 模式下的提示代码和注释后,得到以下代码
```JS
export function createElement(type, config, children) {
  let propName;

  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```
从源码中不难看出 `createElement` 需要传递三个参数：
::: tip
- 参数一 type:
当前 `ReactElement` 的类型；
如果是标签元素，那么就使用字符串表示 `div`
如果是组件元素，那么就直接使用组件的名称
- 参数二 config:
所有 `JSX` 中的属性都在 `config` 中以对象的属性和值的形式存储
- 参数三 children:
存放在标签中的内容，以 `children` 数组的方式进行存储；
:::

## ReactElement
通过上面的源码中我们可以看到 createElement 函数最终返回的结果为下面的代码
``` JS
return ReactElement(
  type,
  key,
  ref,
  self,
  source,
  ReactCurrentOwner.current,
  props,
);
```
经过查阅, React 利用 ReactElement 对象组成了一个 JavaScript 的对象树；而这个 JavaScript 的对象树就是传说中的 `虚拟DOM` (Virtual DOM), 而虚拟DOM 正是通过 `ReactDOM` 的 `render` 函数渲染出真实的 `DOM`,如下代码
```js
ReactDOM.render(<App/>, document.getElementById('app'))
```

## 总结
通过对上面知识点的理解, 我们不难总结出从编写 React 的 JSX 代码到具体实现页面的逻辑为:<br/>
JSX ---> 经过babel转化 ---> React.createElement() ---> JS 对象树(虚拟DOM)  ---> ReactDOM.render()函数映射出浏览器识别的真实DOM
