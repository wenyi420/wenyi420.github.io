<template>
  <div class="container">
    <div
      class="movie-item"
      v-for="m in movie"
      :m="m"
      :key="m.id"
    >
      <div class="photo">
        <img
          :src="m.movieImg"
          alt=""
        />
      </div>
      <div class="info">
        <h3 class="title">{{ m.name }}</h3>
        <p class="time">上映日期：{{ m.time }}</p>
        <p class="desc">{{ m.content }}</p>
        <div class="count">
          <span>數量：</span>
          <van-stepper
            v-model="buyNum"
            step="1"
          />
        </div>
        <van-button
          type="warning"
          @click="addCart"
        >加入購物車</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { Stepper } from "vant";

  Vue.use(Stepper);
  export default {
    data() {
      return {
        id: null,
        movie: null,
        buyNum: 1
      };
    },
    mounted() {
      this.id = this.$route.params.movieID; // 取得動態id值
      Vue.axios
        .get("https://vueshopcart.herokuapp.com/movies", {
          params: {
            id: this.id
          }
        })
        .then(response => (this.movie = response.data));
    },

    computed: {},
    methods: {
      addCart() {
        this.$store.commit("ADD_MOVIE", {
          id: this.movie[0].id,
          name: this.movie[0].name,
          movieImg: this.movie[0].movieImg,
          price: this.movie[0].price,
          Quantity: this.buyNum,
          totalPrice: this.movie[0].price * this.buyNum
        });
      }
    }
  };
</script>

<style lang="scss">
  .container {
    width: 980px;
    margin: 0 auto;
  }
  .movie-item {
    display: flex;
    justify-content: center;
    .photo {
      width: 50%;
      img {
        height: 60vh;
      }
    }
    .info {
      text-align: left;
      width: 50%;
      padding: 5% 0%;

      .title {
        font-size: 34px;
      }
      .time {
        padding: 15px 0px;
      }
      .desc {
        letter-spacing: 1px;
        line-height: 1.3;
      }
      .count {
        display: flex;
        padding: 15px 0px;
        align-items: center;
      }
    }
  }
</style>
