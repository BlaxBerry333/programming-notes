# JavaScript 引用数据类型

> Reference Types

JavaScript 中引用数据类型存储的不是数据的值，而是数据在内存中的地址 ( 引用 )

将一个现有引用类型的数据赋值给另一个变量时，实际上是将数据的内存地址 ( 引用 ) 赋值给了新变量，因此两个变量指向了同一个内存地址、引用了同一份数据

多个变量可以指向同一个内存地址，此时修改任何一个变量都会影响到所有引用该内存地址的变量

## 对象 ( object )

此处主要是指键值对的对象

```js
let 键值对对象 = {};
let 键值对对象 = { 键1: 值, 键2: 值 };
```

---

### 常用操作

```js
let 键值对对象 = { 键1: 值, 键2: 值 };

// 增
键值对对象.键 = 值;
键值对对象["键"] = 值;

// 删
delete 键值对对象.键;
delete 键值对对象["键"];

// 改
键值对对象.键 = 新值;
键值对对象["键"] = 新值;

// 查
console.log(键值对对象.键);
console.log(键值对对象["键"]);
```

---

### 常用内置方法

|                                 |        方法        | 说明                                             |
| :-----------------------------: | :----------------: | ------------------------------------------------ |
|   对象类型数据的<br/>原型方法   | `hasOwnProperty()` | 判断对象自身是否包含某个属性，而不是继承自原型链 |
|                                 |    `toString()`    | 将对象转换为字符串，返回一个字符串               |
|                                 | `toLocaleString()` | 将对象换为本地化格式的字符串，返回一个字符串     |
| 全局对象 Object 的<br/>原型方法 |  `Object.keys()`   | 获取对象的所有键，返回一个数组                   |
|                                 | `Object.values()`  | 获取对象的所有值，返回一个数组                   |
|                                 | `Object.entries()` | 获取对象的所有键值对，返回一个二维数组           |
|                                 | `Object.create()`  | 将一个源对象作为要继承的原型后创建一个新对象     |
|                                 | `Object.assign()`  | 将一个或多个源对象中属性浅拷贝后创建一个新对象   |

> [!IMPORTANT] <code>Object.assign()</code> vs <code>Object.assign()</code>
>
> - `Object.create()`创建的新对象不含有任何属性，但可直接使用作为其继承原型的源对象中的属性
> - `Object.assign()`创建的新对象浅拷贝了源对象中的属性
>
> ::: code-group
>
> ```js{0} [Object.create( )]
> const a = { x: 10, y: [] };
>
> const c = Object.create(a);
> console.log(c);         // {}
> console.log(c.x, c.y);  // 10 []
> ```
>
> ```js{0} [Object.assign( )]
> const a = { x: 10, y: [] };
>
> const b = Object.assign(a);
> console.log(b);         // { x: 10, y: [] }
>
> b.x = 20;
> b.y.push(1);
> console.log(b);         // { x: 20, y: [1] }
> console.log(a);         // { x: 20, y: [1] }
>
> b.y = 999
> console.log(b);         // { x: 20, y: 999 }
> console.log(a);         // { x: 20, y: 999 }
> ```
>
> :::

## 数组 ( array )

::: code-group

```js [字面量写法]
let 数组 = [];
let 数组 = [元素1, 元素2];
```

```js [构造函数写法 <Badge type="warning">不推荐</Badge>]
let 数组类实例对象 = new Array(元素个数);

let 数组类实例对象 = Array.from();
let 数组类实例对象 = Array.of();
```

:::

::: details 例子：创建一个稀疏数组 ( Sparse Array )

```js{0}
// 字面量写法
let arr = [];
arr.length = 3;
console.log(arr);          // [undefined x3]

// 构造函数写法
console.log(new Array(3)); // [undefined x3]
```

:::

---

### 常用操作

```js
let 数组 = [元素1, 元素2];

// 获取长度
console.log(数组.length);

// 修改长度
数组.length = 数值;

// 获取元素
console.log(数组[索引]);

// 修改元素
数组[索引] = 新值;
```

---

### 常用内置方法

数组可以直接使用继承自其原型`Array.prototype`上定义的内置方法

|            |      原型方法      | 说明                                                    |
| :--------: | :----------------: | ------------------------------------------------------- |
| 会改变自身 |      `push()`      | 向数组末尾添加一个或多个元素，并返回新数组的长度        |
|            |      `pop()`       | 删除数组末尾的一个元素，并返回该元素                    |
|            |     `shift()`      | 删除数组开头的一个元素，并返回该元素                    |
|            |    `unshift()`     | 向数组开头添加一个或多个元素，并返回新数组的长度        |
|            |      `sort()`      | 对数组中的元素进行排序，默认按字符串顺序排序            |
|            |     `splice()`     | 从数组中添加或删除元素，可以改变数组的内容              |
|            |      `fill()`      | 用静态值填充数组的一部分                                |
| 不改变自身 |     `concat()`     | 合并两个或多个数组，返回一个新数组                      |
|            |      `join()`      | 将数组的所有元素转换为一个字符串，返回一个字符串        |
|            |     `slice()`      | 返回数组的一部分，原数组不变                            |
|            |    `indexOf()`     | 返回指定元素第一次出现位置的索引，未找到则返回`-1`      |
|            |  `lastIndexOf()`   | 返回指定元素最后一次出现位置的索引，未找到则返回`-1`    |
|            |    `includes()`    | 检查数组是否包含指定的元素，返回布尔值                  |
|            |    `toString()`    | 转换为字符串，返回一个字符串                            |
|            | `toLocaleString()` | 转换为本地化格式的字符串，返回一个字符串                |
| 可实现遍历 |    `forEach()`     | 对数组的每个元素执行一次指定的函数                      |
|            |     `every()`      | 检查数组的每个元素是否满足指定的测试条件，返回布尔值    |
|            |      `some()`      | 检查数组中是否有任何元素满足指定的测试条件，返回布尔值  |
|            |     `filter()`     | 创建一个新数组，包含所有通过测试的元素                  |
|            |      `map()`       | 创建一个新数组，包含对每个元素执行指定函数后的结果      |
|            |      `find()`      | 返回数组中第一个满足条件的元素，未找到则返回`undefined` |
|            |   `findIndex()`    | 返回数组中第一个满足条件的元素的索引，未找到则返回`-1`  |
|            |    `entries()`     | 返回一个新的数组迭代器对象，包含每个索引和对应的值      |
|            |     `reduce()`     | 从左到右对数组中的元素应用一个函数，返回最终结果        |
|            |  `reduceRight()`   | 从右到左对数组中的元素应用一个函数，返回最终结果        |

## 函数 ( function )

[更多详见](../function.md)

## 映射 ( Map )

TODO:

## 集合 ( Set )

TODO:

## 日期时间 ( Date )

```js
let 时间对象 = new Date();

let 时间对象 = new Date(年, 月 - 1, 日, 时, 分, 秒);
```

---

### 常用内置方法

|      原型方法      | 说明                                                                                                                                                                   |
| :----------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `getFullYear()`   | 获取年份                                                                                                                                                               |
|    `getMonth()`    | 获取月份                                                                                                                                                               |
|    `getDate()`     | 获取日期，返回的是`当前月份 - 1`                                                                                                                                       |
|     `getDay()`     | 获取星期几                                                                                                                                                             |
|    `getHours()`    | 获取小时                                                                                                                                                               |
|   `getMinutes()`   | 获取分钟                                                                                                                                                               |
|   `getSeconds()`   | 获取秒数                                                                                                                                                               |
| `getMillSeconds()` | 获取毫秒数                                                                                                                                                             |
|    `getTime()`     | 获取时间戳 ( TimeStamp )                                                                                                                                               |
|    `toString()`    | 转换为字符串，返回一个字符串                                                                                                                                           |
| `toLocaleString()` | 转换为本地化格式的字符串，返回一个字符串<br/>例如：`toLocaleString('en-US')` → `"4/12/2024, 10:45:30 AM"`<br/>例如：`toLocaleString('zh-CN')` → `"2024/4/12 10:45:30"` |
|  `toUTCString()`   | 转换为 UTC 格式的字符串，返回一个字符串<br/>例如：`"Thu, 12 Apr 2024 02:45:30 GMT"`                                                                                    |
|  `toISOString()`   | 转换为 ISO 格式的字符串，返回一个字符串<br/>例如：`"2024-04-12T02:45:30.000Z"`                                                                                         |

::: details 例子：利用时间差获取两个日期的时间差

```js{0}
const startDate = new Date(2021, 11, 27, 12, 0, 0);
const currentDate = new Date();

const totalMillSeconds = currentDate.getTime() - startDate.getTime();
const totalSeconds = Math.ceil(totalMillSeconds / 1000);

const days = Math.floor(totalSeconds / (60 * 60 * 24));                 // 总天数       // [!code hl:4]
const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));  // 剩余小时数
const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);            // 剩余分钟数
const seconds = totalSeconds % 60;                                      // 剩余秒数


```

:::

## 正则表达式 ( RegExp )

TODO:
