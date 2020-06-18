<template>
  <div>
    <nav>
      <p
        class="toggleTags"
        @click="toggleTags"
      >展開電影分類</p>
      <div class="tags">
        <div
          class="tags-item"
          v-for="tag in Movietags"
          :key="tag.id"
        >
          <button
            :data-id="tag.id"
            @click="searchTagMovie"
          >
            {{ tag.name }}
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    props:{
      Movietags: {
        type: Array,
        required: true
      }
    },
    created(){
      
    },
    methods: {
      searchTagMovie(event) {
        let tag = event.target.dataset.id;
        console.log("id=", tag);
        this.$emit('searchTagMovie', tag);
        // this.$store.commit("Get_Movie_TAG_List", tag);

      },
      toggleTags(e) {
        e.target.classList.toggle("active");

        let tagslist = document.querySelector(".tags");
        tagslist.classList.toggle("active");
      }
    },
    computed: {
      // renderTags() {
      //   return this.$store.getters.getTagList;
      // }
    }
  };
</script>

<style lang="scss" scoped>
  .sidenav {
    width: 25%;
    .toggleTags {
      display: none;
      font-weight: bold;
      font-size: 20px;
      margin-top: 20px;
      position: relative;
      color: #706e6c;
      cursor: pointer;
      text-align: left;
      margin-bottom: 20px;
      &::before {
        content: "";
        position: absolute;
        left: 130px;
        display: inline-block;
        width: 7px;
        height: 7px;
        border-left: 2px solid #706e6c;
        border-bottom: 2px solid #706e6c;
        transform: rotate(-45deg);
        margin-top: 8px;
      }
    }
    .toggleTags.active::before {
      transform: rotate(135deg);
      margin-top: 11px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      .tags-item {
        width: 40%;
        padding: 0% 15px 15px 0px;
        button {
          width: 100%;
          padding: 15px 0px;
          border: none;
          display: inline-block;
          background: #56d0e4;
          color: #fff;
          font-weight: bold;
          transition: ease 0.3s;
          cursor: pointer;
          &:hover {
            background: #44bccf;
          }
        }
      }
    }
  }
  @media screen and (max-width: 940px) {
    .sidenav {
      width: 100%;
      .toggleTags {
        display: block;
      }
      .tags {
        max-height: 0px;
        transition: ease 0.3s;
        overflow: hidden;
        margin-bottom: 15px;
      }
      .tags.active {
        max-height: 600px;
      }
      .tags .tags-item {
        width: 20%;
      }
      .tags .tags-item:nth-child(5n) {
        padding-right: 0px;
      }
    }
  }
  @media screen and (max-width: 480px) {
    .sidenav {
      .tags .tags-item {
        width: 33.333333%;
      }
      .tags .tags-item:nth-child(5n) {
        padding-right: 15px;
      }
      .tags .tags-item:nth-child(3n) {
        padding-right: 0px;
      }
    }
  }
</style>
