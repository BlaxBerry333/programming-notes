# Dart 基本数据类型

## 整数 ( int )

```dart
void main() {
  int 变量 = 数值;                  // [!code focus]
}
```

---

### 常用内置方法

|              | 说明                                       |
| :----------: | ------------------------------------------ |
|   `isEven`   | 判断是否为偶数，返回一个布尔值             |
|   `isOdd`    | 判断是否为奇数，返回一个布尔值             |
|   `ceil()`   | 向上取整（返回大于或等于该数字的最小整数） |
|  `floor()`   | 向下取整（返回小于或等于该数字的最大整数） |
| `toString()` | 转换为字符串，返回一个字符串               |

## 浮点数 ( double )

```dart
void main() {
  double 变量 = 数值;               // [!code focus]
}
```

---

### 常用内置方法

|                      | 说明                                |
| :------------------: | ----------------------------------- |
|      `round()`       | 进行四舍五入，返回一个整数          |
| `toStringAsFixed(n)` | 转换为字符串，并保留小数点后 `n` 位 |
|     `toString()`     | 转换为字符串，返回一个字符串        |

## 字符串 ( String )

Dart 中不区分单引号与双引号

```dart
void main() {
  String 变量 = '字符串';           // [!code focus:4]
  String 变量 = "字符串";
  String 变量 = '''字符串''';
  String 变量 = """字符串""";
}
```

---

### 常用操作

```dart [字符串方法创建]
void main() {
  String 字符串 = "值";             // [!code focus:9]

  // 字符串拼接
  String 新字符串 = "字符串" + "字符串";
  String 新字符串 = "字符串 $变量名";
  String 新字符串 = "字符串 ${数据} ${表达式}";

  // 字符串重复
  String 新字符串 = "字符串" * 重复次数;
}
```

---

### 常用内置方法

|                 | 说明                                           |
| :-------------: | ---------------------------------------------- |
|    `isEmpty`    | 判断是否为空，返回一个布尔值                   |
|  `isNotEmpty`   | 判断是否不为空，返回一个布尔值                 |
|  `contains()`   | 判断是否包含指定的字符，返回一个布尔值         |
| `toLowerCase()` | 将字符全部转为小写，返回一个新字符串           |
| `toUpperCase()` | 将字符全部转为大写，返回一个新字符串           |
|    `trim()`     | 移除字符串首尾空白字符，返回一个新字符串       |
|  `trimLeft()`   | 移除字符串开始位置的空白字符，返回一个新字符串 |
|  `trimRight()`  | 移除字符串结束位置的空白字符，返回一个新字符串 |
|    `split()`    | 根据间隔字符对字符串进行分割，返回一个数组     |

## 布尔值 ( bool )

```dart [字符串方法创建]
void main() {
  bool 变量 = true;                // [!code focus:2]
  bool 变量 = false;               // [!code focus:2]
}
```

## 空值 ( Null )

```dart
void main() {
  Null 变量 = null;                // [!code focus:6]

  var 变量;
  数据类型? 变量;
  数据类型? 变量 = null;
}
```

## 卢恩符文 ( Runes )

::: code-group

```dart [字符串方法创建]
void main() {
  Runes 变量 = "字符串".runes                       // [!code focus]
}
```

```dart [构造函数创建]
void main() {
  Runes 卢恩符文 = Runes('Unicode码值');            // [!code focus:4]

  // 反转回字符串
  String 字符串 = String.fromCharCodes(卢恩符文);
}
```
