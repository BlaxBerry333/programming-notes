import { defineConfig } from "vitepress";
import { SITE_HEAD } from "./site-head";
import { DEFAULT_THEME_CONFIG } from "./default-theme-config";

export default defineConfig({
  /**
   * 网站元数据配置
   * ----------------------------------------------------------------------------------------------------
   */
  title: "BlaxBerry's 编程学习笔记",
  titleTemplate: ":title | BlaxBerry",
  description: "BlaxBerry 的编程学习笔记",
  head: SITE_HEAD,

  base: "/programming-notes/", // 需要与仓库名一致才能部署到 GitHub Pages

  /**
   * 覆盖默认主题配置
   * ----------------------------------------------------------------------------------------------------
   */
  themeConfig: {
    ...DEFAULT_THEME_CONFIG,

    // 文章章节
    aside: true,
    outline: {
      label: "文章目录",
      level: "deep",
    },
    // 覆盖默认文本内容
    darkModeSwitchLabel: "外观模式",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdated: {
      text: "最近更新",
    },
    docFooter: {
      prev: "前一篇文章",
      next: "下一篇文章",
    },
    // 404 页面内容
    notFound: {
      title: "Not Found",
      quote: "访问地址对应的文档不存在，请检查访问地址或者返回首页查看更多文档",
      linkText: "返回首页",
    },
  },

  /**
   * Markdown配置
   * ----------------------------------------------------------------------------------------------------
   */
  markdown: {
    cache: false, // 开发期间禁用缓存以实现 markdown 更新
    image: {
      lazyLoading: true,
    },
    theme: {
      light: "github-light",
      dark: "github-dark-dimmed",
    },
    // container: {
    //   tipLabel: "【提示】",
    //   warningLabel: "【警告】",
    //   dangerLabel: "【危险】",
    //   infoLabel: "【信息】",
    //   detailsLabel: "【详细信息】",
    // },
  },

  /**
   * 其他配置
   * ----------------------------------------------------------------------------------------------------
   */
  cleanUrls: true,
  ignoreDeadLinks: true,
  appearance: "dark",
});
