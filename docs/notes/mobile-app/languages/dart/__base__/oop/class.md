# Dart 类

Dart 是是一个面向对象语言，一切皆对象

## 定义

Dart 类使用关键字`class`定义，类名使用大驼峰命名 ( CamelCase )

```dart
class 类名 {                           // [!code focus:3]
  // ...
}
```

## 实例化

可以通过调用类名来实例化类创建一个实例对象，实例对象相互独立互不影响

```dart
class 类名 {                           // [!code focus:3]
  // ...
}

void main(){
  var 实例对象 = 类名();            // [!code focus:2]
  类名 实例对象 = 类名();
}
```

## 类的成员

### 构造函数

Dart 类中的构造函数与当前类同名，在实例化时会自动触发

::: code-group

```dart [默认构造函数]
class 类名 {                             // [!code focus:10]
  数据类型 实例属性1 = 初始值;
  数据类型 实例属性2 = 初始值;

  类名(this.实例属性1, this.实例属性2);     // [!code ++]
  类名(参数1, 参数2) {                     // [!code --:4]
    this.实例属性1 = 参数1;
    this.实例属性2 = 参数2;
  }
}

void main(){
  var 实例对象 = 类名(参数1, 参数2);    // [!code focus]
}
```

```dart [命名构造函数]
class 类名 {                                                                // [!code focus:10]
  数据类型 实例属性1 = 初始值;
  数据类型 实例属性2 = 初始值;

  // 默认构造函数
  类名(this.实例属性1, this.实例属性2);

  // 命名构造函数
  类名.[构造函数命名1](this.实例属性1, this.实例属性2);
  类名.[构造函数命名2](this.实例属性1, this.实例属性2);
}

void main(){
  var 实例对象 = 类名(参数1, 参数2);             // 使用默认构造函数进行实例化       // [!code focus:3]
  var 实例对象 = 类名.构造函数命名1(参数1, 参数2); // 使用命名构造函数1进行实例化
  var 实例对象 = 类名.构造函数命名2(参数1, 参数2); // 使用命名构造函数2进行实例化
}
```

:::

::: details 例子：通过默认构造函数实现对不同实例对象的赋值

```dart
class Person {                                      // [!code focus:10]
  String? name;
  int? age;

  Person(this.name, this.age);

  void getInfo() {
    print({"name": this.name, "age": this.age});
  }
}

void main() {
  var andy = Person("Andy", 28);                // [!code focus:4]
  var jack = Person("Jack", 16);
  andy.getInfo();       // {name: "Andy", age: 28}
  jack.getInfo();       // {name: "Jack", age: 16}
}
```

:::

::: details 例子：分别通过默认构造函数、具名构造函数实现对不同实例对象的赋值

```dart
class Person {
  String? name;
  int? age;
  String? nickName;
  List<String>? superpower;

  Person(this.name, this.age);

  Person.hero(this.nickName, this.superpower);

  void getInfo() {
    print({
      if (this.name != null) "name": this.name,
      if (this.age != null) "age": this.age,
      if (this.nickName != null) "nickName": this.nickName,
      if (this.superpower != null) "superpower": this.superpower,
    });
  }
}

void main() {
  var normal = Person("Andy", 28);
  normal.getInfo();   // {name: Andy, age: 28}

  var hero = Person.hero("SuperAndyMan", ["fly", "laser eye"]);
  hero.getInfo();     // {nickName: "SuperAndyMan", superpower: ["fly", "laser eye"]}
}
```

:::

---

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

void main(){
  var 实例对象 = 类名();            // [!code focus:3]
  print(实例对象.实例属性);  // 访问实例属性
  实例对象.实例方法();       // 调用实例方法
}
```

---

### 私有属性、私有方法

名字前面加上前缀`_`的成员为类中私有成员

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

静态成员不属于类的某个实例而是属于类本身，只能通过类进行访问

```dart
class 类名 {                                // [!code focus:8]
  static 数据类型 静态属性 = 初始值;

  static 返回值类型 静态方法() {
    print(静态属性);     // 访问静态属性
    其他静态方法();      // 调用其他静态方法
  }
}

void main(){
  print(类名.实例属性);  // 访问静态属性    // [!code focus:2]
  类名.实例方法();       // 调用静态方法
}
```

## 类的继承

Dart 中所有的对象都是类的实例，所有的类都是 Object 的子类

---

### extends

可以通过关键字`extends`实现类的继承

子类中的实例方法会覆盖父类中同名实例方法，会出现覆写时建议加上装饰器`@override`

关键字`extends`只能实现单继承

```dart
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

void main(){
  const 子类实例对象 = 子类();    // [!code focus]
}
```

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

void main(){
  const 子类实例对象 = 子类(参数1, 参数2);    // [!code focus]
}
```

::: details 例子：子类调用自身构造函数的同时调用父类的构造函数并传参，并实现同名方法的覆写

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

抽象类通过关键字`abstract`定义

抽象类不能被实例化，仅用于定义一些规范供其子类去遵循

抽象类中会定义一些无函数体的抽象方法 ( 仅定义但不实现 ) 具体的逻辑实现由子类去定义

继承抽象类的子类中除了自身成员以外，必须覆写并实现抽象类中的所有抽象方法，否则报错

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
  var dog = Dog();            // [!code focus:5]
  dog.bark();

  var cat = Cat();
  cat.bark();
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
  var dog = Dog();            // [!code focus:5]
  dog.bark();

  var cat = Cat();
  cat.bark();
}
```

:::
