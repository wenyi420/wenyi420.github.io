<template>
  <div>
    <div class="main">
      <sideNav class="sidenav" />
      <div class="movie-list">
        <div class="search-movie">
          <input type="text" placeholder="搜尋電影" v-model.trim="searchTxt" />
          <van-button type="default" @click="searchMovie">搜尋</van-button>
        </div>
        <movieitem
          v-for="movie in renderMovie"
          :movie="movie"
          :key="movie.id"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import sideNav from "@/components/sideNav.vue";
import Footer from "@/components/Footer.vue";
import movieitem from "@/components/movieItem.vue";

import Vue from "vue";
import { Button } from "vant";
import { Tag } from "vant";

Vue.use(Tag);
Vue.use(Button);

export default {
  name: "moveList",
  data() {
    return {
      searchTxt: "",
      hasSearch: false,
    };
  },
  components: {
    sideNav,
    movieitem,
    Footer,
  },

  methods: {
    addCart() {
      alert("已加入");
    },
    searchMovie() {
      console.log("searchtxt:", this.searchTxt);
      if (!this.searchTxt) return false;

      this.$store.commit("SEARCH_MOVIES", this.searchTxt);
    },
  },
  created() {
    this.$store.commit("Get_Movie_List");
    this.$store.commit("GET_TAGS");
    console.log("created", this.$store.state.movieList);
  },
  computed: {
    renderMovie() {
      return this.$store.getters.getFilterTag;
    },
  },
};
</script>

<style lang="scss">
.main {
  display: flex;
  justify-content: center;

  .movie-list {
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    .search-movie {
      position: relative;
      width: 100%;
      padding-bottom: 30px;
      border-bottom: 1px solid #000;
      margin-bottom: 30px;
      text-align: left;
      margin-left: 15px;
      input {
        display: inline-block;
        padding: 11.5px 10px;
        width: 200px;
        border: 1px solid #ebedf0;
        font-size: 15px;
      }
    }
    .noSearch {
      width: 100%;
      color: red;
      font-size: 18px;
      margin-top: 15px;
      padding-bottom: 47vh;
    }
  }
}
</style>
