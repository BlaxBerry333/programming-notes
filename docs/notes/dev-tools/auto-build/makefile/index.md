---
prev: false
next: false
---

# Makefile

![](/static/skill-images/dev-tools--makefile.png)

Makefile 是一种用于自动化编译和构建过程的工具

## 下载安装

::: code-group

```zsh [Homebrew]
% brew install make
```

:::

> 如下：本文使用的 make v3.81

```zsh
% make --version      # [!code focus]
GNU Make 3.81
Copyright (C) 2006  Free Software Foundation, Inc.
This is free software; see the source for copying conditions.
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.

This program built for i386-apple-darwin11.3.0
```

## 所处位置

Makefile 一般位于项目的根目录

::: code-group

```[目录结构]
[项目目录]
├─ ...
│
└─ Makefile     #  [!code ++]
```

:::

## 基本语法

### 目标与命令

Makefile 主要由一系列目标组成，通过目标管理要执行的相关命令

在终端可通过`make`执行目标 ( 该目标的所有的命令语句默认会打印在终端，可通过`@`省略打印 )

可使用`.PHONY`将目标指定为伪目标，来避免该目标名与工作区中同名文件冲突

```Makefile
.PHONY: 目标名1 目标名2

目标名1:
    命令       # 该命令语句会被打印在终端
    @命令      # 该命令语句不会被打印在终端

目标名2:
    # ...
```

```zsh
% cd [工作区]
% make [目标名]                 # [!code focus:2]
```

::: details 例子：验证通过`@`可以省略打印命令语句

::: code-group

```Makefile [Makefile]
.PHONY: show-xxx show-yyy

show-xxx:
	echo "xxx"

show-yyy:
	@echo "yyy"
```

```zsh [执行目标]
% make show-xxx
echo "xxx"
xxx

% show-yyy
yyy
```

:::

---

### 变量

为了减少硬编码，建议使用变量存储固定的信息

变量名使用大写蛇形命名 ( SNAKE_CASE )

变量在目标的命令中可通过`${}`、`$()`引用

在终端可通过`make`执行目标时会自动使用变量的默认值，也可通过传递新值对变量进行覆盖

```Makefile
变量=值             # 变量的需要动态计算时，每次引用改变量都会重新计算
变量:=值            # 变量的需要动态计算时，定义变量时就决定且不再改变
变量=$(shell命令)   # 存储 Shell 脚本命令，在引用该变量时执行脚本

目标名:
    echo ${变量}
    echo $(变量)
```

```zsh
% cd [工作区]
% make [目标名]            # 如果有变量则使用定义的默认值   # [!code focus:2]
% make [目标名] [变量]=值   # 为变量传递新值进行覆盖
```

::: details 例子：使用变量的默认值以及传递新值进行覆盖

::: code-group

```Makefile [Makefile]
XXX=123
YYY=

.PHONY: show

show:
	@echo ${XXX}
	@echo ${YYY}
```

```zsh [执行目标]
% make show
123

% make show YYY=888
123
888
```

:::

---

### 条件判断

TODO:

---

### 循环遍历

TODO:

<!-- ## 相关链接

- [快速入门](https://www.bilibili.com/video/BV1tyWWeeEpp/?spm_id_from=333.1387.homepage.video_card.click&vd_source=8960252a3845b76b699282b11f36ab5c)
- [Makefileの基本](https://zenn.dev/keitean/articles/aaef913b433677) -->
