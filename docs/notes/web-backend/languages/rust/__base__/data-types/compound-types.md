# Rust 复合类型

> Compound Types

## 数组

数组长度固定，其中元素类型必须相同

```rs
fn main() {
    let 数组变量: [元素类型; 元素个数] = [元素1, 元素2, ...];    // [!code focus:2]
    let 数组变量: [元素类型; 元素个数] = [相同元素; 元素个数];
}
```

```rs
fn main() {
    // 访问数组元素                 // [!code focus:8]
    let 元素 = 数组变量[索引];

    // 数组长度
    let 长度: usize = 数组变量.len();

    // 数组解构
    let [x, y, z] = 数组变量;
}
```

::: details 例子: 访问数组元素

```rs
fn main() {
    let arr: [u32; 3] = [1, 2, 3];        // [!code focus:6]

    println!("{:?}", arr);    // [1, 2, 3]
    println!("{}", arr[0]);   // 1
    println!("{}", arr[1]);   // 2
    println!("{}", arr[2]);   // 3
}
```

:::

## 元组

元组的长度固定，其中元素类型可以不同

```rs
fn main() {
    let 元组变量: (元素类型1, 元素类型2, ...) = (元素1, 元素2, ...);    // [!code focus]
}
```

```rs
fn main() {
    // 访问元组元素                 // [!code focus:5]
    let 元素 = 元组变量.索引;

    // 元组解构
    let (x, y, z) = 元组变量;
}
```

::: details 例子: 访问元组元素

```rs
fn main() {
    let tuple: (u32, f64, u32) = (1, 2.0, 3);        // [!code focus:5]

    println!("{:?}", tuple);    // (1, 2.0, 3)
    println!("{}", tuple.0);    // 1
    println!("{}", tuple.1);    // 2.0
    println!("{}", tuple.2);    // 3
}
```

:::

::: details 例子: 元组解构

```rs
fn main() {
    let (x, y, z) = (1, 2, 3);          // [!code focus:2]
    println!("{}", x);      // 1
    println!("{}", y);      // 2
    println!("{}", z);      // 3
}
```

:::
