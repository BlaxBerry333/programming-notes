---
layout: home

hero:
  name: Web Infrastructure
  text: 基础设施
  tagline: 基础知识 & 经验总结
  image:
    src: /static/cartoon-images/hero--captainmarvel.webp
    alt: picture
---

<script setup lang="ts">
import SkillTextLinksBlock from '../../components/SkillTextLinksBlock.vue'
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'


const __OPERATING_SYSTEM__ = [
    { 
        name: "Linux", 
        link: "/notes/web-infrastructure/operating-system/linux/", 
        imgSrc: "/static/skill-icons/web-infrastructure--linux.png"
    },
    { 
        name: "Shell 脚本", 
        link: "/notes/web-infrastructure/operating-system/shell/", 
        imgSrc: "/static/skill-icons/web-infrastructure--shell.png"
    },
]

const __CONTAINERIZATION__ = [
    { 
        name: "Docker", 
        link: "/notes/web-infrastructure/containerization/docker/", 
        imgSrc: "/static/skill-icons/web-infrastructure--docker.png"
    },
    { 
        name: "Docker Compose", 
        link: "/notes/web-infrastructure/containerization/docker-compose/", 
        imgSrc: "/static/skill-icons/web-infrastructure--docker-compose.png"
    },
    { 
        name: "Kubernetes", 
        link: "/notes/web-infrastructure/containerization/kubernetes/", 
        imgSrc: "/static/skill-icons/web-infrastructure--kubernetes.png"
    }
]

const __DATA_EXCHANGE__ = [
    { 
        name: "JSON",
        link: "/notes/web-infrastructure/data-exchange/json/", 
        imgSrc: "/static/skill-icons/web-infrastructure--json.png",
    },
    {
        name: "Protocol Buffers",
        link: "/notes/web-infrastructure/data-exchange/protobuf/", 
        imgSrc: "/static/skill-icons/web-infrastructure--protobuf.png",
    }
]

const __WEB_SERVER__ = [
    {
        name: "Nginx",
        link: "/notes/web-infrastructure/web-server/nginx/",
        imgSrc: "/static/skill-icons/web-infrastructure--nginx.png"
    },
]

const __CLOUD_SERVER__ = [
    {
        name: "AWS",
        link: "/notes/web-infrastructure/cloud-server/aws/",
        imgSrc: "/static/skill-icons/web-infrastructure--aws.png"
    },   
    {
        name: "Google Cloud",
        link: "/notes/web-infrastructure/cloud-server/google-cloud/",
        imgSrc: "/static/skill-icons/web-infrastructure--gcp.png"
    }, 
    {
        name: "Azure",
        link: "/notes/web-infrastructure/cloud-server/azure/",
        imgSrc: "/static/skill-icons/web-infrastructure--azure.png"
    },
]

const __CI_CD__ = [
    { 
        name: "GitLab CI/CD", 
        link: "https://gitlab-docs.creationline.com/ee/ci/yaml/#keywords", 
        imgSrc: "/static/skill-icons/web-infrastructure--gitlab-cicd.png",
        openNewTag: true
    },
    { 
        name: "GitHub Actions", 
        link: "https://docs.github.com/zh/actions", 
        imgSrc: "/static/skill-icons/web-infrastructure--github-actions.png",
        openNewTag: true
    }
]
</script>

## 操作系统

<SkillIconsBlock :skillList="__OPERATING_SYSTEM__"/>

## 容器化

<SkillIconsBlock :skillList="__CONTAINERIZATION__"/>

## 数据交换格式

<SkillIconsBlock :skillList="__DATA_EXCHANGE__"/>

## Web 服务器

<SkillIconsBlock :skillList="__WEB_SERVER__"/>

## 云服务器

<SkillIconsBlock :skillList="__CLOUD_SERVER__"/>

<!-- ## CI/CD

<SkillIconsBlock :skillList="__CI_CD__"/> -->
