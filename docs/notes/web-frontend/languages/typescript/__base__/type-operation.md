# TypeScript 类型操作

## 类型断言

> Type Assertion

类型断言可用于手动强制指明数据的类型

::: code-group

```ts [写法一]
const 数据 = 值 as 类型;

const 数据: 类型1 = 值 as unknown as 类型2;
```

```ts [写法二 <Badge type="warning">不推荐</Badge>]
const 数据 = <类型>值;

const 数据: 类型1 = <类型2>(<unknown>值);
```

:::

::: details 例子：将`unknown`类型的数据强制断言为`string`类型后使用内置方法

```ts
let message: unknown;
message = 100;
message = "hello";

(message as string).toUpperCase();
```

:::

## 类型保护

> Type Guard

类型保护是为了对数据的类型进行一个判断

|   内置方法   | 说明                                                          |
| :----------: | ------------------------------------------------------------- |
|   `typeof`   | 用于检查数据是否为 JS 的基本数据类型 ( 数值、字符串、布尔值 ) |
| `instanceof` | 用于检查对象是否为某个类的实例                                |

也可自定义一个类型的判断，通过关键字`is`缩小类型的范围并将其作为函数的返回值类型

```ts
function 函数(参数: 类型): 参数 is 某个类型 {
  return 布尔值;
}

if(函数(数据)){ ... }
```

> [!CAUTION] 自定类型判断函数的返回值类型不能使用<code>boolean</code>
> 若不使用关键字`is`实现类型缩小话 TypeScript 无法识别到类型范围改变<br/>
> 尤其是在数据为复杂的联合类型时仍会将其推断为原本的联合类型

::: details 例子：自定义一个能够判断联合类型的函数

```ts{0}
type Dog = { breed: string; bark(message: string): void };
type Cat = { breed: string; meow(message: string): void };
type Animal = Dog | Cat;

function isDog(animal: Animal): animal is Dog {     // [!code hl:6]
  return (animal as Dog).bark !== undefined;
}
function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function checkAnimal(animal: Animal) {
  if (isDog(animal)) return animal.bark("汪汪汪");
  if (isCat(animal)) return animal.meow("喵喵喵");
}

checkAnimal({ breed: "吉娃娃", bark: (message) => console.log(message) }); // "汪汪汪"
checkAnimal({ breed: "狸花猫", meow: (message) => console.log(message) }); // "喵喵喵"

```

:::

## 命名空间

> namespace

命名空间用于将类型别名、接口等进行分组，来避免名称冲突

```ts
namespace 命名空间1 {
  export interface 接口 {
    // ...
  }
  export type 类型别名 = ...;
}

namespace 命名空间2 {
  export interface 接口 {
    // ...
  }
  export type 类型别名 = ...;
}

const 数据: 命名空间1.接口 = { ... };
const 数据: 命名空间2.接口 = { ... };
```
