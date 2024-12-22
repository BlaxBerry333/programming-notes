# Flutter 路由管理

## Navigator 组件

### Navigator.of(ctx).push()

```dart
void 路由跳转函数 () {
  Navigator.of(BuildContext context).push(
    MaterialPageRoute(builder: (BuildContext context) {
      return 页面组件实例;
    }),
  )
}
```

---

### Navigator.of(ctx).pop()

```dart
void 路由后退函数 () {
  Navigator.of(BuildContext context).pop()
}
```

```dart
import 'package:flutter/material.dart';

class FirstPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('StatelessWidget Example'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.of(context).push(
            MaterialPageRoute(builder: (BuildContext context) {
              return SecondPage();
            }),
          ),
          child: Text('前往 SecondPage 页面组件'),
        ),
      ),
    );
  }
}

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Page'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text('返回上一页面'),
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: FirstPage(),
  ));
}
```
