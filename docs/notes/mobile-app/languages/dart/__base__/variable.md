# Dart 变量

## 定义

变量的定义使用关键字`var`、`const`、`final`

变量名使用小驼峰命名 ( camelCase )

```dart
void main(){
  var 变量名;                       // [!code focus:11]
  var 变量名 = 值;

  const 数据类型 常量名 = 值;

  final 数据类型 常量名 = 值;

  // 省略关键字，用明确的类型定义
  数据类型 变量名;
  数据类型 变量名 = 值;
  数据类型? 变量名 = null;
}
```

|             | 说明                             | 重新赋值              | 初始值                                      |
| :---------: | -------------------------------- | --------------------- | ------------------------------------------- |
| `明确类型`  | 明确指定数据类型的变量           | 允许                  | 允许定义时不赋值<br/>但是未赋值时访问会报错 |
| `明确类型?` | 明确指定数据类型为可空类型的变量 | 允许                  | 允许定义时不赋值<br/>未赋值时默认值为`null` |
|    `var`    | 根据值自动推断类型的变量         | 允许                  | 允许定义时不赋值<br/>未赋值时默认值为`null` |
|  `dynamic`  | 动态类型，禁用静态检查           | 允许<br/>可为任意类型 | 允许定义时不赋值<br/>但是未赋值时访问会报错 |
|   `late`    | 延迟初始化的变量                 | 允许                  | 允许定义时不赋值                            |
|   `final`   | 运行时确定值的常量               | 不允许                | 允许定义时不赋值                            |
|   `const`   | 编译时确定值的常量               | 不允许                | 定义时必须赋值                              |