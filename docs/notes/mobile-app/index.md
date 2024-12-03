---
layout: home

hero:
  name: Mobile App Dev
  text: 移动端开发
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
        link: "/notes/mobile-app/languages/dart/", 
        imgSrc: "/static/skill-icons/mobile-app--dart.png"
    },
    { 
        name: "Flutter", 
        link: "/notes/mobile-app/frameworks/flutter/", 
        imgSrc: "/static/skill-icons/mobile-app--flutter.png"
    },
]

const __REACT_NATIVE__ = [
    { 
        name: "React Native", 
        link: "https://reactnative.dev/", 
        imgSrc: "/static/skill-icons/web-frontend--react.png",
        openNewTag: true
    },
]
</script>

## 跨平台开发

> Cross Platform Development

<SkillIconsBlock :skillList="__DART_AND_FLUTTER__"/>
<SkillIconsBlock :skillList="__REACT_NATIVE__"/>
