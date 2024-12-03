# Dart 库与包

Dart 是通过库与包来实现模块化开发

> [!IMPORTANT] 库、包
>
> - 库 ( Library ): 项目中每个`.dart`文件都被视为一个库
> - 包 ( Package ): 包含一系列相关库文件的目录

## 库的导入

通过关键字`import`导入库文件

直接导入的库中的成员可在当前库中直接使用

为了避免命名冲突可在导入库时，通过关键字`as`为其定义一个别名，从该别名中访问其中成员

::: code-group

```dart [完全导入]
import "dart:内置库";                       // [!code focus:7]

import "package:第三方库";

import "package:项目名/路径/自定义库.dart";

import "当前文件所在目录路径/路径/自定义库.dart";


void main() {
  print(成员);                             // [!code focus:2]
  成员();
}
```

```dart [部分导入]
import "库" show 要导入的成员;
import "库" show 要导入的成员1, 要导入的成员2;

import "库" hide 不导入的成员;
import "库" hide 不导入的成员1, 不导入的成员2;
```

```dart [别名导入]
import "库" as 别名;                        // [!code focus:3]

import "库" show 要导入的成员 as 别名;
import "库" hide 不导入的成员 as 别名;


void main() {
  print(别名.成员);                         // [!code focus:2]
  别名.成员();
}
```

```dart [延迟导入]
import "库" deferred as 别名;


Future<void> main() async {
  print(别名.成员);
  await 别名.成员();
}
```

:::

## 库的导出

```dart
library 库名;

export "路径/自定义库.dart";
export "路径/自定义库.dart";
```
