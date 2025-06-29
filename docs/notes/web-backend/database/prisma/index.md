---
prev: false
next: false
---

# Prisma

![](/static/skill-images/database--prisma.png)

Prisma 是一个数据库 ORM 工具，可在 Node.js 环境中通过 TypeScript 实现对数据库的管理

## 下载安装

```zsh
# 0. 下载 Prisma 依赖
% npm install -D prisma
% npm install @prisma/client

# 1. 初始化 Prisma
% npx prisma init
```

## 模型 ( Schema )

Prisma Schema 用于定义数据结构

执行`npx prisma init`之后会初始化自动生成定义模型的配置文件`schema.prisma`

该文件默认创建到`项目根路径/prisma/schema.prisma`

---

### 基础语法

```prisma
// 配置数据库连接
datasource db {
  provider = "数据库类型"
  url      = "数据库连接字符串"
}

// 配置 Prisma Client
generator client {
  provider = "客户端的生成器类型"
  output   = "客户端的输出路径"
}

// 自定义数据库中的表结构
model 自定义模型 {
  字段 类型 @属性
  字段 类型 @属性 @属性
  字段 类型 @属性 @map("该字段在数据库中的自定义名称")

  @@map("在数据库中的自定义表名称")
}

// 自定义数据库中的枚举
enum 自定义枚举 {
  枚举1
  枚举2
}
```

::: details 例子：

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String?
  email     String   @unique
  password  String   @default(crypt(generatePassword(), '$2a$10$'))
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  stories   Story[] // User 模型关联到 Story 模型 ( 一对多 )
}

model Story {
  id        String   @id @default(uuid())
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])  // 当前 Story 模型通过自身 authorId 关联到 User 模型的 id
}
```

:::

---

### 数据迁移与映射

```zsh
# 在开发环境中根据 schema 模型生成迁移文件，并自动更新 Client 与数据库
% npx prisma migrate dev
% npx prisma migrate dev --name [自定义迁移文件名称]

# 在生产环境中执行已经存在的迁移文件
% npx prisma migrate deploy

# 仅将 schema 模型映射到数据库，但是不生成迁移文件也不更新 Client
% npx prisma db push

# 基于当前数据库结构反向生成 schema 模型
% npx prisma db pull

# 重置数据库 ( 会删除所有数据 ) 不建议用在开发环境以外
% npx prisma migrate reset
```

> [!IMPORTANT] <code>db push</code>vs<code>migrate dev</code>
>
> - `npx prisma migrate dev`: 基于变更后的 schema 创建迁移文件后映射到数据库
> - `npx prisma db push`: 不创建迁移文件而是直接将 schema 映射到数据库<br/>慎用，且不应用于生产环境

## 客户端 ( Prisma Client )

Prisma Client 用于处理数据库交互 ( CRUD )

执行`npx prisma generate`之后会基于 schema 生成客户端 ( 包含数据库访问 API、TS 类型 )

可在`schema.prisma`中配置客户端的输出路径 ( 不建议将该目录提交到生成环境 )

schema 模型变更时必须执行`npx prisma generate`更新客户端使其与数据库保持一致

```zsh
# 根据 schema 模型更新 Client
% npx prisma generate
```

---

### 单例模式

使用客户端时应创建一个单例模式的实例对象

```ts
import { PrismaClient } from "客户端的输出路径";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismaClient;
}

export default prismaClient;
```

---

### TS 类型

```ts
import {
  PrismaClient,
  自定义枚举类型,
  type 自定义模型类型,
} from "客户端的输出路径";
```

---

### CRUD 操作

Prisma 对数据库的 CRUD 操作全部通过上文创建的单例模式的客户端实例对象实现

```ts
import prismaClient from "单例模式的实例对象"

async function getList() {
  const result = await prismaClient.note.findMany({
    where: { [字段]: 值 },
    select: { [字段]: 布尔值 },
    orderBy: { [字段]: "desc" },
    skip: 整数, // 从第几个数据开始查询
    take: 整数, // 查询多少个数据
  });
  return result
}

async function getOne() {
  const result = await prismaClient.[模型].findUnique({
    where: { [字段]: 值 },
  });
  if (!result) throw new Error("Not Found")
  return result
}

async function create() {
  const result = await prismaClient.[模型].create({
    data: { [字段]: 值 },
  })
  return result
}

async function update() {
  const result = await prismaClient.[模型].update({
    where: { [字段]: 值 },
    data: { [字段]: 值 },
  })
  return result
}

async function delete() {
  const result = await prismaClient.[模型].delete({
    where: { [字段]: 值 },
  })
  return result
}
```

## 图形用户界面 ( Prisma Studio )

Prisma Studio 可在浏览器中直接查看和管理数据库

```zsh
% npx prisma studio \
    --hostname 0.0.0.0 \
    --port [端口号] \
    --browser none
```

## 相关链接

- [Prisma 官网](https://www.prisma.io/)
- [Prisma 教程](https://www.bilibili.com/video/BV1da4y1g7ee?spm_id_from=333.788.player.player_end_recommend_autoplay&vd_source=8960252a3845b76b699282b11f36ab5c)
- [Prisma + Supabase](https://zenn.dev/kiriyama/articles/89bac9034bbe7a#3%3Aprisma%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%A8%E8%A8%AD%E5%AE%9A)
