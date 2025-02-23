---
prev: false
next: false
---

# Linux

![](/static/skill-images/web-infrastructure--linux.png)

## 下载安装

::: code-group

```zsh [Docker]
# 1. 下载 Alma Linux 的镜像
% docker pull almalinux

# 2. 创建并执行 Docker 容器
% docker run --name study_bash -it almalinux
```

:::

## 目录结构

::: code-group

```[目录结构]
/                   # 根目录
│
├─ bin/             # 二进制可执行文件
│
├─ etc/             # 系统配置
│
├─ home/            # 用户的主目录 ( ~ )
│  ├─ 用户1/
│  │  └─ ...
│  ├─ 用户2/
│  │  └─ ...
│  └─ ...
│
└─ ...
```

:::

## 常用命令

### 目录

```bash
$ pwd         # 查看当前所处目录
```

---

### 移动

```bash
$ cd [目录名]  # 移动到指定目录中
$ cd ..       # 移动到上一级目录中
$ cd /        # 移动到根目录
$ cd ~        # 移动到用户的主目录
$ cd -        # 移动到之前所在的目录
```

---

### 创建

```bash
$ mkdir [目录名]               # 创建一个目录
$ mkdir -p [目录名1]/[目录名2]  # 创建嵌套目录

$ touch [文件名]               # 创建一个空白文件
$ touch [文件名1] [文件名2]     # 创建多个空白文件
```

---

### 删除

```bash
$ rm [文件名]                # 删除一个指定的文件
$ rm [文件名1] [文件名2]      # 删除多个指定的文件

$ rm -r [目录名]             # 删除一个指定的目录及其内容
$ rm -r [目录名1] [目录名2]   # 删除多个指定的目录及其内容
```

> [!CAUTION] <code>rm</code>命令要慎用，删除后无法恢复

---

### 拷贝

```bash
$ cp [源文件路径] [目标路径]       # 将源文件拷贝到目标路径
$ cp -i [源文件路径] [目标路径]    # 在覆盖时会有提示
```

---

### 移动

```bash
$ mv [源文件路径] [目标路径]       # 将源文件移动到目标路径
$ mv -i [源文件路径] [目标路径]    # 在覆盖时会有提示
```

::: details 例子：通过`mv`命令实现重命名 ( 路径不变仅文件名改变 )

```bash
$ pwd
/home
$ ls
11.sh
$ mv /home/11.sh /home/22.sh
$ ls
22.sh
```

:::

---

### 重定向

重定向是指：将命令的返回值作为文件的内容

```bash
$ echo [内容]                # 在终端在输出内容
$ echo [内容] > [文件名]      # 将内容覆盖到指定的文件
$ echo [内容] >> [文件名]     # 将内容追加到指定的文件

$ [命令] > [文件名]           # 将命令的返回值覆盖到指定的文件
$ [命令] >> [文件名]          # 将命令的返回值追加到指定的文件
```

::: details 例子：验证重定向操作符`>`、`>>`的基本使用

```bash
$ ls
$ touch xx.sh
$ echo "hello" > xx.sh
$ cat xx.sh
hello
$ echo "hello world" >> xx.sh
$ cat xx.sh
hello
hello world
$ ls -lh > xx.sh
$ cat xx.sh
cat xx.sh
total 0
-rw-r--r-- 1 root root 0 Feb 12 20:19 xx.sh
```

:::

---

### 管道

管道是指：将命令的返回值作为另一个命令的参数

```bash
$ [命令1] | [命令2]
```

::: details 例子：验证管道符`|`结合`more`、`grep`

```bash
$ ls -lh | more             # 分页查看当前目录下的所有内容
# 省略...

$ ls -lh | grep -n xxx      # 在当前目录下查看名为 xxx 的内容
# 省略...
```

:::

---

### 查看文本

```bash
$ cat [文件名]                 # 查看一个文件的内容 ( 全部展示 )
$ cat -b [文件名]              # 给非空的每行加上行号
$ cat -n [文件名]              # 给每行加上行号

$ more [文件名]                # 查看一个文件的内容 ( 超出画面长度分页展示，↑↓翻页，q退出 )

$ grep [文本内容] [文件名]      # 从文件中查找指定的文本内容 ( 内容包含空格时需要用引号包裹 )
$ grep -n [文本内容] [文件名]   # 同时展示对应的行数
$ grep -i [文本内容] [文件名]   # 查找时忽略大小写
```

---

### 查看目录

```bash
$ ls          # 显示当前目录中的所有子目录与文件
$ ls -a       # 可以展示隐藏的子目录与文件
$ ls -l       # 可以展示子目录与文件的详细信息 ( 权限、用户、群组、尺寸、创建日期、名称 )
$ ls -lh      # 在 -l 的基础上为文件尺寸加上合适的单位
$ ls [通配符]  # 利用通配符匹配
```

> [!IMPORTANT] <code>ls -l</code>返回值中包含的权限信息
>
> <table>
>   <thead>
>     <tr>
>       <td style="text-align:center;"></td>
>       <td style="text-align:center;">目录</td>
>       <td colspan="3" style="text-align:center;">所有者权限</td>
>       <td colspan="3" style="text-align:center;">组权限</td>
>       <td colspan="3" style="text-align:center;">其他用户权限</td>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <th style="text-align:center;">文件的权限</th>
>       <td style="text-align:center;">-</td>
>       <td>r</td>
>       <td>w</td>
>       <td>-</td>
>       <td>r</td>
>       <td>w</td>
>       <td>-</td>
>       <td>r</td>
>       <td>-</td>
>       <td>-</td>
>     </tr>
>     <tr>
>       <th style="text-align:center;">目录的权限</th>
>       <td style="text-align:center;">d</td>
>       <td>r</td>
>       <td>w</td>
>       <td>x</td>
>       <td>r</td>
>       <td>w</td>
>       <td>x</td>
>       <td>r</td>
>       <td>-</td>
>       <td>x</td>
>     </tr>
>   </tbody>
> </table>

::: details 例子：验证`ls`命令的基本使用

```bash
$ touch 11.sh 12.sh 13.sh 21.sh
$ ls
11.sh 12.sh 13.sh 21.sh
$ ls 1*.sh
11.sh 12.sh 13.sh
$ ls *1.sh
11.sh  21.sh
```

:::

::: details 例子：通过`ls -l`命令查看新增的文件与目录的权限

```bash
$ mkdir xxx && touch aaa.sh
$ ls -l
-rw-r--r-- 1 root root    0 Feb 21 16:45 aaa.sh
drwxr-xr-x 2 root root 4096 Feb 21 16:45 xxxx
```

:::

---

### 权限

> [!IMPORTANT] 权限、数字代号总数的计算
>
> |        | 缩写字母 | 数字代号 |
> | :----: | :------: | :------: |
> |  可读  |   `r`    |   `4`    |
> |  可写  |   `w`    |   `2`    |
> | 可执行 |   `x`    |   `1`    |
>
> <table>
>   <tbody>
>     <tr>
>       <td>-</td>
>       <td>-</td>
>       <td>-</td>
>       <td>r</td>
>       <td>-</td>
>       <td>-</td>
>       <td>r</td>
>       <td>-</td>
>       <td>w</td>
>       <td>-</td>
>       <td>-</td>
>       <td>x</td>
>     </tr>
>     <tr>
>       <td>0</td>
>       <td>0</td>
>       <td>0</td>
>       <td>4</td>
>       <td>0</td>
>       <td>0</td>
>       <td>0</td>
>       <td>2</td>
>       <td>0</td>
>       <td>0</td>
>       <td>0</td>
>       <td>1</td>
>     </tr>
>     <tr>
>       <td colspan="3" style="text-align:center;">0</td>
>       <td colspan="3" style="text-align:center;">4</td>
>       <td colspan="3" style="text-align:center;">2</td>
>       <td colspan="3" style="text-align:center;">1</td>
>     </tr>
>   </tbody>
> </table>
>
> <table>
>   <tbody>
>     <tr>
>       <td>r</td>
>       <td>w</td>
>       <td>x</td>
>       <td>r</td>
>       <td>w</td>
>       <td>-</td>
>       <td>r</td>
>       <td>-</td>
>       <td>x</td>
>       <td>-</td>
>       <td>w</td>
>       <td>x</td>
>     </tr>
>     <tr>
>       <td>4</td>
>       <td>2</td>
>       <td>1</td>
>       <td>4</td>
>       <td>2</td>
>       <td>0</td>
>       <td>4</td>
>       <td>0</td>
>       <td>1</td>
>       <td>0</td>
>       <td>2</td>
>       <td>1</td>
>     </tr>
>     <tr>
>       <td colspan="3" style="text-align:center;">7</td>
>       <td colspan="3" style="text-align:center;">6</td>
>       <td colspan="3" style="text-align:center;">5</td>
>       <td colspan="3" style="text-align:center;">3</td>
>     </tr>
>   </tbody>
> </table>

```bash
# 通过缩写字母实现统一修改所有者权限、组权限、其他用户权限
$ chmod +[权限] [文件名/目录名]         # 添加权限
$ chmod -[权限] [文件名/目录名]         # 删除权限

# 通过数字代号总数实现对应修改所有者权限、组权限、其他用户权限
$ chmod [总数总数总数] [文件名/目录名]   # 添加权限
$ chmod [总数总数总数] [文件名/目录名]   # 删除权限
```

::: details 例子：通过缩写字母实现统一修改文件权限

```bash
$ echo "echo 'hello world'" > aaa.sh
$ ls -l
-rw-r--r-- 1 root root   19 Feb 21 16:45 aaa.sh
$ ./aaa.sh
sh: ./aaa.sh: Permission denied         # [!code error]

$ chmod +x aaa.sh
$ ls -l
-rwxr-xr-x 1 root root   19 Feb 21 16:45 aaa.sh
$ ./aaa.sh
hello world

$ chmod -rwx aaa.sh
$ ls -l
---------- 1 root root   19 Feb 21 16:45 aaa.sh
$ ./aaa.sh
sh: ./aaa.sh: Permission denied         # [!code error]
```

:::

::: details 例子：通过数字代码总数实现修改文件权限

```bash
$ touch aaa.sh
$ ls -l
-rw-r--r-- 1 root root   19 Feb 21 16:45 aaa.sh

$ chmod 000 aaa.sh
$ ls -l
---------- 1 root root   19 Feb 21 16:45 aaa.sh

$ chmod 070 aaa.sh
$ ls -l
----rwx--- 1 root root   19 Feb 21 16:45 aaa.sh

$ chmod 644 aaa.sh
$ ls -l
-rw-r--r-- 1 root root   19 Feb 21 16:45 aaa.sh
```

:::

---

### 用户

超级用户`root`用于系统维护与管理，不会受到权限限制

用户一般使用各种的标准用户身份登陆系统，可通过`sudo + 命令`以超级用户身份执行命令

```bash
$ woami     # 查看当前登陆的用户名
```

## vim

```bash
$ vi [文件名]
```

<!-- ## 相关链接

- [能用到“退休”的 600条 Linux 命令，可以解决日常99%的问题](https://mp.weixin.qq.com/s/em3xwsKzFTucDAIfXvIc-Q) -->
