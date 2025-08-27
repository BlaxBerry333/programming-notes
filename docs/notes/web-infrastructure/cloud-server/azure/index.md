---
prev: false
next: false
---

<script setup lang="ts"> 
import SkillIconsBlock from '../../../../components/SkillIconsBlock.vue'

// 存储
const __STORAGE__ = [
    {
        name: "Blob Storage",
        link: "https://learn.microsoft.com/zh-cn/azure/storage/blobs/",
        imgSrc: "/static/skill-icons/web-infrastructure--azure-blob-storage.png",
        openNewTag: true
    },
    {
        name: "File Storage",
        link: "https://learn.microsoft.com/zh-cn/azure/storage/files/storage-files-introduction",
        imgSrc: "/static/skill-icons/web-infrastructure--azure-file-storage.png",
        openNewTag: true
    },
]
</script>

# Azure

![](/static/skill-images/web-infrastructure--azure.png)

> Microsoft Azure

Azure 是一个云平台，提供了一套模块化云服务，包括计算、分析、存储、网络等

## 存储

<SkillIconsBlock :skillList="__STORAGE__"/>

## 相关链接

https://cloud.sojitz-ti.com/azure/
