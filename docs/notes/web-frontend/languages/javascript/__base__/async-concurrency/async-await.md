# JavaScript Async / Await

关键字`async`、`await`是 Generator 的语法糖

可以用接近同步编程的写法去实现异步编程

::: code-group

```js [普通函数]
async function 函数() {
  // ...
  await 异步任务;
  // ...
}
```

```js [箭头函数]
const 函数 = async () => {
  // ...
  await 异步任务;
  // ...
};
```

:::
::: details 例子：用`async`、`await`、Promise 实现自定义延时逻辑

```js{0}
async function delay(callback, time) {
  await new Promise((resolve) => setTimeout(resolve, time));
  callback();
}

delay(() => console.log("xxx"), 0);     // 立即打印 "xxx"
delay(() => console.log("yyy"), 1000);  // "xxx" 打印结束后等待 1s 打印 "yyy"
delay(() => console.log("zzz"), 2000);  // "xxx" 打印结束后等待 2s 打印 "zzz"
```
