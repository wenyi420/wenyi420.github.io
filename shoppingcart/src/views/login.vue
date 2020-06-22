<template>
  <div>
    <div class="container">
      <h1>後台登入</h1>
      <div class="login">
        <div class="input-item">
          <p>測試帳號為：admin</p>
          <input
            type="text"
            name=""
            id="userName"
            v-model="userName"
            placeholder="UserName"
          />
        </div>
        <div class="input-item">
          <p>測試密碼為：admin123</p>
          <input
            type="text"
            name=""
            id="password"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <el-button
          type="primary"
          @click="compareData"
        >登入</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { Dialog } from "vant";
  import { Toast } from "vant";
  import { apiGetAdminUser } from "@/apis/heroku.js";
  export default {
    data() {
      return {
        userName: "",
        password: ""
      };
    },
    methods: {
      changeRouter(resData) {
        let data = resData.data[0];
        if (this.userName === data.username && this.password === data.password) {
          Toast.loading({
            mask: false,
            duration: 1, // 一直存在
            forbidClick: true, //禁止點擊
            message: "登入成功"
          });
          this.$store.commit("GET_TOKEN");
          this.$router.push("/admin/orderList");
        } else {
          Dialog({ message: "帳號或密碼輸入錯誤，請重新登入" });
          this.userName = "";
          this.password = "";
        }
      },
      async compareData() {
        try {
          let resData = await apiGetAdminUser();
          await this.changeRouter(resData);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .login {
    max-width: 300px;
    margin: 30px auto 0px;
    .input-item {
      padding-bottom: 15px;
      p {
        text-align: left;
        padding-bottom: 5px;
      }
      input {
        border: 1px solid #ced4da;
        padding: 10px;
        border-radius: 5px;
        display: block;
        width: 100%;
        color: #a0a4a9;
        &::placeholder {
          color: #ced4da;
          font-weight: bold;
        }
      }
    }
  }
</style>
