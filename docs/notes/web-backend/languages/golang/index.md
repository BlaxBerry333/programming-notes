---
prev: false
next: false
---

# Golang

![](/static/skill-images/web-backend--golang.png)

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
