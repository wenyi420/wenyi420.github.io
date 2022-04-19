<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function toHomePage() {
  router.push("/");
}
</script>

<template>
  <header>
    <div class="left">
      <span class="logo" @click="toHomePage">MOVIES</span>
    </div>
    <div class="right">
      <a-space>
        不限時數的節目與電影
        <a-button type="primary">立即加入</a-button>
        <a-button class="transparent">登入</a-button>
      </a-space>
    </div>
  </header>
  <!-- <nav>
    <RouterLink to="/">首頁</RouterLink>
    <RouterLink to="/about">測試</RouterLink>
  </nav> -->
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 3%;
  background: var(--v-black);
  color: var(--color-text);

  .logo {
    line-height: 1;
    color: var(--color-main);
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
