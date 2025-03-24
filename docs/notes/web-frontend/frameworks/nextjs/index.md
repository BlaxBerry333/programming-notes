---
prev: false
next: false
---

# Next.js

![](/static/skill-images/web-frontend--nextjs.png)

## 项目初始化

::: code-group

```zsh [新目录]
% npx create-next-app@latest                          # [!code focus]
? What is your project named? ›                                       [项目名]
? Would you like to use TypeScript? ›                                 Yes
? Would you like to use ESLint? ›                                     Yes
? Would you like to use Tailwind CSS? ›                               Yes
? Would you like your code inside a `src/` directory? ›               Yes
? Would you like to use App Router? (recommended) ›                   Yes
? Would you like to use Turbopack for `next dev`? ›                   Yes
? Would you like to customize the import alias (`@/*` by default)? ›  No

% cd [项目名]                                          # [!code focus:2]
% yarn run dev   # 默认 3000 端口
> next dev --turbopack
   ▲ Next.js 15.1.6 (Turbopack)
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.3:3000

 ✓ Starting...
 ✓ Ready in 663ms
```

```zsh [现有目录]
% cd [项目名]                                          # [!code focus:2]
% npx create-next-app@latest .
? Would you like to use TypeScript? ›                                   Yes
? Would you like to use ESLint? ›                                       Yes
? Would you like to use Tailwind CSS? ›                                 Yes
? Would you like your code inside a `src/` directory? ›                 Yes
? Would you like to use App Router? (recommended) ›                     Yes
? Would you like to use Turbopack for `next dev`? ›                     Yes
? Would you like to customize the import alias (`@/*` by default)? ›    No

% yarn run dev   # 默认 3000 端口                      # [!code focus]
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
│   └─ ...
│
├─ next-env.d.ts
├─ next.config.ts
├─ package.json
├─ tscongig.json
└─ ...
```

:::

## 相关链接

- [Next14](https://mp.weixin.qq.com/s/6G65dlwKZiFDem3IQ4BBXA)
