# Dart 类

Dart 是一个面向对象语言，一切皆对象

类不仅用于封装相关逻辑，还可通过类的实例化创建结构复杂的 Dart 对象

## 定义

Dart 类使用关键字`class`定义

类名使用大驼峰命名 ( CamelCase )

```dart
class 类名 {                           // [!code focus:3]
  // ...
}
```

## 实例化

可以通过调用类名来实例化类创建一个实例对象

每次实例化都会生成一个新的实例对象，实例对象相互独立互不影响

```dart
class 类名 {                           // [!code focus:3]
  // ...
}

void main() {
  var 实例对象 = 类名();                // [!code focus:2]
  类名 实例对象 = 类名();
}
```

## 构造函数

Dart 类中的构造函数与当前类同名，在实例化时会自动触发

---

### 默认构造函数

```dart
class 类名 {                             // [!code focus:12]
  数据类型 实例属性1 = 初始值;
  数据类型 实例属性2 = 初始值;

  类名(this.实例属性1, this.实例属性2);     // [!code hl]

  // 相当于：
  // 类名(参数1, 参数2) {
  //   this.实例属性1 = 参数1;
  //   this.实例属性2 = 参数2;
  // }
}

void main() {
  var 实例对象 = 类名(参数1, 参数2);        // [!code focus]
}
```

::: details 例子：通过默认构造函数实现对不同实例对象的赋值

```dart{0}
class Person {                                                  // [!code focus:11]
  String name;
  int age;
  String? gender;

  Person(this.name, {required this.age, this.gender});

  void getInfo() {
    print({"name": this.name, "age": this.age, "gender": this.gender});
  }
}

void main() {
  var andy = Person("Andy", age: 28, gender: "male");           // [!code focus:8]
  andy.getInfo();     // {name: "Andy", age: 28, gender: "male"}

  var zoey = Person("Zoey", age: 16, gender: "female");
  zoey.getInfo();     // {name: "Jack", age: 16, gender: "female"}

  var empty = Person("????", age: 0);
  empty.getInfo();    // {name: "????", age: 0, gender: null}
}

```

:::

---

### 命名构造函数

类可通过不同的命名构造函数进行不同的实例化

```dart
class 类名 {                                                                  // [!code focus:14]
  数据类型 实例属性1 = 初始值;
  数据类型 实例属性2 = 初始值;
  数据类型 实例属性3 = 初始值;

  // 默认构造函数
  // 类名(this.实例属性1, this.实例属性2);

  类名.构造函数命名1(this.实例属性1, this.实例属性2);                             // [!code hl:5]

  类名.构造函数命名2(this.实例属性1)
    : 实例属性1 = 值,
      实例属性2 = 值;
}

void main() {
  var 实例对象 = 类名(参数1, 参数2);             // 使用默认构造函数进行实例化       // [!code focus:3]
  var 实例对象 = 类名.构造函数命名1(参数1, 参数2); // 使用命名构造函数1进行实例化
  var 实例对象 = 类名.构造函数命名2(参数1);       // 使用命名构造函数2进行实例化
}
```

::: details 例子：通过默认构造函数、具名构造函数实现对不同实例对象的赋值

```dart
class CustomText {                                                    // [!code focus:27]
  final String text;
  final double fontSize;
  final int fontWeight;
  final String? color;

  CustomText(this.text, {this.color})
      : fontSize = 16,
        fontWeight = 500;

  CustomText.title(this.text, {this.color})
      : fontSize = 32,
        fontWeight = 700;

  CustomText.subTitle(this.text, {this.color = "#5c5c5c"})
      : fontSize = 24,
        fontWeight = 600;

  CustomText.body(this.text, {this.color})
      : fontSize = 16,
        fontWeight = 500;

  @override
  String toString() {
    return 'CustomText(text: $text, fontSize: $fontSize, fontWeight: $fontWeight, color: $color)';
  }
}

void main() {
  var CustomText text1 = CustomText("111", color: "#000000");         // [!code focus]
  print(text1);   // CustomText(text: 111, fontSize: 16, fontWeight: 500, color: #000000)

  var CustomText text2 = CustomText.title("222", color: "#000000");   // [!code focus]
  print(text2);   // CustomText(text: 222, fontSize: 32, fontWeight: 700, color: #000000)

  var CustomText text3 = CustomText.subTitle("333");                  // [!code focus]
  print(text3);   // CustomText(text: 333, fontSize: 24, fontWeight: 600, color: #5c5c5c)

  var CustomText text4 = CustomText.body("444", color: "#000000");    // [!code focus]
  print(text4);   // CustomText(text: 444, fontSize: 16, fontWeight: 500, color: #000000)
}
```

:::

---

### 私有构造函数

类可通过私有构造函数来禁止当前类的实例化

常用于定义一个仅向外公开自身静态成员的工具类

```dart
class 类名 {                                          // [!code focus:9]
  static const 数据类型 静态属性 = 值;

  const 类名._();                                     // [!code hl]

  static 返回值类型 静态方法() {
    // ...
  }
}

void main() {
  print(类名.静态属性);                                // [!code focus:2]
  类名.静态方法();
}
```

::: details 例子：通过私有构造函数定义一个常量工具类

```dart
import 'package:flutter/material.dart';

class CustomColors {                                          // [!code focus:7]
  static const Color primary = Color(0xFF0175C2);
  static const Color secondary = Color(0xFFA7A7A7);
  // ...

  CustomColors._();
}

void main() {
  print(CustomColors.primary);                                // [!code focus:2]
  print(CustomColors.secondary);
}
```

:::

---

### 常量构造函数

类可通过常量构造函数实例化一个不可变的类实例 ( 在应用中共享同一内存地址，可优化性能 )

常量构造函数需通过关键字`const`定义，且其更新的类比例属性需通过`final`定义

```dart
class 类名 {                                          // [!code focus:12]
  final 数据类型 实例属性1 = 初始值;
  final 数据类型 实例属性2 = 初始值;

  const 类名(this.实例属性1, this.实例属性2);           // [!code hl]
}

void main() {
  const 实例对象 = const 类名(参数1, 参数2);            // [!code focus]
}
```

::: details 例子：通过常量构造函数创建的实例对象共享同一内存地址

```dart
class RGBColor {                                      // [!code focus:7]
  final int red;
  final int green;
  final int blue;

  const RGBColor(this.red, this.green, this.blue);
}

void main() {
  const RGBColor color1 = const RGBColor(255, 0, 0);  // [!code focus:4]
  const RGBColor color2 = const RGBColor(255, 0, 0);

  print(identical(color1, color2));                   // true
}
```

:::

## 类中成员

### 实例属性、实例方法

直接定义在类中的成员为类中实例成员

实例成员属于类的某个实例对象且相互独立互不影响，只能通过实例对象进行访问

实例成员在类内部被其他成员使用需通过`this` ( 当前的实例对象 )

```dart
class 类名 {                           // [!code focus:8]
  数据类型 实例属性 = 初始值;

  返回值类型 实例方法() {
    print(this.实例属性);    // 访问实例属性
    this.其他实例方法();     // 调用其他实例方法
  }
}

void main() {
  var 实例对象 = 类名();            // [!code focus:3]
  print(实例对象.实例属性);  // 访问实例属性
  实例对象.实例方法();       // 调用实例方法
}
```

---

### 私有属性、私有方法

名字前面加上前缀单下划线`_`的成员为类中私有成员

私有成员无法从库文件的外部直接访问 ( 当前`.dart`文件内仍可访问 ) 访问时需通过实例对象

```dart
class 类名 {                           // [!code focus:8]
  数据类型 _私有属性 = 初始值;

  返回值类型 _私有方法() {
    print(_私有属性);    // 访问私有属性
    _其他私有方法();     // 调用其他私有方法
  }
}
```

---

### 静态属性、静态方法

通过关键字`static`定义的成员为类中静态成员

静态成员不属于类的某个实例而是属于类本身，只能通过类名进行访问

```dart
class 类名 {                                // [!code focus:8]
  static 数据类型 静态属性 = 初始值;

  static 返回值类型 静态方法() {
    print(静态属性);     // 访问静态属性
    其他静态方法();      // 调用其他静态方法
  }
}

void main() {
  print(类名.实例属性);  // 访问静态属性    // [!code focus:2]
  类名.实例方法();       // 调用静态方法
}
```

## 类的继承

Dart 中所有的对象都是类的实例，所有的类都是 Object 的子类

---

### extends

可以通过关键字`extends`实现类的继承 ( 只能实现单继承 )

子类中的实例方法会覆盖父类中同名实例方法，重写方法时建议加上装饰器`@override`

::: code-group

```dart [单继承]
class 父类 {                        // [!code focus:12]
  // ...
}

class 子类 extends 父类 {
  // ...

  @override
  返回值类型 父类同名实例方法() {
    // ...
  }
}

void main() {
  const 子类实例对象 = 子类();    // [!code focus]
}
```

:::

---

### super

子类中可通过关键字`super`调用其继承的父类中的构造函数、实例方法

```dart
class 父类 {                                   // [!code focus:20]
  数据类型 实例属性1 = 初始值;
  数据类型 实例属性2 = 初始值;

  父类(this.实例属性1, this.实例属性1);

  返回值类型 实例方法() {
    // ...
  }
}

class 子类 extends 父类 {
  子类(参数1类型 参数1, 参数2类型 参数2): super(参数1, 参数2);

  @override
  返回值类型 父类同名实例方法() {
    super.父类同名实例方法();
    // ...
  }
}

void main() {
  const 子类实例对象 = 子类(参数1, 参数2);    // [!code focus]
}
```

::: details 例子：子类调用自身构造函数的同时调用父类的构造函数并传参，并实现同名方法的重写

```dart
class Animal {                                       // [!code focus:21]
  String? breed;

  Animal(this.breed);

  void printInfo() {
    print(this.breed);
  }
}

class Dog extends Animal {
  String? name;

  Dog(String breed, this.name) : super(breed);

  @override
  void printInfo() {
    super.printInfo();
    print(this.name);
  }
}

void main() {
  var dog = Dog("Dog", "Chihuahua");             // [!code focus:3]
  dog.printInfo();      // Dog
                        // Chihuahua
}
```

:::

---

### 抽象类

抽象类不能被实例化，仅用于作为一个定义一些规范供其子类去遵循的基类

抽象类中会定义一些无函数体的抽象方法 ( 仅定义但不实现 ) 具体的逻辑实现由子类去定义

继承抽象类的子类中除了自身成员以外，必须覆盖重写并实现抽象类中的所有抽象方法，否则报错

Dart 的抽象类通过关键字`abstract`定义

```dart
abstract class 抽象类 {
  返回值类型 抽象方法1();

  返回值类型 抽象方法2(形参类型 形参);
}

class 子类 extends 抽象类 {
  // ...

  @override
  返回值类型 抽象方法1() {
    // ...
  }

  @override
  返回值类型 抽象方法2(形参类型 形参) {
    // ...
  }
}
```

::: details 例子：通过抽象类实现多态

```dart
abstract class Animal {           // [!code focus:17]
  void bark();
}

class Dog extends Animal {
  @override
  void bark() {
    print("汪汪汪");
  }
}

class Cat extends Animal {
  @override
  void bark() {
    print("喵喵喵");
  }
}

void main() {
  Dog().bark();   // "汪汪汪"           // [!code focus:2]
  Cat().bark();   // "喵喵喵"
}
```

:::

---

### 多态

> Polymorphism

多态是指继承的一种体现，可理解为不同子类对统一方法有各自不同的具体实现

继承抽象类的子类对抽象方法的实现也是多态的一种体现
::: details 例子：通过抽象类实现多态

```dart
abstract class Animal {           // [!code focus:17]
  void bark();
}

class Dog extends Animal {
  @override
  void bark() {
    print("汪汪汪");
  }
}

class Cat extends Animal {
  @override
  void bark() {
    print("喵喵喵");
  }
}

void main() {
  Dog().bark();   // "汪汪汪"           // [!code focus:2]
  Cat().bark();   // "喵喵喵"
}
```

:::
