<template>
  <div>
    <div class="main">
      <sideNav class="sidenav" @searchTagMovie="searchTag" :Movietags="Movietags" />
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
        <div class="block pagination" v-show="!hasSearch">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
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
  import { Pagination } from 'element-ui';

  import { apiGetPopularMovie, apiGetMovieTags, apiSearchMovie } from '@/apis/movie.js';

  Vue.use(Tag);
  Vue.use(Button);
  Vue.use(Pagination);
  export default {
    name: "moveList",
    data() {
      return {
        searchTxt: "",
        movies:[],
        currentPage: 1,
        Movietags:[],
        hasSearchTag:null,
        hasSearch:false,
      };
    },
    components: {
      sideNav,
      movieitem,
      Footer
    },

    methods: {
      handleCurrentChange(val) {
        console.log(`當前頁數: ${val}`);
        let tag = this.hasSearchTag;
        
        apiGetPopularMovie(val, tag).then((res) =>{
          this.hasSearch = false;
          this.movies = res.data.results;
        
        });
      },
      searchTag(tag){
        this.currentPage = 1;
        this.hasSearchTag = tag;
        apiGetPopularMovie(this.currentPage, tag).then((res) =>{
          this.hasSearch = false;
          this.movies = res.data.results;
        });
      },
      
      searchMovie() {
        if (!this.searchTxt) return false;
        let name = this.searchTxt;
        apiSearchMovie(name).then((res)=>{
          this.hasSearch = true;
          this.movies = res.data.results;
          this.searchTxt = '';
        })
      }
    },
    created() {
      apiGetPopularMovie().then((res) =>{
        console.log('movie list',res.data.results);
        this.movies = res.data.results;
      });
       apiGetMovieTags().then((res)=>{
        console.log('tags: ',res.data.genres);
        this.Movietags = res.data.genres;
      })
     
    },
    computed: {
     
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
      width: 75%;
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
      .noSearch {
        width: 100%;
        color: red;
        font-size: 18px;
        margin-top: 15px;
        padding-bottom: 47vh;
      }
      .pagination{
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
