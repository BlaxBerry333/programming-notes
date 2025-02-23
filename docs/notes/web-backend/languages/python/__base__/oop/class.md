# Python 类

Python 是一个面向对象语言

面向对象的编程设计适合复杂系统，以及需要封装、继承、多态的场景

## 定义

Python 使用关键字`class`定义类

类名通常采用大驼峰命名 ( CamelCase )

类必须与上下文间隔两个空行，类的代码块需要换行并缩进 4 个空格

类中成员与上下文必需要间隔一个空行

```py
class 类名:
    # 类中成员

    # 类中成员
```

空类的代码块必须要使用关键字`pass`来占位

```py
class 类名:
    pass
```

## 实例化

可以通过调用类名来实例化类创建一个实例对象

每次实例化都会生成一个新的实例对象，实例对象相互独立互不影响

```py
class 类名:
    pass


实例对象 = 类名()
实例对象 = 类名()
```

直接打印实例对象时输出的是其内存地址

可通过重写覆盖内置魔术方法`__str__()`自定义打印实例对象时的输出内容

```py
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):                                          # [!code ++:2]
        return f"{self.name} {self.age}"


stud = Student("Andy", 28)
print(stud)         # <__main__.Student object at 0x102e3bb50>  # [!code --]
print(stud)         # Andy 28                                   # [!code ++]
```

## 构造函数

可通过内置魔术方法`__init__()`定义构造函数

构造函数在类实例化时会自动触发

```py
class 类:
    def __init__(self, 形参1, 形参2)
        self.属性1 = 参数1
        self.属性2 = 参数2


实例对象 = 类(实参1, 实参2)
```

::: details 例子：通过构造函数实现对不同实例对象的赋值

```py{0}
class Person:
    def __init__(self, **kwargs):
        self.name = kwargs.get("name", "")
        self.age = kwargs.get("age", 0)
        self.gender = kwargs.get("gender")


andy = Person(name="Andy", age=28, gender="male")
print(andy.name, andy.age, andy.gender)     # "Andy" 28 "male"

empty = Person()
print(empty.name, empty.age, empty.gender)  # "" 0 None
```

:::

## 类中成员

### 实例属性、实例方法

直接定义在类中的成员为类中实例成员

实例成员属于类的某个实例对象且相互独立互不影响，只能通过实例对象进行访问

实例成员在类内部被其他成员使用需通过`self` ( 当前的实例对象 )

实例属性通过构造函数赋值给`self`，并且当前的实例对象可直接修改自身实例属性

实例方法的第一个参数必须接收一个`self`，此位置不需要传参，仅用于接收实例对象本身

::: code-group

```py [实例属性]
class 类:
    def __init__(self, 形参):
        self.实例属性1 = 形参
        self.实例属性2 = 值


实例对象 = 类(实参)
print(实例对象.实例属性1, 实例对象.实例属性2)

实例对象.实例属性1 = 新值
实例对象.实例属性2 = 新值
```

```py [实例方法]
class 类:
    def 实例方法1(self):
        pass

    def 实例方法2(self, 形参1, 形参2):
        pass

    def 实例方法3(self, *args, **kwargs):
        pass

    def 实例方法4(self):
        self.实例方法1()
        self.实例方法2(实参1, 实参2)
        self.实例方法3(实参1, 实参2, 关键字1=值1, 关键字2=值2)


实例对象 = 类()
实例对象.实例方法1()
实例对象.实例方法2(实参1, 实参2)
实例对象.实例方法3(实参1, 实参2, 关键字1=值1, 关键字2=值2)
实例对象.实例方法4()
```

:::

::: details 例子：验证类中实例属性与实例方法的使用

```py
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def say_hello(self):
        print("Hello")

    def say_message(self, message):
        print(message)

    def show_more_params(self, *args, **kwargs):
        print(args, kwargs)

    def show_info(self):
        print(f"Hello, I'm {self.name} and {self.age} years old")

    def call_say_hello(self):
        self.say_hello()

    def call_say_message(self):
        self.say_message("YYYYY")


andy = Student(name="Andy", age=28)

andy.say_hello()                            # Hello
andy.say_message("xxxxx")                   # xxxxx
andy.show_more_params(1, 2, a="A", b="B")   # (1, 2) {'a': 'A', 'b': 'B'}
andy.show_info()                            # Hello, I'm Andy and 28 years old
andy.call_say_hello()                       # Hello
andy.call_say_message()                     # YYYYY

andy.age = 999
andy.show_info()                            # Hello, I'm Andy and 999 years old
```

:::

---

### 私有属性、私有方法

名字前面加上前缀`__`的成员为类中私有成员

私有成员无法从从类的外部被访问，但是可借助自定义实例方法 Getter、Setter

私有成员在类内部被其他成员使用需通过`self` ( 当前的实例对象 )

实例属性通过构造函数赋值给`self`

::: code-group

```py [私有属性]
class 类:
    def __init__(self, 形参):
        self.__私有属性1 = 形参
        self.__私有属性2 = 值

    def get_私有属性1(self):
        return self.__私有属性1

    def set_私有属性1(self):
        return self.__私有属性 = 新值


实例对象 = 类(实参)
print(实例对象.get_私有属性1())

实例对象.set_私有属性1()
```

```py [私有方法]
class 类:
    def __私有方法1(self):
        pass

    def __私有方法2(self, 形参1, 形参2):
        pass

    def __私有方法3(self, *args, **kwargs):
        pass

    def __私有方法4(self):
        self.__私有方法1()
        self.__私有方法2(实参1, 实参2)
        self.__私有方法3(实参1, 实参2, 关键字1=值1, 关键字2=值2)

    def call_私有方法4(self):
        self.__私有方法4()


实例对象 = 类(实参)
实例对象.call_私有方法4()
```

:::

::: details 例子：验证类中私有属性与私有方法以及 Getter、Setter 的使用

```py{0}
import uuid


class Person:
    def __init__(self, **kwargs):
        self.name = kwargs.get("name", "")
        self.__age = kwargs.get("age", 0)       # [!code hl:2]
        self.__id = uuid.uuid4()

    def get_info(self):
        return {"name": self.name, "age": self.__age, "id": self.__id}

    def set_age(self, new_age):
        self.__age = new_age


andy = Person(name="Andy", age=28)

print(andy.name)        # "Andy"
# print(andy.__age)     # 报错 AttributeError: 'Person' object has no attribute '__age' # [!code error]
# print(andy.__id)      # 报错 AttributeError: 'Person' object has no attribute '__id' # [!code error]
print(andy.get_info())  # {'name': 'Andy', 'age': 28, 'id': UUID('1fb0759a-be85-4ddf-86b2-073fc5b17250')}

andy.set_age(100)
print(andy.get_info())  # {'name': 'Andy', 'age': 100, 'id': UUID('1fb0759a-be85-4ddf-86b2-073fc5b17250')}
```

:::

---

### 静态属性、静态方法

直接定义在类中的成员为类中静态成员

静态成员主要作为类中的工具，与类本身以及其实例对象无关，可通过类名或实例对象进行访问

静态方法使用装饰器`@staticmethod`定义，无法访问实例成员与类方法 ( 没有`self`、`cls` )

::: code-group

```py [静态属性]
class 类:
    静态属性1 = 值
    静态属性2 = 值


print(类.静态属性1, 类.静态属性2)

实例对象 = 类()
print(实例对象.静态属性1, 实例对象.静态属性2)
```

```py [静态方法]
class 类:
    @staticmethod
    def 静态方法1():
        pass

    @staticmethod
    def 静态方法2(形参1, 形参2):
        pass

    @staticmethod
    def 静态方法3(*args, **kwargs):
        pass

    @staticmethod
    def 静态方法4():
        类.静态方法1()
        类.静态方法2(实参1, 实参2)
        类.静态方法3(实参1, 实参2, 关键字1=值1, 关键字2=值2)


类.静态方法1()
类.静态方法2(实参1, 实参2)
类.静态方法3(实参1, 实参2, 关键字1=值1, 关键字2=值2)
类.静态方法4()

实例对象 = 类()
实例对象.静态方法1()
实例对象.静态方法2(实参1, 实参2)
实例对象.静态方法3(实参1, 实参2, 关键字1=值1, 关键字2=值2)
实例对象.静态方法4()
```

:::

::: details 例子：验证类中静态属性与静态方法的使用

```py{0}
class MathFunctions:
    pi = 3.1415926

    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def subtract(a, b):
        return a - b

    @staticmethod
    def print_pi():
        print(MathFunctions.pi)


print(MathFunctions.pi)                # 3.1415926
print(MathFunctions.add(5, 3))         # 8
print(MathFunctions.subtract(10, 4))   # 6
MathFunctions.print_pi()               # 3.1415926

instance = MathFunctions()
print(instance.pi)                     # 3.1415926
print(MathFunctions.add(5, 3))         # 8
print(MathFunctions.subtract(10, 4))   # 6
instance.print_pi()                    # 3.1415926
```

:::

---

### 类方法

类方法使用装饰器`@classmethod`定义，无法访问实例成员 ( 没有`self` )

类方法的第一个参数必须接收一个`cls`，此位置不需要传参，仅用于接收类本身

可通过类名或实例对象进行访问

```py
class 类:
    @classmethod
    def 类方法1(cls):
        pass

    @classmethod
    def 类方法2(cls, 形参1, 形参2):
        pass

    @classmethod
    def 类方法3(cls, *args, **kwargs):
        pass


类.类方法1()
类.类方法2(实参1, 实参2)
类.类方法3(实参1, 实参2, 关键字1=值1, 关键字2=值2)
```

::: details 例子：验证类中类方法的使用

```py
class Student:
    count = 0

    def __init__(self) -> None:
        Student.count += 1

    @classmethod
    def show_count(cls):
        print(f"Total Students: {cls.count}")

    @classmethod
    def reset_count(cls):
        cls.count = 0
        Student.show_count()

    @classmethod
    def show_params(cls, *args, **kwargs):
        print(args, kwargs)


Student.reset_count()   # Total Students: 0
a = Student()
b = Student()
Student.show_count()    # Total Students: 2
Student.reset_count()   # Total Students: 0
c = Student()
Student.show_count()    # Total Students: 1

Student.show_params(1, 2, a="A", b="B") # (1, 2) {'a': 'A', 'b': 'B'}
```

:::

---

### 魔术方法

Python 类中内置的魔术方法也是一种 [私有方法](#私有属性私有方法)

| 常用内置魔术方法 | 说明                                               |
| :--------------: | -------------------------------------------------- |
|   `__init__()`   | 作为类的构造函数，在类实例化时执行初始化的相关逻辑 |
|   `__str__()`    | 用于自定义直接打印类实例对象时的输出内容           |

## 类的继承

在定义类时可通过括号指定要继承的父类

子类会继承到父类中除私有成员以外的所有内容

::: code-group

```py [单继承]
class 父类:
    pass


class 子类(父类):
    pass


子类实例对象 = 子类()
```

```py [多继承]
class 父类1:
    pass


class 父类2:
    pass


class 子类(父类1, 父类2):
    pass


子类实例对象 = 子类()
```

:::

---

### super( )

子类中可以通过`super()`访问父类中的成员

```py
class 父类:
    def __init__(self, 形参):
        self.实例属性 = 形参

    def 实例方法(self, 形参1, 形参2):
        pass


class 子类(父类):
    def __init__(self, 形参1, 形参2):
        super().__init__(形参1)             # [!code hl]
        self.实例属性 = 形参2

    def 方法(self):
        print(super().实例属性)              # [!code hl:2]
        super().实例方法(实参1, 实参2)
```

::: details 例子：子类通过`super()`访问父类中的成员

```py{0}
class A:
    var = "AAA"

    def say(self, message):
        print(message)


class B(A):
    var = "BBB"

    def say(self):
        message = super().var + self.var
        super().say(message)


A().say("AAA")      # "AAA"
B().say()           # "AAABBB"
```

:::

---

### 抽象类

抽象类不能被实例化，仅用于作为一个定义一些规范供其子类去遵循的基类

抽象类中会定义一些无函数体的抽象方法 ( 仅定义但不实现 ) 具体的逻辑实现由子类去定义

继承抽象类的子类中除了自身成员以外，必须覆盖重写并实现抽象类中的所有抽象方法，否则报错

Python 的抽象类可以继承内置抽象类`ABC`，定义抽象方法时可使用装饰器`@abstractmethod`

```py
from abc import ABC, abstractmethod


class 抽象类(ABC):
    @abstractmethod
    def 抽象方法(self):
        pass


class 子类1(抽象类):
    def 抽象方法(self):
        # 重写逻辑


class 子类2(抽象类):
    def 抽象方法(self):
        # 重写逻辑
```

---

### 多态

> Polymorphism

多态是指继承的一种体现，可理解为不同子类对统一方法有各自不同的具体实现

继承抽象类的子类对抽象方法的实现也是多态的一种体现

```py
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass


class Dog(Animal):
    def speak(self):
        print("汪汪汪")


class Cat(Animal):
    def speak(self):
        print("喵喵喵")


Dog().speak()       # 汪汪汪
Cat().speak()       # 喵喵喵
```

## 方法装饰器

```py
class 类():
    @装饰器
    def 方法(参数):
        pass
```

|  类中常用装饰器   | 说明                                              |
| :---------------: | ------------------------------------------------- |
|  `@staticmethod`  | 用于定义一个静态方法                              |
|  `@classmethod`   | 用于定义一个类方法                                |
| `@abstractmethod` | 用于定义一个抽象方法                              |
|    `@property`    | 用于定义一个动态计算的只读属性 ( 方法会变为属性 ) |

::: details 例子：验证装饰器`@property`的用法

```py
from datetime import datetime


class Person:
    def __init__(self, name, birthday):
        self.name = name
        self.birthday = birthday

    @property
    def age(self):
        current_year = datetime.now().year
        return current_year - self.birthday

    @property
    def greeting(self):
        return f"Hello, my name is {self.name} and I am {self.age} years old."


person = Person("Alice", 1995)
print(person.name)       # Alice
print(person.birthday)   # 1995
print(person.age)        # 30                                               # [!code hl:2]
print(person.greeting)   # Hello, my name is Alice and I am 30 years old.
```
