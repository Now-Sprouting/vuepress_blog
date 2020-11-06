# 1:JSX 的本质
## 什么是JSX?
在 React 中, 你一定熟悉这种语法
``` JS
class App extends React.Component {
    constructor() {
        super();
        this.state = 
        }
    }
    render() {
        return (
            <div>
                <div class="header">
                    <h1 title="标题">我是标题</h1>
                </div>
                <div class="content">
                    <h1 title="内容">我是内容</h1>
                    <button>按钮1</button>
                    <button>按钮2</button>
                </div>
                <div class="footer">
                    <h1 title="底部">我是底部</h1>
                </div>
            </div>
        )
    }
}
```
在 render 函数中 return 的这部分就是 `JSX` 语法

## JSX 实际上是 React.createElement 的语法糖
我们可以去 bable 官网上 `试一试`, 我们把 return 中的 `JSX` 粘贴到 babel 官网上, 勾选出 react 我们就会发现 `JSX`被转换成了另一种写法, 准换如下:
``` JS
return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "header"
}, /*#__PURE__*/React.createElement("h1", {
    title: "\u6807\u9898"
}, "\u6211\u662F\u6807\u9898")), /*#__PURE__*/React.createElement("div", {
    className: "content"
}, /*#__PURE__*/React.createElement("h2", null, "\u6211\u662F\u9875\u9762\u7684\u5185\u5BB9/*#__PURE__*/React.createElement("button", null, "\u6309\u94AE"), /*#__PURE__*/RecreateElement("button", null, "+1"), /*#__PURE__*/React.createElement("a", {
    href: "http://www.baidu.com"
}, "\u767E\u5EA6\u4E00\u4E0B")), /*#__PURE__*/React.createElement("div", {
    className: "footer"
}, /*#__PURE__*/React.createElement("p", null, "\u6211\u662F\u5C3E\u90E8\u7684\u5185\u5BB9")));
```
`/*#__PURE__*/`是一些注释, 我们把它去除掉
```JS
return React.createElement("div", null, React.createElement("div", {
    className: "header"
}, React.createElement("h1", {
    title: "\u6807\u9898"
}, "\u6211\u662F\u6807\u9898")), React.createElement("div", {
    className: "content"
}, React.createElement("h2", null, "\u6211\u662F\u9875\u9762\u7684\u5185\u5BB9"), RecreateElement("button", null, "\u6309\u94AE"), React.createElement("button", null, "+1React.createElement("a", {
    href: "http://www.baidu.com"
}, "\u767E\u5EA6\u4E00\u4E0B")), React.createElement("div", {
    className: "footer"
}, React.createElement("p", null, "\u6211\u662F\u5C3E\u90E8\u7684\u5185\u5BB9")));
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
经过查阅, React 利用 ReactElement 对象组成了一个 JavaScript 的对象树；而这个 JavaScript 的对象树就是传说中的 `虚拟DOM` (Virtual DOM) 关于虚拟 DOM 请参考 [X:虚拟 DOM -  ReactElement](./#ReactElement)

## 总结
通过对上面知识点的理解, 我们不难总结出从编写 React 的 JSX 代码到具体实现页面的逻辑为:<br/>
JSX ---> 经过babel转化 ---> React.createElement() ---> JS 对象树(虚拟DOM)  ---> React.render()函数映射出浏览器识别的真实DOM
