# Golang 第三方包管理

建议将所有的第三方包的`bin`目录全部添加到本机 PATH 环境变量，以方便在命令行中直接运行

::: code-group

```zsh [.zshrc]
export PATH="$PATH:$(go env GOPATH)/bin"    # [!code ++]
```

:::
