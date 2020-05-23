<template>
  <div class="container">
    <router-view />
  </div>
</template>
<script>
  import Vue from "vue";
  import { Stepper } from "vant";

  Vue.use(Stepper);
  export default {};
</script>
<style lang="scss">
  .container {
    max-width: 980px;
    margin: 0 auto;
  }
  .cart-progress {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0px;

    .progress-item {
      width: 100%;
      position: relative;
      .circle {
        display: inline-block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: #ff7f50;
        color: #fff;
        margin: 0px 5%;
        border-radius: 50%;
      }
      .progress-status {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        padding-top: 10px;
      }
    }
    .progress-item + .progress-item {
      &::after {
        content: "";
        position: absolute;
        left: -50%;
        width: 100%;
        height: 15px;
        background: coral;
        top: 50%;
        transform: translateY(-50%);
        z-index: -1;
      }
    }
  }
  // 進度條
  .cart-progress .progress-item.active ~ .progress-item {
    &::after {
      opacity: 0.3;
    }
    .circle {
      background: #f5d1c4;
    }
    .progress-status {
      color: #bbb;
    }
  }
</style>
