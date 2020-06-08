# 1:HTML4和HTML5的不同

## 声明方面

HTML5 文件类型声明（<!DOCTYPE>）变成下面的形式：

```html
<!DOCTYPE html>
```

## 标准方面

HTML5的文档解析不再基于SGML(Standard Generalized Markup Language)标准，而是形成了自己的一套标准。

## 标签方面

1. 新增的结构元素:

```html
<header>,<footer>,<section>,<article>,<aside>,<nav>
```

2. 新增的功能元素:

```html
<figure>,<video>,<audio>,<embed>,<mark>,<time>
```

3. 废除的元素:

```html
<big>,<center>,<font>,<u>,<basefont>,<s>,<tt>
```

::: tip

HTML5主张用CSS3来呈现文本效果

:::

## 属性方面

1. input表单新增属性属性:

```html
<!-- 限制用户必须输入email类型 -->
<input type="email" >
<!-- 限制用户必须输入url类型  -->
<input type="url" >
<!-- 限制用户必须输入number类型，默认会有上下两个按钮 -->
<input type="number" >
<!-- 限制用户必须输入日期类型，但目前只有 Opera和Chrome支持 -->
<input type="date" >
<!-- 限制用户必须输入时间类型 -->
<input type="time" >
<!-- 限制用户必须输入月类型 -->
<input type="month" >
<!-- 限制用户必须输入周类型 -->
<input type="week" >
<!-- 手机号码 -->
<input type="tel" >
<!-- 搜索框 -->
<input type="serach" >
<!-- 生成一个颜色表单 -->
<input type="color" >
<!-- 表单拥有该属性表示其内容不能为空,必填 -->
<input type="text" required >
<!-- 提示文本,表单的提示信息 -->
<input type="text" placeholder="请输入密码" >
<!-- 自动聚焦属性,页面加载完成自动聚焦到指定表单 -->
<input type="text" autofocus >
```
::: warning

当某input输入框含有required属性时,该输入框失去焦点时不会触发required提示,只有当点击提交表单按钮时才会触发required提示

:::

2. 其他标签新增属性:

```html
<!-- meta标签增加charset属性 -->
<meta charset="utf-8">
<!-- script标签增加async属性 -->
<script async></script>
```

3. 使部分属性名默认具有boolean属性:

```html
<!-- 只写属性名默认为true -->
<input type="text" autofocus/>
等价于
<input type="text" autofocus="autofocus"/>
```

## 存储方面
1. 新增WebStorage, 包括localStorage和sessionStorage

2. 引入了IndexedDB和Web SQL，允许在浏览器端创建数据库表并存储数据, 两者的区别在于IndexedDB更像是一个NoSQL数据库，而WebSQL更像是关系型数据库。W3C已经不再支持WebSQL。

3. 引入了应用程序缓存器(application cache)，可对web进行缓存，在没有网络的情况下使用，通过创建cache manifest文件,创建应用缓存，为PWA(Progressive Web App)提供了底层的技术支持。

::: tip
以上文档如有错误请联系我进行改进
:::


:saxophone: 以上文档部分借阅于"神三元的博客"








