# Rust 变量

## 变量定义

- 变量的定义使用关键字`let`
- 变量名使用小写蛇形命名 ( snake_case )
- 变量定义时可以省略数据类型 ( 编译器可以自动类型推导 )

```rs
fn main() {
    let 变量名1: 类型 = 值;  // [!code focus:2]
    let 变量名2 = 值;
}
```

---

### 不可变性

变量默认不可变 ( 不允许值改变否则报错 )

```rs
fn main() {
    let 变量 = 值;      // [!code focus:2]
    变量 = 新值;        // 报错: cannot mutate immutable variable // [!code error]
}
```

---

### 隐藏性

> Shadowing

Rust 允许在同一个作用域内定义多个同名变量

新变量会隐藏 ( 覆盖 )旧变量

```rs
fn main() {
    let x = 1;
    let x = x + 1;
    println!("{}", x);  // 2

    let x = "hello";
    println!("{}", x);  // hello

    let x = x.len();
    println!("{}", x);  // 5
}
```

> [!IMPORTANT] 隐藏性 vs <code>mut</code>
>
> - 隐藏性允许新变量的数据类型与旧变量可以不同
>
> ```rs
> fn main() {
>     let x: &str = "  ";                // [!code focus:5]
>     let mut x: usize = x.len();
>
>     let y: &str = "  ";
>     y = y.len();        // 报错: expected `&str`, found `usize` // [!code error]
> }
> ```

---

### 可变变量

若允许值改变则定义变量时需使用关键字`mut`

```rs
fn main() {
    let mut 变量 = 值;  // [!code focus:2]
    变量 = 新值;
}
```

不频繁更新的变量也可利用 [变量隐藏性](#隐藏性) 来实现覆盖

```rs
fn main() {
    let x = 值1;        // [!code focus:2]
    let x = 值2;
}
```

---

### 临时变量

临时变量用于存储不使用的值，可避免变量未使用的编译器报错

约定使用单下划线`_`命名

```rs
fn main() {
    let _ = 值;         // [!code focus:2]
}
```

---

### 静态变量

- 静态变量的定义使用关键字`static`
- 静态变量名使用大写蛇形命名 ( SNAKE_CASE )
- 静态变量定义时必须指明其数据类型，且值默认不可变

```rs
static 静态变量名: 类型 = 值;
```

> [!IMPORTANT] 静态变量是全局作用域
>
> ```rs
> static HELLO: &str = "Hello, Rust!";
>
> fn main() {
>    println!("{}", HELLO);  // Hello, Rust!
> }
> ```

## 常量定义

- 常量定义使用关键字`const`
- 常量名使用大写蛇形命名 ( SNAKE_CASE )
- 常量定义时必须指明其数据类型与值，且值不可改变
- 常量的值不可以在运行时动态计算，必须是在编译时已知的值
- 常量可在任何作用域内定义，但是是块级作用域

```rs
fn main() {
    const 常量名: 类型 = 值;    // [!code focus:2]
}
```

## 作用域

```rs
fn main() {
    let a: &str = "aaa";                // [!code focus:8]
    {
        let b: &str = "bbb";
        println!("{}", a);  // aaa
        println!("{}", b);  // bbb
    }
    println!("{}", a);      // aaa
    println!("{}", b);      // 报错: cannot find value `b` in this scope // [!code error]
 }
```
