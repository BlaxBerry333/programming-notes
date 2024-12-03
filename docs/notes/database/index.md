---
layout: home

hero:
  name: DataBase & Data
  text: 数据库 & 数据
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/hero--punisher.webp
    alt: picture
---

<script setup lang="ts"> 
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'


const __SQL_DATABASE__ = [
    { 
        name: "MySQL", 
        link: "/notes/database/mysql/", 
        imgSrc: "/static/skill-icons/database--mysql.png"
    },
    { 
        name: "PostgreSQL", 
        link: "/notes/database/postgresql/", 
        imgSrc: "/static/skill-icons/database--postgresql.png"
    }
]

const __NO_SQL_DATABASE__ = [
    { 
        name: "MongoDB", 
        link: "/notes/database/mongodb/", 
        imgSrc: "/static/skill-icons/database--mongodb.png"
    },
    { 
        name: "Redis", 
        link: "/notes/database/redis/", 
        imgSrc: "/static/skill-icons/database--redis.png"
    },
    { 
        name: "Amazon DynamoDB", 
        link: "https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/Introduction.html", 
        imgSrc: "/static/skill-icons/database--dynamodb.png",
        openNewTag: true
    },
]

const __ORM_TOOL__ = [
    { 
        name: "Prisma",  
        link: "https://www.prisma.io/", 
        imgSrc: "/static/skill-icons/database--prisma.png", 
        openNewTag: true
    }
]
</script>

## 关系型数据库

> Relational Database

<SkillIconsBlock :skillList="__SQL_DATABASE__"/>

## 非关系型数据库

> Non-Relational Database ( NoSQL Database )

<SkillIconsBlock :skillList="__NO_SQL_DATABASE__"/>

## ORM 工具

> Object-Relational Mapping Tool

<SkillIconsBlock :skillList="__ORM_TOOL__"/>

<!-- ## 数据库设计与建模

正规化、ER 图、关系建模、数据索引

## 查询优化与性能调优

查询缓存、索引、EXPLAIN、分区表

## 数据迁移与备份

数据迁移工具（Flyway、Liquibase）、备份策略、恢复机制

## 分布式数据库

Sharding、分布式事务、CAP 理论、分布式一致性 -->
