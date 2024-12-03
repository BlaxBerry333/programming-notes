# Python 文件操作

## 打开文件

### open( )

内置函数`open()`可用于打开访问一个文件，返回值为文件对象

文件对象在操作结束后必须关闭以释放资源，可通过文件对象的方法`close()`手动关闭

但是更建议使用`with`语句打开文件，可省略`close()`手动关闭以防止忘记

::: code-group

```py [open( ) + with]
with open("文件路径名", 访问模式) as 文件对象:
    # ...
```

```py [open( ) + close( ) <Badge type="warning">不推荐</Badge>]
文件对象 = open("文件路径名", 访问模式)

# ...

文件对象.close()
```

:::

| 常用访问模式 | 说明                             |
| :----------: | -------------------------------- |
|     `r`      | ( 默认 ) 以只读方式访问文件      |
|     `w`      | 以只写方式访问文件，并覆盖原内容 |
|     `a`      | 以追加写入方式访问文件           |
|     `r+`     | 以读 & 写方式访问文件            |
|     `a+`     | 以读 & 追加写入方式访问文件      |
|     `x`      | 新建文件，若文件已存在则报错     |

::: details 例子：验证文件的打开与关闭

::: code-group

```py [open( ) + with]
with open("./static/1.txt", "r") as f:
    print(type(f))  # <class '_io.TextIOWrapper'>
    print(f)        # <_io.TextIOWrapper name='./static/1.txt' mode='r' encoding='UTF-8'>

```

```py [open( ) + close( )]
f = open("./static/1.txt", "r")

print(type(f))  # <class '_io.TextIOWrapper'>
print(f)        # <_io.TextIOWrapper name='./static/1.txt' mode='r' encoding='UTF-8'>

f.close()
```

:::

::: details 例子：`for`循环遍历文件对象

::: code-group

```py [文件操作]
with open("./static/1.txt", "r") as f:
    for line in f:
        print(line, end="")


# aaaaa
# bbbbb
# ccccc
#
# xxxxx
```

```py [txt 文件]
aaaaa
bbbbb
ccccc

xxxxx
```

:::

## 常用方法

### close( )

该方法可用于手动关闭一个打开的文件

建议使用`with`语句打开文件，会在操作结束后自动关闭文件

```py
文件对象.close()
```

---

### read( )

该方法可用于读取文件中所有内容

读取的内容以字符串形式返回

```py
字符串 = 文件对象.read()
```

> 如下：

::: code-group

```py [文件操作]
with open("./static/1.txt", "r") as f:
    contents = f.read()
    print(type(contents))
    print(contents)


# <class 'str'>
# aaaaa
# bbbbb
# ccccc
#
# xxxxx
```

```py [txt 文件]
aaaaa
bbbbb
ccccc

xxxxx
```

:::

---

### readlines( )

该方法可用于逐行读取文件中所有内容

读取的内容以字符串列表形式返回

```py
列表 = 文件对象.read()
```

> 如下：

::: code-group

```py [文件操作]
with open("./static/1.txt", "r") as f:
    contents = f.readlines()
    print(type(contents))
    print(contents)

    for line in contents:
        print(line.strip())


# <class 'list'>
# ['aaaaa\n', 'bbbbb\n', 'ccccc\n', '\n', 'xxxxx\n']
# aaaaa
# bbbbb
# ccccc
#
# xxxxx
```

```py [txt 文件]
aaaaa
bbbbb
ccccc

xxxxx
```

:::

---

### write( )

该方法可用于向文件写入内容

```py
文件对象.write(字符串)
```

| 打开文件时的访问模式 |                                                                                   |
| :------------------: | --------------------------------------------------------------------------------- |
|         `w`          | 若文件不存在时，会创建文件并写入内容<br/>若文件已经存在，则用写入内容完全覆盖原文 |
|         `a`          | 若文件不存在时，会创建文件并写入内容<br/>若文件已经存在，则在原文后面追加写入内容 |

> 如下：

::: code-group

```py [只写模式]
with open("./static/1.txt", "w") as f:
    f.write("xxxxxx\n")
```

```py [追加写入模式]
with open("./static/1.txt", "a") as f:
    f.write("xxxxxx\n")
```

:::
