# Flutter 自定义组件

Flutter 的自定义组件实质为 Dart 类，使用时需要通过实例化创建组件的实例对象

## 定义

定义时需根据是否有状态数据选择继承内置组件类`StatelessWidget`、`StatefulWidget`

---

### StatelessWidget 类

自定义组件为无状态组件时，必需继承内置组件类`StatelessWidget`

```dart
class 自定义无状态组件类名 extends StatelessWidget {
  const 自定义无状态组件类名({super.key});

  @override
  Widget build(BuildContext context) {
    return 其他组件实例;
  }
}

var 自定义组件实例 = 自定义无状态组件类名();
```

::: details 例子：

```dart
import 'package:flutter/material.dart';

class MyWidget extends StatelessWidget {        // [!code hl:12]
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Text(
      'Hello World',
      textDirection: TextDirection.ltr,
      textAlign: TextAlign.center,
    );
  }
}

void main() {
  runApp(const MyWidget());
}
```

:::

---

### StatefulWidget 类

自定义组件为有状态组件时，必需继承内置组件类`StatefulWidget`

```dart
class 自定义有状态组件类名 extends StatefulWidget {
  自定义无状态组件类名({super.key});

  @override
  State<自定义有状态组件类名> createState() => _自定义有状态组件类名State类();
}

class _自定义有状态组件类名State类 extends State<自定义有状态组件类名> {
  数据类型 _私有属性 = 初始值;

  返回值类型 _私有方法() {
    setState(() => _私有属性的新值);
  }

  @override
  Widget build(BuildContext context) {
    return 其他组件实例;
  }
}

var 自定义组件实例 = 自定义有状态组件类名();
```

::: details 例子：

```dart
import 'package:flutter/material.dart';

class MyApp extends StatefulWidget {                        // [!code hl:6]
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {                    // [!code hl:43]
  int _count = 0;
  String _message = "";

  void _increaseCount() {
    setState(() => _count++);
  }

  void _getMessage() {
    setState(() => _message = _count.toString() * 10);
  }

  void _clearAll() {
    setState(() {
      _count = 0;
      _message = "";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(_message),
        Text(_count.toString()),
        Row(children: [
          ElevatedButton(
            onPressed: _increaseCount,
            child: Text("+1"),
          ),
          ElevatedButton(
            onPressed: _getMessage,
            child: Text("get Message", overflow: TextOverflow.ellipsis),
          ),
          ElevatedButton(
            onPressed: _clearAll,
            child: Text("clear all"),
          )
        ])
      ],
    );
  }
}

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: MyApp(),
      ),
    ),
  );
}
```

:::

## 数据传递

通过 Dart 类的实例化时传递的参数实现组件间数据传递

```dart
import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  /** 按钮文本 */
  final String text;
  /** 按钮点击事件 */
  final void Function() onPress;
  /** 按钮是否充填父组件 */
  final bool? isExpanded;

  CustomButton(
    this.text, {
    super.key,
    required this.onPress,
    this.isExpanded,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: this.isExpanded == true ? 1 : 0,
      child: Container(
        child: ElevatedButton(
          onPressed: this.onPress,
          child: Text(this.text),
        ),
      ),
    );
  }
}

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Row(
          children: [
            CustomButton("xxxx", onPress: () => print("xxxx")),
            CustomButton("yyyy", onPress: () => print("yyyy")),
            CustomButton("zzz", onPress: () => print("zzz"), isExpanded: true),
          ],
        ),
      ),
    ),
  );
}
```
