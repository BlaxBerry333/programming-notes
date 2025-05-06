# JavaScript ES Module

ES Module 是 JavaScript 模块化的标准

## 导出

### 命名导出

- 每个模块可以有多个命名导出
- 通过`export`语句在模块定义时导出

```js
export const increase = (a, b) => a + b;
export const decrease = (a, b) => a - b;
```

---

### 默认导出

- 每个模块只能有一个默认导出
- 通过`export default`语句在模块成员定义后导出

```js
export default (a, b) => a + b;

// 等价于
const increase = (a, b) => a + b;
export { increase };
```

## 导入

### 静态导入

- 静态导入时模块的依赖关系在编译时确定
- 通过`import`语句导入模块成员
- 导入默认导出的成员时时可以使用任意名称
- 导入命名导出的成员时需要使用`{}`语法解构赋值
- 导入命名导出的成员时可以使用`as`语法重命名

::: code-group

```js [导入]
// 导入所有成员
import * as M from "./math.js";
M.increase(1, 2);
M.decrease(1, 2);
M.default.x(1, 2);
M.default.y(1, 2);

// 导入默认导出的成员
import m from "./math.js";
m.x(1, 2);
m.y(1, 2);

// 导入命名导出的成员
import { increase, decrease as d } from "./math.js";
increase(1, 2);
d(1, 2);
```

```js [导出]
export const increase = (a, b) => a + b;
export const decrease = (a, b) => a - b;

export default {
  x: increase,
  y: decrease,
};
```

:::

---

### 动态导入

- 动态导入时模块的依赖关系在运行时确定
- 通过`import()`函数异步导入模块中所有成员，并返回一个 Promise 对象

::: code-group

```js [导入]
// Promise 链式调用
import("./math.js")
  .then((m) => {
    m.increase(1, 2);
    m.decrease(1, 2);
    m.default.x(1, 2);
    m.default.y(1, 2);
  })
  .catch((error) => {
    // ...
  });

// Async/Await 异步函数
(async () => {
  try {
    // 写法一
    const M = await import("./math.js");
    M.increase(1, 2);
    M.decrease(1, 2);
    M.default.x(1, 2);
    M.default.y(1, 2);

    // 写法二
    const { increase, decrease, default: m } = await import("./math.js");
    increase(1, 2);
    decrease(1, 2);
    m.x(1, 2);
    m.y(1, 2);
  } catch (error) {
    // ...
  }
})();
```

```js [导出]
export const increase = (a, b) => a + b;
export const decrease = (a, b) => a - b;

export default {
  x: increase,
  y: decrease,
};
```

:::
