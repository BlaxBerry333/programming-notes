# Dart 库与包

Dart 是通过库与包来实现模块化开发

> [!IMPORTANT] 库、包
>
> - 库 ( Library ): 项目中每个`.dart`文件都被视为一个库
> - 包 ( Package ): 包含一系列相关库文件的目录

## 库的导入

### 一般导入

通过关键字`import`导入库文件后，其中的成员便可在当前库中直接使用

```dart
import "dart:内置库";                       // [!code focus:5]

import "package:第三方库";

import "路径/路径/自定义库.dart";


void main(){
  print(成员);                             // [!code focus:2]
  成员();
}
```

---

### 别名

可在导入库时通过关键字`as`为其定义一个别名，其中成员使用时需从该别名中访问

```dart
import "库" as 别名;               // [!code focus]


void main(){
  print(别名.成员);                // [!code focus:2]
  别名.成员();
}
```

---

### 部分导入

```dart
import "库" show 要导入的成员;                  // [!code focus:5]
import "库" show 要导入的成员1, 要导入的成员2;

import "库" show 不导入的成员;
import "库" show 不导入的成员1, 不导入的成员2;
```
