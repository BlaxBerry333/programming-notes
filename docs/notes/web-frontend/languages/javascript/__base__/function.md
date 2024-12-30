# JavaScript 函数

> [!IMPORTANT] 函数 vs 方法
>
> - 函数 ( Function )：一个不依附于任何对象，并且可被单独调用执行的代码块
> - 方法 ( Methods )：当函数作为对象的属性时称为方法，只能通过其依附的对象调用执行

## 定义与使用

普通函数使用关键字`function`定义

函数名使用小驼峰命名 ( camelCase )

```js
function 函数() {
  // ...
}

函数();
```

## 函数返回值

### 无返回值

函数是一个空函数或无指明返回值时默认返回值为`undefined`

也可显示指明返回一个`undefined`表示无返回值

```js
function 函数() {
  // ...
}

function 函数() {
  return;
}

function 函数() {
  return undefined;
}
```

---

### 有返回值

函数通过关键字`return`返回一个具体的值

当函数执行到关键字`return`时会立即结束，后面的代码不再执行

除指定具体的数据外还可将一个函数作为返回值，该函数即为 [闭包函数](#闭包)

```js
function 函数() {
  return 返回值;
}

const 返回值 = 函数();
```

## 函数参数

### 固定参数

传递数据的实参与接收数据的形参的位置顺序一一对应

```js
function 函数(形参1, 形参2) {
  // ...
}

函数(实参1, 实参2);
```

---

### 不定参数

可以通过剩余参数以一个数组形式一口气接收所有的实参

剩余参数必须定义在所有明确定义的形参之后

```js
function 函数(...剩余参数) {
  // ...
}

function 函数(形参1, 形参2, ...剩余参数) {
  // ...
}
```

---

### 参数默认值

函数在定义形参时可同时为其指定默认值

若形参有默认值且没有接收到对应位置的实参时，则函数内使用形参的默认值

指定默认值的形参必须定义在所有无默认值的形参之后

```js
function 函数(形参1, 形参2 = 值) {
  // ...
}

函数(实参1, 实参2);
函数(实参1);
函数();
```

> [!IMPORTANT] 函数参数的默认值在每次函数调用时都会初始化
> JavaScript 的函数参数默认值被设计为在不同函数调用期间不会被保留以及共享

## 特殊函数

### 箭头函数

> Arrow Function

```js
// 无参数时
const 函数 = () => {
  // ...
};

// 有参数时
const 函数 = (形参1, 形参2) => {
  // ...
};

// 直接返回某值时可省略代码块
const 函数 = (形参) => 返回值;
```

- 箭头函数没有自己的`this`，其`this`取决于调用该函数时所处作用域的上下文
- 箭头函数不能作为构造函数
- 箭头函数中无法使用`arguments`对象
- 箭头函数语法简洁，尤其适合作为回调函数

---

### 立即执行函数

> IIFE ( Immediately Invoked Function Expression )

立即执行函数在定义后会被立即执行，但因为是一个函数所以其作用域不会污染到全局作用域

```js
// 无参数时
(function () {
  // ...
})();

// 有参数时
(function (参数1, 参数2) {
  // ...
})(参数1, 参数2);
```

::: details 例子：利用 IIFE 实现在循环语句中执行同步执行定时器

> JavaScript 是单线程机制，作为宏任务的计时器会在主线程的同步任务完成后再执行
>
> 因此执行定时器时循环语句已经全部完成且循环计时器已经变为了 5

```js{0}
for (var i = 1; i <= 4; i++) {          // [!code --:5]
  setTimeout(function () {
    console.log(i);
  }, 0);
}
// 5
// 5
// 5
// 5

// 实现方法1: 使用立即执行函数 IIFE
for (var i = 1; i <= 4; i++) {
  (function (currentIndex) {
    setTimeout(function () {
      console.log(currentIndex);
    }, 0);
  })(i);
}
// 1
// 2
// 3
// 4
```

但闭包的变量会有导致内存泄漏和性能下降的风险

建议使用关键字`let`定义计时器变量来确保每次迭代时代码块作用域中的变量都是新的

```js{0}
// 实现方法2: 利用块级作用域
for (let i = 1; i <= 4; i++) {          // [!code ++:5]
  setTimeout(function () {
    console.log(i);
  }, 0);
}
// 1
// 2
// 3
// 4
```

:::

---

### 构造函数

> Constructor Function

[更多详见](./oop/oop-constructor-function-prototype-chain.md)

## 常用操作

### 递归

> Recursion

递归是指函数在自己内部调用自己

为了避免出现无限递归导致的内存泄露，执行递归时必须要有一个判断条件

```js
function 函数() {
  if (条件) {
    函数();
  }
}
```

::: details 例子：利用递归实现斐波那契数列

```js
function fibo(num) {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibo(num - 1) + fibo(num - 2);
}

console.log(fibo(1)); // 1
console.log(fibo(2)); // 1
console.log(fibo(3)); // 2
console.log(fibo(4)); // 3
console.log(fibo(5)); // 5
console.log(fibo(6)); // 8
console.log(fibo(7)); // 13
```

:::

---

### 闭包

> Closure

闭包是指函数将一个函数作为返回值返回，被返回的函数即闭包函数

闭包常用于抛出函数内私有变量避免全局污染、创建工厂函数等

```js
function 函数() {
  let 变量 = 值;

  return function () {
    // ...
  };
}

const 闭包函数 = 函数();
闭包函数();
```

> [!CAUTION] 不要滥用闭包
> 闭包的变量会一直保存在内存中，尤其是在循环、频繁执行的逻辑中会导致内存泄漏和性能下降

::: details 例子：通过闭包实现在函数外访问函数作用域中变量

```js{0}
function getPerson() {
  let person = 'Andy';

  return function () {
    return person;
  };
}

let person = getPerson()();
console.log(person);          // "Andy"
```

:::

---

### 柯里化

> Currying

柯里化是通过闭包实现的

可以将接收多个参数的函数转换成只接收一个参数的函数

```js
函数(实参1, 实参2, 实参3); // [!code --]
函数(实参1)(实参2)(实参3); // [!code ++]
```

::: code-group

```js [手写柯里化函数的封装]
function curryCreator(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...nextArgs) => curried(...args, ...nextArgs);
    }
  };
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

const curriedShow = curryCreator((a, b, c) => {
  console.log(a, b, c);
});
curriedShow(1)(2)(3); // 1 2 3
curriedShow(1, 2, 3); // 1 2 3

const curriedAdd = curryCreator((a, b, c) => {
  console.log(a + b + c);
});
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2, 3); // 6
```
