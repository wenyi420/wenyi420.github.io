import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const USE_LOCALSTORAGE = {
  load() {
    return JSON.parse(
      localStorage.getItem("todos") ||
        '[{"content": "待辦一", "complete": false, "date": "2020.01.01(一)", "edit": false},{"content": "待辦二", "complete": true, "date": "2020.01.01(一)", "edit": false}]'
    );
  },
  save(data) {
    localStorage.setItem("todos", JSON.stringify(data));
  },
};

const filter = {
  all(todos) {
    return todos.filter((todo) => {
      return todo;
    });
  },
  doing(todos) {
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
  state: {
    todoStatus: "all",
    todos: [],
  },
  mutations: {
    SET_TODOS(state, payload) {
      state.todos = payload;
      USE_LOCALSTORAGE.save(state.todos);
    },
    ADD_TODO(state, payload) {
      state.todos.push(payload);
      USE_LOCALSTORAGE.save(state.todos);
    },
    UPDATE_TODO_STATUS(state, status) {
      state.todoStatus = status;
    },
    TOGGLE_COMPLETE(state, payload) {
      state.todos[payload.index].complete = payload.data.complete;
      USE_LOCALSTORAGE.save(state.todos);
    },
    DELETE_TODO(state, index) {
      state.todos.splice(index, 1);
      USE_LOCALSTORAGE.save(state.todos);
    },
    EDIT_TODO(state, payload) {
      let todo = state.todos[payload.index];
      todo.content = payload.data.content;
      todo.edit = payload.data.edit;
      USE_LOCALSTORAGE.save(state.todos);
    },
  },
  actions: {
    // 一開始從 localstorage 撈資料
    INIT_TODOS({ commit }) {
      // load LS
      commit("SET_TODOS", USE_LOCALSTORAGE.load());
    },
  },
  modules: {},
  getters: {
    TodoIndex(state) {
      return filter[state.todoStatus](state.todos).map((todo) => {
        return state.todos.indexOf(todo);
      });
    },
    // 取得 全部、進行中、完成後 呈現到 todoList
    allLength(state) {
      return filter["all"](state.todos).length;
    },
    doingLength(state) {
      return filter["doing"](state.todos).length;
    },
    completeLength(state) {
      return filter["complete"](state.todos).length;
    },
  },
});
