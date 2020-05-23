import Vue from "vue";
import Vuex from "vuex";
import { Toast } from "vant";
import VueRouter from "vue-router";
import axios from "axios";

Vue.use(Vuex);
Vue.use(VueRouter);

const apiKey = "ccc4da600602f73cf752066796a150b0";
const baseURL = "https://api.themoviedb.org/3";

let DeallInter = axios.create({});
DeallInter.interceptors.request.use(
  (config) => {
    // 發起請求前執行什麼
    Toast.loading({
      mask: false,
      duration: 0, // 一直存在
      forbidClick: true, //禁止點擊
      message: "加載中...",
    });
    return config;
  },
  (err) => {
    // 請求錯誤
    Toast.clear();
    Toast("請求錯誤, 請稍後重試request");
    console.log(err);
  }
);

// 響應攔截器
DeallInter.interceptors.response.use(
  (res) => {
    // 請求成功
    Toast.clear();
    return res;
  },
  (err) => {
    // 請求錯誤
    Toast.clear();
    Toast("請求錯誤, 請稍後重試responce2");
    console.log(err);
  }
);

export default new Vuex.Store({
  state: {
    movieList: [],
    cartList: [],
    tagList: [],
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
      DeallInter.get(`${baseURL}/discover/movie`, {
        params: {
          api_key: apiKey,
          language: "zh-TW",
          sort_by: "popularity.desc",
          page: 1,
        },
      })
        .then((res) => {
          state.movieList = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    GET_TAGS(state) {
      axios
        .get(`${baseURL}/genre/movie/list`, {
          params: {
            api_key: apiKey,
            language: "zh-TW",
          },
        })
        .then((res) => {
          state.tagList = res.data.genres;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    Get_Movie_TAG_List(state, tag) {
      // state.searchTag = tag;
      DeallInter.get(`${baseURL}/discover/movie`, {
        params: {
          api_key: apiKey,
          sort_by: "popularity.desc",
          page: 1,
          with_genres: tag,
          language: "zh-TW",
        },
      })
        .then((res) => {
          state.movieList = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    SEARCH_MOVIES(state, name) {
      DeallInter.get(`${baseURL}/search/movie`, {
        params: {
          api_key: apiKey,
          language: "zh-TW",
          query: name,
        },
      })
        .then((res) => {
          state.movieList = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Get_Movie_DETAIL(state, id) {
      state.detail = "";
      axios
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
    getTagList(state) {
      return state.tagList;
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
        // if (state.searchTag == "") {
        //   return item.name.includes(state.searchName);
        // }
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
