<template>
  <div>
    <h1 class="pageTitle">編輯訂單</h1>
    <div class="editList">
      <b-container fluid>
        <b-row class="my-3">
          <b-col
            sm="2"
            lg="1"
            class="inputLabel"
          >
            <label>姓名</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="name"
              :value="orderData.name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col
            sm="2"
            lg="1"
            class="inputLabel"
          >
            <label>電話</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="phone"
              :value="orderData.phone"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col
            sm="2"
            lg="1"
            class="inputLabel"
          >
            <label>信箱</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="email"
              :value="orderData.email"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col
            sm="2"
            lg="1"
            class="inputLabel"
          >
            <label>狀態</label>
          </b-col>
          <b-col
            sm="6"
            class="radio-content"
          >
            <b-form-radio
              class="radio-item"
              v-model="orderData.isPay"
              name="some-radios"
              :value="true"
            >已付款</b-form-radio>
            <b-form-radio
              class="radio-item"
              v-model="orderData.isPay"
              name="some-radios"
              :value="false"
            >未付款</b-form-radio>
          </b-col>
        </b-row>
      </b-container>
      <div class="cart-list">
        <editOrderMovies
          v-for="(item, index) in orderMovieList"
          :key="item.id"
          :item="item"
          :index="index"
          @DELETE_MOVIE="deleteHanlder"
          @CHANGE_AMOUNT="changeAmountHandler"
        />
      </div>
      <div class="btn-list">
        <b-button
          class="btn"
          variant="secondary"
          @click="goToBack"
        >返回</b-button>
        <b-button
          class="btn"
          variant="success"
          @click="editUpdate"
        >送出</b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from "vant";

  import editOrderMovies from "@/components/editOrderMovies.vue";

  export default {
    name: "editOrder",
    data() {
      return {
        orderData: {},
        orderMovieList: []
      };
    },
    components: {
      editOrderMovies
    },

    created() {
      this.$axios
        .get(
          `https://vueshopcart.herokuapp.com/orderlist/${this.$route.params.orderID}`
        )
        .then(res => {
          console.log("已取得", res);
          this.orderData = res.data;
          this.orderMovieList = res.data.movie;
        })
        .catcg(err => {
          console.log(err);
        });
    },
    methods: {
      deleteHanlder(index) {
        this.orderMovieList.splice(index, 1);
      },
      changeAmountHandler(obj) {
        console.log("emit obj =", obj);
        let theMoive = this.orderMovieList[obj.index];
        theMoive.Quantity = obj.Quantity;
        theMoive.totalPrice = obj.totalPrice;
        //   this.orderData.totalPrice =
      },
      editUpdate() {
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let phone = document.querySelector("#phone").value;

        this.orderData.name = name;
        this.orderData.email = email;
        this.orderData.phone = phone;
        //   this.orderData.totalPrice = this.getTotalPrice;
        // 請求攔截器添加
        let detailInter = this.$axios.create({});
        detailInter.interceptors.request.use(
          config => {
            // 發起請求前執行什麼
            Toast.loading({
              mask: false,
              duration: 0, // 一直存在
              forbidClick: true, //禁止點擊
              message: "加載中..."
            });
            return config;
          },
          err => {
            // 請求錯誤
            Toast.clear();
            Toast("請求錯誤, 請稍後重試");
            console.log(err);
          }
        );

        // 響應攔截器
        detailInter.interceptors.response.use(
          res => {
            // 請求成功
            Toast.loading({
              mask: false,
              duration: 1, // 一直存在
              forbidClick: true, //禁止點擊
              message: "修改成功"
            });
            return res;
          },
          err => {
            // 請求錯誤
            Toast.clear();
            Toast("請求錯誤, 請稍後重試");
            console.log(err);
          }
        );
        detailInter
          .patch(
            `https://vueshopcart.herokuapp.com/orderlist/${this.$route.params.orderID}`,
            this.orderData
          )
          .then(res => {
            console.log(res);
            this.$router.push("/admin/orderList");
          })
          .catcg(err => {
            console.log(err);
          });
      },
      goToBack() {
        this.$router.push("/admin/orderList");
      }
    },
    computed: {
      getTotalPrice() {
        return this.orderMovieList
          .map(item => {
            return item.totalPrice;
          })
          .reduce((a, b) => {
            return a + b;
          }, 0);
      }
    },
    watch: {
      getTotalPrice() {
        console.log("totalpirce已改變");
        this.orderData.totalPrice = this.getTotalPrice;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .editList {
    margin-top: 30px;
    .inputLabel {
      text-align: left;
      label {
        width: 100%;
        display: inline-block;
        text-align: justify;
        text-align-last: justify;
      }
    }

    .radio-content {
      display: flex;
      .radio-item {
        padding-right: 15px;
      }
    }
  }

  .btn-list {
    display: flex;
    justify-content: flex-end;
    padding: 30px 0px;
    .btn {
      margin: 0px 5px;
    }
  }
  .cart-list .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    margin-top: 15px;

    .photo {
      img {
        width: 120px;
      }
    }
    .item-right {
      display: flex;
      width: 100%;
      padding-left: 15px;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 28px;
        width: 25%;
      }
      .price {
        font-size: 24px;
        color: red;
      }
      .delete {
        font-size: 26px;
        cursor: pointer;
        padding: 7px;
      }
      .quantity {
        display: flex;
        align-items: center;
        input {
          border: 0px;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          height: 34px;
          width: 35px;
          text-align: center;
        }

        .quantity-btn {
          display: inline-block;
          width: 30px;
          height: 34px;
          line-height: 34px;
          cursor: pointer;
          border: 1px solid #eee;
          font-size: 22px;
          &:hover {
            border-color: #706e6c;
          }
          &.increase {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          &.decrease {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
        }
      }
    }
  }
  .item + .item {
    border-top: 1px solid #eee;
  }
  @media screen and (max-width: 575px) {
    .editList .inputLabel {
      label {
        text-align-last: unset;
        padding-left: 5px;
      }
    }
    .editList .radio-content {
      padding-left: 20px;
    }
  }
  @media screen and (max-width: 540px) {
    .cart-list .item {
      align-items: flex-start;
      padding-top: 25px;
      margin-top: 25px;
      .item-right {
        padding-left: 30px;
        flex-wrap: wrap;
        position: relative;
        .delete,
        .price,
        .quantity {
          width: 100%;
        }
        .title {
          width: 80%;
          font-size: 24px;
          padding-right: 10px;
        }
        .title,
        .price {
          text-align: left;
        }
        .quantity {
          justify-content: flex-start;
          padding: 15px 0px;
        }
        .delete {
          position: absolute;
          right: 0px;
          top: 0px;
          font-size: 36px;
          text-align: right;
        }
      }
    }
  }
</style>
