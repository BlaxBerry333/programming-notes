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

## 代码执行

Rust 代码需要先编译为二进制文件后才能执行

```zsh
% rustc [项目入库文件].rs
% [生成的二进制文件]
```

## 相关链接

- [2024 Rust现代实用教程](https://www.bilibili.com/video/BV15y421h7j7/?spm_id_from=333.337.search-card.all.click&vd_source=8960252a3845b76b699282b11f36ab5c)
