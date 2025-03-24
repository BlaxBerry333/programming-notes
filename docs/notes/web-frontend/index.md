---
layout: home

hero:
  name: Web Frontend Dev
  text: 前端开发
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/hero--deadpool.webp
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
    },
    // { 
    //     name: "CSS", 
    //     link: "/notes/web-frontend/languages/css/", 
    //     imgSrc: "/static/skill-icons/web-frontend--css.png"
    // },
    // { 
    //     name: "Sass", 
    //     link: "/notes/web-frontend/languages/sass/", 
    //     imgSrc: "/static/skill-icons/web-frontend--sass.png"
    // }
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
        name: "Web Assembly", 
        link: "/notes/web-frontend/__extensions__/webassembly/",
        imgSrc: "/static/skill-icons/web-frontend--webassembly.png", 
    },
    { 
        name: "Web Components", 
        link: "https://www.webcomponents.org/introduction/",
        imgSrc: "/static/skill-icons/web-frontend--webcomponents.png",
        openNewTag: true
    },
    { 
        name: "Web RTC", 
        link: "/notes/web-frontend/__extensions__/webrtc/",
        imgSrc: "/static/skill-icons/web-frontend--webrtc.png",
    },
    { 
        name: "Chrome Extension", 
        link: "https://developer.chrome.com/docs/extensions/reference/api?hl=zh-cn",
        imgSrc: "/static/skill-icons/web-frontend--chrome-extension.png",
        openNewTag: true 
    },
]

const __CROSS_PLATFORM__ = [
    { 
        name: "Dart", 
        link: "/notes/web-frontend/languages/dart/", 
        imgSrc: "/static/skill-icons/cross-platform--dart.png"
    },
    { 
        name: "Flutter", 
        link: "/notes/web-frontend/frameworks/flutter/", 
        imgSrc: "/static/skill-icons/cross-platform--flutter.png"
    },
    // { 
    //     name: "Tauri", 
    //     link: "/notes/web-frontend/frameworks/tauri/", 
    //     imgSrc: "/static/skill-icons/cross-platform--tauri.png",
    // },
    { 
        name: "React Native", 
        link: "https://reactnative.dev/", 
        imgSrc: "/static/skill-icons/web-frontend--react.png",
        openNewTag: true
    },
]

const __PERFORMANCE_OPTIMIZATION__ = [
    {
        name: "首屏加载优化",
        link: "/notes/web-frontend/__performance__/first-screen-load-optimization"
    },
    { 
        name: "图片优化", 
        link: "/notes/web-frontend/__performance__/image-optimization", 
    },
    { 
        name: "优化大文件上传", 
        link: "/notes/web-frontend/__performance__/large-file-uploading", 
    },
    { 
        name: "优化请求接口的并发", 
        link: "/notes/web-frontend/__performance__/requests-concurrent", 
    },
]
</script>

## 编程语言与其框架

<SkillIconsBlock :skillList="__LANGUAGES__"/>
<SkillIconsBlock :skillList="__FRAMEWORKS__"/>

<!-- ## 构建工具
<SkillIconsBlock :skillList="__BUILD_TOOLS__"/> -->

<!-- ## 自动化测试
<SkillIconsBlock :skillList="__AUTOMATED_TESTING__"/> -->

<!-- ## 前端扩展
<SkillIconsBlock :skillList="__EXTENSIONS__"/> -->

## 跨平台

<SkillIconsBlock :skillList="__CROSS_PLATFORM__"/>

## 性能优化

<SkillTextLinksBlock :textList="__PERFORMANCE_OPTIMIZATION__"/>
