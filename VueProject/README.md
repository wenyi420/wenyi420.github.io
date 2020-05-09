# Vue + Vuex + Vue-router 實作

實作作品：高雄民營停車場資訊查詢
https://wenyi420.github.io/VueProject/dist/index.html#/

實作動機：
----------------
參考了網路上別人實作的口罩地圖並模仿實作後，為了結合自己所學的 **Vuex** 與 **Vue-router**，實作了一個小作品來驗證並加深理解應用

作品概念：
----------------
透過下拉選單篩選出資料，並透過切換頁面呈現：
* 使用**Vut-router**換頁，切換資料呈現的樣式（列表 or 地圖）
* 使用**Vuex**，將篩選資料存取在store，為了換頁時還能呈現原本選取的地區，讓兩頁能連動資料
* 實作時額外添加了套件 **vue-infinite-scroll**，到網頁底部時添加資料讀取
* 列表呈現狀態如下：
![](https://i.imgur.com/UJfkbs7.png)
* 地圖呈現狀態如下：
![](https://i.imgur.com/Buf3Tpe.jpg)




主要學習目標：
-------------
* 透過 Vuex 集中管理資料
* 了解如何在各元件中與 Vuex 傳遞修改與接收資料
* 如何將原本 JSON 資料給篩選


Vuex 資料處理
--------------

#### 建立下拉選單：
篩選掉json檔案中重複的地區與類別，呈現到下拉選單，透過`areadata`與`typedata`存取地區與類別
```javascript
data() {
  return {
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
```

#### 將下拉選單資料存到 store 內 ：

為了將資料存到 store內，需設定 v-modle 綁定 `selectArea`與 `selectType`，並透過**wtach**監聽資料改變後傳送到 **store**

```javascript
data() {
  return {
    selectArea: "鼓山區",
    selectType: "平面",
    ....
  };
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
```

* 透過 this.$store.dispatch 傳送到 **Action**

#### store 處理下拉選單篩選符合資料：

1. 為了改變 store 資料，需透過 dispatch 傳遞到 store的 Action後，再由 Action **commit** 給 mutation 處理資料改變
2. 再透過 getters 篩選出符合的資料
```javascript
import parkinfo from "../assets/parkinfo.json";
export default new Vuex.Store({
  state: {
    parkinfo,
    selectArea: "鼓山區",
    selectType: "平面",
  },
  mutations: {
    CHANGE_DATA(state, changedata) {
      state.selectArea = changedata.selectArea;
      state.selectType = changedata.selectType;
    },
  },
  actions: {
    uploadData({ commit }, changedata) {
      commit("CHANGE_DATA", changedata);
    },
  },
  getters: {
    loadParkingData(state) {
      return state.parkinfo.filter((item) => {
        if (state.selectArea == item.area) {
          return state.selectType == item.type;
        }
      });
    },
  },
});
```

* getters 篩選後，元件再透過 **computed**　取得資料呈現到畫面
```javascript
computed: {
  loadParkingData() {
    return this.$store.getters.loadParkingData;
  }
}
```
