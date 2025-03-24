# Rust 函数

## 定义与调用

- 函数的定义使用关键字`fn`
- 函数名使用小写蛇形命名 ( snake_case )

```rs
fn 函数() {                         // [!code focus:3]
    // ...
}

fn main() {
    函数();                        // [!code focus]
}
```

## 返回值

- 返回值默认是函数体中最后一个表达式的值 ( 表达式不能加分号否则被视为一个语句 )
- 可以使用关键字`return`提前返回指定值

```rs
// 使用默认返回值
fn 函数() -> 返回值类型 {
    表达式
}

// 使用 return 返回
fn 函数() -> 返回值类型 {
    return 表达式;
}
```

::: details 例子: 验证返回值的两种方式

```rs
fn f1(x: i32) -> i32 {              // [!code focus:3]
    x + 1
}

fn f2(x: i32) -> i32 {              // [!code focus:3]
    return x + 1;
}

fn main() {
    println!("{}", f1(10));  // 11  // [!code focus:2]
    println!("{}", f2(10));  // 11
}
```

:::

## 参数

```rs
fn 函数(形参1: 数据类型, 形参2: 数据类型,  ...) {     // [!code focus:3]
    // ...
}

fn main() {
    函数(实参1, 实参2, ...);                        // [!code focus]
}
```
