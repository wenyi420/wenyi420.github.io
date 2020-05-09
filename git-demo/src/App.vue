<template>
  <div id="app">
    <img
      class="logo"
      src="./assets/logo.png"
    />
    <h1 class="title">高雄市民營停車場查詢</h1>
    <button
      class="scrollTop bg-info"
      @click="scrollTop"
    >
      <svg
        class="bi bi-arrow-up"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div class="select-list">
      <div class="select-item">
        <span class="select-title">區域:</span>
        <select
          class="form-control selet"
          v-model="selectArea"
        >
          <option value="">請選擇地區</option>
          <option
            :value="a"
            v-for="a in areadata"
            :key="a"
          >{{ a }}</option>
        </select>
      </div>
      <div class="select-item">
        <span class="select-title">類型:</span>
        <select
          class="form-control selet"
          v-model="selectType"
        >
          <option value="">請選擇類型</option>
          <option
            :value="t"
            v-for="t in typedata"
            :key="t"
          >{{ t }}</option>
        </select>
      </div>
    </div>
    <div id="nav">
      <router-link to="/"><button
          type="button"
          class="btn btn-success"
        >
          列表
        </button></router-link>

      <router-link to="/parkmap"><button
          type="button"
          class="btn btn-warning"
        >
          地圖
        </button></router-link>
    </div>

    <router-view />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectArea: "鼓山區",
        selectType: "平面",
        areadata: [],
        typedata: []
      };
    },
    created() {
      this.$store.state.parkinfo.filter(item => {
        let CompareArea = item.area;
        let CompareType = item.type;
        // 篩選出地區
        if (this.areadata.indexOf(CompareArea) == -1) {
          this.areadata.push(CompareArea);
        }
        // 篩選出 類別
        if (this.typedata.indexOf(CompareType) == -1) {
          this.typedata.push(CompareType);
        }
      });
    },
    methods: {
      scrollTop() {
        document.body.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    computed: {
      loadParkingData() {
        return this.$store.getters.loadParkingData;
      }
    },
    watch: {
      selectArea() {
        this.$store.dispatch("uploadData", {
          selectType: this.selectType,
          selectArea: this.selectArea
        });
      },
      selectType() {
        this.$store.dispatch("uploadData", {
          selectType: this.selectType,
          selectArea: this.selectArea
        });
      }
    }
  };
</script>

<style lang="scss">
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }
  h1.title {
    margin-bottom: 20px;
  }

  .scrollTop {
    position: fixed;
    right: 5%;
    bottom: 5%;
    z-index: 9999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    color: #fff;
    font-size: 25px;
    &:focus {
      outline: none;
    }
  }
  .logo {
    width: 100px;
    padding: 30px 0px;
  }
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }
  .select-list {
    display: flex;
    max-width: 480px;
    margin: 0 auto;
    align-items: center;
    flex-wrap: wrap;
    .select-item {
      width: 50%;
    }
    .select-title {
      width: 60px;
    }
  }
  .form-control.selet {
    display: inline-block;
    width: 75%;
    margin-left: 15px;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    a {
      margin: 0 10px;
    }
    a .btn {
      font-weight: bold;
      color: #eee;
      padding: 0.375rem 1.75rem;

      &.router-link-exact-active {
        color: #fff;
      }
    }
  }
  @media screen and (max-width: 520px) {
    .select-list .select-item {
      width: 100%;
      padding: 15px 0px;
    }
  }
</style>
