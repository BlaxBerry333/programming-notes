# Rust 内存管理与所有权

## 栈与堆

> [!IMPORTANT] 栈 vs 堆
>
> - 数据存储时：栈比堆快 ( 压栈不需要寻找存储空间 )
> - 数据查询时：栈比堆快 ( 堆需要通过指针才找到对应的数据 )

---

### 栈内存 ( Stack )

大小固定的、已知的数据存储在栈上

|                          | 说明                       |
| ------------------------ | -------------------------- |
| 存入数据 ( 压栈 / 入栈 ) | 按照值的接收顺序存储       |
| 移除数据 ( 弹栈 / 出栈 ) | 按照值的接收的相反顺序释放 |

<!-- 函数调用时：值传入函数，函数本地的变量被压栈，函数执行结束后弹栈 -->

---

### 堆内存 ( Heap )

编译时大小不固定、值会动态变化的数据存储在堆上

|                   | 说明                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| 存入数据 ( 分配 ) | 系统会自动寻找足够大的内存空间进行存储，并返回一个指向内存空间的指针<br/> 指针的大小固定可以存储在栈上 |

## 所有权

> Ownership

Rust 没有垃圾回收机制，而是通过所有权机制来管理内存

<!-- - 可以跟踪使用堆内存的数据
- 可以最小化堆上的重复数据
- 可以清理堆上未使用的数据 -->

> [!IMPORTANT] 所有权规则
>
> - 每个值都有一个变量，该变量为该值的所有者
> - 每个值只有一个所有者
> - 当值的所有者离开作用域时，该值被自动销毁

---

### 移动

> Move

- 堆中分配的数据被赋值给一个新变量时
- 堆中分配的数据作为参数被传入一个函数时

数据的所有权会移动，原所有者被销毁无法再访问

若想保持数据的原所有者的所有权可以：克隆原所有者、引用原所有者

::: code-group

```rs [赋值变量]
fn main() {
    let a: String =  String::from("hello");     // [!code focus:5]
    let b: String = a;  // a → b

    println!("{}", a);  // 报错: borrow of moved value: `a` value borrowed here after move // [!code error]
    println!("{}", b);  // hello
}
```

```rs [传入函数]
fn main() {
    let s: String =  String::from("hello");     // [!code focus:5]
    let l = handler(s); // s → handler函数内部

    println!("{}", s);  // 报错: borrow of moved value: `s` value borrowed here after move // [!code error]
    println!("{}", l);  // hello
}

fn handler(s: String) -> usize {         // [!code focus:3]
   s.len()
}
```

:::

---

### 复制

> Copy

栈中存储的数据被赋值给一个新变量时仅值被复制，不会发生所有权转移，原所有者仍可被访问

```rs
fn main() {
    let x:&str = "hello";           // [!code focus:5]
    let y: &str = x;

    println!("{}", x);  // hello
    println!("{}", y);  // hello
}
```

---

### 克隆

> Clone

堆中分配的数据可通过`clone()`方法进行克隆，新旧变量的所有权相互独立

```rs
fn main() {
    let a: String =  String::from("hello");     // [!code focus:6]
    let b: String = a;                          // [!code --]
    let b: String = a.clone();                  // [!code ++]

    println!("{}", a);  // hello
    println!("{}", b);  // hello
}
```

---

### 引用

> Reference

- 堆中分配的数据的引用被赋值给一个新变量时，不会发生所有权的移动
- 堆中分配的数据作为参数被传入一个函数时，不会发生所有权的移动

引用可理解为一个指向目标数据的指针

引用默认不可变，不能直接修改引用的数据，但是可变引用`&mut`可以修改

::: code-group

```rs [赋值变量]
fn main() {
    let a: String =  String::from("hello");
    let b: String = a;                          // [!code --]
    let b: &String = &a;                        // [!code ++]

    println!("{}", a);  // hello
    println!("{}", b);  // hello
}
```

```rs [传入函数]
fn main() {
    let s: String =  String::from("hello");         // [!code focus:7]

    let l = handler(s);                             // [!code --:2]
    println!("{}", s);   // 报错: borrow of moved value: `s` value borrowed here after move // [!code error]

    let l = handler_keep_ownership(&s);             // [!code ++:2]
    println!("{}", s);  // hello
}

fn handler(s: String) -> usize {                    // [!code focus:7] // [!code --:3]
   s.len()
}
fn handler_keep_ownership(s: &String) -> usize {    // [!code ++:3]
   s.len()
}
```

:::

---

### 可变引用

> Mutable Reference

::: code-group

```rs [赋值变量]
fn main() {
    let mut a: String =  String::from("hello");     // [!code focus:6]
    let b: &mut String = &mut a;

    b.push_str(" world");
    println!("{}", b);  // hello world
    println!("{}", a);  // hello
}
```

```rs [传入函数]
fn main() {
    let mut s: String =  String::from("hello");   // [!code focus:3]
    let l = use_and_change(&mut s);
    println!("{}", l);      // 11
}

fn use_and_change(s: &mut String) -> usize {      // [!code focus:4]
    s.push_str(" world");
    s.len()
}
```

:::

为了防止数据竞争，一个作用域内只能有一个可变引用

```rs
fn main() {
    let mut a: String = String::from("hello");
    let b: &mut String = &mut a;
    let c: &mut String = &mut a;  // 报错: cannot borrow `a` as mutable more than once at a time second mutable borrow occurs here // [!code error]
    println!("{} {}", b, c);
}
```

```rs
fn main() {
    let mut a: String = String::from("hello");
    let b: &mut String = &mut a;

    println!("{}", a);  // 报错: cannot borrow `a` as immutable because it is also borrowed as mutable immutable borrow occurs here // [!code error]
    println!("{}", b);
}
```

---

### 借用

> Borrow

函数将数据的引用作为参数时被称为借用，不会发生参数的所有权的移动，原所有者仍可被访问

在函数内无法直接修改引用，但是借用的是可变引用时则可修改

```rs
fn main() {
    let s1: String =  String::from("hello");    // [!code focus:6]
    let l = only_use(&s1);

    let mut s2: String =  String::from("hello");
    let l = use_and_change(&mut s2);
    println!("{}", l);      // 11
}

fn only_use(s: &String) -> usize {              // [!code focus:4]
    s.push_str(" world");   // 报错 // [!code error]
    s.len()
}

fn use_and_change(s: &mut String) -> usize {    // [!code focus:4]
    s.push_str(" world");
    s.len()
}
```
