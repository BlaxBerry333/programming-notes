---
prev: false
next: false
---

# Golang

![](/static/skill-images/web-backend--golang.png)

## 下载安装

::: code-group

```zsh [asdf]
# 1. 下载 asdf 插件与的版本                                 # [!code focus:10]
% asdf plugin add golang
% asdf install golang [版本]

# 2. 设置全局环境下的版本
% asdf global golang [版本]
% asdf reshim golang

# 3. 检查安装的版本
% go version
go version go1.22.5 darwin/arm64

# 4. 一劳永逸将所有的 Golang 的第三方工具添加到环境变量         # [!code focus:3]
% export PATH="$PATH:$(go env GOPATH)/bin" >> ~/.zshrc
% source ~/.zshrc
```

:::
