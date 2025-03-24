# Cargo

Cargo 是 Rust 的项目构建以及包管理工具，开箱即用无需下载

> 如下：本文使用的 Rust v1.84.0

```zsh
% rustc --version                       # [!code focus]
rustc 1.84.0 (9fc6b4312 2025-01-07)

% cargo --version                       # [!code focus]
cargo 1.84.0 (66221abde 2024-11-19)
```

## 项目目录

::: code-group

```[初始目录结构 ( 应用 )]
[项目名]
├── src                         # 源代码目录
│   └── main.rs                 # 入口文件
│
├── target                      # 编译目录 ( 代码编译后生成 )
│   ├── debug                   # 调试目录
│   │  └── [项目名二进制文件]
│   └── release                 # 发布目录
│      └── [项目名二进制文件]
│
├── cargo.lock                  # 项目依赖版本 ( 代码编译后生成 )
└── Cargo.toml                  # 项目配置文件
```

````[初始目录结构 ( 库 )]
[项目名]
├── src                         # 源代码目录
│   └── lib.rs                  # 入口文件
│
└── Cargo.toml                  # 项目配置文件
:::

---

### Cargo.toml

```toml
[package]
name = "项目_名称"                       # 项目名称
version = "0.1.0"                       # 项目版本
edition = "2021"                        # Rust 版本
authors = ["作者名 <邮箱地址>"]           # 项目作者

[dependencies]                          # 项目依赖
rand = "0.8.5"

[dev-dependencies]                      # 项目开发依赖
rand = "0.8.5"

[build-dependencies]                    # 项目生成依赖
rand = "0.8.5"
````

## 常用命令

| 命令                       | 说明                                                                 |
| -------------------------- | -------------------------------------------------------------------- |
| `cargo new [项目名]`       | 初始化应用项目                                                       |
| `cargo new --lib [项目名]` | 初始化库项目                                                         |
| `cargo build`              | 编译项目 ( 本地调试 ) <br/>生成的二进制文件位于目录`target/debug/`   |
| `cargo build --release`    | 编译项目 ( 正式发布 ) <br/>生成的二进制文件位于目录`target/release/` |
| `cargo run`                | 编译并执行项目                                                       |
| `cargo clean`              | 清空生成的编译目录`target`                                           |
| `cargo check`              | 检查项目代码                                                         |
| `cargo test`               | 运行测试                                                             |
| `cargo install`            | 向全局安装可执行文件 ( 命令行工具 )                                  |
| `cargo add [包名]`         | 向项目中添加包并更新`Cargo.toml`                                     |
| `cargo rm [包名]`          | 从项目中移除包并更新`Cargo.toml`                                     |
| `cargo update [包名]`      | 在项目中更新包并更新`Cargo.toml`                                     |
