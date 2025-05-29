---
prev: false
next: false
---

<script setup lang="ts"> 
import SkillIconsBlock from '../../../../components/SkillIconsBlock.vue'

// 计算
const __COMPUTE__ = [
    {
        name: "AWS Lambda",
        link: "https://aws.amazon.com/cn/lambda/?nc1=h_ls",
        imgSrc: "/static/skill-icons/web-infrastructure--aws-lambda.png",
        openNewTag: true
    },
    {
        name: "AWS EC2",
        link: "https://aws.amazon.com/cn/ec2/?nc1=h_ls",
        imgSrc: "/static/skill-icons/web-infrastructure--aws-ec2.png",
        openNewTag: true
    }
]

// 存储
const __STORAGE__ = [
    {
        name: "AWS S3",
        link: "https://aws.amazon.com/cn/s3/?nc1=h_ls",
        imgSrc: "/static/skill-icons/web-infrastructure--aws-s3.png",
        openNewTag: true
    },
]

// 数据库
const __DATABASE__ = [
    { 
        name: "Amazon DynamoDB", 
        link: "https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/Introduction.html", 
        imgSrc: "/static/skill-icons/web-infrastructure--aws-dynamodb.png",
        openNewTag: true
    }, 
]
</script>

# AWS

![](/static/skill-images/web-infrastructure--aws.png)

> Amazon Web Services

AWS 是一个云平台，提供了一套模块化云服务，包括了计算、存储、数据库、网络、安全等

## 计算

<SkillIconsBlock :skillList="__COMPUTE__"/>

## 存储

<SkillIconsBlock :skillList="__STORAGE__"/>

## 数据库

<SkillIconsBlock :skillList="__DATABASE__"/>
