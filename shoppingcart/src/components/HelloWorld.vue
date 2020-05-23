<template>
  <div class="hello">
    <div class="item">
      <h3>2wewerrwr</h3>
      <p>2010-20-01</p>
      <a href="#/movies/1">詳細</a>
    </div>
    <a href="#/movies/2">電影2</a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
