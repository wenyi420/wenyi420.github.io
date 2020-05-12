<template>
  <div class="todo-input">
    <input
      v-focus
      type="text"
      placeholder="請輸入待辦事項.."
      v-model.trim="todo"
      @keyup.enter="addTodo"
    >
    <button @click="addTodo">新增</button>
  </div>
</template>

<script>
  const Today = new Date();
  const Year = Today.getFullYear();
  const Month = (Today.getMonth() + 1 < 10 ? "0" : "") + (Today.getMonth() + 1);
  const Dates = (Today.getDate() < 10 ? "0" : "") + Today.getDate();
  const Day = Today.getDay();
  const DaysArr = ["日", "一", "二", "三", "四", "五", "六"];
  export default {
    data() {
      return {
        todo: ""
      };
    },
    methods: {
      addTodo() {
        if (this.todo) {
          this.$store.commit("ADD_TODO", {
            content: this.todo,
            complete: false,
            date: `${Year}.${Month}.${Dates}(${DaysArr[Day]})`,
            edit: false
          });
          this.todo = "";
        }
      }
    }
  };
</script>

<style lang="scss">
  .todo-input {
    text-align: center;
    display: flex;
    input {
      outline: none;
      padding: 10px;
      width: 90%;
      border: none;
      font-size: 16px;
    }
    button {
      cursor: pointer;
      width: 10%;
      border-radius: 0px;
      background: #eee;
      outline: none;
      border: 0px;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 540px) {
    .todo-input {
      input {
        width: 75%;
      }
      button {
        width: 25%;
      }
    }
  }
</style>
