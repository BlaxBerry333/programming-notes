# TypeScript 常用类型

## JS 原始数据类型

TypeScript 中可直接使用 JavaScript 中的基本数据类型 [更多详见](/notes/web-frontend/languages/javascript/__base__/data-types/primitive-types)

|  数据类型   |    说明    | 例子                                          |
| :---------: | :--------: | --------------------------------------------- |
|  `number`   |    数值    | `100`、`-100`、`NaN`、`Infinity`、`-Infinity` |
|  `string`   |   字符串   | `""`、` `` `                                  |
|  `boolean`  |   布尔值   | `true`、`false`                               |
|   `null`    |    空值    | `null`                                        |
| `undefined` | 未定义的值 | `undefined`                                   |

::: details 例子：使用 JS 的基本数据类型

```ts
let a: number;
a = 100;
a = -100;
a = NaN;
a = Infinity;
a = -Infinity;

let b: string;
b = "";
b = ``;

let c: boolean;
c = true;
c = false;

let d: null = null;

let e: undefined = undefined;
```

:::

## JS 对象数据类型

TypeScript 中也可使用 JavaScript 中的引用数据类型，但是略有不同 [更多详见](/notes/web-frontend/languages/javascript/__base__/data-types/reference-types)

---

### 数组

:::code-group

```ts [内联写法]
// 写法一：泛型定义
const 数组: Array<元素类型> = [元素1, 元素2];

// 写法二：T[ ] 简洁定义
const 数组: 元素类型[] = [元素1, 元素2];
```

```ts [类型别名写法]
// 写法一：泛型定义
type 类型别名 = Array<元素类型>;

// 写法二：T[ ] 简洁定义
type 类型别名 = 元素类型[];

const 数组: 类型别名 = [元素1, 元素2];
```

```ts [接口写法 <Badge type="warning">不推荐</Badge>]
interface 接口 {
  [index: number]: 元素类型;
}

const 数组: 接口 = [元素1, 元素2];
```

:::

数组中元素的类型可通过索引获取

```ts
type 元素类型 = 数组类型[number];
```

---

### 对象

:::code-group

```ts [内联写法 <Badge type="warning">不推荐</Badge>]
const 对象: {
  属性: 类型;
  属性: 类型;
} = {
  属性: 值,
  属性: 值,
};
```

```ts [类型别名写法]
type 类型别名 = {
  属性: 类型;
  属性: 类型;
};

const 对象: 类型别名 = {
  属性: 值,
  属性: 值,
};
```

```ts [接口写法]
interface 接口 {
  属性: 类型;
  属性: 类型;
}

const 对象: 接口 = {
  属性: 值,
  属性: 值,
};
```

:::

---

### 函数

::: code-group

```ts [内联写法]
// 一般函数
function 函数(参数: 类型): 返回值类型 {
  return 值;
}

// 箭头函数
const 函数 = (参数: 类型): 返回值类型 => {
  return 值;
};
```

```ts{0} [类型别名写法]
// 无参数、无返回值
type 类型别名 = () => void;

// 无参数、有明确返回值
type 类型别名 = () => 返回值类型;

// 有参数、有明确返回值
type 类型别名 = (参数: 类型) => 返回值类型;
type 类型别名 = (参数: 类型, 参数: 类型) => 返回值类型;
type 类型别名 = (参数: 类型, ...剩余参数: 类型) => 返回值类型;

const 函数: 类型别名 = () => {
  // ...
};
```

:::

---

### object、Object

| 数据类型 | 说明                                                                             |
| :------: | -------------------------------------------------------------------------------- |
| `object` | 可用于表明 JS 基本数据类型以外的数组、对象、函数                                 |
| `Object` | 可用于表明能够调用内置 Object 方法的数据 ( 除`undefined`、`null`以外的所有数据 ) |

> [!CAUTION] 范围太广，不建议直接使用
>
> ::: code-group
>
> ```ts{0} [object 类型]
> let data: object;
>
> data = {};                  // 键值对对象
> data = [];                  // 数组
> data = function () {};      // 一般函数
> data = () => {};            // 箭头函数
> data = new 内置构造函数();    // 构造函数
>
> class 自定义类 {}
> data = new 自定义类();       // 类实例对象
> ```
>
> ```ts{0} [Object 类型]
> let data: Object;
>
> data = {};                  // 键值对对象
> data = [];                  // 数组
> data = function () {};      // 一般函数
> data = () => {};            // 箭头函数
> data = new 内置构造函数();    // 构造函数
>
> class 自定义类 {}
> data = new 自定义类();       // 类实例对象
>
> data = 1;                   // 基本数据类型 数值
> data = "1";                 // 基本数据类型 字符串
> data = true;                // 基本数据类型 布尔值
> ```
>
> :::

---

### 内置对象

`Error`、`Date`、`RegExp` 等 ECMAScript 的内置对象

```ts
const 错误对象: Error = new Error();
const 日期对象: Date = new Date();
const 正则对象: RegExp = /[a-z]/;
```

DOM 和 BOM 的内置对象

```ts
const body: HTMLElement = document.body;
const allDivs: NodeList = document.querySelectorAll("div");
document.addEventListener("click", (e: MouseEvent) => {
  // ...
});
```

## 特殊类型

### any

`any`类型表示任意类型

> [!CAUTION] 范围太广，尽量不要使用
>
> - `any`类型的数据会禁用 TypeScript 对其的静态类型检查与类型推断
> - `any`类型的数据可被赋值给已经明确类型的任何数据
>
> ```ts
> let data: string;
>
> let value: unknown;
> value = 100;
>
> data = value; // [!code error]
> ```

---

### unknown

`unknown`类型表示未知类型 ( 可理解为有类型限制的安全的`any`类型 )

在使用`unknown`类型的数据时，需要先进行类型判断或借助类型断言

::: details 例子：将`unknown`类型数据赋值给其他已经明确类型的数据

```ts
let data: string;

let value: unknown;
value = "xxx";

// 方法一: 判断类型后赋值
if (typeof value === "string") {
  data = value;
  console.log(data.toUpperCase());
}

// 方法一: 类型断言强制赋值
data = value as string;
(data as string).toUpperCase();
```

:::

---

### never

`never`类型表示不能为任何值，主要用于函数返回值

用于限定函数不能有任何返回值 ( 不显式指定返回值时默认返回的`undefined`也不行 )

```ts
function 函数(): never {
  throw new Error();
}
```

---

### void

`void`类型表示空值，主要用于函数返回值

用于限定函数无返回值或显式指定返回值为`undefined`

```ts
function 函数(): void {
  // ...
}

function 函数(): void {
  return undefined;
}
```

---

### 元组

> Tuple

元组是一个长度固定不可改变的数组

::: code-group

```ts [内联写法]
const 元组: [元素类型1, 元素类型2] = [元素1, 元素2];
```

```ts [类型别名写法]
type 类型别名 = [元素类型1, 元素类型2];

const 元组: 类型别名 = [元素1, 元素2];
```

:::

元组中的元素可指定为可选类型，即对应位置可以不赋值或赋值为`undefined`

```ts
type 类型别名 = [元素类型1, 元素类型2?];

const 元组: 类型别名 = [元素1, 元素2];
const 元组: 类型别名 = [元素1];
const 元组: 类型别名 = [元素1, undefined];
```

元组中元素的类型可通过索引获取

```ts
type 元素类型 = 数组类型[number];
type 元素类型1 = 数组类型[0];
type 元素类型2 = 数组类型[1];
```

## 接口

> Interface

接口可用于对一个对象的结构进行描述

接口名首字母要大写，并且建议在名称前缀加上大写字母`I`区分面向对象

```ts{0}
interface 接口 {
  属性1: 类型;
  属性2: 类型;
  属性?: 类型;            // 可选属性
  readonly 属性: 类型;    // 只读属性
  [key: string]: 类型;   // 任意属性
}

const 数据: 接口 = 值;
```

同名接口被重复定义时，若字段不存在则追加，若字段已存在且类型不同则报错

```ts
interface A {
  name: string;
}
interface A {
  name: number; // [!code error]
  age: number;
}
```

::: code-group

```ts [作为对象数据的类型]
const 变量: 接口 = {
  属性1: 属性1的值,
  属性2: 属性2的值,
};
```

```ts [被其他接口所继承]
interface 接口1 extends 接口2 {
  属性1: 类型;
  属性2: 类型;
}
```

<!--
```ts [被面向对象的类所实现 <Badge type="warning">不常用</Badge>]
class 类 implements 接口1, 接口2 {
  属性1: 类型;
  属性2: 类型;
  constructor(属性1的值: 类型, 属性2的值: 类型) {
    this.属性1 = 属性1的值;
    this.属性2 = 属性2的值;
  }
}
``` -->

:::

## 类型别名

> Type

类型别名可用来给任何一个类型起个新名字，以提高代码的可读性与类型复用

类型别名首字母要大写

没有必要给一个基本数据类型定义类型别名，类型别名多用于联合类型与交叉类型等

```ts
type 类型别名 = ...;

type 类型别名 = 类型1 & 类型2
```

::: details 例子：复杂的类型建议使用类型别名定义替代内联写法

```ts{0}
const person: { name: string; id: number } = { name: "Andy", id: 1 }; // [!code --]
type Person = { name: string; id: number };                           // [!code ++]
const person: Person = { name: "Andy", id: 1 };                       // [!code ++]
```

:::

## 联合类型

> Union Type

相当于"或者"的意思

```ts
type 类型 = 类型1 | 类型2 | 类型3;
```

## 交叉类型

> Intersection Type

相当于"并且，同时满足"的意思

```ts
type 类型 = 类型1 & 类型2 & 类型3;
```

> [!CAUTION] 交叉不要乱用，容易被覆盖为<code>never</code>类型
>
> ```ts{0}
> type T = string & number;   // never // [!code error]
>
> type A = { name: string };
> type B = { name: number };
> type AB = A & B;            // 无法正常使用, 因为 name 字段类型为 never // [!code error]
> ```

## 枚举

> Enum

枚举可用于定义一组范围固定的常量 ( 比如周、月、性别、方向等 )

枚举中关键字的值默认是从`0`开始递增的数值，也可手动指定具体数值或字符串为关键字的值

```ts
enum 枚举 {
  关键字1,
  关键字2,
  关键字3 = 自定义数值,
  关键字4 = "自定义字符串",
}

const 数据: 枚举 = 枚举.关键字;
```

可通过反向映射利用关键字索引获取枚举中对应位置的关键字名

若关键字的值为自定义数值时则通过该数值进行反向映射，但字符串的值则不可以反向映射

```ts{0}
enum MyEnum {
  A,
  B = 999,
  C = "x",
}

console.log(MyEnum[0]);   // A
console.log(MyEnum[1]);   // undefined
console.log(MyEnum[999]); // B
console.log(MyEnum[100]); // undefined
console.log(MyEnum["x"]); // 索引表达式的类型不为 "number" // [!code error]
```

::: details 例子：在枚举中同时使用默认递增的值与自定义的值

```ts
enum Week {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat = "周六",
  Sun = "周日",
}

// 获取关键字的值
console.log(Week.Mon); // 0
console.log(Week.Tue); // 1
console.log(Week.Wed); // 2
console.log(Week.Thu); // 3
console.log(Week.Fri); // 4
console.log(Week.Sat); // "周六"
console.log(Week.Sun); // "周日"

// 反向映射获取关键字
console.log(Week[0]); // "Mon"
console.log(Week[1]); // "Tue"
console.log(Week[2]); // "Wed"
console.log(Week[3]); // "Thu"
console.log(Week[4]); // "Fri"
console.log(Week[5]); // undefined
console.log(Week[6]); // undefined
console.log(Week["周六"]); // [!code error]
console.log(Week["周日"]); // [!code error]
```

:::

::: details 例子：分支语句中使用枚举进行判断

```ts
enum CustomRole {
  Admin,
  Member,
  Visitor,
}

function checkRole(role: CustomRole): void {
  switch (role) {
    case CustomRole.Admin:
      // ...
      break;
    case CustomRole.Member:
      // ...
      break;
    case CustomRole.Visitor:
      // ...
      break;
    default:
    // ...
  }
}
```

:::

## 条件类型

```ts
type 类型别名<泛型参数> = 泛型参数 extends 某个类型 ? 类型1 : 类型2;
```
