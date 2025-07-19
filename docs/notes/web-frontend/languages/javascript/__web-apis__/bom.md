# JavaScript BOM

> Browser Object Model ( BOM, 浏览器对象模型 )

主要用于操作浏览器窗口

## 浏览器窗口的尺寸

```js
const 浏览器可视窗口的高度 = window.innerHeight;

const 浏览器可视窗口的宽度 = window.innerWidth;
```

## 浏览器卷去的尺寸

```js
const 浏览器卷去的高度 =
  document.documentElement.scrollTop || document.body.scrollTop;

const 浏览器卷去的宽度 =
  document.documentElement.scrollLeft || document.body.scrollLeft;
```

## 浏览器弹出框

```js
// 提示信息弹出框
window.alert("提示信息");

// 询问弹出框
const 布尔值 = window.confirm("提示信息");

// 输内容弹出框
const 输入的字符串 = window.prompt("提示信息");
```

## 浏览器页面标签

```js
// 打开一个新的浏览器标签
window.open("地址");

// 关闭当前的浏览器标签
window.close();
```

## 浏览器页面滚动

```js
// 瞬间定位指定位置
window.scrollTo(浏览器卷去的宽度, 浏览器卷去的高度);

// 平滑滚动到指定位置
window.scrollTo({
  left: 浏览器卷去的宽度,
  top: 浏览器卷去的高度,
  behavior: "smooth",
});
```

## 浏览器历史记录

```js
// 回退一个历史记录
window.history.back();

// 前进一个历史记录
window.history.forward();
```

## 浏览器监听事件

```js
// 资源加载完毕后触发
window.onload = () => {
  // ...
};

// 可视窗口的尺寸改变时触发
window.onresize = () => {
  // ...
};

// 滚动条位置改变时触发
window.onscroll = () => {
  // ...
};
```

## 定时器

::: code-group

```js [间隔定时器]
// 定义
const 间隔定时器对象 = setInterval(() => {
  // ...
}, 间隔毫秒);

// 关闭
clearInterval(间隔定时器对象);
```

```js [延时定时器]
// 定义
const 间隔定时器对象 = setTimeout(() => {
  // ...
}, 延时毫秒);

// 关闭
clearTimeout(间隔定时器对象);
```

:::
