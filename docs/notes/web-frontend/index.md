---
layout: home

hero:
  name: Web Frontend Dev
  text: 前端开发
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/hero--deadpool.png
    alt: picture
---

<script setup lang="ts">
import SkillTextLinksBlock from '../../components/SkillTextLinksBlock.vue'
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'


const __LANGUAGES__ = [
    { 
        name: "JavaScript", 
        link: "/notes/web-frontend/languages/javascript/", 
        imgSrc: "/static/skill-icons/web-frontend--javascript.png"
    },
    { 
        name: "TypeScript", 
        link: "/notes/web-frontend/languages/typescript/", 
        imgSrc: "/static/skill-icons/web-frontend--typescript.png"
    }
]

const  __FRAMEWORKS__ = [
    { 
        name: "React", 
        link: "/notes/web-frontend/frameworks/react/", 
        imgSrc: "/static/skill-icons/web-frontend--react.png"
    },
    { 
        name: "Vue", 
        link: "/notes/web-frontend/frameworks/vue/", 
        imgSrc: "/static/skill-icons/web-frontend--vue.png"
    }
]

const __BUILD_TOOLS__ = [
    { 
        name: "Vite", 
        link: "https://vitepress.dev/zh/",
        imgSrc: "/static/skill-icons/web-frontend--vite.png",
        openNewTag: true
    },
    { 
        name: "Rollup", 
        link: "https://rollupjs.org/",
        imgSrc: "/static/skill-icons/web-frontend--rollupjs.png",
        openNewTag: true
    },
    { 
        name: "Webpack", 
        link: "https://webpack.js.org/",
        imgSrc: "/static/skill-icons/web-frontend--webpack.png",
        openNewTag: true
    }
]

const __AUTOMATED_TESTING__ = [
    { 
        name: "Vitest", 
        link: "https://cn.vitest.dev/",
        imgSrc: "/static/skill-icons/web-frontend--vitest.png",
        openNewTag: true 
    },
    { 
        name: "Jest", 
        link: "https://jestjs.io/zh-Hans/",
        imgSrc: "/static/skill-icons/web-frontend--jest.png",
        openNewTag: true 
    },
    { 
        name: "Cypress", 
        link: "https://www.cypress.io/",
        imgSrc: "/static/skill-icons/web-frontend--cypress.png",
        openNewTag: true 
    },
    { 
        name: "Testing Library", 
        link: "https://testing-library.com/",
        imgSrc: "/static/skill-icons/web-frontend--testing-library.png",
        openNewTag: true 
    },
]

const __EXTENSIONS__ = [
    { 
        name: "WebAssembly", 
        link: "/notes/web-frontend/__extensions__/webassembly/",
        imgSrc: "/static/skill-icons/web-frontend--webassembly.png", 
    },
    { 
        name: "WebRTC", 
        link: "/notes/web-frontend/__extensions__/webrtc/",
        imgSrc: "/static/skill-icons/web-frontend--webrtc.png",
    },
]

const __PERFORMANCE_OPTIMIZATION__ = [
    {
        name: "首屏加载优化",
        link: "/notes/web-frontend/__performance__/first-screen-load-optimization"
    },
    { 
        name: "图片性能优化", 
        link: "/notes/web-frontend/__performance__/image-optimization", 
    },
    { 
        name: "减少 HTTP 请求", 
        link: "", 
    },
    { 
        name: "Service Workers 资源缓存", 
        link: "", 
    }
]
</script>

<!-- ## 前端基础 -->
<!-- - HTML5、CSS3 -->

## 编程语言与其开发框架

<SkillIconsBlock :skillList="__LANGUAGES__"/>
<SkillIconsBlock :skillList="__FRAMEWORKS__"/>

## 构建工具

<SkillIconsBlock :skillList="__BUILD_TOOLS__"/>

## 自动化测试

<SkillIconsBlock :skillList="__AUTOMATED_TESTING__"/>

## 前端扩展

<SkillIconsBlock :skillList="__EXTENSIONS__"/>

## 性能优化

<SkillTextLinksBlock :textList="__PERFORMANCE_OPTIMIZATION__"/>
