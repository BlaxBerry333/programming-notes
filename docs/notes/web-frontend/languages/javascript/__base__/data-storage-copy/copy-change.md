# JavaScript 拷贝与修改

## 直接赋值

将一个变量直接赋值给另一新变量的行为取决于不同的数据类型

|                     数据类型                     | 说明                                       |
| :----------------------------------------------: | ------------------------------------------ |
| [基本类型数据](../data-types/primitive-types.md) | 赋值的是值本身，修改新变量时不会影响原变量 |
| [引用类型数据](../data-types/reference-types.md) | 赋值的是引用地址，修改新变量时会影响原变量 |

::: code-group

```js [基本类型数据 ( 原始类型 )]
let a = 100;

// 拷贝
let b = a;

// 修改
b = 200;

console.log(a); // 100 // [!code hl:2]
console.log(b); // 200
```

```js [引用类型数据 ( 对象类型 )]
let a = {
  name: "Andy",
  skills: ["React"],
};

// 拷贝
let b = a;

// 修改
b.name = "Tom";
b.skills.push("Vue");

console.log(a); // { name: "Tom", skills: [ "React", "Vue" ] } // [!code hl:2]
console.log(b); // { name: "Tom", skills: [ "React", "Vue" ] }
```

:::

## 拷贝对象

基于源对象类型数据创建一个新对象类型数据时，不同拷贝方式创建的对象在更新时表现也不同

---

### 浅拷贝

> Shallow Copy

浅拷贝是指基于源对象创建一个新的对象时：

- 复制其成员中基础类型数据的值 ( 新对象中修改该数据不影响源对象 )
- 复制其成员中引用类型数据的引用地址 ( 共享该引用地址，新对象中修改该数据会影响源对象 )

> [!IMPORTANT] 实现方法:
>
> - `扩展运算符` ( 针对键值对对象、数组 )
> - `Object.assign()` ( 针对键值对对象 )
> - `数组.concat()`、`数组.slice()` ( 针对数组 )

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

---

### 深拷贝

> Deep Copy

深拷贝是指基于源对象创建一个新的对象时：

将源对象完整拷贝后存储于一个新的内存空间，新对象中成员的修改都不会影响到源对象

彻底实现了源对象与新对象在内存上的分离

> [!IMPORTANT] 实现方法:
>
> - `JSON.stringify()` <Badge type="warning">不推荐</Badge>
> - 第三方库 ( 比如: `lodash.cloneDeep()` )
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
