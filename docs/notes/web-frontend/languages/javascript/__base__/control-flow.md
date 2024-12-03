# JavaScript 流程控制

## 条件判断

### if...

```js
if (条件) {
  // ...
}
```

---

### if...else...

```js
if (条件) {
  // ...
} else {
  // 条件不满足时执行 ...
}
```

> [!IMPORTANT] 提前返回 ( Early Return / Early Exit )
>
> 在函数中使用条件判断时建议先判断不符合的条件并直接`return`返回，减少`if`的嵌套提高代码可读性
>
> ```js
> function 函数() {
>   if (不满足的条件) {
>     return;
>   }
>   // ...
> }
> ```

---

### if...else if...

线性判断每一个条件后执行符合的代码块中的逻辑

对于处理多个值的匹配判断时，则建议使用`switch...case...`

```js
if (条件1) {
  // ...
} else if (条件2) {
  // ...
} else if (条件3) {
  // ...
}
```

---

### if...else if...else...

线性判断每一个条件后执行符合的代码块中的逻辑

对于处理多个值的匹配判断时，则建议使用`switch...case...`

```js
if (条件1) {
  // ...
} else if (条件2) {
  // ...
} else if (条件3) {
  // ...
} else {
  // 条件都不满足时执行 ...
}
```

---

### switch...case..

通过跳转表直接执行值匹配的`case`子语句中的逻辑

分支条件过多时执行效率以及代码的可读性远远优于`if...else if...`

```js
switch (数据) {
  case 值1:
    // ...
    break;
  case 值2:
  case 值3:
    // ...
    break;
  default:
  // 条件都不满足时执行 ...
}
```

不建议直接在`case`子语句中直接定义变量或常量，否则报错

若非要使用则需要通过`let`、`const`定义并将其包裹在一个代码块中

```js
switch (数据) {
  case 值: {
    const 变量 = 值;
    let 变量 = 值;
    // ...
    break;
  }
  default: {
    const 变量 = 值;
    let 变量 = 值;
    // 条件都不满足时执行 ...
  }
}
```

## 循环遍历

### while...

```js
while (条件) {
  // ...
}
```

> [!CAUTION] 避免死循环
>
> 为了避免出现重复不停的死循环，建议使用一个循环计控制器变量并将其作为循环的判断条件
>
> ```js
> let 循环计控制器变量 = 初始值;
>
> while (基于循环计时器变量的判断条件) {
>   // ...
>   // 更新循环计时器变量
> }
> ```

::: details 例子：利用循环计控制器变量环实现重复打印

```js
let num = 0;

while (num < 5) {
  console.log(num);
  num++;
}
```

:::

---

### do...while...

```js
do {
  // ...
} while (条件);
```

::: details 例子：利用循环计控制器变量重复展示浏览器 alert 信息

```js
let result = "";

do {
  result = prompt("你爱我吗？");
} while (result !== "是的");
```

:::

---

### for...

最传统的循环方法，执行效率快但是在遍历数组时不如内置 API 方便

```js
for (let 循环计时器变量 = 初始值; 判断循环计时器; 更新循环计时器) {
  // ...
}
```

::: details 例子：打印九九乘法表

> 利用双重`for`循环

```js
for (let i = 1; i <= 9; i++) {
  let line = "";

  for (let j = 1; j <= i; j++) {
    line += `${j} * ${i} = ${i * j}\t`;
  }

  console.log(line);
}
// 1 * 1 = 1
// 1 * 2 = 2  2 * 2 = 4
// 1 * 3 = 3  2 * 3 = 6	  3 * 3 = 9
// 1 * 4 = 4  2 * 4 = 8	  3 * 4 = 12  4 * 4 = 16
// 1 * 5 = 5  2 * 5 = 10  3 * 5 = 15  4 * 5 = 20  5 * 5 = 25
// 1 * 6 = 6  2 * 6 = 12  3 * 6 = 18  4 * 6 = 24  5 * 6 = 30  6 * 6 = 36
// 1 * 7 = 7  2 * 7 = 14  3 * 7 = 21  4 * 7 = 28  5 * 7 = 35  6 * 7 = 42  7 * 7 = 49
// 1 * 8 = 8  2 * 8 = 16  3 * 8 = 24  4 * 8 = 32  5 * 8 = 40  6 * 8 = 48  7 * 8 = 56  8 * 8 = 64
// 1 * 9 = 9  2 * 9 = 18  3 * 9 = 27  4 * 9 = 36  5 * 9 = 45  6 * 9 = 54  7 * 9 = 63  8 * 9 = 72  9 * 9 = 81
```

:::

::: details 例子：对数组进行冒泡排序 ( Bubble Sort )

> 利用双重`for`循环

```js
const list = [3, 1, 4, 2, 5];

for (let i = 0; i < list.length - 1; i++) {
  for (let j = 0; j < list.length - 1 - i; j++) {
    if (list[j] > list[j + 1]) {
      let temp = list[j];
      list[j] = list[j + 1];
      list[j + 1] = temp;
    }
  }
}

console.log(list); // [1, 2, 3, 4, 5]
```

:::

::: details 例子：对数组进行选择排序 ( Select Sort )

```js
const list = [3, 1, 4, 2, 5];

for (let i = 0; i < list.length - 1; i++) {
  let minElementIndex = i;

  for (let j = i + 1; j < list.length; j++) {
    if (list[j] < list[minElementIndex]) {
      minElementIndex = j;
    }
  }

  let temp = list[i];
  list[i] = list[minElementIndex];
  list[minElementIndex] = temp;
}

console.log(list); // [1, 2, 3, 4, 5]
```

:::

---

### for...in...

可用于遍历一个键值对对象的所有可枚举属性

```js
for (let key in 对象) {
  // ...
}
```

> [!CAUTION] 不建议使用
>
> - 执行速度慢性能较差，因为会遍历所有的可枚举属性可能会导致不必要的性能开销
> - 会遍历对象的原型链，比较危险，若非要用不可则必须使用`hasOwnProperty()`来避免遍历原型链

::: details 例子：使用`hasOwnProperty()`来确保只遍历对象自身的属性而不是原型链上的属性

```js{0}
const obj = { a: 1, b: 2 };
Object.prototype.c = 3;

for (let key in obj) {              // [!code --:3]
  console.log(key, obj[key]);
}
// "a" 1
// "b" 2
// "c" 3

for (let key in obj) {              // [!code ++:5]
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}
// "a" 1
// "b" 2
```

:::

---

### for...of...

可用于遍历一个可迭代的对象 ( 数组、字符串、Map、Set、DOM集合 )

不能用于遍历键值对对象，若非使要用则需要先将其转为数组

```js
for (const key of 可迭代的对象) {
  // ...
}

for (const key of Object.keys(键值对对象)) {
  // ...
}
for (const value of Object.values(键值对对象)) {
  // ...
}
for (const [key, value] of Object.entries(键值对对象)) {
  // ...
}
```

---

### 数组的内置 API

遍历数组时更建议使用其内置 API

- `forEach()`
- `every()`
- `some()`
- `filter()`
- `map()`
- `find()`
- `findIndex()`
- `reduce()`

## 异常处理

> [!IMPORTANT] 常见异常类型
>
> - `SyntaxError` 语法错误
> - `TypeError` 类型错误
> - `ReferenceError` 引用错误
> - `RangeError` 边界错误
> - `URIError` URL 错误

### try...catch...finally

可用于捕获异常

```js
try {
  // ...
} catch (error) {
  // ...
} finally {
  // ...
}
```

---

### throw

可用于实现抛出异常

```js
// ...
throw new Error();
throw new Error("自定义信息");
// ...
```

---

### debugger

`debugger`语句可以在代码中的指定位置打一个断点

断点不会对代码产生任何影响，仅在调试时程序会在此处暂停执行

```js
// ...
debugger;
// ...
```

<!--
### console

该内置对象中提供了调试的方法

|     常用方法      | 说明                |
| :---------------: | ------------------- |
|  `console.log()`  | 打印一个普通信息    |
| `console.info()`  | 打印一个说明信息    |
| `console.error()` | 打印一个错误信息    |
| `console.debug()` | 打印一个 Debug 信息 |
| `console.clear()` | 清空所有打印的信息  | -->
