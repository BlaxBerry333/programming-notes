# JavaScript 拷贝与修改

## 变量赋值

将一个变量直接赋值给另一新变量后，数据修改时对新变量与源变量的影响取决于不同的数据类型

|                     数据类型                     | 说明                                                                 |
| :----------------------------------------------: | -------------------------------------------------------------------- |
| [基本类型数据](../data-types/primitive-types.md) | 值拷贝，拷贝赋值的是数据的值，新变量与旧变量互不影响                 |
| [引用类型数据](../data-types/reference-types.md) | 引用拷贝，拷贝赋值的是引用地址，成员变化时新变量与旧变量都会受到影响 |

---

### 值拷贝

> Value Copy

赋值给一个新变量赋值一个基本类型数据时，拷贝赋值的仅仅是一个该数据值的副本

对新变量与源变量进行修改时都不会影响到对方

```js{0}
let a = 100;

// 拷贝
let b = a;

// 修改源变量
a = 200;
console.log(a); // 200
console.log(b); // 100

// 修改新变量
b = 300;
console.log(a); // 200
console.log(b); // 300
```

---

### 引用拷贝

> Reference Copy

赋值给一个新变量赋值一个引用类型数据时，拷贝赋值的是该数据的引用地址

新对象与源对象对该引用数据类型的成员进行修改时会影响到所有使用该数据的地方

::: code-group

```js{0} [数组]
let a = ["React", "Vue"];

// 拷贝
let b = a;

// 修改源对象
a.pop();
a[0] = "Django";
console.log(a);     // ["Django"]
console.log(b);     // ["Django"]

// 修改新对象
b[0] = "Gin";
b.push("Rails");
console.log(a);     // ["Gin", "Rails"]
console.log(b);     // ["Gin", "Rails"]
```

```js{0} [键值对对象]
let a = { name: "Andy", skills: ["React"] };

// 拷贝
let b = a;

// 修改源对象
a.name = "Tom";
a.skills[0] = "Vue";
console.log(a);     // { name: "Tom", skills: ["Vue"] }
console.log(b);     // { name: "Tom", skills: ["Vue"] }

// 修改新对象
b.name = "Jack";
b.skills.push("Django");
console.log(a);     // { name: "Jack", skills: ["Vue", "Django"] }
console.log(b);     // { name: "Jack", skills: ["Vue", "Django"] }
```

:::

## 函数参数传递

在函数中直接修改形参时对外部实参的影响取决于不同的数据类型

|                     数据类型                     | 说明                                                             |
| :----------------------------------------------: | ---------------------------------------------------------------- |
| [基本类型数据](../data-types/primitive-types.md) | 值传递，传递的是实参的副本，函数中修改形参时不会影响外部实参     |
| [引用类型数据](../data-types/reference-types.md) | 引用传递，传递的是实参的引用地址，函数中修改形参时会影响外部实参 |

---

### 值传递

> Pass by Value

通过参数传递给函数的是一个基本类型数据时，传递的仅仅是一个该数据值的副本

在函数中修改该参数时不会影响到函数外的源数据

```js{0}
function myFunction(num) {
  num++;
  console.log(num);
}

const num = 0;

myFunction(num);  // 1
myFunction(num);  // 1
myFunction(num);  // 1
console.log(num); // 1
```

---

### 引用传递

> Pass by Reference

通过参数传递给函数的是一个引用类型数据时，传递的是该数据的引用地址

在函数中修改该参数时会影响到函数外的源数据，以及所有使用了源数据的地方

::: code-group

```js{0} [数组]
function myFunction(list, value) {
  list.push(value);
  console.log(list);
}

const myList = [];

myFunction(myList, 1);  // [1]
myFunction(myList, 2);  // [1, 2]
myFunction(myList, 3);  // [1, 2, 3]
console.log(myList);    // [1, 2, 3]
```

```js{0} [键值对对象]
function myFunction(obj, value) {
  obj[value] = value;
  console.log(obj);
}

const myObj = {};

myFunction(myObj, 1);   // {1: 1}
myFunction(myObj, 2);   // {1: 1, 2: 2}
myFunction(myObj, 3);   // {1: 1, 2: 2, 3: 3}
console.log(myObj);     // {1: 1, 2: 2, 3: 3}
```

:::

## 拷贝对象

基于源对象类型数据拷贝创建一个新对象类型数据时

修改新对象时对源对象的影响取决于不同的拷贝方式

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
> - 手写递归深层拷贝对象以及其内部的所有子对象

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
