# JavaScript 中 this 指向

## 全局作用域的 this

全局作用域中的关键字`this`的指向取决于 JavaScript 的运行环境

- 浏览器环境中：window
- Node.js 环境中： 一个空对象

```js
if (this === window) {
  console.log("浏览器环境");
} else {
  console.log("Node.js环境");
}
```

## 函数作用域的 this

函数作用域中的关键字`this`的指向取决于函数的调用方式

可以使用`call()`、`apply()`、`bind()`这三个内置方法来显式地改变函数的`this`指向

---

### call( )

该方法会立即调用目标函数

作用与`apply()`相似，仅传递目标函数参数的写法不同

```js
// 目标函数无参数时
目标函数.call(this的新指向对象);

// 目标函数有参数时
目标函数.call(this的新指向对象, 目标函数参数1, 目标函数参数2);
```

::: details 例子：

```js{0}
const a = {
  sayHello: function () {
    console.log("hello");
  },
  saySomething: function (msg1, msg2) {
    console.log(msg1, msg2);
  },
  showThis: function () {
    console.log(this);
  },
};

const b = {
  msg: "xxx",
};

a.sayHello.call(b);                     // "hello"
a.saySomething.call(b, b.msg, "yyy");   // "xxx"
a.showThis();                           // {sayHello: ƒ, saySomething: ƒ, showThis: ƒ}
a.showThis.call(b);                     // {msg: "xxx"}
```

:::

---

### apply( )

该方法会立即调用目标函数

作用`call()`相似，仅传递目标函数参数的写法不同

```js
// 目标函数无参数时
目标函数.apply(this的新指向对象);

// 目标函数有参数时
目标函数.apply(this的新指向对象, [目标函数参数1, 目标函数参数2]);
```

::: details 例子：

```js{0}
const a = {
  sayHello: function () {
    console.log("hello");
  },
  saySomething: function (msg1, msg2) {
    console.log(msg1, msg2);
  },
  showThis: function () {
    console.log(this);
  },
};

const b = {
  msg: "xxx",
};

a.sayHello.apply(b);                     // "hello"
a.saySomething.apply(b, [b.msg, "yyy"]); // "xxx"
a.showThis();                            // {sayHello: ƒ, saySomething: ƒ, showThis: ƒ}
a.showThis.apply(b);                     // {msg: "xxx"}
```

:::

---

### bind( )

该方法不会立即调用目标函数，而是返回一个改变了`this`指向的新函数

```js
// 目标函数无参数时
const 新函数 = 目标函数.bind(this的新指向对象);

// 目标函数有参数时
const 新函数 = 目标函数.bind(this的新指向对象, 目标函数参数1, 目标函数参数2);
```

::: details 例子：

```js{0}
const a = {
  sayHello: function () {
    console.log("hello");
  },
  saySomething: function (msg1, msg2) {
    console.log(msg1, msg2);
  },
  showThis: function () {
    console.log(this);
  },
};

const b = {
  msg: "xxx",
};

a.sayHello.bind(b)();                     // "hello"
a.saySomething.bind(b, b.msg, "yyy")();   // "xxx"
a.showThis();                             // {sayHello: ƒ, saySomething: ƒ, showThis: ƒ}
a.showThis.bind(b)();                     // {msg: "xxx"}
```

:::
