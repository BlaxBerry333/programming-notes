# JavaScript Promise

Promise 是 JavaScript 中实现异步编程的一种方案

## Promise 对象

Promise 对象是一个内置构造函数

- 可通过关键字`new`创建一个 Promise 实例
- 还可通过其静态方法快速创建一个或者组合多个 Promise 实例

---

### 构造函数

通过关键字`new`实例化 Promise 构造函数来创建一个 Promise 实例对象

```js
const 实例对象 = new Promise((resolve, reject) => {
  // ...
  if (异步任务成功的条件) {
    resolve(成功时的返回值);
  } else {
    reject(失败时的返回值);
  }
});
```

::: details 例子：用 Promise 模拟成功与失败的场合

```js{0}
function mockMission(flag) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag) resolve("AAA");
      else reject("BBB");
    }, 1000);
  });
}

mockMission(true)
  .then((result) => console.log(result))    // 1s 后打印出 "AAA"
  .catch((reason) => console.log(reason));

mockMission(false)
  .then((result) => console.log(result))
  .catch((reason) => console.log(reason));  // 1s 后打印出 "BBB"
```

:::

---

### Promise.resolve( )

`Promise.resolve()`是 Promise 对象的静态方法

用于创建一个成功状态的 Promise 实例 ( 等同于构造函数的参数执行器函数的第一个参数 )

```js
const 实例对象 = Promise.resolve(返回值);
```

---

### Promise.reject( )

`Promise.reject()`是 Promise 对象的静态方法

用于创建一个失败状态的 Promise 实例 ( 等同于构造函数的参数执行器函数的第二个参数 )

```js
const 实例对象 = Promise.reject(返回值);
```

---

### Promise.all( )

`Promise.all()`是 Promise 对象的静态方法

用于同时处理多个 Promise 实例

- 参数接收一组 Promise 实例 ( 异步任务 )
- 等所有任务处理结束后才返回一个 Promise 实例
  - 参数中任务处理若全部成功，则返回的 Promise 实例为成功状态<br/>返回值为一个数组形式包含的所有任务的返回值
  - 参数中任务处理若出现失败时，则返回的 Promise 实例为失败状态<br/>返回值为失败任务的返回值

```js{0}
Promise.all([实例对象1, 实例对象2, 实例对象3])
  .then((result) => console.log(result))
  .catch((reason) => console.log(reason))
```

::: details 例子：验证`Promise.all()`的执行时机以及返回值

```js{0}
function missionGenerator(message, delay, flag) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag === "failed") reject(message);
      else resolve(message);
    }, delay);
  });
}

const a = missionGenerator('A', 1000);
const b = missionGenerator('B', 2000);
const c = missionGenerator('C', 3000);
const d = missionGenerator('D', 4000, "failed");

Promise.all([a, b, c])
  .then(result => console.log(result))      // 3000ms 后打印 ["A", "B", "C"]
  .catch(reason => console.log(reason));

Promise.all([c, b, a])
  .then(result => console.log(result))      // 3000ms 后打印 ["C", "B", "A"]
  .catch(reason => console.log(reason));

Promise.all([a, b, c, d])
  .then(result => console.log(result))
  .catch(reason => console.log(reason));    // 4000ms 后打印 "D"

Promise.all([d, c, b, a])
  .then(result => console.log(result))
  .catch(reason => console.log(reason));    // 4000ms 后打印 "D"
```

:::

---

### Promise.race( )

`Promise.race()`是 Promise 对象的静态方法

用于同时处理多个 Promise 实例

- 参数接收一组 Promise 实例 ( 异步任务 )
- 等任务处理中有结束的就直接返回一个 Promise 实例
  - 参数中第一个完成的任务若成功处理，则返回的 Promise 实例为成功状态<br/>返回值为该成功任务的返回值
  - 参数中第一个完成的任务若失败，则返回的 Promise 实例为失败状态<br/>返回值为该失败任务的返回值

```js{0}
Promise.race([实例对象1, 实例对象2, 实例对象3])
  .then((result) => console.log(result))
  .catch((reason) => console.log(reason))
```

::: details 例子：验证`Promise.race()`的执行时机以及返回值

```js{0}
function missionGenerator(message, delay, flag) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag==="failed") reject(message);
      else resolve(message);
    }, delay);
  });
}

const a = missionGenerator('A', 1000);
const b = missionGenerator('B', 2000);
const c = missionGenerator('C', 3000);
const d = missionGenerator('D', 1000, "failed");

Promise.race([a, b, c])
  .then(result => console.log(result))      // 1000ms 后打印 "A"
  .catch(reason => console.log(reason));

Promise.race([c, b, a])
  .then(result => console.log(result))      // 1000ms 后打印 "A"
  .catch(reason => console.log(reason));

Promise.race([b, c, d])
  .then(result => console.log(result))
  .catch(reason => console.log(reason));    // 1000ms 后打印 "D"

Promise.race([d, c, b])
  .then(result => console.log(result))
  .catch(reason => console.log(reason));    // 1000ms 后打印 "D"
```

:::

---

### Promise.allSettled( )

`Promise.allSettled()`是 Promise 对象的静态方法

用于同时处理多个 Promise 实例

- 参数接收一组 Promise 实例 ( 异步任务 )
- 等所有任务处理结束后才返回一个成功状态的 Promise 实例
- 返回值仅可链式调用实例方法`then()`并通过第一个参数回调函数的参数获取一个对象数组，该数组包含所有任务的处理结果
  - 成功的任务的对象为: `{ status: "fulfilled", value: 该实例传递的值 }`
  - 失败的任务的对象为: `{ status: "fulfilled", reason: 该实例传递的值 }`

```js{0}
Promise.allSettled([实例对象1, 实例对象2, 实例对象3])
  .then((results) => console.log(results))
```

::: details 例子：验证`Promise.allSettled()`的执行时机以及返回值

```js{0}
function missionGenerator(message, delay, flag) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag==="failed") reject(message);
      else resolve(message);
    }, delay);
  });
}

const a = missionGenerator('A', 1000);
const b = missionGenerator('B', 2000);
const c = missionGenerator('C', 3000, "failed");

Promise.allSettled([a, b])
  .then(result => console.log(result))      // 2000ms 后打印 [{ status: "fulfilled", value: "A" }, { status: "fulfilled", value: "B" }]
  .catch(reason => console.log(reason));

Promise.allSettled([b, a])
  .then(result => console.log(result))      // 2000ms 后打印 [{ status: "fulfilled", value: "B" }, { status: "fulfilled", value: "A" }]
  .catch(reason => console.log(reason));

Promise.allSettled([b, c])
  .then(result => console.log(result))
  .catch(reason => console.log(reason));    // 3000ms 后打印 [{ status: "fulfilled", value: "B" }, { status: "rejected", reason: "C" }]

Promise.allSettled([c, b])
  .then(result => console.log(result))
  .catch(reason => console.log(reason));    // 3000ms 后打印 [{ status: "rejected", reason: "C" }, { status: "fulfilled", value: "B" }]
```

:::

## Promise 实例

Promise 实例是一个具体的异步任务

- 异步任务的执行有状态
- 支持链式调用

> [!IMPORTANT] Promise 实例的 3 个状态
>
> - `pending` : 待定 ( 初始状态 )
> - `fulfilled`: 异步任务完成 ( 成功 )
> - `rejected` : 异步任务被拒绝 ( 失败 )

---

### then( )

> Promise.prototype.then( )

`then()`是 Promise 实例的方法

- 参数接收两个可选的回调函数，分别在异步任务成功与失败时执行
  - 回调函数的返回值为普通值时：`then()`返回一个成功状态的 Promise 实例
  - 回调函数的返回值为 Promise 实例时：`then()`返回该状态的 Promise 实例
- 返回值为一个新的 Promise 实例，所以可链式调用其他实例方法

```js{0}
实例对象.then(
  (result) => { /* 任务成功时执行，result 为成功时的返回值 */ },
  (reason) => { /* 任务失败时执行，reason 为拒绝(失败)时的返回值 */ },
);

实例对象
  .then((result) => { /* ... */ })
  .then((result) => { /* ... */ })
  .catch((reason) => { /* ... */ })
  .finally(() => { /* ... */ });
```

::: details 例子：验证`then()`的链式调用，以及值穿透

```js{0}
Promise.resolve(100)
  .then((result) => console.log(result))        // 100
  .then((result) => console.log(result))        // undefined
  .then((result) => console.log(result));       // undefined

Promise.resolve(100)
  .then((result) => (result += 1))
  .then((result) => (result += 100))
  .then((result) => console.log(result))        // 201
  .then((result) => console.log(result))        // undefined
  .then((result) => console.log(result));       // undefined
```

:::

::: details 例子：验证`then()`中回调函数返回值类型对`then()`整体返回值的影响

> 第一个参数没什么可说的，倒是第二个参数容易产生歧义

```js{0}
/*
then 的参数回调函数返回普通值
then 返回成功状态的 Promise 实例
*/
Promise.reject(100)
  .then(undefined, (reason) => (reason += 1))
  .then((result) => console.log(result));             // 101

/*
then 的参数回调函数返回普通值
then 返回成功状态的 Promise 实例，没有失败不进入 catch
*/
Promise.reject(100)
  .then(undefined, (reason) => (reason += 1))
  .catch((result) => console.log(result));            // 不执行

/*
then 的参数回调函数返回失败状态 Promise 实例
then 返回该 Promise 实例，失败状态仅仅进入 catch
*/
Promise.reject(100)
  .then(undefined, (reason) => Promise.reject(reason += 100))
  .then(undefined, (reason) => console.log(reason))   // 不执行

/*
then 的参数回调函数返回失败状态 Promise 实例
then 返回该 Promise 实例，失败状态仅仅进入 catch
*/
Promise.reject(100)
  .then(undefined, (reason) => Promise.reject(reason += 100))
  .catch((result) => console.log(result));            // 200
```

:::

---

### catch( )

> Promise.prototype.catch( )

`catch()`是 Promise 实例的方法

- 参数接收一个回调函数，在异步任务失败时执行 ( 等同于实例方法[`then()`](#then)的第二个参数 )
- 返回值为一个新的 Promise 实例，所以可链式调用其他实例方法
  - 回调函数的返回值为失败状态的 Promise 实例对象时才进入下一个`catch()`

```js{0}
实例对象.catch((reason) => {
  /* 任务失败时执行，reason 为拒绝(失败)时的返回值 */
});

实例对象
  .then((result) => { /* ... */ })
  .then((result) => { /* ... */ })
  .catch((reason) => { /* ... */ })
  .finally(() => { /* ... */ });
```

::: details 例子：验证`catch()`的链式调用，以及值穿透

```js{0}
Promise.reject(100)
  .catch((reason) => console.log(reason))        // 100
  .catch((reason) => console.log(reason))        // 不执行

Promise.reject(100)
  .catch((reason) => (reason += 1))
  .catch((reason) => console.log(reason))        // 不执行

Promise.reject(100)
  .catch((reason) => Promise.reject(reason += 1))
  .catch((reason) => console.log(reason))        // 101
```

:::

---

### finally( )

> Promise.prototype.finally( )

`finally()`是 Promise 实例的方法

- 参数接收一个回调函数，在异步任务执行完成后执行 ( 无论任务的成功与失败 )

```js{0}
实例对象
  .then((result) => { /* ... */ })
  .catch((reason) => { /* ... */ })
  .finally(() => { /* ... */ });
```

<!-- ## 常用操作

### 并发

---

### 竞速

---

### 超时

---

### 取消

---

### 重试

---

### 执行一次

---

### 顺序执行 -->

<!-- https://www.xiaohongshu.com/explore/6780eaf0000000002002bf41?app_platform=ios&app_version=8.34&share_from_user_hidden=true&xsec_source=app_share&type=normal&xsec_token=CB_OMx9gIXhbMODOzaOpkT7jotgWtIpRK_9OEDUVrmV_E=&author_share=1&xhsshare=CopyLink&shareRedId=N0w1MEY4PE82NzUyOTgwNjY0OTc8NUw8&apptime=1740105104 -->
