# Dart 类型操作

## 类型别名

Dart 可使用关键字`typedef`为复杂的自定义类型定义一个别名

```dart
typedef 类型别名 = ...;
```

类型别名也支持泛型

> 如下：创建一个键值对中值为列表类型的自定义映射类型

```dart
typedef ListMap<T> = Map<T, List<T>>;   // [!code focus]

void main(){
  ListMap<String> m = {};               // [!code focus]
}
```

## 类型判断

Dart 使用关键字`is`判断数据的类型

```dart
void main(){
  bool 布尔值 = 数据 is 数据类型;           // [!code focus]
}
```

## 类型转换

Dart 是强类型语言，没有隐式数据类型转换只有显式数据类型转换

|                  | 说明                                           |
| :--------------: | ---------------------------------------------- |
|  `int.parse()`   | 强制转换为整数类型，非数值字符串的场合会报错   |
| `double.parse()` | 强制转换为浮点数类型，非数值字符串的场合会报错 |
|   `toString()`   | 强制转换为字符串类型                           |
|    `toList()`    | 将可迭代对象强制转换为列表类型                 |
