---
layout: home

hero:
  name: DataBase & Data
  text: 数据库与数据
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/hero--punisher.png
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
]
</script>

## 关系型数据库

<SkillIconsBlock :skillList="__SQL_DATABASE__"/>

## 非关系型数据库

<SkillIconsBlock :skillList="__NO_SQL_DATABASE__"/>

## 数据库设计与建模

正规化、ER 图、关系建模、数据索引

## 查询优化与性能调优

查询缓存、索引、EXPLAIN、分区表

## 数据迁移与备份

数据迁移工具（Flyway、Liquibase）、备份策略、恢复机制

## 分布式数据库

Sharding、分布式事务、CAP 理论、分布式一致性
