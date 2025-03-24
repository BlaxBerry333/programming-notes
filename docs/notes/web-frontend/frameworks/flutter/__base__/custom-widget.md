# Flutter 自定义组件

Flutter 的自定义组件实质为 Dart 类，使用时需要通过实例化创建组件的实例对象

## 定义

### 静态组件 ( StatelessWidget )

静态组件展示的内容不依赖响应变化的状态数据，常用于创建不可变对象来展示静态内容

定义时必需继承内置组件类`StatelessWidget`

组件内可定义状态属性，但是不会随用户交互而变化也不会因为变化而重新绘制展示内容

```dart
class 自定义组件类名 extends StatelessWidget {
  const 自定义组件类名({super.key});

  @override
  Widget build(BuildContext context) {
    return 其他组件实例;
  }
}

const 自定义组件实例 = const 自定义组件类名();
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

### 动态组件 ( StatefulWidget )

动态组件展示的内容依赖响应变化的状态数据

定义时必需继承内置组件类`StatefulWidget`

组件内可定义状态属性，因为户交互变化时会重新绘制展示内容

```dart
class 自定义组件类名 extends StatefulWidget {
  自定义组件类名({super.key});

  @override
  State<自定义组件类名> createState() => _自定义组件类名State类();
}

class _自定义组件类名State类 extends State<自定义组件类名> {
  数据类型 _私有状态1 = 初始值;
  数据类型 _私有状态2 = 初始值;

  返回值类型 _私有方法() {
    setState(() => _私有状态1的新值);
    setState(() => _私有状态2的新值);
  }

  返回值类型 _私有方法() {
    setState(() {
      _私有状态1 = 新值;
      _私有状态1 = 新值;
    });
  }

  @override
  Widget build(BuildContext context) {
    return 其他组件实例;
  }
}

var 自定义组件实例 = 自定义组件类名();
```

::: details 例子：

```dart
import 'package:flutter/material.dart';

class MyApp extends StatefulWidget {                        // [!code hl:4]
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
        body: const MyApp(),
      ),
    ),
  );
}
```

:::

## 数据传递

基于 Dart 类实现组件间数据传递：

- 实例化组件时传递参数给组件类
- 组件类内部通过构造函数接收参数并更新自身的实例属性

::: code-group

```dart [StatelessWidget]
class 自定义组件类 extends StatelessWidget {
  final 数据类型 实例属性;                                // [!code hl:4]
  final 数据类型 实例属性;

  自定义组件类(this.实例属性, {super.key, this.实例属性});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("$实例属性"),                        // [!code hl:2]
        Text("$实例属性"),
      ]
    );
  }
}

var 自定义组件实例 = 自定义组件类(参数, 属性: 参数);
```

```dart [StatefulWidget]
class 自定义组件类 extends StatefulWidget {
  final 数据类型 实例属性;                                // [!code hl:4]
  final 数据类型 实例属性;

  自定义组件类(this.实例属性, {super.key, this.实例属性});

  @override
  State<自定义组件类名> createState() => _自定义组件类State类();
}

class _自定义组件类State类 extends State<自定义组件类名> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("$widget.实例属性"),                          // [!code hl:2]
        Text("$widget.实例属性"),
      ]
    );
  }
}
```

:::

::: details 例子：

::: code-group

```dart [StatelessWidget]
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

```dart [StatefulWidget]
import 'package:flutter/material.dart';

class CustomButton extends StatefulWidget {
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
  State<CustomButton> createState() => _CustomButtonState();
}

class _CustomButtonState extends State<CustomButton> {
  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: widget.isExpanded == true ? 1 : 0,
      child: Container(
        child: ElevatedButton(
          onPressed: widget.onPress,
          child: Text(widget.text),
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

:::

## 生命周期

只有动态组件组件类 StatefulWidget 内部才有生命周期

::: code-group

```[StatefulWidget]
     StatefulWidget                            State Class
┌─────────────────────┐    ┌─────────────────────────────────────────────────┐
│  ┌───────────────┐  │    │  ┌─────────────────────────┐                    │
│  │  constructor  │  │    │  │       initState()       │                    │
│  └───────┼───────┘  │    │  └────────────┼────────────┘                    │
│  ┌───────▼───────┐  │    │  ┌────────────▼────────────┐                    │
│  │ createState() │ ─┼───▶│  │ didChangeDependencies() │                    │
│  └───────────────┘  │    │  └────────────┼────────────┘                    │
└─────────────────────┘    │               │          ┌───────────────────┐  │
                           │               │◀─────────┼ didUpdateWidget() │  │
                           │      ┌────────▼────────┐ └─────────▲─────────┘  │
                           │      │     build()     │           │            │
                           │      └────────┼────────┘    ┌──────┼──────┐     │
                           │               ├────────────▶│   setState  │     │
                           │               │             └─────────────┘     │
                           │               │                                 │
                           │               │          ┌───────────────────┐  │
                           │               │          │     dispose()     │  │
                           │               ▼          └───────────────────┘  │
                           └─────────────────────────────────────────────────┘
```

:::

```dart
class 自定义组件类名 extends StatefulWidget {
  const 自定义组件类名({super.key}) : super(key: key);

  @override
  State<自定义组件类名> createState() => _自定义组件类名State类();
}

class _自定义组件类名State类 extends State<自定义组件类名> {、
  @override
  void initState() {
    super.initState();
    // 组件初始化时执行 ...
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // 组件依赖发生变化时执行 ...
  }

  @override
  void didUpdateWidget() {
    super.didUpdateWidget();
    // 组件更新时执行 ...
  }

  @override
  void dispose() {
    super.dispose();
    // 组件销毁时执行 ...
  }

  @override
  Widget build(BuildContext context) {
    return 要展示到界面的组件实例;
  }
}
```
