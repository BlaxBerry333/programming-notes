---
layout: home

hero:
  name: Dev Tools
  text: 开发工具
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/hero--ironman.webp
    alt: picture
---

<script setup lang="ts"> 
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'


const __VERSION_CONTROL__ = [
    { 
        name: "Git", 
        link: "/notes/dev-tools/version/git/", 
        imgSrc: "/static/skill-icons/dev-tools--git.png"
    },
    { 
        name: "asdf", 
        link: "/notes/dev-tools/version/asdf/", 
        imgSrc: "/static/skill-icons/dev-tools--asdf.png"
    }
]

const __AUTOMATED_BUILDS__ = [
    { 
        name: "Makefile", 
        link: "/notes/dev-tools/auto-build/makefile/", 
        imgSrc: "/static/skill-icons/dev-tools--makefile.png"
    }
]

const __DEBUGGING_ANALYZING__ = [
    { 
        name: "cURL", 
        link: "/notes/dev-tools/debugging/curl/", 
        imgSrc: "/static/skill-icons/dev-tools--curl.png"
    }
]
</script>

## 版本控制

<SkillIconsBlock :skillList="__VERSION_CONTROL__"/>

## 自动构建

<SkillIconsBlock :skillList="__AUTOMATED_BUILDS__"/>

## 调试分析

<SkillIconsBlock :skillList="__DEBUGGING_ANALYZING__"/>
