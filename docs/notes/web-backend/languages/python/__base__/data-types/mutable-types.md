# Python 可变数据类型

> Mutable Types

Python中可变数据类型存储的不是数据的值，而是数据在内存中的地址 ( 引用 )

将一个现有可变数类型的数据赋值给另一个变量时，实际上是将数据的内存地址 ( 引用 ) 赋值给了新变量，因此两个变量指向了同一个内存地址、引用了同一份数据

多个变量可以指向同一个内存地址，此时修改任何一个变量都会影响到所有引用该内存地址的变量

## 列表 ( list )

```py
变量 = list()
变量 = []

变量 = [元素]
变量 = [元素1, 元素2, 元素3]
```

---

### 常用操作

```py
# 获取长度
print(len(列表))

# 检查成员
print(元素 in 列表)
print(元素 not in 列表)

# 列表解构赋值
元素1, 元素2 = 列表
元素1, 元素2, *剩余元素 = 列表

# 获取元素
print(列表[索引])

# 修改元素
列表[索引] = 新值

# 切片
新列表 = 列表[开始索引:结束索引]
新列表 = 列表[开始索引:结束索引:间隔元素数]
新列表 = 列表[开始索引:]
新列表 = 列表[:结束索引]
```

---

### 列表推导式

```py
新列表 = [新列表中的元素 for 列表元素 in 列表]
新列表 = [新列表中的元素 for 列表元素 in 列表 if 条件]
```

::: details 例子：利用推导式实现列表的映射

```py
l = [
    {"name": "Andy", "age": 28},
    {"name": "Tom", "age": 16},
    {"name": "Jack", "age": 36},
]

l2 = [f"{item['name']} is {item['age']}" for item in l]
print(l2)       # ['Andy is 28', 'Tom is 16', 'Jack is 36']
```

:::

::: details 例子：利用推导式实现列表的过滤

```py
l = [
    {"name": "Andy", "age": 28},
    {"name": "Tom", "age": 16},
    {"name": "Jack", "age": 36},
]

l2 = [item for item in l if item["age"] <= 20]
print(l2)       # [{'name': 'Tom', 'age': 16}]
```

:::

---

### 常用内置方法

|                                   | 说明                                                                 |
| --------------------------------- | -------------------------------------------------------------------- |
| `index()`                         | 查询列表中某个元素的索引，若不存在则报错`ValueError`                 |
| `count()`                         | 统计统计列表中某一个元素的出现次数                                   |
| `append()`                        | 向列表的末尾追加一个元素                                             |
| `extend()`                        | 向列表的末尾追加一个数据容器 ( 字符串、列表、元组、集合 ) 中所有元素 |
| `insert()`                        | 向列表的指定位置插入一个元素                                         |
| `pop()`                           | 从列表中删除指定位置索引对对应的元素，返回值为删除的元素             |
| `remove()`                        | 列表中删除指定的值相同的第一个元素，若不存在则报错`ValueError`       |
| `clear()`                         | 清空列表中所有元素                                                   |
| `sort()`<br/>`sort(reverse=True)` | 判断列表中的元素                                                     |

## 字典 ( dict )

```py
变量 = dict()
变量 = {}

变量 = {"键": "值"}
变量 = {"键1": "值", "键2": "值", "键3": "值"}
```

---

### 常用操作

```py
# 增
字典["新键"] = 值

# 删
del 字典["键"]

# 改
字典["键"] = 新值

# 查
值 = 字典["键"]                 # [!code --]
值 = 字典.get("键")             # [!code ++:2]
值 = 字典.get("键", 默认值)

# 字典解包
新字典 = {**字典1, **字典2}
```

---

### 字典推导式

```py
新字典 = {键: 值 for 键, 值 in 字典.items()}
新字典 = {键: 值 for 键, 值 in 字典.items() if 条件}
```

::: details 例子：利用推导式实现字典的映射

```py
d1 = {
    "a": 1,
    "b": 2,
    "xxx": 111,
}

d2 = {k: v for k, v in d1.items() if k != "xxx"}
print(d2)       # {'a': 1, 'b': 2}
```

:::

::: details 例子：利用推导式实现字典的过滤以及条件映射

```py
d1 = {"a": 1, "b": 2, "xxx": 111}
d2 = {"c": 3, "d": 4, "xxx": 222}

d3 = {
    "d1": {k: v for k, v in d1.items() if k == "xxx"},
    "d2": {k: v for k, v in d2.items() if v % 2 != 0},
}

print(d3)       # {'d1': {'xxx': 111}, 'd2': {'c': 3}}
```

:::

---

### 常用内置方法

|            | 说明                                                                           |
| ---------- | ------------------------------------------------------------------------------ |
| `get()`    | 查询字典中某个键对应的值，若不存在则返回`None`，单可指定键值对不存在时的默认值 |
| `keys()`   | 从字典中获取所有的键，返回值为一个仅可遍历的视图对象                           |
| `values()` | 从字典中获取所有的值，返回值为一个仅可遍历的视图对象                           |
| `items()`  | 从字典中获取所有的键值对，返回值为一个仅可遍历的视图对象                       |

## 集合 ( set )

```py
变量 = set()
变量 = {}

变量 = {元素}
变量 = {元素1, 元素2, 元素3}
```

---

### 常用内置方法

|                            | 说明                                                          |
| -------------------------- | ------------------------------------------------------------- |
| `add()`                    | 向集合中添加一个元素                                          |
| `remove()`                 | 从集合中删除一个元素                                          |
| `clear()`                  | 清空集合中所有元素                                            |
| `A.union(B)`               | 获取集合 A 与集合 B 的并集 ( 合并两个集合 )                   |
| `A.intersection(B)`        | 获取集合 A 与集合 B 的交集 ( 两个集合中都有的元素的集合 )     |
| `A.difference(B)`          | 获取集合 A 与集合 B 的差集 ( 只有当前集合中才有的元素的集合 ) |
| `A.intersection_update(B)` | 从集合 A 中删除与集合 B 的交集                                |
| `A.difference_update(B)`   | 从集合 A 中删除与集合 B 的差集                                |
