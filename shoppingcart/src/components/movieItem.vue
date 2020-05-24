<template>
  <div class="item">
    <div class="photo">
      <a :href="'#/movies/' + movie.id">
        <img
          v-if="movie.poster_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
        />
        <img
          v-else
          alt="找不到該圖片"
          src="https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        />
      </a>
    </div>
    <div class="info">
      <h3 class="title">{{ movie.title }}</h3>
      <p class="time">上映日期：{{ movie.release_date }}</p>
      <p class="price">
        售價：<span>$ 50</span>
        <!-- <van-icon
          class="buyicon"
          name="shopping-cart"
          @click="addMovie"
        /> -->
      </p>
      <div class="desc">
        <p v-if="movie.overview !== ''">{{ movie.overview }}</p>
        <p
          v-else
          class="noDesc"
        >無相關資料</p>
      </div>
      <div class="btn">
        <van-button
          type="warning"
          @click="goPage"
        >詳細內容</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      movie: {
        type: Object,
        required: true
      }
    },

    methods: {
      // addMovie() {
      //   console.log(this.movie.id);
      //   this.$store.commit("ADD_MOVIE", {
      //     id: this.movie.id,
      //     name: this.movie.name,
      //     price: this.movie.price,
      //     totalPrice: this.movie.price,
      //     Quantity: 1,
      //     movieImg: this.movie.movieImg
      //   });
      // }
      goPage() {
        this.$router.push(`/movies/${this.movie.id}`);
      },
      replaceByDefault() {
        // console.log("showerrImg");
        // e.target.src =
        //   "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500";
        console.log("Image failed to load");
      }
    }
  };
</script>

<style scoped lang="scss">
  .item {
    width: 33.3333333%;
    position: relative;
    padding: 0 15px 45px;
    .photo {
      a {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 0;
          transition: ease 0.3s;
          z-index: 1;
        }

        img {
          display: block;
          height: 500px;
          object-fit: cover;
          width: 100%;
        }

        &:hover::before {
          opacity: 0.4;
        }
      }
    }

    .info {
      text-align: left;
      padding: 10px 15px;
      border: 1px solid #eee;
      .title {
        text-align: left;
        font-size: 20px;
        letter-spacing: 1px;
      }
      .time {
        padding: 10px 0px;
      }
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin: 15px 0px;
      }
      .noDesc {
        height: 43px;
      }
      .price {
        text-align: right;
        display: flex;
        align-items: center;
        span {
          font-size: 24px;
          color: red;
        }
      }
      .btn {
        text-align: right;
      }
    }
  }

  @media screen and (max-width: 1580px) {
    .item .photo a img {
      height: 400px;
    }
  }
  @media screen and (max-width: 1280px) {
    .item .photo a img {
      height: 300px;
    }
  }

  @media screen and (max-width: 1024px) {
    .item {
      width: 50%;
      .photo a img {
        height: 400px;
      }
    }
  }
  @media screen and (max-width: 414px) {
    .item {
      padding: 0 5px 45px;
      .info {
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time {
          display: none;
        }
      }
      .photo a img {
        height: 270px;
      }
    }
  }
</style>
