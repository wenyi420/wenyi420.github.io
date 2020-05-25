<template>
  <div class="item">
    <div class="photo item-left">
      <img
        v-if="item.movieImg"
        :src="'https://image.tmdb.org/t/p/w500/' + item.movieImg"
        alt=""
      />
      <img
        v-else
        alt="找不到該圖片"
        src="https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
    </div>
    <div class="item-right">
      <p class="title">{{ item.name }}</p>
      <p class="quantity">
        <span class="quantity-btn decrease" @click="changeAmount">-</span>
        <input type="text" :value="item.Quantity" disabled />
        <span class="quantity-btn increase" @click="changeAmount">+</span>
      </p>
      <p class="price">$ {{ item.price * item.Quantity }}</p>
      <!-- <van-icon
        class="
        delete"
        name="cross"
        @click="deleteCartItem"
      /> -->
      <van-icon
        name="clear"
        class="
        delete"
        @click="deleteCartItem"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "editOrderMovie",
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      require: true,
    },
  },
  methods: {
    changeAmount(event) {
      let $vue = this.item;
      if (event.target.classList.contains("decrease")) {
        if ($vue.Quantity === 1) return;
        $vue.Quantity--;
      }
      if (event.target.classList.contains("increase")) {
        $vue.Quantity++;
      }

      let total = $vue.Quantity * $vue.price;

      this.$emit("CHANGE_AMOUNT", {
        index: this.index,
        Quantity: $vue.Quantity,
        totalPrice: total,
      });
      // this.$store.commit("CHANGE_AMOUNT", {
      //   id: $vue.id,
      //   Quantity: $vue.Quantity,
      //   totalPrice: total
      // });
    },
    deleteCartItem() {
      console.log("index", this.index);
      this.$emit("DELETE_MOVIE", this.index);
    },
  },
};
</script>

<style lang="scss" scroped>
.cart-list .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  margin-top: 15px;

  .photo {
    img {
      width: 120px;
    }
  }
  .item-right {
    display: flex;
    width: 100%;
    padding-left: 15px;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 28px;
      width: 25%;
    }
    .price {
      font-size: 24px;
      color: red;
    }
    .delete {
      font-size: 26px;
      cursor: pointer;
      padding: 7px;
    }
    .quantity {
      display: flex;
      align-items: center;
      input {
        border: 0px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        height: 34px;
        width: 35px;
        text-align: center;
      }

      .quantity-btn {
        display: inline-block;
        width: 30px;
        height: 34px;
        line-height: 34px;
        cursor: pointer;
        border: 1px solid #eee;
        font-size: 22px;
        &:hover {
          border-color: #706e6c;
        }
        &.increase {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        &.decrease {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }
    }
  }
}
.item + .item {
  border-top: 1px solid #eee;
}

@media screen and (max-width: 540px) {
  .cart-list .item {
    align-items: flex-start;
    padding-top: 25px;
    margin-top: 25px;
    .item-right {
      padding-left: 30px;
      flex-wrap: wrap;
      position: relative;
      .delete,
      .price,
      .quantity {
        width: 100%;
      }
      .title {
        width: 80%;
        font-size: 24px;
        padding-right: 10px;
      }
      .title,
      .price {
        text-align: left;
      }
      .quantity {
        justify-content: flex-start;
        padding: 15px 0px;
      }
      .delete {
        position: absolute;
        right: 0px;
        top: 0px;
        font-size: 36px;
        text-align: right;
      }
    }
  }
}
</style>
