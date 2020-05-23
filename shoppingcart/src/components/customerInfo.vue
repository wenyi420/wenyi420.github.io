<template>
  <div>
    <div class="cart-progress">
      <div class="progress-item ">
        <span class="circle">1</span>
        <p class="progress-status">確認購物車</p>
      </div>
      <div class="progress-item active">
        <span class="circle">2</span>
        <p class="progress-status">填寫資料</p>
      </div>
      <div class="progress-item">
        <span class="circle">3</span>
        <p class="progress-status">完成訂購</p>
      </div>
    </div>
    <div class="form-content">
      <div class="cartlist-content">
        <h3>
          本次消費總計<span class="price"> NT$ {{ getTotalPrice }}</span>
        </h3>
        <p class="showCartList" @click="showList">查看購買項目</p>
      </div>
      <div class="form-info">
        <div class="cart-list">
          <div class="item" v-for="item in getCartList" :key="item.id">
            <div class="photo">
              <img
                v-if="item.movieImg"
                :src="'https://image.tmdb.org/t/p/w500/' + item.movieImg"
                alt=""
              />
              <img
                v-else
                alt="找不到該圖片"
                src="https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
            </div>

            <p class="title">{{ item.name }}</p>

            <p class="quantity">
              <input type="text" :value="item.Quantity" disabled />
            </p>
            <p class="price">$ {{ item.price * item.Quantity }}</p>
          </div>
        </div>
        <div class="form-customerInfo">
          <h3 class="form-title">取貨人資訊</h3>
          <div class="form-list">
            <div class="item">
              <label>姓名</label>
              <input type="text" v-model="name" placeholder="輸入姓名" />
            </div>
            <div class="item">
              <label>電話</label>
              <input type="number" v-model="phone" placeholder="輸入電話" />
            </div>
            <div class="item">
              <label>信箱</label>
              <input type="text" v-model="email" placeholder="輸入信箱" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-content">
      <van-button color="#c3a789" @click="goBack">上一步</van-button>
      <van-button color="#5e3b25" @click="submitCarListInfo">送出</van-button>
    </div>
    <Footer />
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      name: "",
      phone: null,
      email: "",
    };
  },
  components: {
    Footer,
  },
  computed: {
    getCartList() {
      return this.$store.getters.getCartList;
    },
    getTotalPrice() {
      return this.$store.getters.getCartListTotalPrice;
    },
    getToday() {
      return this.getDate();
    },
  },
  methods: {
    getDate() {
      let Today = new Date();
      let year = Today.getFullYear();
      let Month =
        (Today.getMonth() + 1 < 10 ? "0" : "") + (Today.getMonth() + 1);
      let Day = (Today.getDate() < 10 ? "0" : "") + Today.getDate();
      let result = `${year}-${Month}-${Day}`;
      console.log(result);
      return result;
    },
    async submitCarListInfo() {
      try {
        // 請求攔截器添加
        let detailInter = this.$axios.create({});
        detailInter.interceptors.request.use(
          (config) => {
            // 發起請求前執行什麼
            Toast.loading({
              mask: false,
              duration: 0, // 一直存在
              forbidClick: true, //禁止點擊
              message: "加載中...",
            });
            return config;
          },
          (err) => {
            // 請求錯誤
            Toast.clear();
            Toast("請求錯誤, 請稍後重試request");
            console.log(err);
          }
        );

        // 響應攔截器
        detailInter.interceptors.response.use(
          (res) => {
            // 請求成功
            Toast.clear();
            return res.data;
          },
          (err) => {
            // 請求錯誤
            Toast.clear();
            Toast("請求錯誤, 請稍後重試responce2");
            console.log(err);
          }
        );
        const postAPI = await detailInter.post(
          "https://vueshopcart.herokuapp.com/orderlist",
          {
            time: this.getToday,
            name: this.name,
            phone: this.phone,
            email: this.email,
            movie: this.getCartList,
            totalPrice: this.getTotalPrice,
            isPay: false,
          }
        );

        console.log("post=", postAPI);
        await this.$store.commit("SET_CUSTOMER_INFO", postAPI);

        await this.$router.push("/cart/checkInfo");
      } catch (err) {
        console.log(err);
      }
    },
    goBack() {
      this.$router.push("/cart/cartlist");
    },
    showList(event) {
      event.target.classList.toggle("active");
      let carlist = document.querySelector(".cart-list");
      carlist.classList.toggle("active");
    },
  },
};
</script>
<style lang="scss" scoped>
.form-content {
  margin-top: 60px;
  .form-info {
    padding: 2% 10%;
    margin-top: 30px;
    border: 1px solid #eee;
    .cart-list {
      padding: 0px;
      margin-top: 0px;
      border: 0px;
      max-height: 0px;
      overflow: hidden;
      transition: ease 0.5s;
    }
    .cart-list.active {
      max-height: 2000px;
    }
  }
  .price {
    color: red;
  }
  .showCartList {
    font-weight: bold;
    font-size: 14px;
    margin-top: 20px;
    position: relative;
    color: #706e6c;
    display: inline-block;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      right: -25px;
      display: inline-block;
      width: 7px;
      height: 7px;
      border-left: 2px solid #706e6c;
      border-bottom: 2px solid #706e6c;
      transform: rotate(-45deg);
      margin-top: 2px;
    }
    &.active::after {
      transform: rotate(135deg);
      margin-top: 6px;
    }
  }
}
.form-customerInfo {
  text-align: left;
  .form-title {
    padding: 15px 0px;
    font-size: 20px;
    margin-top: 30px;
    border-bottom: 1px solid #eee;
  }
  .form-list {
    .item {
      padding: 20px 0px;
      display: flex;
      align-items: center;
      label {
        width: 120px;
        display: inline-block;
      }
      input {
        border: none;
        padding: 5px;

        &::placeholder {
          color: darkgray;
        }
      }
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}

.cart-list .item .quantity input {
  background: none;
  border: none;
}
</style>
