# 图片优化

## 图片格式

根据不同场景使用不同的图片格式，来有效减少图片文件的大小

|    图片格式    | 说明                                                                                   |
| :------------: | -------------------------------------------------------------------------------------- |
|     `.ico`     | 仅设用于网站图标 favicon                                                               |
| `.jpeg`/`.jpg` | 文件较小，适用于色彩丰富且对细节要求不高的图片<br/>压缩比高但有损失                    |
|     `.png`     | 文件较大，适用于带透明度背景的图标、简单图形                                           |
|     `.svg`     | 文件极小，适用于矢量图与图标<br/>支持无损压缩和缩放，且图像不会失真                    |
|    `.webp`     | 文件较小，适用于大部分图片 ( 旧浏览器不兼容 )<br/>有更高的压缩率，且支持有损和无损压缩 |
|    `.avif`     | 文件极小，一种较新的图像 ( 旧浏览器不兼容 )<br/>格式压缩效果非常好，且质量高           |

> [!IMPORTANT] 建议：
>
> - 现代浏览器优先使用`.webp`、`.avif`，但是为了兼容性的话选择`.jpeg`
> - 简单小图像优先考虑`.svg`
> - 网站图标 favicon 建议生成多个不同尺寸

可以利用现代浏览器WebP 和 AVIF 格式的自动切换根据浏览器的支持情况自动选择适当的格式

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="image" />
</picture>
```

## 图像压缩

项目的静态图片在不影响可视效果的情况下应该尽量减小图片体积

可使用在线工具[TinyPNG](https://tinypng.com/)、[Squoosh](https://squoosh.app/)

## 渲染优化

### 预加载

> PreLoad

为关键图片使用预加载在 DOM 渲染前提前请求资源，以减少延迟和闪烁

```html
<head>
  <link rel="preload" href="图片.格式" as="image" />
</head>
```

---

### 懒加载

> Lazy Loading

只有当图片进入视口时才开始加载该图片，以减少初始页面加载时的加载数量

旧浏览器需要通过 JavaScript 监听滚动事件实现，但现代浏览器都支持`<img> + loading`

```html
<img src="图片.格式" loading="lazy" alt="图片说明" />
```

---

### 骨架屏与占位图

> Skeleton Screens & Placeholder Images

在图片加载期间可使用骨架屏 ( 或一张体积极小的 SVG 静态图片 ) 做一个空状态的占位预览

骨架屏结构可以通过 HTML/CSS 自定义，或者使用主流 UI 组件库内置的骨架屏组件

<div class="skeleton-screen-wrapper" >
  <div class="skeleton-block" /> 
  <div class="skeleton-avatar" />
  <div class="skeleton-text" />
  <div class="skeleton-text" />
  <div class="skeleton-text" />
  <div class="skeleton-text" />
</div>

<style lang="scss">
  div.skeleton-screen-wrapper {
    height: 230px; 
    width: 100%;
    padding: 0.5rem 0.8rem;
    border: #E2E2E3 0.5px solid;
    & > div {
      background-color: #F5F5F5; 
    }
    & > div.skeleton-block {
      height: 120px; 
      width: 100%;
      margin-bottom: 0.6rem;
    }
    & > div.skeleton-avatar {
      height: 80px; 
      width: 80px;
      float: left;
    }
    & > div.skeleton-text {
      height: 12px; 
      margin-left: calc(80px + 0.3rem);
      margin-bottom: 0.5rem;
    }
  }
  html.dark {
    div.skeleton-screen-wrapper {
      border: #2E2E32 1px solid;
      & > div {
        background-color: #FFFFFF21; 
      }
    }
  }
</style>

---

### 响应式尺寸

根据显示区域的实际需求来加载不同尺寸的图片

> 如下：两种写法`<picture> + <source>`、`<img> + srcset + sizes`

::: code-group

```html [写法一]
<picture>
  <source srcset="image-800w.jpg" media="(max-width: 600px)" />
  <source srcset="image-1600w.jpg" media="(min-width: 601px)" />
  <img src="image-1600w.jpg" alt="image-alt-message" />
</picture>
```

```html [写法二]
<img
  srcset="image-800w.jpg 800w, image-1600w.jpg 1600w"
  sizes="(max-width: 600px) 100vw, (min-width: 601px) 1600px"
  src="image-1600w.jpg"
  alt="image-alt-message"
/>
```

:::

---

### 精灵图

> CSS Sprites

精灵图是指将多个图标、小图片等合并成的一张图像文件，可以减少 HTTP 请求次数

> 如下：使用精灵图时需要通过 CSS `background-position`定位到其中小图片

```css
.icon {
  background-image: url("sprites.png");
  width: 40px;
  height: 40px;
}

.icon-home {
  background-position: 0 0;
}

.icon-settings {
  background-position: -40px 0;
}
```

> [!CAUTION] 不建议使用
>
> - 现代浏览器的缓存机制改善了多图像请求时的性能问题，精灵图的优势变得不那么明显
> - 精灵图包含的图片过多时会影响首次加载速度
> - 灵活性差使用时的定位复杂，后期的修改时影响范围大
> - 在高清设备上的分辨率差，更建议使用 SVG 矢量图、 Web 字体图标等

## 缓存策略

利用浏览器的缓存策略直接使用本地缓存而不发送请求

[强缓存](./first-screen-load-optimization.md#强缓存)、[协商缓存](./first-screen-load-optimization.md#协商缓存)
