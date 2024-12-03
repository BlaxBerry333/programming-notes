---
prev: false
next: false
---

<script setup lang="ts"> 
import SkillIconsBlock from '../../../../components/SkillIconsBlock.vue'


const __PROJECT_START__ = [
    { 
        name: "Next.js", 
        link: "/notes/web-frontend/frameworks/nextjs/", 
        imgSrc: "/static/skill-icons/web-frontend--nextjs.png",
    },
    { 
        name: "Remix", 
        link: "https://remix.run/", 
        imgSrc: "/static/skill-icons/web-frontend--remix.png",
        openNewTag: true 
    },
    { 
        name: "Vite", 
        link: "https://cn.vite.dev/guide/#scaffolding-your-first-vite-project", 
        imgSrc: "/static/skill-icons/web-frontend--vite.png",
        openNewTag: true 
    },
    // { 
    //     name: "Gatsby", 
    //     link: "https://www.gatsbyjs.com/", 
    //     imgSrc: "/static/skill-icons/web-frontend--gatsby.png",
    //     openNewTag: true 
    // }
]
</script>

# React

![](/static/skill-images/web-frontend--react.png)

React 是一个用于构建交互界面的库，文件后缀名为`.jsx`、`.tsx`

## 项目创建

<SkillIconsBlock :skillList="__PROJECT_START__"/>
