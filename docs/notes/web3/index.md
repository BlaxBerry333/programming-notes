---
layout: home

hero:
  name: Web3 & Blockchain
  text: Web3 & 区块链
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/villain--loki.webp
    alt: picture
---

<script setup lang="ts">
import SkillTextLinksBlock from '../../components/SkillTextLinksBlock.vue'
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'


const __LANGUAGES__ = [
    { 
        name: "Solidity", 
        link: "/notes/web3/languages/solidity/", 
        imgSrc: "/static/skill-icons/web3--solidity.png"
    }
]
</script>

## 编程语言

<SkillIconsBlock :skillList="__LANGUAGES__"/>
