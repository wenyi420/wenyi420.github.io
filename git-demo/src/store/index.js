import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import parkinfo from "../assets/parkinfo.json";
export default new Vuex.Store({
  state: {
    parkinfo,
    selectArea: "鼓山區",
    selectType: "平面",
  },
  mutations: {
    CHANGE_DATA(state, changedata) {
      state.selectArea = changedata.selectArea;
      state.selectType = changedata.selectType;
    },
  },
  actions: {
    uploadData({ commit }, changedata) {
      commit("CHANGE_DATA", changedata);
    },
  },
  modules: {},
  getters: {
    loadParkingData(state) {
      return state.parkinfo.filter((item) => {
        if (state.selectArea == item.area) {
          return state.selectType == item.type;
        }
      });
    },
  },
});
