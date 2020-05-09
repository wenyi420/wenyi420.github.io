<template>
  <div
    class="home"
    style="height:400px;"
  >
    <div v-if="loadParkingData.length !== 0">
      <div class="park-list container">
        <park-item
          v-for="item in infiniteData"
          :key="item.id"
          :item="item"
        >
        </park-item>
      </div>
      <div v-if="!loadDone">
        <div
          v-show="busy"
          class="loading-item"
        >
          <div class="loading">
            <p>加載中...</p>
            <div
              class="spinner-border text-success"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="loadDone"
        v-else
      >已無更多資料</div>
    </div>
    <div v-else>查無資料</div>
    <div
      class="app"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="15"
    ></div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import ParkItem from "@/components/ParkItem.vue";

  export default {
    name: "Home",
    data() {
      return {
        count: 0, //要推入的資料筆數
        infiniteData: [], //inifinite scroll渲染的部分
        busy: false, //true觸發載入，false停止載入
        courses: this.$store.getters.loadParkingData, //全部的資料
        loadDone: false
      };
    },
    components: {
      ParkItem
    },
    created() {},
    computed: {
      loadParkingData() {
        return this.$store.getters.loadParkingData;
      }
    },
    methods: {
      loadMore: function() {
        if (this.infiniteData.length == this.courses.length) {
          this.loadDone = true;
        }
        if (this.infiniteData.length < this.courses.length) {
          this.busy = true;
          setTimeout(() => {
            for (var i = 0, j = 6; i < j; i++) {
              if (this.count === this.courses.length) {
                break;
              }
              this.infiniteData.push(this.courses[this.count++]);
            }
            this.busy = false;
          }, 1000);
        }
      }
    },
    watch: {
      loadParkingData() {
        this.courses = this.loadParkingData;
        this.infiniteData = [];
        this.count = 0;
        this.loadMore();
        this.loadDone = false;
      }
    }
  };
</script>

<style lang="scss">
  .park-list {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 30px;
  }
  .loading-item {
    width: 100%;
    margin: 20 0px;

    .loading {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      p {
        width: 100%;
      }
    }
  }
  .loadDone {
    padding: 30px 0px;
    font-weight: bold;
  }
</style>
