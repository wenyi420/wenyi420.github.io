<template>
  <div>
    <div class="cart-progress">
      <div class="progress-item ">
        <span class="circle">1</span>
        <p class="progress-status">確認購物車</p>
      </div>
      <div class="progress-item">
        <span class="circle">2</span>
        <p class="progress-status">填寫資料</p>
      </div>
      <div class="progress-item active">
        <span class="circle">3</span>
        <p class="progress-status">完成訂購</p>
      </div>
    </div>
    <div class="checkInfo">
      <h2>已成功訂購</h2>
      <h3 class="customer">訂購人資料</h3>
      <div class="info">
        <p class="item">
          <span class="title">訂購日期：</span><span>{{ CustomerInfo.time }}</span>
        </p>
        <p class="item">
          <span class="title">姓名：</span><span>{{ CustomerInfo.name }}</span>
        </p>
        <p class="item">
          <span class="title">電話：</span><span>{{ CustomerInfo.phone }}</span>
        </p>
        <p class="item">
          <span class="title">信箱：</span><span>{{ CustomerInfo.email }}</span>
        </p>
      </div>
    </div>
    <van-button
      type="primary"
      @click="goHome"
    >繼續選購</van-button>
    <Footer />
  </div>
</template>

<script>
  import Footer from "@/components/Footer.vue";
  export default {
    components: {
      Footer
    },
    computed: {
      CustomerInfo() {
        return this.$store.getters.getCustomerInfo;
      }
    },
    beforeCreate() {
      let hasOrder = this.$store.state.hasOrder;
      if (!hasOrder) {
        this.$router.push("/cart/cartList");
      }
    },
    methods: {
      goHome() {
        this.$store.commit("CANCLE_HASORDER");
        this.$router.push("/");
      }
    }
  };
</script>

<style lang="scss">
  .checkInfo {
    margin: 40px 0px;
    h2 {
      margin-bottom: 30px;
    }
    .info {
      max-width: 480px;
      margin: 20px auto 0px;
      border: 1px solid #eee;
      border-radius: 3px;
      padding: 4% 4%;
      box-shadow: -1px -1px 10px 0px #eee;
      .item {
        padding: 15px 0px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 82%;
        margin: 0 auto;
        .title {
          padding-right: 15px;
          width: 120px;
          text-align: left;
          font-weight: bold;
        }
      }
      .item + .item {
        border-top: 1px solid #eee;
      }
    }
  }
</style>
