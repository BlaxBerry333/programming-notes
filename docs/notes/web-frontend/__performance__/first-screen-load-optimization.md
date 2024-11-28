# 首屏加载优化

## 网络延迟

### CDN

> Content Delivery Network（ 内容分发网络 ）

分发静态资源将其分布在多个地理位置的服务器节点，用户的请求可以被重定向到离他们最近的 CDN 节点，从而减少响应时间和延迟

可以通过 [Cloudflare](https://www.cloudflare.com/ja-jp/)、[AWS CloudFront](https://aws.amazon.com/jp/cloudfront/)

---

### 资源的预加载

> Preload

预加载可以在页面加载过程中提前请求某些关键的资源，无论该资源是否在 DOM 中被使用

```html
<head>
  <link rel="preload" href="首页脚本.js" as="script" />
  <link rel="preload" href="首页样式.css" as="style" />
  <link rel="preload" href="首屏图片.jpg" as="image" />
</head>
```

---

### 资源的预连接

> Perconnect

预连接可以在页面加载时提前建立与某些外部资源的网络连接，减少未来实际请求时的延迟

```html
<head>
  <link rel="preconnect" href="资源路径" />
  <link rel="preconnect" href="资源路径" crossorigin />
</head>
```

## 资源过大

### 脚本的延迟加载

> Defer

延迟加载可以在 DOM 解析完成后再加载并执行某些脚本，可以避免阻塞 DOM 渲染

仅建议用于与首次渲染的展示内容无关直接关系的逻辑模块

```html
<script defer href="首页脚本.js"></script>
```

---

### 脚本的异步加载

> Async

异步加载可以的在 DOM 渲染的同时加载并立刻执行某些脚本

不保证脚本加载和执行的顺序，只能保证尽早加载并立刻执行

仅建议用于与首次渲染的展示内容无关系的独立逻辑模块 ( 比如分析、广告 )

```html
<script async href="首页脚本.js"></script>
```

---

### 代码分割

通过 [Webpack](https://webpack.js.org/)、[Rollup](https://rollupjs.org/) 等打包工具将代码分割为多个小文件 ( chunk )

第三方包建议单独打包为 chunk ( 即 vender 公共资源 ) 来减少主应用的体积

::: code-group

```js{0} [Rollup 分包]
// rollup.config.js
export default {
  input: "src/index.js",                // 入口文件
  output: {
    dir: "dist",                        // 输出目录
    format: "esm",                      // 使用 ESM 模块格式
    chunkFileNames: "[name]-[hash].js", // 生成的 chunk 文件名
  },

  manualChunks(id) {
    if (id.includes("node_modules")) {
      return "vendor";                  // 将所有 node_modules 的依赖提取成一个单独的 chunk
    }
  },
};
```

:::

---

### 懒加载

> Lazy Import

通过懒加载延迟加载非首屏必须的展示内容以及逻辑模块

::: details 模块的懒加载

> 如下：仅点击该按钮后才会加载所需的模块文件

```js
const button = document.querySelector("#my-load-button");

button.addEventListener("click", () => {
  import("模块文件.js").then((module) => {
    // module.成员;
    // ....
  });
});
```

:::

::: details 组件的懒加载

::: code-group

```jsx{0} [React 组件懒加载]
import { Suspense, lazy } from "react";

const LazyComponent1 = lazy(() => import("模块路径"));
const LazyComponent2 = lazy(() => import("模块路径").then(({ 组件名 }) => ({ default: 组件名 })));

export function App() {
  return (
    <>
      <Suspense fallback={null}>
        <LazyComponent1 />
        <LazyComponent2 />
      </Suspense>
    </>
  );
}
```

:::

## 缓存策略

### 强缓存

浏览器直接从缓存中读取资源，而不发送请求到服务器

主要用于针对不会经常变动的静态资源内容

| 字段          | 说明                                                       |
| ------------- | ---------------------------------------------------------- |
| Expire        | 指定资源过期的时间，浏览器会在该时间之前直接使用缓存的资源 |
| Cache-Control | 控制缓存的行为，指定资源的缓存时间和如何处理缓存           |

> 如下：资源可以在浏览器缓存中存储 1 年，资源不会发生变化，浏览器可以长期缓存

```http
Cache-Control: max-age=31536000, immutable
```

---

### 协商缓存

客户端会向服务器发送请求，服务器根据请求头的条件判断资源是否更新

如果资源没有改变服务器会返回`304`响应，客户端使用缓存资源

可用于针对打包后会变动的资源

| 字段              | 说明                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Last-Modified     | 当前资源的最后一次修改时间<br/>服务器可用此时间与客户端缓存中的 If-Modified-Since 时间进行比较                                       |
| If-Modified-Since | 客户端在请求时会将缓存的 Last-Modified 时间发送给服务器<br/>服务器可根据此时间与当前资源的 Last-Modified 判断是否需要重新发送资源    |
| Etag              | 当前资源的唯一标识符 ( 通常是哈希值 )<br/>服务器可根据此值与客户端提供的 If-None-Match 进行比较                                      |
| If-None-Match     | 客户端请求时会将缓存中的 ETag 通过 If-None-Match 字段发送给服务器<br/>服务器可通过与客户端提供的此值与 Etag 判断是否需要重新发送资源 |

> 如下：服务器可根据 Last-Modified 与 If-Modified-Since 进行比较判断，如果资源已修改则服务器返回新的资源并更新，否则响应 304 给客户端让其使用本地缓存

```http
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT
If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT
```

> 如下：服务器可根据 If-None-Match 和 ETag 进行比较判断，如果资源已修改则服务器返回新的资源并更新，否则响应 304 给客户端让其使用本地缓存

```http
ETag: "abc123"
If-None-Match: "abc123"
```

---

### 策略缓存

主要通过浏览器的 Servers Worker 在后台线程中拦截网络请求并缓存资源

可用于针对弱网环境与离线环境

> 如下：

```js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll(["/index.html", "/index.css", "/index.js"]);
    }),
  );
});
```

## SSR

> Server Side Rendering ( 服务端渲染 )

在服务端进行页面内容与交互逻辑的渲染，然后将渲染结果发送给客户端供其展示

> [!IMPORTANT] 优势
>
> - 页面渲染速度快
> - SEO 友好

> [!CAUTION] 缺点：
>
> - 交互逻辑复杂且频繁更新应用时容易增加服务器的负载
> - 页面切换时会出现加载耗时

## SSG

> Static Site Generation ( 静态站点生成 )

先将动态生成的页面内容编译为静态资源后部署到服务器

> [!IMPORTANT] 优势：
>
> - 页面渲染速度快
> - SEO 友好
> - 安全风险低 ( 服务器只响应静态文件而不涉及数据的请求 )

> [!CAUTION] 缺点：
>
> - 不适合内容会频繁更新的应用 ( 只能重新编译生成新的静态文件后重新部署 )

## PWA

<!-- ## 衡量指标

### FP

> First Paint 首次绘制

---

### FCP

> First Contentful Paint

---

### FMP

> First Meaningful Paint

> 不同公司团队要求可能不同

---

### LCP

> Largest Contentful Paint

> 不同公司团队要求可能不同

---

- <small>https://www.bilibili.com/video/BV1gy1aYAE2t?spm_id_from=333.788.videopod.episodes&vd_source=8960252a3845b76b699282b11f36ab5c&p=2</small> -->
