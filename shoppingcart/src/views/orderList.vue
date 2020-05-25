<template>
  <div>
    <h1 class="pageTitle">客戶訂單列表</h1>
    <div class="orderList">
      <orderListItem
        v-for="item in orderListData"
        :item="item"
        :key="item.id"
        @UPDATE_ORDERLIST="updateOrderList"
      />
    </div>
  </div>
</template>
<script>
  import { Dialog } from "vant";
  import { Toast } from "vant";

  import orderListItem from "@/components/orderListItem.vue";
  export default {
    name: "orderList",
    beforeCreate() {
      let token = localStorage.getItem("Authorization");
      if (!token) {
        Dialog({ message: "請登入後台" });
        this.$router.push("/login");
      }
    },
    data() {
      return {
        orderListData: []
      };
    },
    components: {
      orderListItem
    },
    mounted() {
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
          Toast.clear();
          return res;
        },
        err => {
          // 請求錯誤
          Toast.clear();
          Toast("請求錯誤, 請稍後重試");
          console.log(err);
        }
      );
      console.log(1);
      detailInter
        .get("https://vueshopcart.herokuapp.com/orderlist")
        .then(res => {
          this.orderListData = res.data;
        })
        .catcg(err => {
          console.log(err);
        });
    },
    methods: {
      updateOrderList(id) {
        let index = this.orderListData
          .map(item => {
            return item.id;
          })
          .findIndex(item => item === id);
        this.orderListData.splice(index, 1);
      }
    }
  };
</script>
<style lang="scss">
  .orderList {
    border: 1px solid #969799;
    margin-top: 30px;
  }
</style>
