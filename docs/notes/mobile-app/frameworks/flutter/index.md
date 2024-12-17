---
prev: false
next: false
---

# Flutter

![](/static/skill-images/mobile-app--flutter.png)

Flutter 是一个基于 Dart 的跨平台开发框架

性能接近原生，采用 GPU 渲染，应用的刷新频率高 ( 每秒帧数高，不卡顿 )

## 下载安装

::: code-group

```zsh [asdf]
# 0. 下载前提库                                           # [!code focus:13]
% brew install jq

# 1. 下载 asdf 插件与的版本
% asdf plugin add flutter
% asdf install flutter [版本]

# 2. 设置全局环境下的版本
% asdf global flutter [版本]
% asdf reshim flutter

# 4. 检查 Flutter SDK 的下载位置
% asdf where flutter
/Users/[用户名]/.asdf/installs/flutter/3.24.0-stable

# 3. 检查安装的版本                                       # [!code focus:2]
% flutter --version
Flutter 3.24.0 • channel stable • https://github.com/flutter/flutter.git
Framework • revision 80c2e84975 (5 months ago) • 2024-07-30 23:06:49 +0700
Engine • revision b8800d88be
Tools • Dart 3.5.0 • DevTools 2.37.2

```

:::

## 环境配置

Flutter 下载完成后需要检查开发环境、以及相关的工具链和依赖项是否完备

```zsh
% flutter doctor
```

::: details 例子：开发环境不配备 Android Studio、Xcode 时 ( 仅用于 Web 开发 )

```zsh
% flutter doctor                                              # [!code focus]
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.24.0, on macOS 13.2.1 22D68 darwin-arm64, locale zh-Hans-JP)
[✗] Android toolchain - develop for Android devices
    ✗ Unable to locate Android SDK.
      Install Android Studio from: https://developer.android.com/studio/index.html
      On first launch it will assist you in installing the Android SDK components.
      (or visit https://flutter.dev/to/macos-android-setup for detailed instructions).
      If the Android SDK has been installed to a custom location, please use
      `flutter config --android-sdk` to update to that location.

[✗] Xcode - develop for iOS and macOS
    ✗ Xcode installation is incomplete; a full installation is necessary for iOS and macOS development.
      Download at: https://developer.apple.com/xcode/
      Or install Xcode via the App Store.
      Once installed, run:
        sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
        sudo xcodebuild -runFirstLaunch
    ✗ CocoaPods not installed.
        CocoaPods is a package manager for iOS or macOS platform code.
        Without CocoaPods, plugins will not work on iOS or macOS.
        For more info, see https://flutter.dev/to/platform-plugins
      For installation instructions, see https://guides.cocoapods.org/using/getting-started.html#installation
[✓] Chrome - develop for the web
[!] Android Studio (not installed)
[✓] VS Code (version 1.95.3)
[✓] Connected device (2 available)
[✓] Network resources

! Doctor found issues in 3 categories.
```

:::

::: code-group

```json{0} [VSCode 插件配置]
{
  "dart.flutterSdkPath": "/Users/[用户名]/.asdf/installs/flutter/[版本]",  // [!code ++:4]
  "dart.previewFlutterUiGuides": true,
  "dart.previewFlutterUiGuidesCustomTracking": true,
  "dart.closingLabels": false
}
```

:::

## 项目初始化

```zsh
# 1. 创建项目，进入项目目录                   # [!code focus:6]
% flutter create [项目名]
% cd [项目名]

# 2. 启动项目
% flutter run
Connected devices:
macOS (desktop) • macos  • darwin-arm64   • macOS 13.2.1 22D68 darwin-arm64
Chrome (web)    • chrome • web-javascript • Google Chrome 131.0.6778.140

No wireless devices were found.

[1]: macOS (macos)
[2]: Chrome (chrome)
Please choose one (or "q" to quit): 2
Launching lib/main.dart on Chrome in debug mode...
Waiting for connection from debug service on Chrome...              7.2s
This app is linked to the debug service: ws://127.0.0.1:63280/9IKi7KotlxM=/ws
Debug service listening on ws://127.0.0.1:63280/9IKi7KotlxM=/ws

🔥  To hot restart changes while running, press "r" or "R".
For a more detailed help message, press "h". To quit, press "q".

A Dart VM Service on Chrome is available at: http://127.0.0.1:63280/9IKi7KotlxM=
The Flutter DevTools debugger and profiler on Chrome is available at: http://127.0.0.1:9101?uri=http://127.0.0.1:63280/9IKi7KotlxM=
```

在启动状态的 flutter 项目终端的命令行中可以使用快捷指令

| 常用快捷命令 | 说明                         |
| :----------: | ---------------------------- |
|     `r`      | 热重载 ( Hot Reload)         |
|     `R`      | 重启                         |
|     `q`      | 中止并退出                   |
|     `p`      | 切换辅助线的展示             |
|     `o`      | 切换不同操作系统下的展示样式 |

## 项目目录结构

::: code-group

```[目录结构]
[项目目录]
├─ .dart_tool/
│
├─ android/
├─ ios/
├─ linux/
├─ macos/
├─ windows/
├─ web/
│
├─ build/
├─ test/
├─ lib/
│  └─ main.dart     # 项目入口文件
│
├─ analysis_options.yaml
├─ pubspec.yaml
├─ pubspec.lock
│
└─ ...
```

:::

## 组件

> Widget

组件是 Flutter 中构建 UI 的基本单元，界面上所有元素都可以用组件展示

组件的实质都为 Dart 类，使用时需要通过实例化创建组件的实例对象

::: code-group

```dart [lib/main.dart]
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: 其他组件实例,
      ),
    ),
  );
}
```

## 相关链接

[带有推送功能的聊天应用](https://www.bilibili.com/video/BV19RYNe7ESa?spm_id_from=333.788.recommend_more_video.6&vd_source=8960252a3845b76b699282b11f36ab5c)
