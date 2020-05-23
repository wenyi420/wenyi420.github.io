<template>
  <div>
    <nav>
      <!-- <ul>
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
      </ul> -->
      <div class="tags">
        <div class="tags-item" v-for="tag in renderTags" :key="tag.id">
          <button :data-id="tag.id" @click="searchTagMovie">
            {{ tag.name }}
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    searchTagMovie(event) {
      //   取得元素本身
      // console.info("event.target", event.target);
      let tag = event.target.dataset.id;
      console.log("id=", tag);
      this.$store.commit("Get_Movie_TAG_List", tag);
    },
  },
  computed: {
    renderTags() {
      return this.$store.getters.getTagList;
    },
  },
};
</script>

<style lang="scss" scoped>
// .sidenav ul {
//   padding-right: 25px;
//   li {
//     display: block;
//     background: #68c39a;
//     margin-bottom: 10px;
//     button {
//       border: none;
//       background: none;
//       padding: 15px;
//       color: #fff;
//       cursor: pointer;
//       display: inline-block;
//       width: 150px;
//       /* border-radius: 5px; */
//       font-size: 16px;
//       font-weight: bold;
//     }
//   }
// }
.sidenav {
  max-width: 300px;
  .tags {
    display: flex;
    flex-wrap: wrap;
    .tags-item {
      width: 40%;
      margin: 0% 5% 5%;
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
</style>
