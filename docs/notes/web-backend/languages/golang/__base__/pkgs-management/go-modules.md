# Golang Go Modules

Golang 官方推荐使用 Go Modules 的形式来管理项目的依赖关系

## 目录结构

Golang 项目一般不使用`src`目录管理源代码

::: code-group

```[初始目录结构]
[项目目录]
├─ ...
│
├─ go.sum    // 项目中依赖包的详细内容
└─ go.mod    // 项目中依赖包
```

```[推荐目录结构]
[项目目录]
├─ cmd/
│  ├─ ...
│  └─ [项目名]/
│     └─ main.go    # 项目入口文件 ( main 包 )
│
├─ internal/        # 项目中不对外公开的主要逻辑
├─ pkg/             # 项目中可对外公开的逻辑代码
├─ configs/         # 项目配置
│
├─ api/             # 接口、JSON、Swagger之类
├─ third_party      # 第三方工具
├─ assets/          # 静态资源
├─ website/         # 网站模版、SPA之类
│
├─ test/            # 测试相关
│  ├─ testdata/     # 测试数据
│  └─ ...
│
├─ build/           # 云、容器、CI配置、项目打包之类
├─ deploy/          # 容器编排、项目部署之类
├─ scripts/         # 构建、安装、分析之类的Shell脚本
├─ Makefile         # 保持简洁 ( 执行逻辑尽量单独存于 scripts/ 目录 )
│
├─ go.mod
├─ go.sum
└─ ...
```

:::

---

### go.mod

在执行`go mod init`命令后会自动创建

```
// 当前模块名
module [模块所处仓库路径/模块名/版本]

// 当前模块使用的 sdk 版本
go [Golang 编译器版本]

// 当前模块中使用的主要依赖包 ( 直接依赖 )
require (
    [依赖包地址] [v版本]
    [依赖包地址] [v版本]
)

// 当前模块中使用的主要依赖包内部使用的依赖包 ( 间接依赖 )
require (
    [依赖包地址] [v版本] // indirect
    [依赖包地址] [v版本] // indirect
)

// 当前模块中排除的依赖包
exclude (
    [依赖包地址]
    [依赖包地址]
)

// 对当前模块中使用的依赖包的引用路径进行替换
replace (
    [依赖包原路径@v版本] => [依赖包新路径@v版本]
    [依赖包原路径@v版本] => [依赖包新路径@v版本]
)

// 当前项目作为其他项目的依赖包时，在当前模块的某个版本出错时可实现版本的撤回
retract (
    [当前项目的某个版本号]
)
```

::: details 例子：Gin 的默认`go.mod`文件

```
module github.com/gin-gonic/gin

go 1.21.0

require (
	github.com/bytedance/sonic v1.11.6
	github.com/gin-contrib/sse v0.1.0
	github.com/go-playground/validator/v10 v10.20.0
	// 省略...
)

require (
	github.com/bytedance/sonic/loader v0.1.1 // indirect
	github.com/cloudwego/base64x v0.1.4 // indirect
	github.com/cloudwego/iasm v0.2.0 // indirect
	// 省略...
)
```

:::

---

### go.sum

该文件用于确保项目引用的依赖与实际代码中所使用依赖的一致性，即版本的锁定

在执行`go mod tidy`或`go get`命令后会自动更新或创建

```
[依赖包地址] [版本] [Hash值]
[依赖包地址] [版本] [Hash值]
[依赖包地址] [版本] [Hash值]
```

## 常用命令

### go mod init

该命令用于初始化模块

在项目根目录下执行将该项目作为一个模块并生成一个`go.mod`文件

```zsh
% go mod init [模块所处仓库路径/模块名/版本]
```

::: details 例子：创建一个名为`xxxx`的模块

::: code-group

```zsh [命令]
% go mod init xxxx
```

```[go.mod 文件]
module xxxxx

go 1.20
```

:::

---

### go mod download

该命令用于将指定版本的第三方依赖下载到本地缓存，以加快依赖在项目中的安装速度

仅将目标第三方包缓存到本机，不会将其作为项目的依赖记录到`go.mod`文件

下载的依赖包存放于`GOPATH/pkg/mod`( `GOMODCACHE` )

```zsh
% go mod download [依赖包地址@v版本]
```

::: details 例子：将 Gin v1.10.0 与 v1.9.0 缓存到本地

::: code-group

```zsh [命令]
% go mod download github.com/gin-gonic/gin@v1.10.0
% go mod download github.com/gin-gonic/gin@v1.9.0
```

```[目录结构]
[GOPATH]
├─ bin
└─ pkg
    ├─ ...
    └─ mod                          # [!code hl:7]
        ├─ ...
        └─ github.com
           └─ gin-gonic
                └─ gin-gonic
                    ├─ gin@v1.10.0
                    └─ gin@v1.9.0
```

:::

---

### go mod tidy

该命令用于更新模块中使用的依赖包，自动添加缺少的并删除未使用的

可以确保项目中`go.mod`文件的记录内容与实际代码的依赖关系一致

执行后依赖若有变化会自动更新项目模块中的`go.mod`与`go.sum`文件

```zsh
% go mod tidy
```

---

### go mod verify

该命令用于检查模块中的依赖的完整性和安全性

会根据项目模块中的`go.sum`文件中的记录，检查每个依赖项的哈希值是否与预期的一致

```zsh
% go mod verify
```

---

### go mod edit

该命令用于手动修改模块中的`go.mod`文件

```zsh
# 添加依赖项
go mod edit -require="依赖包原路径@v版本"

# 删除依赖项
go mod edit -exclude="依赖包原路径@v版本"

# 替换依赖项
go mod edit -replace="依赖包原路径@v版本=依赖包新路径@latest"

# 添加当前模块在被引用时的撤回版本
go mod edit -retract="v版本"

# 删除当前模块在被引用时的撤回版本
go mod edit -dropretract="v版本"
```

---

### go mod vendor

该命令会根据模块中的`go.mod`文件创建 vendor 副本目录

不怎么常用，多用于实现对旧版本 Golang 项目的兼容

```zsh
go mod vendor
```

---

### go install

该命令用于将指定版本的第三方插件工具 ( 发布的二进制可执行脚本 ) 下载到本地

下载的可执行脚本文件存放于`GOPATH/pkg/bin`

::: details 例子：下载 protobuf 使用的 protoc-gen-go 与 vscode 使用的 gopls

::: code-group

```zsh [命令]
% go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
% go install golang.org/x/tools/gopls@latest
```

```[目录结构]
[GOPATH]
├─ pkg
└─ bin              # [!code hl:4]
    ├─ ...
    ├─ gopls
    └─ protoc-gen-go
```

:::

> [!IMPORTANT] 建议将所有的第三方包的`bin`目录全部添加到本机 PATH 环境变量，以方便在命令行中直接运行
>
> ::: code-group
>
> ```zsh [.zshrc]
> export PATH="$PATH:$(go env GOPATH)/bin"    # [!code ++]
> ```
>
> :::

---

### go get

该命令用于在模块目录中下载指定第三方依赖，并更新项目模块中的`go.mod`、`go.sum`文件

下载目标的直接依赖包及相关间接依赖都会缓存到本机`GOPATH/pkg/mod`( `GOMODCACHE` )

```zsh
# 目标依赖在本机没有缓存时为下载指定版本，若有本地缓存则直接引用缓存不再下载
% go get [依赖包地址]
% go get [依赖包地址@v版本]

# 安装目标依赖的最新版本，缓存到本地并更新 go.mod 文件
% go get -u [依赖包地址]
```

::: details 例子：下载 Gin 的最新版

::: code-group

```zsh [命令]
% go get -u github.com/gin-gonic/gin
```

```[目录结构]
[GOPATH]
├─ bin
└─ pkg
    ├─ ...
    └─ mod                          # [!code hl:10]
        ├─ ...
        ├─ github.com
        │   └─ ...
        ├─ gopkg.in
        │   └─ ...
        ├─ golang.org
        │   └─ ...
        └─ google.golang.org
            └─ ...
```

:::

---

### go clean

该命令用于清除临时目录中的文件

```zsh
# 清理本地缓存中的所有依赖，即清空 GOPATH/pkg/mod ( GOMODCACHE )
% go clean -modcache

# 清空所有本地缓存、编译生成的二进制文件
% go clean -cache
```
