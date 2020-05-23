<template>
  <div>
    <nav class="sidenav">
      <ul>
        <li><button
            data-tag="all"
            @click="searchTagMovie"
          >全部</button></li>
        <li>
        <li><button
            data-tag="Horror"
            @click="searchTagMovie"
          >驚悚</button></li>
        <li>
          <button
            data-tag="ScienceFiction"
            @click="searchTagMovie"
          >
            科幻
          </button>
        </li>
        <li><button
            data-tag="love"
            @click="searchTagMovie"
          >愛情</button></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    methods: {
      searchTagMovie(event) {
        //   取得元素本身
        // console.info("event.target", event.target);
        let tag = event.target.dataset.tag;
        this.$store.commit("Get_Movie_TAG_List", tag);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .sidenav ul {
    padding-right: 25px;
    li {
      display: block;
      background: #68c39a;
      margin-bottom: 10px;
      button {
        border: none;
        background: none;
        padding: 15px;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        width: 150px;
        /* border-radius: 5px; */
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
