import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// localStorage 存取工具
const LS = {
  load() {
    return JSON.parse(localStorage.getItem("vue-todo") || "[]");
  },
  save(data) {
    localStorage.setItem("vue-todo", JSON.stringify(data));
  },
};

// 篩選資料
const filter = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter((todo) => {
      return !todo.complete;
    });
  },
  complete(todos) {
    return todos.filter((todo) => {
      return todo.complete;
    });
  },
};

export default new Vuex.Store({
  strict: true,
  state: {
    todos: [
      {
        content: "todo-content",
        complete: false,
      },
      {
        content: "todo-content",
        complete: true,
      },
      {
        content: "todo-content",
        complete: false,
      },
    ],
  },
  getters: {
    //處理 index
    todoIndex(state) {
      // [state.route.name] 表示三種狀態 呼叫 filter 的 all() active() complete()
      // 取得資料後再透過 map 處理  只需要他的 index 此為 state.todo的
      return filter[state.route.name](state.todos).map((todo) =>
        state.todos.indexOf(todo)
      );
    },
  },
  mutations: {
    SET_TODOS(state, data) {
      state.todos = data;
      // save LS
      LS.save(state.todos);
    },
    ADD_TODO(state, data) {
      state.todos.push(data);
      // 寫入 localStorage
      LS.save(state.todos);
    },
    UPDATE_TODO(state, { index, data }) {
      state.todos[index] = data;
      LS.save(state.todos);
    },
    REMOVE_TODO(state, index) {
      state.todos.splice(index, 1);
      LS.save(state.todos);
    },
  },
  actions: {
    // 一開始從 localstorage 撈資料
    INIT_TODOS({ commit }) {
      // load LS
      commit("SET_TODOS", LS.load());
    },
  },
  modules: {},
});
