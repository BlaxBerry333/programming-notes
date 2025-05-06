---
prev: false
next: false
---

# Dart

![](/static/skill-images/cross-platform--dart.png)

Dart 是一种编译型和解释型结合的语言，文件后缀名是`.dart`

开发时使用 JIT 即时编译，发布时则使用 AOT 编译为本地机器代码

## 下载安装

Dart 与 Flutter 框架紧密集成无需单独安装与配置 ( Flutter SDK 中包含 Dart SDK ) [更多详见](/notes/web-frontend/frameworks/flutter)


::: code-group

```zsh [asdf]
# 0. 下载前提库
% brew install jq

# 1. 下载 asdf 插件与 dart 的版本
% asdf plugin add flutter
% asdf install flutter [版本]

# 2. 设置全局环境下的版本
% asdf global flutter [版本]
% asdf reshim flutter

# 3. 一劳永逸将所有的 Dart 的第三方工具添加到环境变量
% export PATH="$PATH":"$HOME/.pub-cache/bin" >> ~/.zshrc
% source ~/.zshrc
```

:::

> 如下：本文使用 Dart v3.5.0

```zsh
% dart --version         # [!code focus]
Dart SDK version: 3.5.0 (stable) (Tue Jul 30 02:17:59 2024 -0700) on "macos_arm64"
```

## 书写规范

- 文件名使用使用小写蛇形命名 ( snake_case )
- 应用程序需要一个入口函数`main`
- 使用分号`;`来分隔每个语句，一行建议仅书写一条语句
- 使用大括号`{ }`来定义代码块，每一级缩进 2 个空格

```dart
void main() {
  print("Hello World!");
}

main();
```

> [!IMPORTANT] 代码风格
>
> 建议使用`dart format`进行统一代码的风格
>
> ```zsh
> % dart format .                    # 格式化当前目录下所有文件
> % dart format lib                  # 格式化 lib 目录下所有文件
> % dart format path/to/file.dart    # 格式化指定文件
> ```
