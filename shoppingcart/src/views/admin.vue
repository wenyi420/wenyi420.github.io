<template>
  <div class="container">
    <router-view />
  </div>
</template>
<script>
import { Dialog } from "vant";

export default {
  beforeCreate() {
    let token = localStorage.getItem("Authorization");
    if (!token) {
      Dialog({ message: "請登入後台" });
      this.$router.push("/login");
    }
  },
};
</script>
