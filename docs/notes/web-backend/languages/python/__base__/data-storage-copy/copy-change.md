# Python 拷贝与修改

## 变量赋值

将一个变量直接赋值给另一新变量后，数据修改时对新变量与源变量的影响取决于不同的数据类型

|                      数据类型                      | 说明                                                                 |
| :------------------------------------------------: | -------------------------------------------------------------------- |
| [不可变类型数据](../data-types/immutable-types.md) | 值拷贝，拷贝赋值的是数据的值，新变量与旧变量互不影响                 |
|   [可变类型数据](../data-types/mutable-types.md)   | 引用拷贝，拷贝赋值的是引用地址，成员变化时新变量与旧变量都会受到影响 |

---

### 值拷贝

> Value Copy

赋值给一个新变量赋值一个基本类型数据时，拷贝赋值的仅仅是一个该数据值的副本

对新变量与源变量进行修改时都不会影响到对方

```py{0}
a = 100

# 拷贝
b = a

# 修改源变量
a = 200
print(a);   # 200
print(b);   # 100

# 修改新变量
b = 300
print(a);   # 200
print(b);   # 300
```

### 引用拷贝

> Reference Copy

赋值给一个新变量赋值一个引用类型数据时，拷贝赋值的是该数据的引用地址

新对象与源对象对该引用数据类型的成员进行修改时会影响到所有使用该数据的地方

::: code-group

```py{0} [列表]
a = ["React", "Vue"]

# 拷贝
b = a

# 修改源对象
a.pop()
a[0] = "Django"
print(a)    # ['Django']
print(b)    # ['Django']

# 修改新对象
b[0] = "Gin"
b.append("Rails")
print(a)    # ['Gin', 'Rails']
print(b)    # ['Gin', 'Rails']
```

```py{0} [字典]
a = {"name": "Andy", "skills": ["React"]}

# 拷贝
b = a

# 修改源对象
a["name"] = "Tom"
a["skills"][0] = "Vue"
print(a)    # {'name': 'Tom', 'skills': ['Vue']}
print(b)    # {'name': 'Tom', 'skills': ['Vue']}

# 修改新对象
b["name"] = "Jack"
b["skills"].append("Django")
print(a)    # {'name': 'Jack', 'skills': ['Vue', 'Django']}
print(b)    # {'name': 'Jack', 'skills': ['Vue', 'Django']}
```

:::

## 函数参数传递

在函数中直接修改形参时对外部实参的影响取决于不同的数据类型

|                      数据类型                      | 说明                                                             |
| :------------------------------------------------: | ---------------------------------------------------------------- |
| [不可变类型数据](../data-types/immutable-types.md) | 值传递，传递的是实参的副本，函数中修改形参时不会影响外部实参     |
|   [可变类型数据](../data-types/mutable-types.md)   | 引用传递，传递的是实参的引用地址，函数中修改形参时会影响外部实参 |

---

### 值传递

> Pass by Value

通过参数传递给函数的是一个不可变类型数据时，传递的仅仅是一个该数据值的副本

在函数中修改该参数时不会影响到函数外的源数据

```py
def my_function(num):
    num += 1
    print(num)

num = 0

my_function(num)  # 1
my_function(num)  # 1
my_function(num)  # 1
print(num)        # 0
```

---

### 引用传递

> Pass by Reference

通过参数传递给函数的是一个可变类型数据时，传递的是该数据的引用地址

在函数中修改该参数时会影响到函数外的源数据，以及所有使用了源数据的地方

::: code-group

```py{0} [列表]
def my_function(my_list, value):
    my_list.append(value)
    print(my_list)

my_list = []

my_function(my_list, 1)  # [1]
my_function(my_list, 2)  # [1, 2]
my_function(my_list, 3)  # [1, 2, 3]
print(my_list)           # [1, 2, 3]
```

```py{0} [字典]
def my_function(obj, value):
    obj[value] = value
    print(obj)

my_obj = {}

my_function(my_obj, 1)   # {1: 1}
my_function(my_obj, 2)   # {1: 1, 2: 2}
my_function(my_obj, 3)   # {1: 1, 2: 2, 3: 3}
print(my_obj)            # {1: 1, 2: 2, 3: 3}
```

:::

## 对象拷贝

### 浅拷贝

> Shallow Copy

浅拷贝是指基于源对象创建一个新的对象时：

- 复制其成员中不可变类型数据的值 ( 新对象中修改该数据不影响源对象 )
- 复制其成员中可变类型数据的引用地址 ( 共享该引用地址，新对象中修改该数据会影响源对象 )

> [!IMPORTANT] 深拷贝没有实现新对象与源对象在内存上的完全分离
> 浅拷贝创建的是个新对象，内存地址与源对象不同，但是新对象中的可变类型数据与源对象中该数据的引用相同，该数据变化时都会受到影响

Python 的深拷贝通过内置模块`copy`中`copy()`方法实现

```py
import copy

list1 = [1, [2, 3]]

list2 = copy.copy(list1)
list2[1].append(4)

print(list1)  # [1, [2, 3, 4]]
print(list2)  # [1, [2, 3, 4]]
```

---

### 深拷贝

> Deep Copy

深拷贝是指基于源对象创建一个新的对象时：

将源对象完整拷贝后存储于一个新的内存空间，修改新对象中成员不会影响到源对象

> [!IMPORTANT] 深拷贝彻底实现了新对象与源对象在内存上的完全分离
> 深拷贝创建的新对象的内存地址与源对象不同，并且其中数据的引用也不同

Python 的深拷贝通过内置模块`copy`中`deepcopy()`方法实现

```py
import copy

list1 = [1, [2, 3]]

list2 = copy.deepcopy(list1)
list2[1].append(4)

print(list1)  # [1, [2, 3]]
print(list2)  # [1, [2, 3, 4]]
```
