<template>
  <div class="container">
    <div class="movie-item">
      <div class="photo">
        <img
          v-if="movie.poster_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          alt=""
        />
        <img
          v-else
          alt="找不到該圖片"
          src="https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        />
      </div>
      <div class="info">
        <h3 class="title">{{ movie.title }}</h3>
        <p class="time">上映日期：{{ movie.release_date }}</p>
        <p class="desc">{{ movie.overview }}</p>
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
    <Footer />
  </div>
</template>

<script>
  import Footer from "@/components/Footer.vue";

  import Vue from "vue";
  import { Stepper } from "vant";
  import { Toast } from "vant";

  Vue.use(Toast);
  Vue.use(Stepper);
  export default {
    data() {
      return {
        movie: {},
        buyNum: 1
      };
    },
    components: {
      Footer
    },
    created() {
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
          Toast("請求錯誤, 請稍後重試request");
          console.log(err);
        }
      );

      // 響應攔截器
      detailInter.interceptors.response.use(
        res => {
          // 請求成功
          Toast.clear();
          return res.data;
        },
        err => {
          // 請求錯誤
          Toast.clear();
          Toast("請求錯誤, 請稍後重試responce2");
          console.log(err);
        }
      );

      detailInter
        .get(`https://api.themoviedb.org/3/movie/${this.$route.params.movieID}`, {
          params: {
            api_key: "ccc4da600602f73cf752066796a150b0",
            language: "zh-TW"
          }
        })
        .then(response => (this.movie = response))
        .catch(err => {
          console.log(err);
        });
    },

    computed: {},
    methods: {
      addCart() {
        this.$store.commit("ADD_MOVIE", {
          id: this.movie.id,
          name: this.movie.title,
          movieImg: this.movie.poster_path,
          price: 50,
          Quantity: this.buyNum,
          totalPrice: 50 * this.buyNum
        });
      }
    }
  };
</script>

<style lang="scss">
  .movie-item {
    display: flex;
    height: 70vh;
    justify-content: center;
    padding-top: 30px;
    .photo {
      padding-right: 40px;
      width: 50%;
      img {
        height: 60vh;
        width: 70%;
        object-fit: cover;
      }
    }
    .info {
      text-align: left;
      width: 50%;

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
  @media screen and (max-width: 1024px) {
    .movie-item {
      height: auto;
      .photo {
        padding-right: 0px;
        img {
          width: 100%;
          height: auto;
          padding-right: 30px;
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    .movie-item {
      flex-wrap: wrap;
      padding-top: 0px;
      .photo {
        width: 100%;
        img {
          padding-right: 0px;
        }
      }
      .info {
        width: 100%;
        padding: 30px 0px 60px;
      }
    }
  }
</style>
