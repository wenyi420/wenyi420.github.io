<template>
  <div class="item">
    <div class="photo">
      <a :href="'#/movies/' + movie.id">
        <img :src="movie.movieImg" />
      </a>
    </div>
    <div class="info">
      <h3 class="title">{{ movie.name }}</h3>
      <p class="time">上映日期：{{movie.time}}</p>
      <p class="price">
        售價：<span>${{ movie.price }}</span>
        <!-- <van-icon
          class="buyicon"
          name="shopping-cart"
          @click="addMovie"
        /> -->
      </p>
      <p class="desc">{{movie.content}}</p>
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
      }
    }
  };
</script>

<style scoped lang="scss">
  .item {
    width: 30%;
    position: relative;
    border: 1px solid #eee;
    margin: 0 15px 45px;
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
          height: 450px;
          object-fit: fill;
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
</style>
