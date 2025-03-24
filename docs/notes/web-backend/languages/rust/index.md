---
prev: false
next: false
---

# Rust

![](/static/skill-images/web-backend--rust.png)

Rust 是一种编译型语言，文件后缀名是`.rs`

## 下载安装

::: code-group

```zsh [asdf]
# 1. 下载 asdf 插件与 rust 的版本
% asdf plugin add rust
% asdf install rust [版本]

# 2. 设置全局环境下的版本
% asdf global rust [版本]
% asdf reshim rust
```

:::

> 如下：本文使用 Rust v1.84.0

```zsh
% rustc --version         # [!code focus]
rustc 1.84.0 (9fc6b4312 2025-01-07)
```

## 编译与执行

Rust 代码需要先编译为二进制文件后才能执行

::: code-group

```zsh [cargo 编译项目 ( 方法一 )]
% cd [项目目录]

# 1. 编译 ( 本地调试 )
% cargo build
# 2. 执行生成的二进制文件
% target/debug/[项目同名二进制文件]

# 1. 编译 ( 正式发布 )
% cargo build --release
# 2. 执行生成的二进制文件
% target/release/[项目同名二进制文件]
```

```zsh [cargo 编译项目 ( 方法二 )]
% cd [项目目录]

# 编译并执行，若已存在编译的二进制文件且没有变化时则直接执行
% cargo run
```

```zsh [rustc 编译单个文件]
# 编译
% rustc [文件].rs

# 执行
% [生成的二进制文件]
```

:::

> [!IMPORTANT] <code>rustc</code> vs <code>cargo</code>
>
> - `rustc`: 多用于编译调试单个文件
> - `cargo`: 多用于编译构建整个项目

## 书写规范

- 文件名使用使用小写蛇形命名 ( snake_case )
- 应用程序需要一个入口函数`main`
- 使用分号`;`来分隔每个语句，一行建议仅书写一条语句
- 使用大括号`{ }`来定义代码块，每一级缩进 4 个空格

> [!IMPORTANT] 代码检查
>
> 使用`cargo check`进行代码检查
>
> ```zsh
> % cargo check
> ```

## 相关链接

- [Rust编程语言入门教程](https://www.bilibili.com/video/BV1hp4y1k7SV?spm_id_from=333.788.videopod.episodes&vd_source=8960252a3845b76b699282b11f36ab5c)
- [Rust编程视频教程（进阶）](https://www.bilibili.com/video/BV1FJ411Y71o?spm_id_from=333.788.videopod.episodes&vd_source=8960252a3845b76b699282b11f36ab5c)
