# Rust 字符串类型

## &str ( 字符串字面量 )

&str 类型不可变，数据存放在栈 ( stack )

```rs
fn main() {
    let 字符串变量: &str = "字符串";    // [!code focus]
}
```

## String ( 动态字符串 )

String 类型动态可变，数据存储在堆 ( heap )

```rs
fn main() {
    let 变量: String = String::from("字符串");  // [!code focus]
}
```

```rs
fn main() {
    let mut s = String::from("hello");        // [!code focus:5]
    println!("{}", s);      // hello

    s.push_str(", world!");
    println!("{}", s);      // hello, world!
}
```
