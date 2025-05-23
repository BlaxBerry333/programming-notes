# JavaScript 注释与文档

## 注释

- 单行注释定义在`//`之后
- 多行注释定义在`/* */`之间

::: code-group

```js [单行注释]
// 单行注释
// 单行注释
// 单行注释
```

```js [多行注释]
/*
 * 多行注释
 * 多行注释
 */
```

:::

## 文档

### 模块文档

模块文档需要写在模块文件的开头，并且与其间隔一个空行

```js
/**
 * @fileoverview 模块说明
 * @author 作者名
 * @version 1.0.0
 */

// ...
// ...
```

---

### 函数文档

函数文档需要写在函数定义前面

::: code-group

```js [普通参数]
/**
 * 函数说明
 * 函数说明
 *
 * @param {类型} 参数1 - 说明
 * @param {类型} [参数2] - 说明 ( 可选 )
 * @param {类型} [参数3=默认值] - 说明 ( 可选, 有默认值 )
 * @returns {类型} 返回值的说明
 * @throws {错误类型} 错误说明
 */
function 函数(参数1, 参数2, 参数3 = 默认值) {
  // ...
  // ...
  return 返回值;
}
```

```js [复杂参数]
/**
 * 函数说明
 * 函数说明
 *
 * @param {类型} 参数1 - 说明
 * @param {类型} 参数2.键1 - 说明
 * @param {类型} 参数2.键2 - 说明
 * @param {类型} [参数2.键3=默认值] - 说明 ( 可选, 有默认值 )
 * @returns {类型} 返回值的说明
 * @throws {错误类型} 错误说明
 */
function 函数(参数1, { 键1, 键2, 键3 = 默认值 }) {
  // ...
  // ...
  return 返回值;
}
```

:::
