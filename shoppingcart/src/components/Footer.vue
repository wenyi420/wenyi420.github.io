<template>
  <div>
    <footer>
      Copyright 2020 ©電影購物作品 無商業用途
    </footer>
    <div
      id="scrollTop"
      @click="scollToTop"
      :class="{ active: hasScroll }"
    >
      <i class="el-icon-top"></i>
    </div>
  </div>
</template>
<script>
  import _ from "lodash";
  export default {
    data() {
      return {
        hasScroll: false
      };
    },
    mounted() {
      window.addEventListener(
        "scroll",
        _.throttle(() => {
          this.addScroll();
        }, 500)
      );
    },
    methods: {
      addScroll() {
        if (window.scrollY > 150) {
          this.hasScroll = true;
        } else {
          this.hasScroll = false;
        }
      },
      scollToTop() {
        window.scroll({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  };
</script>
<style lang="scss">
  footer {
    padding: 30px 0px 45px;
    margin-top: 15px;
    border-top: 1px solid #eee;
  }
  #scrollTop {
    position: fixed;
    right: 3%;
    bottom: 10%;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    background: #909399;
    color: #fff;
    font-size: 1.5rem;
    z-index: 200;
    transition: ease 0.3s;
    transform: translateY(10px);
    opacity: 0;

    &.active {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @media screen and (max-width: 414px) {
    footer {
      font-size: 14px;
    }
  }
</style>
