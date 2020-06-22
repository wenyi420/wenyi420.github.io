<template>
  <div>
    <div class="main">
      <sideNav
        class="sidenav"
        @searchTagMovie="searchTag"
        :Movietags="Movietags"
      />
      <div class="movie-list">
        <div class="search-movie">
          <input
            type="text"
            placeholder="搜尋電影"
            v-model.trim="searchTxt"
          />
          <van-button
            type="default"
            @click="searchMovie"
          >搜尋</van-button>
        </div>
        <movieitem
          v-for="movie in movies"
          :movie="movie"
          :key="movie.id"
        />
        <div
          class="loadNewData"
          v-if="!isLoadData"
        >
          <el-button
            type="primary"
            @click="loadNewData"
          >載入更多</el-button>
        </div>
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
  import _ from "lodash";

  import {
    apiGetPopularMovie,
    apiGetMovieTags,
    apiSearchMovie
  } from "@/apis/movie.js";

  Vue.use(Tag);
  Vue.use(Button);
  export default {
    name: "moveList",
    data() {
      return {
        searchTxt: "",
        movies: [],
        Movietags: [],
        hasSearchTag: null,
        hasSearch: false,
        isLoadData: false,
        pageCount: 1
      };
    },
    components: {
      sideNav,
      movieitem,
      Footer
    },

    methods: {
      searchTag(tag) {
        this.pageCount = 1;
        this.hasSearchTag = tag;
        apiGetPopularMovie(this.pageCount, tag).then(res => {
          this.isLoadData = false;
          this.hasSearch = false;
          this.movies = res.data.results;
        });
      },
      loadNewData() {
        if (this.hasSearchTag) {
          this.pageCount++;
          let page = this.pageCount;
          apiGetPopularMovie(page, this.hasSearchTag).then(res => {
            this.isLoadData = true;
            this.hasSearch = false;
            this.movies = [...this.movies, ...res.data.results];
          });
        } else if (this.hasSearch) {
          return false;
        } else {
          this.pageCount++;
          let page = this.pageCount;
          apiGetPopularMovie(page).then(res => {
            this.isLoadData = true;
            this.movies = [...this.movies, ...res.data.results];
          });
        }
      },
      checkScroll() {
        // 判斷是否到底 以及 是否已經點加載按鈕
        if (
          window.innerHeight + window.scrollY >
            document.body.offsetHeight - 150 &&
          this.isLoadData
        ) {
          this.loadNewData();
        }
      },

      searchMovie() {
        if (!this.searchTxt) return false;
        let name = this.searchTxt;

        apiSearchMovie(name).then(res => {
          this.hasSearchTag = null;
          this.hasSearch = true;
          this.isLoadData = true;
          this.movies = res.data.results;
          this.searchTxt = "";
        });
      }
    },
    created() {
      apiGetPopularMovie().then(res => {
        this.movies = res.data.results;
      });
      apiGetMovieTags().then(res => {
        this.Movietags = res.data.genres;
      });
    },

    destroyed() {
      window.removeEventListener(
        "scroll",
        _.throttle(() => {
          this.checkScroll();
        }, 500)
      );
      this.isLoadData = false;
    },
    computed: {},
    watch: {
      isLoadData() {
        if (this.isLoadData) {
          console.log("isLoadData = true", this.isLoadData);

          window.addEventListener(
            "scroll",
            _.throttle(() => {
              this.checkScroll();
            }, 500)
          );
        }
      }
    }
  };
</script>

<style lang="scss">
  .main {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    .movie-list {
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      margin: 0 -15px;
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
      .loadNewData {
        width: 100%;
        .el-button {
          width: 100%;
          background: #01b4e4;
          font-size: 1.4rem;
        }
      }
      .noSearch {
        width: 100%;
        color: red;
        font-size: 18px;
        margin-top: 15px;
        padding-bottom: 47vh;
      }
      .pagination {
        justify-content: center;
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .main {
      width: 90%;
    }
  }
  @media screen and (max-width: 940px) {
    .main {
      flex-wrap: wrap;
      .movie-list {
        width: 100%;
        .search-movie {
          margin-left: 0px;
        }
      }
    }
  }
</style>
