---
prev: false
next: false
---

# Shell 脚本

![](/static/skill-images/web-infrastructure--shell.png)

Shell 脚本主要用于编写自动化以及批量处理的命令

## 解释器

不同主机上可能有不同种类的 Shell 解释器

可通过环境变量`$SHELL`查看当前主机使用的解释器 ( 值是解释器的路径 )

::: code-group

```bash [bash]
% echo $SHELL
bin/bash
```

```zsh [zsh]
$ echo $SHELL
bin/zsh
```

:::

| 常见 Shell 解释器 | 常见适用环境                                      | 解释器位置  |  配置文件   |
| :---------------: | ------------------------------------------------- | :---------: | :---------: |
|     **bash**      | 大部分 Linux 发行版、<br/>Catalina 版之前的 macOS | `/bin/bash` | `~/.bashrc` |
|      **zsh**      | Catalina 版之后的 macOS、<br/>Kali Linux          | `/bin/zsh`  | `~/.zshrc`  |

::: details 例子：分别在 macOS 本机环境以及一个 Alma Linux Docker 容器环境中查看 Shell 解释器

```zsh
% echo $SHELL
/bin/zsh                                        # [!code hl]

% docker pull almalinux
% docker run --name study_bash -it almalinux
[root@b77049294c4f /]# echo $SHELL
/bin/bash                                       # [!code hl]
[root@b77049294c4f /]# exit
```

:::

## 脚本执行

Shell 脚本可以直接运行在主机的终端

```bash
$ [命令]
```

Shell 脚本也可以写入一个文件，文件后缀名约定为`.sh`

::: code-group

```bash [写法一]
# 在终端通过 bash 命令直接执行脚本文件
$ bash [文件名].sh

# 在终端通过 sh 命令直接执行脚本文件
$ sh [文件名].sh
```

```bash [写法二]
# 1. 给文件添加权限
$ chmod [权限] [文件名].sh

# 2. 通过路径直接执行脚本文件
$ [文件名].sh
```

:::

::: details 例子：通过 bash 创建并执行一个 Shell 脚本文件

::: code-group

```bash [写法一]
$ echo '
#!/bin/bash
echo "hello world"
' > xxxx.sh

$ bash ./xxxx.sh                        # [!code focus]
hello world

$ sh 111.sh                             # [!code focus]
hello world
```

```bash [写法二]
$ echo '
#!/bin/bash
echo "hello world"
' > xxxx.sh

$ ./xxxx.sh                             # 报错：没有执行权限  # [!code error:2] # [!code focus:5]
sh: ./xxxx.sh: Permission denied

$ chmod +x ./xxxx.sh
$ ./my_test.sh
hello world
```

:::

## 书写规范

Shell 脚本文件的第一行需要指明使用的解释器的路径 ( 大部分 Linux 发行版都使用 Bash )

::: code-group

```sh [.sh 脚本文件]
#![当前脚本使用的解释器的路径]

# ...
# ...
```

:::

::: details 例子：一个使用 Bash 解释器的打印`hello world`的脚本文件

```sh
#!/bin/bash

message="hello world"
echo ${message}
```

:::

<!-- ## 相关链接

- [1天搞定Shell](https://www.bilibili.com/video/BV1HrctekEHa?spm_id_from=333.788.videopod.episodes&vd_source=8960252a3845b76b699282b11f36ab5c&p=3)
- [Shell脚本编程教程 从入门到精通](https://www.bilibili.com/video/BV1gTm2YrEuN/?spm_id_from=333.788.recommend_more_video.1&vd_source=8960252a3845b76b699282b11f36ab5c)
- [Linux系统运维课程-shell编程 从入门到精通](https://www.bilibili.com/video/BV1pD6BYRE2G?spm_id_from=333.788.videopod.episodes&vd_source=8960252a3845b76b699282b11f36ab5c)
-->
