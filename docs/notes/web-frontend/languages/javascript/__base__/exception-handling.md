# JavaScript 异常处理

> [!IMPORTANT] 常见异常类型
>
> - `SyntaxError` 语法错误
> - `TypeError` 类型错误
> - `ReferenceError` 引用错误
> - `RangeError` 边界错误
> - `URIError` URL 错误

## 捕获异常

### try...catch...finally

```js
try {
  // ...
} catch (error) {
  // ...
} finally {
  // ...
}
```

## 抛出异常

### throw

```js
// ...
throw new Error();
// ...
```

## 代码调试

### console

该内置对象中提供了调试的方法

|     常用方法      | 说明                |
| :---------------: | ------------------- |
|  `console.log()`  | 打印一个普通信息    |
| `console.info()`  | 打印一个说明信息    |
| `console.error()` | 打印一个错误信息    |
| `console.debug()` | 打印一个 Debug 信息 |
| `console.clear()` | 清空所有打印的信息  |

---

### debugger

可以通过`debugger`语句在代码中的指定位置打一个断点

断点不会对代码产生任何影响，仅在调试时程序会在此处暂停执行

```js
// ...
debugger;
// ...
```
