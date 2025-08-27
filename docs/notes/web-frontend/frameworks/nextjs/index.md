---
prev: false
next: false
---

# Next.js

![](/static/skill-images/web-frontend--nextjs.png)

Next.js 是一个基于 React.js 的全栈应用框架

通过其约定的目录结构以及内置工具可以快速地构建一个服务端渲染 ( SSR ) 的应用

## 项目初始化

::: code-group

```zsh [新目录]
% npx create-next-app                          # [!code focus]
? What is your project named? ›                                       [项目名]
? Would you like to use TypeScript? ›                                 Yes
? Would you like to use ESLint? ›                                     Yes
? Would you like to use Tailwind CSS? ›                               Yes
? Would you like your code inside a `src/` directory? ›               Yes
? Would you like to use App Router? (recommended) ›                   Yes
? Would you like to use Turbopack for `next dev`? ›                   Yes
? Would you like to customize the import alias (`@/*` by default)? ›  No

% npx next --version                           # [!code focus:2]
Next.js v15.3.5

% cd [项目名]                                   # [!code focus:2]
% yarn run dev
> next dev --turbopack
   ▲ Next.js 15.1.6 (Turbopack)
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.3:3000

 ✓ Starting...
 ✓ Ready in 663ms
```

```zsh [现有目录]
% cd [项目名]                                   # [!code focus:2]
% npx create-next-app
? What is your project named? ›                                       .
? Would you like to use TypeScript? ›                                 Yes
? Would you like to use ESLint? ›                                     Yes
? Would you like to use Tailwind CSS? ›                               Yes
? Would you like your code inside a `src/` directory? ›               Yes
? Would you like to use App Router? (recommended) ›                   Yes
? Would you like to use Turbopack for `next dev`? ›                   Yes
? Would you like to customize the import alias (`@/*` by default)? ›  No

% npx next --version                           # [!code focus:2]
Next.js v15.3.5

% yarn run dev                                 # [!code focus]
> next dev --turbopack
   ▲ Next.js 15.1.6 (Turbopack)
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.3:3000

 ✓ Starting...
 ✓ Ready in 663ms
```

:::

## 项目目录结构

::: code-group

```[目录结构]
[项目目录]
├─.next/
│   ├─ build/
│   ├─ cache/
│   ├─ server/
│   ├─ static/
│   └─ ...
│
├─ public/
│
├─ src/
│   ├─ app/
│   │   └─ ...
│   │
│   ├─ styles/
│   │   ├─ global.css
│   │   └─ ...
│   └─ ...
│
├─ next-env.d.ts
├─ next.config.ts
├─ package.json
├─ tsconfig.json
└─ ...
```

:::

## 文件系统约定

> File-system conventions

Next.js 中约定大于配置，项目的目录结构与路由、布局、接口等一一对应

::: code-group

```[目录结构]
[项目目录]
└─ src/
    ├─ app/
    │   ├─ api/
    │   │   └─ ...
    │   │
    │   ├─ layout.tsx
    │   ├─ template.tsx
    │   ├─ not-found.tsx
    │   ├─ ...
    │   │
    │   └─ 路由/
    │       ├─ layout.tsx
    │       ├─ template.tsx
    │       ├─ page.tsx
    │       ├─ not-found.tsx
    │       └─ ...
    │
    └─ ...
```

:::

---

### 布局

> layout.tsx

布局是多个页面之间的共享 UI

布局的状态是持久化的，路由切换时不会重新渲染

布局文件建议使用服务端渲染 ( SSR )

|                                | 说明                                                                                      |
| :----------------------------: | ----------------------------------------------------------------------------------------- |
|   根布局<br/>( root layout )   | - 作用于整个应用的页面<br/>- 必须包含`<html>`、`<body>`作为服务器初次返回的 HTML 页面结构 |
| 嵌套布局<br/>( nested layout ) | - 作用于某个特定路由及其子路由的页面<br/>- 嵌套布局包含在根布局中                         |

```
┏━━ RootLayout ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                     ┃
┃     ┏━━ NestedLayout ━━━━━━━━━━━━━━━━━━━━━━━━━┓     ┃
┃     ┃                                         ┃     ┃
┃     ┃     RoutePage, 404Page, ErrorPage       ┃     ┃
┃     ┃                                         ┃     ┃
┃     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛     ┃
┃     ┏━━ NestedLayout ━━━━━━━━━━━━━━━━━━━━━━━━━┓     ┃
┃     ┃                                         ┃     ┃
┃     ┃     RoutePage, 404Page, ErrorPage       ┃     ┃
┃     ┃                                         ┃     ┃
┃     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

::: code-group

```[目录结构]
[项目目录]
└─ src/
    └─ app/
        ├─ layout.tsx               # 根布局            # [!code hl]
        ├─ page.tsx
        ├─ ...
        └─ [路由A]/
             ├─ layout.tsx          # 路由A 的嵌套布局   # [!code hl]
             ├─ page.tsx
             ├─ ...
             └─ [路由A-1]/
                 ├─ layout.tsx      # 路由A-1 的嵌套布局 # [!code hl]
                 └─ page.tsx
```

```tsx [app/layout.tsx]
import type { PropsWithChildren } from "react";
import "@/styles/globals.css";

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

```tsx [app/路由/layout.tsx]
import type { PropsWithChildren } from "react";

export default function NestedLayout({ children }: PropsWithChildren<{}>) {
  return <>{children}</>;
}
```

:::

---

### 模板

> template.tsx

模版作用于布局于其子节点的中间位置 ( 可视为布局的补充功能，使用率较低不需要深究 )

模版的状态是非持久化的，路由切换时会重新渲染 ( 重新创建实例保证隔离 )

布局文件建议使用服务端渲染 ( SSR )

```
┏━━ RootLayout ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                         ┃
┃     ┏━━ RootTemplate ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓     ┃
┃     ┃                                             ┃     ┃
┃     ┃     ┏━━ NestedLayout ━━━━━━━━━━━━━━━━━┓     ┃     ┃
┃     ┃     ┃                                 ┃     ┃     ┃
┃     ┃     ┃     ┏━━ NestedTemplate ━━━┓     ┃     ┃     ┃
┃     ┃     ┃     ┃                     ┃     ┃     ┃     ┃
┃     ┃     ┃     ┃     RoutePage       ┃     ┃     ┃     ┃
┃     ┃     ┃     ┃     404Page         ┃     ┃     ┃     ┃
┃     ┃     ┃     ┃     ErrorPage       ┃     ┃     ┃     ┃
┃     ┃     ┃     ┃                     ┃     ┃     ┃     ┃
┃     ┃     ┃     ┗━━━━━━━━━━━━━━━━━━━━━┛     ┃     ┃     ┃
┃     ┃     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛     ┃     ┃
┃     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

::: code-group

```[目录结构]
[项目目录]
└─ src/
    └─ app/
        ├─ layout.tsx
        ├─ template.tsx             # 根布局的模版       # [!code hl]
        ├─ page.tsx
        ├─ ...
        └─ [路由A]/
             ├─ layout.tsx
             ├─ template.tsx        # 路由A 的模版      # [!code hl]
             ├─ page.tsx
             ├─ ...
             └─ [路由A-1]/
                 ├─ layout.tsx
                 ├─ template.tsx    # 路由A-1 的模版    # [!code hl]
                 └─ page.tsx
```

```tsx [template.tsx]
import type { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren<{}>) {
  return <>{children}</>;
}
```

:::

::: details 例子：验证布局的持久化与模版的非持久化

> 通过导入一个计数器组件并变更数值，然后切换路由
>
> - 路由中的计数器值会保持
> - 模版中的计数器值会重制

::: code-group

```tsx [layout.tsx]
import type { PropsWithChildren } from "react";
import CountSample from "路径";

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html>
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/a">A</Link>
          <Link href="/b">B</Link>
        </nav>

        <CountSample />
        {children}
      </body>
    </html>
  );
}
```

```tsx [template.tsx]
import type { PropsWithChildren } from "react";
import CountSample from "路径";

export default function Template({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <CountSample />
      {children}
    </>
  );
}
```

```tsx [common-component.tsx]
"use client";

import React from "react";

export default function CountSample() {
  const [count, setCount] = React.useState<number>(0);
  return <button onClick={() => setCount((s) => s + 1)}>Count: {count}</button>;
}
```

:::

---

### 路由页面

> page.tsx

页面文件所处的目录层级与路由层级一致

在目录结构中还可通过`(路由组)`目录划分对一组相关的路由 ( 不会被映射为路由结构的一部分 )

::: code-group

```[目录结构]
[项目目录]
└─ src/
    └─ app/
        ├─ layout.tsx
        ├─ page.tsx                   # /                        # [!code hl]
        ├─ ...
        │
        ├─ a/
        │    ├─ layout.tsx
        │    ├─ page.tsx              # /a                       # [!code hl]
        │    ├─ ...
        │    ├─ a-1/
        │    │   ├─ ...
        │    │   ├─ layout.tsx
        │    │   └─ page.tsx          # /a/a-1                   # [!code hl]
        │    │
        │    ├─ [动态路由参数]/
        │    │    ├─ layout.tsx
        │    │    ├─ page.tsx         # /a/动态路由参数            # [!code hl]
        │    │    └─ ...
        │    │
        │    └─ [...动态路由参数组]/
        │         ├─ layout.tsx
        │         ├─ page.tsx         # /a/foo/bar/...           # [!code hl]
        │         └─ ...
        │
        └─ (路由组)/
             ├─ b/
             │    ├─ ...
             │    ├─ layout.tsx
             │    └─ page.tsx         # /b                       # [!code hl]
             │
             └─ (路由组)/
                  ├─ c/
                  │    ├─ ...
                  │    ├─ layout.tsx
                  │    └─ page.tsx    # /c                       # [!code hl]
                  └─ d/
                       ├─ ...
                       ├─ layout.tsx
                       └─ page.tsx    # /d                       # [!code hl]
```

```tsx [page.tsx]
export default function Page() {
  return <>{children}</>;
}
```

```tsx [[动态路由参数]/page.tsx]
import React from "react";

type Props = {
  params: Promise<{ 动态路由参数: string }>;
};
export default function SlugPage({ params }: Props) {
  const { 动态路由参数 } = React.use(params);
  return <>Slug: {动态路由参数}</>;
}
```

```tsx [[...动态路由参数组]/page.tsx]
type Props = {
  params: Promise<{ 动态路由参数组: string[] }>;
};
export default function CatchAllSlugsPage({ params }: Props) {
  const { 动态路由参数组 } = React.use(params);
  return <>Slugs: {p动态路由参数组.join("/")}</>;
}
```

:::

---

### 404 页面

> not-found.tsx

当访问的路由不存在时，会自动跳转至全局 404 页面

在指定的路由中可通过手动调用`notFound()`来跳转至当前路由层级目录下的 404 页面

::: code-group

```[目录结构]
[项目目录]
└─ src/
    └─ app/
        ├─ ...
        ├─ not-found.tsx        # 全局 404 页面                 # [!code hl]
        │
        └─ 路由/
            ├─ ...
            ├─ page.tsx
            └─ not-found.tsx    # 当前路由层级的 404 页面 ( 需手动跳转 )  # [!code hl]
```

```tsx [not-found.tsx]
import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFoundPage() {
  const headersList = await headers();
  const domain = headersList.get("host");

  return (
    <>
      <h1>404 - Not Found</h1>
      <p>Could not find requested resource: {domain}</p>

      <Link href="/" replace>
        Go Back Home
      </Link>
    </>
  );
}
```

```tsx [app/路由/page.tsx]
"use client";

import { notFound } from "next/navigation";

export default function RoutePage() {
  if (条件) {
    notFound(); // 跳转至 /404 页面并渲染 /app/路由/not-found.tsx
  }
  return <>...</>;
}
```

:::

---

### 错误页面

> error.tsx

当发生错误时，会自动跳转至父级错误页面 ( 当前路由层级 > 全局 )

::: code-group

```[目录结构]
[项目目录]
└─ src/
    └─ app/
        ├─ ...
        ├─ error.tsx        # 全局的错误页面         # [!code hl]
        │
        └─ 路由/
            ├─ ...
            ├─ page.tsx
            └─ error.tsx    # 当前路由层级的错误页面  # [!code hl]
```

```tsx [error.tsx]
"use client";

type Props = {
  error: Error & { digest?: string };
  reset: VoidFunction;
};

export default function Error({ error, reset }: Props) {
  return (
    <>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>

      <button onClick={() => reset()}>Try again</button>
    </>
  );
}
```

:::

---

### 路由处理

> app/api/product/route.ts

```ts
// GET    /api/route/product
export async function GET(req: Request) {}

// POST   /api/route/product
export async function POST(req: Request) {}
```

> app/api/[id]/route.ts

```ts
// GET    /api/route/:id
export async function GET(req: Request) {}

// POST   /api/route/:id
export async function POST(req: Request) {}
```

## 路由导航

### 声明式导航

可通过 Next.js 的内置组件`<Link/>`与内置函数`usePathname`来实现

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Sample", href: "/sample" },
] as const;

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={{ color: pathname === link.href ? "red" : "inherit" }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
```

---

### 编程式导航

```tsx
"use client";

import { useRouter } from "next/router";

export default function MyPage() {
  const router = useRouter();

  const navigateToHome = () => router.push("/");

  return <button onClick={navigateToHome}>Home Page</button>;
}
```

> api

## 元数据

> Metadata

元数据是用于描述页面的信息，包括标题、描述、图标等

必须定义并导出自一个服务端渲染布局文件`layout.tsx`或页面文件`page.tsx`

[元数据的字段](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields)

---

### 静态元数据

以一个对象的形式

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App",
  description: "...",
  // ...
};
```

---

### 动态元数据

以一个异步函数的形式，函数名必须为`generateMetadata`

```tsx
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // 父级 layout 或 page 中的元数据
  const parentMetadata = await parent;

  // 路由参数
  const { id } = await params;
  const { 查询参数 } = await searchParams;

  // API 返回值
  const apiResult = await fetch(`https://api.example.com/${id}`).then((res) =>
    res.json(),
  );

  return {
    title: `App | ${id} ｜ ${parentMetadata.title}`,
    description: apiResult.description,
    ...parentMetadata.openGraph,
    // ...
  };
}
```

## 静态资源

### 图片

可通过 Next.js 的内置组件`<Image/>`来渲染

```tsx
import Image from "next/image";

import 图片模块 from "@/路径/图片.后缀";

export default function Page() {
  return (
    <>
      {/* 本地 /src 目录下的图片 */}
      <Image src={图片模块} alt="..." />

      {/* 本地 /public 目录下的图片 */}
      <Image src="/路径/图片.后缀" alt="..." />

      {/* 远程图片 */}
      <Image "https://域名/路径/资源" alt="..." width={...} height={...}  />
    </>
  );
}
```

在渲染远程图片时，处于安全性考量还需要在项目配置文件`next.config.js`中配置

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 写法一
      {
        protocol: "https",
        hostname: "域名",
        pathname: "/路径/**",
        port: "",
        search: "",
      },

      // 写法二
      new URL("https://域名/路径/资源"),
      new URL("https://域名/路径/资源?查询参数=值"),
    ],
  },
};

export default nextConfig;
```

---

### 网站图标

> favicon

- 可通过 Next.js 的文件系统约定将图片直接定义于`app/`目录
- 可通过元数据 Metadata 中的`icons`字段设置 ( 优先度低于文件系统约定 )

::: code-group

```[方法一]
[项目目录]
└─ src/
    └─ app/
        ├─ ...
        └─ 网站图标.后缀
```

```tsx [方法二]
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "...",
  icons: {
    icon: "/logo.png", // 渲染 public 目录下的图片
  },
};
```

:::

---

### 字体

::: code-group

```[目录结构]
[项目目录]
└─ src/
    ├─ app/
    │   ├─ ...
    │   └─ layout.tsx
    │
    └─ styles/
        ├─ ...
        ├─ global.css
        └─ fonts.ts

```

```tsx [app/layout.tsx]
import type { PropsWithChildren } from "react";

import fonts from "@/styles/fonts";
import "@/styles/globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${fonts.roboto.variable} ${fonts.geistSans.className}`}>
        {children}
      </body>
    </html>
  );
}
```

```ts [styles/fonts.ts]
import { Roboto, Geist } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto", // CSS 变量名称
  display: "swap", // 推荐添加 ( Google Fonts 加载优化，减少 CLS 与 FOIT 问题 )
  subsets: ["latin"],
});

const geistSans = Geist({
  subsets: ["latin"],
});

export default {
  roboto,
  geistSans,
};
```

:::

## 渲染模式

### 服务端组件

> Server Components

Next.js 中的组件默认都是服务端渲染

服务端组件运行在服务器 Node.js 环境，无法使用浏览器 API 以及 React Hooks，但是其子组件为客户端组件时该子组件内可以使用

> [!IMPORTANT] 异步数据的获取
>
> 服务端组件可定义为同步函数或异步函数<br/>
> 将函数定义为`async`异步函数后在函数体内直接使用`await`
>
> > 如下：在页面中获取动态路由参数
>
> ```tsx
> type Props = {
>   params: Promise<{ 动态路由参数: string }>;
> };
>
> export default async function Page({ params }: Props) {
>   const { 动态路由参数 } = await params;
>   return <>动态路由参数: {动态路由参数}</>;
> }
> ```

---

### 客户端组件

> Client Components

Next.js 中的组件文件顶层可通过`"use client"`来指定当前文件为客户端渲染

客户端组件可以直接使用浏览器 API 以及 React Hooks

> [!IMPORTANT] 异步数据的获取
>
> 客户端组件必须是同步函数
>
> - 使用`React.use()` ( React v19+ )
> - 使用`React.useEffect()`+ `async/await` + State 状态管理
>
> > 如下：在页面中获取动态路由参数
>
> ```tsx
> "use client";
>
> import React from "react";
>
> type Props = {
>   params: Promise<{ 动态路由参数: string }>;
> };
>
> export default function Page({ params }: Props) {
>   const { 动态路由参数 } = React.use(params);
>   return <>动态路由参数: {动态路由参数}</>;
> }
> ```

---

### 水合错误

> Hydration Mismatch

水合错误是指：服务端渲染的 HTML 与客户端实际渲染结果不一致

> [!CAUTION] Next.js 中常见的水合错误
>
> - 在服务端渲染的组件中使用前端组件库 ( MUI、AntD 等 )
> - 在服务器渲染时使用了浏览器 API ( window、localStorage、matchMedia 等 )
> - 在服务端渲染的组件中了 React Hooks

> [!IMPORTANT] 预渲染与水合
>
> - 预渲染：在服务端先生成 HTML 页面并返回给浏览器
> - 水合：浏览器接收到 HTML 后，React 在客户端“激活”页面，绑定事件并恢复状态

::: details 解决方案一：指明仅客户端渲染 ( Only Client )

利用 React Hook 的`useEffect`手动对组件库进行延迟渲染

```tsx
"use client";

import React from "react";

export default function NoSSR({ children }: React.PropsWitchChildren) {
  const [isClient, setIsClient] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
}
```

:::

::: details 解决方案二：`dynamic`动态导入

```tsx
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("路径"), { ssr: false });
```

:::

::: details 解决方案三：避免访问浏览器 API 对象

避免访问任何浏览器特有对象 ( window、localStorage、matchMedia、document 等 )

```ts
if (typeof window !== "undefined") {
  // ...
}
```

:::
