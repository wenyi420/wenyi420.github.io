<template>
  <div id="app">
    <div class="container">
      <Todo />
    </div>
  </div>
</template>

<script>
  import Todo from "./components/Todo.vue";
  export default {
    name: "App",
    components: {
      Todo
    }
  };
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    font-family: "Noto Sans TC";
  }
  body,
  html {
    background: bisque;
  }
  #app {
    padding: 40px 0px;
  }
  .container {
    max-width: 760px;
    padding: 40px 60px;
    margin: 0 auto;
    background: #f7f7f7;
  }
  @media screen and (max-width: 840px) {
    .container {
      width: 80%;
      padding: 40px 35px;
    }
  }
  @media screen and (max-width: 840px) {
    .container {
      width: 90%;
      padding: 25px 25px;
    }
  }
</style>
