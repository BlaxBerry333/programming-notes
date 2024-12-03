# TypeScript 内置工具类型

> Utility Types

TypeScript 提供了大量内置工具类，多为利用泛型创建的映射类型

## 选取

### Pick<T, K\>

从类型 T 中挑选出属性键为 K 的子类型

```ts
type 新类型 = Pick<对象类型, "键名">;
type 新类型 = Pick<对象类型, "键名" | "键名" | "键名">;
```

::: code-group

```ts [<Badge>源码</Badge>]
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

:::

---

### Omit<T, K\>

从类型 T 中排除属性键为 K 的子类型

```ts
type 新类型 = Omit<对象类型, "键名">;
type 新类型 = Omit<对象类型, "键名" | "键名" | "键名">;
```

::: code-group

```ts [<Badge>源码</Badge>]
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

:::

---

### Exclude<U, E\>

从类型 U 中排除可以赋值给类型 E 的所有子类型

```ts
type 新类型 = Exclude<联合类型, "联合成员">;
type 新类型 = Exclude<联合类型, "联合成员" | "联合成员" | "联合成员">;
```

::: code-group

```ts [<Badge>源码</Badge>]
type Exclude<T, U> = T extends U ? never : T;
```

:::

::: details 例子：

```ts
type T = string | number | boolean;
type U = number;
type R = Exclude<T, U>; // [!code hl] // string | boolean
```

:::

---

### Extract<U, E\>

从类型 U 中提取可以赋值给类型 E 的所有子类型

```ts
type 新类型 = Extract<联合类型, "联合成员">;
type 新类型 = Extract<联合类型, "联合成员" | "联合成员" | "联合成员">;
```

::: code-group

```ts [<Badge>源码</Badge>]
type Extract<T, U> = T extends U ? T : never;
```

:::

::: details 例子：

```ts
type T = string | number | boolean;
type U = number;
type R = Extract<T, U>; // [!code hl] // number
```

:::

---

### NonNullable<T\>

从类型 T 中移除`null`和`undefined`

```ts
type 新类型 = NonNullable<联合类型>;
```

::: code-group

```ts [<Badge>源码</Badge>]
type NonNullable<T> = T extends null | undefined ? never : T;
```

:::

::: details 例子：

```ts
type T = string | number | null | undefined;
type R = NonNullable<T>; // [!code hl] //string | number
```

:::

## 对象属性

### Record<K, V\>

创建一个类型，其属性键为 K 类型，属性值为 V 类型

```ts
type 新类型 = Partial<键的类型, 值的类型>;
```

::: code-group

```ts [<Badge>源码</Badge>]
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

:::

::: details 例子：

```ts{0}
type CatNames = "Tom" |  "Garfield";
type CatInfo = { age: number }
type Cats = Record<CatNames, CatInfo>;

const cats: Cats = {                // [!code hl:5]
  Tom: { age: 3 },
  Garfield: { age: 5 },
};
```

:::

---

### Partial<T\>

将类型 T 中的所有属性设置为可选属性

```ts
type 新类型 = Partial<对象类型>;
```

::: code-group

```ts [<Badge>源码</Badge>]
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

:::

---

### Required<T\>

将类型 T 中的所有可选属性设置为必选属性

```ts
type 新类型 = Required<对象类型>;
```

::: code-group

```ts [<Badge>源码</Badge>]
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

:::

---

### Readonly<T\>

将类型 T 中的所有属性设置为只读属性

```ts
type 新类型 = Readonly<对象类型>;
```

::: code-group

```ts [<Badge>源码</Badge>]
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

:::

## 函数

### ReturnType<F\>

获取函数类型 T 的返回值类型

```ts
type 新类型 = ReturnType<typeof 函数>;
```

::: details 例子：

```ts
function func(): string {
  return "Hello";
}

type R = ReturnType<typeof func>; // [!code hl] // string
```

:::

---

### Parameters<F\>

获取函数类型 T 的参数类型，将所有参数的类型以一个元组形式返回

```ts
type 新类型 = Parameters<typeof 函数>;
```

::: details 例子：

```ts
function func(x: number, y: number): void {
  // ...
}

type R = Parameters<typeof func>; // [!code hl] // [number, number]
```

:::

## 字符串操作

### Uppercase<S\>

将字符串类型 S 中的所有字符转换为大写

```ts
type 新类型 = Uppercase<string>;
type 新类型 = Uppercase<字符串字面量类型>;
```

---

### Lowercase<S\>

将字符串类型 S 中的所有字符转换为小写

```ts
type 新类型 = Lowercase<string>;
type 新类型 = Lowercase<字符串字面量类型>;
```

---

### Capitalize<S\>

将字符串类型 S 中的首字母的字符转换为大写

```ts
type 新类型 = Capitalize<string>;
type 新类型 = Capitalize<字符串字面量类型>;
```

---

### Uncapitalize<S\>

将字符串类型 S 中的首字母的字符转换为小写

```ts
type 新类型 = Uncapitalize<string>;
type 新类型 = Uncapitalize<字符串字面量类型>;
```
