---
layout: home

hero:
  name: Cross Platform Dev
  text: 跨平台开发
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/hero--daredevil.webp
    alt: picture
---

<script setup lang="ts">
import SkillTextLinksBlock from '../../components/SkillTextLinksBlock.vue'
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'


const __DART_AND_FLUTTER__ = [
    { 
        name: "Dart", 
        link: "/notes/cross-platform/languages/dart/", 
        imgSrc: "/static/skill-icons/cross-platform--dart.png"
    },
    { 
        name: "Flutter", 
        link: "/notes/cross-platform/frameworks/flutter/", 
        imgSrc: "/static/skill-icons/cross-platform--flutter.png"
    },
]

const __OTHERS__ = [
    { 
        name: "Tauri", 
        link: "/notes/cross-platform/frameworks/tauri/", 
        imgSrc: "/static/skill-icons/cross-platform--tauri.png",
    },
    { 
        name: "React Native", 
        link: "https://reactnative.dev/", 
        imgSrc: "/static/skill-icons/web-frontend--react.png",
        openNewTag: true
    },
]

const __DESKTOP_APP__ = [
    { 
        name: "Electron", 
        link: "/notes/cross-platform/frameworks/electron/", 
        imgSrc: "/static/skill-icons/cross-platform--electron.png",
    },
]
</script>

## 编程语言与其开发框架

<SkillIconsBlock :skillList="__DART_AND_FLUTTER__"/>
<SkillIconsBlock :skillList="__OTHERS__"/>
<SkillIconsBlock :skillList="__DESKTOP_APP__"/>
