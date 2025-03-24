# Dart 流程控制

## 条件判断

### if...

```dart
void main() {
  if (条件) {           // [!code focus:3]
    // ...
  }
}
```

---

### if...else...

```dart
void main() {
  if (条件) {           // [!code focus:5]
    // ...
  } else {
    // ...
  }
}
```

---

### if...else if...

对于值的匹配判断时建议使用`switch...case...`

```dart
void main() {
  if (条件1) {          // [!code focus:7]
    // ...
  } else if (条件2) {
    // ...
  } else if (条件3) {
    // ...
  }
}
```

---

### if...else if...else...

对于值的匹配判断时建议使用`switch...case...`

```dart
void main() {
  if (条件1) {          // [!code focus:9]
    // ...
  } else if (条件2) {
    // ...
  } else if (条件3) {
    // ...
  } else {
    // ...
  }
}
```

---

### switch...case...

```dart
void main() {
  switch (数据) {                       // [!code focus:11]
    case 值1:
      // ...
      break;
    case 值2:
    case 值3:
      // ...
      break;
    default:
      // 条件都不满足时执行 ...
  }
}
```

对于处理根据数据的匹配判断直接返回对应值时，则建议使用`switch 表达式`

---

### switch 表达式

用于处理根据数据的匹配判断直接返回对应值，可读性优于`switch...case...`语句

```dart
void main() {
  final 返回值变量 = switch (数据) {    // [!code focus:6]
    值1 => 对应的返回值,
    值2 => 对应的返回值,
    // ...
    _ => 默认返回值,
  }
}
```

::: details 例子：利用`switch表达式`简化`switch...case...`语句

```dart
void printDayNumber(String day) {
  final num = switch (day) {
    'Monday' => 1,
    'Tuesday' => 2,
    'Wednesday' => 3,
    'Thursday' => 4,
    'Friday' => 5,
    'Saturday' => 6,
    'Sunday' => 7,
    _ => 10,
  };
  print(num);
}

void main() {
  printDayNumber('Monday');         // 1
  printDayNumber('Wednesday');      // 3
  printDayNumber('WTF');            // 10
}
```

:::

## 循环遍历

### while...

```dart
void main() {
  while (条件) {             // [!code focus:3]
    // ...
  }
}
```

> [!CAUTION] 避免死循环
>
> 为了避免出现重复不停的死循环，建议使用一个循环计控制器变量并将其作为循环的判断条件
>
> ```js
> var 循环计控制器变量 = 初始值;                    // [!code focus]
>
> void main() {
>   while (基于循环计时器变量的判断条件) {           // [!code focus:4]
>     // ...
>     // 更新循环计时器变量
>   }
> }
> ```

---

### do...while...

无论判断条件是否成立都会先执行一边，然后再判断是否需要重复

```dart
void main() {
  do {                      // [!code focus:5]
    // ...
  } while (条件) {
    // ...
  }
}
```

---

### for...

```dart
void main() {
  for (let 循环计时器变量 = 初始值; 判断循环计时器; 更新循环计时器) {   // [!code focus:3]
    // ...
  }
}
```

---

### for...in...

## 异常处理

### try...catch...

```dart
void main() {
  try {                         // [!code focus:5]
    // ...
  } catch (e) {
    // ...
  }
}
```

---

### try...catch...finally

```dart
void main() {
  try {                         // [!code focus:7]
    // ...
  } catch (e) {
    // ...
  } finally {
    // ...
  }
}
```

---

### try...on...

```dart
void main() {
  try {                         // [!code focus:5]
    // ...
  } on 异常类 {
    // ...
  }
}
```

---

### try...on catch...

```dart
void main() {
  try {                         // [!code focus:9]
    // ...
  } on 异常类 {
    // ...
  } on Exception catch (e) {
    // ...
  } catch (e) {
    // ...
  }
}
```

---

### try...on catch...finally

```dart
void main() {
  try {                         // [!code focus:11]
    // ...
  } on 异常类 {
  // ...
  } on Exception catch (e) {
    // ...
  } catch (e) {
    // ...
  } finally {
    // ...
  }
}
```

---

### throw

```dart
void main() {
  throw 异常类();               // [!code focus:2]
  throw 异常类("自定义信息");
}
```

<!-- ---

### assert( ) -->
