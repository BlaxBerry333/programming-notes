# Dart 运算符

## 算数运算符

> Arithmetic Operators

| 运算符 | 说明                                                              | 例子                              |
| :----: | ----------------------------------------------------------------- | --------------------------------- |
|  `+`   | 左右都是数值类型时：加法运算<br/>左右都是字符串类型时：字符串拼接 | `10 + 2`<br/>`"xxx" + "10" + " "` |
|  `-`   | 减法运算                                                          | `10 - 2`                          |
|  `*`   | 乘法运算                                                          | `10 * 2`                          |
|  `/`   | 除法运算                                                          | `10 / 2`                          |
|  `%`   | 取余运算                                                          | `10 % 2`                          |

## 赋值运算符

> Assignment Operators

| 运算符 | 说明                                                            | 例子                     |
| :----: | --------------------------------------------------------------- | ------------------------ |
|  `=`   | 赋值操作<br/>将右侧值直接赋值给左侧变量                         | `a = b`                  |
|  `+=`  | 加等于操作<br/>将左侧变量当前值加上右侧值再后赋值给左侧变量     | `a += b` ( `a = a + b` ) |
|  `-=`  | 减等于操作<br/>将左侧变量当前值减去右侧值再后赋值给左侧变量     | `a -= b` ( `a = a - b` ) |
|  `*=`  | 乘等于操作<br/>将左侧变量当前值乘以右侧值再后赋值给左侧变量     | `a *= b` ( `a = a * b` ) |
|  `/=`  | 除等于操作<br/>将左侧变量当前值除以右侧值再后赋值给左侧变量     | `a /= b` ( `a = a / b` ) |
| `??=`  | 空值赋值操作<br/>左侧变量若为空值`null`则将右侧值赋值给左侧变量 | `a ??= b`                |

## 比较运算符

> Comparison Operators

比较运算的结果是一个布尔值 ( `true`或`false` )

| 运算符 | 说明             | 例子     |
| :----: | ---------------- | -------- |
|  `>`   | 左侧大于右侧     | `a > b`  |
|  `<`   | 左侧小于右侧     | `a < b`  |
|  `>=`  | 左侧大于等于右侧 | `a >= b` |
|  `<=`  | 左侧小于等于右侧 | `a <= b` |
|  `==`  | 左侧等于右侧     | `a == b` |
|  `!=`  | 左侧不等于右侧   | `a != b` |

## 逻辑运算符

> Logical Operators

| 运算符 | 说明   | 例子           |
| :----: | ------ | -------------- |
|  `&&`  | 与运算 | `a = b && c`   |
| `\|\|` | 或运算 | `a = b \|\| c` |
|  `!`   | 非运算 | `a = !b`       |

```dart{0}
void main() {
  print(true && true);  // true     // [!code focus:10]
  print(true && false); // false
  print(false && true); // false

  print(true || true);  // true
  print(true || false); // true
  print(false || true); // true

  print(!true);         // false
  print(!false);        // true
}
```

## 三目运算符

> Ternary Operator / Conditional Operator

| 运算符 | 说明                             | 例子                     |
| :----: | -------------------------------- | ------------------------ |
| `? :`  | 用于基于判断条件返回一个对应的值 | `条件 ? value1 : value2` |

## 空值合并运算符

> Nullish Coalescing Operator

| 运算符 | 说明                                                             |
| :----: | ---------------------------------------------------------------- |
|  `??`  | 当左侧数据为空值 ( `null` ) 时返回右侧数据，否则直接返回左侧数据 |

```dart
void main() {
  int? a;               // [!code focus:5]
  int b = 100;

  print(a ?? "xxx");    // null
  print(b ?? "xxx");    // "xxx"
}
```