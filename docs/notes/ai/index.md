---
layout: home

hero:
  name: AI
  text: 人工智能
  tagline: 基础知识 & 经验总结
  image:
    src: /static/cartoon-images/hero--daredevil.webp
    alt: picture
---

<script setup lang="ts">
import SkillTextLinksBlock from '../../components/SkillTextLinksBlock.vue'
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'

const __FRAMEWORKS__ = [
    { 
        name: "LangChain", 
        link: "/notes/ai/langchain/", 
        imgSrc: "/static/skill-icons/ai-langchain.png"
    },
]
</script>

<SkillIconsBlock :skillList="__FRAMEWORKS__"/>
