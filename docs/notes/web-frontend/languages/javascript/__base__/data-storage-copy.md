# JavaScript 数据引用与拷贝

## 数据存储

|                    数据类型                     | 存储内存位置     | 说明                                                     |
| :---------------------------------------------: | ---------------- | -------------------------------------------------------- |
| [基本类型数据](./data-types/primitive-types.md) | 存储在**栈内存** | 被引用或拷贝时会创建一个值相等的变量                     |
| [引用类型数据](./data-types/reference-types.md) | 存储在**堆内存** | 存储的是地址，多个引用指向同一个地址，一个改变则全部都变 |

::: code-group

```js [基本类型数据]
let a = 100;

let b = a;

b = 200;

console.log(a); // 100
console.log(b); // 200
```

```js [引用类型数据]
let a = { name: "Andy" };

let b = a;

b.name = "Tom";

console.log(a); // { name: "Tom" }
console.log(b); // { name: "Tom" }
```

:::

## 浅拷贝

> Shallow Copy

浅拷贝是指基于源对象创建一个新的对象时：

- 复制基础类型数据的值 ( 新对象中修改该属性不影响源对象 )
- 复制引用类型数据的引用地址 ( 共享该属性的引用地址，新对象中修改该属性会影响源对象 )

> [!IMPORTANT] 实现方法:
>
> - `扩展运算符` ( 键值对对象、数组 )
> - `Object.assign()` ( 键值对对象 )
> - `数组.concat()` ( 数组 )
> - `数组.slice()` ( 数组 )

::: code-group

```js{0} [键值对对象]
const a = {
  name: "Andy",
  skill: { frontend: "React" },
};

const b = { ...a };

b.name = "Jack";            // 修改的是浅拷贝的基本数据类型的属性，不影响源对象
b.skill.frontend = "Vue";   // 修改的是浅拷贝的引用数据类型的属性，会影响源对象

console.log(a); // { name: "Andy", skill: { frontend: "Vue" }}
console.log(b); // { name: "Jack", skill: { frontend: "Vue" }}
```

```js{0} [数组]
const a = [
  1,
  2,
  { skill: 'React' },
];

const b = { ...a };

b[0] = 3;                     // 修改的是浅拷贝的基本数据类型的属性，不影响源对象
b[1] = 4;                     // 修改的是浅拷贝的基本数据类型的属性，不影响源对象
b[2].skill = "Vue";           // 修改的是浅拷贝的引用数据类型的属性，会影响源对象

console.log(a); // { 1, 2, { skill: "Vue" }}
console.log(b); // { 3, 4, { skill: "Vue" }}
```

:::

## 深拷贝

> Deep Copy

深拷贝是指基于源对象创建一个新的对象时，将源对象完整拷贝后存储于一个新的内存空间

新对象的修改不会影响到源对象，彻底实现了内存上的分离

> [!IMPORTANT] 实现方法:
>
> - `JSON.stringify()` <Badge type="warning">不推荐</Badge>
> - 第三方库
> - 手写递归深拷贝

::: code-group

```js [手写递归深拷贝]
function deepClone(obj) {
  // 基本数据类型、null 时直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  // 处理数组时递归
  if (Array.isArray(obj)) {
    let arrCopy = [];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepClone(obj[i]);
    }
    return arrCopy;
  }
  // 键值对对象时递归
  let objCopy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = deepClone(obj[key]);
    }
  }
  return objCopy;
}

const a = { name: "Andy", skill: { frontend: "React" } };
const b = deepClone(a);
b.name = "Jack";
b.skill.frontend = "Vue";
console.log(a); // { name: "Andy", skill: { frontend: "React" }}
console.log(b); // { name: "Jack", skill: { frontend: "Vue" }}

const a = [1, 2, { skill: "React" }];
const b = { ...a };
b[0] = 3;
b[1] = 4;
b[2].skill = "Vue";
console.log(a); // { 1, 2, { skill: "React" }}
console.log(b); // { 3, 4, { skill: "Vue" }}
```

:::
