import axios from "axios";
import service from "./movieAPI";
import { Toast } from "vant";
// service 循環遍歷輸出不同的請求方法
let instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "ccc4da600602f73cf752066796a150b0",
    language: "zh-TW",
    page: 1,
  },
});

const Http = {}; // 包裹請求方法的容器

for (let key in service) {
  let api = service[key];
  Http[key] = async function(params, config = {}) {
    let url = api.url;
    let response = {};
    if (api.method === "get") {
      try {
        response = await instance[api.method](url, config);
      } catch (err) {
        response = err;
      }
    }
    console.log("response值為", response);
    return response; // 返回響應值
  };
}

// 請求攔截器添加
instance.interceptors.request.use(
  (config) => {
    // 發起請求前執行什麼
    Toast.loading({
      mask: false,
      duration: 0, // 一直存在
      forbidClick: true, //禁止點擊
      message: "加載中...",
    });
    return config;
  },
  (err) => {
    // 請求錯誤
    Toast.clear();
    Toast("請求錯誤, 請稍後重試request");
    console.log(err);
  }
);

// 響應攔截器
instance.interceptors.response.use(
  (res) => {
    // 請求成功
    Toast.clear();
    return res.data;
  },
  (err) => {
    // 請求錯誤
    Toast.clear();
    Toast("請求錯誤, 請稍後重試responce2");
    console.log(err);
  }
);

export default Http;
