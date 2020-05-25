<template>
  <div>
    <h1 class="pageTitle">客戶訂單列表</h1>
    <div class="orderList">
      <orderListItem
        v-for="item in orderListData"
        :item="item"
        :key="item.id"
      />
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
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
      orderListData: [],
    };
  },
  components: {
    orderListItem,
  },
  mounted() {
    console.log(1);
    this.$axios
      .get("https://vueshopcart.herokuapp.com/orderlist")
      .then((res) => {
        this.orderListData = res.data;
      })
      .catcg((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="scss">
.orderList {
  border: 1px solid #969799;
  margin-top: 30px;
}
</style>
