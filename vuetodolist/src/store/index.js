import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const filter ={
  all(todos){
    return todos.filter((todo)=>{
      return todo
    })
  },
  doing(todos){
    return todos.filter(todo=>{
      return !todo.complete
    })
  },
  complete(todos){
    return todos.filter(todo=>{
      return todo.complete
    })
  }
}

export default new Vuex.Store({
  state: {
    todoStatus:'all',
    todos:[
      {
        content:'待辦1',
        complete:false,
        date:'2019-01-01(一)',
        edit:false,
      },
      {
        content:'待辦2',
        complete:true,
        date:'2019-01-01(一)',
        edit:false
      },
      {
        content:'待辦3',
        complete:false,
        date:'2019-01-01(一)',
        edit:false,
      },
    ]
  },
  mutations: {
    ADD_TODO(state, payload){
      state.todos.push(payload);
    },
    UPDATE_TODO_STATUS(state,status){
      state.todoStatus = status;
    },
    TOGGLE_COMPLETE(state,payload){
      state.todos[payload.index].complete = payload.data.complete
    },
    DELETE_TODO(state,index){
      state.todos.splice(index, 1);
    },
    EDIT_TODO(state, payload){
      let todo = state.todos[payload.index];
      todo.content = payload.data.content;
      todo.edit = payload.data.edit
    }
   
    
  },
  actions: {
  },
  modules: {
  },
  getters:{
    TodoIndex(state){
      return filter[state.todoStatus](state.todos).map((todo)=>{
        return state.todos.indexOf(todo)
      })
    },
    // 取得 全部、進行中、完成後 呈現到 todoList
    allLength(state){
      return filter['all'](state.todos).length
    },
    doingLength(state){
      return filter['doing'](state.todos).length
    },
    completeLength(state){
      return filter['complete'](state.todos).length
    },
  }
})
