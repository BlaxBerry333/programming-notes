---
prev: false
next: false
---

# tRPC

![](/static/skill-images/web-backend--trpc.png)

tRPC 是一个用于构建端到端的 API 框架 ( 使用了 TypeScript 保证类型安全 )

> [!IMPORTANT] tRPC 的特点:
>
> - 仅限于使用 Typescript 开发的全栈项目
> - 客户端请求不需要 RESTful 请求方式与请求路径，会直接调用服务端的处理函数
> - 同一个页面中的多个 tRPC 请求会合并为一个请求

```txt
┏━━━━━━━━ REST API Client ━━━━━━┓ ┏━━━━━━━━━━━━ REST API Serevr ━━━━━━━━━━━━━━┓
┃                               ┃ ┃                                           ┃
┃ axios.get("/api/user")      ━━━━▶  GET   ━━▶ /api/user   ━━▶ getUsers       ┃
┃ axios.get("/api/user/1")    ━━━━▶  GET   ━━▶ /api/user/1 ━━▶ getUserById    ┃
┃ axios.post("/api/user")     ━━━━▶  POST  ━━▶ /api/user   ━━▶ createUser     ┃
┃ axios.put("/api/user/1")    ━━━━▶  PUT   ━━▶ /api/user/1 ━━▶ updateUserById ┃
┃ axios.delete("/api/user/1") ━━━━▶ DELETE ━━▶ /api/user/1 ━━▶ deleteUserById ┃
┃                               ┃ ┃                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━ tRPC Client ━━━━━━━━━┓ ┏━━━━━━━━━━━━━ tRPC Serevr ━━━━━━━━━━━━━━━━━┓
┃                               ┃ ┃                                           ┃
┃ trpcClient.getUsers        ━━━━━━━━━━━━━▶   getUsers                        ┃
┃ trpcClient.getUserById     ━━━━━━━━━━━━━▶   getUserById                     ┃
┃ trpcClient.createUser      ━━━━━━━━━━━━━▶   createUser                      ┃
┃ trpcClient.updateUserById  ━━━━━━━━━━━━━▶   updateUserById                  ┃
┃ trpcClient.updateUserById  ━━━━━━━━━━━━━▶   updateUserById                  ┃
┃                               ┃ ┃                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## 下载安装

```zsh
% npm install @trpc/server @trpc/client zod
```

## 目录结构

本文以 Next.js 全栈项目为例

::: code-group

```txt[Next.js]
/
└── src
    ├── app
    │   └── api
    │       └── trpc
    │           └── [...trpc].ts
    │               └── route.ts
    └── utils
        └── trpc/
            └── ...
```

:::

## 服务端

tRPC 服务端主要用于定义路由器、过程、中间件等

---

### 初始化

```ts
import { initTRPC } from "@trpc/server";

// 基本初始化
const t = initTRPC.create();

// 携带上下文对象的初始化
const t = initTRPC.context<Context类型>().create();
```

---

### 路由器 ( Router )

tRPC 路由器是一个对象，用于组织过程 procedure

路由可以通过方法`router()`创建，然后需要返回路由的类型供客户端使用

```ts
const trpcServerRouter = t.router({
  过程1,
  过程2,
});

export type TRPCServerRouterType = typeof trpcServerRouter;
```

---

### 过程 ( Procedure )

tRPC 过程是一个函数，可以处理请求并返回响应

处理过程可以是查询 ( Query )、变更 ( Mutation )、订阅 ( Subscription ) 中的一种

过程建议通过`t.procedure()`抽离定义

过程的具体处理通过方法`query()`( 查询 )、`mutation()`( 变更 )、`subscription()`( 订阅 )

过程可以通过方法`input()`为处理添加请求参数的类型校验，建议使用 zod schema

```ts{0}
const 查询过程无参数 = t.procedure
  .query(async ({ ctx }) => {
    return 数据;
  });

const 查询过程有参数 = t.procedure
  .input(参数ZodSchema)
  .query(async ({ ctx, input }) => {
    return 数据;
  });

const 变更过程 = t.procedure
  .input(参数ZodSchema)
  .mutation(async ({ ctx, input }) => {
    return 数据;
  });

const 订阅过程 = t.procedure
  .input(参数ZodSchema)
  .subscription(async ({ ctx, input }) => {
    return 数据;
  });

const trpcServerRouter = t.router({
  查询过程无参数,
  查询过程有参数,
  变更过程,
  订阅过程,
});
```

多个过程可以通过方法`unstable_concat()`合并为一个新的过程，继承合并过程的所有中间件

```ts
const 新的过程 = 过程1.unstable_concat(过程2);
```

::: details 例子: tRPC过程的两种定义写法

::: code-group

```ts{0} [写法一 ( 直接定义 )]
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.context<Context类型>().create();

const trpcServerRouter = t.router({
  queryData: t.procedure
    .input(参数ZodSchema)
    .query(async ({ ctx, input }) => {
      return 数据;
    }),

  mutationData: t.procedure
    .input(参数ZodSchema)
    .mutation(async ({ ctx, input }) => {
      return 数据;
    }),
});
```

```ts [写法二 ( 外部抽离 )]
import type { NextRequest, NextResponse } from "next/server";
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.context<Context类型>().create();

const queryData = t.procedure
  .input(参数ZodSchema)
  .query(async ({ ctx, input }) => {
    return 数据;
  });

const mutationData = t.procedure
  .input(参数ZodSchema)
  .mutation(async ({ ctx, input }) => {
    return 数据;
  });

const trpcServerRouter = t.router({
  queryData,
  mutationData,
});
```

:::

---

### 上下文 ( Context )

tRPC 上下文是一个对象，用于在请求处理过程中传递数据

上下文可以通过方法`create()`创建

```ts
interface ContextData {
  //...
}

const t = initTRPC.context<ContextData>().create();
```

在 Next.js 中建议通过自定义方法抽离定义上下文，便于后续在 [API Handler](#2-api-handler) 中使用

```ts
import type { NextRequest, NextResponse } from "next/server";
import { initTRPC } from "@trpc/server";

export async function createTRPCContext(req: NextRequest, res: NextResponse) {
  return 数据;
}

const t = initTRPC.context<typeof createTRPCContext>().create();
```

上下文对象在过程、中间件中可以通过参数中的`ctx`访问

```ts
const 查询过程 = t.procedure
  .use(async ({ ctx, next }) => {
    // ...
    return next();
  })
  .query(async ({ ctx }) => {
    // ...
    return 数据;
  });
```

---

### 中间件 ( Middleware )

tRPC 中间件是一个函数，可以运行在请求处理过程之前 ( 前置中间件 ) 或之后 ( 后置中间件 )

中间件建议通过`t.middleware()`抽离定义

处理异常时建议手动抛出错误对象`new TRPCError()`供在客户端捕获

```ts
const 前置中间件 = t.middleware(async ({ ctx, next }) => {
  //...
  if (条件) {
    throw new TRPCError({ code: "...", message: "..." });
  }
  //...
  return next();
});

const 后置中间件 = t.middleware(async ({ ctx, next }) => {
  const result = await next();
  //...
  return result;
});
```

中间件可以在`next()`的参数`ctx`中对上下文对象的值进行扩展

```ts{0}
const 前置中间件 = t.middleware(async ({ ctx, next }) => {
  //...
  return next({
    ctx: {
      // ...扩展赋值
    }
  });
});
```

多个中间件以通过方法`unstable_pie()`合并为一个新的中间件

```ts
const 新的中间件 = 中间件1.unstable_pie(中间件2);
```

中间件需要通过方法`use()`添加到 procedure

procedure 可以添加多个中间件，执行顺序为添加顺序而非链式调用顺序

procedure 调用方法`use()`添加了中间件之后返回一个新的可继续链式调用的 procedure

```ts{0}
const newProcedure = t.procedure
    .use(中间件1)
    .use(中间件2);
```

::: details 例子: tRPC中间件的两种定义写法

::: code-group

```ts [写法一 ( 直接定义 )]
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.context<Context类型>().create();

const trpcServerRouter = t.router({
  queryData: t.procedure
    // 前置中间件
    .use(async ({ ctx, next }) => {
      // ...
      if (条件) {
        throw new TRPCError({ code: "...", message: "..." });
      }
      return next();
    })
    // 后置中间件
    .use(async ({ ctx, next }) => {
      const result = await next();
      // ...
      return result;
    })
    .input(参数ZodSchema)
    .query(async ({ ctx, input }) => {
      return 数据;
    }),
});
```

```ts [写法二 ( 外部抽离 )]
import type { NextRequest, NextResponse } from "next/server";
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.context<Context类型>().create();

const 前置中间件 = t.middleware(async ({ ctx, next }) => {
  //...
  if (条件) {
    throw new TRPCError({ code: "...", message: "..." });
  }
  return next();
});

const 后置中间件 = t.middleware(async ({ ctx, next }) => {
  const result = await next();
  //...
  return result;
});

const trpcServerRouter = t.router({
  queryData: t.procedure
    .use(前置中间件)
    .use(后置中间件)
    .input(参数ZodSchema)
    .query(async ({ ctx, input }) => {
      return 数据;
    }),
});
```

:::

## 客户端

前端通过 [tRPC 客户端对象](#客户端对象-trpcclient) 调用对应的 [tRPC 过程](#过程-procedure) 处理请求

这些过程的调用需要被转为 HTTP 请求发送给服务端

---

### API Handler

在 Next.js 中通过 API Handler 接收客户端页面的请求后分发给对应的 [tRPC 过程](#过程-procedure)

API Handler 中需使用方法`fetchRequestHandler()`指定 [tRPC 路由器](#路由器-router)、[tRPC 上下文生成器](#上下文-context)

::: code-group

```ts [/src/app/api/trpc/[...trpc]/route.ts]
import { NextRequest, NextResponse } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext, trpcServerRouter } from "@/utils/trpc";

const handler = (req: NextRequest, res: NextResponse) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: trpcServerRouter,
    createContext: () => createTRPCContext(req, res),
  });
};

export { handler as GET, handler as POST };
```

:::

---

### 客户端对象 ( trpcClient )

tRPC 客户端对象是一个对象，用于调用 tRPC 过程处理请求

创建时使用方法`createTRPCClient()`并结合在服务端定义的 [tRPC 路由器](#路由器-router) 的类型

```ts
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TRPCServerRouterType } from "@/utils/trpc";

export const trpcClient = createTRPCClient<TRPCServerRouterType>({
  links: [
    httpBatchLink({
      url: "http://localhost:[端口]/api/trpc",
    }),
  ],
});
```

---

### 客户端对象调用过程

页面组件内通过 [tRPC 客户端对象](#客户端对象-trpcclient) 直接调用对应的 [tRPC 过程](#过程-procedure) 处理请求

```ts
"use client";

import { useState, useEffect } from "react";
import { trpcClient } from "@/utils/trpc";

function 组件() {
  const [data, setData] = useState<数据类型>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const { data } = await trpcClient.查询过程名.query();
        const { data } = await trpcClient.查询过程名.query(参数);
        const { data } = await trpcClient.变更过程名.mutation(参数);
        setData(data);
        setIsLoading(false);
      }catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }
  return <>{JSON.stringify(data)}</>;
}
```

## TanstackQuery

在客户端中可以使用 TanstackQuery 进一步简化对 [tRPC 过程](#过程-procedure) 处理请求的调用

```zsh
% npm install @tanstack/react-query @trpc/tanstack-react-query
```

---

### tRPC 查询工具集合

基于上文在服务端定义的 [tRPC 路由器](#路由器-router) 的类型创建 tRPC 集成的工具函数集合

```ts
import { createTRPCContext as createTRPCContextByTanstackQuery } from "@trpc/tanstack-react-query";
import type { TRPCServerRouterType } from "@/utils/trpc";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContextByTanstackQuery<TRPCServerRouterType>();
```

---

### QueryProvider

基于上文创建的 [tRPC 客户端对象](#客户端对象-trpcclient) 与 [tRPC 查询工具集合](#trpc-查询工具集合) 创建包裹主应用的容器组件

```tsx
"use client";

import {
  QueryClient as TanstackQueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";

import { trpcClient, TRPCProvider } from "@/utils/trpc";

let browserQueryClient: TanstackQueryClient | undefined = undefined;

function makeQueryClient() {
  return new TanstackQueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

export default function QueryClientProvider({ children }: PropsWithChildren) {
  const [TanstackQueryClient] = useState<TanstackQueryClient>(() => {
    if (typeof window === "undefined") {
      return makeQueryClient();
    }
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  });
  return (
    <TanstackQueryClientProvider client={TanstackQueryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={TanstackQueryClient}>
        {children}
      </TRPCProvider>
    </TanstackQueryClientProvider>
  );
}
```

---

### 调用过程

在上文创建的 QueryProvider 组件内使用 TanStackQuery 的钩子函数`useQuery()`( 查询 )、`useMutation()`( 变更 ) 结合 tRPC 查询工具集合中的钩子函数`useTRPC()`来调用 [tRPC 过程](#过程-procedure)

```tsx
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { trpcClient, useTRPC } from "@/utils/trpc";

function 组件() {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.查询过程名.queryOptions());
  const { data, isLoading } = useQuery(trpc.查询过程名.queryOptions(参数));

  const { mutateAsync, isPending } = useMutation();
  const 更新操作 = useCallback(async () => {
    await mutateAsync(参数);
  }, [mutateAsync]);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation(
    trpc.查询过程名.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.查询过程名.queryKey() });
      },
    }),
  );

  if (isLoading) {
    return <>Loading...</>;
  }
  return <>{JSON.stringify(data)}</>;
}
```
