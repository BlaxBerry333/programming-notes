---
prev: false
next: false
---

# Vim

![](/static/skill-images/dev-tools--vim.png)

Vim 是一个文本编辑器，没有图形界面只能通过命令操作

主要用于 Linux 服务器、远程 SSH 编辑文件

## 下载安装

::: code-group

```bash [CentOS]
$ sudo yum install -y vim
```

```zsh [Homebrew]
% brew install vim
```

:::

## 基本使用

创建文件：`vi [文件名]`

打开文件：`vi [文件名]`

进入编辑模式：`i`

保存并关闭：`esc` → `:wq` → `return`

不保存退出：`esc` → `:q!` → `return`

撤销：`u`
