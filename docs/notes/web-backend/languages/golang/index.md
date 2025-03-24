---
prev: false
next: false
---

# Golang

![](/static/skill-images/web-backend--golang.png)

Golang ( Go ) 是一种编译型语言，文件后缀名是`.go`

## 下载安装

::: code-group

```zsh [asdf]
# 1. 下载 asdf 插件与 golang 的版本
% asdf plugin add golang
% asdf install golang [版本]

# 2. 设置全局环境下的版本
% asdf global golang [版本]
% asdf reshim golang

# 3. 一劳永逸将所有的 Golang 的第三方工具添加到环境变量
% export PATH="$PATH:$(go env GOPATH)/bin" >> ~/.zshrc
% source ~/.zshrc
```

:::

> 如下：本文使用 Golang v1.22.5

```zsh
% go version         # [!code focus]
go version go1.22.5 darwin/arm64
```

## 环境变量

```zsh
# 查看所有环境变量
% go env

# 查看指定环境变量
% go env [环境变量名]
```

> 如下：asdf 安装的 Golang 的几个常用环境变量

```zsh
# Golang 编译器位置                                             # [!code focus:2]
% go env GOPATH
/Users/[用户名]/.asdf/installs/golang/1.20/packages

# Golang 的 Go Modules 依赖包的本地缓存位置                       # [!code focus:2]
% go env GOMODCACHE
/Users/[用户名]/.asdf/installs/golang/1.20/packages/pkg/mod

# Golang 的源码位置                                             # [!code focus:2]
% go env GOROOT
/Users/[用户名]/.asdf/installs/golang/1.22.5/go

# Golang 的版本                                                # [!code focus:2]
% go env GOVERSION
go1.22.5
```

## 编译与执行

Golang 代码需要先编译为二进制文件后才能执行

::: code-group

```zsh [方法一]
% cd [项目目录]

# 编译当前目录下的默认入口文件 `main.go`
% go build .
# 编译指定目录下的入口文件
% go build [路径/项目入口文件].go
# 自定义编译后生成的二进制文件
% go build -o [生成的二进制文件名] [源文件]

# 执行
% [生成的二进制文件名]
```

```zsh [方法二]
% cd [项目目录]

# 编译并执行当前目录下的默认入口文件 `main.go`
% go run .
# 编译并执行指定目录下的入口文件
% go run [路径/项目入口文件].go
```

:::
