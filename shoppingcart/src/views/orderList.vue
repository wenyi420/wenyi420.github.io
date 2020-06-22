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

  import orderListItem from "@/components/orderListItem.vue";
  import { apiGetOrderList } from "@/apis/heroku.js";
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
    mounted() {},
    created() {
      apiGetOrderList()
        .then(res => {
          console.log(res);
          this.orderListData = res.data;
        })
        .catch(err => {
          console.log("test orderlist error", err);
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
