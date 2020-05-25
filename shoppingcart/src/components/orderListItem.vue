<template>
  <div class="item">
    <div class="item-col item-col-2 time">
      <label class="title">日期</label>
      <p class="content">{{ item.time }}</p>
    </div>
    <div class="item-col item-col-4 name">
      <label class="title">姓名</label>
      <p class="content">{{ item.name }}</p>
    </div>
    <div class="item-col item-col-3 phone">
      <label class="title">電話</label>
      <p class="content">{{ item.phone }}</p>
    </div>
    <div class="item-col item-col-3 email">
      <label class="title">信箱</label>
      <p class="content">{{ item.email }}</p>
    </div>

    <div class="item-col item-col-2 totalPrice">
      <label class="title">總金額</label>
      <p class="content">{{ item.totalPrice }}</p>
    </div>
    <div class="item-col item-col-2 payStatus">
      <label class="title">狀態</label>
      <p class="content">
        <span
          v-if="item.isPay"
          class="text-success"
        >已付款</span>
        <span
          v-else
          class="text-danger"
        >未付款</span>
      </p>
    </div>
    <div class="item-col item-col-2 edit">
      <label class="title">編輯訂單</label>
      <p class="content">
        <span
          class="btn edit"
          @click="goEditPage"
        >詳細</span>
      </p>
    </div>
    <div class="item-col item-col-2 delete">
      <label class="title">刪除訂單</label>
      <p class="content">
        <span
          class="btn delete"
          @click="deleteOrder"
        >刪除</span>
      </p>
    </div>
  </div>
</template>
<script>
  import { Toast } from "vant";

  export default {
    name: "orderListItem",
    data() {
      return {};
    },
    props: {
      item: {
        type: Object,
        require: true
      }
    },

    methods: {
      goEditPage() {
        this.$router.push(`/admin/editOrder/${this.item.id}`);
      },
      deleteOrder() {
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
              message: "刪除成功"
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
        let id = this.item.id;

        detailInter
          .delete(`https://vueshopcart.herokuapp.com/orderlist/${id}`)
          .then(res => {
            this.$emit("UPDATE_ORDERLIST", id);
            console.log("刪除成功", res);
          })
          .catch(err => {
            console.log("刪除失敗", err);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .item-col-1 {
    width: 5%;
  }
  .item-col-2 {
    width: 10%;
  }
  .item-col-3 {
    width: 15%;
  }
  .item-col-4 {
    width: 25%;
  }
  .item-col-5 {
    width: 25%;
  }
  .item-col-6 {
    width: 30%;
  }

  .orderList {
    display: flex;
    flex-wrap: wrap;
    .item {
      display: flex;
      width: 100%;
      justify-content: center;
      .item-col {
        .title {
          background: #969799;
          display: block;
          width: 100%;
          padding: 10px 0px;
          color: #fff;
          /* margin-bottom: 15px; */
          margin: 0px;
        }
        .content {
          margin: 0px;
          width: 100%;
          padding: 10px 0px;
          .btn {
            display: block;
            padding: 5px;
            background: #42b983;
            width: 75%;
            margin: 0 auto;
            border-radius: 5px;
            color: #fff;
            opacity: 0.8;
            transition: ease 0.3s;
            cursor: pointer;
            font-size: 14px;
            &:hover {
              opacity: 1;
            }
            &.delete {
              background: red;
            }
          }
        }
      }
      .item-col + .item-.col {
        border-left: 1px solid #eee;
      }
      .movie-item {
        padding-bottom: 15px;

        .content {
          padding: 0px 10px 7px;
          text-align: left;
        }
        .content + .content {
          border-top: 1px solid #eee;
          padding-top: 7px;
        }
      }
    }
    .item + .item {
      padding-top: 5px;
      .title {
        display: none;
      }
    }
    .item:nth-child(2n) {
      background: #eee;
    }
  }
  @media screen and (min-width: 769px) and (max-width: 920px) {
    .item-col-2 {
      width: 15%;
    }
    .orderList .item .email {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .orderList .item {
      flex-wrap: wrap;
      .item-col {
        display: flex;
        width: 100%;
        .title {
          width: 120px;
        }
      }
    }
    .orderList .item + .item {
      padding-top: 0px;
      .title {
        display: block;
      }
    }
  }
</style>
