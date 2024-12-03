# Dart 异步

## Future

```dart
Future<返回值类型> 函数名() async {
  // ...
}
```

### then( )

```dart
Future异步对象
  .then((返回值){
    // ...
  }).then((返回值){
    // ...
  });
```

---

### catchError( )

```dart
Future异步对象
  .then((返回值){
    // ...
  }).then((返回值){
    // ...
  }).catchError((异常){
    // ...
  });
```

## await

```dart
Future<返回值类型> 函数名() async {
  try {
    var 返回值 = await 返回Future异步对象的函数();
    // ...
  } catch (异常) {
    // ...
  }

  // 等同于：
  // Future异步对象.then((返回值){
  //   // ...
  // }).catchError((异常){
  //   // ...
  // });
}
```
