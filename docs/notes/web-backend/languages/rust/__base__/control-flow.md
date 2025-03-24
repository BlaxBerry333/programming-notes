# Rust 流程控制

## 条件分支

> [!IMPORTANT] 条件分支是语句也是表达式
> 可作为语句使用，也可将返回值赋值给变量
>
> ```rs
> fn main() {
>     let 返回值 = if 条件 { 表达式或值 } else { 表达式或值 };      // [!code focus]
> }
> ```

---

### if

```rs
fn main() {
    if 条件 {                       // [!code focus:3]
        // ...
    }
}
```

::: details 例子

```rs
fn main() {
    let num = 10;                  // [!code focus:5]

    if num % 2 == 0 {
        println!("偶数");
    }
}
```

:::

---

### if...else

```rs
fn main() {
    if 条件 {                       // [!code focus:5]
        // ...
    } else {
        // ...
    }
}
```

::: details 例子

```rs
fn main() {
    let num = 10;                   // [!code focus:11]
    let condition: bool = num % 2 != 0;

    if condition {
        println!("奇数");
    } else {
        println!("偶数");
    }

    let result = if condition { "奇数" } else { "偶数" };
    println!("{}", result);
}
```

:::

---

### if...else if

```rs
fn main() {
    if 条件1 {                       // [!code focus:7]
        // ...
    } else if 条件2 {
        // ...
    } else if 条件3 {
        // ...
    }
}
```

---

### if...else if...else

```rs
fn main() {
    if 条件1 {                       // [!code focus:7]
        // ...
    } else if 条件2 {
        // ...
    } else {
        // ...
    }
}
```

## 循环分支

### for...in...

```rs
fn main() {
    for 变量 in 可迭代对象 {             // [!code focus:3]
        // ...
    }
}
```

::: details 例子：遍历数组元素

```rs
fn main() {
    for e in [1, 2, 3] {               // [!code focus:3]
        println!("{}", e);
    }
}
```

:::

---

### for...in...Range

```rs
fn main() {
    for x in 起始值..终止值 {                     // [!code focus:15]
        // ...
    }

    for x in 起始值..=终止值 {
        // ...
    }

    for x in (起始值..终止值).step_by(步长) {
        // ...
    }

    for x in (起始值..终止值).rev() {
        // ...
    }
}
```

::: details 例子：遍历范围 ( Range )

```rs
fn main() {
    for e in 0..4 {                             // [!code focus:15]
        print!("{}", e);    // 0123
    }

    for e in 0..=4 {
        print!("{}", e);    // 01234
    }

    for e in (0..4).rev() {
        print!("{}", e);    // 3210
    }

    for e in 'a'..='e' {
        print!("{}", e);    // abcde
    }
}
```

:::

---

### loop...

```rs
fn main() {
    loop {                               // [!code focus:6]
        // ...
        if 条件 {
            break;
        }
    }
}
```

---

### while...

```rs
fn main() {
    while 条件 {                        // [!code focus:4]
        // ...
        // 中止条件的变量迭代
    }
}
```

::: details 例子：遍历打印 10 次

```rs
fn main() {
    let mut num: i32 = 0;               // [!code focus:6]

    while num < 10 {
        println!("{}", num);
        num += 1;
    }
}
```

:::
