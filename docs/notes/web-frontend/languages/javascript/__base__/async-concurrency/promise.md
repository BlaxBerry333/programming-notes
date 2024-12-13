# JavaScript Promise

Promise 是 JavaScript 中实现异步编程的一种方案

<!--
Promise 是一个对象 ( 一个包含有异步任务逻辑的容器 )

## 执行状态

Promise 对象有 3 个状态，分别对应其处理的异步任务的执行状态

|    状态     | 说明                    |
| :---------: | ----------------------- |
|  `pending`  | 待定 ( 初始的待定状态 ) |
| `fulfilled` | 异步任务完成            |
| `rejected`  | 异步任务被拒绝 ( 失败 ) |

## 创建对象

### 构造函数

可通过内置构造器函数处理异步任务，并通过关键字`new`创建该异步任务的 Promise 实例对象

构造器函数接收一个执行器函数为参数，内部可根据自定义条件决定异步任务的成功与否

```js
const Promise实例对象 = new Promise((resolve, reject) => {
  // ...
  if (异步任务成功的条件) {
    resolve(成功时的返回值);
  } else {
    reject(失败时的返回值);
  }
});
```

---

### Promise.resolve( )

创建一个成功状态的 Promise 对象

```js
const Promise实例对象 = Promise.resolve(成功时的返回值);

// 等价于
const Promise实例对象 = new Promise((resolve) => resolve(成功时的返回值));
```

---

### Promise.reject( )

创建一个失败状态的 Promise 对象

```js
const Promise实例对象 = Promise.reject(失败时的返回值);

// 等价于
const Promise实例对象 = new Promise((_, reject) => reject(失败时的返回值));
```

## 链式调用

Promise 对象的原型方法`then()`与`catch()`返回的是一个 Promise 对象，所以可进行链式调用

```js{0}
Promise实例对象
  .then((成功时的返回值) => {
    // ...
    return 向后传递的值;
  })
  .then((成功时的返回值) => {
    // ...
  })
  .catch((失败时的返回值) => {
    // ...
    return 向后传递的值;
  })
  .catch((失败时的返回值) => {
    // ...
  })
  .finally(() => {
    // ...
  });
```

## 同时执行多个任务

### Promise.all( )

- 会等待所有异步任务的完成后才会执行后续同步任务
- 异步任务中只要有一个失败则立刻结束不再执行其他未完成的异步任务

```js
const Promise实例对象 = Promise.all([异步任务1, 异步任务2, 异步任务3]);
```

::: details 例子：验证会等待所有异步任务的完成后才会执行后续同步任务

```js{0}
const asyncJob1 = new Promise((resolve) => setTimeout(() => resolve("aaa"), 3000));
const asyncJob2 = new Promise((resolve) => setTimeout(() => resolve("bbb"), 2000));
const asyncJob3 = new Promise((resolve) => setTimeout(() => resolve("ccc"), 1000));

Promise.all([asyncJob1, asyncJob2, asyncJob3])
  .then((results) => console.log(results))
  .catch((error) => console.error(error));

// 等待 3s 后打印 ["aaa", "bbb", "ccc"]
```

:::

::: details 例子：异步任务中只要有一个失败则立刻结束不再执行其他未完成的异步任务

```js
Promise.all([
  Promise.resolve("aa"),
  Promise.resolve("bb"),
  Promise.resolve("cc"),
])
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
// [ "aa", "bb", "cc", "dd" ]

Promise.all([
  Promise.resolve("aa"),
  Promise.reject("bb"),
  Promise.resolve("cc"),
  Promise.resolve("dd"),
])
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
// "bb"
```

:::

---

### Promise.allSettled( )

- 会等待所有异步任务的完成后才会执行后续同步任务
- 异步任务无论成功失败都会等待全部结束

```js
const Promise实例对象 = Promise.allSettled([异步任务1, 异步任务2, 异步任务3]);
```

::: details 例子：验证会等待所有异步任务都完成

```js{0}
const asyncJob1 = new Promise((resolve) => setTimeout(() => resolve("aaa"), 3000));
const asyncJob2 = new Promise((resolve) => setTimeout(() => resolve("bbb"), 2000));
const asyncJob3 = new Promise((resolve) => setTimeout(() => resolve("ccc"), 1000));

Promise.allSettled([asyncJob1, asyncJob2, asyncJob3])
  .then((results) => console.log(results))
  .catch((error) => console.error(error));

// 等待 3s 后打印
// [
//   { status: "fulfilled", value: "aaa" },
//   { status: "fulfilled", value: "bbb" },
//   { status: "fulfilled", value: "ccc" },
// ];
```

:::

::: details 例子：验证异步任务无论成功失败都会等待全部结束

```js
Promise.allSettled([
  Promise.resolve("aa"),
  Promise.resolve("bb"),
  Promise.resolve("cc"),
])
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
// [
//   { status: "fulfilled", value: "aaa" },
//   { status: "fulfilled", value: "bbb" },
//   { status: "fulfilled", value: "ccc" },
// ];

Promise.allSettled([
  Promise.resolve("aa"),
  Promise.reject("bb"),
  Promise.reject("cc"),
  Promise.resolve("dd"),
])
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
// [
//   { status: "fulfilled", value: "aaa" },
//   { status: "rejected", value: "bbb" },
//   { status: "rejected", value: "ccc" },
//   { status: "fulfilled", value: "dd" },
// ];
```

:::

---

### Promise.race( )

- 会等待所有异步任务中第一个完成的任务
- 异步任务无论成功失败都只返回第一个完成的

```js
const Promise实例对象 = Promise.race([异步任务1, 异步任务2, 异步任务3]);
```

::: details 例子：验证会等待所有异步任务中第一个完成的任务

```js{0}
const asyncJob1 = new Promise((resolve) => setTimeout(() => resolve("aaa"), 3000));
const asyncJob2 = new Promise((resolve) => setTimeout(() => resolve("bbb"), 2000));
const asyncJob3 = new Promise((resolve) => setTimeout(() => resolve("ccc"), 1000));

Promise.race([asyncJob1, asyncJob2, asyncJob3])
  .then((results) => console.log(results))
  .catch((error) => console.error(error));

// 等待 1s 后打印 "ccc"
```

:::

::: details 例子：验证异步任务无论成功失败都只返回第一个完成的

```js{0}
Promise.race([
  Promise.resolve("aa"),
  Promise.resolve("bb"),
  Promise.resolve("cc"),
])
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
// "aa"

Promise.race([
  Promise.reject("aa"),
  Promise.resolve("bb"),
  Promise.reject("cc"),
  Promise.resolve("dd"),
])
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
// "aa"
```

::: -->
