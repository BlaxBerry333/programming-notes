# Dart 第三方包管理

## 目录结构

Dart 使用全局缓存机制来管理第三方包

所有的第三方包都被下载并存储于全局的`～/.pub-cache`目录中

各个工作区目录中都通过`pubspec.yaml`文件指定其依赖的第三方包

建议将所有的第三方库的`bin`目录全部添加到本机 PATH 环境变量，以方便在命令行中直接运行

::: code-group

```[目录结构]
[全局目录]
├─ .pub-cache/
│   └─ ...
│
├─ .zshrc
│
├─ [工作区目录]/
│   ├─ pubspec.yaml
│   ├─ pubspec.lock
│   └─ ...
│
├─ [工作区目录]/
│   ├─ pubspec.yaml
│   ├─ pubspec.lock
│   └─ ...
│
└─ ...
```

```yaml [pubspec.yaml]
name: "项目名称"
description: "项目描述"
publish_to: "none"

version: 项目版本

environment:
  sdk: Dart SDK 版本

dependencies:
  依赖包: 依赖包版本
  依赖包: 依赖包版本
  依赖包:
    git:
      url: 仓库地址
      ref: 分支名

dev_dependencies:
  依赖包: 依赖包版本
  依赖包: 依赖包版本
```

```zsh [.zshrc]
export PATH="$PATH":"$HOME/.pub-cache/bin"    # [!code ++]
```

:::

## 常用命令

|                             | 说明                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `flutter pub add [包名]`    | 获取指定的第三方包                                                                        |
| `flutter pub remove [包名]` | 移除指定的第三方包                                                                        |
| `flutter pub get`           | 获取`pubspec.yaml`中记录的第三方包并缓存到本机`.pub-cache`中                              |
| `flutter pub cache clean`   | 清空本机`.pub-cache`中缓存的所有包<br/>可在清空后再重新下载来解决一些特定场合包的冲突问题 |
| `flutter pub cache repair`  | 修复本机`.pub-cache`中缓存的包的问题                                                      |
