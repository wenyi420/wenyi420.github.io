<template>
  <div id="app">
    <div id="nav">
      <a class="logo" href="javascript:;" @click="goHome">MOVIE SHOP</a>
      <div class="nav-right">
        <router-link to="/">首頁</router-link>
        <router-link to="/admin/orderList">後台管理</router-link>
        <button class="icon">
          <van-icon
            name="shopping-cart chat-o"
            :badge="getNum"
            @click="goToCart"
          />
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);
export default {
  data() {
    return {
      cartNum: 0,
    };
  },
  computed: {
    getNum() {
      return this.$store.getters.getCartNum;
    },
  },
  methods: {
    goToCart() {
      this.$router.push("/cart/cartList");
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
p,
span,
div {
  font-family: "微軟正黑體";
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
img {
  max-width: 100%;
}

.container {
  width: 980px;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 120px;
}

#nav {
  z-index: 99;
  padding: 25px 10%;
  position: fixed;
  top: 0px;
  width: 100%;
  background: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-weight: bold;
    color: #fff;
    margin: 0 15px;
    position: relative;
    &.icon {
      font-size: 25px;
    }
    &.router-link-exact-active {
      color: #42b983;
    }
    .buynum {
      position: absolute;
      right: -10px;
      bottom: -5px;
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: red;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .nav-right {
    display: flex;
    align-items: center;
    .icon {
      background: none;
      border: none;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
      &:hover {
        i {
          color: #42b983;
        }
      }
    }
  }
  .logo {
    font-size: 28px;
  }
}
@media screen and (max-width: 1024px) {
  #nav {
    padding: 25px 5%;
  }
  .container {
    width: 90%;
  }
}
@media screen and (max-width: 940px) {
  #app {
    padding-top: 100px;
  }
  #nav .logo {
    margin: 0px;
  }
}
</style>
