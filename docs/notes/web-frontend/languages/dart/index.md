---
prev: false
next: false
---

# Dart

![](/static/skill-images/cross-platform--dart.png)

Dart 是一种编译型和解释型结合的语言，文件后缀名是`.dart`

开发时使用 JIT 即时编译，发布时则使用 AOT 编译为本地机器代码

## 下载安装

Dart 与 Flutter 框架紧密集成无需单独安装与配置 ( Flutter SDK 中包含 Dart SDK )

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

## 环境配置

::: code-group

```json{0} [VSCode 插件配置]
{
  "dart.flutterSdkPath": "/Users/[用户名]/.asdf/installs/flutter/[版本]",  // [!code ++:4]
  "dart.previewFlutterUiGuides": true,
  "dart.previewFlutterUiGuidesCustomTracking": true,
  // "dart.closingLabels": false
}
```

:::

## 书写规范

- 使用分号`;`来分隔每个语句，一行建议仅书写一条语句
- 使用大括号`{ }`来定义代码块，每一级缩进 2 个空格
