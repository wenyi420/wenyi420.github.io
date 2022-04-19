<script setup>
import { RouterLink, RouterView } from "vue-router";
import MHeader from "@/components/Header.vue";
import "@/assets/base.css";
</script>

<template>
  <div class="wrapper with-fixed-header">
    <MHeader />

    <RouterView />
  </div>
</template>

<style>
.with-fixed-header {
  margin-top: 56px;
}
</style>
