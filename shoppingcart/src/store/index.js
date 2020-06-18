import Vue from "vue";
import Vuex from "vuex";
import { Toast } from "vant";
import VueRouter from "vue-router";

Vue.use(Vuex);
Vue.use(VueRouter);

export default new Vuex.Store({
  state: {
    
    cartList: [],
    customerInfo: {},
    hasOrder: false,
    detail: null,
    Authorization: localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : "",
  },
  mutations: {
    ADD_MOVIE(state, payload) {
      state.cartList.push(payload);
      Toast.success("已成功加入購物車");
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
      state.hasOrder = true;
    },
    GET_TOKEN(state) {
      let token = parseInt(Math.random() * 100);
      state.Authorization = token;

      localStorage.setItem("Authorization", token);
    },
    CANCLE_HASORDER(state) {
      state.hasOrder = false;
    },
  },
  getters: {
    getCartNum(state) {
      return state.cartList.length;
    },
    getCartList(state) {
      return state.cartList;
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
  },
  actions: {},
  modules: {},
});
