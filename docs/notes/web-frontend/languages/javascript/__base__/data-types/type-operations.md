# JavaScrip 类型操作

## 类型判断

### typeof <Badge type="warning">不推荐</Badge> {#typeof}

```js
const 字符串类型名 = typeof 数据;
```

> [!CAUTION] 无法正确判断引用数据类型以及基本数据类型的<code>null</code>
>
> - 引用数据类型除了函数以外一律都被视为`object`
> - `null`被视为`object`是 JavaScript 的一个固有 Bug，建议使用`===`运算符判断
>
> ```js{0}
> console.log(typeof 100);            // "number"
> console.log(typeof "");             // "string"
> console.log(typeof true);           // "boolean"
> console.log(typeof undefined);      // "undefined"
> console.log(typeof null);           // "object"
> console.log(typeof []);             // "object"
> console.log(typeof {});             // "object"
> console.log(typeof new Set());      // "object"
> console.log(typeof new Map());      // "object"
> console.log(typeof new Date());     // "object"
> console.log(typeof new RegExp());   // "object"
> console.log(typeof new Error());    // "object"
> console.log(typeof function () {}); // "function"
> console.log(typeof Symbol());       // "symbol"
> ```

---

### instanceof <Badge type="warning">不推荐</Badge> {#instanceof}

```js
const 布尔值 = 数据 instanceof 类;
```

> [!CAUTION] 无法正确判断基本数据类型
>
> - 仅能正常判断引用类型
>
> ```js{0}
> console.log(100 instanceof Number);              // false
> console.log("" instanceof String);               // false
> console.log(true instanceof Boolean);            // false
> console.log(null instanceof Object);             // false
> console.log(undefined instanceof Object);        // false
> console.log([] instanceof Array);                // true
> console.log({} instanceof Object);               // true
> console.log(function () {} instanceof Function); // true
> console.log(new Date() instanceof Date);         // true
> console.log(new Error() instanceof Error);       // true
> ```

::: details 例子：手写实现`instanceof`

```js
function _instanceof(data, dataClass) {
  if (typeof data !== "object" || data === null) return false;

  let proto = Object.getPrototypeOf(data);
  while (true) {
    if (proto === null) return false;
    if (proto === dataClass.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```

:::

---

### Object.prototype.toString.call( )

```js
const 字符串类型名 = Object.prototype.toString.call(数据);
```

> [!IMPORTANT] 该方法比<code>typeof</code>、<code>instanceof</code>更加准确
>
> ```js{0}
> console.log(Object.prototype.toString.call(100));              // [object Number]
> console.log(Object.prototype.toString.call(""));               // [object String]
> console.log(Object.prototype.toString.call(true));             // [object Boolean]
> console.log(Object.prototype.toString.call(undefined));        // [object Undefined]
> console.log(Object.prototype.toString.call(null));             // [object Null]
> console.log(Object.prototype.toString.call([]));               // [object Array]
> console.log(Object.prototype.toString.call({}));               // [object Object]
> console.log(Object.prototype.toString.call(function () {}));   // [object Function]
> console.log(Object.prototype.toString.call(new Date()));       // [object Date]
> console.log(Object.prototype.toString.call(/abc/));            // [object RegExp]
> console.log(Object.prototype.toString.call(new Error()));      // [object Error]
> console.log(Object.prototype.toString.call(new Map()));        // [object Map]
> console.log(Object.prototype.toString.call(new Set()));        // [object Set]
> console.log(Object.prototype.toString.call(Promise.resolve()); // [object Promise]
> console.log(Object.prototype.toString.call(document));         // [object HTMLDocument]
> console.log(Object.prototype.toString.call(window));           // [object Window]
> ```

::: details 例子：自定义类型判断函数

```js{0}
function checkType(data) {
  let type = typeof data;
  if (type !== "object") return type;

  return Object.prototype.toString.call(data).replace(/^\[object\s|\]$/g, "");
}

console.log(checkType(100));               // "number"
console.log(checkType(""));                // "string"
console.log(checkType(true));              // "boolean"
console.log(checkType(undefined));         // "undefined"
console.log(checkType(null));              // "null"
console.log(checkType([]));                // "Array"
console.log(checkType({}));                // "Object"
console.log(checkType(function () {}));    // "Function"
console.log(checkType(new Date()));        // "Date"
console.log(checkType(/abc/));             // "RegExp"
console.log(checkType(new Error()));       // "Error"
console.log(checkType(new Map()));         // "Map"
console.log(checkType(new Set()));         // "Set"
console.log(checkType(Promise.resolve())); // "Promise"
```

:::

## 类型转换

### 强制转换

|                              | 说明                                                                               |
| :--------------------------: | ---------------------------------------------------------------------------------- |
|          `Number()`          | 强制转换为数值类型                                                                 |
| `parseInt()`、`parseFloat()` | 强制转换为数值类型<br/>非数值字符串的场合一律转换为`NaN`                           |
|          `String()`          | 强制转换为字符串类型                                                               |
|         `toString()`         | 强制转换为字符串类型                                                               |
|         `Boolean()`          | 强制转换为布尔值类型<br/>仅`undefined`、`null`、`0`、`NaN`、`false`会转换为`false` |

> [!IMPORTANT] <code>Number()</code> vs <code>parseInt()</code>
>
> ```js{0}
> console.log(Number(""));          // 0
> console.log(Number(true));        // 1
> console.log(Number(false));       // 0
> console.log(Number(undefined));   // NaN
> console.log(Number(null));        // 0
>
> console.log(parseInt(""));        // NaN
> console.log(parseInt(true));      // NaN
> console.log(parseInt(false));     // NaN
> console.log(parseInt(undefined)); // NaN
> console.log(parseInt(null));      // NaN
> ```

---

### 隐式转换

TODO:
