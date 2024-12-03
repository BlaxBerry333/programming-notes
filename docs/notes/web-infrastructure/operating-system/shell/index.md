---
prev: false
next: false
---

# Shell 脚本

![](/static/skill-images/web-infrastructure--shell.png)

Shell 主要用于编写自动化执行一系列命令和操作

## Shell 解释器

> [!IMPORTANT] 常见的 Shell 解释器种类
> | 解释器 | 常见适用环境 | 解释器位置 | 配置文件 |
> | :---------------------------------: | ----------------------------------------------- | ----------- | ----------- |
> | **bash**<br/>( Bourne Again Shell ) | 大部分 Linux 发行版、<br/>Catalina 版之前的 macOS | `/bin/bash` | `~/.bashrc` |
> | **zsh**<br/>( Z Shell ) | Catalina 版之后的 macOS、<br/>Kali Linux | `/bin/zsh` | `~/.zshrc` |
>
> 可通过环境变量`$SHELL`查看当前主机使用的 Shell 解释器种类 ( 解释器的路径 )
> ::: code-group
>
> ```bash [bash]
> $ echo $SHELL
> /bin/bash
> ```
>
> ```zsh [zsh]
> % echo $SHELL
> /bin/zsh
> ```
>
> :::

::: details 例子：macOS 通过 Docker 使用 Alma Linux 环境

```zsh
% echo $SHELL
/bin/zsh

 % docker run --name study_bash -it almalinux
[root@b77049294c4f /]# echo $SHELL
/bin/bash
[root@b77049294c4f /]# exit
```

:::

## Shell 脚本

Shell 可以写入一个脚本文件并通过文件名执行，文件约定后缀名是`.sh`

脚本文件也可以没有后缀，此时可根据文件第一行判断是否是 Shell 脚本 ( Bash 的出现率更高 )

::: code-group

```shell [脚本文件]
#![本文件中 Shell 使用的解释器的路径]

变量 = 值
变量 = 值

# Shell 命令
# Shell 命令
```

:::

::: details 例子：创建并执行一个 Shell 脚本

::: code-group

```bash [命令式]
$ echo '
#!/bin/bash                             # [!code hl:6]

message="xxxx"

echo ${message}
echo "yyyy"
' > my_test.sh                          # 创建脚本文件

$ ./my_test.sh
./my_test.sh: Permission denied

$ chmod a+x ./my_test.sh                # 给所有用户添加对该文件的执行权限

$ ./my_test.sh
xxxx
yyyy
```

```sh [脚本文件]
#!/bin/bash

message="xxxx"

echo ${message}
echo "yyyy"
```

:::

## 相关链接

- [Shell脚本编程教程 从入门到精通](https://www.bilibili.com/video/BV1gTm2YrEuN/?spm_id_from=333.788.recommend_more_video.1&vd_source=8960252a3845b76b699282b11f36ab5c)
- [能用到“退休”的 600条 Linux 命令，可以解决日常99%的问题](https://mp.weixin.qq.com/s/em3xwsKzFTucDAIfXvIc-Q)
