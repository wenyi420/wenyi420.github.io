<script setup>
import movieCategory from "@/components/slide/movieCategory.vue";
</script>

<template>
  <main>
    <section class="category-section">
      <div class="container">
        <h1 class="category-title">電影</h1>
        <div class="category-desc">
          電影以無人能及的方式帶給我們感動，不論是嚇人、搞笑、誇張、浪漫或其間的所有情緒皆然。
          超多影片，帶來超多體驗。
        </div>
      </div>
    </section>

    <!-- 待做成一個 section 組件 包裝 slide -->
    <movieCategory type="popular"></movieCategory>
    <movieCategory type="plot"></movieCategory>
    <movieCategory type="romantic"></movieCategory>
    <movieCategory type="violence"></movieCategory>
    <movieCategory type="fear"></movieCategory>
  </main>
</template>

<style scoped>
main {
  background: var(--color-background);
  height: 100vh;
}
.category-section {
  padding: 0 3%;
  margin-bottom: 20px;
}
@media screen and (min-width: 600px) {
  .category-section .container {
    max-width: 598px;
  }
}

.category-title {
  color: var(--color-text);
  font-size: 2.75rem;
  font-weight: 900;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgb(0 0 0 / 40%);
  word-wrap: break-word;
  margin-top: 4vw;
}

@media screen and (min-width: 1440px) {
  .category-title {
    font-size: 3.25rem;
  }
}
.category-desc {
  color: #fff;
  font-size: 19px;
  margin-top: 0.1vw;
  width: 100%;
  line-height: 1.3;
}
</style>
