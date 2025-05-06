---
prev: false
next: false
---

# Protobuf

![](/static/skill-images/web-infrastructure--protobuf.png)

> Protocol Buffers

Protobuf 是一种主要用于数据序列化和传输的数据交换格式，文件后缀名是`.proto`

其描述的数据结构可在不同语言、数据流中使用

## 下载安装

::: code-group

```zsh [Homebrew]
% brew install protobuf
```

:::

> 如下：本文使用的编译器版本为 protoc v25.2

```zsh
% protoc --version      # [!code focus]
libprotoc 25.2
```

## 语言对应的库

在安装 Protobuf 编译器 ( 编译 .proto 文 ) 之后可按需下载编程语言对应的的运行时包

::: code-group

```zsh [Golang]
# 0. 宿主机下载 Protobuf 编译器
% brew install protobuf

# 1. 下载 Golang 对应的 pkg
% go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

# 2. 一劳永逸将所有的 Golang 的第三方工具添加到环境变量
% export PATH="$PATH:$(go env GOPATH)/bin" >> ~/.zshrc
% source ~/.zshrc

# 3. 检查 Golang 对应的 pkg 的位置与版本
% which protoc-gen-go
% protoc-gen-go --version

# 4. 将指定位置的 .proto 编译为 .go
% protoc -I=$(proto文件所在目录) \
         --go_out=$(编译后Golang文件所在目录) $(proto文件所在目录)/*.proto
```

```zsh [TypeScript]
# 0. 宿主机下载 Protobuf 编译器
% brew install protobuf

# 1. 下载 TypeScript 对应的 pkg
% npm install ts-proto
% npm install --save-dev @types/google-protobuf google-protobuf

# 2. 将指定位置的 .proto 编译为 .ts
% protoc -I=$(proto文件所在目录) \
	--plugin=node_modules/ts-proto/protoc-gen-ts_proto \
	--ts_proto_opt=onlyTypes=true \
	--ts_proto_out=$(编译后TS文件所在目录) $(proto文件所在目录)/*.proto
```

:::

## 基本使用

### 消息类型 ( message )

> 如下：

```proto
syntax="proto3";

message MessageName {
  string field_name_a = 1;
  int32 field_name_b = 2;
  optional int32 field_name_c = 3;
  // ...
}
```

---

### 枚举类型 ( enum )

> 如下：

```proto
syntax="proto3";

enum Kind {
  KIND_UNSPECIFIED = 0;
  KIND_CONCERT_HALL = 1;
  KIND_STADIUM = 2;
  KIND_BAR = 3;
  KIND_OPEN_AIR_FESTIVAL = 4;
}
```
