import Vue from "vue";
import Vuex from "vuex";
import { Toast } from "vant";
import VueRouter from "vue-router";

Vue.use(Vuex);
Vue.use(VueRouter);
export default new Vuex.Store({
  state: {
    movieList: [],
    cartList: [],
    customerInfo: {},
    searchTag: "all",
    searchName: "",
    detail: null,
  },
  mutations: {
    ADD_MOVIE(state, payload) {
      state.cartList.push(payload);
      Toast.success("已成功加入購物車");
    },
    Get_Movie_List(state) {
      Vue.axios
        .get("https://vueshopcart.herokuapp.com/movies")
        .then((res) => {
          console.log("movielist為:", res.data);
          state.movieList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Get_Movie_TAG_List(state, tag) {
      state.searchTag = tag;
    },
    Get_Movie_DETAIL(state, id) {
      state.detail = "";
      Vue.axios
        .get("https://vueshopcart.herokuapp.com/movies", {
          params: {
            id: id,
          },
        })
        .then((res) => {
          state.movieList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    CHANGE_AMOUNT(state, payload) {
      state.cartList.filter((item) => {
        if (item.id === payload.id) {
          item.totalPrice = payload.totalPrice;
          item.Quantity = payload.Quantity;
        }
      });
    },
    DELETE_CART_ITEM(state, index) {
      state.cartList.splice(index, 1);
    },
    SET_CUSTOMER_INFO(state, payload) {
      console.log("payload=", payload);
      state.customerInfo = {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        time: payload.time,
      };
      // 清空購物車
      state.cartList = [];
    },
    SEARCH_MOVIES(state, name) {
      state.searchTag = "";
      state.searchName = name;
    },
  },
  getters: {
    getCartNum(state) {
      return state.cartList.length;
    },
    getCartList(state) {
      return state.cartList;
    },
    getMovieList(state) {
      console.log("執行getter");
      return state.movieList;
    },
    getMovieDetail(state) {
      console.log("detail geter");
      return state.detail;
    },
    getCartListTotalPrice(state) {
      return state.cartList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.totalPrice;
      }, 0);
    },
    getCustomerInfo(state) {
      return state.customerInfo;
    },
    getFilterTag(state) {
      return state.movieList.filter((item) => {
        if (state.searchTag == "") {
          return item.name.includes(state.searchName);
        }
        if (state.searchTag == "all") {
          return state.movieList;
        }
        return item.tag == state.searchTag;
      });
    },
  },
  actions: {},
  modules: {},
});
