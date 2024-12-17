# Dart 第三方包管理

## 目录结构

Dart 使用全局缓存机制来管理第三方包

所有的第三方包都被下载并存储于全局的`/.pub-cache`目录中

各个工作区目录中都通过`pubspec.yaml`文件指定其依赖的第三方包

::: code-group

```[目录结构]
[全局目录]
├─ .pub-cache/
│   └─ ...
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

dev_dependencies:
  依赖包: 依赖包版本
  依赖包: 依赖包版本
```

:::

## 常用命令

|                             | 说明                               |
| --------------------------- | ---------------------------------- |
| `flutter pub add [包名]`    | 获取指定的第三方包                 |
| `flutter pub remove [包名]` | 移除指定的第三方包                 |
| `flutter pub get`           | 获取`pubspec.yaml`中记录的第三方包 |
