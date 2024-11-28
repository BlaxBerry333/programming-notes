<script setup lang="ts">
import { toRefs } from "vue";
import { withBase } from "vitepress";

interface SkillIconCard {
  name: string;
  imgSrc: string;
  link: string;
  openNewTag?: boolean; // 在新的浏览器标签中打开链接 ( 多用于外部连接 )
}

const props = defineProps({
  skillList: Array<SkillIconCard>,
});

const { skillList } = toRefs(props);
</script>

<template>
  <ul class="skill-icons-block" v-if="!!skillList?.length">
    <a
      v-for="(item, index) in skillList"
      :key="index"
      :href="item.openNewTag ? item.link : withBase(item.link)"
      :target="item.openNewTag ? '_blank' : '_self'"
      rel="noopener noreferrer"
    >
      <li class="skill-icon-card">
        <img
          :src="withBase(item.imgSrc)"
          :alt="item.name"
          loading="lazy"
          class="skill-img"
        />
        <strong class="skill-title" translate="no">
          {{ item.name }}
        </strong>

        <i class="external-link" v-if="item.openNewTag">
          {{ " ↗ " }}
        </i>
      </li>
    </a>
  </ul>
</template>

<style lang="scss">
ul.skill-icons-block {
  padding: 0;
  margin: 0;
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;

  & > a {
    text-decoration: none;
    color: inherit;

    &:hover {
      color: inherit;
    }
  }

  li.skill-icon-card {
    position: relative;
    list-style: none;
    display: flex;
    align-items: center;
    min-width: 200px;
    padding: 14px 28px;
    margin: 0;
    border-radius: 14px;
    border: transparent 1px solid;
    cursor: pointer;
    position: relative;
    background-color: var(--vp-c-bg-soft);
    box-shadow: var(--vp-shadow-4);

    &:hover {
      border-color: var(--vp-c-brand-1);
      color: var(--vp-c-brand-1);

      &::after {
        filter: blur(10px);
      }
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      inset: 0;
      border-radius: inherit;
      transform: translateZ(-1px);
      pointer-events: none;
      transition: filter 0.3s ease;
      background-clip: content-box !important;
      background: -webkit-linear-gradient(123deg, #d600ba, #6842ff, #007e94);
    }

    img.skill-img {
      height: 50px;
      width: 50px;
      margin-right: 18px;
    }

    strong.skill-title {
      font-size: 14px;
      line-height: 16px;
    }

    i.external-link {
      position: absolute;
      top: 0px;
      right: 6px;
      color: var(--vp-c-brand-1);
      font-size: 12px;
      font-weight: 600;
    }
  }
}
</style>
