<template>
  <div>
    <div class="cart-progress">
      <div class="progress-item active">
        <span class="circle">1</span>
        <p class="progress-status">確認購物車</p>
      </div>
      <div class="progress-item">
        <span class="circle">2</span>
        <p class="progress-status">填寫資料</p>
      </div>
      <div class="progress-item">
        <span class="circle">3</span>
        <p class="progress-status">完成訂購</p>
      </div>
    </div>
    <div class="cart-list">
      <carlistitem
        v-for="(item,index) in getCartList"
        :key="item.id"
        :item="item"
        :index="index"
      />
      <div class="info">
        <p>總計金額為：<span>$ {{TotalPrice}}</span></p>
      </div>
    </div>
    <div class="btn-content">
      <van-button
        color="#c3a789"
        @click="goBack"
      >繼續購物</van-button>
      <van-button
        color="#5e3b25"
        @click="nextStep"
      >下一步</van-button>
    </div>

    <Footer />
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import Footer from "@/components/Footer.vue";
  import carlistitem from "@/components/cartListItem.vue";

  export default {
    components: {
      Footer,
      carlistitem
    },
    data() {
      return {
        cartList: []
      };
    },
    methods: {
      nextStep() {
        this.$router.push("/cart/customerInfo");
      },
      goBack() {
        this.$router.push("/");
      }
    },
    computed: {
      getCartList() {
        console.log("getcarlist");
        return this.$store.getters.getCartList;
      },

      TotalPrice() {
        return this.$store.getters.getCartListTotalPrice;
      }
    }
  };
</script>

<style lang="scss">
  .cart-list {
    padding: 2% 10%;
    margin-top: 30px;
    border: 1px solid #eee;
    .info {
      margin-top: 45px;
      text-align: right;
      span {
        color: red;
        font-size: 24px;
      }
    }
  }
  .btn-content {
    display: flex;
    justify-content: space-between;
    padding: 30px;
  }
  @media screen and (max-width: 1024px) {
    .cart-list {
      margin-top: 60px;
      padding: 2% 5%;
    }
  }
</style>
