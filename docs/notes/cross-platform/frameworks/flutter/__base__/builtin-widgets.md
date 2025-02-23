# Flutter 常用内置组件

Flutter 内置组件实质为 Dart 类，使用时需要通过实例化创建组件的实例对象

## APP

### MaterialApp 组件

可用于作为项目的根组件

提供了 Material Design 风格的功能和特性 ( 包括主题、导航、路由管理等 )

建议将所有的组件定义在 MaterialApp 与 Scaffold 组件中

```dart
import 'package:flutter/material.dart';

var MaterialApp根组件实例 = MaterialApp(
  home: 其他组件实例,
  // ...
);

void main() {
  runApp(MaterialApp根组件实例);
}
```

---

### Scaffold 组件

可用于构建 Material Design 风格的基本页面的根组件

建议将所有的组件定义在 MaterialApp 与 Scaffold 组件中

```dart
import 'package:flutter/material.dart';

var Scaffold组件实例 = Scaffold(
  appBar: AppBar组件实例,
  body: 其他组件实例,
  floatingActionButton: FloatingActionButton组件实例,
  bottomNavigationBar: BottomNavigationBar组件实例,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold组件实例,
    ),
  );
}
```

::: details 例子：

```dart{0}
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(                                     // [!code hl:12]
      appBar: AppBar(
        title: Text(
          'Flutter App',
          textDirection: TextDirection.ltr,
        ),
      ),
      body: Text(
        'Hello World',
        textDirection: TextDirection.ltr,
      ),
    ),
  ));
}

```

:::

## 文本与样式

### Text 组件

用于展示一段文本

```dart
import 'package:flutter/material.dart';

var Text组件实例 = Text(                  // [!code focus:5]
  '显示文本',
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Text组件实例,
      ),
    ),
  );
}
```

| 常用参数        | 说明                                                          | 常用参数值                                                                                  |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `textDirection` | 文本的书写方向<br/>值为枚举`TextDirection`                    | `TextDirection.ltr`: 从左向右<br/>`TextDirection.rtl`: 从右向左                             |
| `textAlign`     | 文本对齐位置<br/>值为枚举`TextAlign`                          | `TextAlign.center`: 居中对齐<br/>`TextAlign.left`: 左侧对齐<br/>`TextAlign.right`: 右侧对齐 |
| `overflow`      | 文本溢出屏幕时的处理方式<br/>值为枚举`TextOverflow`           | `TextOverflow.ellipsis`: 省略<br/>`TextOverflow.clip`: 剪切                                 |
| `maxLines`      | 文本的最大显示行数，值为整数<br/>超出时使用`overflow`属性的值 | ...                                                                                         |
| `style`         | 文本样式<br/>值为`TextStyle`类的实例                          | [更多详见](#textstyle)                                                                      |

::: details 例子：

```dart
void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Text(                           // [!code hl:6]
          'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          textDirection: TextDirection.ltr,
          overflow: TextOverflow.ellipsis,
          maxLines: 2,
        ),
      ),
    ),
  );
}
```

:::

---

### TextStyle

文本样式类

作为实例化组件类`Text`时传递的参数`style`的值

```dart
import 'package:flutter/material.dart';

var TextStyle类实例 = TextStyle(          // [!code focus:10]
  // ...
);

var Text组件实例 = Text(
  '显示文本',
  style: TextStyle类实例,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Text组件实例,
      ),
    ),
  );
}
```

| 常用参数          | 说明                                  | 参数值例子                                                                          |
| ----------------- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| `fontSize`        | 字体大小<br/>值为浮点数               | `TextDirection.ltr`: 左侧对齐<br/>`TextDirection.rtl`: 右侧对齐                     |
| `fontWeight`      | 字体粗细<br/>值为枚举`FontWeight`     | `FontWeight.bold`: 粗体<br/>`FontWeight.normal`: 细体<br/>`FontWeight.w600`: 具体值 |
| `backgroundColor` | 字体颜色<br/>值为`Colors`类的静态属性 | `Colors.red`<br/>`Color.fromRGBO()`: GRBO值<br/>`Color.fromARGB()`: ARGB值          |
| `backgroundColor` | 文本背景颜色                          | ...                                                                                 |
| `decorationColor` | 文本下划线颜色                        | ...                                                                                 |
| `letterSpacing`   | 字母间隔，值为整数                    | ...                                                                                 |
| `wordSpacing`     | 单词间隔，值为整数                    | ...                                                                                 |

::: details 例子：

```dart{0}
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Text(
          'Hello, world!',
          textDirection: TextDirection.ltr,
          style: TextStyle(                    // [!code hl:8]
            fontSize: 40.0,
            fontWeight: FontWeight.bold,
            fontStyle: FontStyle.italic,
            color: Colors.blueGrey,
            letterSpacing: 2.0,
            wordSpacing: 8.0,
          ),
        ),
      ),
    ),
  );
}

```

:::

## 容器

### Container 组件

用于作为一个容器，功能近似 HTML 标签`<div>`

```dart
import 'package:flutter/material.dart';

var Container组件实例 = Container(        // [!code focus:5]
  child: 其他组件实例,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Container组件实例,
      ),
    ),
  );
}
```

| 常用参数     | 说明                                                           | 参数值例子                                                                                                                                                                                                                                                                                                                                                                      |
| ------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `child`      | 展示内容，值为一个组件实例                                     | ...                                                                                                                                                                                                                                                                                                                                                                             |
| `height`     | 容器的高度<br/>值为浮点数                                      | ...                                                                                                                                                                                                                                                                                                                                                                             |
| `width`      | 容器的宽度<br/>值为浮点数                                      | ...                                                                                                                                                                                                                                                                                                                                                                             |
| `padding`    | 容器的内边距<br/>值为`EdgeInsets`类的实例                      | `EdgeInsets.only()`<br/>`EdgeInsets.all()`                                                                                                                                                                                                                                                                                                                                      |
| `margin`     | 容器的外边距<br/>值为`EdgeInsets`类的实例                      | `EdgeInsets.only()`<br/>`EdgeInsets.all()`                                                                                                                                                                                                                                                                                                                                      |
| `alignment`  | 容器内部的对齐方式<br/>值为`Alignment`类的静态属性             | `Alignment.topLeft`: 顶部左侧对齐<br/>`Alignment.topCenter`: 顶部居中对齐<br/>`Alignment.topRight`: 顶部右侧对齐<br/>`Alignment.centerLeft`: 居中左侧对齐<br/>`Alignment.center`: 水平垂直居中对齐<br/>`Alignment.centerRight`: 居中右侧对齐<br/>`Alignment.bottomLeft`: 底部左侧对齐<br/>`Alignment.bottomCenter`: 底部居中对齐<br/>`Alignment.bottomRight`: 底部右侧对齐<br/> |
| `decoration` | 容器的背景色、圆角、阴影等样式<br/>值为`BoxDecoration`类的实例 | [更多详见](#boxdecoration)                                                                                                                                                                                                                                                                                                                                                      |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Container(                          // [!code hl:11]
          height: 50.0,
          width: 100.0,
          padding: const EdgeInsets.all(8.0),
          margin: const EdgeInsets.only(top: 40.0, right: 8.0, bottom: 40.0, left: 8.0),
          alignment: Alignment.center,
          child: Text(
            'Hello',
            textDirection: TextDirection.ltr,
          ),
        ),
      ),
    ),
  );
}
```

:::

---

### BoxDecoration

容器样式类

作为实例化组件类`Container`时传递的参数`decoration`的值

```dart
import 'package:flutter/material.dart';

var BoxDecoration类实例 = BoxDecoration(     // [!code focus:10]
  // ...
);

var Container组件实例 = Container(
  decoration: BoxDecoration类实例,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Container组件实例,
      ),
    ),
  );
}
```

| 常用参数       | 说明                                           | 参数值例子           |
| -------------- | ---------------------------------------------- | -------------------- |
| `border`       | 容器边框样式，值为`BoxBorder`类的实例          | `Border.all()`       |
| `borderRadius` | 容器边框圆角样式，值为`BorderRadius`类的实例   | `BorderRadius.all()` |
| `boxShadow`    | 容器阴影样式，值为`BoxShadow`类的实例的列表    | `[ BoxShadow() ]`    |
| `gradient`     | 容器背景过渡样式，值为`LinearGradient`类的实例 | `LinearGradient()`   |
| `shape`        | 容器形状，值为枚举`BoxShape`                   | `BoxShape.circle`    |

::: details 例子：

```dart{0}
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Container(
          height: 100,
          width: 100,
          decoration: BoxDecoration(                          // [!code hl:19]
            border: Border.all(
              color: Colors.black,
              width: 2.0,
            ),
            borderRadius: const BorderRadius.all(Radius.circular(8.0)),
            boxShadow: const <BoxShadow>[
              BoxShadow(
                color: Colors.black,
                blurRadius: 2.0,
                offset: Offset(2.0, 2.0),
              ),
            ],
            gradient: const LinearGradient(
              colors: <Color>[Colors.blue, Colors.yellow],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Text(
            'Hello',
            textDirection: TextDirection.ltr,
          ),
        ),
      ),
    ),
  );
}
```

:::

---

### Card 组件

```dart
import 'package:flutter/material.dart';

var Card组件实例 = Card(                         // [!code focus:5]
  child: 其他组件实例,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Card组件实例,
      ),
    ),
  );
}
```

| 常用参数      | 说明                                              | 参数值例子                                                                 |
| ------------- | ------------------------------------------------- | -------------------------------------------------------------------------- |
| `child`       | 展示内容，值为一个组件实例                        | ...                                                                        |
| `elevation`   | 阴影海拔，值为浮点数                              | ...                                                                        |
| `color`       | 背景颜色<br/>值为`Colors`类的静态属性             | `Colors.red`<br/>`Color.fromRGBO()`: GRBO值<br/>`Color.fromARGB()`: ARGB值 |
| `shadowColor` | 阴影颜色<br/>值为`Colors`类的静态属性             | `Colors.red`<br/>`Color.fromRGBO()`: GRBO值<br/>`Color.fromARGB()`: ARGB值 |
| `shape`       | 容器形状<br/>值为`RoundedRectangleBorder`类的实例 | `RoundedRectangleBorder()`                                                 |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GridView.count(
          scrollDirection: Axis.vertical,
          crossAxisCount: 2,
          padding: EdgeInsets.all(8),
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
          children: [
            ...List.generate(
              2 * 10,
              (index) => Card(                                        // [!code hl:23]
                elevation: 5,
                color: Colors.grey,
                shadowColor: Colors.black87,
                shape: RoundedRectangleBorder( borderRadius: BorderRadius.circular(8)),
                child: Container(
                  padding: EdgeInsets.all(8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Image.network(
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet_5-OuOci4vkqC62wHBfY_9xT7qHx94U9Yf4pPn1TlhVM3SGb8UQt-yPxeDex9TefMW51mimsGySlGuXAlWiRQ",
                        fit: BoxFit.cover,
                      ),
                      Divider(),
                      Text(
                        'xxx' * 100,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 2,
                      ),
                    ]
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
```

:::

## 布局

### Column 组件

用于展示一组垂直排列的内容，继承自 Flex 组件类

子组件宽度会自适应占满 Column 容器，垂直方向的内容过长溢出屏幕时会报错

```dart
import 'package:flutter/material.dart';

var Column组件实例 = Column(                    // [!code focus:5]
  children: <Widget>[其他组件实例, 其他组件实例],
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Column组件实例,
      ),
    ),
  );
}
```

| 常用参数             | 说明                                                  | 参数值例子                                                                                                                   |
| -------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `children`           | 展示内容<br/>值为一个组件实例的列表                   | ...                                                                                                                          |
| `crossAxisAlignment` | 水平方向上的对齐方向<br/>值为枚举`CrossAxisAlignment` | `CrossAxisAlignment.start`<br/>`CrossAxisAlignment.center`<br/>`CrossAxisAlignment.bottom`                                   |
| `mainAxisAlignment`  | 垂直方向上的对齐方向<br/>值为枚举`MainAxisAlignment`  | `MainAxisAlignment.start`<br/>`MainAxisAlignment.center`<br/>`MainAxisAlignment.bottom`<br/>`MainAxisAlignment.spaceBetween` |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Column(                                             // [!code hl:13]
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            ...List.generate(
              3,
              (index) => Container(
                height: 100,
                color: index.isEven ? Colors.red : Colors.blue,
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
```

:::

---

### Row 组件

用于展示一组水平排列的内容，继承自 Flex 组件类

子组件高度会自适应占满 Row 容器，水平方向的内容过长溢出屏幕时会报错

```dart
import 'package:flutter/material.dart';

var Row组件实例 = Row(                          // [!code focus:5]
  children: <Widget>[其他组件实例, 其他组件实例],
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Row组件实例,
      ),
    ),
  );
}
```

| 常用参数             | 说明                                                  | 参数值例子                                                                                                                   |
| -------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `children`           | 展示内容<br/>值为一个组件实例的列表                   | ...                                                                                                                          |
| `crossAxisAlignment` | 垂直方向上的对齐方向<br/>值为枚举`CrossAxisAlignment` | `CrossAxisAlignment.start`<br/>`CrossAxisAlignment.center`<br/>`CrossAxisAlignment.bottom`                                   |
| `mainAxisAlignment`  | 水平方向上的对齐方向<br/>值为枚举`MainAxisAlignment`  | `MainAxisAlignment.start`<br/>`MainAxisAlignment.center`<br/>`MainAxisAlignment.bottom`<br/>`MainAxisAlignment.spaceBetween` |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Row(                                                // [!code hl:13]
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ...List.generate(
              3,
              (index) => Container(
                width: 100,
                color: index.isEven ? Colors.red : Colors.blue,
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
```

:::

---

### Wrap 组件

用于展示一组水平或垂直排列且可以换行或换列的内容，继承自 Flex 组件类

水平或垂直方向的内容过长溢出屏幕时会自动换行或换列

```dart
import 'package:flutter/material.dart';

var Wrap组件实例 = Wrap(                          // [!code focus:4]
  children: <Widget>[其他组件实例, 其他组件实例],
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Wrap组件实例,
      ),
    ),
  );
}
```

| 常用参数     | 说明                             | 参数值例子                                                        |
| ------------ | -------------------------------- | ----------------------------------------------------------------- |
| `children`   | 展示内容，值为一个组件实例的列表 | ...                                                               |
| `direction`  | 子组件的排列方向，值为枚举`Axis` | `Axis.horizontal`: 水平方向排列<br/>`Axis.vertical`: 垂直方向排列 |
| `spacing`    | 主轴上子组件的间隔，值为浮点数   | ...                                                               |
| `runSpacing` | 副轴上子组件的间隔，值为浮点数   | ...                                                               |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Wrap(                                               // [!code focus:17]
          direction: Axis.horizontal,
          alignment: WrapAlignment.start,
          runAlignment: WrapAlignment.center,
          spacing: 8,
          runSpacing: 8,
          children: [
            ...List.generate(
              30,
              (index) => Container(
                height: 100,
                width: 100,
                color: index.isEven ? Colors.red : Colors.blue,
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
```

:::

---

### Expand 组件

可用于在弹性盒子组件 ( Column、Row ) 内指定其中子组件所占的空间比例

```dart
import 'package:flutter/material.dart';

var Expanded组件实例 = Expanded(                         // [!code focus:10]
  child: 其他组件实例,
  flex: 所占空间比例,
);

var 弹性盒子组件实例 = 弹性盒子组件(
  children: <Widget>[其他组件实例, Expanded组件实例],
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: 弹性盒子组件实例,
      ),
    ),
  );
}
```

| 常用参数 | 说明                                                       | 参数值例子 |
| -------- | ---------------------------------------------------------- | ---------- |
| `child`  | 展示内容，值为一个组件实例                                 | ...        |
| `flex`   | 子组件在弹性盒子内所占的空间比例，值为整数<br/>默认值为`1` | ...        |

::: details 例子：

::: code-group

```dart [Row + Expanded]
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Row(
          children: [
            Container(
              width: 50,
              color: Colors.red,
            ),
            Expanded(                                 // [!code hl:8]
              flex: 2,
              child: Container(color: Colors.blue),
            ),
            Expanded(
              flex: 1,
              child: Container(color: Colors.green),
            )
          ],
        ),
      ),
    ),
  );
}
```

:::

---

### Center 组件

用于快速实现子组件的水平垂直居中展示

```dart
import 'package:flutter/material.dart';

var Center组件实例 = Center(                 // [!code focus:5]
  child: 其他组件实例,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Center组件实例,
      ),
    ),
  );
}
```

| 常用参数 | 说明                       | 参数值例子 |
| -------- | -------------------------- | ---------- |
| `child`  | 展示内容，值为一个组件实例 | ...        |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: const Center(                     // [!code hl:6]
          child: Text(
            'Hello, world!',
            textDirection: TextDirection.ltr,
          ),
        ),
      ),
    ),
  );
}
```

:::

---

### Stack 组件

用于实现子组件的堆叠展示，功能近似 CSS 属性`z-index`

最后定义的子组件展示在最顶层并覆盖其他子组件

可与 Positioned 组件结合使用实现 CSS 中的定位功能

```dart
import 'package:flutter/material.dart';

var Stack组件实例 = Stack(                       // [!code focus:5]
  children: <Widget>[其他组件实例, 其他组件实例]
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Stack组件实例,
      ),
    ),
  );
}
```

| 常用参数    | 说明                                               | 参数值例子                                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | 展示内容，值为一个组件实例的列表                   | ...                                                                                                                                                                                                                                                                                                                                                                             |
| `alignment` | 容器内部的对齐方式<br/>值为`Alignment`类的静态属性 | `Alignment.topLeft`: 顶部左侧对齐<br/>`Alignment.topCenter`: 顶部居中对齐<br/>`Alignment.topRight`: 顶部右侧对齐<br/>`Alignment.centerLeft`: 居中左侧对齐<br/>`Alignment.center`: 水平垂直居中对齐<br/>`Alignment.centerRight`: 居中右侧对齐<br/>`Alignment.bottomLeft`: 底部左侧对齐<br/>`Alignment.bottomCenter`: 底部居中对齐<br/>`Alignment.bottomRight`: 底部右侧对齐<br/> |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Stack(                      // [!code hl:16]
          children: [
            Container(
              height: 300,
              width: 300,
              color: Colors.red,
              child: Text("AAA"),
            ),
            Container(
              height: 100,
              width: 100,
              color: Colors.blue,
              child: Text("BBB"),
            ),
          ],
        ),
      ),
    ),
  );
}
```

:::

---

### Positioned 组件

可与 Stack 组件结合使用实现 CSS 中的定位功能

```dart
import 'package:flutter/material.dart';

var Positioned组件实例 = Positioned(           // [!code focus:10]
  children: 其他组件实例,
  // ...
);

var Stack组件实例 = Stack(
  children: <Widget>[其他组件实例, Positioned组件实例]
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Stack组件实例,
      ),
    ),
  );
}
```

| 常用参数 | 说明                                 | 参数值例子 |
| -------- | ------------------------------------ | ---------- |
| `child`  | 展示内容，值为一个组件实例           | ...        |
| `height` | 子组件的高度，值为浮点数             | ...        |
| `width`  | 子组件的宽度，值为浮点数             | ...        |
| `top`    | 子组件距离容器顶部的距离，值为浮点数 | ...        |
| `bottom` | 子组件距离容器底部的距离，值为浮点数 | ...        |
| `left`   | 子组件距离容器左侧的距离，值为浮点数 | ...        |
| `right`  | 子组件距离容器右侧的距离，值为浮点数 | ...        |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Container(
          child: Stack(                                   // [!code hl:34]
            children: [
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                height: 50,
                child: Container(color: Colors.blue),
              ),
              Positioned(
                top: 50,
                bottom: 50,
                left: 0,
                right: 0,
                child: ListView(
                  children: [
                    ...List.generate(
                      20,
                      (index) => ListTile(
                        title: Text("Item $index"),
                      ),
                    )
                  ],
                ),
              ),
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                height: 50,
                child: Container(color: Colors.amber),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}
```

:::

## 列表与网格

### ListView 组件

用于展示一组内容可以滚动的列表

```dart
import 'package:flutter/material.dart';

var ListView组件实例 = ListView(                // [!code focus:5]
  children: <Widget>[其他组件实例, 其他组件实例],
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: ListView组件实例,
      ),
    ),
  );
}
```

| 常用参数          | 说明                                          | 参数值例子                                                          |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| `children`        | 展示内容，值为一个组件实例的列表              | `[组件实例, 组件实例]`                                              |
| `scrollDirection` | 子组件的排列方向<br/>值为枚举`Axis`           | `Axis.horizontal`: 水平方向排列<br/>`Axis.horizontal`: 垂直方向排列 |
| `reverse`         | 反向排列，值为布尔值                          | ...                                                                 |
| `padding`         | 列表容器的内边距<br/>值为`EdgeInsets`类的实例 | `EdgeInsets.all()`<br/>`EdgeInsets.only()`                          |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: ListView(                                 // [!code hl:13]
          scrollDirection: Axis.vertical,
          padding: const EdgeInsets.only(top: 20.0, bottom: 20.0, left: 8.0, right: 8.0),
          children: List.generate(
            10,
            (index) => Container(
              child: Text(
                '${index + 1}',
                textDirection: TextDirection.ltr,
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
```

:::

---

### ListView.builder( )

可用于基于一个列表类型的数据动态创建一个 ListView 列表组件

```dart
import 'package:flutter/material.dart';

var ListView组件实例 =  ListView.builder(              // [!code focus:5]
  itemCount: 列表.length,
  itemBuilder: (context, index) => 子组件实例,
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: ListView组件实例,
      ),
    ),
  );
}
```

::: details 例子：

```dart
import 'package:flutter/material.dart';

final List mockList = List.generate(20, (index) => '${index + 1}');

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: ListView.builder(                          // [!code hl:7]
          itemCount: mockList.length,
          itemBuilder: (context, index) => ListTile(
            title: Text(mockList[index]),
            leading: Text("${index + 1}"),
          ),
        ),
      ),
    ),
  );
}
```

:::

---

### ListTile 组件

可用于在 ListView 组件中作为列表项

```dart
import 'package:flutter/material.dart';     // [!code focus:10]

var ListTile组件实例 = ListTile(
  // ...
);

var ListView组件实例 = ListView(
  children: <Widget>[ListTile组件实例],
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: ListView组件实例,
      ),
    ),
  );
}
```

| 常用参数   | 说明                                 | 参数值例子 |
| ---------- | ------------------------------------ | ---------- |
| `title`    | 列表项标题文本，值为一个组件实例     | ...        |
| `subtitle` | 列表项副标题文本，值为一个组件实例   | ...        |
| `leading`  | 列表项文本左侧内容，值为一个组件实例 | ...        |
| `trailing` | 列表项文本右侧内容，值为一个组件实例 | ...        |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: ListView(
          scrollDirection: Axis.vertical,
          children: <Widget>[
            ...List.generate(
              10,
              (index) => ListTile(
                title: Text("$index"),
                leading: Icon(Icons.abc),
                trailing: Icon(Icons.delete),
              ),
            ),
            ListTile(                                                                 // [!code hl:10]
              title: Text("AAA"),
              subtitle: Text("xxxxxxxxxxxxxxxxx", overflow: TextOverflow.ellipsis),
              leading: Image.asset("assets/images/chihuahua.png"),
            ),
            ListTile(
              title: Text("BBB"),
              subtitle: Text("xxxxxxxxxxxxxxxxx", overflow: TextOverflow.ellipsis),
              trailing: Image.asset("assets/images/chihuahua.png"),
            )
          ],
        ),
      ),
    ),
  );
}
```

:::

---

### GridView.count( )

可用于定义一个每行展示数固定的网格

网格中子组件的尺寸取决于固定展示个数，会自适应占满 GridView 容器

```dart
import 'package:flutter/material.dart';

var GridView组件实例 = GridView.count(              // [!code focus:6]
  crossAxisCount: 以行内展示的数据,
  children: <Widget>[其他组件实例, 其他组件实例],
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GridView组件实例,
      ),
    ),
  );
}
```

| 常用参数           | 说明                                          | 参数值例子                                                          |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------- |
| `children`         | 展示内容，值为一个组件实例的列表              | `[组件实例, 组件实例]`                                              |
| `scrollDirection`  | 子组件的排列方向<br/>值为枚举`Axis`           | `Axis.horizontal`: 水平方向排列<br/>`Axis.horizontal`: 垂直方向排列 |
| `crossAxisCount`   | 水平方向上展示的子组件个数<br/>值为整数       | ...                                                                 |
| `crossAxisSpacing` | 水平方向上各个子组件间距<br/>值为浮点数       | ...                                                                 |
| `mainAxisSpacing`  | 垂直方向上各个子组件间距<br/>值为浮点数       | ...                                                                 |
| `reverse`          | 反向排列，值为布尔值                          | ...                                                                 |
| `padding`          | 网格容器的内边距<br/>值为`EdgeInsets`类的实例 | `EdgeInsets.all()`<br/>`EdgeInsets.only()`                          |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GridView.count(                   // [!code hl:18]
          scrollDirection: Axis.vertical,
          reverse: true,
          crossAxisCount: 3,
          padding: EdgeInsets.all(8),
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
          children: [
            ...List.generate(
              3 * 10,
              (index) => Container(
                alignment: Alignment.center,
                color: Colors.red,
                child: Text('${index + 1}'),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
```

:::

---

### GridView.extent( )

可用于定义一个子组件宽度固定的网格

网格容器中每行展示的个数取决于子组件的宽度

```dart
import 'package:flutter/material.dart';

var GridView组件实例 = GridView.extent(              // [!code focus:6]
  maxCrossAxisExtent: 子组件固定宽度,
  children: <Widget>[其他组件实例, 其他组件实例],
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GridView组件实例,
      ),
    ),
  );
}
```

| 常用参数             | 说明                                          | 参数值例子                                                          |
| -------------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| `children`           | 展示内容<br/>值为一个组件实例的列表           | `[组件实例, 组件实例]`                                              |
| `scrollDirection`    | 子组件的排列方向<br/>值为枚举`Axis`           | `Axis.horizontal`: 水平方向排列<br/>`Axis.horizontal`: 垂直方向排列 |
| `maxCrossAxisExtent` | 子组件的最大宽度<br/>值为浮点数               | ...                                                                 |
| `crossAxisSpacing`   | 水平方向上各个子组件间距<br/>值为浮点数       | ...                                                                 |
| `mainAxisSpacing`    | 垂直方向上各个子组件间距<br/>值为浮点数       | ...                                                                 |
| `reverse`            | 反向排列，值为布尔值                          | ...                                                                 |
| `padding`            | 网格容器的内边距<br/>值为`EdgeInsets`类的实例 | `EdgeInsets.all()`<br/>`EdgeInsets.only()`                          |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GridView.count(                   // [!code hl:18]
          scrollDirection: Axis.vertical,
          reverse: true,
          maxCrossAxisExtent: 100,
          padding: EdgeInsets.all(8),
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
          children: [
            ...List.generate(
              3 * 10,
              (index) => Container(
                alignment: Alignment.center,
                color: Colors.red,
                child: Text('${index + 1}'),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
```

:::

---

### GridView.builder( )

可用于基于一个列表类型的数据动态创建一个 GridView 网格组件

```dart
import 'package:flutter/material.dart';

// 实现 GridView.count()                                        // [!code focus:14]
var GridView组件实例 = GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount类实例,
  itemCount: 列表.length,
  itemBuilder: (context, index) => 子组件实例,
);

// 实现 GridView.extent()
var GridView组件实例 = GridView.builder(
  gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent类实例,
  itemCount: 列表.length,
  itemBuilder: (context, index) => 子组件实例,
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GridView组件实例,
      ),
    ),
  );
}
```

::: details 例子：

::: code-group

```dart [SliverGridDelegateWithFixedCrossAxisCount]
import 'package:flutter/material.dart';

final List mockList = List.generate(20, (index) => '${index + 1}');

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GridView.builder(                                     // [!code hl:13]
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            mainAxisSpacing: 8.0,
            crossAxisSpacing: 8.0,
          ),
          itemCount: mockList.length,
          itemBuilder: (context, index) => Container(
            alignment: Alignment.center,
            color: Colors.red,
            child: Text(mockList[index]),
          ),
        ),
      ),
    ),
  );
}
```

```dart [SliverGridDelegateWithMaxCrossAxisExtent]
import 'package:flutter/material.dart';

final List mockList = List.generate(20, (index) => '${index + 1}');

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GridView.builder(                                       // [!code hl:13]
          itemCount: mockList.length,
          gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
            maxCrossAxisExtent: 100.0,
            mainAxisSpacing: 8.0,
            crossAxisSpacing: 8.0,
          ),
          itemBuilder: (context, index) => Container(
            alignment: Alignment.center,
            color: Colors.red,
            child: Text(mockList[index]),
          ),
        ),
      ),
    ),
  );
}
```

:::

---

### PageView 组件

```dart
import 'package:flutter/material.dart';

var PageView组件实例 = PageView(                // [!code focus:4]
  children: <Widget>[其他组件实例, 其他组件实例],
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: PageView组件实例,
      ),
    ),
  );
}
```

| 常用参数                 | 说明                                        | 参数值例子                                                          |
| ------------------------ | ------------------------------------------- | ------------------------------------------------------------------- |
| `children`               | 展示内容<br/>值为一个组件实例的列表         | `[组件实例, 组件实例]`                                              |
| `scrollDirection`        | 子组件的排列方向<br/>值为枚举`Axis`         | `Axis.horizontal`: 水平方向排列<br/>`Axis.horizontal`: 垂直方向排列 |
| `allowImplicitScrolling` | 是否缓存当前子组件前后的页面<br/>值为布尔值 | ...                                                                 |
| `onPageChanged`          | 子组件切换时的处理函数<br/>值为函数         | `(index) => print(index)`                                           |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      body: PageView(                               // [!code hl:13]
        scrollDirection: Axis.vertical,
        allowImplicitScrolling: true,
        onPageChanged: (index) => print(index),
        children: [
          ...List.generate(
            5,
            (index) => Center(
              child: Text('Page #${index + 1}'),
            ),
          )
        ],
      ),
    ),
  ));
}
```

:::

---

### PageView.builder( )

```dart
import 'package:flutter/material.dart';

var PageView组件实例 = PageView.builder(        // [!code focus:5]
  itemCount: 列表.length,
  itemBuilder: (context, index) => 子组件实例,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: PageView组件实例,
      ),
    ),
  );
}
```

::: details 例子:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      body: PageView.builder(                      // [!code hl:9]
        scrollDirection: Axis.vertical,
        allowImplicitScrolling: true,
        onPageChanged: (index) => print(index),
        itemCount: 5,
        itemBuilder: (context, index) => Center(
          child: Text('Page #${index + 1}'),
        ),
      ),
    ),
  ));
}
```

:::

## 图片与图标

### Image.asset( )

用于展示一个本地图片

建议用 Container 容器组件包裹里来方便设定样式

::: code-group

```dart [组件]
import 'package:flutter/material.dart';

var Image组件实例 = Container(               // [!code focus:6]
  child: Image.asset(
    "assets/images/本地图片路径",
    // ...
));

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Image组件实例,
      ),
    ),
  );
}
```

```[目录结构]
[项目目录]
│
├─ assets/              # 静态资源目录 // [!code ++:3]
│  └─ images/
│     └─ ...
│
├─ lib/
│  └─ main.dart
│
├─ pubspec.yaml
├─ pubspec.lock
│
└─ ...
```

```yaml{0} [pubspec.yaml]
flutter:                # [!code ++:3]
  assets:
    - assets/images/
```

:::

---

### Image.network( )

用于展示一个远程图片

建议用 Container 容器组件包裹里来方便设定样式

```dart
import 'package:flutter/material.dart';

var Image组件实例 = Container(               // [!code focus:6]
  child: Image.network(
    "远程图片路径",
    // ...
));

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Image组件实例,
      ),
    ),
  );
}
```

| 常用参数       | 说明                                                | 参数值例子                                                                                                        |
| -------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `fit`          | 图片充填<br/>值为枚举`BoxFit`                       | `BoxFit.fill`: 拉伸充满父容器，会变形<br/>`BoxFit.cover`: 拉伸充满父容器，会剪切<br/>`BoxFit.contain`: 原比例展示 |
| `repeat`       | 图片重复<br/>值为枚举`ImageRepeat`                  | `ImageRepeat.noRepeat`: 不重复<br/>`ImageRepeat.repeat`: 铺满父容器                                               |
| `errorBuilder` | 图片加载失败时的占位内容<br/>值为一个返回组件的函数 | `(context, error, stackTrace) => 组件实例`                                                                        |

::: details 例子：

```dart{0}
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Container(
          height: 100,
          child: Image.network(                                   // [!code hl:9]
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet_5-OuOci4vkqC62wHBfY_9xT7qHx94U9Yf4pPn1TlhVM3SGb8UQt-yPxeDex9TefMW51mimsGySlGuXAlWiRQ",
            fit: BoxFit.contain,
            repeat: ImageRepeat.noRepeat,
            errorBuilder: (context, error, stackTrace) => Text(
              "图片加载失败了",
              textDirection: TextDirection.ltr,
            ),
          ),
        ),
      ),
    ),
  );
}

```

:::

---

### Icon 组件

用于展示一个 Icon 图标

```dart
import 'package:flutter/material.dart';

var Icon组件实例 = Icon(                     // [!code focus:6]
  Icons类.静态属性,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Icon组件实例,
      ),
    ),
  );
}
```

| 常用参数 | 说明                                  | 参数值例子                                                                 |
| -------- | ------------------------------------- | -------------------------------------------------------------------------- |
| `color`  | 图标颜色<br/>值为`Colors`类的静态属性 | `Colors.red`<br/>`Color.fromRGBO()`: GRBO值<br/>`Color.fromARGB()`: ARGB值 |
| `size`   | 图标尺寸<br/>值为浮点数               | ...                                                                        |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Row(
          children: [
            Icon(Icons.home, size: 30.0),           // [!code hl:3]
            Icon(Icons.add, color: Colors.red),
            Icon(Icons.remove),
          ],
        ),
      ),
    ),
  );
}
```

:::

## 按钮

### ElevatedButton 组件

用于展示一个充填按钮

```dart
import 'package:flutter/material.dart';

var ElevatedButton组件实例 = ElevatedButton(                                 // [!code focus:5]
  child: 其他组件,
  onPressed: 点击逻辑函数,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: ElevatedButton组件实例,
      ),
    ),
  );
}
```

| 常用参数    | 说明                                | 参数值例子      |
| ----------- | ----------------------------------- | --------------- |
| `child`     | 展示内容，值为一个组件实例          | ...             |
| `onPressed` | 按钮点击事件处理函数，值为函数      | `() => {}`      |
| `style`     | 按钮样式，值为`ButtonStyle`类的实例 | `ButtonStyle()` |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Column(
          children: [
            ElevatedButton(                                 // [!code hl:26]
              child: Text("基础样式"),
              onPressed: () => print("xxxxx"),
            ),
            ElevatedButton.icon(
              icon: const Icon(Icons.search),
              label: Text("携带图标"),
              onPressed: () => print("xxxxx"),
            ),
            ElevatedButton(
              child: Text("自定义样式"),
              onPressed: () => print("xxxxx"),
              style: ButtonStyle(
                backgroundColor: WidgetStateProperty.all(Colors.cyan),
                foregroundColor: WidgetStateProperty.all(Colors.white),
                padding: WidgetStateProperty.all(EdgeInsets.all(16)),
              ),
            ),
            Container(
              height: 80,
              width: 150,
              child: ElevatedButton(
                child: Text("自定义尺寸"),
                onPressed: () => print("xxxxx"),
              ),
            )
          ],
        ),
      ),
    ),
  );
}
```

:::

---

### OutlinedButton 组件

用于展示一个边框按钮，使用方法等同于 ElevatedButton 组件

---

### TextButton 组件

用于展示一个文本按钮，使用方法等同于 ElevatedButton 组件

---

### IconButton 组件

用于展示一个图标按钮

```dart
import 'package:flutter/material.dart';

var IconButton组件实例 = IconButton(                                 // [!code focus:5]
  icon: Icon组件实例,
  onPressed: 点击逻辑函数,
  // ...
);

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: IconButton组件实例,
      ),
    ),
  );
}
```

| 常用参数    | 说明                                | 参数值例子      |
| ----------- | ----------------------------------- | --------------- |
| `icon`      | 图标，值为一个`Icon`组件实例        | `Icon()`        |
| `onPressed` | 按钮点击事件处理函数，值为函数      | `() => {}`      |
| `style`     | 按钮样式，值为`ButtonStyle`类的实例 | `ButtonStyle()` |

::: details 例子：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: IconButton(                   // [!code hl:4]
          icon: Icon(Icons.search),
          onPressed: () => print("xxxxx"),
        ),
      ),
    ),
  );
}
```

:::

## 弹出框

### AlertDialog 组件

用于展示一个提示框

需要结合内置函数`showDialog()`、`Navigator`使用

```dart
void 展示AlertDialog组件(BuildContext context) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: 其他组件实例,
      content: 其他组件实例,
      actions: [其他组件实例, 其他组件实例],
    ),
  );
}

void 关闭ALerDialog组件(BuildContext context) {
  Navigator.of(context).pop();
}
```

| AlertDialog 常用参数 | 说明                                 | 参数值例子             |
| :------------------: | ------------------------------------ | ---------------------- |
|       `title`        | Dialog标题，值为一个组件实例         | ...                    |
|      `content`       | Dialog内容，值为一个组件实例         | ...                    |
|      `actions`       | Dialog按钮组，值为一个组件实例的列表 | `[组件实例, 组件实例]` |

::: details 例子：

```dart
import 'package:flutter/material.dart';

class MyCustom extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        child: Text('Open Dialog'),
        onPressed: () => showDialog(                  // [!code hl:18]
          barrierDismissible: true,
          context: context,
          builder: (context) => AlertDialog(
            title: Text('Are you sure'),
            content: Text('Hello World'),
            actions: [
              TextButton(
                child: Text('Close'),
                onPressed: () => print("cancel"),
              ),
              TextButton(
                child: Text('Confirm'),
                onPressed: () => print("confirm"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: MyCustom(),
  ));
}
```

:::

---

### SimpleDialog 组件

用于展示一个列表选项提示框

需要结合内置函数`showDialog()`、`Navigator`使用

```dart
void 展示AlertDialog组件(BuildContext context) {
  showDialog(
    context: context,
    builder: (context) => SimpleDialog(
      title: 其他组件实例,
      children: [其他组件实例, 其他组件实例],
    ),
  );
}

void 关闭ALerDialog组件(BuildContext context) {
  Navigator.of(context).pop();
}
```

| SimpleDialog 常用参数 | 说明                               | 参数值例子             |
| :-------------------: | ---------------------------------- | ---------------------- |
|        `title`        | Dialog标题，值为一个组件实例       | ...                    |
|      `children`       | Dialog内容，值为一个组件实例的列表 | `[组件实例, 组件实例]` |

::: details 例子：

```dart
import 'package:flutter/material.dart';

class MyCustom extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        child: Text('Open Dialog'),
        onPressed: () => showDialog(                      // [!code hl:16]
          barrierDismissible: true,
          context: context,
          builder: (context) => SimpleDialog(
            title: Text('Select One Option'),
            children: [
              ...List.generate(
                100,
                (index) => SimpleDialogOption(
                  child: Text('Option $index'),
                  onPressed: () => Navigator.of(context).pop(index),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: MyCustom(),
  ));
}
```

:::
