---
prev: false
next: false
---

<script setup lang="ts"> 
import SkillIconsBlock from '../../../../components/SkillIconsBlock.vue'

// 计算
const __COMPUTE__ = [
    // {
    //     name: "Cloud Run",
    //     link: "https://cloud.google.com/run?hl=zh_cn",
    //     imgSrc: "/static/skill-icons/web-infrastructure--gcp-cloud-run.png",
    //     openNewTag: true
    // },
    {
        name: "Cloud Functions",
        link: "https://codelabs.developers.google.com/codelabs/cloud-starting-cloudfunctions?hl=zh-cn",
        imgSrc: "/static/skill-icons/web-infrastructure--gcp-cloud-functions.png",
        openNewTag: true
    }
]

// 存储
const __STORAGE__ = [
    {
        name: "Cloud Storage",
        link: "https://cloud.google.com/storage?hl=zh_cn",
        imgSrc: "/static/skill-icons/web-infrastructure--gcp-cloud-storage.png",
        openNewTag: true
    },
    {
        name: "Cloud SQL",
        link: "https://cloud.google.com/sql?hl=zh_cn",
        imgSrc: "/static/skill-icons/web-infrastructure--gcp-cloud-sql.png",
        openNewTag: true
    },
]

// 大数据与分析
const __BIG_DATA_ANALYSIS__ = [
    {
        name: "BigQuery",
        link: "https://cloud.google.com/bigquery?hl=zh_cn#generative-ai",
        imgSrc: "/static/skill-icons/web-infrastructure--gcp-bigquery.png",
        openNewTag: true
    },
    // {
    //     name: "Looker",
    //     link: "https://cloud.google.com/looker?hl=zh_cn",
    //     imgSrc: "/static/skill-icons/web-infrastructure--gcp-bigquery.png",
    //     openNewTag: true
    // }
]
</script>

# Google Cloud

![](/static/skill-images/web-infrastructure--gcp.png)

Google Cloud 是一个云平台，提供了一套模块化云服务，包括了计算、存储、数据分析、网络等

## 计算

<SkillIconsBlock :skillList="__COMPUTE__"/>

## 存储

<SkillIconsBlock :skillList="__STORAGE__"/>

## 大数据与分析

<SkillIconsBlock :skillList="__BIG_DATA_ANALYSIS__"/>
